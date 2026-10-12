---
name: googleCustomMap
description: Build map files for Google My Maps from a YouTube video, Naver Map links or a place list. Two deliverables: a GPX route (walkable track following real streets, with numbered pins) and a pins-only KML for place collections (restaurants, cafés, shops from a "N places" video). Use when the user asks for a GPX/KML, "follow the YouTuber's footsteps", a custom map route, restaurant pins, or coordinates for a walking course. Covers transcript extraction, Naver place lookup, OSM street geometry, pedestrian routing, elevation, icons, and the known API pitfalls.
---

# Map files from a video / place list

Two products, chosen by what the user wants (their standing preference, 2026-09-27):

| Deliverable | Format | Built with | Example |
|---|---|---|---|
| **Route** (a walk to follow) | `<Name>.gpx` | `build_gpx.py … --maplinks plain` | examples/haebangchon-en.json |
| **Pins** (restaurants, cafés, shops, "7 places" videos) | `<name>-pins.kml` | `pins_kml.py` | examples/haebangchon-pins.json |

| **Layered KML** (hike with a separate up/down line colour + a restaurants layer) | `<Name>.kml` | `layers_kml.py` | examples/inwangsan-en.json |

Route KML and CSV overlays exist but are only produced on request.

## Layered KML workflow (hiking videos: ascent + descent + restaurants)

Same research as the route workflow (transcript → Naver pins → `overpass.py` → `route.py`), but the spec has
`layers`, each with an optional `line` (`name`, `color` RRGGBB) + `segments` and its own `pins`
(see [examples/inwangsan-en.json](examples/inwangsan-en.json)). `layers_kml.py spec.json out.kml` writes one
`<Folder>` per layer (ascent line + its pins, descent line + its pins, restaurants), My Maps icon styles, HTML
descriptions with a Naver link. Lines are not densified and get no elevation. The builder prints vertex count,
length and the approx legs per line, plus the icon per pin; a jump > 60 m between segments is a WARNING.
Lessons from Inwangsan (2026-10): the trail from the Tiger Statue to the wall is not in OSM (approx leg); the
wall path has 5–20 m node gaps that make Valhalla detour 2.5 km, so chain the `한양도성 순성길` nodes by hand
for summit → junction legs; the B-course stairs are boardwalk way 1314758863 ending opposite Choso Bookshop.

## Hard rules

