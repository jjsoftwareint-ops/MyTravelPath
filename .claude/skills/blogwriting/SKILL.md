---
name: blogwriting
description: How to write the "About this walk" guide text for a path in MyTravelPath — the friendly blog voice, the intro/route/tips structure, emoji and **highlight** markup, hashtags/keywords for search, and the fact rules (only what the kmz pins and the user's notes support). Use when the user asks for a description, guide, blog text, hashtags or SEO text for a path, or says a path page needs more words.
---

# Blog writing for path pages

Each path in `src/data/travel.ts` can carry a `guide` (shown as the "✨ About this walk" card on the
detail page) and `keywords` (shown as hashtag pills under it and written into the page's meta tags).
This skill is the house style for that text. Standing preferences (2026-10-20): the user wants it to
read **like a friendly blog**, emoji and coloured words are welcome, and every path needs hashtags.

## 1. Where the text lives

```ts
{
  id: 'china-town',
  ...
  keywords: ['Incheon', 'Chinatown', 'Jajangmyeon', 'DayTripFromSeoul', 'KoreaTravel'],
  guide: {
    intro: ['🥟 Incheon China Town is the **easiest day trip out of Seoul**, and one of the tastiest. …', '…'],
    route: ['Incheon Station to the 1st Paeru gate: …', '…'],
    tips:  ['🚇 Getting there: Line 1 or the Suin-Bundang line to Incheon Station, …', '…'],
  },
}
```

- `intro`: 1–2 short paragraphs. `route`: the stages in walking order, one line each (rendered as a
  numbered list). `tips`: practical notes (bulleted). All three are plain strings with the markup below.
- Rendering: [PathDetail.tsx](../../../src/pages/PathDetail.tsx) → `RichText` component. Headings are
  fixed: "✨ About this walk", "🚶 The route", "💡 Good to know".
- `keywords` also feed `usePageMeta` ([src/seo.ts](../../../src/seo.ts)), which sets the per-route
  `<title>`, description and `meta keywords`.

## 1b. Important information above the map (`notices`)

Standing rule (2026-10-20): **anything the visitor must know before setting off, such as opening or visiting
hours, goes in a `notices` box above the Google Maps iframe**, not in the guide text. They render as
amber boxes between the description and the map:

```ts
notices: [
  {
    icon: '⏰',                       // one emoji: ⏰ hours · 🎟️ tickets/fees · 🚫 closure · 📅 booking · 🚧 works
    title: 'Bukchon Hanok Village visiting hours',
    body: 'The busiest lane, **Bukchon-ro 11-gil** …, is open to visitors **10:00–17:00** only. …',
    since: 'Jongno-gu special management area, enforced since March 2025. Checked October 2026.',
  },
],
```

Rules: one fact per box, two or three sentences, the number in `**bold**`. Verify against an official or
news source (Seoul city, the district office, a national paper) before adding; a single travel blog is not
enough — the unconfirmed "Bukchon closed on Sundays" claim (2026-10-20) was left out for that reason. Put
the verification date in `since` so it can be re-checked. Typical candidates: palace closing days, hiking
trail closures, festival road closures, museum fees, Cheong Wa Dae booking.

## 1c. The `updated` date

Every path has `updated: 'YYYY-MM-DD'`, shown as "Updated 20 Oct 2026" to the right of the pills under the
banner. Standing rule (2026-10-20): **bump it to today on every edit to that page**: guide text, a notice,
keywords, pins or the map link. Never leave it stale; never bump a page you did not touch.

## 2. Voice

Write as the person who walked it and is telling a friend. First person is fine ("my favourite corner of
Seoul after dark", "trust me on the order"), second person for instructions ("set off an hour before
sunset"). Warm, confident, specific. No marketing words (stunning, must-see, hidden gem, vibrant).

- **Intro paragraph 1**: why this walk, one line of history or geography, what you see. Start with one
  emoji that stands for the walk (🌙 night walk, 🌸 blossom, ⛰️ hike, 🥟 food town, 🌊 coast, 🥾 trail).
- **Intro paragraph 2**: the shape of the day — distance, time, when to start, what it ends with.
- **Route steps**: imperative or noun phrases, each with the landmark name as it appears on the map pin,
  so the reader can match text and pin. Distances and times only where the pins give them.
- **Tips**: start each with an emoji key: 🚇 getting there · 🍜 food · ⏰ timing/crowds · 👟 terrain/shoes ·
  💧 water · 🔦 torch · ✂️ shorter option · 🔗 another path on this site · 📍 anything else.
- Sentences short, about 20 words. One idea each. British spelling (travellers, colour, centre).

## 3. Markup

- `**words**` → accent-coloured bold. Use for 2–4 key terms per intro (place names, the killer fact,
  the one instruction people must not miss). Never whole sentences, never in route steps.
- Emoji: one at the start of intro paragraph 1 and one per tip. Occasionally one inside a sentence
  (☕, 🍜, 🌸) — at most one or two per guide. No emoji in route steps.
- Korean names: English first, Korean in brackets only if it helps on signs, e.g. "Beombawi (범바위)".

## 4. Facts: only what we can back

The guide must agree with the map. Sources, in order:

1. The path's kmz in `assets/maps/` (local only, never committed). Dump the pins:
   ```bash
   python3 -I .claude/skills/blogwriting/dump_kmz.py "assets/maps/<file>.kmz"
   ```
   Pin names, descriptions, distances, "checked on Naver as of <date>" lines are the primary source.
2. The spec JSON in `.claude/skills/googleCustomMap/examples/` for the same path.
3. Common knowledge that any Seoul local would confirm (subway lines and exits, last trains ≈ midnight,
   Busan blossom ≈ a week before Seoul). Keep these few and say them plainly.

Do **not** invent opening hours, prices, queue times or "best" claims that the pins do not support. If a
path has no kmz yet (Haeundae, 2026-10-20), say in the intro that the map is still being drawn and keep
the route to well-known landmarks. Restaurants: name only the ones pinned, and point to "the pink pins on
the map" instead of listing everything.

## 5. Hashtags / keywords

8–9 per path, CamelCase without spaces or `#` (the UI adds `#`):

1. The city (`Seoul`, `Busan`, `Jeju`, `Incheon`) first.
2. The theme (`NightWalk`, `CherryBlossom`, `SeoulHiking`, `DayTripFromSeoul`, `CoastalWalk`).
3. 4–5 landmark or food names people actually type into Google (`Cheonggyecheon`, `Jajangmyeon`,
   `StarfieldLibrary`, `Oedolgae`).
4. `KoreaTravel` last on every path.

Keep each term a real search phrase, no made-up compounds. Reuse exact spellings across paths so the
same tag appears on related walks (`SeoulCityWall` on Naksan, Inwangsan and Haebangchon).

## 6. Checklist before handing over

- [ ] `npm run build` passes; the page renders at 390 px and 1024 px (guide card beside the map on desktop).
- [ ] Every route step matches a pin name on the map.
- [ ] Intro has one leading emoji and 2–4 `**highlights**`; every tip has an emoji key.
- [ ] 8–9 keywords, city first, `KoreaTravel` last.
- [ ] Nothing is stated that the kmz, the spec JSON or common knowledge cannot back.
- [ ] Facts with a deadline (hours, closures, fees) are in `notices` above the map, verified, with a date in `since`.
- [ ] `updated` set to today on every path you touched.
- [ ] Not committed; the user pushes.

## 6b. Reddit and other forums: outlines, never paste-ready posts

Standing rule (2026-10-20, after the user's Reddit account was blocked): a forum post about a path must
carry the **whole content itself** (route, stops, times, food, pitfalls), with **at most one link at the
end** labelled as the user's own, and it must be **written by the user in their own words**: Reddit bans
fully AI-generated content. Before drafting anything, **fetch and read all the rules first**: Reddit's Content Policy, its spam and
self-promotion guidance, its AI-content rule, and the target sub's `/about/rules` page plus any pinned
moderator post, on the day. List the rules that apply and how the outline meets each; if the sub bans
self-promotion, say so and do not draft. Only then hand over a fact outline drawn from the kmz pins
and the guide text, not prose to paste. Full rules and outlines: [docs/reddit-posts.md](../../../docs/reddit-posts.md).

## 7. Known limitation: hash routes and Google

The site uses `HashRouter` (`/#/seoul/...`). Search engines index only the part before `#`, so today the
whole site is one URL to Google and per-path titles, descriptions and hashtags are seen by people and
link previews, not by the crawler. Making each path a real indexed page needs either pre-rendered HTML
per route at build time or a switch to path URLs with a redirect for old `#/` links. Raise this with the
user when SEO comes up; do not change the routing without being asked.
