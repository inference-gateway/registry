import type { Agent, AgentCatalog } from '../types/agent';

const CATALOG_URL =
  import.meta.env.VITE_AGENTS_CATALOG_URL ??
  'https://cdn.jsdelivr.net/gh/inference-gateway/agents@main/catalog.json';

let cached: Promise<Agent[]> | null = null;

export function loadAgents(): Promise<Agent[]> {
  if (!cached) {
    cached = fetch(CATALOG_URL, { headers: { accept: 'application/json' } })
      .then(async (res) => {
        if (!res.ok) throw new Error(`catalog fetch failed: ${res.status} ${res.statusText}`);
        const catalog = (await res.json()) as AgentCatalog;
        if (!Array.isArray(catalog?.agents)) throw new Error("response missing 'agents' array");
        return catalog.agents;
      })
      .catch((err) => {
        cached = null;
        throw err;
      });
  }
  return cached;
}
