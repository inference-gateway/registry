---
layout: home

hero:
  name: Inference Gateway
  text: Registry
  tagline: Discover A2A (Agent-to-Agent) services and portable skills you can drop into any agent.
  actions:
    - theme: brand
      text: Browse Agents
      link: /agents/
    - theme: brand
      text: Browse Skills
      link: /skills/
    - theme: alt
      text: How To
      link: /how-to/prerequisites
    - theme: alt
      text: View on GitHub
      link: https://github.com/inference-gateway/registry

features:
  - icon: 🤖
    title: ADL-compliant agents
    details: Every listed agent ships an `agent.yaml` that follows the Agent Definition Language schema, so capabilities, tools, and skills are uniformly typed and discoverable.
  - icon: 🧩
    title: Portable skills
    details: Drop-in markdown playbooks installable with `infer skills install <name>`. Vendor-neutral and reusable across any ADL agent.
  - icon: 🛰️
    title: Live catalog
    details: Agent and skill entries are fetched at runtime from the catalog repos via jsDelivr. Listing a new entry takes a PR - no redeploy of this site.
  - icon: 🚀
    title: One-command install
    details: Each card surfaces a ready-to-paste `infer agents add` or `infer skills install` command and, where available, the OCI image tag.
  - icon: 🔌
    title: Vendor-neutral
    details: Swap providers (OpenAI, Anthropic, DeepSeek, Google, Mistral, Ollama, Groq) and runtimes without rewriting the agent. ADL keeps everything portable.
  - icon: 🛠️
    title: How-to guides
    details: Step-by-step instructions for local development, gateway setup, multi-agent workflows, building your own agent, and enterprise deployment with the operator.
---

## Submit yours

The registry indexes two external catalogs - it does not store agent or skill
manifests itself.

- **Agents** live in [`inference-gateway/agents`](https://github.com/inference-gateway/agents).
  Any public GitHub repo that ships an ADL `agent.yaml` at its root is eligible.
  Open a PR adding one entry to `agents.yaml` with the repo URL and an optional `ref`.
- **Skills** live in [`inference-gateway/skills`](https://github.com/inference-gateway/skills).
  PRs add per-skill files. Each skill carries an SPDX `license` field.

CI in each catalog repo validates the entry and regenerates `catalog.json` on
merge; the new entry appears here within the jsDelivr `@main` cache window
(up to ~12h).
