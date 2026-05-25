# Using A2A Agents

Learn how to interact with agents and leverage their capabilities in your
applications.

## 1. Quick add from the registry

The fastest way to add an agent is directly from the registry using the one-click
copy feature:

```sh
# 1. Browse the agent registry at https://registry.inference-gateway.com
# 2. Find an agent you want to use
# 3. Click the copy button next to "Add to CLI" on the agent card
# 4. Paste and run the command in your terminal

# Example command (copied from registry):
infer agents add documentation-agent

# Example: add multiple agents
infer agents add google-calendar-agent
infer agents add n8n-agent
infer agents add browser-agent
```

::: tip Pro tip
Each agent card surfaces a ready-to-use CLI command. Click the copy icon next
to the command, paste it in your terminal, and the agent is registered with the
correct ID against the latest container image.
:::

## 2. Interactive CLI

Use the inference CLI for natural-language interactions with agents:

```sh
# Start interactive chat session
docker compose run --rm cli

# Example interactions:
> What's on my calendar today?
> Schedule a meeting for tomorrow at 2pm about project review
> What are the latest React hooks best practices?
> Find documentation about Docker deployment strategies

# The gateway routes requests to appropriate agents:
# - Calendar queries → google-calendar-agent
# - Documentation queries → documentation-agent
# - Complex queries may use multiple agents
```

## 3. Task-based debugging

Use the A2A debugger to submit specific tasks and monitor agent responses:

```sh
# List available task management commands
docker compose run --rm a2a-debugger tasks list

# Submit a streaming task (real-time responses)
docker compose run --rm a2a-debugger tasks submit-streaming \
  "What's on my calendar today?"

# Submit a task and get a task ID
docker compose run --rm a2a-debugger tasks submit \
  "Schedule a meeting with the team for Friday"

# Get task status and results
docker compose run --rm a2a-debugger tasks get <task_id>

# Test agent capabilities
docker compose run --rm a2a-debugger tasks submit-streaming \
  "Find React documentation about useEffect hook"
```

## 4. HTTP API integration

Integrate A2A capabilities into your applications via HTTP API:

```js
// Example: using the Inference Gateway API
const gatewayUrl = "http://localhost:8080/v1";

// Chat completion with A2A agent routing
const response = await fetch(`${gatewayUrl}/chat/completions`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your-api-key",
  },
  body: JSON.stringify({
    model: "deepseek/deepseek-v4-flash",
    messages: [
      {
        role: "user",
        content:
          "What meetings do I have scheduled for tomorrow? Also find documentation about FastAPI deployment.",
      },
    ],
    stream: false,
  }),
});

const data = await response.json();
// Gateway automatically routes calendar queries to the calendar agent
// and documentation queries to the documentation agent.
```

## 5. n8n workflow automation

Use the n8n agent to generate and execute automated workflows:

```sh
# Example: generate a workflow to reach out to new Slack users
docker compose run --rm cli

> "Create an n8n workflow that monitors new users joining our Slack workspace
   and automatically sends them a welcome email with onboarding resources."

# The n8n agent will:
# 1. Generate a complete workflow JSON or YAML
# 2. Include a Slack webhook trigger for user events
# 3. Add email composition and sending steps
# 4. Configure conditional logic for different user types
# 5. Write the workflow manifest to a Git-tracked file for deployment

# Example: database backup automation
> "Generate a workflow to backup our PostgreSQL database daily at 2 AM
   and upload the backup to AWS S3, then notify the team via Slack."

# Example: social media automation
> "Create a workflow that posts our latest blog articles to X,
   LinkedIn, and Facebook automatically when published."

# Monitor n8n agent activity:
docker compose logs -f n8n-agent
```

::: tip Pro tip
The n8n agent creates workflow manifests in Git repositories, enabling version
control and easy synchronization to your n8n instance using
[`edenreich/n8n-cli`](https://github.com/edenreich/n8n-cli). This gives you
flexibility, workflow revisions, and GitOps-style deployment of your automation
workflows.
:::

## 6. Multi-agent workflows

Create complex interactions that span multiple agents automatically:

```sh
# Complex query - the gateway coordinates multiple agents
docker compose run --rm cli

> "Schedule a code review meeting for next week and find the latest
   documentation about our deployment process. Also check if the
   conference room is available on Tuesday afternoon."

# The gateway will:
# 1. Parse the multi-part request
# 2. Route calendar scheduling → google-calendar-agent
# 3. Route documentation search → documentation-agent
# 4. Route room availability → google-calendar-agent
# 5. Coordinate responses and provide a unified answer

# Monitor the coordination in logs:
docker compose logs -f inference-gateway
docker compose logs -f google-calendar-agent
docker compose logs -f documentation-agent
```

## 7. Monitoring and observability

Track A2A communication and agent performance:

```sh
# Monitor service health
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
docker compose exec inference-gateway ping documentation-agent
```
