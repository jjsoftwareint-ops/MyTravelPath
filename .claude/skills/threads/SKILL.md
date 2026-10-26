---
name: threads
description: How to write a Threads (Meta) post chain for a MyTravelPath path or blog post — the three-post format under 500 characters each, a post 1 that names the place and carries one topic tag, the warm first-person voice, the plain map-link last reply, photo and credit rules, and the docs/threads/<slug>.md file layout. Use when the user says "thread", "Threads post", "write a thread", or asks to promote a path or post on Threads. Not for Reddit (user gave up on it) and not for path guide text (see blogwriting) or diary posts (see blogdiary).
---

# Threads post chains

"Thread" in this project means **a chain on Threads (Meta)**, never X, never Reddit. The finished chains
live in `docs/threads/` (haebangchon, seongsu, inwangsan, naksan-cheonggyecheon, hanok-villages, china-town);
read the closest one before drafting, and copy its file layout.

## 1. Shape

- **Three posts**: post 1 is the main post, posts 2 and 3 are replies to it.
- **Each post under 500 characters**, emoji and URL included. Count with
  `python3 -c "import sys;print(len(sys.stdin.read()))"` before handing over.
- Optional fourth reply: the photo credit line, when the photos are not the user's own.
- Written in English unless asked. The user may ask for a Korean or German version afterwards.

## 2. Post 1 is the only one that reaches people

The Naksan chain got no reach (2026-10-22) because it had no topic, no photo and an opening that never named
the place. So post 1 must have:

1. **The place named in the first sentence** (Naksan Park, Haebangchon, K-Star Road), plus one hook.
2. **One topic tag in the post's own text**, last line (`#KStarRoad`). Threads suggests topics as you type
   `#`; list 3 to 5 candidates, most specific first, in the file header. It cannot be added after posting,
   and a post cannot be edited after a short window, so the tag, photo and opening must be right first time.
3. **A photo**, when a free or the user's own one exists (see section 5).
4. **A closing line that asks for a reply**, not just a question. The user's rule (2026-10-26): ask people who
   have been there to prove it with a photo ("Have you already been on the road? Prove it: show me your photo
   with your favourite group's bear 📸👇"). A photo request gets more replies than "what do you think?". If no
   photo challenge fits the place, use a one-answer question people can reply to in a few words
   ("Would you have your coffee in a 100-year-old living room? 👇").

## 3. Voice

Same as the diary voice in the `blogdiary` skill and the Reddit feedback the user gave on 2026-10-20,
which applies to every short social post:

- Warm, first-person, casual, like telling a friend. Describe the **feel** (lights, noise, how the lane goes
  quiet), not a list of venues.
- **No self-introduction**, no headers, no bold, no numbered route, no step-by-step itinerary.
- **No restaurant or shop names** (reads like an advert). Landmarks, stations, gates, parks and agencies are fine.
- No prices. No "free", "my site", "check out", or any description of the site.
- **No invented experiences.** Do not write "we went", "my friend said" or "I always" unless the user told
  you so. Write observations, facts and "you" instead, and leave a bracketed slot for the user's own line:
  `[your own line: ...]`. The existing chains use first person because the user supplied the story.
- Emoji: a light touch, at most one or two per post. Both styles exist in the docs (seongsu-en uses more).
- Two or three concrete details (station exit, bus number, which side of the street) beat many vague ones.

## 4. What each post does

| Post | Job |
| --- | --- |
| 1 | Place + hook + the feel of it + topic tag (+ question, photo). |
| 2 | The best moment or the one detail people miss. Also the honest warning if there is one (statues move, agencies left, closed Mondays). |
| 3 | Practical wrap-up: distance, time, how to get there, one tip. Then the link (below). |

**The link, last reply only**, in the plainest possible words, URL alone on its own line:

```
Would you like to follow my steps? I mapped it here 🗺️
https://koreatravelpath.com/<city>/<path-id>/
```

Take the path id from `dist/sitemap.xml` (clean URL, trailing slash, no `#`). If the thread is for a blog post,
use `https://koreatravelpath.com/blog/<id>/`. Never put the link in post 1. Put "map link in my bio" in the
profile instead if the user wants more reach.

## 5. Photos and credits

- The user's own photo is always better; say so in the file.
- Otherwise a real photo from Wikimedia Commons (search with
  `python3 .claude/skills/design/scripts/commons_search.py "query" --min-width 800 --ratio 0.5`), licence CC0,
  KOGL, CC BY or CC BY-SA, saved whole (never cropped, see CLAUDE.md) under `docs/threads/<slug>/` as
  `1-name.jpg`, `2-name.jpg`.
- **If Commons has nothing, try the official source** (district office or city press releases carry the
  attachments; Gangnam-gu's page shows a KOGL notice). KOGL Type 1 is fine; **Type 2 forbids commercial use**
  and the site runs ads, so flag it to the user. Check each photo's Exif for "All rights reserved": a notice on
  the page may not cover a photo the agency did not take (the BTS fan-phone photo on Gangnam-gu's 2015 release).
  Search Commons by category and place name too, not just file names, and do not give up after one pass.
- Never a look-alike passed off as the place (the Seongsu bread photos are labelled "Seoul bakery", not
  "Seongsu bakery"). If no free photo of the thing exists, say so; do not substitute.
- Credit line to paste, as a fourth reply or inside a post:
  `📷 <Photographer>, CC BY-SA 4.0 (Wikimedia Commons)`. CC0 needs none but credit anyway if it fits.

## 6. The file

`docs/threads/<slug>.md` (English variant `<slug>-en.md` only if a second version exists):

````markdown
# Threads: <Place or path name>

Three posts in a chain (each under 500 characters, emoji included). Post 1 is the main post; 2 and 3 are replies.
**Topic (post 1, last line):** candidates, most specific first: `#...`, `#...`, `#SeoulTravel`.
**Check before posting.** <only claims that could be wrong or have changed, with the source and date>

## Post 1
Photo: `<slug>/1-....jpg` (or "your own photo is better")
```
<text>
```

## Post 2 (reply)
## Post 3 (reply)

## Photo credits
````

The "Check before posting" block is where uncertain facts live: counts that sources disagree on, moves and
closures, anything dated. Facts come from official or dated sources; if the site's guide text disagrees with
a newer source, say so there and tell the user.

## 7. Routine

1. The user gives a place or path (or Claude proposes one from `src/data/travel.ts`) → read the path's
   `guide` and the closest existing chain → research what the guide does not say → draft → count characters.
2. Write `docs/threads/<slug>.md`, show the three posts in the reply, list what needs checking.
3. **No commit or push until told** (CLAUDE.md). The user posts to Threads by hand.
