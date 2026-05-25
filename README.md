<div align="center">

# Agents Registry

[![Deploy to Pages](https://github.com/inference-gateway/registry/actions/workflows/static.yml/badge.svg)](https://github.com/inference-gateway/registry/actions/workflows/static.yml)
[![Claude Code](https://github.com/inference-gateway/registry/actions/workflows/claude.yml/badge.svg)](https://github.com/inference-gateway/registry/actions/workflows/claude.yml)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg)](https://vitejs.dev/)

A modern web application for managing and discovering agent-to-agent (A2A) services in the inference-gateway
ecosystem. This registry serves as a centralized hub for containerized agents that provide specialized services and
can communicate with each other autonomously.

</div>

## Overview

The Agents Registry is built with React 19, TypeScript, and Vite, providing a fast and responsive interface for
browsing available agents. Each agent is packaged as an OCI container and includes rich metadata about its
capabilities, usage, and integration requirements.

## Features

- **Agent Discovery**: Browse and search through available agents by name, description, or tags
- **Category Filtering**: Organize agents by their primary function and use case
- **Container Information**: View OCI container details including repository, tags, and image sizes
- **Rich Metadata**: Access comprehensive information about each agent's capabilities and requirements
- **Responsive Design**: Modern UI with dark theme and smooth animations
- **Documentation Integration**: Built-in guides and setup instructions

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Architecture

The registry is a pure static SPA. Both catalogs it shows — agents and skills — are fetched at runtime from sibling
repos on the jsdelivr CDN, so adding or updating an entry does not require redeploying this app:

- **Agents catalog**: [`inference-gateway/agents`](https://github.com/inference-gateway/agents) →
  `https://cdn.jsdelivr.net/gh/inference-gateway/agents@main/catalog.json`
- **Skills catalog**: [`inference-gateway/skills`](https://github.com/inference-gateway/skills) →
  `https://cdn.jsdelivr.net/gh/inference-gateway/skills@main/catalog.json`

Override the catalog URLs locally with `VITE_AGENTS_CATALOG_URL` / `VITE_SKILLS_CATALOG_URL`.

## Adding New Agents

Open a PR against [`inference-gateway/agents`](https://github.com/inference-gateway/agents) — that repo holds the
per-agent `metadata.yaml` files and the CI workflow that regenerates `catalog.json`. The new agent appears in this
registry within the jsdelivr `@main` cache window (up to ~12h) with no redeploy here.

## Technology Stack

- **React 19** - Modern UI framework with latest features
- **TypeScript 5.8** - Type safety and enhanced developer experience
- **Vite 7** - Fast build tool and development server
- **TailwindCSS 4.1** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your improvements (UI, routing, services, docs)
4. Submit a pull request

To submit a new **agent**, open a PR against `inference-gateway/agents` instead.

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.
