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

## 1a. A short history under the header image (`story`) and one-line histories in the route

User's request (2026-10-25, trialled on Busan Culture Villages and Hotspots: "short historical stories under the header
image rather than a whole explanation about the route"). The pattern, in this order on the page: banner → pills →
short description → **`story`** → notices → map → guide.

```ts
story: {
  title: 'When Busan was the capital',
  text: ["Two or three short paragraphs, about 100 words in all …", "…"],   // RichText markup, **highlight** 2–3 names
},
```

- **One thread, not a tour.** Pick the one historical thread that ties the places together (Busan: the wartime capital
  and its refugee hillsides, which explains Huinnyeoul and Gamcheon). The story is why the place exists; the route
  says where to stand. Ask the user which thread they want if the place has several (they may know one: Huinnyeoul's
  refugee history was theirs).
- **Route steps become short:** one line of what/where (keep bus numbers and exits) plus one line of history for the
  place, only where a source backs it. A stop with no checked history gets no history line; never pad.
- **Shorten the description** to two sentences when a story is added: the story now carries the "why", the description
  only says what is on the map (it is also the meta description).
- **Sourcing rules are stricter than for tips:** two sources for any date or number, or "by its own history" /
  "reports say" when the source is the place's own claim (Haedong Yonggungsa's 1376). Say "around 2009 to 2011" when
  sources disagree. Do not turn a source's silence into a fact: Wikipedia and news do not call Gamcheon's Taegeukdo
  settlers refugees, so we did not either. Leave out a year you could not confirm (Busan Tower).
- Search in Korean too (`<place> 유래`, `<place> 역사`), then read the official page with `curl -sLk` (WebFetch often fails on
  Korean government sites). Date the story's facts in the final message so the user can veto single-source ones.
