import { useEffect, useState } from 'react'
import { isAndroid, isIOS } from './platform'

// "Add to Home Screen" hint: shown on phones from the second visit on, in the browser only
// (never inside the installed app), until the visitor closes it or installs the app.
// Visits are counted once per browser session (sessionStorage) in localStorage.
const VISITS = 'visits'
const COUNTED = 'visit-counted'
const DISMISSED = 'install-hint-hidden'

type BeforeInstallPromptEvent = Event & { prompt: () => Promise<unknown> }
// Chrome on Android fires this once, early; keep it so the hint can offer a one-tap install.
let deferred: BeforeInstallPromptEvent | null = null
const promptListeners = new Set<() => void>()
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferred = e as BeforeInstallPromptEvent
    promptListeners.forEach((fn) => fn())
  })
  window.addEventListener('appinstalled', () => {
    deferred = null
    hideInstallHint()
  })
}

export function countVisit() {
  try {
    if (sessionStorage.getItem(COUNTED)) return
    sessionStorage.setItem(COUNTED, '1')
    const n = Number(localStorage.getItem(VISITS) ?? '0') + 1
    localStorage.setItem(VISITS, String(n))
  } catch {
    /* private mode: no count, no hint */
  }
}

const dismissListeners = new Set<() => void>()
export function hideInstallHint() {
  try {
    localStorage.setItem(DISMISSED, '1')
  } catch {
    /* private mode */
  }
  dismissListeners.forEach((fn) => fn())
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function shouldShow(): boolean {
  try {
    if (localStorage.getItem(DISMISSED)) return false
    if (Number(localStorage.getItem(VISITS) ?? '0') < 2) return false
  } catch {
    return false
  }
  if (isStandalone()) return false
  return isIOS() || isAndroid()
}

export type InstallHint =
  | { show: false }
  | { show: true; platform: 'ios' | 'android'; canPrompt: boolean }

/** What the hint should render; `show` is false on the server and in the first client render. */
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
    promptListeners.add(update)
    dismissListeners.add(update)
    return () => {
      promptListeners.delete(update)
      dismissListeners.delete(update)
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
