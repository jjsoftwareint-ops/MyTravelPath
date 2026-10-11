import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base './' lets the built site run from any sub-path (e.g. GitHub Pages).
// Static files (icons, manifest) live in ./assets and are copied to the root
// of dist as-is; reference them from index.html with a leading slash.
export default defineConfig({
  base: './',
  publicDir: 'assets',
  plugins: [react()],
})
