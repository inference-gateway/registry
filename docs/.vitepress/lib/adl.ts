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
