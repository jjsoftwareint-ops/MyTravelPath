---
name: blogdiary
description: How to write and add a diary post to the MyTravelPath blog (src/data/blog.ts) — the friendly, human, sometimes critical Korea-diary voice, airy short-block layout, the input rule (the user's own notes first, no invented experiences), image rules, AdSense slot placement and the per-post checklist. Use when the user asks for a blog post, diary entry, trendy-topic write-up or a new entry in the blog title list. Not for path guide text (see blogwriting).
---

# Diary posts for the blog

The blog is a diary of stories about Korea (trends, culture, food; **not** a travel diary: the user
corrected that label on 2026-10-23, so never call it one in copy or meta text), opened from the Blog button in the main page header (next to the
Saved icon, main page only). `/blog/` is a title list grouped by month, `/blog/:postId/` is a post.
Each visitor's last-read post is remembered in localStorage and marked with a "Continue reading" pill.
The list stays minimal: a title and a `teaser`, **one short sentence** (e.g. `How long would you wait for a dessert?`),
not a string of keywords (the user said a keyword series made no sense, 2026-10-23), and not a summary. It must add something the title
doesn't already say.
Path guide text is a different job: that is the `blogwriting` skill.

## 1. Where a post lives

One entry in `posts` in [src/data/blog.ts](../../../src/data/blog.ts), **newest first**:

```ts
{
  id: 'is-the-long-line-worth-it',       // URL slug
  title: 'Is the long line really worth it?',
  description: 'One or two sentences: meta description and social preview.',
  teaser: 'One short sentence.',          // shown under the title in the list
  icon: 'hourglass_not_done',             // 3D emoji right after the title on the post page, same size as the text
  date: '2026-10-23',                    // first published
  updated: '2026-10-23',                 // bump on every edit; shown as "Updated 23 Oct 2026"
  keywords: ['KoreaTravel', 'Waiting'],  // hashtags + meta keywords
  body: [ …blocks… ],
}
```

Blocks (`type`): `p` (one short paragraph, RichText markup: `**highlight**`, `[label](https://…)`),
`h` (a few words, optional `icon` = file name in `assets/emoji/`), `emoji` (`name` = a big 3D emoji as a rest; not used under the title, the post `icon` goes after the title instead, user's choice 2026-10-23), `space`, `list`, `table`, `quote`,
`verdict` (boxed conclusion), `dishes` (list with a small 3D emoji per item, `icon` = file in `assets/emoji/`: a stand-in picture for trends with no free photo, never presented as the dish itself), `route` (link box to one of our walking routes: `cityId`, `pathId`, `text`); the link passes `state.from` so the path page's back button returns to the post, `img` (file in `assets/blog/`, wrapped in a link to its source page, with `credit`), `ad`. The sitemap, JSON-LD
(`BlogPosting`), prev/next buttons and title list all follow from the array; nothing else to register.

## 2. Voice: it must read like a person wrote it

- Friendly, free, first-person plural ("we", "our verdict") like the rest of the site, sometimes
  critical, with opinions and small asides. Trendy or interesting Korea topics, not only paths.
- Short sentences, contractions, plain words. Vary the shape and length of posts.
- Korean names for foods, trends and places are welcome, e.g. `**버터떡** (beoteo-tteok)`. The post
  itself is in English.
- **Every Hangul word gets its English pronunciation in parentheses, every time it appears**, not only
  the first (standing rule, 2026-10-23: the user caught missing ones). That includes headings, captions,
  list items and hashtags: `뮷즈 (myut-jeu)`, `#필사스타그램 (pilsa-stagram)`. Add a meaning when it helps
  (`다이어리 꾸미기 (daieori kkumigi), decorating a diary`). Use the Revised Romanization. Exceptions:
  `credit` names, which stay compact, and a word whose English form is the gloss
  (`Hongdae (홍대)` is fine in either order).
- Before finishing a post, run `grep -n "[가-힣]" src/data/blog.ts` and check each hit has its pronunciation.
- Avoid the AI tells: "dive in", "delve", "in conclusion", "whether you're X or Y", "a testament to",
  "bustling", "hidden gem", "vibrant tapestry", "game-changer", rhetorical "But here's the thing",
  stacked triples in every paragraph, em dashes (use a comma or a full stop), a recap paragraph.
  Don't give every post the same skeleton (hook, three headings, tips, verdict).
- Critique aims at things (a trend, a pricing habit, a tourist trap), never named private people or
  small businesses, and any factual claim is checked first.

- **Write for readers from elsewhere** (many are European). Where it fits, say how the Korean habit
  differs from what they know (a palace is a school trip in Europe, a date spot in Seoul), and explain the
  word in Korean plus a plain English gloss. Add `route` links to our own walks when a post touches one.

## 3. Research rule: know the topic yourself, then write

The user wants posts written from Claude's own knowledge and research (standing instruction,
2026-10-23: "you will need to know many things by yourself and write"). Do not wait for notes.
- Take the topic, **research it first** (WebSearch, Korean queries too: 뉴스, 네이버 results are
  useful for trends), cross-check facts against two sources, and write the full post in one go.
- Write in an observational "we" voice, with opinions and verdicts of the blog's own. Date-sensitive
  facts (trends, wait times, prices, app rules) say "earlier this year" or "reports say", never "right
  now" if the source is older than a month.
- **Never invent** first-person stories ("I stood in line for two hours"), quotes, prices, shop names or
  statistics. If it was not found in research, leave it out.
- Travel blogs alone are weak evidence; prefer news or the official page, and hedge when only a blog
  says it.
- After drafting, tell the user in the reply which claims rest on a single source or are the blog's
  own opinion, so they can veto them. Ask only for things research can't give (a photo, a personal
  verdict they want in).

