# Enterprise Setup

The recommended path for production is the
[Inference Gateway Operator](https://github.com/inference-gateway/operator),
which manages gateways and A2A agents as first-class Kubernetes resources via
custom CRDs - replacing hand-written Deployment + HPA manifests.

## 1. Infrastructure recommendations

### Container orchestration

- **Kubernetes**: recommended for production deployments.
- **Operator**: use the Inference Gateway Operator for declarative management of
  gateways, A2A agents, MCP servers, and orchestrators.

### Resource requirements

- **CPU**: 2+ cores per agent instance
- **Memory**: 4-8 GB RAM per agent (varies by agent type)
- **Storage**: 20 GB+ for logs and temporary data
- **Network**: low latency between agent instances

## 2. Install the operator

Install the operator with a single `kubectl apply`:

```sh
# Install the latest release
kubectl apply -f https://github.com/inference-gateway/operator/releases/latest/download/install.yaml

# Verify the operator is running
kubectl get pods -n inference-gateway-system

# Inspect the installed CRDs
kubectl get crds | grep inference-gateway.com
```

The operator ships four CRDs under `core.inference-gateway.com/v1alpha1`:

- **Gateway**: the inference gateway itself (providers, auth, telemetry, HPA, ingress)
- **Agent**: A2A worker agents discoverable by orchestrators
- **Orchestrator**: channel managers (e.g. a Telegram bot) that fan out to agents
- **MCP**: Model Context Protocol servers (tools / extensions)

## 3. Deploy a gateway with native HPA

Define the gateway declaratively. The operator generates the underlying
Deployment, Service, and HorizontalPodAutoscaler - no separate manifests needed.
The namespace must carry the `inference-gateway.com/managed: "true"` label so the
operator opts in to managing resources inside it.

```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: inference-gateway
  labels:
    inference-gateway.com/managed: "true"
---
apiVersion: core.inference-gateway.com/v1alpha1
kind: Gateway
metadata:
  name: inference-gateway
  namespace: inference-gateway
spec:
  image: ghcr.io/inference-gateway/inference-gateway:latest
  environment: production

  # Native HPA - no separate HorizontalPodAutoscaler resource needed
  hpa:
    enabled: true
    config:
      minReplicas: 3
      maxReplicas: 10
      metrics:
        - type: Resource
          resource:
            name: cpu
            target:
              type: Utilization
              averageUtilization: 80

  telemetry:
    enabled: true
    metrics:
      enabled: true
      port: 9464

  server:
    timeouts:
      read: "60s"
      write: "60s"
      idle: "300s"

  providers:
    - name: DeepSeek
      enabled: true
      env:
        - name: DEEPSEEK_API_KEY
          valueFrom:
            secretKeyRef:
              name: inference-gateway-providers-secret
              key: DEEPSEEK_API_KEY

  resources:
    requests:
      cpu: "100m"
      memory: "128Mi"
    limits:
      cpu: "1000m"
      memory: "512Mi"

  ingress:
    enabled: true
    host: api.inference-gateway.local
    tls:
      enabled: true
      secretName: inference-gateway-tls
```

::: tip
Full example with auth, MCP, and multi-provider config:
`operator/examples/gateway-complete`.
:::

## 4. Deploy A2A agents

Each A2A agent is its own `Agent` resource. The operator wires it to the gateway
and exposes it on the cluster network. Don't forget the managed-namespace label
here too.

```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: agents
  labels:
    inference-gateway.com/managed: "true"
---
apiVersion: core.inference-gateway.com/v1alpha1
kind: Agent
metadata:
  name: google-calendar-agent
  namespace: agents
  labels:
    orchestrator: orchestrator # opt-in to orchestrator service discovery
spec:
  image: ghcr.io/inference-gateway/google-calendar-agent:latest
  agent:
    llm:
      baseURL: "http://inference-gateway.inference-gateway.svc.cluster.local:8080/v1"
      model: "deepseek/deepseek-v4-flash"
  env:
    - name: GOOGLE_CALENDAR_MOCK_MODE
      value: "true"
```

::: tip
End-to-end example (Gateway + multiple Agents + Orchestrator + Redis):
`operator/examples/orchestrator`.
:::

## 5. Monitoring and observability

Setting `spec.telemetry.metrics.enabled: true` on the Gateway exposes Prometheus
metrics on the configured port (default `9464`). Scrape it with your existing
Prometheus / OpenTelemetry stack.

Key metrics to monitor:

- Agent response times and throughput
- Error rates and failure patterns
- Resource utilization (CPU, memory, network)
- Gateway health and load balancing

## 6. Performance optimization

- **Load balancing**: distribute requests across agent replicas.
- **Caching**: implement response caching for frequently requested data.
- **Connection pooling**: reuse connections between agents and the gateway.
- **Horizontal scaling**: tune `spec.hpa` on the Gateway CR for traffic-based scaling.
- **Resource limits**: set appropriate CPU and memory limits via `spec.resources`.
- **Circuit breakers**: implement fallback mechanisms for failed agents.

## Production checklist

::: warning
**Security**

- Authentication enabled
- TLS certificates configured
- Secrets properly managed
- Network policies applied

**Reliability**

- Health checks implemented
- Auto-scaling configured
- Backup strategy in place
- Disaster recovery tested
  :::
