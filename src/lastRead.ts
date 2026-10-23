import { useSyncExternalStore } from 'react'

// The blog post this visitor opened last, kept only in this browser (localStorage).
// Same store pattern as bookmarks.ts: empty on the server and in the first client render.
const KEY = 'blog-last-read'
const listeners = new Set<() => void>()
let memory: string | null = null

function read(): string | null {
  try {
    return localStorage.getItem(KEY) ?? memory
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

export const useLastRead = () => useSyncExternalStore(subscribe, read, () => null)

export function setLastRead(id: string) {
  if (read() === id) return
  memory = id
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* private mode: remembered for this page view only */
  }
  listeners.forEach((fn) => fn())
}
