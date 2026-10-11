// True on iPhone and iPad (including iPadOS, which reports itself as a Mac
// but has a touch screen). Used for hints that only apply there, because the
// Google Maps app on iOS shows My Maps descriptions as plain text.
export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}
