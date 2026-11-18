import { useEffect, useRef, useState } from 'react'
import {
  countVisit, countedVisit, presents, wasUsed, markUsed, rewardNewPage, type Kind, HATCH_DAY, GROWN_DAY, SLEEPY_AFTER, SAD_AFTER, CRY_AFTER, FAMILY_DAY, BIRTHDAY_EVERY, type Visit,
} from '../pet'

// A tiny strip under the header on every page: an egg on a strip of grass. The egg shakes gently and
// grows on each day the visitor comes back and hatches on day 5. Days 6 to 39 a baby lives there, from
// day 40 the grown-up creature, each with its own motions: one per visit day (walking, swinging, chasing
// a butterfly, peekaboo, a balloon, dancing, riding a leaf, reading, singing ...), in order the first time
// round and in a daily shuffle after that. Like a pocket pet: one present on the ground at a time (user, 2026-11-18:
// "not only candy", "give twice snack at least. we can have many toys", "not two at the same time"): a snack while
// fewer than two were eaten today, and once it is eaten (or after the second one) a new toy each time the site opens.
// Rewards: a path page or blog post opened for the first time brings a fresh toy (exploring), and every 7th visit
// day in a row a party popper comes first (tap it and the creature cheers); the baby stands thinking about it; tap it and the creature runs
// over and eats it or plays with it in the matching pose (balloon, flower, book, crown ...); after 3 days away it is asleep until
// tapped, the baby is sad after a week and crying after two; a tap gives a random happy reaction and a
// heart, five quick taps make the baby cross for a second.
// Life events: on day 100 a second egg appears beside the grown-up and lives the same story (hatch, baby,
// grown), so from then two creatures share the grass; every 365th day is a birthday with cake all day.
// No text (user, 2026-11-13); the state is in the aria-label only.
// Pictures: the user's own artwork (ChatGPT, 2026-11-13), cut from four sheets with the user's OK into
// assets/pet/ (originals in docs/pet/, local only). Butterfly, heart, zzz and the food and toy icons on the ground:
// Noto Emoji by Google, Apache 2.0 (assets/pet/LICENSE.txt). Every picture fits the same small box.
// Preview: ?pet=N (a visit day; add &away=4, &fed=0 or &streak=7), or ?pet=sim to watch the whole story on a loop.

const pic = (name: string) => `${import.meta.env.BASE_URL}pet/${name}.png`

