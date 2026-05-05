import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { yamlPlugin } from './vite-plugin-yaml'
import { sitemapPlugin } from './vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    yamlPlugin(),
    sitemapPlugin({
      hostname: 'https://registry.inference-gateway.com',
      routes: [
        '/agents/',
        '/skills/',
        '/how-to/prerequisites/',
        '/how-to/local-setup/',
        '/how-to/gateway-setup/',
        '/how-to/using-agents/',
        '/how-to/build-agents/',
        '/how-to/production/',
      ],
    }),
  ],
})
