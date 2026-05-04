export interface Skill {
  name: string;
  description: string;
  source: string;
  ref: string;
  vendor: string;
  license: string;
  tags: string[];
  categories: string[];
  homepage?: string;
}

export interface SkillCatalog {
  version: number;
  updated: string;
  skills: Skill[];
}
