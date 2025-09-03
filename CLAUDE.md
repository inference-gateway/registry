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
- **Vite** as the build tool and dev server
- **TypeScript 5.8** for type safety
- **ESLint** with TypeScript support for code quality

### Project Structure
- `/src/` - React application source code
  - `App.tsx` - Main application component (currently contains default Vite template)
  - `main.tsx` - Application entry point with React 19 StrictMode
- `/agents/` - Agent metadata definitions in YAML format
  - Each subdirectory contains agent-specific metadata
  - Agents include documentation servers and service integrations (e.g., Google Calendar)
- `/public/` - Static assets served directly by Vite

### Agent Metadata Schema
Agents are defined using YAML files with the following structure:
- Basic info: `id`, `name`, `version`, `description`
- Container details: `image` (repository, tag, digest, size)
- Metadata: `author`, `license`, `homepage`, `repository`, `documentation`
- Organization: `categories`, `tags`

### Development Environment
- Uses **Flox** for environment management (`.flox/` directory)
- Node.js 24 is configured via Flox manifest
- TypeScript configured with project references (tsconfig.app.json, tsconfig.node.json)

## Key Considerations

1. **Agent Registry Focus**: This appears to be the beginning of a registry system for managing agent-to-agent communication services. The current React app is still using the default Vite template and needs implementation.

2. **Agent Metadata**: Two example agents are already defined:
   - `documentation-server`: Provides API documentation access from Context7
   - `google-calendar-agent`: Manages Google Calendar operations

3. **Container-Based Agents**: Agents are distributed as OCI containers (ghcr.io registry), suggesting a microservices architecture for the broader inference-gateway system.

4. **No Tests Yet**: The project currently has no test configuration. Consider adding Vitest or Jest when implementing features.