# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Agents Registry** application - a React + TypeScript + Vite web application that serves as a registry for agent-to-agent (A2A) services in the inference-gateway ecosystem. The registry manages metadata for various specialized agents that can communicate with each other.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot module replacement
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **React 19** with TypeScript for the UI layer
- **Vite 7** as the build tool and dev server
- **TypeScript 5.8** for type safety
- **TailwindCSS 4.1** for styling
- **React Router DOM 7** for client-side routing
- **ESLint** with TypeScript support for code quality

### Project Structure
- `/src/` - React application source code
  - `App.tsx` - Main application component with routing configuration
  - `main.tsx` - Application entry point with React 19 StrictMode
  - `/components/` - React components (AgentCard)
  - `/pages/` - Page components (AgentsPage, HowToPage)
  - `/types/` - TypeScript type definitions (agent.ts)
  - `/services/` - Service layer for data operations (agentService.ts)
  - `/data/` - Static data imports (agents.ts)
- `/agents/` - Agent metadata definitions in YAML format
  - Each subdirectory contains agent-specific metadata
  - Agents include documentation servers and service integrations (e.g., Google Calendar, n8n)
- `/public/` - Static assets served directly by Vite

### Key Components Architecture

**App.tsx**: Main routing configuration with React Router:
- Routes for `/agents/` (main registry view)
- Routes for `/how-to/:section/` (documentation pages)
- Default redirects and fallback handling

**AgentsPage**: Main registry view that handles:
- Agent loading from YAML metadata files
- Search functionality (by name, description, tags)
- Category filtering with dropdown UI
- Responsive grid layout for agent cards

**HowToPage**: Documentation and guide pages with:
- Section-based routing for different topics
- Integration examples and setup instructions

**AgentCard**: Individual agent display component featuring:
- Agent metadata display (name, version, description, categories, tags)
- OCI container image information with copy-to-clipboard functionality
- Links to repository and documentation
- Responsive design with hover effects

**Agent Data Flow**:
1. YAML metadata files in `/agents/` directories define agent specifications
2. Custom Vite plugin (`vite-plugin-yaml.ts`) converts YAML to JSON at build time
3. Static imports in `/src/data/agents.ts` load all agent metadata
4. `agentService.ts` provides async interface for agent data access
5. Components consume agent data through the service layer

### Agent Metadata Schema
Agents are defined using YAML files with the following structure:
- Basic info: `id`, `name`, `version`, `description`, `longDescription`
- Container details: `image` (repository, tag, size)
- Metadata: `author`, `license`, `homepage`, `repository`, `documentation`
- Organization: `categories`, `tags`

### Custom Build Configuration
- **Custom YAML Plugin**: `vite-plugin-yaml.ts` enables importing YAML files as JavaScript objects
- **TypeScript Declarations**: `yaml.d.ts` provides TypeScript support for YAML imports
- **Project References**: Uses TypeScript project references (tsconfig.app.json, tsconfig.node.json)
- **TailwindCSS Integration**: Uses Vite plugin for TailwindCSS 4.1
- **ESLint Configuration**: Modern flat config with TypeScript, React Hooks, and React Refresh plugins

### Development Environment
- Uses modern React 19 features with StrictMode
- Strict TypeScript configuration with unused parameter/variable checking
- ESLint configured for React and TypeScript best practices with latest recommended configs
- Vite HMR for fast development iteration
- Client-side routing with React Router DOM 7

## Key Considerations

1. **Agent Registry Focus**: This is a fully implemented registry system for managing agent-to-agent communication services, displaying containerized agents with rich metadata.

2. **Container-Based Agents**: Agents are distributed as OCI containers (ghcr.io registry), suggesting a microservices architecture for the broader inference-gateway system.

3. **Static Build-Time Data**: Agent metadata is processed at build time through YAML imports, not fetched at runtime. To add new agents, update the `/agents/` directory and rebuild.

4. **No Backend Required**: The application is a static site that can be deployed to any web server or CDN (configured for GitHub Pages via CNAME).

5. **Multi-Page Application**: Uses React Router for client-side navigation between the agent registry and documentation sections.

6. **Responsive Design**: Uses TailwindCSS with a dark theme and modern UI patterns including glassmorphism effects and smooth animations.

7. **No Tests Yet**: The project currently has no test configuration. Consider adding Vitest when implementing new features.

8. **YAML Processing**: Custom Vite plugin handles YAML files, converting them to JavaScript modules at build time for type-safe imports.