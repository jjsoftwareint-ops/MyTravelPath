// The visit pet: how many different days this browser has opened the site, how long since the last
// time, and how many presents (snacks and toys) it has had. Kept only in localStorage, like newPosts.ts and
// lastRead.ts. One count per calendar day (local time), so reloading or opening ten pages in one
// sitting does not hatch the egg faster. Counted once per page load (module cache), on the client
// only: the server and the first client render show an empty strip of the same height.
const KEY = 'visit-pet'

type Stored = {
  days: number
  last: string
  fed: string
  gifts?: number
  snacks?: number
  snackDay?: string
  snacksToday?: number
  /** Visit days in a row, counting today. */
  streak?: number
  /** The day the streak party popper was opened. */
  partyDay?: string
  /** Path pages and blog posts already opened (newest last), for the exploring reward. */
  seen?: string[]
}
export type Visit = {
  /** Visit days so far, counting today. */
  days: number
  /** Calendar days between the previous visit day and today; 0 on the first visit and on later loads today. */
  away: number
  /** Today's snack already eaten. */
  fedToday: boolean
  /** Visit days in a row, counting today. */
  streak?: number
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
    const streak = away === 1 ? (Number(s.streak) || 1) + 1 : 1
    s = { ...s, days: (Number(s.days) || 0) + 1, last: t, fed: s.fed || '', streak }
    write(s)
  }
  counted = { days: s.days, away, fedToday: s.fed === t, streak: Number(s.streak) || 1 }
  return counted
}

/** Already counted on this page load (later page changes in the app), else null. */
export function countedVisit(): Visit | null {
  return counted
}

/** Snacks a day (user, 2026-11-18: "let's give twice snack at least. we can have many toys"). */
export const SNACKS_PER_DAY = 2
/** Every this many visit days in a row: a party popper (rewards coming back; user, 2026-11-18: reward ideas). */
export const STREAK_PARTY = 7
export type Kind = 'toy' | 'snack' | 'party'
export type Presents = { toy: number; snack: number | null; party: boolean }
let presentsNow: Presents | null = null
const usedNow = { toy: false, snack: false, party: false }

/** This page load's presents: a new toy each time the site is opened (the same one while the visitor moves
 * between pages in the app), and a snack until two have been eaten today. Numbers pick the item in turn. */
export function presents(): Presents {
  if (presentsNow) return presentsNow
  const s = read()
  const t = dayKey(new Date())
  const toy = Number(s.gifts) || 0
  write({ ...s, gifts: toy + 1 })
  const eaten = s.snackDay === t ? Number(s.snacksToday) || 0 : 0
  const streak = counted?.streak ?? 1
  presentsNow = { toy, snack: eaten < SNACKS_PER_DAY ? Number(s.snacks) || 0 : null, party: streak % STREAK_PARTY === 0 && s.partyDay !== t }
  return presentsNow
}

/** The exploring reward: a path page or blog post opened for the first time brings a fresh toy (user, 2026-11-18:
 * reward ideas). Returns true when the page is new. Remembers the last 400 pages. */
export function rewardNewPage(page: string): boolean {
  const s = read()
  const seen = Array.isArray(s.seen) ? s.seen : []
  if (seen.includes(page)) return false
  const toy = Number(s.gifts) || 0
  write({ ...s, seen: [...seen, page].slice(-400), gifts: toy + 1 })
  if (presentsNow) presentsNow = { ...presentsNow, toy }
  usedNow.toy = false
  return true
}

/** This page load's toy, snack or party popper was already played with or eaten. */
export function wasUsed(kind: Kind): boolean {
  return usedNow[kind]
}

/** The creature played with the toy, ate the snack or opened the party popper. */
export function markUsed(kind: Kind) {
  usedNow[kind] = true
  const s = read()
  const t = dayKey(new Date())
  if (kind === 'party') write({ ...s, partyDay: t })
  if (kind !== 'snack') return
  const eaten = s.snackDay === t ? Number(s.snacksToday) || 0 : 0
  write({ ...s, fed: t, snackDay: t, snacksToday: eaten + 1, snacks: (Number(s.snacks) || 0) + 1 })
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
