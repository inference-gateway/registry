// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: npm run codegen
// Source: https://cdn.jsdelivr.net/gh/inference-gateway/adl@main/schema/v1/schema.json

/**
 * JSON Schema for Agent Definition Language manifests (apiVersion adl.inference-gateway.com/v1).
 */
export interface ADLAgent {
  apiVersion: 'adl.inference-gateway.com/v1';
  kind: 'Agent';
  metadata: Metadata;
  spec: Spec;
}
export interface Metadata {
  name: string;
  description: string;
  version: string;
}
export interface Spec {
  capabilities: Capabilities;
  card?: Card;
  agent?: Agent;
  config?: {
    [k: string]: {
      [k: string]: unknown;
    };
  };
  services?: {
    [k: string]: Service;
  };
  acronyms?: string[];
  tools?: Tool[];
  skills?: Skill[];
  server: Server;
  language: Language;
  artifacts?: ArtifactsConfig;
  hooks?: Hooks;
  scm?: SCM;
  development?: DevelopmentConfig;
  deployment?: DeploymentConfig;
}
export interface Capabilities {
  streaming: boolean;
  pushNotifications: boolean;
  stateTransitionHistory: boolean;
}
export interface Card {
  protocolVersion?: string;
  url?: string;
  preferredTransport?: string;
  defaultInputModes?: string[];
  defaultOutputModes?: string[];
  documentationUrl?: string;
  iconUrl?: string;
}
export interface Agent {
  provider?: '' | 'openai' | 'anthropic' | 'ollama' | 'deepseek' | 'google' | 'mistral' | 'groq';
  model?: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}
export interface Service {
  type: 'service' | 'repository' | 'client' | 'middleware';
  interface: string;
  factory: string;
  description: string;
}
/**
 * Function-call entrypoint the agent can invoke. Generated as code in the target language. User-defined tools require name, description, tags, and schema; reserved built-in IDs (e.g. read, bash, write, edit) may omit them and have those fields supplied by the generator.
 */
export interface Tool {
  id: string;
  name?: string;
  description?: string;
  tags?: string[];
  /**
   * Free-form JSON Schema describing the tool's input parameters.
   */
  schema?: {
    [k: string]: unknown;
  };
  inject?: string[];
}
/**
 * Markdown playbook injected into the agent's system prompt. Pulled from the skills registry or scaffolded blank with bare: true.
 */
export interface Skill {
  id: string;
  version?: string;
  source?: string;
  bare?: boolean;
  name?: string;
  description?: string;
  /**
   * License under which the skill is distributed. Must be one of the accepted SPDX license identifiers, or "Proprietary" for closed-source skills. Consumers should mirror this value in the SKILL.md frontmatter so the licence travels with the playbook; shipping a separate LICENSE file alongside SKILL.md is optional and not enforced by the schema. New identifiers may be added in future minor versions of the schema.
   */
  license?:
    | 'MIT'
    | 'Apache-2.0'
    | 'BSD-2-Clause'
    | 'BSD-3-Clause'
    | 'GPL-2.0'
    | 'GPL-3.0'
    | 'LGPL-2.1'
    | 'LGPL-3.0'
    | 'MPL-2.0'
    | 'ISC'
    | 'CC0-1.0'
    | 'CC-BY-4.0'
    | 'CC-BY-SA-4.0'
    | 'Unlicense'
    | 'Proprietary';
  tags?: string[];
}
export interface Server {
  port: number;
  scheme?: string;
  debug?: boolean;
  auth?: AuthConfig;
}
export interface AuthConfig {
  enabled?: boolean;
}
export interface Language {
  go?: GoConfig;
  typescript?: TypeScriptConfig;
  rust?: RustConfig;
}
export interface GoConfig {
  module: string;
  version: string;
  vendor?: VendorConfig;
}
/**
 * Extra packages to vendor into the generated project on top of whatever the generator pulls in by default. Use 'deps' for runtime/production dependencies and 'devdeps' for development- or test-only dependencies (linters, test frameworks, mock generators, etc.). Each entry follows the '<package>@<version>' form using the target language's native package and version syntax (e.g. 'github.com/stretchr/testify@v1.9.0' for Go, 'vitest@1.6.0' or '@types/node@20.11.0' for TypeScript, 'tokio@1.36.0' for Rust). Consumers are responsible for translating these into the language's lockfile / manifest format.
 */
