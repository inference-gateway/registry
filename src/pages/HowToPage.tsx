import { useState } from 'react';

interface HowToPageProps {
  onBackToAgents: () => void;
}

export function HowToPage({ onBackToAgents }: HowToPageProps) {
  const [selectedSection, setSelectedSection] = useState('prerequisites');

  const sections = [
    { id: 'prerequisites', title: 'Prerequisites', icon: '📋' },
    { id: 'local-setup', title: 'Local Development', icon: '💻' },
    { id: 'gateway-setup', title: 'Gateway Setup', icon: '🚀' },
    { id: 'using-agents', title: 'Using Agents', icon: '🤖' },
    { id: 'production', title: 'Production Setup', icon: '🏭' },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'prerequisites':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Prerequisites</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Before you can start using A2A (Agent-to-Agent) services from the registry, ensure you have the following tools installed on your system:
            </p>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  🐳 Container Runtime
                </h3>
                <p className="text-slate-300 mb-4">You need a container runtime to pull and run agent containers:</p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li><strong>Docker:</strong> <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">docker --version</code> (recommended)</li>
                  <li><strong>Podman:</strong> <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">podman --version</code> (alternative)</li>
                  <li><strong>containerd:</strong> With nerdctl for advanced users</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  🌐 Network Access
                </h3>
                <p className="text-slate-300 mb-4">Ensure you have access to:</p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>GitHub Container Registry (<code className="bg-slate-900 px-2 py-1 rounded text-blue-400">ghcr.io</code>)</li>
                  <li>Inference Gateway endpoints (if using hosted services)</li>
                  <li>Internet connection for downloading container images</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  💾 System Requirements
                </h3>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li><strong>Storage:</strong> At least 2GB free space for container images</li>
                  <li><strong>Memory:</strong> Minimum 4GB RAM (8GB+ recommended)</li>
                  <li><strong>OS:</strong> Linux, macOS, or Windows with WSL2</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'local-setup':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Local Development Setup</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Set up your local environment to interact with A2A agents for development and testing purposes.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📥 1. Pull an Agent Container
                </h3>
                <p className="text-slate-300 mb-4">Choose an agent from the registry and pull its container:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Example: Pull the Documentation Server agent<br/>
                    docker pull ghcr.io/inference-gateway/documentation-agent:0.2.1
                  </code>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 Replace the image name and tag with your chosen agent from the registry
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔧 2. Configure Environment Variables
                </h3>
                <p className="text-slate-300 mb-4">Set up required environment variables for your agent:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Basic configuration<br/>
                    export AGENT_PORT=8080<br/>
                    export AGENT_HOST=0.0.0.0<br/><br/>
                    # If using inference gateway<br/>
                    export INFERENCE_GATEWAY_URL=http://localhost:3000<br/>
                    export INFERENCE_GATEWAY_TOKEN=your_auth_token_here
                  </code>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🚀 3. Run the Agent
                </h3>
                <p className="text-slate-300 mb-4">Start your agent container with the proper configuration:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name documentation-agent \<br/>
                    &nbsp;&nbsp;-p 8080:8080 \<br/>
                    &nbsp;&nbsp;-e AGENT_PORT=8080 \<br/>
                    &nbsp;&nbsp;-e INFERENCE_GATEWAY_URL=http://host.docker.internal:3000 \<br/>
                    &nbsp;&nbsp;-e INFERENCE_GATEWAY_TOKEN=$INFERENCE_GATEWAY_TOKEN \<br/>
                    &nbsp;&nbsp;ghcr.io/inference-gateway/documentation-agent:0.2.1
                  </code>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  ✅ 4. Verify Agent is Running
                </h3>
                <p className="text-slate-300 mb-4">Check that your agent is healthy and responsive:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Check container status<br/>
                    docker ps | grep documentation-agent<br/><br/>
                    # Test agent health endpoint<br/>
                    curl http://localhost:8080/health<br/><br/>
                    # View agent logs<br/>
                    docker logs documentation-agent
                  </code>
                </div>
              </div>
            </div>
          </div>
        );

      case 'gateway-setup':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Inference Gateway Setup</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              The Inference Gateway acts as a multi-provider inference service that coordinates communication between agents.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📦 1. Get the Gateway
                </h3>
                <p className="text-slate-300 mb-4">Pull and run the Inference Gateway:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Pull the gateway image<br/>
                    docker pull ghcr.io/inference-gateway/gateway:latest<br/><br/>
                    # Run with basic configuration<br/>
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name inference-gateway \<br/>
                    &nbsp;&nbsp;-p 3000:3000 \<br/>
                    &nbsp;&nbsp;-e PORT=3000 \<br/>
                    &nbsp;&nbsp;-e NODE_ENV=development \<br/>
                    &nbsp;&nbsp;ghcr.io/inference-gateway/gateway:latest
                  </code>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔐 2. Configure Authentication (Optional)
                </h3>
                <p className="text-slate-300 mb-4">If authentication is enabled on your gateway:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Run gateway with authentication<br/>
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name inference-gateway \<br/>
                    &nbsp;&nbsp;-p 3000:3000 \<br/>
                    &nbsp;&nbsp;-e PORT=3000 \<br/>
                    &nbsp;&nbsp;-e AUTH_ENABLED=true \<br/>
                    &nbsp;&nbsp;-e JWT_SECRET=your_jwt_secret_here \<br/>
                    &nbsp;&nbsp;-e API_KEYS=key1,key2,key3 \<br/>
                    &nbsp;&nbsp;ghcr.io/inference-gateway/gateway:latest
                  </code>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 Remember to pass the authentication token to your agents via <code>INFERENCE_GATEWAY_TOKEN</code>
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🌐 3. Network Configuration
                </h3>
                <p className="text-slate-300 mb-4">Ensure agents can communicate with the gateway:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Create a dedicated network (recommended)<br/>
                    docker network create inference-net<br/><br/>
                    # Run gateway on the network<br/>
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name inference-gateway \<br/>
                    &nbsp;&nbsp;--network inference-net \<br/>
                    &nbsp;&nbsp;-p 3000:3000 \<br/>
                    &nbsp;&nbsp;ghcr.io/inference-gateway/gateway:latest<br/><br/>
                    # Run agents on the same network<br/>
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name documentation-agent \<br/>
                    &nbsp;&nbsp;--network inference-net \<br/>
                    &nbsp;&nbsp;-e INFERENCE_GATEWAY_URL=http://inference-gateway:3000 \<br/>
                    &nbsp;&nbsp;ghcr.io/inference-gateway/documentation-agent:0.2.1
                  </code>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📊 4. Monitor Gateway Health
                </h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Check gateway status<br/>
                    curl http://localhost:3000/health<br/><br/>
                    # View registered agents<br/>
                    curl http://localhost:3000/agents<br/><br/>
                    # Monitor gateway logs<br/>
                    docker logs -f inference-gateway
                  </code>
                </div>
              </div>
            </div>
          </div>
        );

      case 'using-agents':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Using A2A Agents</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Learn how to interact with agents and leverage their capabilities in your applications.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔌 1. Direct Agent Communication
                </h3>
                <p className="text-slate-300 mb-4">Interact directly with agent endpoints:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre-wrap">
{`# Query documentation agent
curl -X POST http://localhost:8080/query \\
  -H "Content-Type: application/json" \\
  -d '{"query": "How to use React hooks?"}'

# Schedule calendar event
curl -X POST http://localhost:8081/calendar/events \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Team Meeting",
    "start": "2024-01-15T10:00:00Z",
    "duration": 60
  }'`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🌉 2. Via Inference Gateway
                </h3>
                <p className="text-slate-300 mb-4">Use the gateway for centralized agent management:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre-wrap">
{`# Route request through gateway
curl -X POST http://localhost:3000/agents/documentation-server/query \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your_token_here" \\
  -d '{"query": "Express.js middleware patterns"}'

# Chain multiple agent requests
curl -X POST http://localhost:3000/workflow \\
  -H "Content-Type: application/json" \\
  -d '{
    "steps": [
      {"agent": "documentation-server", "action": "query", "params": {"topic": "API design"}},
      {"agent": "google-calendar", "action": "schedule", "params": {"title": "API Review"}}
    ]
  }'`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  💻 3. SDK Integration
                </h3>
                <p className="text-slate-300 mb-4">Use official SDKs for easier integration:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # JavaScript/Node.js<br/>
                    npm install @inference-gateway/sdk<br/><br/>
                    # Python<br/>
                    pip install inference-gateway-sdk<br/><br/>
                    # Go<br/>
                    go get github.com/inference-gateway/go-sdk
                  </code>
                </div>
                <div className="mt-4 bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-blue-400 whitespace-pre-wrap">
{`// Example JavaScript usage
import { InferenceGateway } from '@inference-gateway/sdk';

const gateway = new InferenceGateway({
  url: 'http://localhost:3000',
  token: process.env.INFERENCE_GATEWAY_TOKEN
});

const result = await gateway.queryAgent(
  'documentation-server',
  { query: 'TypeScript best practices' }
);`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔄 4. Agent Workflows
                </h3>
                <p className="text-slate-300 mb-4">Create complex workflows by chaining agents:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre-wrap">
{`# Example workflow: Research → Schedule → Document
curl -X POST http://localhost:3000/workflows \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Research Meeting Workflow",
    "steps": [
      {
        "agent": "documentation-server",
        "action": "research",
        "params": {"topic": "GraphQL Federation"}
      },
      {
        "agent": "google-calendar",
        "action": "create_event",
        "params": {"title": "GraphQL Discussion"}
      }
    ]
  }'`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'production':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Production Deployment</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Best practices and recommendations for deploying A2A agents in production environments.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🏗️ 1. Infrastructure Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-lg font-medium text-white mb-2">Container Orchestration</h4>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                      <li><strong>Kubernetes:</strong> Recommended for large-scale deployments</li>
                      <li><strong>Docker Swarm:</strong> Simpler alternative for smaller deployments</li>
                      <li><strong>Docker Compose:</strong> Development and small production setups</li>
                    </ul>
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-lg font-medium text-white mb-2">Resource Requirements</h4>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                      <li><strong>CPU:</strong> 2+ cores per agent instance</li>
                      <li><strong>Memory:</strong> 4-8GB RAM per agent (varies by agent type)</li>
                      <li><strong>Storage:</strong> 20GB+ for logs and temporary data</li>
                      <li><strong>Network:</strong> Low latency between agent instances</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔒 2. Security Best Practices
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                    <code className="text-green-400 block">
                      # Use secrets management<br/>
                      kubectl create secret generic gateway-secrets \<br/>
                      &nbsp;&nbsp;--from-literal=jwt-secret=$JWT_SECRET \<br/>
                      &nbsp;&nbsp;--from-literal=api-keys=$API_KEYS<br/><br/>
                      # Network policies<br/>
                      apiVersion: networking.k8s.io/v1<br/>
                      kind: NetworkPolicy<br/>
                      metadata:<br/>
                      &nbsp;&nbsp;name: agent-network-policy<br/>
                      spec:<br/>
                      &nbsp;&nbsp;podSelector:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;matchLabels:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app: inference-agents<br/>
                      &nbsp;&nbsp;policyTypes:<br/>
                      &nbsp;&nbsp;- Ingress<br/>
                      &nbsp;&nbsp;- Egress
                    </code>
                  </div>
                  
                  <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                    <li><strong>Enable authentication:</strong> Always use API keys or JWT tokens</li>
                    <li><strong>TLS encryption:</strong> Use HTTPS/TLS for all agent communication</li>
                    <li><strong>Network segmentation:</strong> Isolate agent networks from public internet</li>
                    <li><strong>Regular updates:</strong> Keep agent images and dependencies current</li>
                    <li><strong>Audit logging:</strong> Log all agent interactions and requests</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📊 3. Monitoring & Observability
                </h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Prometheus monitoring<br/>
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name prometheus \<br/>
                    &nbsp;&nbsp;-p 9090:9090 \<br/>
                    &nbsp;&nbsp;-v ./prometheus.yml:/etc/prometheus/prometheus.yml \<br/>
                    &nbsp;&nbsp;prom/prometheus<br/><br/>
                    # Grafana dashboards<br/>
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name grafana \<br/>
                    &nbsp;&nbsp;-p 3001:3000 \<br/>
                    &nbsp;&nbsp;-e GF_SECURITY_ADMIN_PASSWORD=admin \<br/>
                    &nbsp;&nbsp;grafana/grafana
                  </code>
                </div>
                <p className="text-slate-300 mt-4">Key metrics to monitor:</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4">
                  <li>Agent response times and throughput</li>
                  <li>Error rates and failure patterns</li>
                  <li>Resource utilization (CPU, memory, network)</li>
                  <li>Gateway health and load balancing</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🚀 4. High Availability Setup
                </h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Docker Compose HA example<br/>
                    version: '3.8'<br/>
                    services:<br/>
                    &nbsp;&nbsp;gateway:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;image: ghcr.io/inference-gateway/gateway:latest<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;deploy:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;replicas: 3<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;restart_policy:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;condition: on-failure<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;healthcheck:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;test: ["CMD", "curl", "-f", "http://localhost:3000/health"]<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;interval: 30s<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timeout: 10s<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;retries: 3<br/><br/>
                    &nbsp;&nbsp;documentation-agent:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;image: ghcr.io/inference-gateway/documentation-agent:0.2.1<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;deploy:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;replicas: 2<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;depends_on:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- gateway
                  </code>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔧 5. Performance Optimization
                </h3>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li><strong>Load balancing:</strong> Distribute requests across agent replicas</li>
                  <li><strong>Caching:</strong> Implement response caching for frequently requested data</li>
                  <li><strong>Connection pooling:</strong> Reuse connections between agents and gateway</li>
                  <li><strong>Horizontal scaling:</strong> Add more agent instances based on demand</li>
                  <li><strong>Resource limits:</strong> Set appropriate CPU and memory limits</li>
                  <li><strong>Circuit breakers:</strong> Implement fallback mechanisms for failed agents</li>
                </ul>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-red-200 mb-4 flex items-center gap-2">
                  ⚠️ Production Checklist
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-red-200 mb-2">Security ✓</h4>
                    <ul className="list-disc list-inside text-red-100 space-y-1 text-sm ml-4">
                      <li>Authentication enabled</li>
                      <li>TLS certificates configured</li>
                      <li>Secrets properly managed</li>
                      <li>Network policies applied</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-red-200 mb-2">Reliability ✓</h4>
                    <ul className="list-disc list-inside text-red-100 space-y-1 text-sm ml-4">
                      <li>Health checks implemented</li>
                      <li>Auto-scaling configured</li>
                      <li>Backup strategy in place</li>
                      <li>Disaster recovery tested</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a section to get started</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-purple-500/10 via-transparent to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={onBackToAgents}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Registry</span>
            </button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl mb-6 shadow-2xl shadow-emerald-500/25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
              HOW-TO Guide
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Complete guide to using A2A (Agent-to-Agent) services from the registry. 
              Learn how to download, configure, and deploy agents in your environment.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4">Guide Sections</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                      selectedSection === section.id
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <p className="text-slate-300">
              Need help? Check out the{' '}
              <a href="https://docs.inference-gateway.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                official documentation
              </a>{' '}
              or{' '}
              <a href="https://github.com/inference-gateway" className="text-blue-400 hover:text-blue-300 transition-colors">
                browse the source code
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}