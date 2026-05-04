import type { Skill } from '../types/skill';
import { skills } from '../data/skills';

export async function loadSkills(): Promise<Skill[]> {
  return Promise.resolve(skills);
}