export interface VendorConfig {
  /**
   * Runtime/production dependencies to add to the generated project, each in '<package>@<version>' form.
   */
  deps?: string[];
  /**
   * Development- and test-only dependencies to add to the generated project (e.g. testing libraries, linters, mock generators), each in '<package>@<version>' form.
   */
  devdeps?: string[];
}
export interface TypeScriptConfig {
  packageName: string;
  nodeVersion: string;
  vendor?: VendorConfig;
}
export interface RustConfig {
  packageName: string;
  version: string;
  edition: string;
  features?: string[];
  vendor?: VendorConfig;
}
export interface ArtifactsConfig {
  enabled: boolean;
}
export interface Hooks {
  post?: string[];
}
export interface SCM {
  provider?: 'github' | 'gitlab' | 'bitbucket';
  url?: string;
  github_app?: boolean;
  issue_templates?: boolean;
  dependabot?: boolean;
  ci?: boolean;
  cd?: boolean;
}
/**
 * Local development experience for the agent: sandboxed dev environments (flox, devcontainer, dockerCompose), AI-assistant integration (CLAUDE.md/AGENTS.md generation, claude-code provisioning), and extra sandbox-level dependencies (deps) for tools that don't belong to any single language's package manager (e.g. deno, kubectl, terraform).
 */
export interface DevelopmentConfig {
  sandbox?: SandboxConfig;
  ai?: AIConfig;
  /**
   * Extra packages to install into the development sandbox (flox, devcontainer, dockerCompose) on top of whatever the generator pulls in by default. Use this for cross-cutting tools that aren't tied to one of the project's languages — e.g. 'deno@2.1.4', 'kubectl@1.31.0', 'terraform@1.9.5'. Each entry follows the '<package>@<version>' form; consumers are responsible for resolving the package against the sandbox's native package source (Nixpkgs for flox, apt/apk/feature for devcontainer, image layers for dockerCompose).
   */
  deps?: string[];
}
/**
 * Reproducible development environments. flox, devcontainer, and dockerCompose are alternative ways to package the same sandbox; pick what suits the team.
 */
export interface SandboxConfig {
  flox?: FloxConfig;
  devcontainer?: DevContainerConfig;
  dockerCompose?: DockerComposeConfig;
}
export interface FloxConfig {
  enabled: boolean;
}
export interface DevContainerConfig {
  enabled: boolean;
}
export interface DockerComposeConfig {
  enabled: boolean;
}
/**
 * Configures generation of AI-assistant documentation (CLAUDE.md, AGENTS.md) and provisioning of coding agents (Claude Code, Codex, Gemini, OpenCode, Infer, ...) inside sandbox environments. Each coding agent is toggled independently via its own subsection; by default every agent is disabled.
 */
export interface AIConfig {
  claudecode?: ClaudeCodeConfig;
  codex?: CodexConfig;
  gemini?: GeminiConfig;
  opencode?: OpenCodeConfig;
  infer?: InferConfig;
}
/**
 * Provision Anthropic's Claude Code coding agent inside the sandbox.
 */
export interface ClaudeCodeConfig {
  enabled: boolean;
}
/**
 * Provision OpenAI's Codex coding agent inside the sandbox.
 */
export interface CodexConfig {
  enabled: boolean;
}
/**
 * Provision Google's Gemini coding agent inside the sandbox.
 */
export interface GeminiConfig {
  enabled: boolean;
}
/**
 * Provision the OpenCode coding agent inside the sandbox.
 */
export interface OpenCodeConfig {
  enabled: boolean;
}
/**
 * Provision the Inference Gateway 'infer' coding agent inside the sandbox.
 */
export interface InferConfig {
  enabled: boolean;
}
export interface DeploymentConfig {
  type?: 'kubernetes' | 'cloudrun';
  cloudrun?: CloudRunConfig;
  kubernetes?: KubernetesConfig;
}
export interface CloudRunConfig {
  image?: ImageConfig;
  resources?: ResourcesConfig;
  scaling?: ScalingConfig;
  service?: ServiceConfig;
  environment?: {
    [k: string]: string;
  };
}
export interface ImageConfig {
  registry?: string;
  repository?: string;
  tag?: string;
  useCloudBuild?: boolean;
}
export interface ResourcesConfig {
  cpu?: string;
  memory?: string;
}
export interface ScalingConfig {
  minInstances?: number;
  maxInstances?: number;
  concurrency?: number;
}
export interface ServiceConfig {
  timeout?: number;
  allowUnauthenticated?: boolean;
  serviceAccount?: string;
  executionEnvironment?: string;
}
export interface KubernetesConfig {
  image?: ImageConfig;
}

/** Provenance for a catalog entry; injected by the aggregator (inference-gateway/agents). */
export interface AgentSource {
  url: string;
  ref: string;
  fetchedAt: string;
}

/** An ADL agent as it appears in catalog.json, with aggregator-injected provenance. */
export type CatalogAgent = ADLAgent & {
  _source?: AgentSource;
};

export interface Catalog {
  version: number;
  release?: string;
  updated: string;
  agents: CatalogAgent[];
}
