# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All build commands run inside the `docs/` workspace:

```sh
cd docs
npm install      # install dependencies
npm run dev      # VitePress dev server with HMR (http://localhost:5173)
npm run build    # static site -> docs/.vitepress/dist
npm run preview  # serve the production build
npm run codegen  # regenerate docs/.vitepress/types/adl.ts from the upstream ADL JSON Schema
```

`task dev`, `task build`, `task preview`, `task install`, and `task generate`
wrap the same `npm` scripts and `cd` into `docs/` for you. At the repo root,
`task lint` runs `markdownlint --fix`, and `task format` / `task format:check`
run Prettier (`prettier --write .` / `prettier --check .`). `AGENTS.md`,
`CLAUDE.md`, and `CHANGELOG.md` are excluded via `.prettierignore`. Prettier
is provided by the Flox env, not by `docs/package.json`.

Node `^24.15.0` is required (enforced by `docs/package.json` `engines`). A
Flox env (`.flox/`) pins Node and supporting tools.

There is no test framework configured. Don't invent one - flag it if tests
are requested.

## Architecture

This is a static documentation site built with **VitePress** (Vue 3 under the
hood), deployed to GitHub Pages at `registry.inference-gateway.com`. The visual
language matches the ADL docs site at `adl.inference-gateway.com` (teal
`#3c8772`, Inter font, light + dark theme toggle).

The site has three top-level tabs plus a landing page:

- `/` - landing page (`docs/index.md`, VitePress `layout: home`)
- `/agents/` - browses the agents catalog (`docs/agents/index.md` embeds `<AgentsBrowser />`)
- `/skills/` - browses the skills catalog (`docs/skills/index.md` embeds `<SkillsBrowser />`)
- `/how-to/*` - six markdown how-to guides

It catalogs two kinds of things; both are loaded **at runtime from an external
catalog repo on the CDN**. There is no agent or skill metadata in this repo.

### Agents: runtime, external, ADL-typed

- **Contract**: [ADL](https://github.com/inference-gateway/adl) (Agent Definition
  Language, `apiVersion: adl.inference-gateway.com/v1`). Each agent's
  `agent.yaml` lives in its own GitHub repo and is the canonical source.
- **Catalog**: aggregated from those `agent.yaml` files by
  `inference-gateway/agents`, which keeps an `agents.yaml` list of repo URLs +
  refs and runs a build job (push + daily cron) to fetch, validate, and bundle
  them into `catalog.json`. The site fetches that at runtime via
  `https://cdn.jsdelivr.net/gh/inference-gateway/agents@latest/catalog.json`
  (override with `VITE_AGENTS_CATALOG_URL`).
- **Types are generated**, not hand-written. `docs/.vitepress/types/adl.ts` is
  produced by `docs/scripts/codegen-adl.mjs` from the ADL JSON Schema. Run
  `npm run codegen` after ADL changes; commit the regenerated file. The CI
  check job verifies the committed output is fresh. **Do not hand-edit
  `docs/.vitepress/types/adl.ts`.**
- The catalog injects a non-schema `_source` block per agent
  (`{ url, ref, fetchedAt }`) so the site can show provenance. The generated
  `CatalogAgent` type extends `ADLAgent` with optional `_source`.
- `docs/.vitepress/lib/agentService.ts` memoizes the fetch in a module-level
  promise; on failure it clears the cache so the next call retries. It also
  rejects payloads where any entry has the wrong `apiVersion`. Same memoization
  pattern as `skillService.ts`.
- The `AgentsBrowser` Vue component renders cards via `AgentCard.vue` with
  capabilities badges, tool/skill counts, derived tags from
  `spec.tools[].tags ∪ spec.skills[].tags`, and model info from `spec.agent`.
  Image is computed: prefer `spec.deployment.{cloudrun,kubernetes}.image`,
  fall back to `ghcr.io/inference-gateway/<name>:<version>` only when the
  source repo is in the `inference-gateway` org. Derivation helpers live in
  `docs/.vitepress/lib/adl.ts`.