// walk/hop/glide cross the strip and turn at the ends; the others stay put and move in place.
type Anim = 'walk' | 'hop' | 'glide' | 'swing' | 'bob' | 'wiggle' | 'spin' | 'peek' | 'float'
type Mood = { pic: string; anim: Anim; butterfly?: boolean }
/** Today's present on the ground: the icon file and the creature picture shown while it eats or plays with it. */
export type Gift = { icon: string; pic: string; toy: boolean; kind: Kind }
type Stage = {
  name: 'baby' | 'grown'
  moods: Mood[]
  snacks: string[]
  toys: { icon: string; pic: string }[] // toy icon on the ground → the pose that plays with it
  party: string // the pose for the streak party popper
  taps: string[] // happy reactions to a tap, one picked at random
  sleeps: string[] // sleeping poses, by day
  sad?: string
  crying?: string
  thinking?: string // shown while a snack is waiting
  angry?: string // five quick taps
}
const BABY: Stage = {
  name: 'baby',
  moods: [
    { pic: 'walk', anim: 'walk' },
    { pic: 'swing', anim: 'swing' },
    { pic: 'chase', anim: 'walk', butterfly: true },
    { pic: 'peekaboo', anim: 'bob' },
    { pic: 'jump', anim: 'hop' },
    { pic: 'pillar', anim: 'peek' },
    { pic: 'balloon', anim: 'float' },
    { pic: 'dance', anim: 'wiggle' },
    { pic: 'leaf', anim: 'glide' },
    { pic: 'bubble', anim: 'spin' }, // floating inside its bubble, turning slowly
    { pic: 'chick', anim: 'bob' },
    { pic: 'run', anim: 'walk' },
    { pic: 'flower', anim: 'bob' },
    { pic: 'splash', anim: 'bob' },
    { pic: 'book', anim: 'bob' },
    { pic: 'skip', anim: 'hop' },
    { pic: 'umbrella', anim: 'bob' },
    { pic: 'singing', anim: 'wiggle' },
    { pic: 'swing2', anim: 'swing' },
    { pic: 'sunglasses', anim: 'bob' },
    { pic: 'heart', anim: 'bob' },
    { pic: 'lookup', anim: 'bob' },
    { pic: 'crown', anim: 'bob' },
    { pic: 'stretch', anim: 'bob' },
    { pic: 'raincoat', anim: 'bob' },
    { pic: 'blowbubble', anim: 'bob' },
    { pic: 'leafsit', anim: 'glide' },
    { pic: 'watch', anim: 'bob' },
    { pic: 'hug', anim: 'bob' },
    { pic: 'lying', anim: 'bob' },
    { pic: 'swing3', anim: 'swing' },
    { pic: 'shell', anim: 'bob' },
    { pic: 'blanket', anim: 'bob' },
    { pic: 'yawn', anim: 'bob' },
  ],
  snacks: ['cookie', 'strawberry', 'icecream', 'milk', 'popcorn', 'watermelon', 'bubbletea', 'potato'],
  toys: [
    { icon: 'balloon', pic: 'balloon' },
    { icon: 'tulip', pic: 'flower' },
    { icon: 'book', pic: 'book' },
    { icon: 'bubbles', pic: 'blowbubble' },
    { icon: 'crown', pic: 'crown' },
    { icon: 'sunglasses', pic: 'sunglasses' },
    { icon: 'umbrella', pic: 'umbrella' },
    { icon: 'chick', pic: 'chick' },
    { icon: 'shell', pic: 'shell' },
  ],
  party: 'cheer',
  taps: ['claps', 'surprised', 'wink', 'shocked', 'embarrassed', 'happy', 'cheer', 'confused'],
  sleeps: ['sleep', 'sleep2', 'sleep3'],
  sad: 'sad',
  crying: 'crying',
  thinking: 'thinking',
  angry: 'angry',
}
const GROWN: Stage = {
  name: 'grown',
  moods: [
    { pic: 'run', anim: 'walk' },
    { pic: 'swing', anim: 'swing' },
    { pic: 'chase', anim: 'walk', butterfly: true },
    { pic: 'hug', anim: 'bob' },
    { pic: 'jump', anim: 'hop' },
    { pic: 'peek', anim: 'peek' },
    { pic: 'puddle', anim: 'bob' },
    { pic: 'laugh', anim: 'wiggle' },
    { pic: 'rock', anim: 'bob' },
    { pic: 'bubble', anim: 'float' },
    { pic: 'wave', anim: 'bob' },
    { pic: 'leafhat', anim: 'bob' },
    { pic: 'swing2', anim: 'swing' },
    { pic: 'grass', anim: 'bob' },
    { pic: 'jumplaugh', anim: 'hop' },
    { pic: 'sparkle', anim: 'bob' },
    { pic: 'leaf', anim: 'bob' },
    { pic: 'splash', anim: 'bob' },
    { pic: 'snail', anim: 'bob' },
    { pic: 'lookup', anim: 'bob' },
    { pic: 'shell', anim: 'bob' },
    { pic: 'flowers', anim: 'bob' },
    { pic: 'happy', anim: 'bob' },
  ],
  snacks: ['cookie', 'apple', 'popcorn', 'donut', 'icecream', 'cake', 'lollipop', 'bubbletea'],
  toys: [
    { icon: 'bouquet', pic: 'flowers' },
    { icon: 'fallenleaf', pic: 'leafhat' },
    { icon: 'shell', pic: 'shell' },
    { icon: 'snail', pic: 'snail' },
    { icon: 'bubbles', pic: 'bubble' },
    { icon: 'rock', pic: 'rock' },
    { icon: 'sparkles', pic: 'sparkle' },
  ],
  party: 'jumplaugh',
  taps: ['jump', 'happy', 'wave', 'jumplaugh'],
  sleeps: ['sleep', 'sleep2', 'sleep3', 'sleep4'],
}
const WALKING: Anim[] = ['walk', 'hop', 'glide']
const TALL = ['swing', 'swing2', 'swing3'] // pictures with ropes get a taller box

