import type { Plugin } from 'vite';

interface SitemapOptions {
  hostname: string;
  routes: string[];
}

export function sitemapPlugin(options: SitemapOptions): Plugin {
  const { hostname, routes } = options;

  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    generateBundle() {
      const base = hostname.replace(/\/$/, '');
      const lastmod = new Date().toISOString().split('T')[0];

      const urls = routes
        .map((route) => {
          const loc = `${base}${route}`;
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
        })
        .join('\n');

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: xml,
      });
    },
  };
}
