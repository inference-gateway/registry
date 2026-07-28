<div align="center">

# Inference Gateway Registry

[![Deploy to Pages](https://github.com/inference-gateway/registry/actions/workflows/static.yml/badge.svg)](https://github.com/inference-gateway/registry/actions/workflows/static.yml)
[![CI](https://github.com/inference-gateway/registry/actions/workflows/ci.yml/badge.svg)](https://github.com/inference-gateway/registry/actions/workflows/ci.yml)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![VitePress](https://img.shields.io/badge/VitePress-1.6-3c8772.svg)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5-3c8772.svg)](https://vuejs.org/)

Discovery hub for A2A (Agent-to-Agent) services and portable skills in the
inference-gateway ecosystem. Every entry follows the
[Agent Definition Language](https://adl.inference-gateway.com/) schema.

</div>

## Overview

The registry is a static documentation site that lists ADL-compliant agents and
portable skills. Both catalogs are fetched at runtime from sibling repos via
jsDelivr, so adding or updating an entry doesn't require redeploying this site:

- **Agents catalog**: [`inference-gateway/agents`](https://github.com/inference-gateway/agents)
  -> `https://cdn.jsdelivr.net/gh/inference-gateway/agents@latest/catalog.json`
- **Skills catalog**: [`inference-gateway/skills`](https://github.com/inference-gateway/skills)
  -> `https://cdn.jsdelivr.net/gh/inference-gateway/skills@latest/catalog.json`

Override the catalog URLs locally with `VITE_AGENTS_CATALOG_URL` /
`VITE_SKILLS_CATALOG_URL` (the Vite env vars exposed by VitePress).

## Tech stack

- [VitePress](https://vitepress.dev/) 1.6 for the static site
- [Vue 3](https://vuejs.org/) Composition API for the dynamic Agents and Skills browsers
- Plain Markdown for the landing page and How-To guides
- Deployed to [GitHub Pages](https://registry.inference-gateway.com) on push to `main`

The look and feel matches the
[ADL docs site](https://adl.inference-gateway.com/) (teal `#3c8772`, Inter,
light/dark toggle).

## Quick start

```sh
# All commands run from the repo root


# Install dependencies (requires Bun >=1.2)
bun install

# Start the dev server with HMR
bun run dev

# Build the static site into .vitepress/dist
bun run build

# Serve the production build locally
bun run preview
```

## Project layout

```text
├── index.md                       # Landing page (hero + features)
├── agents/index.md                # Embeds <AgentsBrowser />
├── skills/index.md                # Embeds <SkillsBrowser />
├── how-to/                        # Six markdown how-to guides
├── public/                        # Favicons, OG images, CNAME, robots.txt
├── scripts/codegen-adl.mjs        # Regenerates the ADL TypeScript types
└── .vitepress/
    ├── config.ts                  # Nav, sidebar, theme color, head meta
    ├── theme/{index.ts,custom.css}
    ├── components/                # AgentsBrowser, SkillsBrowser, AgentCard, SkillCard
    ├── lib/                       # agentService, skillService, adl, types
    └── types/adl.ts               # Generated from the upstream ADL JSON Schema
```

## Adding new agents

Agent metadata is **not** in this repo. Any public GitHub repo that ships an
ADL `agent.yaml` at its root is eligible. Open a PR against
[`inference-gateway/agents`](https://github.com/inference-gateway/agents)
adding one entry to `agents.yaml` with the repo URL and an optional `ref`.
CI in the agents repo rebuilds `catalog.json` on merge; the new agent appears
on this site within the jsDelivr `@main` cache window (up to ~12h) with no
redeploy here.

To submit a new **skill**, open a PR against `inference-gateway/skills`.

The ADL schema itself lives in [`inference-gateway/adl`](https://github.com/inference-gateway/adl).
Schema changes require running `bun run codegen` here to refresh
`.vitepress/types/adl.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `bun run build` to confirm it still builds
5. Open a pull request

## License

Apache 2.0 - see [LICENSE](./LICENSE).
