// Platform hints. The Google Maps app on phones shows My Maps descriptions as
// plain text, so the Naver Map links inside them only work in a web browser.
// Ordinary https links to google.com/maps are claimed by the app, hence the
// browser-specific URL schemes below.

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function isAndroid(): boolean {
  return typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent)
}

/** True where an installed maps app may intercept the link and a browser scheme is used instead. */
export const isPhone = () => isIOS() || isAndroid()

/**
 * A URL that opens `url` in the phone's browser instead of the Google Maps app.
 * iOS 17+: the x-safari-https scheme hands the page to Safari directly.
 * Android: an intent that targets Chrome, falling back to the plain URL.
 * Elsewhere the URL is returned unchanged.
 */
export function browserUrl(url: string): string {
  if (isIOS()) return url.replace(/^https:\/\//, 'x-safari-https://')
  if (isAndroid()) {
    const bare = url.replace(/^https:\/\//, '')
    return `intent://${bare}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url)};end`
  }
  return url
}
