# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR (http://localhost:5173)
npm run build    # tsc -b && vite build → outputs to dist/
npm run lint     # ESLint only
npm run preview  # Serve the production build from dist/
npm run codegen  # Regenerate src/types/adl.ts from the upstream ADL JSON Schema

task lint        # ESLint + markdownlint --fix (this is the full lint, not `npm run lint`)
```

Node `^24.15.0` is required (enforced in `package.json` engines field). A Flox env (`.flox/`) pins Node, prettier,
markdownlint-cli, and go-task, and runs `npm install` on `flox activate`.

There is no test framework configured. Don't invent one — flag it if tests are requested.

## Architecture

This is a static SPA deployed to GitHub Pages at `registry.inference-gateway.com`. It catalogs two kinds of things;
both are loaded the same way — **at runtime from an external catalog repo on the CDN**. There is no agent or skill
metadata in this repo.

### Agents: runtime, external, ADL-typed

- **Contract**: [ADL](https://github.com/inference-gateway/adl) (Agent Definition Language,
  `apiVersion: adl.inference-gateway.com/v1`). Each agent's `agent.yaml` lives in its own GitHub repo and is the
  canonical source.
- **Catalog**: aggregated from those `agent.yaml` files by `inference-gateway/agents`, which keeps an `agents.yaml`
  list of repo URLs + refs and runs a build job (push + daily cron) to fetch, validate, and bundle them into
  `catalog.json`. The registry fetches that at runtime via
  `https://cdn.jsdelivr.net/gh/inference-gateway/agents@main/catalog.json` (override with `VITE_AGENTS_CATALOG_URL`).
- **Types are generated**, not hand-written. `src/types/adl.ts` is produced by `scripts/codegen-adl.mjs` from the
  ADL JSON Schema. Run `npm run codegen` after ADL changes; commit the regenerated file. The CI check job
  `npm run codegen && git diff --exit-code src/types/adl.ts` catches stale committed types. **Do not hand-edit
  `src/types/adl.ts`.**
- The catalog injects a non-schema `_source` block per agent (`{ url, ref, fetchedAt }`) so the registry can show
  provenance. The generated `CatalogAgent` type extends `ADLAgent` with optional `_source`.
- `src/services/agentService.ts` memoizes the fetch in a module-level promise; on failure it clears the cache so the
  next call retries. It also rejects payloads where any entry has the wrong `apiVersion`. Same memoization pattern
  as `skillService.ts`.
- Display fields the old hand-rolled `Agent` schema had but ADL doesn't (author, license@agent, categories,
  tags@agent, image.size, longDescription) are gone. The UI surfaces ADL-defined data instead — capabilities badges,
  tool/skill counts, derived tags from `spec.tools[].tags ∪ spec.skills[].tags`, model info from `spec.agent`. Image
  is computed: prefer `spec.deployment.{cloudrun,kubernetes}.image`, fall back to
  `ghcr.io/inference-gateway/<name>:<version>` only when the source repo is in the `inference-gateway` org.
  Derivation helpers live in `src/utils/adl.ts`.

### Skills: runtime, external

- Fetched at runtime from `https://cdn.jsdelivr.net/gh/inference-gateway/skills@main/catalog.json` (override with
  `VITE_SKILLS_CATALOG_URL`). The skills catalog lives in a **separate repo** (`inference-gateway/skills`).
- `src/services/skillService.ts` memoizes the fetch in a module-level promise; on failure it clears the cache so the
  next call retries.
- A previous build-time fetch script (`scripts/fetch-skills.mjs`) was removed in commit `ad8ea17`. The `.gitignore`
  still references its outputs (`src/data/skills.json`, `public/skills.json`) but no such script exists — don't
  resurrect it without reason.

### Routing & GitHub Pages SPA trick

`App.tsx` uses React Router with trailing-slash paths (`/agents/`, `/skills/`, `/how-to/:section/`). GitHub Pages
serves `public/404.html` for unknown paths; that file stashes `location.href` in `sessionStorage.redirect` and
redirects to `/`. `src/main.tsx` reads `sessionStorage.redirect` on boot and replays it via `history.replaceState`
**before** React mounts. Preserve this pattern if you touch either file — without it, deep links break on refresh.

### Sitemap

`vite-plugin-sitemap.ts` generates `dist/sitemap.xml` at build time from a hardcoded route list in `vite.config.ts`.
When adding a new top-level route in `App.tsx`, also add it to the `routes` array there.

## Adding a new agent

Agent metadata is **not** in this repo. Any public GitHub repo that ships an ADL `agent.yaml` at its root is
eligible. Open a PR against `inference-gateway/agents` appending one entry to `agents.yaml`:

```yaml
- url: https://github.com/<owner>/<repo>
  ref: main # branch / tag / SHA; pinning a release tag is recommended for third-party agents
```

CI in the agents repo (push + daily cron) refetches each `agent.yaml`, validates against the ADL schema, and
regenerates `catalog.json`. The registry picks up the change within the jsdelivr `@main` cache window (~12h).
Schema changes happen upstream in [`inference-gateway/adl`](https://github.com/inference-gateway/adl) — bump the
schema there, then `npm run codegen` here to refresh `src/types/adl.ts`.

## Conventions

- Commits follow conventional commits with a **capitalized** subject (e.g. `feat(client): Add retry mechanism`,
  `fix(auth): Resolve token validation issue`). The Claude GitHub Action enforces this via its system prompt.
- Markdown is line-length-limited to 120 chars (`.markdownlint.json`); MD029, MD033, MD041 are disabled.
- TypeScript config is strict with `noUnusedLocals` and `noUnusedParameters` — dead vars will fail the build.
- `cspell.json` has a small allowlist (nerdctl, deepseek, groq, ollama, cloudrun, myorg) — add new domain terms
  there if they trip the spell-checker.

## CI

- `.github/workflows/static.yml` — builds and deploys to GitHub Pages on push to `main`.
- `.github/workflows/claude.yml` — runs Claude Code on `@claude` mentions in issues/PRs/reviews. Installs the
  `maintainer` skill from `inference-gateway/skills` and configures the Context7 MCP server. Enforces feature
  branches (`claude/*`) and PR-based workflow.
- `.github/workflows/infer.yml` — runs the `infer` agent on `@infer` mentions in issues.
