import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// The site lives at the root of koreatravelpath.com and every route is
// pre-rendered into its own directory (scripts/prerender.mjs), so asset URLs
// must be absolute: base '/'. Static files (icons, manifest, robots, CNAME)
// live in ./assets and are copied to the root of dist as-is.
export default defineConfig({
  base: '/',
  publicDir: 'assets',
  plugins: [react()],
})
