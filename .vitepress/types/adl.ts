// AUTO-GENERATED - DO NOT EDIT.
// Regenerate with: bun run codegen
// Source: https://cdn.jsdelivr.net/gh/inference-gateway/adl@main/schema/v1/schema.json

/**
 * Curated examples that demonstrate the agent's capabilities. Each entry has a 'title' and 'description'; consumers (e.g. adl-cli) use these to render an 'Examples' section in the generated README.md, linking each example to a scratchpad or playground for the agent.
 */
export type Examples = Example[];
/**
 * Selects the traces exporter. Exactly one key must be present (enforced by oneOf); the key name is what the consumer emits as OTEL_TRACES_EXPORTER. Only 'otlp' is supported for traces today; new exporters may be added as additional keys in a future minor version.
 */
export type TelemetryTracesExporter = {
  otlp?: TelemetryOTLPExporter;
} & TelemetryTracesExporter1;
export type TelemetryTracesExporter1 = {
  [k: string]: unknown;
};
/**
 * Selects the metrics exporter. Exactly one key must be present (enforced by oneOf); the key name is what the consumer emits as OTEL_METRICS_EXPORTER. 'otlp' pushes to a collector; 'prometheus' exposes a pull/scrape endpoint.
 */
export type TelemetryMetricsExporter = {
  otlp?: TelemetryOTLPExporter;
  prometheus?: TelemetryPrometheusExporter;
} & TelemetryMetricsExporter1;
export type TelemetryMetricsExporter1 = {
  [k: string]: unknown;
};

/**
 * JSON Schema for Agent Definition Language manifests (apiVersion adl.inference-gateway.com/v1).
 */
