import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { yamlPlugin } from './vite-plugin-yaml'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), yamlPlugin()],
})
