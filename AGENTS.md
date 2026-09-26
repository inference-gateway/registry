# Inference Gateway Registry

Static VitePress site listing ADL-compliant A2A agents and portable skills.
Visual language matches the ADL docs site (teal `#3c8772`, Inter font,
light/dark toggle).

## Commands (repo root; requires Bun >=1.2)

- `bun install` - install deps; `prepare` hook points git at `.githooks/`.
- `bun run dev` - VitePress dev server with HMR.
- `bun run build` - build the static site into `.vitepress/dist`.
- `bun run preview` - serve the production build locally.
- `bun run codegen` - regenerate `.vitepress/types/adl.ts` from the upstream ADL
  JSON Schema (`scripts/codegen-adl.mjs`, fetches from jsDelivr).

`Taskfile.yml` wraps these (`task dev`, `task build`, ...). `task lint` /
`task lint:fix` run markdownlint (config in `.markdownlint.json`);
`task format` / `task format:check` run Prettier (both provided by the Flox
env; CI uses the same checks pinned via `bun x` - `prettier@3.8.3`,
`markdownlint-cli@0.48.0`). `AGENTS.md` and `CHANGELOG.md` are excluded
from both.

The pre-commit hook (`.githooks/pre-commit`) runs `task format` +
`task lint:fix` on staged files and re-stages any it rewrites - expect commits
to auto-format.

## CI

`.github/workflows/ci.yml` runs on every PR/push to `main`: build, Prettier
check, markdownlint, and a codegen-fresh check that fails if the committed
`.vitepress/types/adl.ts` drifted from the upstream ADL schema.

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

## Coding style and readability

- Vue 3 Composition API (`<script setup lang="ts">`); components PascalCase
  (`AgentCard.vue`), `lib/` modules camelCase (`agentService.ts`).
- Style with VitePress `--vp-c-*` CSS variables so light/dark works
  automatically; shared styles in `.vitepress/theme/custom.css` under
  `.reg-card` / `.reg-browser__*`.
- Markdown lines <=120 characters. Add project terminology to `cspell.json`.
- Write self-explanatory code: clear names and small, single-purpose functions carry the intent.
  If a block needs a comment to be understood, extract it into a well-named function or variable.
- No inline comments inside function bodies.
- Doc comments on functions and types are at most 5 lines: what it does and why, not how.
- No comments above modules, packages, or files.
- Tool directives are not comments and stay where the tool needs them (lint suppressions, build
  tags, compiler pragmas, code generation markers).

## Commits & PRs

Conventional commits, lowercase, scoped (`feat(registry): add agents
browser`). PRs: concise description, linked issue when available, screenshots
for visible UI changes, and the verification command run (typically
`bun run build`).