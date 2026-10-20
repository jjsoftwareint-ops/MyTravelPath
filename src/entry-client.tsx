import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { normalizePath } from './seo'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Every route is pre-rendered at build time into its own index.html, which
// carries data-path. When it matches the URL we hydrate that HTML; otherwise
// (dev server, 404.html on an unknown URL) we render from scratch.
if (root.dataset.path === normalizePath(location.pathname)) {
  hydrateRoot(root, app, {
    onRecoverableError: (err) => console.error('[hydration]', err),
  })
} else {
  createRoot(root).render(app)
}
