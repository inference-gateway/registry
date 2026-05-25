# Local Development Setup

Set up your local environment to interact with A2A agents for development
and testing.

## 1. Get the A2A examples

Download the complete A2A setup from the inference-gateway CLI repository:

```sh
# Clone or download the A2A examples
git clone https://github.com/inference-gateway/cli.git
cd cli/examples/a2a

# OR download specific files:
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/docker-compose.yaml
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/.env.gateway.example
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/.env.documentation.example
curl -O https://raw.githubusercontent.com/inference-gateway/cli/main/examples/a2a/.env.calendar.example
```

## 2. Configure environment files

Create and configure the required environment files.

### Gateway (`.env.gateway`)

```sh
cp .env.gateway.example .env.gateway

# Key settings:
ENVIRONMENT=development
SERVER_HOST=0.0.0.0
SERVER_PORT=8080

# Add your API keys for providers (Anthropic, OpenAI, etc.)
```

### Documentation agent (`.env.documentation`)

```sh
cp .env.documentation.example .env.documentation

# Key settings:
ENVIRONMENT=development
CONTEXT7_API_KEY=your_context7_api_key
A2A_AGENT_URL=http://localhost:8080
A2A_AGENT_CLIENT_PROVIDER=deepseek
A2A_AGENT_CLIENT_MODEL=deepseek-v4-flash
A2A_AGENT_CLIENT_BASE_URL=http://inference-gateway:8080/v1
```

### Calendar agent (`.env.calendar`)

```sh
cp .env.calendar.example .env.calendar

# Key settings:
ENVIRONMENT=dev
DEMO_MODE=false
GOOGLE_CALENDAR_TIMEZONE=CET
GOOGLE_CALENDAR_READ_ONLY=false
A2A_AGENT_URL=http://google-calendar-agent:8080
A2A_AGENT_CLIENT_BASE_URL=http://inference-gateway:8080/v1
# Add Google Calendar service account JSON
```

## 3. Start the A2A environment

Use Docker Compose to start all services:

```sh
# Start all A2A services
docker compose up -d

# View running services
docker compose ps

# Follow logs from all services
docker compose logs -f
```

::: tip
This starts: `inference-gateway`, `google-calendar-agent`, `documentation-agent`,
`n8n-agent`, `browser-agent`, `mock-agent`, `cli`, and `a2a-debugger`.
:::

## 4. Test A2A communication

Verify the setup with the built-in debugging tools:

```sh
# List available tasks
docker compose run --rm a2a-debugger tasks list

# Test streaming interaction
docker compose run --rm a2a-debugger tasks submit-streaming "What's on my calendar today?"

# Start interactive CLI session
docker compose run --rm cli

# View service status
docker compose ps
docker compose logs inference-gateway
```

::: tip
The debugger provides commands to test agent communication and task submission.
:::
