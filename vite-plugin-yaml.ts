import type { Plugin } from 'vite';
import yaml from 'js-yaml';

export function yamlPlugin(): Plugin {
  return {
    name: 'vite-plugin-yaml',
    transform(code, id) {
      if (id.endsWith('.yaml') || id.endsWith('.yml')) {
        const parsed = yaml.load(code);
        return {
          code: `export default ${JSON.stringify(parsed)}`,
          map: null
        };
      }
    }
  };
}