import { useEffect, useState } from 'react'

// "Your saju for today", a small for-fun box in the saju café blog post.
// Real saju rules, kept simple: the day pillar of a date comes from the 60-day cycle (2000-01-01 was 무오,
// index 54; 1949-10-01 was 갑자, which agrees). The heavenly stem of the birth day is the "day master";
// today's stem, compared with it by the five elements and yin/yang, gives one of the ten relations
// (십성) a reader uses. Lucky colour and numbers belong to the element that feeds the day master.
// The birthday stays in this browser only (localStorage), so a returning reader sees the new day at once.

const STEMS = [
  ['갑', 'gap'], ['을', 'eul'], ['병', 'byeong'], ['정', 'jeong'], ['무', 'mu'],
  ['기', 'gi'], ['경', 'gyeong'], ['신', 'sin'], ['임', 'im'], ['계', 'gye'],
]
const BRANCHES = [
  ['자', 'ja', 'rat'], ['축', 'chuk', 'ox'], ['인', 'in', 'tiger'], ['묘', 'myo', 'rabbit'],
  ['진', 'jin', 'dragon'], ['사', 'sa', 'snake'], ['오', 'o', 'horse'], ['미', 'mi', 'sheep'],
  ['신', 'sin', 'monkey'], ['유', 'yu', 'rooster'], ['술', 'sul', 'dog'], ['해', 'hae', 'pig'],
]
// Elements in the order of the producing cycle: wood feeds fire, fire feeds earth, earth feeds metal,
// metal feeds water, water feeds wood. Stem n belongs to element floor(n / 2).
const ELEMENTS = [
  { en: 'wood', ko: '목', ro: 'mok', colour: 'green', numbers: '3 and 8', who: 'Wood people grow toward the light: curious, kind and a little stubborn.' },
  { en: 'fire', ko: '화', ro: 'hwa', colour: 'red', numbers: '2 and 7', who: 'Fire people warm up a room: open, quick and easy to read.' },
  { en: 'earth', ko: '토', ro: 'to', colour: 'yellow', numbers: '5 and 10', who: 'Earth people hold everyone together: calm, loyal, the friend who remembers birthdays.' },
  { en: 'metal', ko: '금', ro: 'geum', colour: 'white', numbers: '4 and 9', who: 'Metal people are clear and sharp: they say what they think and keep their word.' },
  { en: 'water', ko: '수', ro: 'su', colour: 'black or navy', numbers: '1 and 6', who: 'Water people flow around things: clever, adaptable and deeper than they look.' },
]
// The ten relations, by (today's element − day master's element) mod 5 and same/different yin-yang.
const STARS: Record<string, { ko: string; ro: string; name: string; text: string }> = {
  '0same': { ko: '비견', ro: 'bigyeon', name: 'the friend star', text: 'A day for your people. Say yes to the plan someone else makes; you will laugh more than you expect.' },
  '0diff': { ko: '겁재', ro: 'geopjae', name: 'the rival star', text: 'Someone may talk you into a second dessert or one more shop. Let them, but keep an eye on your wallet.' },
  '1same': { ko: '식신', ro: 'siksin', name: 'the food star', text: 'A good day to eat well. Order the thing on the menu you cannot pronounce.' },
  '1diff': { ko: '상관', ro: 'sanggwan', name: 'the voice star', text: 'Your words land today. Send the message, post the photo, say what you really think (kindly).' },
  '2same': { ko: '편재', ro: 'pyeonjae', name: 'the lucky-money star', text: 'Small luck with money: a sale you did not plan, an extra in the bag, a good find in a side street.' },
  '2diff': { ko: '정재', ro: 'jeongjae', name: 'the steady-money star', text: 'A sensible day. Good for the shopping you planned, not the shopping you did not.' },
  '3same': { ko: '편관', ro: 'pyeongwan', name: 'the storm star', text: 'A busy, bumpy day. Keep your plans light, your shoes comfortable and your temper cool.' },
  '3diff': { ko: '정관', ro: 'jeonggwan', name: 'the partner star', text: 'In old saju this is the star of a partner. Someone is noticing you, so wear something you love.' },
  '4same': { ko: '편인', ro: 'pyeonin', name: 'the odd-idea star', text: 'A day for something strange and new: a lane you have never walked, a café with no sign.' },
  '4diff': { ko: '정인', ro: 'jeongin', name: 'the care star', text: 'Someone looks after you today. Take the help, have the tea, and rest when you can.' },
}

