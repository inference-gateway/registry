import type { CatalogAgent } from "./types";

const INFERENCE_GATEWAY_OWNER = /^https?:\/\/github\.com\/inference-gateway\//i;

export function deriveTags(agent: CatalogAgent): string[] {
  const tools = agent.spec?.tools?.flatMap((t) => t.tags ?? []) ?? [];
  const skills = agent.spec?.skills?.flatMap((s) => s.tags ?? []) ?? [];
  return Array.from(new Set([...tools, ...skills])).sort();
}

export function deriveImage(
  agent: CatalogAgent,
): { repository: string; tag: string } | null {
  const deploy = agent.spec?.deployment;
  const declared = deploy?.cloudrun?.image ?? deploy?.kubernetes?.image;
  if (declared?.repository) {
    const registry = declared.registry ? `${declared.registry}/` : "";
    return {
      repository: `${registry}${declared.repository}`,
      tag: declared.tag ?? agent.metadata.version,
    };
  }
  const sourceUrl = agent.spec?.scm?.url ?? agent._source?.url ?? "";
  if (INFERENCE_GATEWAY_OWNER.test(sourceUrl)) {
    return {
      repository: `ghcr.io/inference-gateway/${agent.metadata.name}`,
      tag: agent.metadata.version,
    };
  }
  return null;
}

// The CLI ships built-in defaults (URL, image, run flag) only for these names -
// see config/agent_defaults.go in inference-gateway/cli. `infer agents add <name>`
// fails with "URL is required for unknown agent" for anything else, so every other
// catalog entry needs an explicit URL (plus image) in its command.
const CLI_BUILTIN_AGENTS = new Set([
  "browser-agent",
  "mock-agent",
  "google-calendar-agent",
  "documentation-agent",
  "n8n-agent",
]);

export function deriveInstallCommand(agent: CatalogAgent): string {
  const name = agent.metadata.name;
  if (CLI_BUILTIN_AGENTS.has(name)) return `infer agents add ${name}`;

  const server = agent.spec?.server;
  const url = `${server?.scheme || "http"}://localhost:${server?.port ?? 8080}`;
  const image = deriveImage(agent);
  const local = image ? ` --oci ${image.repository}:${image.tag} --run` : "";
  return `infer agents add ${name} ${url}${local}`;
}

export function deriveRepository(agent: CatalogAgent): string | null {
  return agent.spec?.scm?.url || agent._source?.url || null;
}

export function deriveDocs(agent: CatalogAgent): string | null {
  return agent.spec?.card?.documentationUrl || null;
}

export function deriveProvider(agent: CatalogAgent): string | null {
  const p = agent.spec?.agent?.provider;
  return p && p.length > 0 ? p : null;
}

export function deriveDisplayName(agent: CatalogAgent): string {
  const acronyms = new Map(
    (agent.spec?.acronyms ?? []).map((a) => [a.toLowerCase(), a]),
  );
  return agent.metadata.name
    .split("-")
    .map((part) => {
      if (part.length === 0) return part;
      const preserved = acronyms.get(part.toLowerCase());
      if (preserved !== undefined) return preserved;
      return part[0].toUpperCase() + part.slice(1);
    })
    .join(" ");
}

export function deriveLanguage(agent: CatalogAgent): string | null {
  const langs = agent.spec?.language;
  if (!langs) return null;
  const keys = Object.keys(langs);
  return keys.length > 0 ? keys[0] : null;
}
