// Reading themes for the blog pages only (the rest of the site keeps the light/dark toggle in theme.ts).
// The choice is stored under "blogTheme" and set as <html data-blog-theme="…"> while a blog page is open;
// index.html applies it before the first paint on /blog/ addresses. "auto" sets no attribute, so the blog
// follows the device's light/dark setting as before. The colour sets live at the end of index.css.
export type BlogTheme = 'auto' | 'paper' | 'sepia' | 'sage' | 'dusk' | 'night'

export const BLOG_THEMES: { id: BlogTheme; label: string; swatch: [string, string] }[] = [
  { id: 'auto', label: 'Auto', swatch: ['#fffaf1', '#221d18'] },
  { id: 'paper', label: 'Paper', swatch: ['#fffaf1', '#2b2118'] },
  { id: 'sepia', label: 'Sepia', swatch: ['#f4e9d4', '#4b3a2a'] },
  { id: 'sage', label: 'Sage', swatch: ['#eef3eb', '#2c3a2e'] },
  { id: 'dusk', label: 'Dusk', swatch: ['#2a241e', '#e6d9c6'] },
  { id: 'night', label: 'Night', swatch: ['#202327', '#cfd3d8'] },
]

const KEY = 'blogTheme'
const BACKGROUND: Partial<Record<BlogTheme, string>> = {
  paper: '#f4f5f7',
  sepia: '#ede0c8',
  sage: '#dfe7dc',
  dusk: '#1d1915',
  night: '#17191c',
}

export function storedBlogTheme(): BlogTheme {
  try {
    const v = localStorage.getItem(KEY)
    return BLOG_THEMES.some((t) => t.id === v) ? (v as BlogTheme) : 'auto'
  } catch {
    return 'auto'
  }
}

const listeners = new Set<() => void>()
export function subscribeBlogTheme(fn: () => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Put the theme on <html> (blog pages call this on mount) and colour the browser bar to match.
export function showBlogTheme(theme: BlogTheme) {
  const root = document.documentElement
  if (theme === 'auto') delete root.dataset.blogTheme
  else root.dataset.blogTheme = theme
  const bg = BACKGROUND[theme]
  if (bg) document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', bg))
}

// Leaving the blog: drop the attribute and give the browser bar back the site's own colours.
export function hideBlogTheme() {
  delete document.documentElement.dataset.blogTheme
  const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
  const site = document.documentElement.dataset.theme
  metas.forEach((m) => {
    const media = m.getAttribute('media') || ''
    const dark = site ? site === 'dark' : media.includes('dark')
    m.setAttribute('content', dark ? '#0f1115' : '#f4f5f7')
  })
}

export function setBlogTheme(theme: BlogTheme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* private mode: lasts for this page view */
  }
  showBlogTheme(theme)
  listeners.forEach((fn) => fn())
}
