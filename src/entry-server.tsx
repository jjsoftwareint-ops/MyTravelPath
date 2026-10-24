import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { allRoutes, pageMeta, placeholderPaths, renderHeadTags } from './seo'

// Used only by scripts/prerender.mjs after `vite build --ssr`.
export function render(url: string) {
  const meta = pageMeta(url)
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  return { html, head: renderHeadTags(meta), path: meta.path }
}

export const routes = () => {
  const thin = placeholderPaths()
  return allRoutes().map(({ path, updated }) => ({ path, lastmod: updated, inSitemap: !thin.has(path) }))
}
