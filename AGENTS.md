# Repository Guidelines

## Project Structure & Module Organization

This repository is a static React 19, TypeScript, and Vite application for the inference-gateway agents registry.
Application code lives in `src/`: pages in `src/pages/`, reusable UI in `src/components/`, data services in
`src/services/`, shared types in `src/types/`, and static agent imports in `src/data/agents.ts`.

Agent metadata lives in `agents/<agent-id>/metadata.yaml`. Public deployment assets are in `public/`, while custom
Vite plugins are kept at the repository root (`vite-plugin-yaml.ts`, `vite-plugin-sitemap.ts`). Production output is
generated into `dist/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies. Node `^24.15.0` is required by `package.json`.
- `npm run dev`: start the Vite development server with HMR.
- `npm run build`: run `tsc -b` and build the static site into `dist/`.
- `npm run lint`: run ESLint across the repository.
- `npm run preview`: serve the production build locally.
- `task lint`: run ESLint plus `markdownlint --ignore '**/node_modules/**' --fix .`.

## Coding Style & Naming Conventions

Use TypeScript and React functional components. Keep component filenames in PascalCase, such as
`src/components/AgentCard.tsx`, and service modules in camelCase, such as `agentService.ts`. Follow the existing
semicolon style in TypeScript files. The TypeScript configuration is strict and rejects unused locals and parameters.

Markdown should stay within 120 characters per line. If spell checking flags valid project terminology, add it to
`cspell.json`.

## Testing Guidelines

No test framework is currently configured. For now, validate changes with `npm run build` and `npm run lint`. When
adding or changing agent metadata, confirm the YAML parses by building the site.

## Agent Metadata Workflow

Adding an agent requires two changes: create `agents/<agent-id>/metadata.yaml` matching `src/types/agent.ts`, then add
the import and array entry in `src/data/agents.ts`. The project does not glob agent directories automatically.

Skills are fetched at runtime from an external catalog. Do not add skill catalog data to this repository unless the
architecture changes intentionally.

## Commit & Pull Request Guidelines

Recent history follows conventional commits with capitalized subjects, for example `chore(deps): Bump dev
dependencies`. Prefer scoped messages such as `feat(registry): Add browser agent metadata`.

Pull requests should include a concise description, linked issue when available, and screenshots for visible UI
changes. Note the verification commands you ran, especially `npm run build` and `npm run lint`.
