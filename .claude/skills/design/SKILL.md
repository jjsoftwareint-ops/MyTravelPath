---
name: design
description: Visual conventions for MyTravelPath — picking a tag icon from the react-icons website and wiring it in, sourcing real free-licensed photos (Wikimedia Commons, KOGL/CC0/CC BY) for city cards and the app icon with proper credit, slim crop sizes, and the layout rules (city accordion → paths → detail). Use when the user asks for an icon, a pill, a photo, a banner, a favicon, or says something looks ugly or childish.
---

# Design conventions

Standing preference (2026-10-11): **real photographs and established icon sets only.** Hand-drawn SVG
icons/illustrations were rejected three times ("child's work", "so ugly", "of course I mean real image").
Never draw artwork; source it.

## 1. Tag icons (pills under a path title)

Icons come from [react-icons](https://react-icons.github.io/react-icons/) (already installed, v5.7). The
website is the catalogue: search a word (e.g. "hiking", "moon", "beach", "temple"), note the icon's name and
its set prefix. The prefix tells you the import path:

| Prefix | Import from | Set (licence) |
|---|---|---|
| `Gi…` | `react-icons/gi` | Game Icons (CC BY 3.0) |
| `Fa…` | `react-icons/fa6` (FontAwesome 6) or `react-icons/fa` (FA5) | FontAwesome (CC BY 4.0) |
| `Md…` | `react-icons/md` | Material Design (Apache 2.0) |
| `Io…` | `react-icons/io5` | Ionicons 5 (MIT) |
| `Lu…` | `react-icons/lu` | Lucide (ISC) |
| `Pi…` | `react-icons/pi` | Phosphor (MIT) |

Icons in use: `GiHiking` → `hiker` (Trekking, green), `FaMoon` → `moon` (Night walk, indigo),
`GiVillage` → `village` (Traditional, amber), `GiSunset` → `sunset` (Evening walk, orange),
`LuFlower` → `blossom` (Cherry blossom, pink).

Adding one:

1. Confirm the export exists in the installed version (the site may be newer than node_modules):
   ```bash
   grep -c 'GiHiking\b' node_modules/react-icons/gi/index.d.ts    # 1 = present
   ```
2. In `src/data/travel.ts` extend `TagIconName` (`'hiker' | 'moon' | 'beach'`).
3. In `src/components/TagIcon.tsx` import it and add a `case` (no inline colour; the icon inherits):
   ```tsx
   case 'beach':
     return <FaUmbrellaBeach className="tag-icon" aria-hidden="true" />
   ```
   Then give the pill one meaningful hue in `src/index.css`, light and dark via `light-dark()`
   (the pill gets class `tag-<name>`; keep the `.pill.` prefix or `.pill.tag` wins on specificity):
   ```css
   .pill.tag-beach { background: light-dark(#e0f2fe, #0c4a6e); color: light-dark(#075985, #bae6fd); }
   ```
4. Use it in data: `tags: [{ icon: 'beach', label: 'Seaside' }]`. A plain string tag (`'🌙 Night walk'`)
   still works but is the fallback, not the norm.
5. Pills are 13 px icons (`.tag-icon`), `.pill.tag` inverts the theme colours. New icon *sets* get a line in
   the README "Credits" section with their licence.

Show the result before pushing: build, serve `dist`, screenshot at 2× and crop to the row (see §4).

## 2. Photos (city card headers, favicon/app icon)

Source: **Wikimedia Commons**, via its API — no key needed. Preferred licences, in order:
**KOGL Type 1** (Korean government/tourism photos, free use with source credit; both current cards use it),
**CC0**, **CC BY**, then CC BY-SA. Always credit, even for CC0 (user wants the label).

```bash
python3 .claude/skills/design/scripts/commons_search.py "Haeundae beach" "Gwangan bridge"   # candidates
```

Rules learned the hard way:
- Every request needs a descriptive `User-Agent`; anonymous requests get an error page saved as `.jpg`.
- Only standard thumbnail widths are served (1280 and 1920 are safe). Originals and odd widths return
  400/429 ("Too many requests"). Pause ~1 s between downloads.
- `zsh`: `rm -f ./*.jpg` aborts a `&&` chain when nothing matches; `seq -w 1 8` does **not** zero-pad.
- Pick with a contact sheet (§4), never blind: tourism-board sets contain exercise equipment and signboards.

Card header spec: crop a horizontal band ≈ 21 % of the image height, export **1200×252 JPEG, quality 72**
(~110–130 KB) into `assets/<city>.jpg`:
```bash
sips -c <band> <width> --cropOffset <y> 0 wide.jpg --out crop.jpg
sips -Z 1200 -s format jpeg -s formatOptions 72 crop.jpg --out assets/busan.jpg
```
Then set `image: 'busan.jpg'` and `imageCredit: 'Photo: Busan Metropolitan City · KOGL 1'` on the city in
`src/data/travel.ts`, and add the Commons page URL to the README "Credits" list. Images are referenced as
`${import.meta.env.BASE_URL}<file>` — never a leading `/`, the site lives under `/MyTravelPath/`.

Favicon / app icon: the user supplies the artwork (current one: a route map with the Korean flag, Namsan
Tower, a hanok and a dol hareubang, white background). Crop it square with `sips -c`, then `sips -Z` to
`favicon.png` 64, `apple-touch-icon.png` 180, `icon-192.png`, `icon-512.png`. Keep it simple: no browser
tricks or transparency work unless asked.

## 3. Layout rules

- Home: **no banner above the list**. Cities are accordion rows (`/:cityId` keeps one open), each may carry
  a header photo; paths are the children with their pills; a path opens `/:cityId/:pathId`.
- Path detail: notice band → tags/duration → description → embedded My Maps (behind "Tap to explore") →
  "Open in Google Maps" button. Placeholder `REPLACE_ME` links render disabled.
- Credits on photos: tiny translucent pill, bottom-right, clipped by the card (`overflow: hidden`).
- Dark and light mode both come from the tokens in `src/index.css`; photos and icon colours are fixed.

## 4. Verifying visually

```bash
npm run build && python3 -m http.server 4173 --directory dist &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --hide-scrollbars --force-device-scale-factor=2 --window-size=500,760 --virtual-time-budget=5000 \
  --screenshot=out.png "http://127.0.0.1:4173/#/seoul"
```
Chrome enforces a 500 px minimum window, so use 500 and crop with `sips -c H W --cropOffset Y X`.
Embedded Google Maps iframes never paint in headless screenshots (dynamic cross-origin iframe); verify
those on a phone. For choosing among candidate images, write a small HTML grid of `<img>` tags and
screenshot it (a contact sheet) — Pillow is not installed.
