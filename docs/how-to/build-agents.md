# Build Dedicated Agents

Create custom A2A-compatible agents from scratch using the
[ADL CLI](https://github.com/inference-gateway/adl-cli). Generate enterprise-ready
A2A servers with complete project scaffolding and deployment options.

## 1. Install ADL CLI

Install the ADL CLI to generate A2A-compatible agent projects:

```sh
# Quick install (recommended)
curl -fsSL https://raw.githubusercontent.com/inference-gateway/adl-cli/main/install.sh | bash

# Install from Go
go install github.com/inference-gateway/adl-cli@latest

# Build from source
git clone https://github.com/inference-gateway/adl-cli.git
cd adl-cli
go install .

# Verify installation
adl --help
```

::: info Prerequisites
Go 1.24+ is required. Optional: Task runner for additional commands.
:::

## 2. Create an agent definition

Start by creating an ADL manifest that defines your agent's capabilities:

```sh
# Interactive agent definition creation
adl init my-weather-agent

# This creates an agent.yaml file with prompts for:
# - Agent name and description
# - AI provider configuration (OpenAI, Anthropic, DeepSeek, …)
# - Skills and capabilities
# - Authentication settings
# - Deployment preferences
```

## 3. Example ADL manifest

```yaml
# agent.yaml
apiVersion: adl.inference-gateway.com/v1
kind: Agent
metadata:
  name: weather-agent
  description: Provides weather information and forecasts
  version: "1.0.0"

spec:
  capabilities:
    streaming: true
    pushNotifications: false
    stateTransitionHistory: false

  agent:
    provider: anthropic # openai, deepseek, ollama, google, mistral, groq
    model: claude-3-sonnet-20240229
    systemPrompt: You are a weather information agent.
    maxTokens: 4096
    temperature: 0.1

  tools:
    - id: get_weather
      name: Get weather
      description: Get current weather for a location
      schema:
        type: object
        properties:
          location:
            type: string
            description: City name or coordinates
        required: [location]

    - id: get_forecast
      name: Get forecast
      description: Get weather forecast for a location
      schema:
        type: object
        properties:
          location:
            type: string
            description: City name or coordinates
          days:
            type: integer
            description: Number of days to forecast
        required: [location, days]

  server:
    port: 8080

  language:
    go:
      module: weather-agent
      version: "1.21"

  deployment:
    type: cloudrun # or "kubernetes"
```

## 4. Generate project code

Generate the complete project structure from your ADL manifest:

```sh
# Generate basic project
adl generate --file agent.yaml --output ./my-weather-agent

# Generate with CI/CD workflows
adl generate --file agent.yaml --output ./my-weather-agent --ci --cd

# Generate with Cloud Run deployment
adl generate --file agent.yaml --output ./my-weather-agent --deployment cloudrun

# Generate with AI assistant instructions
adl generate --file agent.yaml --output ./my-weather-agent --ai

# Validate the ADL file before generation
adl validate agent.yaml
```

## 5. Generated project structure

The ADL CLI generates an enterprise-ready project with all necessary components:

```text
my-weather-agent/
├── main.go              # Main application entry point
├── tools/               # Generated tool implementations
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
└── agent.yaml           # Original ADL manifest
```

## 6. Supported AI providers

The ADL CLI supports multiple AI providers for powering your agents.

### Hosted providers

- OpenAI (GPT models)
- Anthropic (Claude models)
- DeepSeek
- Google AI (Gemini)
- Mistral AI
- Groq

### Self-hosted

- Ollama (local models)
- Inference Gateway
- Custom OpenAI-compatible APIs

## 7. Build and deploy

Build and deploy your generated agent:

```sh
# Navigate to generated project
cd my-weather-agent

# Build the Go application
go build -o agent main.go

# Run locally for testing
./agent

# Build the Docker container
docker build -t ghcr.io/myorg/weather-agent:latest .

# Test with docker-compose
docker-compose up -d

# Deploy to production
docker push ghcr.io/myorg/weather-agent:latest

# Register the agent with the CLI (interactive)
docker compose run --rm cli infer agents add weather-agent http://weather-agent:8080

# OR set it on the cli service in docker-compose.yaml:
# environment:
#   INFER_A2A_AGENTS: "http://weather-agent:8080,http://other-agent:8080"
```

## 8. Test your agent

Test your custom agent using the A2A ecosystem tools:

```sh
# Test with A2A debugger
docker compose run --rm a2a-debugger tasks submit-streaming \
  "What's the weather like in London today?"

# Interactive testing
docker compose run --rm cli

> "Get me the weather forecast for New York for the next 3 days"
> "What's the current weather in Tokyo?"

# Verify agent registration on the gateway
curl http://localhost:8080/v1/a2a/agents
# Should include your weather agent

# Check agent health
curl http://weather-agent:8080/health
```

## Key benefits of the ADL CLI

- **Enterprise-ready**: generates enterprise-grade code with proper structure and best practices.
- **Multi-language**: supports Go, Rust, and TypeScript for high-performance agent development.
- **CI/CD integration**: automatically generates GitHub workflows for continuous integration and deployment.
- **Flexible deployment**: supports Docker, Cloud Run, and Kubernetes deployment options.
- **AI-provider-agnostic**: works with multiple AI providers including self-hosted ones.
- **Schema validation**: built-in validation ensures your ADL files are correctly formatted.
- **A2A-compatible**: generated agents are fully compatible with the inference-gateway ecosystem.
- **Minimal configuration**: complete projects with minimal manual setup required.
