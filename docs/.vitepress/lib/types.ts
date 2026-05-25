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
}

export interface SkillCatalog {
  version: number;
  release?: string;
  updated: string;
  skills: Skill[];
}
