import type { Agent } from '../types/agent';
import documentationMetadata from '../../agents/documentation/metadata.yaml';
import googleCalendarMetadata from '../../agents/google-calendar/metadata.yaml';

export const agents: Agent[] = [
  documentationMetadata as Agent,
  googleCalendarMetadata as Agent,
];