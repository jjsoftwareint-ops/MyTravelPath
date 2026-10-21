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
| **Multi-route KMZ** (several walks as pink lines + flower pins; user asked for .kmz) | `<Name>.kmz` = zipped `doc.kml` | `layers_kml.py`, then `zipfile` | examples/cherry-blossom.json |
| **Long trail routes** (Jeju Olle, one colour per route + toilets/medical layer) | `<Name>.kmz` | OSM relation → `relation_chain.py` → `route.py` gaps → `layers_kml.py` | examples/jeju-olle-5-7.json |

Route KML and CSV overlays exist but are only produced on request.

## Layered KML workflow (hiking videos: ascent + descent + restaurants)

A layer may also carry `more_lines`: extra *disconnected* lines in the layer's colour, each its own
LineString (Incheon China Town, 2026-10-15: the main street plus the parallel lanes 차이나타운로51·55·59번길,
all red; the user asked for the lanes after seeing only the main street). Use it whenever an area has several
streets of one kind; one joined line would draw false connecting strokes between them.
Same research as the route workflow (transcript → Naver pins → `overpass.py` → `route.py`), but the spec has
`layers`, each with an optional `line` (`name`, `color` RRGGBB) + `segments` and its own `pins`
(see [examples/inwangsan-en.json](examples/inwangsan-en.json)). `layers_kml.py spec.json out.kml` writes one
`<Folder>` per layer (ascent line + its pins, descent line + its pins, restaurants), My Maps icon styles, HTML
descriptions with a Naver link. Lines are not densified and get no elevation. The builder prints vertex count,
length and the approx legs per line, plus the icon per pin; a jump > 60 m between segments is a WARNING.
Cherry-blossom map (2026-10-13): riverside/park walks are chained from OSM way geometry by name
(`도림천 자전거길`, `안양천 자전거도로` east bank, `여의서로`, `남산공원길`/`남산북측순환로`); the Seokchon Lake
loop came from `route.py` via points on the promenade (approx). Bank check for a river path: compare the
longitude of candidate ways at one latitude. The user wants a `.kmz`: zip the KML as `doc.kml` (no images).
**Naver Map has the official line for named courses** (Olle, dulle-gil, hiking courses): the course is a
place of category 도보코스 (e.g. 제주올레길7코스 = place 19932849; find it with `naver_place.py "제주올레길 7코스"`).
Its mobile page `https://m.place.naver.com/place/<id>/home` (redirects to `/trail/<id>/home`) embeds
`"mid":"<courseId>"` and the polyline's start/end; the line itself comes from the GraphQL
`getShapeGeoJSON` query (`api.place.naver.com/graphql`, variables `{mid}`) which answers curl with a captcha
but works from Chrome: `scripts/naver_course_shape.html` does the fetches in-page — run it with
`chrome --headless=new --disable-web-security --user-data-dir=/tmp/x --dump-dom file://…/naver_course_shape.html`
(edit the `[route, mid]` list first) and parse the `<pre>` JSON; MultiLineString parts are contiguous. Use
this line as-is (`approx: false`); OSM relations and routing are only for courses Naver lacks. The user
pointed at these Naver entries after two wrong rebuilds (2026-10-13): ask for / look for them first.
Hongdae (2026-10-17): city walking courses are on Naver too (`마포걷고싶은길1코스(경의선숲길)`, `레드로드`,
`홍대땡땡거리`, all category 도보코스). Their pages carry **no `mid`**: query `getShapeGeoJSON` with
`{businessIds: ["<placeId>"]}` instead (edit the vars in `naver_course_shape.html`); the shape `key` equals
the page's `PoiInfoShapeKey … LINK` id. A `MultiLineString` here means *branches*, not contiguous pieces
(Red Road = 16 parts: a spine plus side streets), so list the parts with their endpoints, chain the spine by
hand and leave the rest out (or add them via `more_lines`). Cut a long course at the user's end point
(forest park: nearest vertex to 서강대역). Coordinates may come nested one level deeper than expected: flatten
until `[x, y]` pairs.
Jeju Olle 5–7 (2026-10-13): **read the official map images first** —
`https://contents.ollepass.org/static/homepage/trail/img/road/road_<NN>_map_pc_<year>.jpg` (year from
`grep road_<NN>_map_pc assets/Road-*.js`; the Korean page's image is the same). They show the *current*
route with every waypoint and its km, plus 화장실 (toilet) and 구급함 (first-aid kit) icons at named places:
pin those by Naver place, don't substitute OSM amenities. Routes change (07 now ends at 서귀포버스터미널,
not 월평; the OSM relation still had the old line), so verify each line against the image's waypoints
(Naver coords, each ≤ ~130 m from the line, in order) and route any stretch that disagrees via the named
waypoints. The user noticed the mismatch the first time; the images were there all along.
jejuolle.org is a Vue SPA whose Road module holds only each course's official start/end lat/lng (`const p={"01":{start:…,end:…}}` in `assets/Road-*.js`) and map *images*; no line data, no
facility coordinates (toilets are mentioned in prose only). Geometry comes from the OSM relations
(`route=hiking`, names like `올레길5 (Ollegil 5)` / `Jeju Olle trail 7`); fetch them via
`api.openstreetmap.org/api/0.6/relation/<id>/full` when Overpass 504s. Member order is jumbled and some
relations include neighbour-route ways (7 had 8코스 ways and a 7(A) variant: exclude by name/length), so chain
with `scripts/relation_chain.py` (shortest path through the way graph) and route only its gaps. The site's
start/end coordinates are current; trust them over the OSM relation (course 07's relation was the old route).
Toilets/medical: Overpass `amenity=toilets|hospital|clinic|doctors|pharmacy` within 150 m of the final line,
each matched to a Naver place within 80 m (query "화장실"/"공중화장실" or the OSM name at the coords); icons
`toilet` (My Maps wc-unisex 1733, blue) and `medical` (doctor-bag 1558, red); unmatched toilets are dropped.
Busan cherry map (2026-10-13): `route.py` leaves a stream for parallel streets (Oncheoncheon north of
Dongnae), so chain the named cycleway (`온천천 자전거길`) instead; and check where the stream actually goes
before naming the end pin (Oncheoncheon bends east, Yeonsan Stn is not on it: end at the Citizens Park).
Lessons from Inwangsan (2026-10): the trail from the Tiger Statue to the wall is not in OSM (approx leg); the
wall path has 5–20 m node gaps that make Valhalla detour 2.5 km, so chain the `한양도성 순성길` nodes by hand
for summit → junction legs; the B-course stairs are boardwalk way 1314758863 ending opposite Choso Bookshop.

## Hard rules

- **Every path map gets a public-toilet layer** (user rule 2026-10-21: "when you draw path always put public
  toilets location together"). For every new or rebuilt route, sweep for toilets within ~150 m of the line
  (Naver `공중화장실` / `화장실` at points every 500–700 m along the line; the official map's toilet icons for Olle
  routes; OSM `amenity=toilets` as a cross-check) and put them in their own folder, `Public toilets (공중화장실)`
  or `Toilets & first-aid kits (화장실 · 구급함)` when the official map also shows first-aid kits. Icon `toilet`
  (blue wc 1733), `medical` for kits; each pin linked to its Naver place, or to the landmark it stands at when
  Naver has no entry. Note it in the path's guide ("toilets are pinned in their own layer"). Bukhansan, Haeundae,
  Olle 17, 18-1 and 1/1-1 were built this way; older maps get the layer when they are next touched.
- **Olle routes also get a `Stamp boxes (스탬프)` layer** (start, middle, end, plus any alternative start): the
  official map shows where, Naver usually has a `<place> 스탬프찍는곳` entry; otherwise pin the landmark and say
  so in the description. Icon `stamp`.

- **Verify every restaurant/café is still in business before adding it, and re-verify all of them on every
  update** (user rule 2026-10-15). `scripts/naver_status.py <id> …` reads Naver's place page for opening
  hours, closure markers (폐업/영업종료) and the newest review date, and checks the place is still returned by
  search: OPEN / CHECK / CLOSED. Add only OPEN (CHECK → look at the page by hand first). When the user asks to
  update a restaurants/cafés layer, run it on every existing pin too and **remove the CLOSED ones** from the
  map; say which were removed. Note the check date in the layer name, e.g. `(checked 2026-10-15)`. Venues
  that Naver has no entry for (street stalls: tanghulu, Turkish ice cream) are not pinned; tell the user.

- **Pin titles are English only; the Korean goes into the description.** Write spec names as
  `Keun-ung cliff path entrance (큰엉 입구)`: `build_gpx.name_parts()` makes the pin title
  `*CLICK* Keun-ung cliff path entrance` and `with_korean_line()` puts `<b>Keun-ung cliff path entrance (큰엉 입구)</b>`
  as the first line of the description, so the Korean is there for matching signs once the pin is opened
  (user rule 2026-10-14, after first rejecting Korean titles and then brackets in titles). All three builders
  do this; for an existing kmz run `scripts/korean_to_desc.py file.kmz`. Layer names may keep `(05코스)`.
  For pins whose title never had Korean, `scripts/korean_from_naver.py [--names map.json] file.kmz` fills the
  line from the Naver place name (via the pin's entry link), else the Korean address in an address-search
  link, else a hand map of title → 한국어 (see examples/korean_names.json; auto "Start of …/End of …" GPX
  markers stay without). Every delivered kmz should have the Korean line on every real pin (2026-10-14).

- **Every pin name starts with `*CLICK* `** (user preference 2026-10-14) so visitors know the marker opens a
  description with the Naver link. `build_gpx.pin_name()` adds it in all three builders (GPX waypoints, pins
  KML, layered KML); line names and folder names are not prefixed. Existing kmz files were updated in place.

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
  cafe, bar, restaurant, bus, subway, church, monument, historic, museum, library, trail, park, walking,
  flower = My Maps "garden-flower" id 1582 in pink, for cherry-blossom routes, toilet (wc-unisex 1733),
  medical (doctor-bag 1558, red), dot = red circle 1499 for every passing-by waypoint of a long trail (user
  preference 2026-10-13: each dot links to its Naver place, or an address search when Naver has no place),
  stamp = My Maps "seal" 1862 in purple for Olle stamp stations incl. start/end (user asked for a stamp icon
  2026-10-14; the app's own pill uses `LuStamp`, but KML can only use My Maps ids), harbor, bridge,
  waterfall, spring, tidepool, beach, info, parking, school, stadium, hall, picnic, street, pin).
  **Give every waypoint a meaningful icon** (user request 2026-10-14): ports → harbor, streams/springs →
  waterfall (the user prefers it to the tap icon, 2026-10-14), rocky shore → tidepool, kiosks → info, car parks → parking, welfare/community halls → hall, rest
  areas/gazebos → picnic, named streets → street, peaks/oreum → mountain, lookouts → viewpoint/camera.
  Plain red dots are the fallback for a point with no better match, not the default.
  **Restaurants, cafés and bars are pink** (`restaurant` 1577, `cafe` 1534, `bar` 1517, all E91E63; user rule
  2026-10-15, applied to every existing kmz with `restyle_kmz.py icon-1577=restaurant icon-1534=cafe`).
  **Viewpoints are always the pink camera** (`viewpoint` = `camera` = My Maps camera-photo 1535 in E91E63;
  user rule 2026-10-14, binoculars 1523 is banned). **Walking/path points use `walking`** (1731), not the
  older-set 1469 figure that My Maps exports. To re-icon an existing kmz without rebuilding it (My Maps
  exports included), use `scripts/restyle_kmz.py file.kmz icon-1523=viewpoint icon-1469=walking …`; it
  clones the style blocks under the new id with the CDN href and rewrites the styleUrl references.
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

- **A My Maps export with "Keep data up to date with network link" is an empty shell**: the kmz holds one
  `<NetworkLink>` to `google.com/maps/d/kml?mid=…` and no placemarks, so any patch script "finds 0 pins"
  (Haebangchon, 2026-10-14). Rebuild a full local copy from the live map with
  `curl "https://www.google.com/maps/d/kml?mid=<id>&forcekml=1"` zipped as `doc.kml`, and check every file
  before patching: `grep -c "<Point>" doc.kml`.
- **Name check before delivery**: list every point name and flag any that start with Hangul —
  `python3 -c` over `<Placemark>…<Point>` with `re.match(r'[\uac00-\ud7a3]', name)`; all seven files were
  swept on 2026-10-14 (Jeju rebuilt in English, Inwangsan's 무무대 전망대 renamed).
- **Icon hrefs must be XML-escaped**: the My Maps CDN URL contains `&`; writing it raw makes My Maps reject the
  file as "invalid or unsupported data" (hit 2026-10-14 after `restyle_kmz.py` patched four files). The builders
  go through `esc()`; `restyle_kmz.py` now escapes and parses the KML before saving. Always validate a kmz with
  `xml.dom.minidom.parseString` before handing it over.
- **Overpass can fail the TLS handshake from macOS system Python** (`SSLV3_ALERT_HANDSHAKE_FAILURE`, all
  three attempts, 2026-10-15). Fallbacks, in order: Nominatim `polygon_geojson=1` for a named street (gives
  the way geometry, but simplified and in pieces: fine for a straight street, poor for a loop), then
  `route.py` through the landmark pins (Incheon China Town was built this way: short town-centre streets,
  router on OSM streets, `approx: false` as the streets are real). Drop a via that sits on a side street
  (의선당, 일본풍거리) or the router detours through it; keep it as a pin only.
- **Overpass mirror that works with curl: `https://overpass.kumi.systems/api/interpreter`** (2026-10-18, Gangnam):
  `curl -A Mozilla/5.0 --data-urlencode "data=<ql>" <mirror>` with `out geom;` returns way geometry directly when
  overpass-api.de answers 406 and system Python fails the TLS handshake. Gangnam streets (서초대로75·77길,
  테헤란로1길) were chained from it; a My Maps export kmz was patched by splicing `layers_kml.py` Style/Folder
  blocks into its doc.kml so the user's photo pins survived (examples/gangnam-paths.json).
- **When every Overpass mirror times out, the plain OSM API still works** (2026-10-20, Garosu-gil):
  `https://api.openstreetmap.org/api/0.6/map.json?bbox=<w>,<s>,<e>,<n>` returns every node and way in a small
  bbox (keep it under ~1 km²), so a street can be found by `name` and its node chain rebuilt locally; a single
  way is `…/api/0.6/way/<id>/full.json`. Nominatim's `polygon_geojson` for a road name may return only tiny
  side pieces (압구정로12길 gave two 2-node stubs), so check the length before trusting it.
- **`reverse_address.py` reads the GPX spec shape (`waypoints`), not a layered spec.** For a layered-KML pin
  without a venue, put that one pin into a throwaway `{"segments":[],"waypoints":[pin]}` spec, run the script,
  and copy the `address` back; when it says UNRESOLVED, pick the nearest real Naver place (e.g. a school gate
  across the road) and say so in the pin description.
- **Patching a My Maps export kmz** (Gangnam, 2026-10-18 and 2026-10-20): build the new layers with
  `layers_kml.py`, then splice its `<Style>`/`<StyleMap>` blocks after the Document `<description/>` and its
  `<Folder>`s before `</Document>`; remove any plain pin the user added for the same place so it does not
  duplicate the new `*CLICK*` pin; re-zip with the original `images/` folder; validate; run the Hangul-title and
  `*CLICK*` checks. Spec: examples/gangnam-additions.json.
- **Naver blocks after a burst (2026-10-21, five Olle routes in one afternoon):** `instant-search` and the
  `place/summary` API both answer 400 for hours, even from headless Chrome (403). What keeps working is the
  **mobile place list** `https://m.place.naver.com/place/list?query=<q>&x=<lon>&y=<lat>` (Apollo entries
  `"PlaceSummary:<id>":{"name":…,"category":…}`) for names and ids, and the **place page**
  `https://m.place.naver.com/place/<id>/home` for `"coordinate":{"x","y"}`, `roadAddress`, hours and review
  dates, which is also what `naver_status.py` reads for its OPEN verdict. Pace at ≥1.5 s per request, never
  retry a 400 in a loop (user: "if it keeps returning error you should not keep repeating it"). Script:
  `scratchpad/udo/lookup2.py` pattern, worth folding into `naver_place.py` as a fallback.
- **zsh does not word-split `$VAR`:** `python3 naver_status.py $IDS` passes one argument. Use `${=IDS}` or
  list the ids literally; a bogus id makes every verdict CLOSED with all fields None.
- **Olle official maps come at two sizes:** `road_<NN>_map_pc_<year>.jpg` is 2000×1000 for most routes but
  998×498 for 01 and 01-1 (read whole, do not quarter). Stamp boxes are the stamp icon; most have a Naver
  place named `<place> 스탬프찍는곳`; otherwise pin the stamp on the landmark and say so.
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
