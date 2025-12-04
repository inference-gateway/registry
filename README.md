<div align="center">

# Agents Registry

[![Deploy to Pages](https://github.com/inference-gateway/registry/actions/workflows/static.yml/badge.svg)](https://github.com/inference-gateway/registry/actions/workflows/static.yml)
[![Claude Code](https://github.com/inference-gateway/registry/actions/workflows/claude.yml/badge.svg)](https://github.com/inference-gateway/registry/actions/workflows/claude.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
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

The registry uses a static build approach where agent metadata is defined in YAML files and processed at build time:

- **Agent Metadata**: YAML files in `/agents/` directory define each agent's specifications
- **Custom YAML Plugin**: Vite plugin converts YAML to JavaScript modules for type-safe imports
- **Static Generation**: No backend required - can be deployed to any static hosting service
- **Agent Data Flow**: YAML → Build-time processing → Static imports → React components

## Adding New Agents

1. Create a new directory under `/agents/` for your agent
2. Add a `metadata.yaml` file with the agent specification
3. Rebuild the application to include the new agent
4. The agent will automatically appear in the registry

## Agent Metadata Schema

```yaml
id: unique-agent-id
name: Human-readable Agent Name
version: 1.0.0
description: Brief description of the agent's purpose
longDescription: |
  Detailed description with features and capabilities
image:
  repository: ghcr.io/inference-gateway/agent-name
  tag: 1.0.0
  size: 25.3MB
author:
  name: Author Name
  email: author@example.com
license: MIT
homepage: https://github.com/org/agent
repository: https://github.com/org/agent
documentation: https://docs.example.com
categories:
  - category1
  - category2
tags:
  - tag1
  - tag2
```

## Technology Stack

- **React 19** - Modern UI framework with latest features
- **TypeScript 5.8** - Type safety and enhanced developer experience
- **Vite 7** - Fast build tool and development server
- **TailwindCSS 4.1** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **js-yaml** - YAML parsing for agent metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your agent metadata or improvements
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
