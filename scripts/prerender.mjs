// Pre-render every route into dist/<route>/index.html, plus sitemap.xml and 404.html.
// Runs after `vite build` (client, dist/) and `vite build --ssr` (server, dist-ssr/).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')
const SITE = 'https://koreatravelpath.com'

const { render, routes } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"><!--app-html--></div>')) {
  throw new Error('dist/index.html lost its <!--app-head--> / <!--app-html--> placeholders')
}

function page(url) {
  const { html, head, path } = render(url)
  return template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-path="${path}">${html}</div>`)
}

const list = routes()
// Every address must be lowercase letters, digits and hyphens (ids in src/data). A space or capital in an id
// once reached the sitemap as "/seoul/Indoors Trip/", which Google cannot use: fail the build instead.
const unsafe = list.filter(({ path }) => !/^\/[a-z0-9/-]*$/.test(path))
if (unsafe.length) {
  throw new Error(`Route(s) not URL-safe, rename the id to lowercase-with-hyphens: ${unsafe.map((r) => JSON.stringify(r.path)).join(', ')}`)
}
for (const { path } of list) {
  const dir = join(dist, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), page(path))
}
// Addresses that moved. GitHub Pages cannot send a 301, so each old address gets a small page that points at the new one
// (canonical link, instant refresh and a visible link). They stay out of the sitemap.
const MOVED = { '/suwon/': '/gyeonggi-do/hwaseong/', '/suwon/hwaseong/': '/gyeonggi-do/hwaseong/' }
for (const [from, to] of Object.entries(MOVED)) {
  const dir = join(dist, from)
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    join(dir, 'index.html'),
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>This page moved | My Travel Path</title>` +
      `<link rel="canonical" href="${SITE}${to}"><meta http-equiv="refresh" content="0; url=${to}"></head>` +
      `<body><p>This page moved to <a href="${to}">${SITE}${to}</a>.</p></body></html>\n`,
  )
}
// Unknown URLs: GitHub Pages serves this with status 404; the client then navigates home.
writeFileSync(join(dist, '404.html'), page('/'))

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  // Pages still showing "Map link coming soon" are pre-rendered but left out of the sitemap.
  list.filter((r) => r.inSitemap).map(({ path, lastmod }) => `  <url><loc>${SITE}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n') +
  '\n</urlset>\n'
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

rmSync(ssr, { recursive: true, force: true })
console.log(`prerendered ${list.length} routes + 404.html + sitemap.xml`)
