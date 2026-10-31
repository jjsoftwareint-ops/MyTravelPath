import { useSyncExternalStore } from 'react'

// "Don't show it again" for the tip before "To follow the path", kept only in this browser
// (localStorage). Same store pattern as lastRead.ts: shown on the server and in the first client render.
const KEY = 'follow-tip-hidden'
const listeners = new Set<() => void>()
let memory = false

function read(): boolean {
  try {
    return localStorage.getItem(KEY) === '1' || memory
  } catch {
    return memory
  }
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  const onStorage = (e: StorageEvent) => e.key === KEY && fn()
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

/** True once the visitor ticked "Don't show it again". */
export const useFollowTipHidden = () => useSyncExternalStore(subscribe, read, () => false)

export function hideFollowTip() {
  memory = true
  try {
    localStorage.setItem(KEY, '1')
  } catch {
    /* private mode: hidden for this page view only */
  }
  listeners.forEach((fn) => fn())
}