// A fixed shuffle for a given day, so the second time round the order no longer repeats.
const daily = (day: number, len: number) => Math.floor(((day * 2654435761) % 4294967296) / 4294967296 * len) % len

// The simulation: one visit after another, a few seconds each, with the visitor's taps played for them.
type Step = { days: number; away?: number; fed?: boolean; auto?: 'eat' | 'wake' | 'tap'; hold: number }
const SIM: Step[] = [
  { days: 1, hold: 3000 },
  { days: 2, hold: 2500 },
  { days: 3, hold: 2500 },
  { days: 4, hold: 3000 },
  { days: 5, hold: 3000 },
  { days: 6, hold: 4500 },
  { days: 7, hold: 4000 },
  { days: 8, fed: false, auto: 'eat', hold: 7000 },
  { days: 9, fed: false, auto: 'eat', hold: 7000 },
  { days: 10, away: 4, auto: 'wake', hold: 6000 },
  { days: 11, auto: 'tap', hold: 4000 },
  { days: 12, hold: 4000 },
  { days: 15, away: 9, auto: 'wake', hold: 6000 },
  { days: 18, hold: 4000 },
  { days: 24, away: 16, auto: 'wake', hold: 6000 },
  { days: 30, auto: 'tap', hold: 4000 },
  { days: 40, hold: 4500 },
  { days: 42, fed: false, auto: 'eat', hold: 7000 },
  { days: 45, auto: 'tap', hold: 4000 },
  { days: 100, hold: 5000 },
  { days: 103, hold: 4000 },
  { days: 105, hold: 4000 },
  { days: 108, hold: 5000 },
  { days: 112, auto: 'tap', hold: 5000 },
  { days: 150, hold: 5000 },
  { days: 365, auto: 'tap', hold: 6000 },
]

type Cmd = { n: number; type: 'eat' | 'wake' | 'tap' } | null

