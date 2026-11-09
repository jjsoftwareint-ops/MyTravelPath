// Click test for the header back button, run against the built site (npm run build first):
//   npm run test:back
// Serves dist/ on a local port, drives headless Chrome over the DevTools protocol, clicks real links and the
// back button, and checks where each click lands. Every case is a bug the user once hit; add new ones here.
import { createServer } from 'node:http'
import { readFile, stat, mkdtemp } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, extname } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 8790
const DEBUG_PORT = 9339
const ORIGIN = `http://127.0.0.1:${PORT}`

// Pages used by the cases. Change them if a post or path is renamed.
const POST_A = '/blog/2026-11-10-0420/' // has a route link to the Yeongjongdo path
const POST_B = '/blog/2026-11-09-2255/'
const PATH = '/incheon/yeongjongdo/'
const CITY = '/incheon/'
const LINKED_PATH = '/seoul/seongsu-dong/' // its tips link the Olive Young guide
const LINKED_POST = '/blog/2026-11-01-2013/'

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml' }
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, ORIGIN).pathname)
  let file = join(DIST, p)
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
  } catch {
    file = join(DIST, '404.html')
  }
  try {
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
    res.end(await readFile(file))
  } catch {
    res.writeHead(404).end()
  }
})
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const profile = await mkdtemp(join(tmpdir(), 'backtest-'))
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

let ws
for (let i = 0; i < 50 && !ws; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json()
    const page = list.find((t) => t.type === 'page')
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl)
  } catch {}
  if (!ws) await sleep(200)
}
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let seq = 0
const pending = new Map()
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg)
    pending.delete(msg.id)
  }
})
const send = (method, params = {}) =>
  new Promise((r) => {
    const id = ++seq
    pending.set(id, r)
    ws.send(JSON.stringify({ id, method, params }))
  })
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value
const settle = () => sleep(600)

/** A fresh tab: a new document with its own empty history, like opening a shared link. */
async function open(path) {
  await send('Page.navigate', { url: 'about:blank' })
  await sleep(200)
  await evaluate('sessionStorage.clear()').catch(() => {})
  await send('Page.navigate', { url: ORIGIN + path })
  await sleep(1500)
}
/** Click the first in-app link to `path` (a real click, so React Router handles it). */
async function click(path) {
  const ok = await evaluate(`(() => {
    const a = [...document.querySelectorAll('a[href]')].find((a) => new URL(a.href).pathname === ${JSON.stringify(path)})
    if (!a) return false
    a.click()
    return true
  })()`)
  if (!ok) throw new Error(`no link to ${path} on ${await where()}`)
  await settle()
}
async function back() {
  const ok = await evaluate(`(() => { const a = document.querySelector('header a.back'); if (!a) return false; a.click(); return true })()`)
  if (!ok) throw new Error(`no back button on ${await where()}`)
  await settle()
}
const where = () => evaluate('location.pathname')

const cases = [
  {
    // 2026-11-07: a post opened from a path page must go back to that path page, not the blog list.
    name: 'post → path link → back returns to the post',
    run: async () => [await open(POST_A), await click(PATH), await back()],
    expect: POST_A,
  },
  {
    name: 'home → city → path → back returns to the city',
    run: async () => [await open('/'), await click(CITY), await click(PATH), await back()],
    expect: CITY,
  },
  {
    name: 'fresh path page → back goes to its city',
    run: async () => [await open(PATH), await back()],
    expect: CITY,
  },
  {
    name: 'fresh post → back goes to the blog list',
    run: async () => [await open(POST_A), await back()],
    expect: '/blog/',
  },
  {
    // 2026-11-09: after reading posts, the blog list's back button sent the user to another post.
    name: 'fresh post → back (blog list) → back goes home, not to the post',
    run: async () => [await open(POST_A), await back(), await back()],
    expect: '/',
  },
  {
    name: 'home → blog → post A → back → post B → back → back returns home',
    run: async () => [await open('/'), await click('/blog/'), await click(POST_A), await back(), await click(POST_B), await back(), await back()],
    expect: '/',
  },
  {
    // 2026-11-09: a blog opened from a path page: the blog list's back returns to that path page.
    name: 'fresh post → blog list → post → path → back → back → blog list back skips all posts, goes home',
    run: async () => [await open(POST_B), await back(), await click(POST_A), await click(PATH), await back(), await back(), await back()],
    // POST_B (fresh) → list → POST_A → PATH → back = POST_A → back = list → back skips every blog page → '/'
    expect: '/',
  },
  {
    // Path pages link blog posts from their tips (Seongsu → the Olive Young guide).
    name: 'home → city → path → blog post link → back returns to the path page',
    run: async () => [await open('/'), await click('/seoul/'), await click(LINKED_PATH), await click(LINKED_POST), await back()],
    expect: LINKED_PATH,
  },
  {
    name: 'path → blog post → another post → back → back returns to the path page',
    run: async () => [await open(LINKED_PATH), await click(LINKED_POST), await click(POST_B), await back(), await back()],
    expect: LINKED_PATH,
  },
  {
    // The blog list reached later in the same tab still skips every post back to the path page.
    name: 'path → blog post link → post → blog list → back skips the posts, returns to the path page',
    run: async () => [
      await open(LINKED_PATH),
      await click(LINKED_POST),
      await click(POST_B),
      await click('/blog/'),
      await back(),
    ],
    expect: LINKED_PATH,
  },
]

let failed = 0
for (const c of cases) {
  let got
  try {
    await c.run()
    got = await where()
  } catch (e) {
    got = `error: ${e.message}`
  }
  const ok = got === c.expect
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name}${ok ? '' : `  (expected ${c.expect}, got ${got})`}`)
}
console.log(failed ? `\n${failed} of ${cases.length} failed` : `\nall ${cases.length} passed`)
ws.close()
chrome.kill()
server.close()
process.exit(failed ? 1 : 0)
