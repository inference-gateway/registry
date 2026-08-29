# Inference Gateway Registry

Static VitePress site listing ADL-compliant A2A agents and portable skills.
Visual language matches the ADL docs site (teal `#3c8772`, Inter font,
light/dark toggle).

## Commands (all from repo root; requires Bun >=1.2)

- `bun install` - install deps; `prepare` hook points git at `.githooks/`.
- `bun run dev` - VitePress dev server with HMR.
- `bun run build` - build static site into `.vitepress/dist`.
- `bun run preview` - serve the production build locally.
- `bun run codegen` - regenerate `.vitepress/types/adl.ts` from the upstream
  ADL JSON Schema (`scripts/codegen-adl.mjs`, fetches from jsDelivr).

`Taskfile.yml` wraps these (`task dev`, `task build`, ...). `task lint` runs
markdownlint; `task format` / `task format:check` run Prettier (provided by
the Flox env; `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md` are excluded).
CI runs build, Prettier check, markdownlint, and a codegen-fresh check that
fails if the committed `adl.ts` drifted from the upstream schema.

## Testing

No test framework. Validate changes with `bun run build`.

## Layout

- `index.md`, `agents/index.md`, `skills/index.md` - landing page and thin
  shells embedding `<AgentsBrowser />` / `<SkillsBrowser />`.
- `how-to/*.md` - six guides (prerequisites, browse-and-install,
  list-an-agent, list-a-skill, build-agents, enterprise).
- `.vitepress/config.ts` - nav, sidebar, theme color, head meta, sitemap.
- `.vitepress/components/` - Vue 3 Composition API browsers and cards.
- `.vitepress/lib/` - data services (`agentService.ts`, `skillService.ts`),
  ADL helpers (`adl.ts`), type re-exports.
- `.vitepress/types/adl.ts` - generated; never hand-edit.
- `public/` - favicons, OG images, manifest, robots.
- `wrangler.jsonc` - Cloudflare Workers deployment config.

## Architecture gotchas

- Agent/skill metadata does NOT live in this repo. Catalogs are fetched at
  runtime from sibling repos via jsDelivr (`inference-gateway/agents`,
  `inference-gateway/skills` -> `catalog.json`). To add an agent or skill, PR
  the catalog repo, not this one. Override URLs locally with
  `VITE_AGENTS_CATALOG_URL` / `VITE_SKILLS_CATALOG_URL`.
- The ADL schema lives in `inference-gateway/adl`; after schema changes run
  `bun run codegen` and commit the result (CI enforces freshness).
- Deployment: `.github/workflows/static.yml` deploys `wrangler.jsonc` assets
  to Cloudflare Workers (registry.inference-gateway.com) on manual dispatch.
  README's "GitHub Pages" wording is stale.

## Coding style

- Vue 3 Composition API (`<script setup lang="ts">`); components PascalCase
  (`AgentCard.vue`), `lib/` modules camelCase (`agentService.ts`).
- Style with VitePress `--vp-c-*` CSS variables so light/dark works
  automatically; shared styles in `.vitepress/theme/custom.css` under
  `.reg-card` / `.reg-browser__*`.
- Markdown lines <=120 characters. Add project terminology to `cspell.json`.

## Commits & PRs

Conventional commits, lowercase, scoped (`feat(registry): add agents
browser`). PRs: concise description, linked issue when available, screenshots
for visible UI changes, and the verification command run (typically
`bun run build`).
