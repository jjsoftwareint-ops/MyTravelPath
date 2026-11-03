import { useSyncExternalStore } from 'react'
import { posts, type Post } from './data/blog'

// "New since your visit": the newest post id the visitor had when they last opened the blog
// list, kept only in this browser (localStorage). The first visit stores the current newest id
// (entry-client.tsx), so a first-time visitor never sees a badge. Same store pattern as
// lastRead.ts: nothing is "new" on the server and in the first client render.
const KEY = 'blog-seen'
const listeners = new Set<() => void>()
const NONE: Post[] = []
const newest = posts[0]?.id ?? ''
let memory: string | null = null
// What the visitor had seen when this page loaded. The "New" pills in the title list compare
// against this, so they stay while the list is open even though opening it marks everything seen.
let atLoad: string | null = null

function stored(): string | null {
  try {
    return localStorage.getItem(KEY) ?? memory
  } catch {
    return memory
  }
}

function write(id: string) {
  memory = id
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* private mode: remembered for this page view only */
  }
}

// Ids are mixed (date-time and slugs), so "newer" means "earlier in the newest-first list".
function newerThan(seen: string | null): Post[] {
  if (!seen) return NONE
  const i = posts.findIndex((p) => p.id === seen)
  if (i <= 0) return NONE // nothing newer, or the seen post is gone: show no badge
  return posts.slice(0, i)
}

let cacheSeen: string | null | undefined
let cache: Post[] = NONE
function read(): Post[] {
  const seen = stored()
  if (atLoad === null && seen) atLoad = seen
  if (seen !== cacheSeen) {
    cacheSeen = seen
    cache = newerThan(seen)
  }
  return cache
}

let cacheAtLoad: Post[] | null = null
function readAtLoad(): Post[] {
  if (cacheAtLoad) return cacheAtLoad
  const seen = stored()
  if (atLoad === null && seen) atLoad = seen
  cacheAtLoad = newerThan(atLoad)
  return cacheAtLoad
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

/** Posts published since the visitor last opened the blog list (live: empty once they open it). */
export const useNewPosts = () => useSyncExternalStore(subscribe, read, () => NONE)

/** The same list as it was when this page loaded, for the "New" pills in the title list. */
export const useNewPostsAtLoad = () => useSyncExternalStore(subscribe, readAtLoad, () => NONE)

/** First visit: remember the current newest post so only later posts count as new. */
export function initNewPosts() {
  if (!stored() && newest) write(newest)
}

/** The blog list is open: everything up to the newest post is seen now. */
export function markBlogSeen() {
  if (!newest || stored() === newest) return
  write(newest)
  listeners.forEach((fn) => fn())
}
