export type {
  ADLAgent,
  AgentSource,
  Catalog,
  CatalogAgent,
} from "../types/adl";

export interface Skill {
  name: string;
  description: string;
  source: string;
  vendor: string;
  license: string;
  tags: string[];
  categories: string[];
  homepage?: string;
  /** Programming language the skill targets (e.g. "go", "typescript", "rust"). */
  language?: string;
  /** Devicon SVG URL for the language logo. */
  logo?: string;
}

export interface SkillCatalog {
  version: number;
  release?: string;
  updated: string;
  skills: Skill[];
}
