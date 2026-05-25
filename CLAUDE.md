# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR (http://localhost:5173)
npm run build    # tsc -b && vite build → outputs to dist/
npm run lint     # ESLint only
npm run preview  # Serve the production build from dist/

task lint        # ESLint + markdownlint --fix (this is the full lint, not `npm run lint`)
```

Node `^24.15.0` is required (enforced in `package.json` engines field). A Flox env (`.flox/`) pins Node, prettier,
markdownlint-cli, and go-task, and runs `npm install` on `flox activate`.

There is no test framework configured. Don't invent one — flag it if tests are requested.

## Architecture

This is a static SPA deployed to GitHub Pages at `registry.inference-gateway.com`. It catalogs two kinds of things;
both are loaded the same way — **at runtime from an external catalog repo on the CDN**. There is no agent or skill
metadata in this repo.

### Agents: runtime, external

- Fetched at runtime from `https://cdn.jsdelivr.net/gh/inference-gateway/agents@main/catalog.json` (override with
  `VITE_AGENTS_CATALOG_URL`). The agents catalog lives in a **separate repo** (`inference-gateway/agents`) where
  per-agent `metadata.yaml` files are the source of truth and a workflow regenerates `catalog.json` on push.
- `src/services/agentService.ts` memoizes the fetch in a module-level promise; on failure it clears the cache so the
  next call retries. Same pattern as `skillService.ts`.

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

Agent metadata is **not** in this repo. To add one, open a PR against `inference-gateway/agents` adding
`agents/<id>/metadata.yaml`. CI there regenerates `catalog.json`; the registry picks up the change within the
jsdelivr `@main` cache window (~12h). The `Agent` interface in `src/types/agent.ts` defines the schema both sides
must agree on — when the schema changes, update both repos.

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
