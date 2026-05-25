# Inference Gateway Setup

The Inference Gateway coordinates A2A communication and provides a unified
interface to multiple LLM providers. Use the provided Docker Compose setup for
seamless integration.

## 1. Docker Compose architecture

The A2A setup uses Docker Compose with a bridge network for service communication:

```yaml
# docker-compose.yaml
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
    driver: bridge
```

## 2. Gateway configuration

The gateway connects multiple LLM providers:

```sh
# Key gateway settings (.env.gateway)

# Server Configuration
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
ENVIRONMENT=development

# LLM Provider Support (add your API keys)
# ANTHROPIC_API_KEY=
# OPENAI_API_KEY=
# GROQ_API_KEY=
# DEEPSEEK_API_KEY=
# And many more…
```

## 3. Agent network communication

Agents communicate through the shared Docker network using service names:

```sh
# Agent-to-Gateway communication endpoints

# Documentation Agent → Gateway
http://inference-gateway:8080/v1

# Calendar Agent → Gateway
http://inference-gateway:8080/v1

# Gateway coordinates requests between agents
# and manages LLM provider routing

# All services run on the 'a2a-network' bridge network,
# allowing direct container-to-container communication.
```

## 4. Advanced configuration

Customize timeouts, middleware, and provider settings:

```sh
# Timeout configuration
SERVER_READ_TIMEOUT=130s
SERVER_WRITE_TIMEOUT=130s
SERVER_IDLE_TIMEOUT=130s
A2A_AGENT_CLIENT_TIMEOUT=130s
CLIENT_TIMEOUT=130s

# Health check endpoint
curl http://localhost:8080/health
```
