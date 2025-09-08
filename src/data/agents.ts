import type { Agent } from '../types/agent';
import documentationMetadata from '../../agents/documentation/metadata.yaml';
import googleCalendarMetadata from '../../agents/google-calendar/metadata.yaml';
import n8nMetadata from '../../agents/n8n/metadata.yaml';

export const agents: Agent[] = [
  documentationMetadata as Agent,
  googleCalendarMetadata as Agent,
  n8nMetadata as Agent,
];