/** One creature: its own age in visit days (the second one starts at 1 on day 100), position slot 0 or 1. */
function Creature({
  age, slot, away, birthday, gifts, onEaten, cmd,
}: {
  age: number
  slot: 0 | 1
  away: number
  birthday: boolean
  /** The presents on the ground (snack and/or toy), if this creature is the one that gets them. */
  gifts: Gift[]
  onEaten: (g: Gift) => void
  /** A played-for-you action from the simulation (slot 0 only). */
  cmd: Cmd
}) {
  const baby = age < GROWN_DAY
  const [rest, setRest] = useState<'asleep' | 'sad' | 'crying' | null>(null)
  const [eating, setEating] = useState<'run' | 'munch' | 'play' | null>(null)
  const [current, setCurrent] = useState<Gift | null>(null)
  const [reaction, setReaction] = useState<string | null>(null)
  const [heart, setHeart] = useState(false)
  const walker = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const taps = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  // A new day (or a simulation step): forget the moment and work out the resting state afresh.
  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setRest(baby && away >= CRY_AFTER ? 'crying' : baby && away >= SAD_AFTER ? 'sad' : away >= SLEEPY_AFTER ? 'asleep' : null)
    setEating(null)
    setReaction(null)
    setHeart(false)
    if (walker.current) walker.current.style.left = ''
  }, [age, away, baby])

  const stage = baby ? BABY : GROWN
  const showHeart = () => {
    setHeart(true)
    later(() => setHeart(false), 1200)
  }
  const play = () => {
    const now = Date.now()
    taps.current = [...taps.current.filter((t) => now - t < 3000), now]
    const cross = stage.angry && taps.current.length >= 5
    if (cross) taps.current = []
    setReaction(cross ? stage.angry! : stage.taps[Math.floor(Math.random() * stage.taps.length)])
    if (!cross) showHeart()
    later(() => setReaction(null), cross ? 1400 : 900)
  }
  const wake = () => {
    setRest(null)
    play()
  }
  const eat = (gift: Gift | undefined) => {
    if (!gift || eating) return
    setCurrent(gift)
    const el = walker.current
    // Freeze where the walk left it, then run over to the present, then munch or play.
    if (el) el.style.left = getComputedStyle(el).left
    setEating('run')
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (walker.current) walker.current.style.left = 'calc(100% - 50px)'
      }),
    )
    later(() => {
      setEating(gift.toy ? 'play' : 'munch')
      onEaten(gift)
    }, 1300)
    later(showHeart, 2600)
    later(() => {
      setEating(null)
      setCurrent(null)
      if (walker.current) walker.current.style.left = ''
    }, 4200)
  }
  useEffect(() => {
    if (!cmd || slot !== 0) return
    if (cmd.type === 'eat') eat(gifts[0])
    else if (cmd.type === 'wake') wake()
    else play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmd])

  const heartImg = heart && <img className="pet-heart" src={pic('heart')} alt="" width={14} height={14} />

  if (age <= HATCH_DAY) {
    // Egg days 1-4 grow from 70% to 100% and shake a little harder each day; day 5 hatches in place.
    const grow = age < HATCH_DAY ? 0.7 + (age - 1) * 0.1 : 1
    return (
      <button type="button" className={`pet-egg slot-${slot} shake-${age}${reaction ? ' poke' : ''}`} style={{ ['--s' as string]: grow }} onClick={play} aria-label="Tap">
        {heartImg}
        <img className="pet-pic" src={pic(age < HATCH_DAY ? 'creature-1' : 'creature-2')} alt="" />
      </button>
    )
  }

  const dayIndex = age - (baby ? HATCH_DAY + 1 : GROWN_DAY) + slot * 7
  const mood = stage.moods[dayIndex < stage.moods.length ? dayIndex : daily(age + slot, stage.moods.length)]
  const sleepPic = stage.sleeps[age % stage.sleeps.length]
  // Which picture right now, and how it moves.
  const shown =
    rest === 'crying' ? stage.crying!
    : rest === 'sad' ? stage.sad!
    : rest === 'asleep' ? sleepPic
    : eating === 'run' ? 'run'
    : (eating === 'munch' || eating === 'play') && current ? current.pic
    : reaction ? reaction
    : birthday && !baby ? 'eat-cake'
    : gifts.length && stage.thinking ? stage.thinking
    : mood.pic
  // The mood is on unless something else is going on. A tap keeps the mood's place and walk: the walk
  // is only paused for the reaction, so the creature jumps where it is instead of being moved
  // (user, 2026-11-18).
  const onMood = !rest && !eating && !(birthday && !baby) && !(gifts.length && stage.thinking)
  const walking = onMood && WALKING.includes(mood.anim)
  const paused = walking && !!reaction
  const cls = [
    'pet-walker', `slot-${slot}`, onMood ? `anim-${mood.anim}` : '', walking ? 'walking' : 'still', paused ? 'paused' : '',
    rest ? 'resting' : '', eating ? `eating-${eating}` : '', !onMood && !rest && !eating ? 'anim-bob' : '',
  ].filter(Boolean).join(' ')
  return (
    <>
      {rest === 'asleep' && <img className={`pet-zzz slot-${slot}`} src={pic('zzz')} alt="" width={13} height={13} />}
      {!rest &&
        gifts.map((g) => (
          <button key={g.icon} type="button" className="pet-snack" onClick={() => eat(g)} aria-label={g.toy ? 'Give the toy' : 'Give the snack'}>
            <img src={pic(g.icon)} alt="" width={18} height={18} />
          </button>
        ))}
      {walking && mood.butterfly && slot === 0 && (
        <img className={`pet-butterfly${paused ? ' paused' : ''}`} src={pic('butterfly')} alt="" width={14} height={14} />
      )}
      <div ref={walker} className={cls}>
        <button type="button" className={`pet-creature${reaction ? ' poke' : ''}`} onClick={rest ? wake : play} aria-label="Tap">
          {heartImg}
          <img className={`pet-pic${TALL.includes(shown) ? ' tall' : ''}`} src={pic(`${stage.name}-${shown}`)} alt="" />
        </button>
      </div>
    </>
  )
}

