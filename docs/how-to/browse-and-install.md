# Browse & Install

The registry is a catalog index. Browse it to find an agent or skill, then
copy the command from its card and run it locally.

## Find an agent or skill

Open [Agents](/agents/) or [Skills](/skills/). Each page lists every entry
in the corresponding catalog with live filters above the grid:

- **Search** matches name, description, and tags (case-insensitive
  substring).
- **Tag filter** (agents) narrows by any tag derived from the agent's
  tools and skills.
- **Vendor filter** (skills) narrows by the maintainer listed on the
  skill.
- **Clear filters** resets everything; the count above the grid updates
  live.

## Install an agent

Every agent card surfaces a copy-paste command. Click the copy icon next to
the `infer agents add` line, then run it:

```sh
infer agents add documentation-agent
```

The CLI writes a local config entry pointing at the agent. From there the
gateway can route requests to it - see the
[CLI repo](https://github.com/inference-gateway/cli) for `infer` semantics.

The **OCI Image** row (e.g. `ghcr.io/inference-gateway/documentation-agent:0.6.3`)
appears when the agent declares
`spec.deployment.cloudrun.image` or `spec.deployment.kubernetes.image`,
or when the source repo lives in the `inference-gateway` org (in which
case the image is inferred from the agent name and version). Use that tag
when wiring the agent into Kubernetes or Docker Compose yourself.

## Install a skill

Skill cards work the same way:

```sh
infer skills install skill-creator
```

A skill is a markdown playbook injected into an agent's system prompt. The
**SPDX license** badge on each card (`MIT`, `Apache-2.0`, `Proprietary`,
etc.) lets you vet redistribution terms before installing.

## What the card tells you

Card fields map directly to the underlying schema:

- **Capabilities pills** (`Streaming`, `Push`, `State History`) -
  `spec.capabilities` on the agent's ADL manifest.
- **Tools / Skills counts** - `spec.tools[]` and `spec.skills[]`. Expand
  either list for per-entry detail.
- **Model** - `spec.agent.model` when set.
- **Source** button - the upstream GitHub repo. For agents this comes from
  `spec.scm.url`, falling back to the `_source.url` provenance block the
  catalog aggregator injects.
- **Docs** button - `spec.card.documentationUrl` when set.

## Where the data comes from

Both catalogs are fetched at runtime - this site is just a static
front-end:

- Agents: `https://cdn.jsdelivr.net/gh/inference-gateway/agents@latest/catalog.json`
- Skills: `https://cdn.jsdelivr.net/gh/inference-gateway/skills@latest/catalog.json`

The `@main` ref is cached by jsDelivr for up to ~12 hours, so a freshly
merged entry may not appear here immediately. For local development you
can point at a fork or branch via the `VITE_AGENTS_CATALOG_URL` and
`VITE_SKILLS_CATALOG_URL` environment variables.

## Next steps

- Want to list your own agent? See [List an Agent](/how-to/list-an-agent).
- Want to list a skill? See [List a Skill](/how-to/list-a-skill).
- Need to run a gateway?
  [`inference-gateway/inference-gateway`](https://github.com/inference-gateway/inference-gateway).
- Deploying to Kubernetes? See
  [Enterprise Deployment](/how-to/enterprise).