const DAY = 86_400_000
const BASE = Date.UTC(2000, 0, 1) // 무오 day, index 54 in the 60-day cycle

function pillarIndex(y: number, m: number, d: number) {
  const days = Math.round((Date.UTC(y, m - 1, d) - BASE) / DAY)
  return (((54 + days) % 60) + 60) % 60
}

function pillar(i: number) {
  const s = STEMS[i % 10]
  const b = BRANCHES[i % 12]
  return { stem: i % 10, ko: s[0] + b[0], ro: s[1] + '-' + b[1], animal: b[2] }
}

const KEY = 'saju-birthday'

export default function SajuToday() {
  const [birthday, setBirthday] = useState('')
  const [shown, setShown] = useState('')
  const [today, setToday] = useState<Date | null>(null)

  // After hydration only: the prerendered page has no "today" and no stored birthday.
  useEffect(() => {
    setToday(new Date())
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) {
        setBirthday(saved)
        setShown(saved)
      }
    } catch {
      /* private window: the box still works, it just forgets */
    }
  }, [])

  function read() {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) return
    setShown(birthday)
    try {
      localStorage.setItem(KEY, birthday)
    } catch {
      /* ignore */
    }
  }

  let result = null
  if (shown && today) {
    const [y, m, d] = shown.split('-').map(Number)
    const me = pillar(pillarIndex(y, m, d))
    const now = pillar(pillarIndex(today.getFullYear(), today.getMonth() + 1, today.getDate()))
    const myEl = Math.floor(me.stem / 2)
    const nowEl = Math.floor(now.stem / 2)
    const star = STARS[`${(nowEl - myEl + 5) % 5}${me.stem % 2 === now.stem % 2 ? 'same' : 'diff'}`]
    const el = ELEMENTS[myEl]
    const feeder = ELEMENTS[(myEl + 4) % 5]
    result = (
      <div className="saju-result" aria-live="polite">
        <p>
          You were born on a <b>{me.ko} ({me.ro})</b> day, the {me.animal}. Your day master is{' '}
          <b>
            {el.en}, {el.ko} ({el.ro})
          </b>
          . {el.who}
        </p>
        <p>
          Today is a <b>{now.ko} ({now.ro})</b> day, a {ELEMENTS[nowEl].en} day. Your star:{' '}
          <b>
            {star.ko} ({star.ro})
          </b>
          , {star.name}.
        </p>
        <p className="saju-star">{star.text}</p>
        <p className="saju-lucky">
          Lucky colour: <b>{feeder.colour}</b> · Lucky numbers: <b>{feeder.numbers}</b>
        </p>
      </div>
    )
  }

  return (
    <section className="saju-box">
      <h3>
        <img className="h-emoji" src={`${import.meta.env.BASE_URL}emoji/crystal_ball.png`} alt="" width="26" height="26" />
        Your saju for today
      </h3>
      <p className="saju-hint">Enter your birthday. It stays on your phone, and the reading changes every day.</p>
      <form
        className="saju-form"
        onSubmit={(e) => {
          e.preventDefault()
          read()
        }}
      >
        <input
          type="date"
          aria-label="Your birthday"
          value={birthday}
          min="1920-01-01"
          max="2025-12-31"
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button type="submit" disabled={!birthday}>
          Read my day
        </button>
      </form>
      {result}
      <p className="saju-note">Just for fun. A real reader also uses your birth year, month and hour.</p>
    </section>
  )
}
