// The visit pet: how many different days this browser has opened the site, how long since the last
// time, and whether today's snack was eaten. Kept only in localStorage, like newPosts.ts and
// lastRead.ts. One count per calendar day (local time), so reloading or opening ten pages in one
// sitting does not hatch the egg faster. Counted once per page load (module cache), on the client
// only: the server and the first client render show an empty strip of the same height.
const KEY = 'visit-pet'

type Stored = { days: number; last: string; fed: string }
export type Visit = {
  /** Visit days so far, counting today. */
  days: number
  /** Calendar days between the previous visit day and today; 0 on the first visit and on later loads today. */
  away: number
  /** Today's snack already eaten. */
  fedToday: boolean
}

let counted: Visit | null = null

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number)
  const [by, bm, bd] = b.split('-').map(Number)
  if (![ay, am, ad, by, bm, bd].every(Number.isFinite)) return 0
  return Math.round((new Date(by, bm - 1, bd).getTime() - new Date(ay, am - 1, ad).getTime()) / 86400000)
}

function read(): Stored {
  let s: Stored = { days: 0, last: '', fed: '' }
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) s = { ...s, ...JSON.parse(raw) }
  } catch {
    /* blocked or broken storage: start fresh, remembered for this page load only */
  }
  return s
}

function write(s: Stored) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* private mode */
  }
}

/** Today's visit. Safe to call on every page; only the first call of a day adds one. */
export function countVisit(): Visit {
  if (counted) return counted
  let s = read()
  const t = dayKey(new Date())
  let away = 0
  if (s.last !== t) {
    away = s.last ? daysBetween(s.last, t) : 0
    s = { days: (Number(s.days) || 0) + 1, last: t, fed: s.fed || '' }
    write(s)
  }
  counted = { days: s.days, away, fedToday: s.fed === t }
  return counted
}

/** Already counted on this page load (later page changes in the app), else null. */
export function countedVisit(): Visit | null {
  return counted
}

/** The creature ate today's snack. */
export function markFed() {
  const s = read()
  write({ ...s, fed: dayKey(new Date()) })
  if (counted) counted = { ...counted, fedToday: true }
}

export const HATCH_DAY = 5
/** From this visit day the baby is grown up. */
export const GROWN_DAY = 40
/** Away this many days or more: the creature is asleep when the visitor comes back. */
export const SLEEPY_AFTER = 3
/** Away this many days or more: the baby is sad (it missed you) until tapped. */
export const SAD_AFTER = 7
/** Away this many days or more: the baby is crying until tapped. */
export const CRY_AFTER = 14
/** On this visit day a second egg appears beside the grown-up; it follows the same timeline from day 1. */
export const FAMILY_DAY = 100
/** Every this many visit days: a birthday, cake all day. */
export const BIRTHDAY_EVERY = 365
