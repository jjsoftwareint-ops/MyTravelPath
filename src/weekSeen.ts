import { useSyncExternalStore } from 'react'
import { thisWeek } from './data/thisWeek'

// The red dot on the calendar icon: shown until the visitor opens /this-week/ after the page was
// last refreshed. Kept only in this browser (localStorage). Same store pattern as newPosts.ts:
// no dot on the server and in the first client render, so the pre-rendered HTML always matches.
const KEY = 'this-week-seen'
const listeners = new Set<() => void>()
let memory: string | null = null

function stored(): string | null {
  try {
    return localStorage.getItem(KEY) ?? memory
  } catch {
    return memory
  }
}

const read = () => stored() !== thisWeek.updated

function subscribe(fn: () => void) {
  listeners.add(fn)
  const onStorage = (e: StorageEvent) => e.key === KEY && fn()
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

/** True when the page was refreshed since the visitor last opened it (also on a first visit). */
export const useWeekUnseen = () => useSyncExternalStore(subscribe, read, () => false)

/** The page is open: this refresh counts as seen. */
export function markWeekSeen() {
  if (stored() === thisWeek.updated) return
  memory = thisWeek.updated
  try {
    localStorage.setItem(KEY, thisWeek.updated)
  } catch {
    /* private mode: seen for this page view only */
  }
  listeners.forEach((fn) => fn())
}
