import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function HowToPage() {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const [selectedSection, setSelectedSection] = useState('prerequisites');

  // Update selected section when URL changes
  useEffect(() => {
    if (section) {
      setSelectedSection(section);
    }
  }, [section]);

  const sections = [
    { id: 'prerequisites', title: 'Prerequisites', icon: '📋' },
    { id: 'local-setup', title: 'Local Development', icon: '💻' },
    { id: 'gateway-setup', title: 'Gateway Setup', icon: '🚀' },
    { id: 'using-agents', title: 'Using Agents', icon: '🤖' },
    { id: 'production', title: 'Enterprise Setup', icon: '🏭' },
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
                  📁 1. Get the A2A Examples
                </h3>
                <p className="text-slate-300 mb-4">Download the complete A2A setup from the inference-gateway CLI repository:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Clone or download the A2A examples
git clone https://github.com/inference-gateway/cli.git
cd cli/examples/a2a

# OR download specific files:
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/docker-compose.yaml
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/.env.gateway.example
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/.env.documentation.example
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/.env.calendar.example`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔧 2. Configure Environment Files
                </h3>
                <p className="text-slate-300 mb-4">Create and configure the required environment files:</p>
                
                <div className="space-y-4">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-blue-300 font-medium mb-2">Gateway Configuration (.env.gateway)</h4>
                    <code className="text-green-400 block text-sm">
                      cp .env.gateway.example .env.gateway<br/><br/>
                      # Key settings:<br/>
                      ENVIRONMENT=development<br/>
                      A2A_ENABLE=true<br/>
                      A2A_EXPOSE=true<br/>
                      A2A_AGENTS=http://google-calendar-agent:8080,http://documentation-agent:8080<br/>
                      SERVER_HOST=0.0.0.0<br/>
                      SERVER_PORT=8080<br/><br/>
                      # Add your API keys for providers (Anthropic, OpenAI, etc.)
                    </code>
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-blue-300 font-medium mb-2">Documentation Agent (.env.documentation)</h4>
                    <pre className="text-green-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`cp .env.documentation.example .env.documentation

# Key settings:
ENVIRONMENT=development
CONTEXT7_API_KEY=your_context7_api_key
A2A_AGENT_URL=http://localhost:8080
A2A_AGENT_CLIENT_PROVIDER=deepseek
A2A_AGENT_CLIENT_MODEL=deepseek-chat
A2A_AGENT_CLIENT_BASE_URL=http://inference-gateway:8080/v1`}
                    </pre>
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                    <h4 className="text-blue-300 font-medium mb-2">Calendar Agent (.env.calendar)</h4>
                    <pre className="text-green-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`cp .env.calendar.example .env.calendar

# Key settings:
ENVIRONMENT=dev
DEMO_MODE=false
GOOGLE_CALENDAR_TIMEZONE=CET
GOOGLE_CALENDAR_READ_ONLY=false
A2A_AGENT_URL=http://google-calendar-agent:8080
A2A_AGENT_CLIENT_BASE_URL=http://inference-gateway:8080/v1
# Add Google Calendar service account JSON`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🚀 3. Start the A2A Environment
                </h3>
                <p className="text-slate-300 mb-4">Use Docker Compose to start all services:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Start all A2A services
docker compose up -d

# View running services
docker compose ps

# Follow logs from all services
docker compose logs -f`}
                  </pre>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 This starts: inference-gateway, google-calendar-agent, documentation-agent, infer-cli, and a2a-debugger
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  ✅ 4. Test A2A Communication
                </h3>
                <p className="text-slate-300 mb-4">Verify the setup with built-in debugging tools:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# List available tasks
docker compose run --rm a2a-debugger tasks list

# Test streaming interaction
docker compose run --rm a2a-debugger tasks submit-streaming "What's on my calendar today?"

# Start interactive CLI session
docker compose run --rm infer-cli

# View service status
docker compose ps
docker compose logs inference-gateway`}
                  </pre>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 The debugger provides commands to test agent communication and task submission
                </p>
              </div>
            </div>
          </div>
        );

      case 'gateway-setup':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Inference Gateway Setup</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              The Inference Gateway coordinates A2A communication and provides a unified interface to multiple LLM providers. Use the provided Docker Compose setup for seamless integration.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🏗️ 1. Docker Compose Architecture
                </h3>
                <p className="text-slate-300 mb-4">The A2A setup uses Docker Compose with a bridge network for service communication:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Services in docker-compose.yaml:
