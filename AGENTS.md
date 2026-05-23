# AGENTS.md — AI Agent Guide for inference-gateway/registry

This file provides guidance for AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with
this repository. It complements `CLAUDE.md` with an agent-focused perspective covering workflow,
conventions, and actionable patterns.

---

## 1. Project Overview

This is the **Agents Registry** — a React + TypeScript + Vite web application that serves as a registry for
agent-to-agent (A2A) services in the [inference-gateway](https://github.com/inference-gateway) ecosystem.

**Purpose:** Browse, discover, and manage containerized A2A agents with rich metadata. Deployed as a static site at [registry.inference-gateway.com](https://registry.inference-gateway.com).

**Key Links:**

- Production site: `https://registry.inference-gateway.com`
- GitHub Pages repo: `inference-gateway/registry`
- CNAME: `registry.inference-gateway.com`

### Main Technologies

| Technology | Version | Purpose |
| --- | --- | --- |
| React | 19.2+ | UI framework with StrictMode |
| TypeScript | ~6.0 | Type-safe development, ES2023 target |
| Vite | ~8.0 | Build tool & dev server with HMR |
| TailwindCSS | ~4.3 | Utility-first styling (Vite plugin) |
| React Router DOM | ~7.15 | Client-side routing |
| ESLint | ~10.0 | Flat config with TypeScript + React plugins |
| js-yaml | ~4.1 | YAML metadata parsing at build time |
| Node.js | ^24.14 | Required runtime via `.nvmrc` / `engines` field |

---

## 2. Architecture & Structure

### High-Level Data Flow

```text
YAML metadata (/agents/*/metadata.yaml)
  │
  ▼
Custom Vite plugin (vite-plugin-yaml.ts) — converts YAML → JS module at build time
  │
  ▼
Static imports (src/data/agents.ts) — imports all agent metadata
  │
  ▼
Service layer (src/services/agentService.ts) — async wrapper around static data
  │
  ▼
React components (AgentCard, AgentsPage) — render UI
```

For skills:

```text
External URL (github.com/inference-gateway/skills/catalog.json)
  │
  ▼
scripts/fetch-skills.ts — fetches at build/install time
  │
  ▼
src/data/skills.json — local cache, also copied to public/skills.json
  │
  ▼
React components (SkillCard, SkillsPage) — render UI
```

### Directory Structure

```text
/agents/                  # Agent metadata definitions (YAML)
  browser/metadata.yaml
  documentation/metadata.yaml
  google-calendar/metadata.yaml
  n8n/metadata.yaml

/public/                  # Static assets served by Vite
  404.html, favicon.*, og-image.webp, manifest.json, robots.txt

/scripts/
  fetch-skills.ts         # Fetches skills catalog from external URL

/src/                    # Application source code
  main.tsx               # Entry point (React 19 StrictMode)
  App.tsx                # Routing configuration
  index.css              # TailwindCSS + custom color system

  /components/
    Header.tsx            # Sticky nav bar (Agents, Skills, How-To tabs)
    AgentCard.tsx         # Agent display card with copy-to-clipboard
    SkillCard.tsx         # Skill display card with copy-to-clipboard

  /pages/
    AgentsPage.tsx        # Main registry view (search, filter, list)
    SkillsPage.tsx        # Skills catalog view (search, filter, list)
    HowToPage.tsx         # Documentation guide (6 sections)

  /types/
    agent.ts              # Agent interface
    skill.ts              # Skill + SkillCatalog interfaces

  /services/
    agentService.ts       # Async wrapper for agent data
    skillService.ts       # Async wrapper for skill data

  /data/
    agents.ts             # Static imports of all YAML metadata
    skills.ts             # Loads fetched skills.json
    skills.json           # Auto-generated, gitignored?

  yaml.d.ts              # TypeScript declarations for *.yaml imports

Config files at root:
  vite.config.ts          # Vite config with 4 plugins
  vite-plugin-yaml.ts     # Custom YAML → JS converter
  vite-plugin-sitemap.ts  # Custom sitemap.xml generator
  eslint.config.js        # Flat ESLint config
  tsconfig.json           # TypeScript project references
  tsconfig.app.json       # App-specific TS config (strict)
  tsconfig.node.json      # Node/build-specific TS config
  Taskfile.yml            # Task runner automation
  cspell.json             # Spelling whitelist
  package.json            # Dependencies & scripts
```

### Custom Vite Plugins

Both are defined inline in the repo:

1. **`vite-plugin-yaml.ts`** — Transforms `.yaml`/`.yml` imports into JavaScript objects at build time
   using `js-yaml`. No runtime YAML parsing needed.

2. **`vite-plugin-sitemap.ts`** — Generates `sitemap.xml` in the build output with configured hostname and
   routes. Only runs during production builds (`apply: 'build'`).

### Routing (React Router DOM)

Defined in `App.tsx`:

| Path | Component | Description |
| --- | --- | --- |
| `/` | → redirects to `/agents/` | Root redirect |
| `/agents/` | `AgentsPage` | Main agent registry view |
| `/skills/` | `SkillsPage` | Skills catalog view |
| `/how-to/` | → redirects to `/how-to/prerequisites/` | Docs root redirect |
| `/how-to/:section/` | `HowToPage` | Documentation section |
| `*` | → redirects to `/agents/` | Fallback catch-all |

### Currently Registered Agents

| Agent ID | Name | Version | Image Size |
| --- | --- | --- | --- |
| `browser-agent` | Browser Automation Agent | 0.4.16 | 3.42 GB |
| `documentation-agent` | Documentation Agent for Context7 | 0.2.25 | 56.2 MB |
| `google-calendar-agent` | Google Calendar Management Agent | 0.4.23 | 63.8 MB |
| `n8n-agent` | n8n Workflow Automation Agent | 0.2.1 | 35.2 MB |

All container images are hosted at `ghcr.io/inference-gateway/`.

---

## 3. Development Environment Setup

### Prerequisites

- **Node.js** `^24.14.1` (check `package.json` engines field)
- **npm** (comes with Node.js)
- Optional: [Task](https://taskfile.dev/) runner for `task` commands

### Getting Started

```bash
# Clone the repo
git clone https://github.com/inference-gateway/registry.git
cd registry

# Install dependencies (also fetches skills catalog)
npm install

# Start development server with HMR
npm run dev
```

The dev server starts on `http://localhost:5173` (Vite default).

### Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `SKILLS_CATALOG_URL` | [catalog.json](https://raw.githubusercontent.com/inference-gateway/skills/main/catalog.json) | URL for fetching the skills catalog |

---

## 4. Key Commands

### npm Scripts

| Command | Description | Notes |
| --- | --- | --- |
| `npm install` | Install deps + fetch skills catalog | Auto-runs `postinstall` script |
| `npm run dev` | Start dev server with HMR | Auto-fetches skills if missing (`predev`) |
| `npm run build` | TypeScript compile + Vite production build | Always fetches fresh skills (`prebuild`) |
| `npm run lint` | ESLint check on entire project | Uses flat config |
| `npm run preview` | Preview production build locally | Serves `dist/` folder |

### Taskfile Commands (if `task` CLI is installed)

| Command | Description |
| --- | --- |
| `task dev` | Start dev server |
| `task build` | Build for production |
| `task lint` | ESLint + markdownlint |
| `task preview` | Preview production build |
| `task install` | Install dependencies |
| `task --list` | Show all available tasks |

---

## 5. Build System Details

### Build Pipeline (`npm run build`)

1. `prebuild` — runs `scripts/fetch-skills.ts` to download the latest skills catalog
2. `tsc -b` — TypeScript type-check using project references (`tsconfig.app.json` + `tsconfig.node.json`)
3. `vite build` — Vite bundles the app:
   - Inlines YAML metadata via custom plugin
   - Applies TailwindCSS via Vite plugin
   - Generates sitemap.xml
   - Outputs to `dist/` directory

### Skills Fetch Script (`scripts/fetch-skills.ts`)

- Downloads JSON catalog from `SKILLS_CATALOG_URL` (defaults to inference-gateway/skills)
- Writes to `src/data/skills.json` (app import) and `public/skills.json` (public API endpoint)
- Supports `--if-missing` flag to skip if files already exist (used in dev/install)
- Validates response has a `skills` array

---

## 6. Testing

**There is currently no test framework configured.** The project has no test dependencies, test files, or test runner setup.

When adding tests, consider:

- **Vitest** is the natural choice — it integrates seamlessly with Vite and shares the same config/plugins
- **React Testing Library** for component tests
- The service layer (`agentService.ts`, `skillService.ts`) is the easiest place to start — pure async wrappers
- Pages with search/filter logic (`AgentsPage`, `SkillsPage`) are good candidates for integration tests

---

## 7. How to Add a New Agent

The most common task is adding a new agent to the registry.

### Step-by-Step

1. **Create agent directory and metadata file:**

   ```bash
   mkdir -p agents/your-agent-name
   # Create agents/your-agent-name/metadata.yaml
   ```

2. **Write the YAML metadata following the schema:**

   ```yaml
   ---
   id: your-agent-name
   name: Your Agent Display Name
   version: 1.0.0
   description: Brief one-line description
   longDescription: |
     Detailed description with features and capabilities.

     ## Key Features
     - Feature 1
     - Feature 2

   image:
     repository: ghcr.io/inference-gateway/your-agent-name
     tag: 1.0.0
     size: 25.3MB

   author:
     name: Your Name
     email: your.email@example.com
     url: https://github.com/your-profile

   license: Apache-2.0
   homepage: https://github.com/inference-gateway/your-agent
   repository: https://github.com/inference-gateway/your-agent
   documentation: https://docs.inference-gateway.com

   categories:
     - your-category
     - agent-to-agent

   tags:
     - a2a
     - your-tag
     - multi-agent
   ```

3. **Register the agent in the data layer** (`src/data/agents.ts`):

   ```typescript
   import yourAgentMetadata from '../../agents/your-agent-name/metadata.yaml';

   export const agents: Agent[] = [
     // ... existing agents
     yourAgentMetadata as Agent,
   ];
   ```

4. **Build and verify:**

   ```bash
   npm run build
   npm run preview
   ```

### Metadata Schema Reference

The `Agent` TypeScript interface (`src/types/agent.ts`):

```typescript
interface Agent {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Human-readable display name
  version: string;               // Semantic version
  description: string;           // Short description (1-2 sentences)
  longDescription?: string;      // Markdown-formatted long description
  image: {
    repository: string;          // OCI registry path
    tag: string;                 // Image tag
    size: string;                // Human-readable size (e.g., "25.3MB")
  };
  author: {
    name: string;
    email: string;
    url?: string;
  };
  license: string;               // e.g., "Apache-2.0"
  homepage: string;              // GitHub repo or project page
  repository: string;            // Source code URL
  documentation: string;         // Docs URL
  categories: string[];          // Filtering categories
  tags: string[];                // Searchable tags
}
```

### Agent Naming Conventions

- **id:** kebab-case, descriptive, ends with `-agent` (e.g., `google-calendar-agent`)
- **name:** Title Case, includes "Agent" suffix (e.g., "Google Calendar Management Agent")
- **version:** Semantic versioning
- **categories:** lowercase, hyphen-separated (e.g., `agent-to-agent`, `documentation`, `automation`)
- **tags:** lowercase, single words or hyphen-separated

---

## 8. Project Conventions & Coding Standards

### TypeScript

- **Strict mode** enabled (`strict: true`)
- **Unused locals/params** cause errors (`noUnusedLocals: true`, `noUnusedParameters: true`)
- **`verbatimModuleSyntax: true`** — must use `import type` for type-only imports
- **`erasableSyntaxOnly: true`** — no enums, no namespaces (TypeScript 6 feature)
- **ES2023 target** with DOM lib
- **Project references** — app code (`tsconfig.app.json`) and build config (`tsconfig.node.json`) are separate
- **JSX** uses `react-jsx` runtime (automatic transform)

### React

- **Functional components** with hooks (no class components)
- **React 19 StrictMode** in `main.tsx`
- **Props interfaces** defined locally in component files (see `AgentCard.tsx` for pattern)
- **`useState` + `useEffect`** for data fetching patterns
- **`useMemo`** for computed/filtered data (search, filter logic)
- **`useRef`** for DOM references (dropdown click-outside detection)
- **`useNavigate` + `useParams`** for routing (see `HowToPage.tsx` for section routing pattern)

### Styling (TailwindCSS)

- **Custom color system** defined in `index.css` via `@theme`:
  - `primary-*` — Deep ocean blues (main UI elements)
  - `accent-*` — Sky blues (interactive elements)
  - `secondary-*` — Cyan tones (backgrounds, gradients)
- **Dark theme** with glassmorphism effects (`bg-slate-800/40 backdrop-blur-xl`)
- **Responsive grid** — `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- **Custom scrollbar** class `.custom-scrollbar` for dropdown menus
- **Consistent card design** — `AgentCard` and `SkillCard` share the same visual pattern

### ESLint

- **Flat config** (`eslint.config.js`)
- **Plugin stack:** `@eslint/js` recommended + `typescript-eslint` recommended + `react-hooks` + `react-refresh`
- **Ignores:** `dist/` directory
- **Targets:** Only `*.{ts,tsx}` files

### Code Organization Patterns

- **Service layer pattern:** Components never import data directly; they go through service functions (`loadAgents()`, `loadSkills()`)
- **Async data loading:** Even though data is static, services return `Promise.resolve()` to simulate
  async behavior and allow future migration to API-backed data
- **Error handling:** Data fetching wrapped in try/catch with console.error fallback
- **Loading states:** Each page has a spinner for initial load
- **Empty states:** Each page shows a "no results" message when filters match nothing
- **Copy-to-clipboard:** AgentCard and SkillCard both implement `navigator.clipboard.writeText()`
  with visual feedback (checkmark animation)

---

## 9. Important Files & Configurations

| File | What It Does | When to Modify |
| --- | --- | --- |
| `package.json` | Dependencies, scripts, Node engine requirement | Adding/removing deps, changing scripts |
| `vite.config.ts` | Build config, plugins, sitemap routes | Adding new routes, changing plugins |
| `vite-plugin-yaml.ts` | YAML → JS transform | Modifying YAML import behavior |
| `vite-plugin-sitemap.ts` | sitemap.xml generation | Changing SEO routes |
| `eslint.config.js` | Linting rules | Adjusting code quality rules |
| `tsconfig.app.json` | App TypeScript config (strict mode) | Changing compilation settings |
| `tsconfig.node.json` | Build config TypeScript settings | Changing build-time compilation |
| `Taskfile.yml` | Task runner automation | Adding new task definitions |
| `cspell.json` | Spelling whitelist for code | Adding project-specific terms |
| `index.html` | HTML entry point, SEO meta tags, OG images | Updating SEO metadata |
| `CNAME` | Custom domain for GitHub Pages | Changing the domain |
| `agents/*/metadata.yaml` | Agent metadata definitions | Adding/updating agents |
| `scripts/fetch-skills.ts` | Skills catalog download | Changing catalog source URL |
| `src/data/agents.ts` | Static agent imports registry | Registering new agents |
| `src/types/agent.ts` | Agent type definition | Adding new metadata fields |
| `src/types/skill.ts` | Skill type definitions | Adding new skill fields |
| `src/yaml.d.ts` | TypeScript module declarations for YAML | Adding new file type support |

---

## 10. CI/CD & Deployment

The project uses GitHub Actions for CI/CD:

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `static.yml` | Push to `main` | Builds and deploys to GitHub Pages |
| `claude.yml` | PRs, pushes | Claude Code automated code analysis |
| `infer.yml` | `@infer` mentions in issues | Automated assistance via inference-gateway |

**Deployment notes:**

- Output goes to `dist/` directory
- Deployed to GitHub Pages via the `static.yml` workflow
- Custom domain configured via `CNAME` file
- Fully static — no backend server needed
- 404 page at `public/404.html` handles SPA routing on GitHub Pages

---

## 11. Common Tasks & Patterns

### Searching/Filtering (implemented in pages)

The search/filter pattern used in both `AgentsPage` and `SkillsPage`:

1. `useState` for search term, filter selection, dropdown state
2. `useRef` + `useEffect` for click-outside dropdown closing
3. `useMemo` to compute filtered list from search term + filter
4. Conditional rendering: loading → spinner, empty → "no results" message, results → grid

### Copy-to-Clipboard (implemented in cards)

Both `AgentCard` and `SkillCard` follow this pattern:

1. Local `useState` for `copied` boolean
2. `navigator.clipboard.writeText()` in an async handler
3. Visual feedback: swap icon to checkmark for 2 seconds
4. `setTimeout` to reset state

### Adding a New Route

1. Add route to `App.tsx` with `Route` element and component
2. Add navigation link in `Header.tsx`
3. (Optional) Add route to `vite-plugin-sitemap.ts` for SEO
4. (Optional) Create page component in `src/pages/`

### Updating SEO

All SEO metadata lives in `index.html`:

- Title, description, keywords meta tags
- Open Graph tags (Facebook/LinkedIn)
- Twitter card tags
- Structured data (JSON-LD)
- Canonical URL

---

## 12. Agent Interaction Model (for context)

This is important context for understanding the broader ecosystem, even though it's not in the registry code itself:

- **A2A (Agent-to-Agent):** Agents communicate using the Agent-to-Agent protocol through the inference gateway
- **`infer agents add <agent-id>`:** CLI command to register an agent from the registry
- **`infer skills install <skill-name>`:** CLI command to install a skill
- **Docker Compose setup:** All agents run as OCI containers, orchestrated via Docker Compose or Kubernetes
- **Gateway coordinates:** The Inference Gateway routes requests to the appropriate agent based on the query

---

## 13. Future Considerations

- **No test framework yet** — Vitest is the recommended addition
- **No CI/CD configuration in this repo's `.github/` (external)** — workflows may need to be added back if restructuring
- **Skills catalog is external** — sourced from `inference-gateway/skills` repo; changes to that repo require a rebuild
- **Agent metadata is build-time** — to make it dynamic, would need to add API endpoints and runtime data fetching