## 4. Layout: easy on the eyes, not a book

- Paragraphs of 1–3 lines, one idea per block, space between thoughts (`space` blocks).
- **The post card is not clickable**: no press (scale/colour) or hover effects, so readers can drag-select and
  copy text comfortably (user's rule, 2026-10-23). It reuses `.card` for its box, and `.post` overrides the
  `:active`/`:hover` states. Don't wrap blog text in links or buttons beyond real inline links.
- **Title**: the post `icon` sits right after the last letter of the title, at the same size as the title text
  (user's rule, 2026-10-23). Do **not** put a big emoji block under the title, and do not put icons in the
  blog list rows (tried and rejected as "strange").
- A big `emoji` or an image every few paragraphs, headings of an emoji and three words.
- Prefer a small `table`, `list` or `verdict` box to a long paragraph. Target 400–700 words.
- CSS is in the "Blog (diary)" section of [src/index.css](../../../src/index.css): narrow column,
  17.5px text, line-height 1.85. Font: **Roboto** for Latin (the user's choice, 2026-10-23, after trying Literata/Fraunces and
  Pretendard; Montserrat/Lato were floated and dropped), self-hosted as `assets/fonts/roboto-latin.woff2`,
  with **Pretendard** supplying Hangul (family `Roboto Blog` in `src/fonts.css`, Latin only). The same font is now **site-wide** (user, 2026-10-24); the blog no longer sets its own `font-family`. Warm paper card with an orange accent.

## 5. Images and emoji

- **react-icons is for the app UI only, not blog content.** Blog visuals come from free illustration/emoji libraries fetched the same way as Fluent Emoji (download the files, host them in `assets/`).
- **Emoji are 3D images, not text emoji**: Microsoft Fluent Emoji 3D (MIT), files in
  `assets/emoji/<name>.png` at 144px (`assets/emoji/LICENSE.txt` holds the notice; the blog pages carry a
  one-line credit). Native emoji looked boring to the user. Use them in `h` icons and as the post's
  title `icon`; inline emoji inside sentences stay native, sparingly. To add one: download
  `https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/<Name With Spaces>/3D/<snake_name>_3d.png`
  (path names are the CLDR name, e.g. `Round pushpin`/`round_pushpin_3d.png`), shrink with
  `sips -Z 144`. Pick cute or funny ones, and don't use an emoji that misstates the topic (🏯 is a
  *Japanese* castle, so palace posts use a lantern or teacup instead).
- **No free photo? Link the dish name to Google Images** (the user's idea, 2026-10-23: images are
  copyright-limited, so don't embed unlicensed ones; and no "See photos" label, the name itself is the link).
  In the text write `[두쫀쿠](https://www.google.com/search?tbm=isch&q=<URL-encoded keyword>) (dujjonku)`,
  with the pronunciation after the link. Use the Korean name (best results), keep it specific
  (`상하이 버터떡`, not `버터떡`), and never hotlink or copy the images themselves.
  Link **a Korean-named food, place, object or person the first time it appears, when seeing a picture helps**
  (not repeats, not headings, not things that already have a photo in the post). **Do not link abstract words or
  concepts** (user, 2026-10-24: links on 판소리, 추임새, 국악소녀, 경기민요 were "unnecessary"): a genre, a shout, a
  nickname, a style. Those stay plain `**bold**` highlights with the pronunciation. RichText links open
  in a new tab. Inside a post they look exactly like `**highlighted**` words (bold, marker underline) plus
  an always-visible underline in the accent colour (orange, never black) so they read as links (user's rule, 2026-10-23: keep the font style).
- Free photos, shown whole, wrapped in a link to the source page with a credit line (author, licence,
  "via Wikimedia Commons"). The user's rule: only images that carry no copyright worry, so prefer CC0 /
  public domain / KOGL Type 1, then CC BY, and check each file's licence on its Commons page.
- Or an AI-generated image the user supplies: put the file in `assets/blog/`, use it whole
  (scale only, never crop), and caption it "AI-generated illustration". It never stands in for a photo of
  a real place or person.
- Real photos: Wikimedia Commons or KOGL/CC0/CC BY with credit, see the `design` skill. Readers cannot
  picture a trend dessert from its name, so show it: use an `img` block with `href` (source page) and
  `credit` (author, licence, licence URL). Check the licence of every file; only use a photo that really
  shows the thing named (a Hawaiian butter mochi is not Shanghai 버터떡). Commons API: rate-limited,
  send a User-Agent and pause between requests.
- Portrait photos are capped at 520px high (CSS), landscape ones fill the column.
- Claude cannot generate images here. The explicit exception to CLAUDE.md's "no drawn illustrations"
  rule: generated art supplied by the user is allowed in blog posts.

## 5b. Video links

When the user gives a direct YouTube link, use it (`https://youtu.be/<id>`) instead of a YouTube search link,
and strip the tracking part (`?si=…`). **Find the video yourself when the user does not give one** (user, 2026-10-24:
"you cannot do it by yourself?"): fetch `https://www.youtube.com/results?search_query=<q>` with a browser User-Agent
and `Accept-Language`, collect the `"videoId":"…"` values, and read each one's title and channel from
`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=<id>`. Take the artist's official
channel or the label's upload; never guess an id. Only if nothing official turns up, link a YouTube search
(`https://www.youtube.com/results?search_query=…`).

## 6. AdSense slots

Auto ads come from the script in `index.html`. Manual slots are the `ad` block and `<AdSlot>`
([src/components/AdSlot.tsx](../../../src/components/AdSlot.tsx)); a slot with an empty id in `AD_SLOTS`
renders nothing, so they stay off until the user pastes ad-unit ids from the AdSense console.
- At most **two** in-article `ad` blocks per post (one on short posts), placed after the intro, in a
  breathing gap between paragraphs, never right before the first heading. One `below` slot sits under the
  body, above the hashtags.
- **No ads** on `/blog/`, the main page or other navigation-only pages, never next to Prev/Next
  buttons or list rows, never over header buttons.
- Slots reserve a fixed `min-height`, push once per mount, and render only after hydration.

## 6b. Fonts (why there are 92 font files)

Pretendard (now used for Korean text only) is shipped as 92 small `unicode-range` slices (`assets/fonts/pretendard/`, declared in
`src/fonts.css`), so a visitor's browser downloads only the slices a page uses (estimate 100-250 KB, not
measured) instead of one 2 MB+ Hangul font. Do not delete slices by hand. Fallbacks: Apple SD Gothic Neo,
Noto Sans KR, Roboto.

## 6c. Share images

`/blog/` has **no** preview image (`og:image` and `twitter:image` are omitted, card type `summary`);
the user rejected custom share cards and the icon card on 2026-10-23. Posts use the site's default
`og.jpg`. Do not add per-post cards unless asked. Meta/Threads cache previews: refresh in Meta's
Sharing Debugger after a change.

## 7. Routine and checklist

1. User gives a topic (or Claude proposes one) → research → draft the entry → `npm run build` → screenshot at phone
   width (390px) → user reviews. **No commit or push until told** (CLAUDE.md).
2. Per post: every Hangul word has its pronunciation in parentheses (grep check in section 2) and an English gloss · a visual for any dish or object nobody could picture
   (free photo, or tell the user none exists; never a look-alike passed off as the thing) · `teaser` is one short sentence · `id` unique and URL-safe · `date`/`updated` set · `keywords` · description under ~160
   characters · newest first in the array · no invented experiences · facts sourced and dated ·
   images credited or captioned · at most two in-article `ad` blocks · build passes and
   `dist/blog/<id>/index.html` exists.
