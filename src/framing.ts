// Which links can open inside the site's popup (ImagePopup) instead of a new tab.
// A site that sends "X-Frame-Options: DENY/SAMEORIGIN" or a CSP frame-ancestors rule shows a blank
// error box in a frame, so its links keep opening a new tab. Check a new link's site with
//   curl -sIL -A "Mozilla/5.0" <url> | grep -iE "x-frame-options|frame-ancestors"
// and add the host here when it refuses (checked 2026-11-05 for every link in blog.ts).
const NO_FRAME = new Set([
  'apps.apple.com',
  'en.railpark.co.kr',
  'play.google.com',
  'tilnote.io',
  'www.fnnews.com',
  'www.koreanclass101.com',
  'www.mt.co.kr',
  'www.netflix.com',
  'www.instagram.com',
  'www.facebook.com',
  'x.com',
  'twitter.com',
  'www.tiktok.com',
  'map.naver.com',
  'naver.me',
  'www.google.com', // Google search and Maps refuse; Google Images has its own popup (igu=1)
  'maps.app.goo.gl',
  'royal.khs.go.kr', // Royal Palaces booking (X-Frame-Options SAMEORIGIN, checked 2026-11-12)
])

const SITE = 'koreatravelpath.com'

// A link to this site as an in-app path ("/blog/…/"), else null.
export function internalPath(href: string): string | null {
  try {
    const u = new URL(href)
    if (u.hostname !== SITE && u.hostname !== `www.${SITE}`) return null
    return `${u.pathname}${u.search}${u.hash}`
  } catch {
    return null
  }
}

// Popup title for an outside link: the site, not the linked words ("koreatimes.co.kr", "YouTube").
export function siteName(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./, '')
    return host === 'youtu.be' || host.endsWith('youtube.com') ? 'YouTube' : host
  } catch {
    return href
  }
}

// What to load in the popup for an outside link, or null when it has to open a new tab.
// YouTube watch pages refuse frames, so a video link opens the privacy-enhanced player instead.
export function framedSrc(href: string): string | null {
  try {
    const u = new URL(href)
    const video =
      u.hostname === 'youtu.be'
        ? u.pathname.slice(1)
        : /(^|\.)youtube\.com$/.test(u.hostname) && u.pathname === '/watch'
          ? u.searchParams.get('v')
          : null
    if (video) return `https://www.youtube-nocookie.com/embed/${video}`
    if (/(^|\.)youtube\.com$/.test(u.hostname)) return null // channels, search pages
    if (NO_FRAME.has(u.hostname)) return null
    if (/\.pdf$/i.test(u.pathname)) return null // iPhones show only page 1 of a PDF in a frame
    return u.href
  } catch {
    return null
  }
}