export interface ADLAgent {
  apiVersion: "adl.inference-gateway.com/v1";
  kind: "Agent";
  metadata: Metadata;
  spec: Spec;
}
export interface Metadata {
  name: string;
  description: string;
  version: string;
  /**
   * Author of the agent. Optional; when provided, 'name' is required. 'email' and 'url' are optional contact fields.
   */
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  /**
   * SPDX identifier under which the agent is distributed, or "Proprietary" for closed-source agents. Mirrors the enum used for Skill.license so the same accepted set applies at the agent level. New identifiers may be added in future minor versions of the schema.
   */
  license?:
    | "MIT"
    | "Apache-2.0"
    | "BSD-2-Clause"
    | "BSD-3-Clause"
    | "GPL-2.0"
    | "GPL-3.0"
    | "LGPL-2.1"
    | "LGPL-3.0"
    | "MPL-2.0"
    | "ISC"
    | "CC0-1.0"
    | "CC-BY-4.0"
    | "CC-BY-SA-4.0"
    | "Unlicense"
    | "Proprietary";
  /**
   * Discoverability tags for the agent (e.g. 'calendar', 'automation'). Consumers may merge these with tool- and skill-level tags when indexing.
   */
  tags?: string[];
}
export interface Spec {
  capabilities: Capabilities;
  card?: Card;
  documentation?: Documentation;
  examples?: Examples;
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
  telemetry?: TelemetryConfig;
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
/**
 * Hand-authored documentation pages the generated project owns and ships itself. Each entry in 'pages' declares a page the consumer (e.g. adl-cli) scaffolds as a stub markdown file at 'path' with the given 'title', to be filled in by the maintainers. This is distinct from 'spec.card.documentationUrl', which is a single link to already-published external docs: 'documentation.pages' describes the docs the project generates and maintains in-tree.
 */
export interface Documentation {
  /**
   * Documentation pages to scaffold. At least one page is required when the 'documentation' block is present.
   *
   * @minItems 1
   */
  pages: [DocumentationPage, ...DocumentationPage[]];
}
/**
 * A single documentation page. 'title' is the human-readable heading; 'path' is where the consumer writes the stub file, relative to the generated project's docs root (e.g. 'docs/getting-started.md').
 */
export interface DocumentationPage {
  /**
   * Human-readable page title, used as the heading and in navigation.
   */
  title: string;
  /**
   * Destination path for the generated stub file, relative to the generated project's docs root (e.g. 'docs/getting-started.md').
   */
  path: string;
}
/**
 * A single example entry. 'title' is the human-readable heading shown in the generated README's Examples section; 'description' explains what the example demonstrates.
 */
export interface Example {
  /**
   * Short, descriptive title for the example (e.g. 'Basic chat', 'Tool use').
   */
  title: string;
  /**
   * One- or two-sentence explanation of what the example demonstrates.
   */
  description: string;
}
export interface Agent {
  provider?:
    | ""
    | "openai"
    | "anthropic"
    | "ollama"
    | "deepseek"
    | "google"
    | "mistral"
    | "groq"
    | "cohere"
    | "cloudflare"
    | "moonshot"
    | "ollama_cloud"
    | "nvidia"
    | "minimax";
  model?: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  mcp?: MCP;
}
/**
 * MCP (Model Context Protocol) configuration for the agent: the servers it connects to at runtime plus the runtime settings for the ADK's built-in MCP client. Only meaningful for an LLM-backed agent - A2A itself does not require an LLM - so this lives under 'spec.agent'. 'servers' declares *which* servers to connect to; the remaining fields are the *how* (enable toggle, endpoint, refresh, timeouts, retry/backoff), applied globally across those servers. They mirror the connection/retry model the Go ADK exposes, which is HTTP-only with a single endpoint and one timeout/retry set (there is no per-server override). 'enabled' is the master switch, mapped to 'A2A_MCP_ENABLE': when false (the default) no MCP client is wired in and no MCP code is generated, even if 'servers' lists servers. Every config field maps 1:1 to an 'A2A_MCP_*' environment variable, and its value in the manifest becomes the default the generated project emits (e.g. in .env.example); the matching environment variable overrides it at runtime. The list of server base URLs the client connects to ('A2A_MCP_SERVERS') is derived from the 'servers' entries, not set here. The MCP client is disabled by default - omit this block or set 'enabled: false' to keep it off.
 */
export interface MCP {
  /**
   * Master switch for the MCP client, mapped to 'A2A_MCP_ENABLE'. When false (the default) no MCP client is generated or wired in, regardless of any servers listed in 'servers'.
   */
  enabled: boolean;
  /**
   * MCP servers the agent connects to at runtime to discover and call external tools and capabilities, in addition to the locally generated 'spec.tools'. Each entry declares a transport plus the connection details for that transport.
   */
  servers?: MCPServer[];
  /**
   * Path appended to each server base URL to reach its MCP endpoint. Maps 1:1 to 'A2A_MCP_ENDPOINT'.
   */
  endpoint?: string;
  /**
   * How often the client re-discovers the tools each server exposes, as a Go duration string (e.g. '5m', '30s', '1h30m'). Maps 1:1 to 'A2A_MCP_REFRESH_INTERVAL'.
   */
  refreshInterval?: string;
  /**
   * Timeout for establishing a connection to an MCP server, as a Go duration string. Maps 1:1 to 'A2A_MCP_DIAL_TIMEOUT'.
   */
  dialTimeout?: string;
  /**
   * Timeout for a single MCP tool call, as a Go duration string. Maps 1:1 to 'A2A_MCP_CALL_TIMEOUT'.
   */
  callTimeout?: string;
  /**
   * Maximum number of retries for a failed MCP operation. '0' means retry forever. Maps 1:1 to 'A2A_MCP_MAX_RETRIES'.
   */
  maxRetries?: number;
  /**
   * Initial backoff between retries, as a Go duration string. Maps 1:1 to 'A2A_MCP_RETRY_INTERVAL'.
   */
  retryInterval?: string;
  /**
   * Maximum backoff between retries once the interval has grown, as a Go duration string. Maps 1:1 to 'A2A_MCP_RETRY_MAX_INTERVAL'.
   */
  retryMaxInterval?: string;
}
/**
 * A single MCP (Model Context Protocol) server the agent can connect to. 'stdio' launches a local subprocess and talks over stdin/stdout (use 'command', 'args', and 'env'); 'http' and 'sse' connect to a remote endpoint (use 'url' and 'headers'). Connection details that do not apply to the chosen transport are simply omitted; the schema does not constrain which combination is present so consumers can stay lenient.
 */
export interface MCPServer {
  /**
   * Identifier for the MCP server, unique within the agent. Consumers typically use it to namespace the tools the server exposes.
   */
  name: string;
  /**
   * How the agent connects to the MCP server. New transports may be added in future minor versions; consumers should be lenient about unknown values.
   */
  transport: "stdio" | "sse" | "http";
  /**
   * Executable to launch for a 'stdio' server (e.g. 'npx', 'uvx', 'docker'). Ignored by remote transports.
   */
  command?: string;
  /**
   * Arguments passed to 'command' when launching a 'stdio' server.
   */
  args?: string[];
  /**
   * Environment variables set when launching a 'stdio' server (e.g. API keys or tokens the server needs).
   */
  env?: {
    [k: string]: string;
  };
  /**
   * Endpoint URL for an 'http' or 'sse' server. Ignored by the 'stdio' transport.
   */
  url?: string;
  /**
   * Extra HTTP headers sent when connecting to an 'http' or 'sse' server (e.g. 'Authorization').
   */
  headers?: {
    [k: string]: string;
  };
}
export interface Service {
  type: "service" | "repository" | "client" | "middleware";
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
 * Markdown playbook the agent can discover and load on demand at runtime. Each skill's metadata (name and description) is advertised to the model at startup; the SKILL.md body is read lazily when the model invokes the skill. Pulled from the skills registry or scaffolded blank with bare: true.
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
    | "MIT"
    | "Apache-2.0"
    | "BSD-2-Clause"
    | "BSD-3-Clause"
    | "GPL-2.0"
    | "GPL-3.0"
    | "LGPL-2.1"
    | "LGPL-3.0"
    | "MPL-2.0"
    | "ISC"
    | "CC0-1.0"
    | "CC-BY-4.0"
    | "CC-BY-SA-4.0"
    | "Unlicense"
    | "Proprietary";
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
  provider?: "github" | "gitlab" | "bitbucket";
  url?: string;
  github_app?: boolean;
  /**
   * Name of the repository secret holding the GitHub App client ID used by the generated release (CD) workflow when github_app is enabled.
   */
  app_id_secret?: string;
  /**
   * Name of the repository secret holding the GitHub App private key used by the generated release (CD) workflow when github_app is enabled.
   */
  app_private_key_secret?: string;
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
   * Extra packages to install into the development sandbox (flox, devcontainer, dockerCompose) on top of whatever the generator pulls in by default. Use this for cross-cutting tools that aren't tied to one of the project's languages - e.g. 'deno@2.1.4', 'kubectl@1.31.0', 'terraform@1.9.5'. Each entry follows the '<package>@<version>' form; consumers are responsible for resolving the package against the sandbox's native package source (Nixpkgs for flox, apt/apk/feature for devcontainer, image layers for dockerCompose).
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
 * Configures AI-assistant integration for the agent project: generation of AI-assistant documentation (CLAUDE.md, AGENTS.md) and provisioning of coding-agent orchestrators inside sandbox environments.
 */
export interface AIConfig {
  orchestrators?: OrchestratorsConfig;
}
/**
 * Coding-agent orchestrators to provision inside the sandbox (Claude Code, Codex, Gemini, OpenCode, Infer, ...). Each orchestrator is toggled independently via its own subsection; by default every orchestrator is disabled.
 */
export interface OrchestratorsConfig {
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
  /**
   * Name of the repository secret holding the GitHub App client ID used by the generated Claude Code workflow.
   */
  appIdSecret?: string;
  /**
   * Name of the repository secret holding the GitHub App private key used by the generated Claude Code workflow.
   */
  appPrivateKeySecret?: string;
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
  /**
   * Name of the repository secret holding the GitHub App client ID used by the generated infer workflow.
   */
  appIdSecret?: string;
  /**
   * Name of the repository secret holding the GitHub App private key used by the generated infer workflow.
   */
  appPrivateKeySecret?: string;
}
export interface DeploymentConfig {
  type?: "kubernetes" | "cloudrun" | "vercel" | "cloudflare";
  cloudrun?: CloudRunConfig;
  kubernetes?: KubernetesConfig;
  vercel?: VercelConfig;
  cloudflare?: CloudflareConfig;
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
/**
 * Configuration for deploying to Vercel. Unlike kubernetes/cloudrun which deploy prebuilt container images, Vercel deploys from source via its own build pipeline.
 */
export interface VercelConfig {
  /**
   * Vercel project name.
   */
  project?: string;
  /**
   * Vercel team ID or slug the project belongs to.
   */
  team?: string;
  /**
   * Vercel framework identifier (e.g. "nextjs", "nuxtjs"). When omitted Vercel auto-detects.
   */
  framework?: string;
  /**
   * Vercel function runtime. "nodejs" for the serverless Node.js runtime (supports full Node API); "edge" for the Edge runtime (limited API, runs in V8 isolates at the edge).
   */
  runtime?: "nodejs" | "edge";
  /**
   * Vercel region identifiers where the function is deployed (e.g. "iad1", "gru1", "hkg1"). Omitting lets Vercel decide.
   */
  regions?: string[];
  /**
   * Configuration for Vercel serverless functions.
   */
  functions?: {
    /**
     * Memory limit in MB (e.g. 1024).
     */
    memory?: number;
    /**
     * Maximum function execution time in seconds.
     */
    maxDuration?: number;
  };
  /**
   * Environment variables injected into the Vercel deployment. Values can use the ${VAR} placeholder convention for secrets; never inline a real secret here. See docs/reference/secrets.md.
   */
  environment?: {
    [k: string]: string;
  };
}
/**
 * Configuration for deploying to Cloudflare Workers. Like vercel and unlike kubernetes/cloudrun, Workers deploy from source via wrangler rather than a prebuilt container image, so there is no image sub-block. This models Workers (the server/serverless product, the right target for an A2A agent server), not Pages. Consumers (e.g. adl-cli) translate this block into wrangler configuration (wrangler.toml / wrangler.jsonc).
 */
export interface CloudflareConfig {
  /**
   * Worker name - the script name registered with Cloudflare (e.g. "customer-support-agent"). Surfaces as the wrangler "name" field.
   */
  name?: string;
  /**
   * Cloudflare account ID that owns the Worker. Prefer a ${VAR} placeholder over inlining the value.
   */
  accountId?: string;
  /**
   * Workers runtime compatibility date in YYYY-MM-DD form (e.g. "2025-01-01"). Effectively required by wrangler; when omitted the generator supplies a default. See https://developers.cloudflare.com/workers/configuration/compatibility-dates/.
   */
  compatibilityDate?: string;
  /**
   * Workers runtime compatibility flags (e.g. "nodejs_compat" to enable Node.js API compatibility). Workers always run on the V8-isolate edge runtime, so Node API needs are met via flags rather than a runtime enum.
   */
  compatibilityFlags?: string[];
  /**
   * Custom routes / domains the Worker is served on (e.g. "agent.example.com/*"). Omit to rely on the workers.dev subdomain.
   */
  routes?: string[];
  /**
   * Whether the Worker is exposed on its *.workers.dev subdomain. Set false when serving exclusively via custom routes.
   */
  workersDev?: boolean;
  /**
   * Plain-text environment variables (wrangler "vars") injected into the Worker. Values can use the ${VAR} placeholder convention; never inline a real secret here - Cloudflare secrets are set out-of-band with "wrangler secret put". See docs/reference/secrets.md.
   */
  environment?: {
    [k: string]: string;
  };
}
/**
 * OpenTelemetry instrumentation for the generated agent. 'enabled' is the master switch (mapped to the ADK's A2A_TELEMETRY_ENABLE): when true the consumer (e.g. adl-cli) pulls OpenTelemetry dependencies into the project, instruments the built-in tool calls with spans, and turns on the telemetry/metrics server. The optional 'traces' and 'metrics' blocks select a per-signal exporter following the OpenTelemetry SDK declarative-configuration model - the exporter is nested under each signal and the single key beneath 'exporter' picks it (otlp = push, prometheus = pull), so there is no separate exporter enum and no signal-agnostic protocol block. Every field maps 1:1 to a standard OTEL_* environment variable, which the consumer emits as a generated .env.example default. Omitting a signal (or its 'exporter' block) disables that signal: OTEL_TRACES_EXPORTER=none / OTEL_METRICS_EXPORTER=none. Headers, credentials, and sampling are deliberately kept out of the manifest and resolved at runtime through the environment. 'traces' and 'metrics' are optional and purely additive, so an existing '{ enabled: true }' manifest stays valid. Telemetry is disabled by default - omit the block or set 'enabled: false' to keep it off.
 */
export interface TelemetryConfig {
  /**
   * Master switch for OpenTelemetry instrumentation, mapped to the ADK's A2A_TELEMETRY_ENABLE. When false (the default) no telemetry is wired in, regardless of any 'traces'/'metrics' blocks.
   */
  enabled: boolean;
  traces?: TelemetryTracesConfig;
  metrics?: TelemetryMetricsConfig;
}
/**
 * Tracing (spans) signal configuration. The 'exporter' key selects how spans leave the process; omitting 'exporter' (or the whole 'traces' block) disables tracing -> OTEL_TRACES_EXPORTER=none.
 */
export interface TelemetryTracesConfig {
  exporter?: TelemetryTracesExporter;
}
/**
 * OTLP push exporter for a single signal. Selecting it sets OTEL_{TRACES,METRICS}_EXPORTER=otlp. When both traces and metrics use otlp with identical settings the consumer may emit the shared OTEL_EXPORTER_OTLP_ENDPOINT / OTEL_EXPORTER_OTLP_PROTOCOL; otherwise it emits the per-signal OTEL_EXPORTER_OTLP_TRACES_* / OTEL_EXPORTER_OTLP_METRICS_* variants. Authentication headers and credentials are never taken from the manifest - they are supplied at runtime via OTEL_EXPORTER_OTLP_HEADERS and friends.
 */
export interface TelemetryOTLPExporter {
  /**
   * Collector endpoint, e.g. http://localhost:4318. Maps 1:1 to OTEL_EXPORTER_OTLP_TRACES_ENDPOINT / OTEL_EXPORTER_OTLP_METRICS_ENDPOINT (or the shared OTEL_EXPORTER_OTLP_ENDPOINT when both signals match). A ${VAR} placeholder is accepted and resolved by the consumer at runtime. Optional; when omitted the OTLP SDK default applies.
   */
  endpoint?: string;
  /**
   * OTLP wire protocol. Maps 1:1 to OTEL_EXPORTER_OTLP_TRACES_PROTOCOL / OTEL_EXPORTER_OTLP_METRICS_PROTOCOL (or the shared OTEL_EXPORTER_OTLP_PROTOCOL). Optional; when omitted the OTLP SDK default applies.
   */
  protocol?: "http/protobuf" | "grpc";
}
/**
 * Metrics signal configuration. The 'exporter' key selects how metrics are exposed or pushed; omitting 'exporter' (or the whole 'metrics' block) disables metrics -> OTEL_METRICS_EXPORTER=none.
 */
export interface TelemetryMetricsConfig {
  exporter?: TelemetryMetricsExporter;
}
/**
 * Prometheus pull exporter (metrics only): the agent exposes a scrape endpoint instead of pushing. Selecting it sets OTEL_METRICS_EXPORTER=prometheus.
 */
export interface TelemetryPrometheusExporter {
  /**
   * Host/interface the scrape endpoint binds to (e.g. "" for all interfaces). Maps 1:1 to OTEL_EXPORTER_PROMETHEUS_HOST. Optional; when omitted the SDK default applies.
   */
  host?: string;
  /**
   * Port the scrape endpoint listens on (OpenTelemetry default 9464). Maps 1:1 to OTEL_EXPORTER_PROMETHEUS_PORT. Optional; when omitted the SDK default applies.
   */
  port?: number;
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
