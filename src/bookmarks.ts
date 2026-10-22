import { useSyncExternalStore } from 'react'

// Saved paths live only in this browser (localStorage), as "cityId/pathId" keys.
// Same store pattern as theme.ts: the server and the first client render see an empty list,
// so the pre-rendered HTML always matches.
const KEY = 'bookmarks'
const listeners = new Set<() => void>()
const NONE: string[] = []
let cache: string[] = NONE
let cacheRaw: string | null = null

function read(): string[] {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(KEY)
  } catch {
    return cache
  }
  if (raw === cacheRaw) return cache
  cacheRaw = raw
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : []
    cache = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : NONE
  } catch {
    cache = NONE
  }
  return cache
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

export const useBookmarks = () => useSyncExternalStore(subscribe, read, () => NONE)

export const bookmarkKey = (cityId: string, pathId: string) => `${cityId}/${pathId}`

export function toggleBookmark(key: string) {
  const list = read()
  const next = list.includes(key) ? list.filter((k) => k !== key) : [...list, key]
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* private mode: the list lasts for this page view only */
    cache = next
    cacheRaw = JSON.stringify(next)
  }
  listeners.forEach((fn) => fn())
}