- **Every pin's Naver link is a place page or an address search, never a coordinate search.** The Naver
  Map app cannot resolve `map.naver.com/p/search/<lat>,<lon>` (user hit this 2026-10-12: "cannot find the
  location"), so such links are dead on phones. Venues get `naver_id` from `naver_place.py`; everything
  else (start points, junctions, viewpoints) gets an `"address"` in the spec, filled by
  `scripts/reverse_address.py spec.json` (OSM house numbers + Nominatim, each candidate verified against
  Naver's own search within 60 m) and checked by eye. `build_gpx.py` refuses a pin with neither.

- **Never add Kakao Map links** — not in GPX, KML, CSV, pins or route descriptions (user preference,
  2026-10-11; all existing kmz files were scrubbed that day). Every pin carries exactly one map link,
  "Open Naver Map", because Naver is the accurate map in Korea. The scripts no longer generate Kakao URLs;
  do not add them back by hand either.

## Pins workflow (place collections)

1. `yt_transcript.py <video>` — food-tour videos usually list every venue with its road address in the
   description; the transcript gives what was ordered and any tips (gift-card discounts, ordering system).
2. `naver_place.py "<venue>" … --near LAT,LON` — exact coordinates, road/lot address, category, review count
   from Naver Map (OSM/Nominatim don't know small Korean venues or sub-numbers like 97-6). If a name misses,
   retry with the bare name or add the district; spelling variants matter.
3. Write `<name>-pins.json` (name, desc in English unless asked otherwise, label, icon: restaurant/cafe/bar…,
   and `naver_id` from step 2), then `pins_kml.py spec.json "<name>-pins.kml"`. Each description ends with a
   single "Open Naver Map" link that opens the place's own Naver page
   (`https://map.naver.com/p/entry/place/<naver_id>?lng=…&lat=…&placePath=%2Fhome&entry=plt&searchType=place&c=15.00,0,0,0,dh`).
   Naver Map is the only map link, ever (see Hard rules). Copy the finished KML into examples/ next to its spec.

## Route workflow (GPX)

Goal: a GPX whose track follows real streets (OpenStreetMap node geometry), with named waypoints tied to the
video timestamps, densified to ≤8 m spacing, plus elevation. Scripts live in [scripts/](scripts/); a finished
example spec is in [examples/haebangchon.json](examples/haebangchon.json).

Be honest with the user up front: we cannot watch video frames and have no Google Maps API. Geometry comes from
OpenStreetMap, verified with a pedestrian router. Anything not in OSM (market interiors, private stairs, plaza
lawns) is interpolated and must be flagged `approx` in the spec and in the final message.

## Workflow (run in the scratchpad directory)

All scripts print help with `-h`. `SKILL=/Users/sejin.lee/source/javascript/just-hire-angular/.claude/skills/googleCustomMap/scripts`

1. **Video → text** (skip if the user gives places directly)
   ```bash
   python3 $SKILL/yt_transcript.py <videoId or URL>        # writes yt_meta.json + transcript_<lang>.txt
   ```
   Prints title, channel, description (the description usually has a chapter timeline), caption languages,
   then the transcript with mm:ss. Read the whole transcript once and write down, in order: every place name,
   street name, shop, and every "왼쪽/오른쪽/올라가/내려가/건너" cue with its timestamp. The video is edited,
   so **timestamps do not give walking speed**; use them only for ordering.

2. **Pin the named places**
   ```bash
   python3 $SKILL/geocode.py "신흥시장 용산구" "백범광장 서울" ...   # Nominatim, 1 req/s
   ```
   Nominatim misses most small shops. For those, WebSearch `"<shop> 주소"` to get the road-name address
   (e.g. `신흥로 81-1`), then locate it on the OSM street dump from step 3. Korean road numbering: number ≈
   metres/10 from the road start, odd = left side, `29-17` = sub-branch off number 29.

3. **Street geometry for the area** (one bbox call, then everything is local)
   ```bash
   python3 $SKILL/overpass.py ways  <south> <west> <north> <east>   # → ways.json, prints named streets
   python3 $SKILL/overpass.py named <south> <west> <north> <east> "regex|of|names"   # POIs, bus stops, steps
   python3 $SKILL/overpass.py dump  ways.json 신흥로 신흥로22가길 소월로 ...        # node coords per way
   python3 $SKILL/overpass.py box   ways.json <s> <w> <n> <e>       # every way incl. unnamed in a sub-box
   ```
   Use `dump` to get the exact node coordinates you will chain into the track. `box` finds unnamed alleys,
   crossings, sidewalks and steps (tags `highway=steps`, `footway=sidewalk`). Bus stops
   (`highway=bus_stop`) pin "종점"/"오거리" starts.

4. **Decide the path leg by leg.** For each leg between two known points, sanity-check with the router:
   ```bash
   python3 $SKILL/route.py '{"legA":[[lat,lon],[lat,lon]], "legB":[[...],[...],[...]]}'
   ```
   It prints turn-by-turn street names and lengths (Valhalla pedestrian profile, handles stairs/elevators).
   If the router's street sequence matches the narration, take its street names and chain the OSM nodes for
   those ways from step 3. If the narration says otherwise (a specific alley, "don't enter the main gate"),
   follow the narration and chain the nodes yourself. Where left/right cues conflict, prefer: the road type she
   mentions (bus road vs alley), landmarks named later ("the road we came up"), and address numbering.

5. **Write the spec** (copy the example and edit): ordered `segments` of `"lat,lon lat,lon ..."` node strings,
   each with a label and `approx` flag, plus `waypoints` with name/desc (put the mm:ss in desc).

6. **Build, validate, deliver**
   ```bash
   python3 $SKILL/build_gpx.py spec.json out.gpx      # densifies ≤8 m, adds open-meteo elevation, validates XML
   ```
   Prints point count, length, max gap, and the waypoint elevation profile (a sanity check: it should rise and
   fall where the narration says). The GPX is written for hand editing: an EDITING GUIDE comment in the header,
   a `<!-- Leg k: … | starts at pin N -->` comment at the start of every segment, and a `<!-- pin N: … -->`
   marker at the track point nearest each waypoint, so the user can cut the route at any pin in a text editor.
   Elevations are cached in `<spec>.ele.json` beside the spec; a rebuild after an edit fetches only new points
   (seconds instead of minutes). For "end the route at pin N" requests: trim `segments`/`waypoints` in the spec,
   mark the last pin `"icon": "end"`, rebuild. Save to the path the user wants (never overwrite their file without asking),
   and print the whole GPX in a code block only if they asked for "ready-to-copy".

   Standard build command (this is what the user wants by default; no KML, no CSV):
   ```bash
   python3 $SKILL/build_gpx.py spec.json "<Name>.gpx" --maplinks plain
   ```

7. **Optional extras, only on request**
   ```bash
   python3 $SKILL/build_gpx.py spec.json out.gpx --maplinks plain --kml out.kml   # KML with My Maps icons
   python3 $SKILL/points_csv.py spec.json labels.csv --maplinks                    # CSV overlay layer
   ```
   Give waypoints a short `"label"` in the spec ("Start", "End", "(hidden) market entrance") for the CSV overlay.
   For an English deliverable, copy the spec, translate names/descs, drop video timestamps, keep Korean in
   brackets where a sign must be matched (see examples/haebangchon-en.json).

## Google My Maps import notes (verified 2026-09)

**Default deliverable: the GPX only** (user preference, 2026-09-27). Do not write a KML or CSV unless asked.
The `--kml` and `points_csv.py` extras stay available for when they are requested. Background on the format
differences, in case the user asks why something looks odd in My Maps:

- A GPX track import auto-adds two extra markers named "Start of <track name>" and "End of <track name>";
  nothing in the GPX can suppress them. A KML `LineString` gets no such markers.
- GPX/CSV descriptions are imported as plain text: `<br>`/`<a>` show up literally. Plain text does keep line
  breaks and auto-links bare URLs, hence `--maplinks plain` ("Open Naver Map: <url>" on its own line). KML
  descriptions may contain HTML (`--kml` always writes the `<br><a href>Open Naver Map</a>` form).
- **Every pin gets an icon, chosen by the build, no user prompting.** Per-pin icons only work through KML
  `styleUrl="#icon-<id>-<RRGGBB>"` (My Maps' own id scheme). `build_gpx.py` holds the table (`ICONS`:
  start/end flags, funicular, elevator, stairs, camera, viewpoint, entrance, plaque, market, convenience,
  cafe, bar, restaurant, bus, subway, church, monument, historic, museum, library, trail, park, walking, pin)
  and a keyword matcher (`AUTO_ICON`, Korean + English) applied to label/name/desc. First pin = start, last =
  end. The build prints `[icon]` next to each waypoint: read that list and override any miss with an explicit
  `"icon": "..."` in the spec before delivering. More ids: grep `{id:"…",name:"…",title:"…"}` in the mapspro JS
  linked from TheStalwart/google-mymaps-icons.
- **Line edit limit: a line with more than ~2 000 vertices cannot be edited in My Maps after import**
  (Jongno at 2 094 points was locked; Haebangchon at 372 was editable). `build_gpx.py` therefore caps tracks
  at `--max-points 1800` (default): it keeps every corner and pin, drops collinear points, then re-spaces evenly
  to fill the budget (a 14 km route ends up at ~8 m spacing anyway; longer routes get wider spacing). Never
  raise the cap above 1 900. Other limits: ≤5 MB per file, ≤2 000 features per layer, ≤10 layers.

Keep waypoint names short and numbered so the legend stays in order.

## Pitfalls learned (2026-09)

- **Overpass returns HTTP 406 to curl** from this machine; use `urllib` in Python (the scripts do). The public
  server also 504s on busy days: retry 2–3 times with 10 s sleep, keep bboxes ≤ 2 km.
- **Valhalla (valhalla1.openstreetmap.de) fails the TLS handshake from macOS system Python** (LibreSSL);
  call it through `curl` (the script does). Response shape is polyline6.
- **OSRM public demo only has the car profile** even at `/foot/`; don't use it for walking.
- **YouTube caption URLs from the page HTML return empty bodies** (PO-token gated). Use
  `youtube-transcript-api` (installed by the script into `./pylib` if missing). Auto-captions garble names:
  "다무화 식당" was 다모아식당, "스파시아" was likely 소요쉼터 — cross-check against OSM/web.
- **Elevation** from open-meteo is a 30 m DEM; it is fine for a profile, wrong inside buildings/stairs. Free tier
  is ~10 calls/min (100 points each): the builder paces and retries, so a 15 km track takes 3–4 min to build.
- **Map-narrated itinerary videos** (the YouTuber points at a map, no walking footage, e.g. 직방탈플러스): the
  transcript gives an ordered place list plus a few "turn right at X" cues. Pin every place, route leg by leg
  with `route.py` using via points ON the street (not the shop/mall centroid, or the router walks through the
  building), read the turn-by-turn against the narration, and use the decoded `route_<leg>.json` shapes
  directly as segments. Fix legs whose street list disagrees with the narration by adding via points; the rest
  is done. Add explicit `"icon"` for pins whose name would mislead the keyword matcher ("gate", "exit").
- Two Overpass bboxes of ~2.5 × 3 km each downloaded fine (2 500–2 800 ways each) after one 504 retry.
- **Naver Map search**: `map.naver.com/p/api/search/instant-search?query=…&coords=LAT,LON&lang=ko&caller=pcweb`
  (wrapped by `naver_place.py`) returns places with x/y and addresses; the `allSearch` endpoint answers with a
  captcha stub, don't use it.
- **Naver Map place links** (`map.naver.com/p/entry/place/<id>` or `/p/search/.../place/<id>`): resolve with
  `curl -A Mozilla/5.0 -H "Referer: https://map.naver.com/" https://map.naver.com/p/api/place/summary/<id>`
  → JSON with `data.placeDetail.name`, `.coordinate.{latitude,longitude}`, `.address`. The `pcmap.place.naver.com`
  pages return 429; don't bother.
- **Valhalla accepts at most 10 locations per call**; split long via-point chains into several legs.
- **Trail / riverside walks**: when the user names a trail (fortress wall, stream walkway), chain the OSM way
  nodes for that trail yourself (`overpass.py dump` by name, or a local id lookup) instead of routing; the
  router prefers the road beside it. Where the walkway has an OSM gap (Cheonggyecheon between Gwansugyo and
  Samilgyo), fetch the `waterway` geometry and offset it ~10 m onto the bank, marked `approx`.
- Nominatim needs a User-Agent and ~1 request/second.
- `ls` with a glob in Downloads may fail under the sandbox; use explicit paths.