services:
  inference-gateway:
    image: ghcr.io/inference-gateway/inference-gateway:latest
    ports:
      - 8080:8080
    env_file:
      - .env.gateway
    
  google-calendar-agent:
    image: ghcr.io/inference-gateway/google-calendar-agent:latest
    env_file:
      - .env.calendar
    
  documentation-agent:
    image: ghcr.io/inference-gateway/documentation-agent:latest
    env_file:
      - .env.documentation

  n8n-agent:
    image: ghcr.io/inference-gateway/n8n-agent:latest
    env_file:
      - .env.documentation
    
  infer-cli:
    image: ghcr.io/inference-gateway/infer:latest
    profiles:
      - manual
    
  a2a-debugger:
    image: ghcr.io/inference-gateway/a2a-debugger:latest
    profiles:
      - manual

networks:
  a2a-network:
    driver: bridge`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  ⚙️ 2. Gateway Configuration
                </h3>
                <p className="text-slate-300 mb-4">The gateway is configured to enable A2A protocols and connect multiple LLM providers:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Key gateway settings (.env.gateway):

# A2A Protocol Configuration
A2A_ENABLE=true
A2A_EXPOSE=true
A2A_AGENTS='http://google-calendar-agent:8080,http://documentation-agent:8080,http://n8n-agent:8080'

# Server Configuration
SERVER_HOST=0.0.0.0
SERVER_PORT=8080

# LLM Provider Support (add your API keys)
# ANTHROPIC_API_KEY=
# OPENAI_API_KEY=
# GROQ_API_KEY=
# DEEPSEEK_API_KEY=
# And many more...`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔗 3. Agent Network Communication
                </h3>
                <p className="text-slate-300 mb-4">Agents communicate through the shared Docker network using service names:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Agent-to-Gateway communication endpoints:<br/>
                    # Documentation Agent → Gateway<br/>
                    http://inference-gateway:8080/v1<br/><br/>
                    # Calendar Agent → Gateway<br/>
                    http://inference-gateway:8080/v1<br/><br/>
                    # Gateway coordinates requests between agents<br/>
                    # and manages LLM provider routing<br/><br/>
                    # All services run on the 'a2a-network' bridge network<br/>
                    # allowing direct container-to-container communication
                  </code>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🛠️ 4. Advanced Configuration
                </h3>
                <p className="text-slate-300 mb-4">Customize timeout, middleware, and provider settings:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block text-sm">
                    # Timeout Configuration<br/>
                    SERVER_READ_TIMEOUT=130s<br/>
                    SERVER_WRITE_TIMEOUT=130s<br/>
                    SERVER_IDLE_TIMEOUT=130s<br/>
                    A2A_CLIENT_TIMEOUT=130s<br/>
                    CLIENT_TIMEOUT=130s<br/><br/>
                    # A2A Configuration<br/>
                    A2A_ENABLE=true<br/>
                    A2A_EXPOSE=true<br/><br/>
                    # Health check endpoint<br/>
                    curl http://localhost:8080/health
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
                  🗣️ 1. Interactive CLI Interface
                </h3>
                <p className="text-slate-300 mb-4">Use the inference CLI for natural language interactions with agents:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Start interactive chat session
docker compose run --rm infer-cli

# Example interactions:
> What's on my calendar today?
> Schedule a meeting for tomorrow at 2pm about project review
> What are the latest React hooks best practices?
> Find documentation about Docker deployment strategies

# The gateway routes requests to appropriate agents:
# - Calendar queries → google-calendar-agent
# - Documentation queries → documentation-agent
# - Complex queries may use multiple agents`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🛠️ 2. Task-Based Debugging
                </h3>
                <p className="text-slate-300 mb-4">Use the A2A debugger to submit specific tasks and monitor agent responses:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# List available task management commands
docker compose run --rm a2a-debugger tasks list

# Submit a streaming task (real-time responses)
docker compose run --rm a2a-debugger tasks submit-streaming \\
  "What's on my calendar today?"

# Submit a task and get task ID
docker compose run --rm a2a-debugger tasks submit \\
  "Schedule a meeting with the team for Friday"

# Get task status and results
docker compose run --rm a2a-debugger tasks get <task_id>

# Test agent capabilities
docker compose run --rm a2a-debugger tasks submit-streaming \\
  "Find React documentation about useEffect hook"`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🌐 3. HTTP API Integration
                </h3>
                <p className="text-slate-300 mb-4">Integrate A2A capabilities into your applications via HTTP API:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-blue-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`// Example: Using the Inference Gateway API
const gatewayUrl = 'http://localhost:8080/v1';

