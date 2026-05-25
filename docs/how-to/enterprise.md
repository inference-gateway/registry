# Enterprise Deployment

Enterprise deployment of catalog agents is the
[Inference Gateway Operator](https://github.com/inference-gateway/operator)'s
job. This page is the registry-side blurb - it covers how a catalog entry
gets into the cluster, not Operator setup itself.

## The Operator owns production

The Operator ships four CRDs under `core.inference-gateway.com/v1alpha1`:
`Gateway`, `Agent`, `Orchestrator`, and `MCP`. HPA tuning, telemetry,
ingress, multi-provider config, RBAC, secret management - all of that
lives in the [Operator repo](https://github.com/inference-gateway/operator).
Start there for installation and the full CRD reference.

## Don't hand-write the Agent CR

The CR is generated from the ADL manifest. Add a `spec.deployment.kubernetes`
block to the agent's `agent.yaml`:

```yaml
spec:
  deployment:
    type: kubernetes
    kubernetes:
      image:
        registry: ghcr.io
        repository: inference-gateway/documentation-agent
        tag: 0.6.3
```

Then `adl generate --deployment kubernetes` writes the matching `Agent`
CR (and any supporting manifests) under the project's `deploy/` directory.
`kubectl apply -f deploy/` installs it, the Operator reconciles it into a
Deployment + Service + HPA, and orchestrators discover it. See the
[ADL CLI docs](https://adl.inference-gateway.com/) for the full
`adl generate` flow.

## Picking a version from the catalog

When you browse [Agents](/agents/), the **OCI Image** row on each card
shows the published tag (e.g. `ghcr.io/inference-gateway/documentation-agent:0.6.3`).
Use that tag in your ADL `spec.deployment.kubernetes.image` block so the
generated CR pins to the exact image you reviewed. `latest` works for
experimentation but should not be used in production - it breaks the link
between the manifest you reviewed in the catalog and the image actually
running.

## Where to go next

- [Operator README](https://github.com/inference-gateway/operator) -
  installation, RBAC, CRD reference.
- [Operator examples](https://github.com/inference-gateway/operator/tree/main/examples) -
  full Gateway + Agents + Orchestrator stacks.
- [ADL CLI docs](https://adl.inference-gateway.com/) - `adl generate`
  flags and the full deployment field reference.
- [Gateway repo](https://github.com/inference-gateway/inference-gateway) -
  the underlying gateway image and provider config.
