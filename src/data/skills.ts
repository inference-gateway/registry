import type { Skill, SkillCatalog } from '../types/skill';
import skillsCatalog from './skills.json';

const catalog = skillsCatalog as SkillCatalog;

export const skills: Skill[] = catalog.skills;
export const catalogUpdatedAt: string = catalog.updated;
