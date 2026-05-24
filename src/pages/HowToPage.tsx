import { useNavigate, useParams } from 'react-router-dom';

export function HowToPage() {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();

  const selectedSection = section || 'prerequisites';

  const sections = [
    { id: 'prerequisites', title: 'Prerequisites', icon: '📋' },
    { id: 'local-setup', title: 'Local Development', icon: '💻' },
    { id: 'gateway-setup', title: 'Gateway Setup', icon: '🚀' },
    { id: 'using-agents', title: 'Using Agents', icon: '🤖' },
    { id: 'build-agents', title: 'Build Dedicated Agents', icon: '🔨' },
    { id: 'enterprise', title: 'Enterprise Setup', icon: '🏭' },
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
A2A_AGENT_CLIENT_MODEL=deepseek-v4-flash
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
                  💡 This starts: inference-gateway, google-calendar-agent, documentation-agent, n8n-agent, browser-agent, mock-agent, cli, and a2a-debugger
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
docker compose run --rm cli

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
      - .env.n8n

  browser-agent:
    image: ghcr.io/inference-gateway/browser-agent:latest
    env_file:
      - .env.browser

  mock-agent:
    image: ghcr.io/inference-gateway/mock-agent:latest

  cli:
    image: ghcr.io/inference-gateway/cli:latest
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
                <p className="text-slate-300 mb-4">The gateway is configured to connect multiple LLM providers:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Key gateway settings (.env.gateway):

# Server Configuration
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
ENVIRONMENT=development

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
                    A2A_AGENT_CLIENT_TIMEOUT=130s<br/>
                    CLIENT_TIMEOUT=130s<br/><br/>
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
                  ⚡ 1. Quick Add from Registry
                </h3>
                <p className="text-slate-300 mb-4">The fastest way to add an agent is directly from the registry using the one-click copy feature:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50 mb-4">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# 1. Browse the agent registry at https://registry.inference-gateway.com
# 2. Find an agent you want to use
# 3. Click the copy button next to "Add to CLI" on the agent card
# 4. Paste and run the command in your terminal

# Example command (copied from registry):
infer agents add documentation-agent

# Example: Add multiple agents
infer agents add google-calendar-agent
infer agents add n8n-agent
infer agents add browser-agent`}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
                  <p className="text-emerald-200 text-sm">
                    💡 <strong>Pro tip:</strong> Each agent card in the registry displays a ready-to-use CLI command.
                    Simply click the copy icon next to the green command text to copy it to your clipboard, then paste
                    it in your terminal. This automatically configures the agent with the correct ID and pulls the
                    latest container image from the registry.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🗣️ 2. Interactive CLI Interface
                </h3>
                <p className="text-slate-300 mb-4">Use the inference CLI for natural language interactions with agents:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Start interactive chat session
docker compose run --rm cli

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
                  🛠️ 3. Task-Based Debugging
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
                  🌐 4. HTTP API Integration
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
    model: 'deepseek/deepseek-v4-flash',
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
                  🔄 5. n8n Workflow Automation
                </h3>
                <p className="text-slate-300 mb-4">Use the n8n agent to generate and execute automated workflows:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Example: Generate a workflow to reach out to new Slack users
docker compose run --rm cli

> "Create an n8n workflow that monitors new users joining our Slack workspace
   and automatically sends them a welcome email with onboarding resources."

# The n8n agent will:
# 1. Generate a complete workflow JSON or YAML
# 2. Include Slack webhook trigger for user events
# 3. Add email composition and sending steps
# 4. Configure conditional logic for different user types
# 5. Write the workflow manifest to a Git-tracked file for deployment

# Example: Database backup automation
> "Generate a workflow to backup our PostgreSQL database daily at 2 AM
   and upload the backup to AWS S3, then notify the team via Slack."

# Example: Social media automation  
> "Create a workflow that posts our latest blog articles to X,
   LinkedIn, and Facebook automatically when published."

# Monitor n8n agent activity:
docker compose logs -f n8n-agent`}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    💡 <strong>Pro tip:</strong> The n8n agent creates workflow manifests in Git repositories, 
                    enabling version control and easy synchronization to your n8n instance using 
                    <code className="bg-blue-800/50 px-1 rounded">https://github.com/edenreich/n8n-cli</code>. This approach provides 
                    flexibility, workflow revisions, and seamless GitOps-style deployment of your automation workflows.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔄 6. Multi-Agent Workflows
                </h3>
                <p className="text-slate-300 mb-4">Create complex interactions that span multiple agents automatically:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Complex query example - gateway coordinates multiple agents
docker compose run --rm cli

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
                  📊 7. Monitoring and Observability
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

# Check Prometheus metrics (requires TELEMETRY_ENABLE=true on the gateway)
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

      case 'build-agents':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Build Dedicated Agents</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Create custom A2A-compatible agents from scratch using the ADL (Agent Definition Language) CLI tool.
              Generate enterprise-ready A2A servers with complete project scaffolding and enterprise deployment options.
            </p>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🛠️ 1. Install ADL CLI
                </h3>
                <p className="text-slate-300 mb-4">Install the ADL CLI tool to generate A2A-compatible agent projects:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Quick install (recommended)
curl -fsSL https://raw.githubusercontent.com/inference-gateway/adl-cli/main/install.sh | bash

# Install from Go
go install github.com/inference-gateway/adl-cli@latest

# Build from source
git clone https://github.com/inference-gateway/adl-cli.git
cd adl-cli
go install .

# Verify installation
adl --help`}
                  </pre>
                </div>
                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    <strong>Prerequisites:</strong> Go 1.24+ is required. Optional: Task runner for additional commands.
                  </p>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🎯 2. Create Agent Definition
                </h3>
                <p className="text-slate-300 mb-4">Start by creating an ADL manifest file that defines your agent's capabilities:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Interactive agent definition creation
adl init my-weather-agent

# This creates an agent.yaml file with prompts for:
# - Agent name and description
# - AI provider configuration (OpenAI, Anthropic, DeepSeek, etc.)
# - Skills and capabilities
# - Authentication settings
# - Deployment preferences`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📝 3. Agent Definition Example
                </h3>
                <p className="text-slate-300 mb-4">Example ADL manifest for a weather information agent:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-yellow-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# agent.yaml
apiVersion: adl.dev/v1
kind: Agent
metadata:
  name: "weather-agent"
  description: "Provides weather information and forecasts"
  version: "1.0.0"

spec:
  capabilities:
    streaming: true
    pushNotifications: false
    stateTransitionHistory: false

  agent:
    provider: "anthropic"  # openai, deepseek, ollama, google, mistral, groq
    model: "claude-3-sonnet-20240229"
    systemPrompt: "You are a weather information agent."
    maxTokens: 4096
    temperature: 0.1

  skills:
    - name: "get_weather"
      description: "Get current weather for a location"
      schema:
        type: object
        properties:
          location:
            type: string
            description: "City name or coordinates"
        required: ["location"]
    
    - name: "get_forecast"
      description: "Get weather forecast for a location"
      schema:
        type: object
        properties:
          location:
            type: string
            description: "City name or coordinates"
          days:
            type: integer
            description: "Number of days to forecast"
        required: ["location", "days"]

  server:
    port: 8080
    debug: false
    auth:
      enabled: true

  language:
    go:
      module: "weather-agent"
      version: "1.21"

  deployment:
    type: "cloudrun"  # or "kubernetes"`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🚀 4. Generate Project Code
                </h3>
                <p className="text-slate-300 mb-4">Generate the complete project structure from your ADL file:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Generate basic project
adl generate --file agent.yaml --output ./my-weather-agent

# Generate with CI/CD workflows
adl generate --file agent.yaml --output ./my-weather-agent --ci --cd

# Generate with Cloud Run deployment
adl generate --file agent.yaml --output ./my-weather-agent --deployment cloudrun

# Generate with AI assistant instructions
adl generate --file agent.yaml --output ./my-weather-agent --ai

# Validate your ADL file before generation
adl validate agent.yaml`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📁 5. Generated Project Structure
                </h3>
                <p className="text-slate-300 mb-4">The ADL CLI generates a enterprise-ready project with all necessary components:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-blue-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`my-weather-agent/
├── main.go              # Main application entry point
├── skills/              # Generated skill implementations
│   ├── get_weather.go
│   └── get_forecast.go
├── Dockerfile           # Container build configuration
├── .github/workflows/   # CI/CD workflows (if --ci flag used)
│   ├── ci.yml
│   └── cd.yml
├── deploy/              # Deployment configurations
│   ├── docker-compose.yml
│   └── cloudrun.yaml    # If --deployment cloudrun used
├── go.mod               # Go module definition
├── go.sum               # Dependency checksums
├── README.md            # Generated documentation
└── agent.yaml           # Original ADL manifest`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  ⚙️ 6. Supported AI Providers
                </h3>
                <p className="text-slate-300 mb-4">The ADL CLI supports multiple AI providers for powering your agents:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <div className="grid grid-cols-2 gap-4 text-green-400">
                    <div>
                      <h4 className="font-medium text-white mb-2">Hosted Providers:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• OpenAI (GPT models)</li>
                        <li>• Anthropic (Claude models)</li>
                        <li>• DeepSeek</li>
                        <li>• Google AI (Gemini)</li>
                        <li>• Mistral AI</li>
                        <li>• Groq</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">Self-Hosted:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Ollama (local models)</li>
                        <li>• Inference Gateway</li>
                        <li>• Custom OpenAI-compatible APIs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🔧 7. Build and Deploy
                </h3>
                <p className="text-slate-300 mb-4">Build and deploy your generated agent:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Navigate to generated project
cd my-weather-agent

# Build the Go application
go build -o agent main.go

# Run locally for testing
./agent

# Build Docker container
docker build -t ghcr.io/myorg/weather-agent:latest .

# Test with docker-compose
docker-compose up -d

# Deploy to production
docker push ghcr.io/myorg/weather-agent:latest

# Register the agent with the CLI (interactive)
docker compose run --rm cli infer agents add weather-agent http://weather-agent:8080

# OR set it on the cli service in docker-compose.yaml:
# environment:
#   INFER_A2A_AGENTS: "http://weather-agent:8080,http://other-agent:8080"`}
                  </pre>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🧪 8. Test Your Agent
                </h3>
                <p className="text-slate-300 mb-4">Test your custom agent using the A2A ecosystem tools:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Test with A2A debugger
docker compose run --rm a2a-debugger tasks submit-streaming \\
  "What's the weather like in London today?"

# Interactive testing
docker compose run --rm cli

> "Get me the weather forecast for New York for the next 3 days"
> "What's the current weather in Tokyo?"

# Verify agent registration on the gateway
curl http://localhost:8080/v1/a2a/agents
# Should include your weather agent

# Check agent health
curl http://weather-agent:8080/health`}
                  </pre>
                </div>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-emerald-200 mb-4 flex items-center gap-2">
                  💡 Key Benefits of ADL CLI
                </h3>
                <ul className="list-disc list-inside text-emerald-100 space-y-2 ml-4">
                  <li><strong>Enterprise-Ready:</strong> Generates enterprise-grade code with proper structure and best practices</li>
                  <li><strong>Multi-Language:</strong> Supports Go and Rust for high-performance agent development</li>
                  <li><strong>CI/CD Integration:</strong> Automatically generates GitHub workflows for continuous integration and deployment</li>
                  <li><strong>Flexible Deployment:</strong> Supports Docker, Cloud Run, and Kubernetes deployment options</li>
                  <li><strong>AI Provider Agnostic:</strong> Works with multiple AI providers including self-hosted solutions</li>
                  <li><strong>Schema Validation:</strong> Built-in validation ensures your ADL files are correctly formatted</li>
                  <li><strong>A2A Compatible:</strong> Generated agents are fully compatible with the inference gateway ecosystem</li>
                  <li><strong>Minimal Configuration:</strong> Generate complete projects with minimal manual setup required</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'enterprise':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Setup</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              The recommended path for production is the{' '}
              <a href="https://github.com/inference-gateway/operator" className="text-blue-400 hover:text-blue-300 transition-colors">
                Inference Gateway Operator
              </a>
              , which manages gateways and A2A agents as first-class Kubernetes resources via custom CRDs - replacing hand-written Deployment + HPA manifests.
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
                      <li><strong>Kubernetes:</strong> Recommended for production deployments</li>
                      <li><strong>Operator:</strong> Use the Inference Gateway Operator for declarative management of gateways, A2A agents, MCP servers, and orchestrators</li>
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
                  📦 2. Install the Operator
                </h3>
                <p className="text-slate-300 mb-4">Install the operator with a single <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">kubectl apply</code>:</p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-green-400 whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`# Install the latest release
kubectl apply -f https://github.com/inference-gateway/operator/releases/latest/download/install.yaml

# Verify the operator is running
kubectl get pods -n inference-gateway-system

# Inspect the installed CRDs
kubectl get crds | grep inference-gateway.com`}
                  </pre>
                </div>
                <p className="text-slate-300 mt-4">The operator ships four CRDs under <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">core.inference-gateway.com/v1alpha1</code>:</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1 ml-4 mt-2">
                  <li><strong>Gateway:</strong> The inference gateway itself (providers, auth, telemetry, HPA, ingress)</li>
                  <li><strong>Agent:</strong> A2A worker agents discoverable by orchestrators</li>
                  <li><strong>Orchestrator:</strong> Channel managers (e.g., Telegram bot) that fan out to agents</li>
                  <li><strong>MCP:</strong> Model Context Protocol servers (tools / extensions)</li>
                </ul>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🚀 3. Deploy a Gateway with Native HPA
                </h3>
                <p className="text-slate-300 mb-4">
                  Define the gateway declaratively. The operator generates the underlying Deployment, Service, and HorizontalPodAutoscaler - no separate manifests needed. The namespace must carry the <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">inference-gateway.com/managed: "true"</code> label so the operator opts in to managing resources inside it.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-yellow-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`---
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
      secretName: inference-gateway-tls`}
                  </pre>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 Full example with auth, MCP, and multi-provider config: <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">operator/examples/gateway-complete</code>
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  🤖 4. Deploy A2A Agents
                </h3>
                <p className="text-slate-300 mb-4">
                  Each A2A agent is its own <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">Agent</code> resource. The operator wires it to the gateway and exposes it on the cluster network. Don't forget the managed-namespace label here too.
                </p>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                  <pre className="text-yellow-400 text-sm whitespace-pre overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb:hover]:bg-slate-500">
{`---
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
    orchestrator: orchestrator  # opt-in to orchestrator service discovery
spec:
  image: ghcr.io/inference-gateway/google-calendar-agent:latest
  agent:
    llm:
      baseURL: "http://inference-gateway.inference-gateway.svc.cluster.local:8080/v1"
      model: "deepseek/deepseek-v4-flash"
  env:
    - name: GOOGLE_CALENDAR_MOCK_MODE
      value: "true"`}
                  </pre>
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  💡 End-to-end example (Gateway + multiple Agents + Orchestrator + Redis): <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">operator/examples/orchestrator</code>
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  📊 5. Monitoring & Observability
                </h3>
                <p className="text-slate-300 mb-4">
                  Setting <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">spec.telemetry.metrics.enabled: true</code> on the Gateway exposes Prometheus metrics on the configured port (default <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">9464</code>). Scrape it with your existing Prometheus / OpenTelemetry stack.
                </p>
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
                  🔧 6. Performance Optimization
                </h3>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li><strong>Load balancing:</strong> Distribute requests across agent replicas</li>
                  <li><strong>Caching:</strong> Implement response caching for frequently requested data</li>
                  <li><strong>Connection pooling:</strong> Reuse connections between agents and gateway</li>
                  <li><strong>Horizontal scaling:</strong> Tune <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">spec.hpa</code> on the Gateway CR for traffic-based scaling</li>
                  <li><strong>Resource limits:</strong> Set appropriate CPU and memory limits via <code className="bg-slate-900 px-2 py-1 rounded text-blue-400">spec.resources</code></li>
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
