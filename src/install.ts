import { useEffect, useState } from 'react'
import { isAndroid, isIOS } from './platform'

// "Add to Home Screen" offer (the floating button on the home list, path and blog pages): phones only, in the browser only.
// Hidden for good once the site runs from the home screen (standalone), once Android reports the
// install, or once the visitor taps "I added it". iPhone browsers never report an install, so that
// last tap is the only way to know there.
const DISMISSED = 'install-hint-hidden'

type BeforeInstallPromptEvent = Event & { prompt: () => Promise<unknown> }
// Chrome on Android fires this once, early; keep it so the button can open the install sheet.
let deferred: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as BeforeInstallPromptEvent
    listeners.forEach((fn) => fn())
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    hideInstallHint()
  })
}

export function hideInstallHint() {
  try {
    localStorage.setItem(DISMISSED, '1')
  } catch {
    /* private mode */
  }
  listeners.forEach((fn) => fn())
}

/** True when the site runs as the home-screen app (no browser bar, so no reload button). */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

// Threads, Instagram, Facebook, KakaoTalk, Naver and LINE open links in their own browser,
// which has no "Add to Home Screen".
function isInAppBrowser(): boolean {
  return /FBAN|FBAV|Instagram|Barcelona|Threads|KAKAOTALK|NAVER\(inapp|Line\//.test(navigator.userAgent)
}

function shouldShow(): boolean {
  try {
    if (localStorage.getItem(DISMISSED)) return false
  } catch {
    /* private mode: still offer it */
  }
  if (isStandalone() || isInAppBrowser()) return false
  return isIOS() || isAndroid()
}

export type InstallHint =
  | { show: false }
  | { show: true; platform: 'ios' | 'android'; canPrompt: boolean }

/** What to offer; `show` is false on the server and in the first client render. */
export function useInstallHint(): InstallHint {
  const [state, setState] = useState<InstallHint>({ show: false })
  useEffect(() => {
    const update = () =>
      setState(
        shouldShow()
          ? { show: true, platform: isIOS() ? 'ios' : 'android', canPrompt: deferred !== null }
          : { show: false },
      )
    update()
    listeners.add(update)
    return () => {
      listeners.delete(update)
    }
  }, [])
  return state
}

/** Chrome on Android: open the browser's own install sheet. */
export async function promptInstall() {
  if (!deferred) return
  const ev = deferred
  deferred = null
  await ev.prompt()
}
