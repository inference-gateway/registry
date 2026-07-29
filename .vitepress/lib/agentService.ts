import type { Catalog, CatalogAgent } from "./types";

const CATALOG_URL =
  import.meta.env.VITE_AGENTS_CATALOG_URL ??
  "https://cdn.jsdelivr.net/gh/inference-gateway/agents@latest/catalog.json";

let cached: Promise<CatalogAgent[]> | null = null;

export function loadAgents(): Promise<CatalogAgent[]> {
  if (!cached) {
    cached = fetch(CATALOG_URL, { headers: { accept: "application/json" } })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            `catalog fetch failed: ${res.status} ${res.statusText}`,
          );
        }
        const catalog = (await res.json()) as Catalog;
        if (!Array.isArray(catalog?.agents)) {
          throw new Error("response missing 'agents' array");
        }
        const invalid = catalog.agents.find(
          (a) => a?.apiVersion !== "adl.inference-gateway.com/v1",
        );
        if (invalid) {
          throw new Error(
            `catalog contains non-ADL agent (apiVersion=${JSON.stringify(
              invalid?.apiVersion,
            )})`,
          );
        }
        return catalog.agents;
      })
      .catch((err) => {
        cached = null;
        throw err;
      });
  }
  return cached;
}
