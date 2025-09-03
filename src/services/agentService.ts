import type { Agent } from '../types/agent';
import { agents } from '../data/agents';

export async function loadAgents(): Promise<Agent[]> {
  // Return the statically imported agents
  // This simulates an async operation but uses build-time data
  return Promise.resolve(agents);
}