// Chat completion with A2A agent routing
const response = await fetch(\`\${gatewayUrl}/chat/completions\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-api-key'
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat',
    messages: [
      {
        role: 'user',
        content: 'What meetings do I have scheduled for tomorrow? Also find documentation about FastAPI deployment.'
      }
    ],
    stream: false
  })
});

const data = await response.json();
// Gateway automatically routes calendar queries to calendar agent
// and documentation queries to documentation agent`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔄 4. Multi-Agent Workflows
                </h3>
                <p className="text-slate-300 mb-4">Create complex interactions that span multiple agents automatically:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Complex query example - gateway coordinates multiple agents
docker compose run --rm infer-cli

> "Schedule a code review meeting for next week and find the latest 
   documentation about our deployment process. Also check if the 
   conference room is available on Tuesday afternoon."

# The gateway will:
# 1. Parse the multi-part request
# 2. Route calendar scheduling → google-calendar-agent
# 3. Route documentation search → documentation-agent  
# 4. Route room availability → google-calendar-agent
# 5. Coordinate responses and provide unified answer

# Monitor the coordination in logs:
docker compose logs -f inference-gateway
docker compose logs -f google-calendar-agent
docker compose logs -f documentation-agent`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📊 5. Monitoring and Observability
                </h3>
                <p className="text-slate-300 mb-4">Track A2A communication and agent performance:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Monitor service health
docker compose ps
curl http://localhost:8080/health

# View real-time logs from all services
docker compose logs -f

# View specific agent logs
docker compose logs google-calendar-agent
docker compose logs documentation-agent

# Check agent-specific metrics (if exposed)
curl http://localhost:8080/metrics

# Debug network connectivity
docker compose exec inference-gateway ping google-calendar-agent
docker compose exec inference-gateway ping documentation-agent`}
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
                  📊 2. Monitoring & Observability
                </h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Prometheus monitoring<br/>
                    docker run -d \<br/>
                    &nbsp;&nbsp;--name prometheus \<br/>
                    &nbsp;&nbsp;-p 9090:9090 \<br/>
                    &nbsp;&nbsp;-v ./prometheus.yml:/etc/prometheus/prometheus.yml \<br/>
                    &nbsp;&nbsp;prom/prometheus<br/><br/>
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
                  🚀 3. High Availability Setup
                </h3>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <code className="text-green-400 block">
                    # Deployment<br/>
                    apiVersion: apps/v1<br/>
                    kind: Deployment<br/>
                    metadata:<br/>
                    &nbsp;&nbsp;name: gateway<br/>
                    spec:<br/>
                    &nbsp;&nbsp;replicas: 3<br/>
                    &nbsp;&nbsp;selector:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;matchLabels:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app: gateway<br/>
                    &nbsp;&nbsp;template:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;spec:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- name: gateway<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image: ghcr.io/inference-gateway/gateway:latest<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;livenessProbe:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;httpGet:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path: /health<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port: 3000<br/><br/>
                    # HPA<br/>
                    apiVersion: autoscaling/v2<br/>
                    kind: HorizontalPodAutoscaler<br/>
                    metadata:<br/>
                    &nbsp;&nbsp;name: gateway-hpa<br/>
                    spec:<br/>
                    &nbsp;&nbsp;scaleTargetRef:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;apiVersion: apps/v1<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;kind: Deployment<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: gateway<br/>
                    &nbsp;&nbsp;minReplicas: 2<br/>
                    &nbsp;&nbsp;maxReplicas: 10<br/>
                    &nbsp;&nbsp;metrics:<br/>
                    &nbsp;&nbsp;- type: Resource<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;resource:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: cpu<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: Utilization<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;averageUtilization: 70<br/><br/>
                    ---<br/>
                    # Documentation Agent HPA<br/>
                    apiVersion: autoscaling/v2<br/>
                    kind: HorizontalPodAutoscaler<br/>
                    metadata:<br/>
                    &nbsp;&nbsp;name: documentation-agent-hpa<br/>
                    spec:<br/>
                    &nbsp;&nbsp;scaleTargetRef:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;apiVersion: apps/v1<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;kind: Deployment<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;name: documentation-agent<br/>
                    &nbsp;&nbsp;minReplicas: 1<br/>
                    &nbsp;&nbsp;maxReplicas: 5<br/>
                    &nbsp;&nbsp;metrics:<br/>
                    &nbsp;&nbsp;- type: Resource<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;resource:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: cpu<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target:<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: Utilization<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;averageUtilization: 60
                  </code>
                </div>
                <p className="text-slate-300 mt-4">
                  For optimal horizontal scaling, agents can be configured with external queue storage (Redis, RabbitMQ) 
                  to handle task distribution across multiple replicas efficiently.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔧 4. Performance Optimization
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
              onClick={() => navigate('/agents/')}
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
                    onClick={() => navigate(`/how-to/${section.id}/`)}
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