### Skills: runtime, external

- Fetched at runtime from
  `https://cdn.jsdelivr.net/gh/inference-gateway/skills@latest/catalog.json`
  (override with `VITE_SKILLS_CATALOG_URL`). The skills catalog lives in a
  **separate repo** (`inference-gateway/skills`).
- `docs/.vitepress/lib/skillService.ts` memoizes the fetch the same way as
  `agentService.ts`.

### SSR / hydration

The Agents and Skills browsers do browser-only work (`fetch` on mount,
clipboard writes). They are wrapped in `<ClientOnly>` so the SSR build skips
them and the client hydrates with real data on mount. Keep this pattern when
adding new dynamic components.

### Sitemap

VitePress's built-in `sitemap` config in `docs/.vitepress/config.ts` writes
`sitemap.xml` at build time. Top-level routes don't need to be enumerated
manually - VitePress walks the markdown tree.

## Adding a new agent

Agent metadata is **not** in this repo. Any public GitHub repo that ships an
ADL `agent.yaml` at its root is eligible. Open a PR against
`inference-gateway/agents` appending one entry to `agents.yaml`:

```yaml
- url: https://github.com/<owner>/<repo>
  ref: main # branch / tag / SHA; pinning a release tag is recommended for third-party agents
```

CI in the agents repo (push + daily cron) refetches each `agent.yaml`,
validates against the ADL schema, and regenerates `catalog.json`. The site
picks up the change within the jsDelivr `@main` cache window (~12h). Schema
changes happen upstream in
[`inference-gateway/adl`](https://github.com/inference-gateway/adl) - bump the
schema there, then `npm run codegen` inside `docs/` here to refresh
`docs/.vitepress/types/adl.ts`.

## Conventions

- Commits follow conventional commits with a lowercase subject
  (e.g. `feat(client): add retry mechanism`, `fix(auth): resolve token
  validation issue`). The Claude GitHub Action enforces this via its system
  prompt.
- Markdown is line-length-limited to 120 chars (`.markdownlint.json`); MD029,
  MD033, MD041 are disabled.
- `cspell.json` has a small allowlist - add new domain terms there if they
  trip the spell-checker.
- Brand color is `#3c8772` (teal), font is Inter. Both are set on the
  VitePress theme via `docs/.vitepress/theme/custom.css` and match the ADL
  docs site.

## CI

- `.github/workflows/static.yml` - builds `docs/` with VitePress and deploys
  to GitHub Pages. **Triggered only via `workflow_dispatch`** — either
  manually from the Actions tab, or automatically by `release.yml` after a
  successful release. Merging to `main` no longer deploys on its own. The
  trigger uses `--ref main` so the deploy runs from the default branch and
  satisfies the `github-pages` environment protection rule (a tag-ref
  trigger would be rejected).
- `.github/workflows/release.yml` - manually-dispatched semantic-release run
  (`workflow_dispatch`). Bootstraps `v0.1.0` if no release exists, then uses
  `.releaserc.yaml` to analyze conventional commits, write `CHANGELOG.md`,
  commit it back as `chore(release): ... [skip ci]`, and create a GitHub
  release. A follow-up `trigger_deploy` job dispatches `static.yml` on
  `main` only when `new_release_published == 'true'`. Requires
  `RELEASER_APP_CLIENT_ID` / `RELEASER_APP_PRIVATE_KEY` org secrets.
- `.github/workflows/ci.yml` - builds `docs/` on PR + push to `main`, runs
  `prettier --check .` over the repo (pinned to the same Prettier version as
  Flox), and verifies `docs/.vitepress/types/adl.ts` is fresh against the
  upstream ADL schema.
- `.github/workflows/claude.yml` - runs Claude Code on `@claude` mentions in
  issues/PRs/reviews. Installs the `maintainer` skill from
  `inference-gateway/skills` and configures the Context7 MCP server. Enforces
  feature branches (`claude/*`) and PR-based workflow.
- `.github/workflows/infer.yml` - runs the `infer` agent on `@infer` mentions
  in issues.
