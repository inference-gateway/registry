import type { Skill, SkillCatalog } from "./types";

const CATALOG_URL =
  import.meta.env.VITE_SKILLS_CATALOG_URL ??
  "https://cdn.jsdelivr.net/gh/inference-gateway/skills@latest/catalog.json";

let cached: Promise<Skill[]> | null = null;

export function loadSkills(): Promise<Skill[]> {
  if (!cached) {
    cached = fetch(CATALOG_URL, { headers: { accept: "application/json" } })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            `catalog fetch failed: ${res.status} ${res.statusText}`,
          );
        }
        const catalog = (await res.json()) as SkillCatalog;
        if (!Array.isArray(catalog?.skills)) {
          throw new Error("response missing 'skills' array");
        }
        return catalog.skills;
      })
      .catch((err) => {
        cached = null;
        throw err;
      });
  }
  return cached;
}