export default function VisitPet() {
  // Same empty strip on the server and in the first client render; the visit fills in after mount.
  const [visit, setVisit] = useState<Visit | null>(() => countedVisit())
  const [sim, setSim] = useState<number | null>(null)
  const [toyN, setToyN] = useState(0)
  const [snackN, setSnackN] = useState<number | null>(null)
  const [used, setUsed] = useState({ toy: true, snack: true, party: true })
  const [cmd, setCmd] = useState<Cmd>(null)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const p = q.get('pet')
    if (p === 'sim') {
      setSim(0)
      return
    }
    let v = countVisit()
    presents()
    // Every page mounts its own strip, so a first look at a path page or blog post is caught here.
    const page = window.location.pathname.replace(/\/+$/, '')
    if (/^\/blog\/[^/]+$/.test(page) || (/^\/[^/]+\/[^/]+$/.test(page) && !page.startsWith('/blog/'))) rewardNewPage(page)
    const pr = presents()
    if (p && /^\d{1,4}$/.test(p)) {
      v = { days: Number(p), away: Number(q.get('away') ?? 0), fedToday: q.get('fed') !== '0', streak: Number(q.get('streak') ?? 1) }
      setToyN(v.days)
      setSnackN(v.days)
      setUsed({ toy: v.fedToday, snack: v.fedToday, party: (v.streak ?? 1) % 7 !== 0 })
    } else {
      setToyN(pr.toy)
      setSnackN(pr.snack)
      setUsed({ toy: wasUsed('toy'), snack: wasUsed('snack'), party: !pr.party || wasUsed('party') })
    }
    setVisit(v)
  }, [])

  useEffect(() => {
    if (sim === null) return
    const st = SIM[sim]
    setVisit({ days: st.days, away: st.away ?? 0, fedToday: st.fed ?? true })
    setUsed({ toy: st.fed ?? true, snack: st.fed ?? true, party: true })
    setToyN(st.days)
    setSnackN(st.days)
    setCmd(null)
    const t1 = window.setTimeout(() => st.auto && setCmd({ n: sim, type: st.auto }), 2000)
    const t2 = window.setTimeout(() => setSim((sim + 1) % SIM.length), st.hold)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [sim])

  if (!visit) return <div className="pet" aria-hidden="true" />
  const { days, away } = visit
  const first = days
  const second = days >= FAMILY_DAY ? days - FAMILY_DAY + 1 : null
  const birthday = days > 0 && days % BIRTHDAY_EVERY === 0
  const stage = days < GROWN_DAY ? BABY : GROWN
  // After hatching, one present at a time: the streak party popper, the snack (until two are eaten today), then
  // this opening's toy.
  const gifts: Gift[] = []
  if (days > HATCH_DAY && !birthday) {
    if (!used.party) gifts.push({ icon: 'toy-party', pic: stage.party, toy: true, kind: 'party' })
    if (!used.snack && snackN !== null) {
      const food = stage.snacks[snackN % stage.snacks.length]
      gifts.push({ icon: `food-${food}`, pic: `eat-${food}`, toy: false, kind: 'snack' })
    }
    if (!used.toy) {
      const toy = stage.toys[toyN % stage.toys.length]
      gifts.push({ icon: `toy-${toy.icon}`, pic: toy.pic, toy: true, kind: 'toy' })
    }
  }
  const onEaten = (g: Gift) => {
    setUsed((u) => ({ ...u, [g.kind]: true }))
    if (sim === null) markUsed(g.kind)
  }
  const label =
    days < HATCH_DAY ? `An egg, visit ${days} of ${HATCH_DAY}.`
    : birthday ? 'Birthday today: cake!'
    : away >= SLEEPY_AFTER ? 'Your creature is resting. Tap it.'
    : gifts.length ? 'A present is waiting. Tap it.'
    : second ? `Your two creatures, visit ${days}.`
    : `Your little creature, visit ${days}.`
  return (
    <div className="pet" role="img" aria-label={label}>
      <Creature age={first} slot={0} away={away} birthday={birthday} gifts={gifts.slice(0, 1)} onEaten={onEaten} cmd={cmd} />
      {second !== null && <Creature age={second} slot={1} away={away} birthday={birthday} gifts={[]} onEaten={onEaten} cmd={null} />}
    </div>
  )
}
