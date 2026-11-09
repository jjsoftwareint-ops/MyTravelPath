import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// The browser never tells a page which URLs sit behind it in history, so we keep our own copy: for each
// position in this tab's history (React Router's history.state.idx) the path that was shown there. The back
// button uses it to step back past pages that are not a real parent (the blog list skips the posts that were
// opened from it and goes back to the path page or home page the reader came from).
// Per tab (sessionStorage), so it survives a reload but not a new tab.

const KEY = 'historyTrail'

type Trail = Record<number, string>

function read(): Trail {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}') as Trail
  } catch {
    return {}
  }
}

function write(trail: Trail) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(trail))
  } catch {
    // storage blocked: the back button falls back to its parent page
  }
}

export const currentIdx = () => {
  const idx = (window.history.state as { idx?: number } | null)?.idx
  return typeof idx === 'number' ? idx : 0
}

/** Mounted once in App: records the path at every history position, dropping the forward entries a new page replaces. */
export function HistoryTrail() {
  const { pathname } = useLocation()
  const type = useNavigationType()
  useEffect(() => {
    const idx = currentIdx()
    const trail = read()
    // A link click (PUSH), or a fresh page load, starts a new branch: everything after this position is gone.
    const nav = performance.getEntriesByType?.('navigation')[0] as PerformanceNavigationTiming | undefined
    const freshLoad = type === 'POP' && idx === 0 && nav?.type === 'navigate'
    if (type === 'PUSH' || freshLoad) for (const k of Object.keys(trail)) if (Number(k) > idx) delete trail[Number(k)]
    trail[idx] = pathname
    write(trail)
  }, [pathname, type])
  return null
}

/** How many steps to go back to reach the nearest earlier page that `skip` does not reject,
 *  or null when there is none in this tab's in-app history (or the trail has a gap). */
export function stepsBackSkipping(skip: (path: string) => boolean): number | null {
  const idx = currentIdx()
  const trail = read()
  for (let j = idx - 1; j >= 0; j--) {
    const path = trail[j]
    if (path === undefined) return null
    if (!skip(path)) return j - idx
  }
  return null
}