- Rendered by `PathDetail.tsx` (`.path-story`, accent line on the left, 15px/1.6 `--text-soft`).

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
path has no kmz yet, say in the intro that the map is still being drawn and keep the route to well-known
landmarks (Haeundae was in that state on 2026-10-20 and got its map on 2026-10-21). Restaurants: name only the ones pinned, and point to "the pink pins on
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
- [ ] If the page has a `story` (§1a): about 100 words, one thread, every date sourced or attributed ("by its own
      history"), route steps carry one-line histories, description cut to two sentences.
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

## 6c. Threads posts (docs/threads/<path>.md)

Standing rules (2026-10-22, after the Naksan chain got almost no views; reach is also limited by account
size, so none of this is guaranteed):

- **Topic, not hashtag.** Threads calls it a *topic*: one per post, typed with `#` in the composer, and the
  composer suggests topics as the user types. **Post 1 must carry it in its own text** (a "Topic: …" note in
  the doc is not enough): put the first candidate as the last line of the post 1 block and list 4–5
  candidates, most specific first (`#NaksanPark`, `#SeoulCityWall`, `#SeoulTravel`); the user picks from
  Threads' suggestions. Threads **cannot edit a post after a short window**, so the topic, photo and opening
  must be right *before* posting; say so when handing over.
- **Post 1 stands alone.** Give the finished plan in it (place, distance, time, when to start), not a story
  that needs the replies. Name the place and the hook in the first sentence. Chains of long story text get
  skipped, so keep post 1 short and put detail in the replies.
- **Photo first.** One photo on post 1, ideally the user's own (ask for one); Commons with credit is the
  fallback (docs/threads/inwangsan/ for the format).
- **End post 1 with an easy question** ("Sunset or night: which do you prefer in Seoul?"): replies are what
  make Threads show a post to more people.
- **The map link goes in the last reply** (links in a main post get less reach) **and in the profile bio**:
  few readers reach the last reply, so post 1 can end with "map link in my bio".
- Each post stays under 500 characters. Suggest small follow-up posts (one view, one tip, one food stop) and
  replying to other Seoul/Korea travel accounts without links; tell the user to check Threads insights after
  each post and keep what works. The user posts everything.

## 6c. Threads diary chains: what worked (hypotheses from 2026-10-22, refine with real numbers)

The Haebangchon chain (posted 2026-10-20) is the user's most popular. It is the pattern to copy until data says
otherwise. What it does that the weaker chains do less:

1. **Opens on the reader's feeling, not the place:** "Every time friends visit Seoul I drag them up… and they
   always thank me later." A promise plus a person, in the first line. Avoid openings that start with the
   walk's name or distance.
2. **Concrete senses and one insider detail in post 1:** bus squeezing past, glass roof, strings of lights,
   "side stairs opposite the church". A reader should be able to picture the hidden entrance. Generic mood
   lines ("the city sits quietly below") carry less.
3. **A small contrast or surprise:** "looks like a market time forgot… go in and it opens up".
4. **Ordinary words, short sentences, no poetry stacking.** "Loud, warm, chaotic. We always stay an hour."
5. **Practical close in post 3** (distance, time, bus, torch) **then the link**, and a question to the reader.
6. **A photo that shows the thing described** on post 1 (the market alley, not a generic skyline).
7. **Topic choice matters most:** Haebangchon is a trending foreigner-and-local neighbourhood with a food
   scene, which a hill walk is not. Prefer topics with food, a hidden entrance or a "locals only" angle for the
   first post of a week; use the quieter views as second posts.

8. **Emoji belong in Threads posts** (user, 2026-10-23: posts without any felt too stiff). Use 4 to 8 per
   post, at the ends of sentences and as bullets, not stacked: 🥐🧈☕🌳🗺️✨. Count them in the 500-character
   limit. The site's guide text keeps its own rule (one lead emoji, tip keys).
9. **Write the chain in the language the user will post in** (they switch between English and Korean); in Korean
   use a warm spoken ending (…요, …거든요) rather than formal prose.

Before writing the next one, ask the user for the numbers on the last three chains (views, likes, replies,
reposts per post, and which post got them) and say what the data does to these rules. Never claim these rules
are proven.

## 7. URLs, pre-rendering and the sitemap

Every page has a real URL with a trailing slash: `https://koreatravelpath.com/<city>/<path>/`. `npm run build`
pre-renders each route into `dist/<route>/index.html` (full guide text, notices, per-page title, description,
keywords, canonical, Open Graph, JSON-LD) via `src/entry-server.tsx` and `scripts/prerender.mjs`, so Google and
link previews see the content without JavaScript. Consequences for writing:

- Titles, descriptions and JSON-LD come from **`pageMeta()` in `src/seo.ts`** only; do not add meta logic to pages.
- `updated` on a path becomes the sitemap `lastmod` and the Article `dateModified`: bump it on every edit.
- `sitemap.xml` is **generated at build time**; never hand-edit one into `assets/`.
- **Every city, path and post `id` is lowercase letters, digits and hyphens** (`indoors-trip`, never `Indoors Trip`):
  the id is the URL (blog posts use `YYYY-MM-DD-HHMM`, see the blogdiary skill; never rename a live id). `scripts/prerender.mjs` now fails `npm run build` on any other route (2026-10-24: a path id with a
  space and capitals reached the sitemap as `/seoul/Indoors Trip/`, which Google cannot use). After adding a path or
  post, open `dist/sitemap.xml` and read the new line before pushing.
- Paths still showing "Map link coming soon" (`mapUrl: 'REPLACE_ME'`) are pre-rendered but **left out of the sitemap**
  (`placeholderPaths()` in `src/seo.ts`); they join it automatically once a real `mapUrl` is set.
- Old `/#/seoul/...` links redirect to the real page (script in `index.html`); use the slash form in new posts.
- Anything that reads `navigator`/`window` during render must be gated with `useHydrated()` (`src/hooks.ts`),
  or the pre-rendered HTML and the first client render disagree.
