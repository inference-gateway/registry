# Repository Guidelines

## Project Structure & Module Organization

This repository is a static [VitePress](https://vitepress.dev/) site for the
inference-gateway registry. The visual language matches the ADL docs site
(teal `#3c8772`, Inter font, light + dark toggle).

All site code lives at the repo root:

- `index.md` - landing page (hero + feature cards, VitePress `layout: home`).
- `agents/index.md` and `skills/index.md` - thin shells that embed
  `<AgentsBrowser />` and `<SkillsBrowser />`.
- `how-to/*.md` - six markdown how-to guides (prerequisites,
  browse-and-install, list-an-agent, list-a-skill, build-agents, enterprise).
- `.vitepress/config.ts` - nav, sidebar, theme color, head meta, sitemap.
- `.vitepress/theme/{index.ts,custom.css}` - default-theme extension and
  brand overrides (teal CSS vars + Inter font).
- `.vitepress/components/` - Vue 3 Composition API components
  (`AgentsBrowser.vue`, `SkillsBrowser.vue`, `AgentCard.vue`, `SkillCard.vue`).
- `.vitepress/lib/` - data services (`agentService.ts`, `skillService.ts`),
  ADL helpers (`adl.ts`), and type re-exports (`types.ts`).
- `.vitepress/types/adl.ts` - **generated** from the upstream ADL JSON
  Schema. Do not hand-edit; run `bun run codegen` instead.
- `public/` - favicons, OG images, manifest, robots, CNAME.

Agent and skill metadata do **not** live in this repo - both are fetched at
runtime from sibling catalog repos (`inference-gateway/agents` and
`inference-gateway/skills`) via jsDelivr.

## Build, Test, and Development Commands

All commands run from the repo root:

- `bun install`: install dependencies. Bun `>=1.2` is required.
- `bun run dev`: start the VitePress dev server with HMR.
- `bun run build`: build the static site into `.vitepress/dist`.
- `bun run preview`: serve the production build locally.
- `bun run codegen`: regenerate `.vitepress/types/adl.ts` from the
  upstream ADL JSON Schema. Run after ADL changes and commit the result.

A `Taskfile.yml` at the repo root wraps these (`task dev`, `task build`, etc.).
`task lint` runs `markdownlint --fix` over
the repo. `task format` / `task format:check` run Prettier over the repo
(`AGENTS.md`, `CLAUDE.md`, and `CHANGELOG.md` are excluded via
`.prettierignore`); Prettier is provided by the Flox env.

## Coding Style & Naming Conventions

- Use Vue 3 Composition API (`<script setup lang="ts">`) for components.
- Component filenames are PascalCase (`AgentCard.vue`); modules under `lib/`
  are camelCase (`agentService.ts`).
- Style components with the VitePress `--vp-c-*` CSS variables so they track
  light / dark mode automatically. Shared styles live in
  `.vitepress/theme/custom.css` under the `.reg-card` / `.reg-browser__*`
  namespaces.
- Markdown is line-length-limited to 120 characters. If spell checking flags
  valid project terminology, add it to `cspell.json`.

## Testing Guidelines

No test framework is configured. For now, validate changes with
`bun run build`.

## Agent and Skill Metadata Workflow

Agent and skill metadata live outside this repo and are fetched at runtime via
jsDelivr. Override the catalog URLs locally with `VITE_AGENTS_CATALOG_URL` /
`VITE_SKILLS_CATALOG_URL`. Do not add catalog data to this repository unless
the architecture changes intentionally.

- **Agents** (`inference-gateway/agents`): the catalog repo holds only an
  `agents.yaml` list of upstream GitHub repo URLs. Each agent's canonical
  `agent.yaml` (ADL format) lives in that agent's own repo. The catalog repo's
  CI fetches, validates against the ADL schema, and bundles into
  `catalog.json` on push and a daily cron. To add a new agent, open a PR
  adding one entry to `agents.yaml`. Third-party repos are welcome; pin a
  release tag when you can.
- **Skills** (`inference-gateway/skills`): per-skill files in that repo; PR
  to add or update.
- The ADL schema itself lives in `inference-gateway/adl`. Schema changes
  require running `bun run codegen` here to refresh
  `.vitepress/types/adl.ts`.

## Commit & Pull Request Guidelines

Recent history follows conventional commits with lowercase subjects, for
example `chore(deps): bump dev dependencies`. Prefer scoped messages such as
`feat(registry): add agents browser`.

Pull requests should include a concise description, linked issue when
available, and screenshots for visible UI changes. Note the verification
commands you ran (typically `bun run build`).
