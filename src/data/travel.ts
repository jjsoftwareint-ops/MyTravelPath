// ─────────────────────────────────────────────────────────────
// Edit this file to add your own cities and paths.
// Each path's `mapUrl` is a Google My Maps share link, e.g.
//   https://www.google.com/maps/d/viewer?mid=XXXXXXXX
// ─────────────────────────────────────────────────────────────

// Tags are shown as pills under the path title. A plain string can start
// with an emoji; for a drawn icon use { icon, label } (see TagIcon.tsx).
export type TagIconName = 'hiker' | 'moon' | 'village' | 'sunset' | 'blossom' | 'hiking' | 'hot' | 'rainy' | 'car'
export type Tag = string | { icon: TagIconName; label: string }

// Longer text for the detail page: what the walk is, the stages in order and
// practical tips. Short sentences; the map carries the details per stop.
export type PathGuide = {
  intro: string[] // one or two short paragraphs
  route?: string[] // the stages in walking order, one line each
  tips?: string[] // getting there, food, best time, nearby
}

// A fact the visitor must know before setting off, shown in its own box above the
// map: visiting hours, a closure day, a fee, a booking rule. Keep each to two lines.
export type PathNotice = {
  icon?: string // one emoji, e.g. '⏰' hours, '🎟️' tickets, '🚫' closure, '📅' booking
  title: string // e.g. 'Bukchon Hanok Village visiting hours'
  body: string // RichText markup allowed (**bold**)
  since?: string // when the rule came in or was last checked, e.g. 'Checked October 2026'
}

// A short history shown right under the header image and description: the story of the place, in two or three
// short paragraphs (RichText markup allowed). Only facts we can source; the route steps carry one-line histories.
export type PathStory = {
  title: string // e.g. 'When Busan was the capital'
  text: string[]
}

export type TravelPath = {
  id: string
  name: string
  description?: string
  seoTitle?: string // <title> headline for Google (about 45 characters, before ' | My Travel Path'); falls back to the name
  seoDescription?: string // meta description (about 150 characters); falls back to `description`
  whyVisit?: string[] // 1-2 short paragraphs: the pitch for why it's worth the trip, shown right above History
  story?: PathStory // short history under the header image
  guide?: PathGuide // shown under the map on the detail page
  keywords?: string[] // hashtags under the guide; also the page's meta keywords
  notices?: PathNotice[] // important facts shown above the map (hours, closures, fees)
  updated: string // ISO date of the last edit to this page (text, notices or map). Bump it on every change.
  duration?: string // e.g. "2h", "Half day"
  tags?: Tag[] // e.g. [{ icon: 'moon', label: 'Night walk' }] or a plain string
  image?: string // file in ./assets, shown as a banner above the description on the detail page
  imageCredit?: string // shown as a small label on the banner
  imageWhole?: boolean // show the banner uncropped at its own ratio (a supplied photo), not as the slim band
  screenshot?: string // file in ./assets: a map screenshot shown under the map, for where Google Maps is inaccurate
  screenshotCaption?: string // one line under the screenshot, naming the source
  liveCam?: { videoId: string; caption: string; above?: boolean } // YouTube live stream, embedded under the map (above it with above: true)
  mapUrl: string
}

export type City = {
  id: string
  name: string
  seoTitle?: string // <title> headline for the city page, e.g. 'Jeju walking trails: Olle routes with maps'
  seoDescription?: string // meta description for the city page (about 150 characters)
  intro?: string[] // one or two short paragraphs under the city name when it is open (RichText markup allowed); real text for readers and search, no filler
  theme?: boolean // a collection of themed paths across Korea, not one place (page titles say "Themed routes", not "in <name>")
  image?: string // file in ./assets, shown as the city card's header photo
  imageCredit?: string // shown as a small label on the photo
  imageWhole?: boolean // show the header image whole at its own ratio (a supplied image), not as the slim band
  paths: TravelPath[]
}

export const cities: City[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    intro: [
      "Korea's capital for more than 600 years, since the Joseon dynasty made it its seat in 1394. About **9 million people** live in the city itself, and the Seoul area with Gyeonggi and Incheon holds around half the country.",
      "The **Han River** splits it in two: palaces, hanok lanes and the old fortress wall on the north bank, towers and Gangnam on the south. Four inner mountains, **Bugaksan, Inwangsan, Naksan and Namsan**, ring the old city, and the subway reaches almost everywhere.",
    ],
    image: 'seoul.jpg',
    imageCredit: 'Photo: Seoul Tourism Organization · KOGL 1',
    paths: [
      {
        id: 'naksan-cheonggyecheon',
        name: 'Fortress wall and stream',
        seoTitle: 'Naksan Park sunset walk to Cheonggyecheon',
        seoDescription:
          "Walk Seoul's city wall on Naksan at sunset, pass Ihwa mural village and Dongdaemun gate, then follow the lit Cheonggyecheon stream. Map and tips.",
        duration: '3h',
        updated: '2026-10-31',
        tags: [{ icon: 'sunset', label: 'Evening walk' }, { icon: 'moon', label: 'Night walk' }],
        whyVisit: [
          "Naksan Park has **the most beautiful sunset and night view in Seoul**, and you watch the sunset from a café: Cafe Nakta sits on the lip of the old quarry, San 1-1 by the wall, with the whole of the old city below.",
          "Then **the night walk along the 600-year-old wall**, with Jongno, the Bukhansan ridge and Namsan Tower lit up beneath you, for free. The hill is only 125 m, so you don't have to earn it.",
          "A mural village through a secret gate, a gate standing alone in the traffic, and the lit stream through the old city to finish.",
        ],
        story: {
          title: 'A wall, and a river that was buried',
          text: [
            "Seoul's city wall was first built by the founding king of Joseon, as earth on the flat ground and stone on the hills, and it still runs 18.6 km over the mountains around the old city. Its stones carry carved records: first the counties that built each stretch, and after King Sukjong's repairs the overseer and the date.",
            "The stream below the wall had a worse century. From 1958 it was covered over, and later it carried an elevated highway 5.6 km long. When the structure became a safety worry, the highway came down in 2003 and the stream reopened on **1 October 2005**, 47 years after the covering began.",
          ],
        },
        image: 'naksan.jpg',
        imageCredit: 'Photo: Seoul Metropolitan Fire & Disaster HQ · CC BY-SA 4.0',
        notices: [
          {
            icon: '🌙',
            title: "Naksan Park and the wall path are open all night",
            body: "**Naksan Park** has no closing time on Naver (00:00–24:00) and the **Seoul City Wall** path along it is lit after dark. The small **Hanyangdoseong exhibition hall** at the central plaza is open **09:00–17:00** and **closed on Mondays**.",
            since: "Naver Map and a Seoul city article of 21 October 2026. Checked 29 October 2026.",
          },
          {
            icon: '🤫',
            title: "Ihwa Mural Village is a residential lane",
            body: "Many of the murals were **painted over** after conflicts with residents, so expect fewer than old photos show. People live along the stairs: keep voices down on a night walk and do not photograph into windows.",
            since: "Seoul city media hub. Checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1w8F-eVqm5RpMFykhZ3HQUrb9TydjQV8',
        keywords: ['Seoul', 'NightWalk', 'Naksan', 'SeoulCityWall', 'Cheonggyecheon', 'Dongdaemun', 'NaksanCafe', 'SunsetView', 'KoreaTravel'],
        guide: {
          intro: [
            "🌙 **Watch the sunset from a view café first**, Cafe Nakta at the old quarry or San 1-1 by the wall on the {blue:blue path}, and come onto the wall once the lights are on. The viewpoints and the night walk along the wall are what comes after, and the wall carries you downhill to Dongdaemun without you having to think about it.",
            "From Dongdaemun it's the lit stream all the way west to Cheonggye Plaza. 5.6 km, almost all downhill or flat, about three hours if you dawdle, which you will.",
            "The {red:red path} is the direct way down; the {blue:blue path} winds through alleys of old houses and hilltop cafés. Mix them however you like.",
          ],
          route: [
            "Hansungdae-ipgu Station exit 4, the alternate start onto the {blue:blue} spur: it joins the wall near 369 Village, a resident-run rest stop, and comes down to First View Plaza.",
            "Naksan Park, ten minutes uphill from Hyehwa Station exit 2: the central plaza and a small exhibition hall on the wall's history. Naksan is named for its camel-back shape, the palace's 'left blue dragon' hill.",
            "First View Plaza: the panorama west over Jongno, Bukhansan and N Seoul Tower, at its best once the city lights are on.",
            "Ihwa Mural Village, through the first secret gate in the wall: a hillside settlement from just after the Korean War, painted by a 2006 art project. Some of the best-known murals were removed after residents tired of the crowds, and people still live on these stairs, so keep quiet.",
            "The {blue:blue} loop's hilltop cafés, where people watch the sunset before the wall: Deoham186, a hidden café and pottery workshop; Cafe Nakta at the old quarry viewpoint, looking straight onto the cliff face; the Reading Cat book café by the secret gate; Odeoksae, walled in like a small fortress near the angel-wings mural. The Ihwa-dong Village Museum and the Seoul City Wall Museum are on the way down.",
            "Dongdaemun gate, standing alone in the middle of the junction: rebuilt in 1869, its flanking walls pulled down in 1907. Dongdaemun Design Plaza is a short detour south.",
            "Cheonggyecheon, down the stairs at Cheonggyecheon Fashion Plaza: the Jeon Tae-il bridge, Gwangjang Market overhead at Saebyeok-dari, and the Sewoon arcade sky deck.",
            "The last stretch of the stream: a 192 m ceramic mural of King Jeongjo's procession, Gwangtonggyo, the oldest stone bridge on the stream, and the candle fountain at Cheonggye Plaza, minutes from Gwanghwamun and City Hall stations.",
          ],
          tips: [
            "🚇 Getting there: Hyehwa Station (line 4), exit 2, then through the Daehangno theatre quarter and up Naksan-gil. Hansungdae-ipgu Station (line 4), exit 4, is the alternate start straight onto the city-wall trail.",
            "🔦 The wall path is steps and slopes with dark patches between the lit sections; a phone torch helps. The stream walkway is flat and lit.",
            "📍 The stream walkway closes after heavy rain. Toilets at the Naksan central plaza.",
            "☕ The blue loop (Deoham186, Terre-tre, Chang Chan, Cafe Nakta, Donut Jeongsu, Gaeppul, the Reading Cat cafe, San 1-1 and Odeoksae) is a steep, stepped side trip through residential lanes, not part of the direct route down to Dongdaemun.",
          ],
        },
      },
      {
        id: 'haebangchon-evening',
        name: 'Haebangchon late evening walk',
        seoTitle: 'Haebangchon evening walk: 108 Stairs and views',
        seoDescription:
          'A 2.4 km evening walk in Haebangchon, Seoul: the 108 Stairs, Sinheung Market alleys, Sowol-ro rooftop views and the city wall. Free map and tips.',
        duration: '2h',
        updated: '2026-10-31',
        tags: [{ icon: 'sunset', label: 'Evening walk' }],
        image: 'haebangchon.jpg',
        imageCredit: 'Photo: Lee Jeong Woo / Korea MCST · CC BY-SA 4.0',
        whyVisit: [
          "A hillside village that Korean YouTubers are calling **Seoul's hottest spot right now**, and it still has a roofed market with a hidden staircase for a front door.",
          "Ride the incline elevator up the 108 Stairs, the one that looks straight out of a Hong Kong film. Then eat under the market's glass roof, Thai or herbal roast chicken or neon American-Chinese.",
          "Climb out the top and Sowol-ro runs at rooftop level, with **the whole Yongsan valley lighting up below you** and Namsan Tower overhead.",
          "Two hours, 2.4 km, and it ends on the lit city wall.",
        ],
        story: {
          title: 'A village named for liberation',
          text: [
            "The hill was a Japanese shrine ground until 1945; the **108 Stairs** were built in 1943 as its approach. When Korea was freed, people with nowhere else to go, many of them from the north, built homes on the slope and called it **Haebangchon**, Liberation Village.",
            "**Sinheung Market** went up in the 1970s to serve them. When the shoppers left for supermarkets it stood half-empty for years, until young cooks and bar owners found a roofed market with cheap rents and a view, which is what you eat in tonight.",
          ],
        },
        notices: [
          {
            icon: '🛗',
            title: "The 108 Stairs lift runs early to late",
            body: "The inclined lift beside the 108 Stairs (15 people, about one minute to the top) is reported to run **06:00–23:30**. Yongsan-gu has not published hours we could find, so treat the times as unconfirmed; the stairs are open at all hours.",
            since: "Yongsan-gu opened the lift in November 2018 (Yonhap). Hours from an unofficial listing. Checked 29 October 2026.",
          },
          {
            icon: '🚻',
            title: "Namsan Library: toilets, but not late",
            body: "The walk crosses Sowol-ro at **Namsan Library**, the last easy toilet before the wall path. It is open **Mon–Fri 09:00–20:00**, **Sat–Sun 09:00–17:00**, and **closed on the 1st and 3rd Monday** of each month. After that, use the public toilets pinned on the map.",
            since: "Naver Map, checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1kOFoicmAJJvQvsioIIOu1ng9dDQ4Exk',
        keywords: ['Seoul', 'Haebangchon', 'HBC', 'SinheungMarket', 'Namsan', 'RooftopBar', 'SeoulCityWall', 'Itaewon', 'KoreaTravel'],
        guide: {
          intro: [
            "🌆 Set off from the Huam-dong bus terminus **an hour before sunset**: up the 108 Stairs, dinner under the roof of Sinheung Market, dusk on the Sowol-ro rooftops, and the lit wall to finish. Trust me on the order.",
            "It's 2.4 km with about 160 m of climbing, so two hours with dinner. The lanes are steep because refugees from the north built them on a hillside after 1945, and they never got any flatter.",
          ],
          route: [
            "Huam-dong bus terminus (village bus Yongsan 02), the start: the 108 Stairs were built in 1943 as the approach to a Japanese war shrine. Climb them, or ride the inclined elevator beside them.",
            "The Sinheung Market sign, the classic photo. The market's real entrance is the hidden stairs opposite Haebang Church.",
            "Sinheung Market: alleys under a transparent roof, with restaurants on the ground and upper floors.",
            "The Cliff rooftop bar, up the alley between the 7-Eleven and the lottery shop, where the valley opens up below you.",
            "Sowol-ro: the Soyo rest area viewpoint and the Comfort Seoul terrace, where the road runs at rooftop level above the cafés.",
            "The Seoul City Wall below Namsan, from Namsan Library to Baekbeom Square and the statue of Kim Koo. The lit wall path continues up Namsan from here.",
          ],
          tips: [
            "🚇 Getting there: village bus Yongsan 02 to its last stop, the Huam-dong terminus, where the walk starts.",
            "🍜 Dinner in the market: Pad Ka Pao for Thai on the second floor, Haebangchon Dak for herbal roast chicken, H5NG for neon American-Chinese. Mersin Kebab's tantuni and Haebang Wang Gopchang are a minute away. Haebang Park's rooftop café is where to wait out a queue and catch the sunset.",
            "👟 The lanes are steep and some stairs are unlit; wear proper shoes. The village bus shares the narrow road, so step aside when it comes.",
            "📍 The lit wall path continues up Namsan from Baekbeom Square.",
          ],
        },
      },
      {
        id: 'hanok-villages',
        name: 'Hanok Villages',
        seoTitle: 'Hanok Village walk, Seoul: Bukchon, Ikseon-dong',
        seoDescription: 'A 5.1 km hanok village walk in Seoul: Bukchon, Ikseon-dong and Insadong on a free map, with Namsangol Hanok Village, local food, toilets and visiting hours.',
        duration: '2h',
        updated: '2026-10-31',
        tags: [{ icon: 'village', label: 'Traditional' }],
        whyVisit: [
          "Three hanok quarters in one 5 km walk, **laid out in 1394 and still lived in**: tiled roofs stepping down a hill with Namsan behind them.",
          "There is a palace at each end, tea in Insadong, grills in the Ikseon-dong lanes and **a street that fills with pojangmacha tents after dark**.",
          "Two hours of walking that takes a whole day, because there is far too much good food along the way.",
        ],
        story: {
          title: 'Hanok for the middle class',
          text: [
            "**Bukchon** sits between two palaces because the Joseon court's officials lived here, close to work. But most of the tiled roofs you see are not that old: in the 1930s, as Seoul grew and Japanese developers moved in, the builder **Jeong Se-gwon** bought up the big estates and divided them into small, modern hanok for ordinary Korean families.",
            "**Ikseon-dong** was his too, built in the 1920s. Those tight blocks of tiny courtyards were nearly demolished for apartments in the 2000s; instead the cafés arrived, and the two quarters became the most visited old streets in the city.",
          ],
        },
        notices: [
          {
            icon: '⏰',
            title: 'Bukchon Hanok Village visiting hours',
            body: "The busiest lane, **Bukchon-ro 11-gil** (the Gahoe-dong 31 alley on this route), is open to visitors **10:00–17:00** only. Outside those hours it is residents only and a ₩100,000 fine applies. The rest of Bukchon, its main streets and cafés, stays open.",
            since: 'Jongno-gu special management area, enforced since March 2025. Checked October 2026.',
          },
          {
            icon: '💂',
            title: 'Gyeongbokgung Royal Guard Changing Ceremony, 2027 timetable',
            body: "At the start of this walk, in the courtyard just inside **Gwanghwamun Gate**: the Royal Guard Changing Ceremony runs daily at **10:00 and 14:00** (about 20 minutes), and the shorter Gwanghwamun gate-guard duty at **11:00 and 13:00**. **No ceremonies on Tuesdays**, when the palace is closed, and they are cancelled in heavy rain or snow. The courtyard is free; no palace ticket needed.",
            since: 'Times unchanged for several years and expected to carry into 2027; confirm on the Korea Heritage Service royal palaces site before you go. Checked October 2026.',
          },
        ],
        image: 'bukchon.jpg',
        imageCredit: 'Photo: Bgag · CC0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=14TBNrDcRMm9lNuEBH3QZbcEAg_mnuNU',
        keywords: ['Seoul', 'Bukchon', 'HanokVillage', 'Ikseondong', 'Insadong', 'Namsangol', 'Pildong', 'Jongno', 'Hanbok', 'SeoulPalaces', 'KoreaTravel'],
        guide: {
          intro: [
            "🏯 This is the walk I give friends on their first day in Seoul. Start at Gyeongbokgung's east gate and climb into Bukchon while it's still quiet. Then drift east through the 1920s hanok of Ikseon-dong to Insadong and the spiral ramp at Ssamziegil.",
            "It's 5.1 km and two hours of walking, but **take the whole day**: there are palaces and markets in the way, and you will stop to eat more than once. If you want a fourth hanok quarter, Namsangol at Chungmuro is the calm one.",
          ],
          route: [
            "Cheong Wa Dae, the former presidential Blue House, if you have booked a visit; otherwise start at Gyeongbokgung's east gate.",
            "Samcheong-dong: the cafés and galleries around Jeongdok Library.",
            "Bukchon Hanok Village: the Gahoe-dong 31 alley and the viewpoint on Bukchon-ro 12-gil, roofs in the foreground and Namsan behind. Morning is quietest.",
            "Ikseon-dong: a 1920s block of tiny hanok built for ordinary families, now cafés and grills shoulder to shoulder. The grill alley behind the main lane is where to eat.",
            "Jongno 3-ga, where one lane fills with pojangmacha street-food tents after dark, and Tapgol Park.",
            "Insadong-gil, from its south end to the top: galleries, tea houses and craft shops, ending at Ssamziegil, the spiral-ramp craft mall. Anguk Station is 250 m north.",
            "Extension, off the walking line: **Namsangol Hanok Village** at Chungmuro Station exit 4, a garden of old elite hanok moved here from around Seoul, with Cheonugak Pavilion and a time capsule buried in 1994; far calmer than Bukchon. Then lunch or coffee in Pil-dong next door.",
          ],
          tips: [
            "🎟️ Cheong Wa Dae needs a **free online reservation, made in advance**; without one, start at Gyeongbokgung's east gate instead.",
            "🚇 Getting there: Anguk Station (line 3) sits in the middle of the walk.",
            "📍 Bukchon is a residential area with posted quiet hours. Stay on the marked lanes and keep voices down, especially around Gahoe-dong.",
            "🍜 Eat little and often: cafés in Samcheong-dong, Ikseon-dong grills, Insadong tea houses. Gwangjang Market is a short hop from the end.",
            "📍 With an hour to spare, add Changdeokgung, the palace to pick if you see only one, or the café lane of Seosulla-gil along the Jongmyo wall.",
            "📍 Two quiet extras if you have time: the Cecil Maru rooftop in Jeong-dong, a free view over the Anglican cathedral, and the Cheong Wa Dae Sarangchae in Seochon for maps and a sit-down (closed Tuesdays).",
            "📍 Hanbok rental shops cluster around Anguk; wearers enter the royal palaces free.",
            "🏡 Namsangol is free; check its closing day and the show schedule at Seoul Namsan Gugakdang on hanokmaeul.or.kr before you go.",
            "🍜 Pil-dong, beside Namsangol, is the food district: Pildong Myeonok for Pyongyang naengmyeon, Pildong Hambak for hamburger steak, Dongdae Dakhanmari for chicken stew, and cafés like Sector Coffee and Hebe Coffee. Korea House near Chungmuro Station serves royal-style meals and tea.",
          ],
        },
      },
      {
        id: 'inwang-mountain-trail',
        name: 'Inwang Mountain Trail',
        seoTitle: 'Inwangsan hike: Seoul city wall with views',
        seoDescription:
          'Climb Inwangsan along the Seoul fortress wall for views over Gyeongbokgung and the whole city. Free map with the route, pins and tips.',
        duration: '2.5h',
        updated: '2026-10-31',
        tags: [
          { icon: 'hiker', label: 'Hiking' },
          { icon: 'sunset', label: 'Evening walk' },
        ],
        image: 'inwangsan.jpg',
        imageCredit: 'Photo: Rtflakfizer · CC BY-SA 4.0',
        whyVisit: [
          "A 338 m granite peak right behind the royal palace, with **a 600-year-old city wall climbing straight over the top**.",
          "From the summit the palace is at your feet and the whole city lies below; from Beombawi, **the famous night view** as the lights come on.",
          "An hour up and an hour down, with cables and bare rock near the top. Dinner is in the Seochon lanes at the end.",
        ],
        story: {
          title: 'A mountain closed for twenty-five years',
          text: [
            "The wall over **Inwangsan** is part of Hanyangdoseong, the city wall begun in 1396, and the peak is the city's **white tiger** in the old geomancy, guarding the palace's west.",
            "In 1968 North Korean commandos came over this ridge to attack the Blue House. The mountain was closed to the public and stayed closed until **1993**; the guard posts you pass, one of them now the Forest Shelter, are left from those years.",
          ],
        },
        notices: [
          {
            icon: '🔥',
            title: "Fire-prevention seasons: check before a spring or late-autumn hike",
            body: "Korea's spring fire-prevention period runs **20 January–15 May 2026**; Bukhansan National Park closes some trails 3 Mar–15 May and 15 Nov–15 Dec. **No closure for Inwangsan's trails has been announced** as of this check, but Jongno-gu can restrict paths on dry, windy days. The mountain has no gates or opening hours otherwise.",
            since: "Korea Forest Service and the national park closure list for 2026. Checked 29 October 2026.",
          },
          {
            icon: '📚',
            title: "Yun Dong-ju Literature Museum, at the Changuimun fork",
            body: "If you take the Changuimun branch instead of Suseongdong, the museum at the bottom is **free**, open **10:00–18:00** (last entry 17:30, closed for cleaning 13:30–14:00) and **closed on Mondays**, 1 January and the Seollal and Chuseok days.",
            since: "Naver Map, checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1JPHJVSHobZnrwTiCPU8KQt-3SUX3Wqg',
        keywords: ['Seoul', 'Inwangsan', 'SeoulHiking', 'SeoulCityWall', 'Gyeongbokgung', 'NightView', 'Seochon', 'Beombawi', 'KoreaTravel'],
        guide: {
          intro: [
            "⛰️ Count on an hour up, past the Tiger Statue and onto the wall, with cables and bare granite for the last stretch, then an hour down through the forest shelter to the cafés of Seochon.",
            "It's a real hike, but shoes with grip and a couple of bottles of water are all you need. Plenty of people turn round at Beombawi, and honestly that's a fine evening too.",
          ],
          route: [
            "Gyeongbokgung Station exit 1, the start. The CU store at the Sajik-ro fork is the last shop before the summit; buy water here.",
            "Inwangsan Jarak-gil: an easy path past the Sajikdan altar wall, the Ungyeong House and the 1898 Hwanghakjeong archery pavilion.",
            "The Tiger Statue, where the trail proper begins: steep stairs, then the view opens and the city wall appears.",
            "The viewpoint where the wall and Namsan Tower line up, then Beombawi (Tiger Rock), the photo spot and a famous night-view point. Many people turn around here.",
            "The summit: slippery granite with cables and a cliff section for the last stretch, and the whole of central Seoul below.",
            "The descent to Seochon: the Forest Shelter, a converted guard post from the years the mountain was closed, the boardwalk stairs to the Choso Bookshop café, and Suseongdong Valley.",
          ],
          tips: [
            "🔦 Start **about two hours before sunset** to reach Beombawi as the lights come on, and carry a torch for the way down. Avoid rain and ice: the granite gets slippery.",
            "🚇 Getting there: Gyeongbokgung Station (line 3), exit 1. A taxi to the Tiger Statue saves the first 20 min on the road.",
            "💧 Nothing is sold between the CU and Choso Bookshop; take two bottles of water each.",
            "🍜 Dinner in Seochon at the end: Seochon Gyedanjip for seasonal seafood, Naejadong Dakgalbi, Kimjin Moksam pork belly or Mokpo Sebal Nakji octopus.",
            "✂️ Shorter option: climb only to Beombawi and come back the same way, about 1.5 hours.",
          ],
        },
      },
      {
        id: 'cherry-blossom-walk',
        name: 'Cherry Blossom walk',
        seoTitle: 'Seoul cherry blossom walks: 4 routes for April',
        seoDescription:
          'Four cherry blossom walks in Seoul for early April: Dorimcheon and Anyangcheon, Yeouido Yunjung-ro, Seokchon Lake and more. Free map with blossom pins.',
        duration: '2–3h each',
        updated: '2026-10-31',
        whyVisit: [
          "Ten days in early April when Seoul turns pink, and these are the four walks locals use, not the one everyone queues for.",
          "**The blossom tunnel the locals walk**, along the Anyangcheon from Sindorim to Gocheok Bridge, and Yeouido's 1,800 trees for the one time you want the crowd.",
          "All flat, all by a subway station, all lit after dark.",
        ],
        story: {
          title: 'Trees on a runway',
          text: [
            "**Yeouido** was Seoul's airfield until 1971, a sandbank in the river used for flights since the 1910s. When the National Assembly moved here in 1975 the island was rebuilt as a government district, and **Yunjung-ro** behind the Assembly was lined with cherry trees.",
            "The streams are younger still as walks. **Dorimcheon** and **Anyangcheon** were concrete drainage channels for the factories of Guro until the city turned their banks into paths in the 2000s; the cherry tunnels grew up along them.",
          ],
        },
        notices: [
          {
            icon: '🌸',
            title: 'Expected cherry blossom dates in Seoul, spring 2027',
            body: "Seoul usually opens in the **first week of April** and is in full bloom four to seven days later. Recent first-bloom dates: 1 April 2024, 4 April 2025 and about 3 April 2026, against a 30-year normal of 8 April. For 2027 expect first bloom around **1–6 April** and full bloom **5–12 April**. The official forecast comes out in early March; check it before you book.",
            since: 'Based on Korea Meteorological Administration observations 2024–2026. Written October 2026; the 2027 forecast is not out yet.',
          },
        ],
        tags: [{ icon: 'blossom', label: 'Cherry blossom' }],
        image: 'cherry.jpg',
        imageCredit: 'Photo: Alexey Komarov · CC BY 3.0',
        liveCam: {
          videoId: 'AKcsJqkcRP0',
          caption: 'Live now at Seokchon Lake, one of the four walks. Stream: GiGAeyes Live TV on YouTube.',
          above: true,
        },
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1PeaxeqCRk2SBgINAteHz4-fODippOZc',
        keywords: ['Seoul', 'CherryBlossom', 'Yeouido', 'Yunjungro', 'SeokchonLake', 'Namsan', 'Anyangcheon', 'SpringInKorea', 'KoreaTravel'],
        guide: {
          intro: [
            "🌸 The walk locals actually do is the Anyangcheon from Sindorim to Gocheok Bridge, a tunnel of blossom along the stream. Yeouido is the one everyone has heard of; go once for the crowd, or **do two in a day on line 2**.",
            "Each one is flat, 2 to 3.5 km and right by a station. Go before nine or after dark; the lake and Yunjung-ro are lit at night and far emptier.",
          ],
          route: [
            "Dorimcheon and the Anyangcheon embankment, 3.3 km, from Sindorim Station exit 6 to Gocheok Bridge: the walk locals do, a blossom tunnel along two streams.",
            "Yeouido Yunjung-ro, 2.6 km, from National Assembly Station exit 6: the riverside road behind the Assembly with about 1,800 trees, closed to cars and the city's festival street, very crowded at peak.",
            "Seokchon Lake, 3.4 km, from Jamsil Station exit 2 or 3: a loop of both lakes under the trees with Lotte World Tower behind them. The west lake is calmer.",
            "Namsan North Loop, 2.1 km, by bus 01A or 01B from Dongguk University Station to the National Theatre: a car-free loop road to Namsan Library, shaded, with views over the city.",
          ],
          tips: [
            "⏰ Go early morning or after dark. Yunjung-ro and Seokchon Lake are lit at night and **far less crowded before 9 am**.",
            "📍 Dorimcheon and Anyangcheon are the least busy; bring a picnic, there are few shops on the embankment.",
            "🔗 From Namsan Library, Myeongdong Station is 15 min downhill, and the Haebangchon walk on this site ends nearby if you want an evening extension.",
            "🌸 Timing varies by a week or two each year; check the national blossom forecast published in March before fixing a date.",
          ],
        },
      },
      {
        id: 'hongdae-hot-places',
        name: 'Hongdae Hot Places',
        seoTitle: 'Hongdae walks: Gyeongui Forest Park, Red Road',
        seoDescription:
          'Two Hongdae walks on one map: the Gyeongui Line Forest Park and Book Street, then the Red Road busking street down to the Han River.',
        duration: '1–2h each',
        updated: '2026-10-31',
        tags: [{ icon: 'hot', label: 'Hot place' }],
        image: 'hongdae-hot.jpg',
        imageCredit: 'Photo: Ken Eckert · CC BY-SA 4.0',
        whyVisit: [
          "Seoul's art-school quarter, where **the busking starts at seven and the night does not end at midnight**.",
          "A park laid along an old railway line, 250 m of book kiosks shaped like train carriages, then **dance crews on the Red Road all the way to the Han River**.",
          "Both walks start at one station, the park by day and the Red Road after dark.",
        ],
        story: {
          title: 'A railway that became a park',
          text: [
            "The lawn you walk on was the **Gyeongui Line**, the railway north to Sinuiju, opened in 1906. Trains ran at street level through Yeonnam-dong and Hongdae for a century; Ddaengddaeng-geori is named for the **bell** at its level crossing.",
            "The line went underground between 2005 and 2012, and the city turned the empty strip into the **Gyeongui Line Forest Park**, finished in 2016.",
          ],
        },
        notices: [
          {
            icon: '📚',
            title: "Book Street closes on Mondays",
            body: "The train-carriage book kiosks of the **Gyeongui Line Book Street** are **closed every Monday**. Opening is listed as **11:00–20:00** by the Korea Tourism Organization, though older notices say 18:00; the park path itself is open at all hours.",
            since: "Korea Tourism Organization and Seoul city media hub. Checked 29 October 2026.",
          },
          {
            icon: '🛍️',
            title: "Kakao Friends flagship and the charcoal-kiln spa",
            body: "**Kakao Friends Hongdae flagship** (three floors on Yanghwa-ro): daily **10:30–22:00**. **Forest Herbal Land** (숲속한방랜드), the charcoal-kiln spa pinned on the map: daily **06:30–22:00**; its restaurant 08:00–21:00.",
            since: "Naver Map, checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1MacGBkR5Qdw577FGrG4yztVioZYpBy0',
        keywords: ['Seoul', 'Hongdae', 'Busking', 'YeontralPark', 'GyeonguiLineForestPark', 'RedRoad', 'SeoulNightlife', 'HanRiver', 'KoreaTravel'],
        guide: {
          intro: [
            "🎸 I have never once managed to walk through Hongdae quickly, so don't plan to. Walk the old railway line from Yeontral Park past the Book Street to Seogang. Take a break at the station, then follow the busking street all the way down to the river.",
            "The two walks are 4.6 km together, with the station in the middle. The busking is biggest on Friday and Saturday nights, and that is when I'd go.",
          ],
          route: [
            "Gyeongui Line Forest Park, 2.7 km, from Gajwa Station exit 1: Yeontral Park, the lawn stretch of Yeonnam-dong lined with cafés and bakeries where everyone picnics.",
            "The Book Street, at Hongik University Station exit 3: 250 m of book kiosks shaped like train carriages, open from about 11 am, closed Mondays.",
            "Ddaengddaeng-geori, the lane of bars named after the old crossing bell, then Seogang Station and the sky bridge. The park continues 1.5 km to Gongdeok if you want more.",
            "Red Road, 1.9 km, from Hongik University Station exit 9: the busking street, with dance crews and singers most evenings and the biggest crowds on Friday and Saturday nights.",
            "The Red Road stage and art centre at the midpoint, with Sangsu Station's café streets a short detour away.",
            "Mapo Saebit Culture Forest, the park around the old Danginri power station, and the Han River path. Hapjeong Station is ten minutes away.",
          ],
          tips: [
            "🍜 Busking peaks **between about 7 and 10 pm**. Street food and the Hongdae Playground are beside the main stretch.",
            "✂️ Shorter park walk: start at Hongik University Station exit 3 instead of Gajwa, 1.3 km to Seogang.",
            "⏰ Yeontral Park is packed on weekend afternoons; weekday mornings are the time for photos.",
            "⏰ Hongdae is Seoul's late-night district. The last trains leave around midnight; after that it is taxis or the all-night cafés.",
          ],
        },
      },
      {
        id: 'bukhansan-dulle-gil-1-3',
        name: 'Bukhansan Dulle-gil 1-2-3',
        seoTitle: 'Bukhansan Dulle-gil 1-3: 9.3 km trail map',
        seoDescription:
          'Dulle-gil trails 1 to 3 around Bukhansan: 9.3 km from Ui-dong over the Pine Forest, Pilgrimage and White Cloud paths. Toilets and cafés pinned.',
        duration: '4h',
        updated: '2026-10-31',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'bukhansan.jpg',
        imageCredit: 'Photo: Korea.net / KOCIS · CC BY-SA 2.0',
        whyVisit: [
          "**The mountain without the climb.** The path circles Bukhansan at the exact height where the city stops and the forest begins.",
          "Red pines, independence fighters' graves in the woods, and a 12 m tower above the treetops for **the cloud view**.",
          "9.3 km in three colours, each its own walk, with soft tofu at the start and a book café in the woods near the end.",
        ],
        story: {
          title: 'A path around the mountain, and the graves beside it',
          text: [
            "The **Dulle-gil** opened in 2010, linking old village paths around the foot of Bukhansan so that the mountain could be walked without being climbed. The three trails on the Seoul side were among the first.",
            "They pass the **April 19 National Cemetery**, where the students killed in the 1960 uprising that ended Syngman Rhee's rule are buried, and the graves of independence leaders including **Son Byong-hi** and **Yi Jun**, which is why trail 2 is called the Pilgrimage Path.",
          ],
        },
        notices: [
          {
            icon: '🪦',
            title: "April 19 National Cemetery: hours and the memorial hall",
            body: "The cemetery grounds on trail 2 are open **daily 06:00–18:00** (Seoul lists 07:00–17:00 from November to February), free. The **memorial hall** is open 09:30–17:30 (to 16:30 Nov–Feb) and **closed on Mondays**. It is a national cemetery: quiet voices, no picnics on the lawns.",
            since: "Naver Map and the Ministry of Patriots and Veterans Affairs site, tel. 02-996-0419. Checked 29 October 2026.",
          },
          {
            icon: '🔥',
            title: "Fire-season closures in the national park",
            body: "Bukhansan National Park restricts trails **3 March–15 May** and **15 November–15 December 2026**. The listed closed section is on the Dobong side, not on Dulle-gil trails 1–3, but check the park's notice board before you set out: entering a closed trail carries a fine of up to ₩500,000. The park also sets last-entry times for its mountain trails (16:00 in Dec–Feb, 17:00 otherwise); finish the Dulle-gil by dusk.",
            since: "Korea National Park Service closure list for 2026. Checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1hKTShjnYqc2Vq4R1aCOynVVpxKte1Is',
        keywords: ['Seoul', 'Bukhansan', 'BukhansanDullegil', 'SeoulHiking', 'Uidong', 'April19Cemetery', 'Hwagyesa', 'ForestWalk', 'KoreaTravel'],
        guide: {
          intro: [
            "🌲 You start at one subway station and finish at another, which is the whole charm. Three trails, about four hours at a wander, through the pines and past the patriots' graves to the cloud tower, then down to Hwagye Station.",
            "Have the tofu lunch in Ui-dong before you start, and save the coffee for the café road between trails 2 and 3. The first two trails are easy; the third makes you work a little.",
          ],
          route: [
            "Trail 1, the Pine Forest Path, 2.9 km, about an hour, from the Uiryeong-gil entrance five minutes from Bukhansan Ui Station: red pines, the Ui-dong picnic ground and the grave of independence leader Son Byong-hi, ending at Sol-bat (Pine Grove) Park.",
            "Trail 2, the Pilgrimage Path, 2.4 km, about an hour: along the hillside above the April 19 National Cemetery, with the graves of patriots in the woods, to the entrance of Yi Jun's tomb. Mostly flat.",
            "Trail 3, the White Cloud Path, 4.0 km, about an hour and a half: the hilliest part, over the ridge behind Hwagyesa temple to the Cloud Observatory, a 12 m tower above the trees, and down to the Bukhansan Eco Forest. Hwagye Station is 15 minutes from the end.",
            "Food and cafés: soft tofu in Ui-dong, the café street north of the start, the restaurants and cafés of the April 19 café road, and a book café in the woods below the Cloud Observatory.",
          ],
          tips: [
            "🚇 Getting there: Ui-Sinseol light rail to Bukhansan Ui Station, the last stop; the trail entrance is 5 minutes up the road. From the end, Hwagye Station on the same line is 15 minutes downhill.",
            "🍜 Eat before trail 1 or after trail 2: Ui-dong does soft tofu and mountain-vegetable rice, the April 19 café road does grilled mackerel sets and good coffee. Trail 3 has only the book café.",
            "👟 Trails 1 and 2 are easy forest paths; trail 3 climbs about 150 m with stairs. Trail shoes are enough, poles are not needed.",
            "⏰ Weekday mornings are quiet; autumn weekends are busy with Seoul's hiking clubs. The pines of trail 1 are shade all summer.",
            "✂️ Shorter: do trails 1 and 2 only (5.3 km, 2 hours) and finish at the April 19 café road, or walk trail 3 alone from Hwagye Station as a 2-hour forest loop.",
          ],
        },
      },
      {
        id: 'seongsu-dong',
        name: 'Seongsu Popup Street + Forest',
        seoTitle: 'Seongsu-dong pop-up walk to Seoul Forest',
        seoDescription:
          "A 2.8 km walk through Seongsu, Seoul's warehouse district: pop-up lanes, concept stores, bakeries and brunch, ending at the Seoul Forest cafés.",
        duration: '3h',
        updated: '2026-10-31',
        tags: [{ icon: 'hot', label: 'Hot place' }],
        image: 'seongsu.jpg',
        imageCredit: 'Photo: CartoonChess · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1Xs1Bkx0p_e4CAlyFgUrz6PFnX9L8DGo',
        keywords: ['Seoul', 'Seongsu', 'SeongsuDong', 'PopUpStore', 'Bakery', 'CafeHopping', 'DaelimChanggo', 'SeoulForest', 'KoreaTravel'],
        whyVisit: [
          "Seoul's old shoe-factory district, where **the brick warehouses kept their machinery and became the city's busiest streets**.",
          "Pop-ups from Dior to Lush, three floors of stationery and **salt bread that sells out by afternoon**.",
          "2.8 km and flat, ending among the deer and the river path of Seoul Forest, or starting there if you would rather finish with dinner.",
        ],
        story: {
          title: 'From shoe factories to pop-ups',
          text: [
            "**Seongsu-dong** was Seoul's light-industry district from the 1960s: shoe workshops, print shops, car-repair yards and the red-brick warehouses that are still here. By the 2000s much of it stood empty.",
            "Cheap, big spaces drew artists and then cafés; **Daelim Changgo**, a 1970s rice warehouse turned gallery-café, is usually named as the start. **Seoul Forest** next door opened in 2005 on the old racecourse and waterworks, and the two pulled the district the way it has gone since.",
          ],
        },
        notices: [
          {
            icon: '🛍️',
            title: 'Pop-up stores change every few weeks',
            body: 'The brand spaces along **Yeonmujang-gil and Yeonmujang 5-gil** swap their themed events about **every two to four weeks**, and some need a **reservation or a queue ticket on the day**. Check the brand\'s Instagram or Naver Map page for the current event before you go. Most shops open around **11:00** and close between **20:00 and 22:00**; Mondays vary.',
            since: 'General pattern for Seongsu pop-ups; exact dates change. Checked October 2026.',
          },
        ],
        guide: {
          intro: [
            "🧱 Walk down the main street from the station, through the pop-up lanes, then west along the café street until you run out of shops and hit Seoul Forest. Give it three hours, because you will stop at a bakery whether you meant to or not.",
            "🌳 **Or do it the other way round**: start with the park and the deer, and end among the shops with a late dinner. Either way works; it just changes where you're tired.",
          ],
          route: [
            "Seongsu Station (line 2) exit 3, the start: Daelim Changgo Gallery, the 1970s factory warehouse that started the café boom, with the Musinsa store in the brick building next to it.",
            "Yeonmujang-gil, the main street: Point of View at number 18, three floors of stationery and objects; Ader Error's concept space; and the queues for the salt-bread and ciabatta bakeries.",
            "Yeonmujang 5-gil, the pop-up lane: Dior, Lush's pop-up theatre, Frika and the changing food and brand events. Atelier-gil's small workshops and showrooms sit in the lanes beside it.",
            "The Seoulsup-gil café street: Low Coffee Stand, Poset and the first Blue Bottle in Korea in its old garage, with Seoul Forest at the end: lawns, deer, the pond boardwalk and the river path. Reverse the whole list if you start here.",
          ],
          tips: [
            "⏰ **Weekday late morning** is the calm time. Weekend afternoons mean queues of an hour or more at the famous bakeries and pop-ups; ask for the day's wait on the Naver Map page.",
            "🚇 Getting there: Seongsu Station on line 2, exit 3, or Seoul Forest Station on the Bundang line at the park end. Both stations have toilets.",
            "🍞 Salt bread and ciabatta sell out by late afternoon at the most popular shops.",
            "👟 Flat and fully on pavement. The lanes are one-way for cars, so watch for scooters and delivery vans.",
            "🗺️ Atelier-gil is marked approximately: it is a local name for the workshop lanes between Yeonmujang 5-gil and Seoul Forest.",
          ],
        },
      },
      {
        id: 'gangnam-night-streets',
        name: 'Gangnam Night and Rainbow Bridge',
        seoTitle: 'Gangnam night walks: Garosu-gil and Banpo',
        seoDescription:
          'Gangnam after dark: back streets near the station, Garosu-gil in Sinsa-dong, the Banpo Bridge fountain and Sevit Island, plus Starfield Library by day.',
        duration: '2h',
        updated: '2026-10-31',
        whyVisit: [
          "This is the Gangnam the song is about. Towers and screens line the main road, and behind them **a dense grid of grills, bars and karaoke rooms** fills the moment work ends.",
          "Ginkgo-lined Garosu-gil at five, dinner in the back streets, then **a bridge that becomes a rainbow fountain at eight**.",
          "Wander it in any order, cross under the road, and see which side you prefer.",
        ],
        story: {
          title: 'Rice fields fifty years ago',
          text: [
            "South of the river was farmland and orchards until the late 1960s. The **Third Han River Bridge** (now Hannam Bridge) in 1969 and the Gyeongbu Expressway in 1970 opened it up, and the government pushed schools, offices and the bus terminal across the river to fill it.",
            "**Gangnam Station** opened with Line 2 in 1982, and the grid of back streets around it filled with the restaurants and bars that served the new office towers. The 2012 song that made the name famous worldwide described a district barely forty years old.",
          ],
        },
        notices: [
          {
            icon: '⛲',
            title: 'Banpo Bridge Moonlight Rainbow Fountain: 2026 show times',
            body: "Runs **15 March to the end of October**, 20 minutes per show. March to May and October: **12:00, 19:30, 20:00, 20:30, 21:00**. June to September: the same plus **21:30**. No show in wind over 7 m/s, when rain is forecast during show hours, or when the river is muddy; extra shows are added for events.",
            since: 'Seoul Hangang Park official timetable for 2026. Checked October 2026; the 2027 table is published each March.',
          },
        ],
        tags: [{ icon: 'moon', label: 'Night walk' }],
        image: 'gangnam.jpg',
        imageCredit: 'Photo: 최광모 · CC BY-SA 4.0',
        liveCam: {
          videoId: 'ZL1SUWuFxKQ',
          caption: 'Live now at Banpo Hangang Park, with the Banpo Bridge fountain and Sevit Island on the Han River. Stream: 247 Seoul Live Cam on YouTube.',
          above: true,
        },
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1VIazL8nrcXwzKDjTxKyxrbKGaNR9NYg',
        keywords: ['Seoul', 'Gangnam', 'GangnamStation', 'SeoulNightlife', 'Garosugil', 'KStarRoad', 'Apgujeong', 'BanpoBridge', 'MoonlightRainbowFountain', 'SevitIsland', 'StarfieldLibrary', 'Bongeunsa', 'KoreaTravel'],
        guide: {
          intro: [
            "🌃 Here's the evening I'd make of it: the ginkgo avenue in Sinsa-dong at five, one stop on the Sinbundang line to Gangnam for dinner, then on to Banpo in time for the **fountain show**.",
            "Behind the station there's no route to follow, so just wander the three back streets in whatever order you like and see which side you prefer. Two hours covers it with a meal.",
          ],
          route: [
            "The west side behind Gangnam Station, Seocho-daero 77-gil and 75-gil: the main nightlife lanes, restaurants and pubs with queues from early evening.",
            "The east side, Teheran-ro 1-gil and its branch: the quieter office-worker lanes, grill houses and bars.",
            "Gangnam Station exit 10 and the Kakao Friends flagship store, with the whole street lit by screens.",
            "Exit 11 and CGV Gangnam, on the site of the old Dong-A Theatre.",
            "For daytime: Starfield Library in COEX mall and Bongeunsa temple opposite it, both at Samseong Station, two stops east on line 2.",
            "K-Star Road, Galleria West to Cheongdam crossing: Gangnam-gu's walking route past the Gangnam-dol photo house, the Rodeo street, a figure museum and the Dosan Park end, with the K-pop agency streets at Cheongdam. A good daytime walk before the night streets. Gangnam-gu's own [K-Star Road guidebook (English PDF, large file)](https://www.gangnam.go.kr/etc/k_star_road_en/Gangnam_KSTARROAD_Guidebook%28EN%29.pdf) has the full zone-by-zone list.",
            "Garosu-gil, from Sinsa Station exit 8: the avenue of ginkgo trees with flagship stores on the street and quieter boutiques in the side lanes. Best in the late afternoon, yellow in early November.",
            "Banpo Bridge Moonlight Rainbow Fountain and Sevit Island, 15 minutes from Express Bus Terminal Station exit 8-1: watch the 19:30 or 20:00 show from the lawn, then walk over to the lit floating islands for the close-up view.",
          ],
          tips: [
            "🚇 Getting there: Gangnam Station, line 2 and the Sinbundang line. Exits 10 and 11 are on the west side; the station passage crosses under the road.",
            "🌉 Make an evening of it: Garosu-gil at 17:00, the Sinbundang line one stop from Sinsa to Gangnam for dinner in the back streets, then line 9 or a taxi to Banpo Hangang Park for the 20:30 or 21:00 fountain show.",
            "⏰ Restaurants serve until late and many bars go on past midnight. Line 2 runs until about midnight; the taxi ranks get long after that.",
            "⏰ Weeknights are busy from 7 pm with office workers; weekend crowds are younger and later.",
            "⏰ Starfield Library and Bongeunsa are free and best in the morning, before the evening walk.",
          ],
        },
      },
      {
        id: 'indoors-trip',
        name: 'Indoors Trip',
        seoTitle: 'Seoul rainy day: indoor places on one map',
        seoDescription:
          'What to do in Seoul when it rains or freezes: a botanic-park greenhouse, malls, museums, the Han River Bus and a jjimjilbang. Cafés checked, map included.',
        duration: 'Full day',
        updated: '2026-10-31',
        tags: [{ icon: 'rainy', label: 'Rainy day' }],
        whyVisit: [
          "A rainy day in Seoul with **a greenhouse in the middle of the city, eight big museums and a sauna in the woods** on the same map.",
          "An arts centre by Tadao Ando, a boat down the Han for the night view, and museums that stay open until nine.",
          "It is spread across the city in clusters, so you pick by the weather.",
        ],
        story: {
          title: 'Seoul\'s last rice paddies',
          text: [
            "**Magok**, the far west of Seoul, was still rice fields inside the city limits in the 2000s, the last large farmland left. The development district was approved in 2007, and the research campuses and apartment blocks went up through the 2010s.",
            "The **Seoul Botanic Park** opened in 2019 on part of that land, its greenhouse the city's first of its kind. The **museums** on this map are older: the National Museum of Korea moved to its Yongsan site in 2005, onto land that had been a military base for a century.",
          ],
        },
        notices: [
          {
            icon: '🚫',
            title: 'Closed on Mondays',
            body: "Seoul Botanic Park, the War Memorial of Korea, Leeum Museum of Art, the Seoul Museum of History and LG Arts Center Seoul are **closed every Monday**, and so is Café La Copella inside the arts centre. Plan the Magok half day and those museums for Tuesday to Sunday, and check any other museum on its Naver Map page first: the National Palace Museum showed as closed on Monday 26 October.",
            since: 'Opening hours as listed on Naver Map, checked 24 October 2026; the Botanic Park closure also matches its official site. Public holidays can change the closing day.',
          },
          {
            icon: '🎟️',
            title: 'Seoul Botanic Park greenhouse: winter hours and ticket',
            body: "The greenhouse and display garden are inside the paid Botanic Garden, open **09:30–17:00 from November to February** (09:30–18:00 from March to October), with the last ticket sold before closing. Adults pay **₩5,000**, teenagers ₩3,000 and children ₩2,000. The lake, forest and wetland parts of the park around it are free.",
            since: "Seoul Botanic Park's official site lists the winter hours and fees. Checked October 2026; summer hours are from the Naver Map listing.",
          },
        ],
        image: 'indoors.jpg',
        imageCredit: 'Photo: Korea.net / KOCIS · CC BY-SA 2.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1qs8hKu4Ep0rtcsLwrVbQ79y1s2egkXs',
        keywords: ['Seoul', 'RainyDayInSeoul', 'WinterInSeoul', 'SeoulMuseums', 'SeoulBotanicPark', 'Magok', 'HanRiverBus', 'Jjimjilbang', 'KoreaTravel'],
        guide: {
          intro: [
            "☔ Let the weather pick for you. The Magok half-day is the greenhouse, two malls and the arts centre, then the river boat to Yeouido. The other half of the map is the museums around Yongsan and Gwanghwamun, two or three hours each.",
            "**A lot of this closes on Mondays**, so check the box above before you plan an evening around a late opening.",
          ],
          route: [
            "Seoul Botanic Park, Magoknaru Station exit 3 or 4: the big greenhouse keeps the park green all year, even in winter.",
            "LG Arts Center Seoul, a performing arts venue designed by Tadao Ando, with Café La Copella on the 2nd floor and a terrace view back over the park.",
            "One Grove Magok and COEX Magok, two indoor complexes with restaurants and shops under one roof; COEX Magok has most of its restaurants on the lower floors.",
            "Lunch or coffee in Magok: Bogyeong Sujebi for hand-pulled dough soup, Cafe Gongmyeong Magok Chaekppang for a café with a book lounge, or salt bread from Tardema Bakery Magoknaru.",
            "Han River Bus from Magok pier to Yeouido pier: the boat gives you Seoul's night view from the river. Check the current timetable before you plan the evening around it.",
            "The museums. In the south, the National Museum of Korea, the War Memorial of Korea and Leeum Museum of Art. Five more cluster around Gyeongbokgung and Gwanghwamun: MMCA Seoul, the National Folk Museum of Korea, the Seoul Museum of History, the National Palace Museum of Korea and the National Museum of Korean Contemporary History.",
            "Forest Herbal Land (숲속한방랜드) at Bongwonsa-gil 75-7 in Seodaemun-gu, near Sinchon: a traditional Korean sauna, a jjimjilbang, set in the woods. Reports say its charcoal kilns are outdoors, which is unusual for a city spa. Open daily 06:30–22:00. The warmest way to end a cold day.",
          ],
          tips: [
            "🚇 Getting there: Magoknaru Station (exits 3 or 4) for Seoul Botanic Park and the Magok cluster, or Yangcheon Hyanggyo Station exit 8 for the other side of the park. Ichon Station is right next to the National Museum of Korea.",
            "🎟️ The permanent exhibitions at the National Museum of Korea, the War Memorial of Korea, the National Folk Museum, the Seoul Museum of History and the National Palace Museum are free. Leeum and MMCA Seoul charge by exhibition, so check Naver Map before you go.",
            "⏰ Late nights: on Wednesday and Saturday the National Museum of Korea, the National Palace Museum, MMCA Seoul and the Contemporary History museum stay open until 21:00, and the Folk Museum until 20:00 on Wednesday. The Seoul Museum of History is open until 21:00 on most days but closes at 18:00 on Thursday. All from Naver Map, 24 October 2026.",
            "🍜 Bogyeong Sujebi has a wait at weekday lunch, and the Tardema Bakery Magoknaru branch is mostly takeaway.",
            "🚤 The Han River Bus cost ₩3,000 one way at the time of writing, and the city has proposed higher weekend fares from next year. Its timetable has changed several times, so use the operator's current schedule, not an old one.",
            "♨️ A jjimjilbang is the Korean bathhouse: separate bathing areas for men and women, then shared heated rooms where everyone wears the clothes provided. Forest Herbal Land is open from 06:30 to 22:00 every day (Naver Map, 24 October 2026), but a 2025 write-up gives 08:00 to 21:00 for its charcoal kilns, so check before you go. Write-ups from 2025 list about ₩16,000 to ₩17,000 for the charcoal kilns and ₩10,000 to ₩11,000 for the bath alone; prices change, so confirm them and what to bring on its Naver Map page.",
            "📍 Seonungak is a hanok café at the foot of Bukhansan in Ui-dong, far from Magok. It is a good wet-day stop after the Bukhansan Dulle-gil walk on this site, which starts in Ui-dong too. Naver lists it as closed on Sundays, and autumn-leaf season brings queues.",
            "🔗 MMCA Seoul is a short walk from the Samcheong-dong end of the Hanok Villages walk on this site, so the two pair well on a dry morning and a wet afternoon.",
          ],
        },
      },
    ],
  },
  {
    id: 'busan',
    name: 'Busan',
    intro: [
      "Korea's second city, with about **3.3 million people**, a big port on the south-east coast and a different feel from Seoul: hills running down to the sea, beaches in the middle of the city, and a stronger local accent.",
      "**Haeundae** is the famous beach, **Gamcheon** the hillside culture village, **Jagalchi** the fish market. The KTX high-speed train from Seoul takes about two and a half hours.",
    ],
    image: 'busan.jpg',
    imageCredit: 'Photo: Busan Metropolitan City · KOGL 1',
    paths: [
      {
        id: 'cherry-blossom-walk',
        name: 'Cherry Blossom walk',
        seoTitle: 'Busan cherry blossom walks: 4 routes for March',
        seoDescription:
          'Four cherry blossom walks in Busan for late March: the Oncheoncheon stream, Namcheon-dong to Gwangalli, Dalmaji-gil and more. Free map with blossom pins.',
        duration: '1.5–3h each',
        updated: '2026-10-31',
        whyVisit: [
          "Busan blossoms a week before Seoul, in the last week of March, so this is where to be at the end of the month.",
          "**A 1 km tunnel of 40-year-old trees between apartment blocks**, a winding cherry road with the sea below it, and a levee above fields of yellow canola.",
          "Four walks across the city, all from a station, and **Dalmaji-gil is worth every step of the hill**.",
        ],
        story: {
          title: 'A hot spring, an apartment avenue and a levee',
          text: [
            "**Oncheoncheon** is named for the **Dongnae hot springs** beside it, used since the Silla era by record and turned into a resort with a tram line under Japanese rule. The stream itself was walled and neglected for decades before the city re-made its banks as a park in the 2000s.",
            "The tunnel of trees at **Namcheon-dong** was planted with the Samik Beach apartments around 1980, which is why they are called forty-year-old trees. **Dalmaji-gil** means moon-watching road: the pass above Haeundae where people went to see the moon rise over the sea.",
          ],
        },
        notices: [
          {
            icon: '🌸',
            title: 'Expected cherry blossom dates in Busan, spring 2027',
            body: "Busan opens about **a week before Seoul**. Forecasts put first bloom at 22–25 March in 2024–2026, against a normal of 28 March, with full bloom about a week later. For 2027 expect first bloom around **22–28 March** and full bloom **28 March – 4 April**. The official forecast comes out in early March; check it before you book.",
            since: 'Based on Korea Meteorological Administration data 2024–2026. Written October 2026; the 2027 forecast is not out yet.',
          },
        ],
        tags: [{ icon: 'blossom', label: 'Cherry blossom' }],
        image: 'cherry.jpg',
        imageCredit: 'Photo: Alexey Komarov · CC BY 3.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1_cT5HhnFhhBcEl_BPKPGmZRP33I163c',
        keywords: ['Busan', 'CherryBlossom', 'Oncheoncheon', 'Namcheondong', 'Gwangalli', 'Dalmajigil', 'Cheongsapo', 'NakdongRiver', 'KoreaTravel'],
        guide: {
          intro: [
            "🌸 Four walks, and every one of them starts at a station: the lit stream at Oncheoncheon, Namcheon-dong on a weekday morning before the crowds find it, Dalmaji-gil over the hill to Songjeong, or the levee at Samnak.",
            "Three are flat. Dalmaji-gil is 7.3 km and a proper hill, so ride the beach train one way if your legs would rather, and nobody will judge you.",
          ],
          route: [
            "Oncheoncheon stream, 4.2 km, from Oncheonjang Station: south past Dongnae to Sebyeong Bridge and the Citizens Park with the festival stage. Lit at night.",
            "Namcheon-dong to Gwangalli, 3.4 km, from Geumnyeonsan Station exit 3: a 1 km tunnel of 40-year-old trees between the Samik Beach apartment blocks, then the beach and the bridge light show.",
            "Dalmaji-gil to Songjeong, 7.3 km, from Jung-dong Station: Haeundae's east end at Mipo, the winding cherry road over the pass with the sea below, the Cheongsapo lighthouses and Songjeong Station.",
            "The Nakdong embankment, 2.4 km, from Gwaebeop-Renecite Station on the Gimhae light rail: the levee-top tunnel above Samnak Ecological Park, with canola fields below in April.",
          ],
          tips: [
            "⏰ Namcheon-dong is small and famous: **weekday mornings only**, unless you like crowds.",
            "🍜 On Dalmaji-gil the Blueline Park beach train and sky capsules run between Mipo and Cheongsapo if you want to ride one way. Cheongsapo does grilled clams.",
            "✈️ Samnak is 15 min from Gimhae Airport on the light rail, a good first or last stop of a trip.",
            "🍜 The Oncheoncheon festival weekend brings food stalls to the Citizens Park, and Dongnae's hot springs are a short walk from the start.",
          ],
        },
      },
      {
        id: 'haeundae-coast',
        name: 'Haeundae Coastal Path',
        seoTitle: 'Haeundae coastal walk: Dongbaek to Songjeong',
        seoDescription:
          'A 9.5 km Busan coast walk in three parts: Dongbaek Island, Haeundae Beach, the Blueline Park cliffs, Daritdol skywalk and Songjeong Beach. Free map.',
        duration: 'Half day',
        updated: '2026-10-31',
        image: 'haeundae.jpg',
        imageCredit: 'Photo: VN.NguyenDucDuy · CC BY-SA 4.0',
        liveCam: {
          videoId: 'NBZdNZYF1gI',
          caption: 'Live now at Songjeong Beach, where the walk ends. Stream: Ola Hotel Songjeong on YouTube.',
        },
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1gKDREXR2sVQ1HEIZyf-iAgOvJPGFgHY',
        whyVisit: [
          "Korea's most famous beach, with **a camellia island at one end and an old railway line along the cliffs** beyond it.",
          "A boardwalk round the APEC House with the Gwangan Bridge across the water, **sky capsules gliding beside the path**, twin lighthouses at Cheongsapo.",
          "9.5 km that splits into three, so stop wherever your legs give out and ride the beach train back.",
        ],
        story: {
          title: 'A scholar, a railway and a beach',
          text: [
            "**Haeundae** takes its name from **Choe Chi-won**, a Silla scholar of the 9th century whose pen name was Haeun; by tradition he carved the characters into a rock on Dongbaek Island, and a stone there still claims the spot.",
            "The cliff path is the **Donghae Nambu Line**, the coastal railway opened in the 1930s. The stretch from Mipo to Songjeong closed in 2013 when the line was moved inland, and the city made the old track a walkway, then added the beach train and sky capsules.",
          ],
        },
        notices: [
          {
            icon: '🚃',
            title: 'Blueline Park: Beach Train and Sky Capsule hours and fares',
            body: 'The **Beach Train** runs Mipo – Cheongsapo – Songjeong with seven stops, from **09:00** until 19:00 in winter (Nov–Feb), 19:30 in Mar, Apr and Oct, and 20:20 in May, Jun and Sep. The **Sky Capsule** runs Mipo – Cheongsapo only, from 08:30 until 18:00, 18:30 or 19:30 by the same seasons. Train: single ride about **₩10,000**, all-stops pass ₩16,000. Capsule: per cabin one way, about **₩35,000 for two**, ₩50,000 for four. Capsules sell out on weekends, so book ahead online; trains keep running in rain but stop in storms.',
            since: 'Haeundae Blueline Park published hours and fares, as reported in 2026; July and August run later. Info line 051-701-5548. Checked October 2026.',
          },
        ],
        keywords: ['Busan', 'Haeundae', 'DongbaekIsland', 'BluelinePark', 'SkyCapsule', 'Cheongsapo', 'Songjeong', 'CoastalWalk', 'KoreaTravel'],
        guide: {
          intro: [
            "🌊 Loop Dongbaek Island first, walk the full length of the beach to Mipo, then follow the cliff walkway to the lighthouses at Cheongsapo, and carry on to Songjeong if you still have the legs.",
            "It's three parts and half a day, flat the whole way, and the beach train runs beside you, so you can stop wherever you like and ride back.",
          ],
          route: [
            "Dongbaek Island, the camellia-covered headland at the west end of the beach: a boardwalk loop past the Nurimaru APEC House, the mermaid statue and the view of Gwangan Bridge.",
            "Haeundae Beach, the full length east to Mipo, with the towers of Marine City behind you.",
            "The Blueline Park walkway from Mipo, the old Donghae Nambu railway along the cliffs to Cheongsapo, about 2 km, with the beach train and the sky capsules running beside it.",
            "Cheongsapo's twin lighthouses and the Daritdol skywalk, then Songjeong Beach another 2.5 km on if you have the legs, or the train back to Mipo.",
          ],
          tips: [
            "⏰ Half a day at an easy pace. Sunset from Dongbaek Island, or **ride the sky capsule back from Cheongsapo at dusk**; book capsules ahead on busy weekends.",
            "🚇 Getting there: Haeundae Station (line 2), exit 3 or 5, 10 min to the beach. Dongbaek Island is to the right as you face the sea.",
            "👟 Flat throughout: the island loop is boardwalk, the Blueline path is paved.",
            "🌸 The Busan cherry blossom walk on this site covers the Dalmaji-gil hill above the same coast in blossom season.",
          ],
        },
      },
      {
        id: 'villages-and-hotspots',
        name: 'Culture Villages and Hotspots',
        seoTitle: 'Busan culture villages and Gwangalli night walk',
        seoDescription:
          "Busan's must-sees on one map: the Gwangalli night walk under the lit bridge, Gamcheon and Huinnyeoul villages, Nampo-dong markets, Haedong Yonggungsa, Beomeosa, the Dongbaek Island night views and the Songdo cloud bridge.",
        duration: '2h walk',
        updated: '2026-10-31',
        tags: [{ icon: 'moon', label: 'Night walk' }, { icon: 'hot', label: 'Hot place' }],
        whyVisit: [
          "A long beach with **a bridge lit in colour across the whole bay**, chicken and beer on the sand, and a fish market where you buy dinner downstairs and eat it on the steps.",
          "The rest of Busan people ask about is here too, from the pastel houses stacked down Gamcheon's valley to the temple on the rocks with 108 steps down to the sea.",
          "Saturday is the night, when **a thousand drones draw pictures over the water**.",
        ],
        story: {
          title: 'When Busan was the capital',
          text: [
            "For 1,023 days between 1950 and 1953, Busan was Korea's wartime capital. Refugees from all over the peninsula arrived with almost nothing and built wherever the land was free, which here meant the steep slopes and cliffs above the harbour.",
            "**Huinnyeoul** was a small fishing village on Yeongdo's coast until refugees settled along its cliffs and it became a crowded, poor settlement. **Gamcheon**, on the other side of the harbour, grew from a community of Taegeukdo believers who settled there in the 1950s. Both were poor places until residents and artists began repairing and painting the houses, around 2009 to 2011. Those are the culture villages on this map.",
          ],
        },
        image: 'gamcheon.jpg',
        imageCredit: 'Photo: Basile Morin · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=11Nm3BTkYHgR9W5t2oMYbhGo-tN8Tg0k',
        keywords: ['Busan', 'Gwangalli', 'GwanganBridge', 'DroneShow', 'Jagalchi', 'BIFFSquare', 'GukjeMarket', 'Gamcheon', 'Huinnyeoul', 'Yonggungsa', 'NightMarket', 'BusanChinatown', 'DongbaekIsland', 'NurimaruAPECHouse', 'TheBay101', 'Beomeosa', 'SongdoCloudBridge', 'Seokbulsa', 'Orangdae', 'JukseongChurch', 'KoreaTravel'],
        notices: [
          {
            icon: '🌃',
            title: 'Starry Sea Busan Night Market: seasonal, 2026 dates have ended',
            body: "The night market in the lotus complex of **Hwamyeong Eco Park** runs in seasons, not all year. In 2026 it ran **10–14 June** and **26 September to 18 October**, Thursday to Saturday 17:00–22:00 and Sunday 16:00–21:00. **Both 2026 seasons are over** and the next dates are not announced, so check [Visit Busan](https://www.visitbusan.net/v/7DND) or the organiser's Instagram @starrynightbusan before planning around it.",
            since: 'Visit Busan event page and Busan city press releases. Checked 25 October 2026.',
          },
          {
            icon: '🚁',
            title: 'Gwangalli drone show: every Saturday, twice',
            body: 'The **Gwangalli M Drone Light Show** flies over the beach **every Saturday**, about 12 minutes, free. **March to September at 20:00 and 22:00; October to February at 19:00 and 21:00.** Best seen from the middle of the beach or Millak Waterfront Park. Cancelled in rain or strong wind, usually announced the day before.',
            since: 'Busan city schedule for the permanent show, July 2026 to June 2027. Checked October 2026.',
          },
        ],
        guide: {
          intro: [
            "🌉 This is the Busan evening I send everyone to. Ten minutes from the station to the beach with the bridge ahead of you, then east along the sand to the fish market at Millak for dinner under the bridge.",
            "The walk itself is 2.9 km, flat, about two hours. Everything else on this page is its own half-day by metro or bus. A weeknight gets you the market quieter and cheaper.",
          ],
          route: [
            "Gwangalli Beach, from Gwangan Station exit 3: the 7.4 km Gwangan Bridge, finished at the end of 2002, lights up the whole bay at night.",
            "Millak raw-fish town at the east end of the beach: buy a fish in the fishermen's market downstairs, then eat upstairs for a table fee or carry it to Millak Waterfront Park, right under the bridge.",
            "Nampo-dong, line 1 to Jagalchi: the fish market hall and quay stalls, then the arcades of Gukje and Kkangtong markets. Gukje grew from a street market after liberation, and in the Korean War refugees sold US army supplies there; Kkangtong, 'tin can', is named for them.",
            "BIFF Square, made when the film festival began in 1996 and now the home of the hotteok carts, and the escalators up Yongdusan Park to Busan Tower. The park was re-made after a great fire in 1954.",
            "Busan Chinatown, in front of Busan Station: Korean sources trace it to 1884, when a Qing consulate opened in Choryang and merchants settled around it; part of it became Texas Street after the war.",
            "Also at Busan Station and Choryang: Anmok Busan Station for pork gukbap (rice soup), and Ochoryang, a tea house and small gallery in a wooden Japanese-style house built in 1925, five minutes from Choryang Station exits 7 and 9.",
            "Huinnyeoul Culture Village, bus 7, 71 or 508 from Nampo-dong: 'white rapids' is named for the foam where streams from Bongnae Mountain meet the sea, and the white houses and murals on the cliff lane are from the 2010s revival.",
            "Gamcheon Culture Village, bus 1-1, 2 or 2-2 from Toseong Station exit 6: pastel houses stacked down a steep valley, painted by a public art project that began in 2009. Buy the stamp map at the information centre and follow the fish signs.",
            "Haedong Yonggungsa, bus 181 from Haeundae Station, about 40 minutes: 108 steps down to the temple on the rocks. By its own history the temple dates to 1376, burned in the Imjin War, was rebuilt in the 1930s and took its present name in 1974.",
            "Dongbaek Island, Haeundae Station exit 3 or 5: a boardwalk loop around the camellia-covered headland, past the mermaid statue to Nurimaru APEC House on the southern tip, built for the 2005 APEC summit and shaped like a traditional pavilion.",
            "Two more stops sit away from the rest: Anmok Seomyeon, the same pork gukbap house in Seomyeon, and the Starry Sea Busan Night Market at Hwamyeong Eco Park in the north, which only opens in season (see the notice above the map).",
            "Further afield, five more places for a day with a car or a longer metro ride: **Beomeosa**, one of Korea's great mountain temples, founded in 678 on the slopes of Geumjeongsan, with a stone-pillared gate and pagoda that are both national Treasures; the Songdo cloud bridge; the cliff shrine at Seokbulsa; and Orangdae and Jukseong church in Gijang.",
          ],
          tips: [
            "⏰ The drone show is on **Saturday night**, at 20:00 or 19:00 by season, with the bridge lights on the hour after it. Weeknights are calmer and the fish market cheaper. Dongbaek Island and The Bay 101 are their own after-dark stop, any night.",
            "🚇 Gwangan Station (line 2) for the walk; Jagalchi and Nampo stations (line 1) for the markets; Toseong Station (line 1) for the Gamcheon bus; Haeundae Station (line 2) for the Yonggungsa bus and for Dongbaek Island.",
            "🍜 The fish-market system: buy downstairs, then a table fee upstairs covers side dishes and soup; take-away to the park is free. At BIFF Square the seed hotteok queue moves fast.",
            "🍲 Pork gukbap is Busan's classic bowl, and Anmok has two branches: near Busan Station (open from 11:00 on weekdays, 10:00 at weekends) and in Seomyeon (from 10:00 on weekdays, 09:00 at weekends). Hours as listed on Naver Map on 25 October 2026.",
            "🔗 Korea's oldest China Town is in Incheon, an hour from Seoul, with its own walk on this site.",
            "👟 Gwangalli and Nampo-dong are flat. Gamcheon and Huinnyeoul are stairs and slopes; Yonggungsa is 108 steps each way.",
            "🔗 The Haeundae Coastal Path on this site is two stops away from Gwangalli and makes the next morning.",
            "🚇 The further-afield places are not a walking day together: Beomeosa Station (line 1) for the temple, Songdo for the cloud bridge (bus from Nampo-dong), Mandeok Station (line 3) for Seokbulsa, and Orangdae and Jukseong in Gijang are easiest by car or taxi from Haeundae.",
          ],
        },
      },
      {
        id: 'indoor-activity',
        name: 'Indoors Trip',
        seoTitle: 'Busan rainy day: indoor places on one map',
        seoDescription:
          'Busan under a roof: museums at Yeongdo, Gijang and Dongnae, Busan Tower and X the Sky, Centum and Gwangalli spas, a character café and the Blueline beach train.',
        duration: 'Full day',
        updated: '2026-10-31',
        tags: [{ icon: 'rainy', label: 'Rainy day' }],
        whyVisit: [
          "A rainy day in Busan with **a jjimjilbang on the beach, a 1929 bank turned history museum and Korea's tallest observation deck** all under a roof.",
          "A wire-rope factory that became a bookshop and brewery, a Gaya-era tomb cluster you walk over, and a beach train that runs in any weather.",
          "Spread across the city by type, so pick the cluster nearest your bed.",
        ],
        story: {
          title: 'Busan\'s twentieth century, under one roof',
          text: [
            "The city's two best indoor museums are old buildings themselves. The **Modern & Contemporary History Museum** fills the 1929 Busan branch of the Oriental Development Company, the colonial land firm, later the American Cultural Center that students occupied in protest in 1982.",
            "**F1963** was a wire-rope factory from 1963, when Busan made the steel cable for the country's bridges and ships; the company kept the shell and turned it into a bookshop, brewery and gallery in 2016. **Busan Tower** dates from 1973, the harbour city's first landmark.",
          ],
        },
        notices: [
          {
            icon: '🆓',
            title: 'Which museums are free',
            body: 'Busan Museum, Bokcheon Museum, the National Maritime Museum of Korea, the Fishing Village Folk Museum and the Modern & Contemporary History Museum charge **nothing**. The science museum is paid: ₩3,000 adult / ₩2,000 teen for the permanent hall, free under 7. Memory Treasure Island lists from about ₩2,500 on ticket sites; the adult price is not published, so check at the door.',
            since: 'Checked 30 October 2026.',
          },
          {
            icon: '💰',
            title: 'Spa, tower and experience prices',
            body: 'Heosimcheong ₩15,000 weekday / ₩18,000 weekend; Centum Spa Land about ₩17,000–18,000; Club D Oasis from ₩30,000 (spa only) to ₩69,000 (full water park + spa); Hotel Aquapalace varies by bundle, phone ahead. Busan Tower about ₩8,000–8,500; Busan X the Sky from about ₩23,000 online; the Blueline beach train ₩8,000–10,000 a ride or ₩16,000 for an all-stations pass; 4233 Mind Center sells as a two-person ticket, about ₩50,000 for two. F1963, the Hello Kitty café and the museums above have no separate entrance beyond what is listed.',
            since: 'Resale/ticket-site and official prices as found in late October 2026; most change by season, check before you book.',
          },
        ],
        image: 'busan-indoor.jpg',
        imageCredit: 'Photo: HappyMidnight · CC BY-SA 3.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1oQUMXW3eqC7zXTSijNX2mwYpDZYxkRM',
        keywords: ['Busan', 'RainyDayInBusan', 'BusanMuseums', 'BusanTower', 'XTheSky', 'CentumSpaLand', 'Heosimcheong', 'F1963', 'Jjimjilbang', 'KoreaTravel'],
        guide: {
          intro: [
            "☔ When Busan rains, stay near your bed and pick that cluster. Centum and Gwangalli have the spas and the tallest deck, Nam-gu and Jung-gu have the museums and Busan Tower, and Dongnae has the hot springs.",
            "Treat it as the wet-weather backup to the rest of Busan, one cluster a day.",
          ],
          route: [
            "Museums: Busan Museum in Nam-gu's UN Peace Park, Bokcheon Museum over an excavated Gaya-era tomb cluster in Dongnae, the National Maritime Museum of Korea and the free Busan Modern & Contemporary History Museum in a 1929 former bank building, the Busan Fishing Village Folk Museum by the Nakdong estuary, the hands-on Busan National Science Museum out in Gijang, and Memory Treasure Island, a paid 1970s–90s nostalgia collection near Gukje Market.",
            "Spas, saunas & water parks: Centum Spa Land, a big jjimjilbang inside Shinsegae Centum City department store; Club D Oasis Spa & Waterpark in the LCT tower at Haeundae; Hotel Aquapalace's jjimjilbang right on Gwangalli beach with an infinity pool facing the bridge; and Heosimcheong, one of Busan's oldest hot-spring bathhouses at Dongnae, with a craft-beer taproom downstairs.",
            "Cafés, characters & culture: F1963, a 1963 wire-rope factory turned bookstore-café, brewery and gallery complex; Hello Kitty Apple Cafe in Centum City; and 4233 Mind Center, a calming light-and-sound exhibition space near Gwangalli.",
            "Towers & scenic train: Busan Tower's 1973 indoor observation deck over Yongdusan Park and the harbour; Busan X the Sky, Korea's tallest observation deck on floors 98–100 of LCT Landmark Tower; and the Haeundae Blueline beach train from Mipo, a sheltered, sit-down way to see the coast between Haeundae and Songjeong.",
          ],
          tips: [
            "🚇 Spread by district: Nam-gu and Jung-gu for the Busan Museum, Busan Tower and Memory Treasure Island; Yeongdo for the maritime museum; Dongnae for Bokcheon Museum and Heosimcheong; Haeundae/Centum/Gwangalli for the spas, X the Sky, F1963 and the cafés; Gijang for the science museum.",
            "♨️ A jjimjilbang is the Korean bathhouse: separate bathing areas for men and women, then shared heated rooms where everyone wears the clothes provided. Check each place's current hours and prices on Naver before going, they change by season.",
            "🎟️ See the price notices above the map for what's free and what each paid spot costs; booking apps (NOL, Waug, Klook) are usually a bit cheaper than paying at the counter for the spas, towers and X the Sky.",
            "🔗 The Culture Villages and Hotspots walk on this site covers Busan Tower's Yongdusan Park escalators and the Gwangalli night walk in more detail; this page is the wet-weather backup for the same areas.",
          ],
        },
      },
    ],
  },
  {
    id: 'jeju',
    name: 'Jeju',
    intro: [
      "A volcanic island off the south coast and a province of its own, about an hour's flight from Seoul. **Hallasan**, at 1,947 m the highest mountain in South Korea, rises in the middle, and the island's volcanic landscape and lava tubes are a UNESCO World Natural Heritage site.",
      "The **Olle trails** loop around the coast and through villages for more than 400 km. Public buses are slow and sparse, so many visitors rent a car.",
    ],
    seoTitle: 'Jeju walking trails: Olle routes with maps',
    seoDescription: 'Free Jeju walking trails: Olle Trail routes 1, 1-1, 5, 6, 7, 17 and 18-1 on Google My Maps, with toilets, stamp boxes, restaurants and cafés pinned.',
    image: 'jeju.jpg',
    imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
    paths: [
      {
        id: 'jeju-olle-trail',
        name: 'Jeju Olle Trail 5-6-7',
        seoTitle: 'Jeju Olle Trail routes 5, 6, 7: south coast',
        seoDescription: 'Walk Jeju Olle Trail routes 5, 6 and 7 along the south coast, Namwon to Seogwipo, one colour per route, with every toilet and first-aid kit on a free map.',
        duration: '1 day per route',
        updated: '2026-10-31',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'olle.jpg',
        imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
        whyVisit: [
          "**Korea's answer to the Camino** runs 437 km around the island, and these three routes are its warm south coast through Seogwipo.",
          "Cliff paths, **a camellia forest that flowers in winter**, and Seogwipo's market at the end for black pork and the famous gimbap.",
          "One route a day, stamps at start, middle and end, and the blue horse signs show the way.",
        ],
        story: {
          title: 'A journalist\'s idea',
          text: [
            "The **Olle** was started by **Suh Myung-sook**, a Jeju-born journalist who walked the Camino de Santiago in 2006 and came home wanting the same for her island. Route 1 opened in September 2007; the trail now circles Jeju in 27 routes.",
            "Olle is the Jeju word for the narrow lane from a house to the road. The south-coast routes here run through **Seogwipo**, the warm side of the island, past the sea cliffs that have drawn painters and poets since the exiled scholars of Joseon were sent here.",
          ],
        },
        notices: [
          {
            icon: '📒',
            title: "Olle passport and the Tourist Center",
            body: "The **Olle passport** for the stamps costs **₩20,000**, printed or in the Olle Pass app, sold at the **Jeju Olle Tourist Center** (end of route 6, start of route 7), the official information desks and the online Olle store. The centre is open **daily 08:00–21:30**; completion certificates are issued **14:00–16:30**.",
            since: "Jeju Olle passport page and Naver Map. Checked 29 October 2026.",
          },
          {
            icon: '💧',
            title: "Jeongbang Falls on route 6: ticket and last entry",
            body: "The route passes the falls' information centre; the waterfall itself is a paid side visit: **adult ₩2,000**, youth and child ₩1,000, open **09:00–17:50** (it follows sunset), **last entry 17:30**, closed in bad weather.",
            since: "Seogwipo City e-ticket site. Checked 29 October 2026.",
          },
          {
            icon: '🍊',
            title: "Seogwipo Maeil Olle Market hours",
            body: "The market at the end of route 6 is open **daily 07:00–21:00** (some listings say 20:00). The food stalls are busiest from late afternoon.",
            since: "Naver Map, checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1KEy42fnL8YeGcNgyhB_9PVreKLgwiTM',
        keywords: ['Jeju', 'JejuOlle', 'OlleTrail', 'Seogwipo', 'Oedolgae', 'Soesokkak', 'JejuHiking', 'Camellia', 'KoreaTravel'],
        guide: {
          intro: [
            "🥾 Make Seogwipo your base and walk **one route a day**. Route 5 follows the cliffs and the camellias, route 6 is the easiest and ends in the market, and route 7, the most popular, passes Oedolgae on the way to the bus terminal.",
            "Buy the Olle passport for the stamps, and follow the blue-and-orange ribbons and the little blue horse signs. Carry water and a hat; there's very little between the villages.",
          ],
          route: [
            "Route 5, Namwon Port to Soesokkak Bridge, 13.4 km: the Keun-ung cliff path, the Wimi camellia habitat (stamp), a 2.4 km wheelchair-accessible section between Taeutgae and Secheon Port, and the basalt shore at Neopbille, ending at the Soesokkak gorge.",
            "Route 6, Soesokkak to the Jeju Olle Tourist Center in Seogwipo, 10.1 km: Jejigi Oreum, the Socheonji tidal pool, the Seogwijinseong fortress walls and the Lee Jung-seop art street into Seogwipo Maeil Olle Market. The easiest of the three.",
            "Route 7, Seogwipo to the Bus Terminal, 12.9 km: Sammaebong, the Hill of Storm and the Oedolgae sea stack, the shore pathways to Beophwan, then Dumeonimul Park (stamp) and the terminal. The most popular route on the island.",
          ],
          tips: [
            "🚇 Getting there: buses from Jeju Airport to Seogwipo take a little over an hour. Namwon Port is 30 min by bus east of Seogwipo, and the route 7 finish is at the terminal with buses back to Jeju City and the airport.",
            "📒 Buy the Olle passport at the Tourist Center for the stamps; each route has one at the start, middle and end.",
            "💧 Sun, wind and few shops between villages: a hat, water and a packed lunch. Check the Olle Foundation's site for route diversions before you set out.",
            "🍜 Seogwipo market at the end of route 6 is the food stop: black pork, hallabong tangerines and the famous market gimbap.",
            "🌺 The camellias on route 5 flower from December to February; spring and late autumn are the most comfortable walking weather.",
          ],
        },
      },
      {
        id: 'jeju-olle-trail-18-1',
        name: 'Jeju Olle Trail 18.1 (Chuja Island)',
        seoTitle: 'Jeju Olle Trail 18-1 on Chuja Island',
        seoDescription: 'Olle Trail route 18-1 on Chuja Island, 11.4 km over Bonggeulle-san and round the Yecho-ri cliffs, with stamp boxes, toilets, restaurants and cafés mapped.',
        duration: '1 day',
        updated: '2026-10-31',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'chuja.jpg',
        imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=18nFqcdb_XV4pLVvRxrVMiNVNSC3nYmM',
        keywords: ['Jeju', 'ChujaIsland', 'Chujado', 'JejuOlle', 'OlleTrail18', 'IslandHiking', 'Dondaesan', 'JejuFerry', 'KoreaTravel'],
        whyVisit: [
          "**Forty-two islands, 1,700 people and almost no cars**, an hour north of Jeju by ferry: the Olle trail's one outlier.",
          "Two climbs, a bridge between the two inhabited islands, and from Dondae-san **the whole archipelago below you** with Hallasan on the horizon.",
          "11.4 km that fits between the morning boat and the evening one, or stay the night and make it a holiday.",
        ],
        story: {
          title: 'An island of exiles and anchovies',
          text: [
            "**Chuja** has long been a place people were sent or washed up. The shrine on route 18-1 is to **General Choe Yeong**, who sheltered here in 1374 on his way to put down a rebellion on Jeju.",
            "In 1801, during the persecution of Catholics, the infant son of the martyr Hwang Sa-yeong was exiled to Chuja and raised by islanders; the grave of **Hwang Gyeong-han** on the east coast is his. The islands' fame today is their salted **anchovy**, and the boats you see are the fleet that catches it.",
          ],
        },
        notices: [
          {
            icon: '⛴️',
            title: 'Getting to Chuja: ferries and the island day',
            body: 'Chuja is **about one hour by ferry from Jeju Port** and is also served from Wando and Haenam on the mainland. Ferries are cancelled in high wind, so **check the sailing the evening before** and carry a day\'s margin if you have a flight. The route starts at the township office, 5 min from the pier, and ends at Sinyang Port on Lower Chuja, where the return ferry calls.',
            since: 'General ferry pattern; timetables change by season and operator. Checked October 2026.',
          },
        ],
        guide: {
          intro: [
            "🏝️ Take the morning boat from Jeju Port, walk the 11.4 km over Bonggeulle-san, across the bridge and up Dondae-san, round the Yecho-ri cliffs to Sinyang Port, and catch the evening boat home.",
            "That's five to six hours with stops, which fits the day ferry nicely. Have the grilled croaker by the pier before you set off; you'll be glad of it on the second climb.",
          ],
          route: [
            "Chuja-myeon Office, five minutes from the ferry pier: start stamp, toilets and the Olle information desk. The path climbs behind the village past the shrine of General Choe Yeong to Bonggeulle-san at the island's north-west tip.",
            "Sunhyogak and Chuja Cheosagak on the way to the lighthouse road, then Chuja Bridge across to Lower Chuja and the rest area at its far end.",
            "Dondae-san, 164 m, the highest point of the islands and the mid-route stamp. Hallasan shows on a clear day.",
            "Yecho-ri: the tiny Sinyang branch school, the port, the cliff path and the grave of Hwang Gyeong-han, the martyr's infant son raised by islanders in 1801.",
            "Sinyang Port: end stamp, toilets in the ferry waiting room, and the harbour café for the wait.",
          ],
          tips: [
            "⛴️ Ferries from Jeju Port take about an hour; the day boat gives roughly six hours on the island, which is enough for the route at a steady pace. Staying a night in Sinyang or Daeseo-ri makes it a holiday.",
            "🍜 Eat by the pier before you start or at Sinyang at the end: grilled croaker and anchovy tables near the terminal, raw fish and a café on the hill above Sinyang Port.",
            "👟 Two proper climbs, Bonggeulle-san and Dondae-san, and exposed cliff paths on the east side. Trail shoes, sun cover and a wind layer; the island is windier than Jeju.",
            "🔗 Routes 5, 6 and 7 on this site cover the south coast of the main island if you want more Olle.",
          ],
        },
      },
      {
        id: 'jeju-olle-trail-17',
        name: 'Jeju Olle Trail 17',
        seoTitle: 'Jeju Olle Trail 17: Gwangnyeong to Jeju City',
        seoDescription: 'Olle Trail route 17, 19 km from Gwangnyeong to Jeju City: Musucheon gorge, Dodu-bong and Dongmun Market, with stamps, toilets and cafés mapped.',
        duration: '1 day',
        updated: '2026-10-31',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'olle17.jpg',
        imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
        whyVisit: [
          "Walk this one on your last day. It ends ten minutes from the market and the airport bus.",
          "Down a stream gorge to the sea under old pines, along a beach with horse-shaped lighthouses, then a hill where **the planes land right beside you**.",
          "19 km, almost all flat, finishing at **Dragon Head Rock, a cloud bridge** and Jeju's oldest building.",
        ],
        story: {
          title: 'The old city at the end of the walk',
          text: [
            "Route 17 ends where Jeju's government did: **Gwandeokjeong**, built in 1448 as a training hall, is the island's oldest standing building, and the restored **Mokgwana** beside it was the Joseon magistrate's office.",
            "The end stamp is at the hall of **Kim Man-deok** (1739–1812), a merchant woman who spent her fortune on grain for the island during the famine of 1795 and was honoured by the king for it. Dongmun Market, five minutes on, is the city's oldest, dating in some form to 1945.",
          ],
        },
        notices: [
          {
            icon: '🏁',
            title: "End stamp: Kim Man-deok Memorial Hall closes on Mondays",
            body: "The hall with the end stamp is **free**, open **09:00–18:00**, and **closed every Monday** (the next weekday when Monday is a holiday). The stamp box is outside, so you can still stamp on a Monday, but the exhibition is shut.",
            since: "Naver Map and the Ministry of Culture event listing, tel. 064-759-6095. Checked 29 October 2026.",
          },
          {
            icon: '🏯',
            title: "Jeju Mokgwana: ticket for the restored offices, Gwandeokjeong is free",
            body: "**Gwandeokjeong** pavilion stands in an open plaza and costs nothing. The restored **Jeju Mokgwana** offices behind it are **₩1,500**, open **09:00–18:00** daily, last ticket 17:30. Some years it opens free in the evenings from May to October; not confirmed for 2026.",
            since: "Visit Jeju and Naver Map, tel. 064-710-6717. Checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1cMhDeaaSQ67KAfCaduH2pO01t-d9Rt0',
        keywords: ['Jeju', 'JejuOlle', 'OlleTrail17', 'Yongduam', 'IhoBeach', 'Dodubong', 'JejuCity', 'DongmunMarket', 'KoreaTravel'],
        guide: {
          intro: [
            "🌊 I like this one for the contrast. A quiet river gorge in the morning, the beach at Iho Tewoo for lunch, **Dodu-bong in the mid-afternoon** with the runway at your feet, and **Yongduam at sunset** before the end stamp in the old town.",
            "It's six to seven hours and almost all flat; the only climb is 65 m Dodu-bong, and that turns out to be the best viewpoint of the day.",
          ],
          route: [
            "Gwangnyeong Elementary, the start: stamp and information desk at the kids' book café opposite, then the Musucheon gorge and the stream path past Chang-o Bridge.",
            "Oedo Woldae, where the stream meets the sea under old pines: the first toilets and first-aid kit, and the first bakery café. Then Hyeonsa Port and Iho Tewoo Beach with its horse-shaped lighthouses.",
            "Dodu: the painted Memory Lane, the harbour with its noodle houses and the big milk-tea café, then Dodu-bong for Hallasan behind and the airport runway at your feet.",
            "Eoyeong Park, the mid-route stamp, toilets and first-aid kit, then the Yongdam seafront: Leports Park, Sunset Hill and the long line of coast-road cafés.",
            "Yongduam, the Dragon Head Rock, and the Yongyeon Cloud Bridge over the gorge, then Gwandeokjeong, Jeju's oldest building, and the restored Mokgwana.",
            "The Kim Man-deok Memorial Hall, the end stamp. Dongmun Market, pork noodles and the airport bus are five minutes away.",
          ],
          tips: [
            "🌙 The rocks at Yongduam and the cloud bridge are **lit after dark**.",
            "🚌 Getting there: bus from Jeju City to the Gwangnyeong 1-ri stop, about 30 minutes; the start is a short walk. The finish is in the old town with buses and taxis everywhere.",
            "🍜 The gorge section has nothing, so eat at the start or carry a snack. After Oedo there is food every few kilometres: noodles at Dodu, mackerel on the Yongdam coast, bracken hangover soup near Gwandeokjeong, pork noodles in Dongmun Market.",
            "✂️ Shorter: start at Iho Tewoo Beach (bus from the city) and walk the 10 km coast to the finish, which keeps every viewpoint and all the cafés.",
            "🔗 Routes 5, 6 and 7 cover the south coast, and 18.1 is the ferry day out to Chuja Island.",
          ],
        },
      },
      {
        id: 'jeju-olle-trail-1-udo',
        name: 'Jeju Olle Trail 1-1.1 (Udo Island)',
        seoTitle: 'Jeju Olle Trail 1 and 1-1: Seongsan, Udo',
        seoDescription: 'Olle Trail route 1 (14.9 km, Siheung-ri to Gwangchigi Beach) and the 11.3 km Udo island loop 1-1 on one free map, with stamps, toilets and cafés.',
        duration: '1 day each',
        updated: '2026-10-31',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'udo.jpg',
        imageCredit: 'Photo: Jeju Film Commission · KOGL 1',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1RGT7_JFASnnB4euajgRTSGrM7CVMjC0',
        keywords: ['Jeju', 'JejuOlle', 'OlleTrail1', 'UdoIsland', 'Udo', 'Seongsan', 'Gwangchigi', 'SeobinBaeksa', 'KoreaTravel'],
        whyVisit: [
          "**Where the whole Olle trail began in 2007**, and the view from its first hill takes in Seongsan's sunrise peak and the cow-shaped island beyond.",
          "Udo is a 15-minute ferry away, with coral-sand beaches, a lighthouse on its one hill and **peanut ice cream at the ports**.",
          "Two routes, two easy days, a night in Seongsan between them.",
        ],
        story: {
          title: 'Where the trail began, and the women who dive',
          text: [
            "**Route 1** was the first Olle route, opened in September 2007 from Siheung-ri, and the view from Malmi Oreum over Seongsan Ilchulbong is the image the whole trail was built around.",
            "Both routes pass the houses of the **haenyeo**, the women who free-dive for shellfish and seaweed, a tradition UNESCO listed in 2016. **Udo** has one of the island's oldest diving communities, and the beacon mound at Osopo is a reminder that this coast once watched for Japanese raiders.",
          ],
        },
        notices: [
          {
            icon: '⛴️',
            title: 'Udo ferry from Seongsan Port: times and tickets',
            body: 'Ferries run **every 30 minutes** from Seongsan Port to Cheonjin or Hau-mokdong Port, 15 minutes across. First boat out about **08:00**, first boat back from Udo about 07:00. **Last boat back 18:30 in summer, about 17:00 from November to February.** Adult return fare about ₩11,000 including the park fee; fill in two boarding forms, one each way, with your ID. Boats stop in high wind, so check on the day: Seongsan office 064-782-5671.',
            since: 'Seongsan–Udo ferry pattern for 2026 from operator and traveller reports; confirm the last boat on the day. Checked October 2026.',
          },
        ],
        guide: {
          intro: [
            "🐄 Day one is Route 1: up Malmi Oreum for the view of Seongsan and Udo together, then along the shore to the black sand at Gwangchigi. Sleep in Seongsan.",
            "Day two is Route 1-1: the 15-minute ferry to Udo and the 11.3 km loop of the island. **Start by noon**, or the last boat back becomes a worry rather than a plan.",
          ],
          route: [
            "Route 1 start, the Siheung-ri bus stop: start stamp and the Olle information desk at the foot of Malmi Oreum. Malmi and Al oreums give the Seongsan and Udo panorama, and Jongdal-ri below has its old salt fields.",
            "The Jongdal coast: Mokhwa rest stop with the mid-route stamp, the Siheung and Ojo haenyeo diving-women's houses, the Osopo beacon mound and the Seongsan floodgate. A 2.4 km stretch from the old salt fields to the floodgate is wheelchair accessible.",
            "Seongsan: Yongcheon Park at the harbour, the bay below Ilchulbong, the April 3rd memorial at Teojinmok, and the end stamp at Gwangchigi Beach, where the sunrise peak stands straight across the water.",
            "Route 1-1 start, Cheonjin Port on Udo, by ferry from Seongsan Port: start stamp at the pier, then the Hundertwasser Park and the lighthouse on Udobong, the island's one hill, and the Ttitti-ppangppang viewpoint on the east coast.",
            "Hagosudong Beach on the north-east coast: mid-route stamp in front of the noodle house. Then the Papyeong Yun family park and Hau-mokdong Port, the alternative start and end.",
            "The west coast back to Cheonjin: Dokseng-i Koji and the white coral-sand beach of Seobin Baeksa.",
          ],
          tips: [
            "🚌 Getting there: bus 201 from Jeju City or Seogwipo to the Siheung-ri stop, about 1.5 hours. Ferries to Udo leave Seongsan Port every 30 minutes from early morning; the last boat back is around 17:00 to 18:00 depending on season, so start the loop by noon.",
            "🍜 Udo is famous for peanuts: peanut ice cream and peanut makgeolli at the ports, grilled seafood and abalone porridge at Hagosudong. On Route 1, the haenyeo houses on the coast sell the divers' own catch.",
            "👟 Both routes are easy; the two oreums on Route 1 and Udobong on 1-1 are short climbs. Wind is the thing: carry a layer, and in summer a hat, the island loop has little shade.",
            "✂️ Shorter: many people walk only the Udo loop, or do Route 1 as far as the Mokhwa rest stop and bus back. The two routes together make a comfortable two-day start with a night in Seongsan.",
            "🔗 Routes 5, 6 and 7, 17 and 18.1 are also on this site for the rest of the island.",
          ],
        },
      },
    ],
  },
  {
    id: 'incheon',
    name: 'Incheon',
    intro: [
      "Korea's third-largest city, on the west coast next to Seoul, and the home of **Incheon International Airport**, which is why it is most visitors' first stop. The subway and the airport railway link it to Seoul.",
      "Its port opened to foreign ships in 1883, which left Korea's first **China Town** and old harbour streets. The city also covers islands such as **Ganghwa-do**, **Wolmido** and the airport island of Yeongjong.",
    ],
    image: 'incheon.jpg',
    imageCredit: 'Photo: Cameron Henderson · Public domain',
    paths: [
      {
        id: 'china-town',
        name: 'Incheon China Town',
        seoTitle: 'Incheon China Town walk: lanterns and murals',
        seoDescription:
          "Korea's oldest China Town, 2 minutes from Incheon Station: the lantern street, Songwol-dong Fairy Tale Village, the Japanese-style street and murals.",
        duration: '2–3h',
        updated: '2026-10-31',
        tags: [{ icon: 'village', label: 'Old town' }],
        image: 'chinatown.jpg',
        imageCredit: 'Photo: Mobius6 · CC BY-SA 4.0',
        whyVisit: [
          "Korea's oldest China Town, one hour from Seoul Station and two minutes from the subway exit, **under a street of red lanterns**.",
          "You eat your way uphill, from wood-fired mandu at the shop with the always-long queue to the **jajangmyeon that was invented here**.",
          "Then a village painted with Pinocchio and the Little Prince, 77 mural panels down one lane, and an 1880s stair where Chinese lanterns face Japanese wooden façades.",
          "Stay for the lanterns after dark, or walk on to Wolmido for the sunset.",
        ],
        story: {
          title: 'The port that opened Korea',
          text: [
            "**Incheon** was forced open to foreign trade in 1883, and the hill above the port was divided into concessions. The Chinese one, settled by merchants from Shandong, became this China Town; the Japanese one is the street of old bank buildings next to it.",
            "**Jajangmyeon**, the black-bean noodle dish, is usually traced to the Chinese dockworkers' kitchens here around 1905, and **Gonghwachun**, opened in 1908, is credited with putting it on a restaurant menu; its building is now the Jajangmyeon Museum.",
          ],
        },
        notices: [
          {
            icon: '🏛️',
            title: "The museums close on Mondays",
            body: "The **Jajangmyeon Museum**, the **Incheon Open Port Museum**, the **Modern Architecture Exhibition Hall** and **Incheon Citizens' House** are all **closed on Mondays** (the next day when Monday is a holiday), and on 1 January and the Seollal and Chuseok days. Hours **09:00–18:00**, last entry 17:30 (Citizens' House 09:30–17:30). The Fairy Tale Village and the streets are open at all hours.",
            since: "Naver Map and the Jemulpo Cultural Foundation. Checked 29 October 2026.",
          },
          {
            icon: '🎟️',
            title: "Museum tickets and the combined pass",
            body: "**Jajangmyeon Museum** adult ₩1,000, youth ₩700, children and over-65 free. **Open Port Museum** and **Modern Architecture Exhibition Hall** adult ₩500, youth ₩300. A **combined ticket** for the five old-town museums (these three plus the Daebul Hotel exhibition and the Korean-Chinese Cultural Center) is **adult ₩3,400**, youth ₩2,300.",
            since: "Ministry of Culture listing and the Jemulpo Cultural Foundation fee table. Checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1RoZet4u2GSJ8N6XbSHqcuN0xW6vYEXA',
        keywords: ['Incheon', 'Chinatown', 'Jajangmyeon', 'FairyTaleVillage', 'OpenPort', 'DayTripFromSeoul', 'Songwoldong', 'IncheonStation', 'KoreaTravel'],
        guide: {
          intro: [
            "🥟 Take the subway out in the morning and **eat your way up the hill** under the lanterns, loop the Fairy Tale Village, then come down the mural lane into the Japanese quarter. You'll be back in Seoul for dinner, if you still want one.",
            "Everything is within one kilometre of Incheon Station, so two to three hours with a meal is plenty.",
          ],
          route: [
            "Incheon Station and the 1st Paeru gate, the red gate across the plaza, with Chinatown-ro climbing under the lanterns behind it.",
            "The main street: the Jajangmyeon Museum in the old Gonghwachun building, the small Uiseondang temple and the big restaurants. Lanes 51, 55 and 59 run parallel and are quieter.",
            "The 3rd Paeru gate at the top of the hill, where the Chu-Han mural street climbs towards Jayu Park.",
            "Songwol-dong Fairy Tale Village, five minutes from the top gate: a 600 m loop of houses painted with Pinocchio, Snow White and the Little Prince. Free, best photos in the side alleys.",
            "The Three Kingdoms mural street, 77 panels down to the 1880s boundary stairs: Chinese lanterns on one side, Japanese wooden façades on the other.",
            "The Japanese-style street: restored bank buildings with the Open Port Museum and the Modern Architecture Exhibition Hall, and Incheon Citizens' House, a former mayor's residence with a garden over the port.",
          ],
          tips: [
            "⏰ Weekends are crowded. A weekday late morning is calmer, and **the lanterns look best after dark**.",
            "🚇 Getting there: Line 1 or the Suin-Bundang line to Incheon Station, about one hour from Seoul Station. The gate is straight across the plaza.",
            "🍜 Food: Gonghwachun and Yeongyeong (home of white jajangmyeon) draw queues at lunch, so eat early or late. For snacks on the move try the clay-oven buns at Simnihyang, hollow gonggalppang bread and the Macau egg tarts at Tart King.",
            "👟 The main street and the mural streets are steep; the Fairy Tale Village and the Japanese street are flat. Allow two to three hours including a meal.",
            "🌅 Make it a full day: China Town in the afternoon, then Wolmido for the sunset. The Wolmi Sea Train starts beside Incheon Station (bus 45 also passes here), and the Wolmido Sunset walk on this site has the monorail stops, a 5 km loop and sunset cafés.",
            "🍜 Sinpo Market is ten minutes past the Japanese street.",
          ],
        },
      },
      {
        id: 'gyeyangsan',
        name: 'Gyeyangsan Night Hiking',
        seoTitle: "Gyeyangsan hiking: 3 trails up Incheon's peak",
        seoDescription: "Three trails up Gyeyangsan (395 m), Incheon's highest peak: deck stairs, a gentler museum route and a forest climb from Gyesan Station. Free map, night hike tips.",
        duration: '2–3h',
        updated: '2026-10-31',
        tags: [{ icon: 'hiking', label: 'Hiking' }, { icon: 'moon', label: 'Night hiking' }],
        image: 'gyeyangsan.png',
        imageWhole: true,
        screenshot: 'gyeyangsan-naver-map.png',
        screenshotCaption: 'Naver Map: the Gyeyangsan courses and trailheads. Google Maps does not show these trails accurately.',
        whyVisit: [
          "**A panoramic night view** over Incheon from the top of its highest peak, 395 m, ten minutes on foot from a subway station.",
          "Most people climb after dark, by deck stairs or a forest path, and at the summit pavilion the city lights spread out on every side.",
          "It is forty minutes to the top by the fast way, with **the lights below you** for the whole way down.",
        ],
        story: {
          title: 'A fortress on the Incheon side',
          text: [
            "**Gyeyangsanseong**, the stone fortress on the mountain's east ridge, is thought to date from the Three Kingdoms period, when this hill watched the approaches to the Han River; the museum at the route 2 trailhead holds what the excavations found.",
            "The mountain was named for the cinnamon and cassia trees said to have grown here. The summit pavilion is modern, and its panorama takes in Incheon and, on a clear day, Ganghwa and the sea.",
          ],
        },
        notices: [
          {
            icon: '🏛️',
            title: "Gyeyangsanseong Museum at the route 2 trailhead",
            body: "Open **09:00–18:00**, last entry 17:30, **closed on Mondays** (Tuesday when Monday is a holiday), 1 January and the Seollal and Chuseok days. Adults ₩1,000; children, teenagers and seniors free. The trails themselves have no gate or opening hours.",
            since: "Naver Map and a July 2025 report, tel. 032-552-8317. Checked 29 October 2026.",
          },
          {
            icon: '🔦',
            title: "No lighting on the trail",
            body: "We found no official word of lamps on the deck stairs or the summit path, and night-hiking reports all say to bring your own light. Take a headlamp and a spare, and remember the only toilet is at the park-office trailhead.",
            since: "Checked 29 October 2026.",
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1XTAYMo1N6LQjXbxIkmdwxT_JUpNReGY',
        keywords: ['Incheon', 'Gyeyangsan', 'NightHiking', 'IncheonHiking', 'DayTripFromSeoul', 'GyesanStation', 'HikingKorea', 'KoreaTravel'],
        guide: {
          intro: [
            "⛰️ Ten minutes from the station to the trailheads, and then you choose your start: deck stairs straight up in 40 minutes, the gentle museum route in an hour and a quarter, or the forest climb from the pavilion.",
            "All three meet on the ridge and finish at the summit pavilion. Go **after dark** for the panorama.",
          ],
          route: [
            "Route 1, from the Gyeyang Park Management Office next to Kyungin Women's University: deck stairs the whole way, about 40 to 50 minutes. The fastest way up.",
            "Route 2, from the Gyeyangsanseong Museum and the open-air stage: the gentler start, about an hour and a quarter.",
            "Route 3, from Yeonmujeong pavilion: a forest climb that meets the ridge trail partway up, about an hour.",
            "The summit and its octagonal pavilion, open on all sides.",
            "Gyesan Station exit 5 is the way in: the museum trailhead is a ten-minute walk, Imhak Park a little further, with a short connector between Yeonmujeong and Imhak Park past the forest bathing area.",
          ],
          tips: [
            "🚇 Getting there: Incheon Line 1 to Gyesan Station, exit 5, then 10 minutes on foot to the museum trailhead.",
            "🔦 This is a night hike, so bring a torch or headlamp and keep your phone battery for the way down.",
            "👟 The deck stairs are steep but safe; sturdy shoes and water are enough.",
            "📍 Google Maps does not draw these trails correctly, so use the Naver Map screenshot under the map.",
          ],
        },
      },
      {
        id: 'wolmido-sunset',
        name: 'Wolmido Sunset',
        seoTitle: 'Wolmido sunset walk and Sea Train, Incheon',
        seoDescription:
          'Wolmido island at sunset: reach it from Incheon Station, ride the Sea Train, walk the 5 km loop and stop at sunset cafés and the hilltop observatory.',
        duration: '3h',
        updated: '2026-10-31',
        tags: [{ icon: 'sunset', label: 'Evening walk' }],
        whyVisit: [
          "An island at the end of Incheon's harbour that **faces straight west into the open sea**, so the sun sets in front of you.",
          "A monorail takes you out, a loop over the hill brings you round, and **four cafés have their windows on the water** for the last hour.",
          "An hour from Seoul, and the perfect second half of a China Town day.",
        ],
        story: {
          title: 'An island that saw an emigration and a landing',
          text: [
            "In 1902 the first Korean emigrants to Hawaii sailed from Incheon, and the **Korea Emigration Museum** at the end of this walk tells their story. Wolmido was a Japanese naval base and then a resort island in the colonial years.",
            "On 15 September 1950 the **Incheon landing** began here: UN forces took Wolmido at dawn before the main assault on the city, turning the Korean War. The island was later a Korean naval base, and only reopened to the public as a park in 2001.",
          ],
        },
        notices: [
          {
            icon: '🚃',
            title: 'Wolmi Sea Train: closed Mondays, last train times',
            body: "The monorail is **closed on Mondays** and runs **10:00–18:00 from Tuesday to Sunday**, with later trains at weekends from April to October: until 21:00 on Incheon's tourism page, but Naver Map showed 19:00 on Sunday 25 October. Check the day's last train against the sunset time before you plan around it.",
            since: "Incheon tourism page, last updated 22 June 2026, and Naver Map, checked 25 October 2026. The two disagree on weekend closing time.",
          },
          {
            icon: '🎟️',
            title: 'The monorail ticket is a round ticket',
            body: "One ticket covers the ride out and **one more ride on the same day**, so you can get off at any of the four stops, walk, and board again. Adults from outside Incheon paid **₩11,000 on weekdays and ₩14,000 at weekends** from August 2024. Online bookings can only board at Wolmi Sea Station, the first stop; tickets are sold at all four.",
            since: "Incheon tourism page (June 2026) for the ticket rule and boarding; fares from Incheon city's August 2024 notice and may have changed. Booking: wolmiseatrain.or.kr.",
          },
          {
            icon: '🚌',
            title: 'No monorail? Take the bus',
            body: "Buses **2, 10, 23 and 45** run from Incheon Station to Wolmido, about 15 minutes. Get off at the Wolmi Park stop or at Wolmi Theme Park / Wolmi Culture Street. Bus 45 goes on to the Wolmido bus terminal. It is the way to go on Mondays, when the monorail is closed, or when its tickets are sold out.",
            since: "Incheon city and Incheon tourism pages (updated June 2026); the ride time is from a travel guide (13 to 17 minutes). Check stop names in Naver Map.",
          },
        ],
        image: 'wolmido.jpg',
        imageCredit: 'Photo: JNicol · CC BY-SA 3.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1RW0E5R1RG9Lw4y52ofQAaXN6GI-uvpk',
        keywords: ['Incheon', 'Wolmido', 'Sunset', 'WolmiSeaTrain', 'Monorail', 'WolmiCultureStreet', 'SunsetCafe', 'DayTripFromSeoul', 'KoreaTravel'],
        guide: {
          intro: [
            "🌅 **Set off two hours before sunset.** Ride the monorail out, walk the loop over the hill past the observatory, and be sitting at a café on the seafront with a coffee when the sun goes down.",
            "Three hours with the coffee stop, mostly paved. It pairs naturally with the Incheon China Town walk from the same station: China Town for lunch, Wolmido for the golden hour.",
          ],
          route: [
            "Incheon Station (line 1 or the Suin-Bundang line), the start, with Wolmi Sea Station, stop 1 of the Wolmi Sea Train and its ticket office, 200 m away. Buses 2, 10, 23 and 45 go from the station too.",
            "Storage Incheon, the sunset café nearest the station, with big windows facing the West Sea. Its last order was 19:00, so it suits the way back.",
            "Wolmi Park Station, stop 2, 60 m from Wolmi Park's main gate. Ride the monorail this far if you would rather skip the approach walk.",
            "Wolmi Culture Street, the island's seafront strip of snack stalls and claw machines, where the sunset cafés are: Wolmido Remi, Me Too Coffee and Artos Hope Party. Time your coffee for the hour before sunset.",
            "The Korea Emigration Museum and Museum Station, stop 4, at the island's south-western end, with a public toilet at the stop.",
            "Wolmi Observatory, a three-storey hilltop tower with views of Incheon Port, the West Sea and Incheon Bridge, and a café inside. About 30 minutes on foot, or less by the park's shuttle.",
            "Wolmi Traditional Garden and the park's main gate, where the loop closes; Wolmi Park Station is 60 m away for the second half of your round ticket, or take a bus.",
          ],
          tips: [
            "🚇 Getting there: line 1 or the Suin-Bundang line to Incheon Station, about an hour from Seoul Station. The monorail's first stop is beside the station.",
            "🚌 The bus works all day and on Mondays. Incheon city lists buses 2, 10, 23 and 45; bus 45 passes the Fairy Tale Village and China Town on its way, so it suits the China Town walk on this site too.",
            "🎟️ The monorail ticket is a round ticket: one ride out and one more the same day. Ride out to stop 3 or 4, walk the island, and use the second ride from Wolmi Park Station. Stop 3, Wolmi Culture Street Station, is about 350 m from the path.",
            "⏰ Café hours differ, so check them against the sunset. Last orders were 19:00 at Storage Incheon, 21:30 at Wolmido Remi and Me Too Coffee, and 20:00 at Artos Hope Party.",
            "👟 Mostly paved. The loop climbs to about 40 m over the hill, and takes about 81 minutes without stops according to Naver Map.",
            "🔗 The sunset trip can follow the China Town walk on this site. Both start at Incheon Station: China Town takes two to three hours, so start it around lunch, then come back to the station for the monorail or bus 45 and reach Wolmido in time for the golden hour.",
          ],
        },
      },
      {
        id: 'ganghwa-do',
        name: 'Ganghwa-do island day trip',
        seoTitle: 'Ganghwa-do day trip: temples, forts and cafés',
        seoDescription:
          "Incheon's big island in a day: a hanok-style church, an old temple, coastal forts and a textile town, with cafés and restaurants pinned on a free map.",
        duration: 'Full day',
        updated: '2026-10-31',
        tags: [{ icon: 'village', label: 'Island day trip' }],
        whyVisit: [
          "An island that **ruled Korea for forty years while the Mongols waited on the far shore**, one bus ride from Seoul.",
          "**A church built as a hanok**, a temple said to be among the oldest in the country, 48 small forts along the coast and a silk factory turned retro café.",
          "Rice fields, hills and sea between the stops: a day plan in clusters, not a walk.",
        ],
        story: {
          title: 'The island that guarded the way to Seoul',
          text: [
            "In **1232** the Goryeo court left the mainland for Ganghwa and ruled from the island for nearly forty years, because the Mongol army could not easily cross the water to reach it.",
            "The island kept that job. It sits where the Han and Imjin rivers meet the sea, the water road to Seoul, so in **1679** the Joseon court lined its coast with **48 small forts called dondae**, and Yeonmijeong pavilion on the north tip watched the river mouth.",
          ],
        },
        notices: [
          {
            icon: '🚌',
            title: 'The sights are far apart: plan a taxi or a car',
            body: "From Ganghwa town the main stops lie **4 to 18 km** away in a straight line: Yeonmijeong 4 km, Jeondeungsa 13 km, Bunori Dondae 17.5 km. Bus 3000 from Sinchon reaches the Ganghwa bus terminal; reports put the ride at about 90 minutes to over two hours.",
            since: 'Distances from the map pins; bus times from travel sites that disagree. Checked 26 October 2026.',
          },
          {
            icon: '🚫',
            title: 'Closed days to plan around',
            body: "**Mondays:** Sochang Experience Hall, Geummundo and Metaforest are closed. **Wednesdays:** Toga, Café Frans and the Ryu Distillery café are closed (Ryu also on Thursdays). Geummundo closes at 14:30, so go at lunch.",
            since: 'Opening hours on Naver Map, checked 26 October 2026.',
          },
        ],
        image: 'ganghwa.jpg',
        imageCredit: 'Photo: HyeonChangu · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1sPEoE3OUe5ZvgjiqrdGL1s-FxDstUpA',
        keywords: ['Incheon', 'Ganghwado', 'DayTripFromSeoul', 'Jeondeungsa', 'Bomunsa', 'Dondae', 'GanghwaAnglicanChurch', 'JoyangTextile', 'KoreaTravel'],
        guide: {
          intro: [
            "🏯 Start in Ganghwa town with the hanok church and the silk-factory café, go south to Jeondeungsa and its tea house, and finish on the coast at Bunori Dondae beside the beach.",
            "The stops are kilometres apart, so plan a taxi or a car from the bus terminal and take the day in clusters. Bomunsa on Seokmodo is a separate trip, and a good one.",
          ],
          route: [
            "Joyang Textile, Ganghwa town: a retro café in a factory founded in 1933 to make artificial silk. It closed in 1958 and opened as an art gallery in 2018.",
            "Sochang Experience Hall, in the same old town: opened in 2017 on the site of the Pyeonghwa Textile factory. Sochang is a plain cotton cloth, and Ganghwa became a textile town after 1933. Tue–Sun 10:00–18:00.",
            "Ganghwa Anglican Church: built from 1899 and finished in November 1900 in Korean hanok style, with a Western basilica layout inside. National Historic Site No. 424. Open daily 10:00–18:00 on Naver.",
            "Yeonmijeong Pavilion, north-east of town: where the Han and Imjin rivers fork like a swallow's tail. It was a front-line watchpost on the waterway to Seoul, and a small fort, Wolgot-jin, sits just inside it.",
            "Onsu-ri Anglican Church, Gilsang-myeon: St Andrew's, a hanok-style church consecrated in 1906 according to the sources we found, which disagree on which bishop did it. The church and the priest's house are both Incheon heritage listings.",
            "Jeondeungsa Temple, on the slopes of Jeongjoksan: by tradition one of the oldest temples in Korea, said to date from the Goguryeo era. The Jukrim Dawon tea house stands inside the grounds.",
            "Bunori Dondae, beside Dongmak Beach: one of the 48 dondae built on Ganghwa in 1679. Most are square or round, but this one follows the headland and ended up crescent-shaped.",
            "Optional, far west: Bomunsa Temple on Seokmodo island. Incheon's folklore pages say the monk Hoejeong founded it in 635, and it is counted among Korea's three great Guanyin pilgrimage sites.",
          ],
          tips: [
            "🚌 Getting there: bus 3000 from Sinchon runs to the Ganghwa bus terminal, about 90 minutes to over two hours depending on traffic and on which site you read. Sites also give different Sinchon exits, so check the stop on the day. Taxis are the easy way on from the terminal; travel sites report 15 to 20 minutes to Jeondeungsa.",
            "🍜 Five restaurants worth the detour: Kkomak Hansang (cockle bibimbap), Manisan Sanchae (a mountain-herb set meal), Geummundo (turnip tangsuyuk, lunch only), Toga (fresh tofu and shrimp stew) and Ssambap-ine (wrap-your-own ssambap). Naver shows no hours for Kkomak Hansang this week, so phone 032-937-2868 first.",
            "☕ Eight cafés, from the retro Joyang Textile factory to Metaforest and Café Irim in Gilsang-myeon and Café Talkrapy on the south coast. Hours and closed days differ, so check before you drive out.",
            "🎟️ Travel sites disagree on whether Jeondeungsa charges an entrance fee (free, or about ₩3,000), so keep a little cash for the gate.",
            "📍 Bomunsa sits on Seokmodo island off the west coast. Treat it as a separate trip and check the way across before you go.",
            "🔗 Another Incheon day on this site: the Incheon China Town and Wolmido Sunset walks.",
          ],
        },
      },
    ],
  },
  {
    id: 'gyeonggi-do',
    name: 'Gyeonggi-do',
    intro: [
      "The province that wraps around Seoul and Incheon, and Korea's most populous one with more than **13 million people**. Its capital is **Suwon**, whose Hwaseong Fortress is a UNESCO World Heritage site.",
      "Beyond the suburbs it turns to rivers, lakes and hills, easy day trips from Seoul by subway, train or bus. **Gapyeong**, about an hour east, is known for its lakeside cafés and Nami Island.",
    ],
    image: 'gyeonggi.jpg',
    imageCredit: 'Photo: Korea Tourism Organization · KOGL 1',
    paths: [
      {
        id: 'gapyeong',
        name: 'Gapyeong with Nami island',
        seoTitle: 'Gapyeong day trip: Nami Island ferry and map',
        seoDescription: 'Gapyeong day trip east of Seoul: Nami Island ferry times and prices, Morning Calm Arboretum, Petite France, view cafés and a 17 km river trail to Gangchon, with hours and a map.',
        duration: 'Day trip',
        image: 'gapyeong.jpg',
        imageCredit: 'Photo: Katsujiro Maekawa · CC0',
        updated: '2026-10-31',
        keywords: ['Gapyeong', 'Gyeonggi', 'DayTripFromSeoul', 'NamiIsland', 'NamiIslandFerry', 'PetiteFrance', 'MorningCalmArboretum', 'JatForest', 'JaraIsland', 'RailPark', 'CheongpyeongLake', 'ViewCafe', 'JadeGarden', 'BukhanRiver', 'GangchonTrail', 'KoreaTravel'],
        whyVisit: [
          "A lake valley an hour east of Seoul with **a French village, an Italian one and a pine-nut forest** on the same shore.",
          "Rail bikes on an old line, view cafés over Cheongpyeong Lake, and a five-minute ferry to **the tree-lined avenue of Winter Sonata**.",
          "Pick two or three stops, or walk the 17 km river trail to Gangchon and finish with charcoal dakgalbi.",
        ],
        story: {
          title: 'A railway, a drama and an island',
          text: [
            "The **Gyeongchun Line** from Seoul to Chuncheon opened in 1939, following the Bukhan River through Gapyeong. When the line was double-tracked and straightened in 2010, the old riverside track was left behind, and it is the rail bikes and the river trail of this map.",
            "**Nami Island** was a half-forgotten riverside park until **Winter Sonata** filmed its tree-lined avenue in 2002. The drama's success in Japan and across Asia brought the first wave of drama tourism to Korea, and the island has run on it since.",
          ],
        },
        notices: [
          {
            icon: '⛴️',
            title: 'Ferry to Nami Island: times',
            body: "Boats leave from the **Gapyeong wharf** and the crossing takes about 5 minutes. Into the island the first boat is **08:00** and the last **21:00**; back out the first is 08:05 and the last **21:05**. They run every 10–20 minutes from 09:00 to 18:00 and every 30 minutes outside that. **18 Sep–22 Nov 2026:** extra sailings, first boat **07:30** daily, last boat **21:30** on Fri, Sat, Sun and public holidays.",
            since: 'Official Nami Island site (namisum.com), checked 28 October 2026. The ferry can pause when heavy dam release makes the river fast; the site posts a notice.',
          },
          {
            icon: '🎟️',
            title: 'Nami Island ticket includes the ferry',
            body: "The entrance ticket covers the **round-trip ferry**: adult **₩19,000**, discounted ₩16,000, age 36 months to elementary school ₩13,000. The faster motorboat in costs more (₩29,000 adult) and runs 09:00–18:00 from about April to November. The wharf car park is ₩6,000 for a small car.",
            since: 'Official Nami Island site, checked 28 October 2026.',
          },
          {
            icon: '⏰',
            title: 'Opening hours of the main stops',
            body: "**Morning Calm Arboretum** 08:30–19:00 daily. **Jade Garden** 09:00–18:00 daily, last entry 17:00. **Petite France** and the **Italian Village** 09:00–18:00 daily. **Nami Island** 08:00–21:00 daily. Last entry at the gardens is one hour before closing.",
            since: 'Naver Map, checked 28 October 2026. Hours change by season.',
          },
          {
            icon: '🚫',
            title: 'Jat forest closes on Mondays, Rail Park breaks at midday',
            body: "The **Jat Scent Blue Forest** is closed **every Monday** (09:00–18:00 or 09:00–17:00 on the other days; Naver lists both without dates). **Gapyeong Rail Park** is open Mon–Fri 10:00–18:00 with a break 11:30–13:00, and Sat–Sun 09:00–18:30 with a break 12:00–13:30.",
            since: 'Naver Map, checked 28 October 2026.',
          },
          {
            icon: '☕',
            title: 'The view cafés close early',
            body: "**La Cuna** 10:00–18:00. **Cafe The Wave** 11:00–18:00 (to 19:00 at weekends). **Corydalis** 09:00–20:00 (to 21:00 Fri and Sat). **Jajam 157** 10:00–19:00 (09:30–20:00 at weekends and holidays). Plan the café stop before dusk.",
            since: 'Naver Map, checked 28 October 2026.',
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1WFNxPHvLMtl_pkwfuYt8qsYs47GAKsk',
        guide: {
          intro: [
            "🌿 **Pick two or three stops**, no more: the arboretum and the pine-nut forest together in the hills, the two themed villages 200 m apart on the lake road, or the rail bikes and the ferry to Nami Island from Gapyeong town.",
            "The Jat forest closes on Mondays and the view cafés close early, so check before you drive out. If you'd rather walk, the river trail to Gangchon takes about five hours.",
          ],
          route: [
            "Morning Calm Arboretum and the Jat Scent Blue Forest: a garden and a pine-nut forest in the hills of Sangmyeon, a short drive apart. Pair them by car.",
            "Petite France and the Italian Village (Pinocchio and Da Vinci): two themed villages a few minutes apart on the lakeside road.",
            "The Cheongpyeong Lake view cafés: Corydalis, La Cuna, The Wave and Jajam 157, all voted for their views on Naver.",
            "Jara Island and Gapyeong Rail Park: an island in the Bukhan River and rail bikes on an old railway line, both near Gapyeong town.",
            "Nami Island and Jade Garden, both just across the border in Chuncheon: Nami Island is a five-minute ferry from the Gapyeong wharf, and its tree-lined main avenue is where Winter Sonata (2002) was filmed, the drama that started Korea's first wave of drama tourism.",
            "The river trail, Gapyeong Station to Gangchon Station, 16.7 km along the Bukhan River and the old Gyeongchun railway: Gyeonggang Bridge, Chunseong Bridge, Baegyang-ri and its old station, and the old Gangchon Station, about five hours.",
          ],
          tips: [
            "⛴️ The ferry is part of the Nami Island ticket, so there is no separate fare. Times and prices are in the boxes above the map.",
            "🚌 The stops are far apart, so plan a car, taxi or bus between them rather than walking.",
            "🚆 Trail transport: ITX-Cheongchun from Yongsan to Gapyeong Station in under an hour, back from Gangchon Station in about 1 h 10 (the ordinary Gyeongchun line takes about 2 hours).",
            "🍗 Gangchon is dakgalbi country: the two charcoal dakgalbi houses by Gangchon Station have over a thousand reviews each and open daily.",
            "🔗 Nami Island's Winter Sonata avenue is also on our K-Drama shooting spots map, and the island's own \"country\" gimmick, the Naminara Republic, is a blog post of its own.",
            "🥾 The river trail is a proper day walk: flat, mostly paved bike path and old railway, no shade in summer, few benches (bring a small mat), silver grass at Baegyang-ri in autumn. With less time, start at Baegyang-ri Station instead: about 6 km and 2 hours to Gangchon.",
          ],
        },
      },
      {
        id: 'paju',
        name: 'Paju: DMZ, Heyri and the Imjin River',
        seoTitle: 'Paju day trip: Imjingak, DMZ tour and Heyri',
        seoDescription:
          'Paju day trip north of Seoul: Imjingak and the Peace Gondola, the DMZ tour to the 3rd Tunnel, Heyri Art Village, Book City, two suspension bridges. Buses, hours and a map.',
        duration: 'Day trip',
        image: 'paju.jpg',
        imageCredit: 'Photo: 한국문화관광연구원 · CC0',
        updated: '2026-10-31',
        keywords: ['Paju', 'Gyeonggi', 'DayTripFromSeoul', 'DMZ', 'Imjingak', 'HeyriArtVillage', 'PajuBookCity', 'GamaksanSuspensionBridge', 'MajangLake', 'PajuPremiumOutlets', 'KoreaTravel'],
        whyVisit: [
          "**A gondola over the Imjin River, a walk down into the 3rd Tunnel, and a window straight into Kaesong.** All of it is an hour from Seoul.",
          "The same town has an art village in a wetland and a city built by publishers, with a library of 20,000 donated books.",
          "**Eel from the river, tofu from beans grown along the control line**, and 18 restaurants with thousands of reviews each.",
        ],
        story: {
          title: 'The last stop before the border',
          text: [
            "Paju is where the roads north end. **Imjingak** was built in 1972 as a place where families cut off from the North could look across the Imjin River; next to it the **Freedom Bridge** is where 12,773 prisoners of war walked south in 1953. The **3rd Tunnel**, dug under the border and found in 1978, is 4 km on, inside the civilian control line, so you can only go with the DMZ tour.",
            "The same river gives the town its food: the eel houses on its banks, the spicy river-fish stews at Duji-ri, and the **Jangdan beans** grown in the fields along the control line, which every tofu restaurant here puts on its sign.",
          ],
        },
        notices: [
          {
            icon: '🛂',
            title: 'DMZ tour: passport, closed Mondays, tickets at Imjingak',
            body: "The tour to the **3rd Tunnel** and **Dora Observatory** leaves from the ticket office at Imjingak, Tue–Sun **09:00–14:30**, closed Mondays and on weekday public holidays. Every foreign visitor needs the **original passport**. Walking into the tunnel ₩9,200, with the monorail ₩12,200; no concessions for foreigners, no photos on the course.",
            since: 'Paju city DMZ site (dmz.paju.go.kr) and Naver Map, checked 30 October 2026.',
          },
          {
            icon: '🚧',
            title: 'Dora Observatory skipped 23–30 November 2026',
            body: "The access road is resurfaced **23–30 November 2026**. That week the tour goes to the **3rd Tunnel only** and tickets are sold on the spot, not online.",
            since: 'Notice on the Paju city DMZ site, posted 23 October 2026.',
          },
          {
            icon: '⏰',
            title: 'Odusan Observatory and the Heyri museum close on Mondays',
            body: "**Odusan Unification Observatory** is open 09:30–17:30 March to October and 10:00–17:00 November to February, last entry 30 min before, **closed Mondays**, free. The **Museum of Korean Modern and Contemporary History** in Heyri is open 10:00–18:00 Tue–Sun, closed Mondays.",
            since: 'Naver Map and the observatory site, checked 30 October 2026.',
          },
          {
            icon: '🎟️',
            title: 'Peace Gondola fares',
            body: "The gondola over the Imjin River runs weekdays **09:00–18:00** and weekends 09:00–19:00, closed the first Monday of March, June, September and December. Return ticket adult **₩12,000**, child ₩10,000; the glass-floor crystal cabin ₩15,000 / ₩13,000.",
            since: 'dmzgondola.com and Naver Map, checked 30 October 2026.',
          },
          {
            icon: '⛵',
            title: 'Hwangpo sailboat: no sailings December to February',
            body: "The replica cargo sailboat on the Imjin River at Duji-ri sails Tue–Fri 13:00–15:00 and Sat–Sun 10:00–17:00, closed Mondays, needs **at least 8 passengers** per sailing and does not run **December to February**. About ₩10,000 adult.",
            since: 'Naver Map, checked 30 October 2026; the fare comes from travel sites, not an official page.',
          },
          {
            icon: '🚌',
            title: 'Weekend double-decker buses no longer run',
            body: "The weekend buses that used to serve Heyri, Majang Lake and the Gamaksan bridge (routes **7300, 7500, 7700, 7701**) were withdrawn on **1 January 2025**. Older guides still list them; use the routes in the tips below.",
            since: 'Paju city notice, December 2024. Checked 30 October 2026.',
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1IFyDpcP7u9GmFBPVBJLp5UQTpSIXw1E',
        guide: {
          intro: [
            "🕊️ **Pick one cluster**: Imjingak and the DMZ tour (passport in hand, closed Mondays), or Heyri with Provence and the Odusan observatory, or the two suspension bridges out east.",
            "Whichever you choose, eat eel on the river or Jangdan-bean tofu near the border.",
          ],
          route: [
            "Imjingak Tourist Site, Pyeonghwa Nuri Park and the Dokgae Bridge: the park with the windmills, the old railway bridge you can walk out on, and the Peace Gondola across the river. The DMZ tour ticket office is in the same car park.",
            "The 3rd Infiltration Tunnel and Dora Observatory, by tour bus from Imjingak only, passport in hand. Dora looks straight into Kaesong on a clear day.",
            "Heyri Art Village, the Museum of Korean Modern and Contemporary History and Provence Village: galleries and cafés in a wetland village, a museum of 20th-century street life, and the pastel French village nearby.",
            "Gyeonggi Future Education Paju Campus (the former English Village) and Odusan Unification Observatory: the mock-English campus is free to walk, and Odusan looks across the Han and Imjin confluence to North Korean villages 2 km away.",
            "Paju Book City, the Forest of Wisdom and Paju Premium Outlets: the publishers' city with its library of 20,000 donated books, and the outlet mall to the north.",
            "The Imjin River Hwangpo sailboat pier and the Gamaksan Suspension Bridge: the river-stew village of Duji-ri, and a 150 m bridge over a gorge further on.",
            "Byeokchoji Arboretum, First Garden and the Majang Lake Suspension Bridge: the gardens of Gwangtan and a 220 m bridge across a reservoir, with the lake café at its end.",
          ],
          tips: [
            "🚌 Heyri, Book City, both outlets and Provence: bus 2200 from Hongik University Station exit 1 or Hapjeong Station exit 1, every 10–15 minutes, about 45–50 minutes on the Jayu-ro expressway. It stops at Lotte Premium Outlets in Book City, Heyri gates 1, 4 and 6, the Future Education campus and the back gate of Paju Premium Outlets. Odusan is a 10-minute taxi ride from Heyri.",
            "🚆 Imjingak: take the Gyeongui-Jungang line to Munsan Station (about 1 h 15 from Seoul Station or Hongik University), then bus 058 from the stop 200 m from exit 1 (only every 35–80 minutes) or a 15-minute taxi. Red bus 9710 from Gwanghwamun and Seoul Station also goes to Munsan Station. Korail's shuttle train from Munsan to Imjingang Station has been suspended several times; check before relying on it.",
            "🚌 Gamaksan bridge: from Munsan Station bus 92 or 95 to Jeokseong traditional market, then bus 25 or 25-1 to the Chulleong-dari-ipgu stop. Majang Lake: bus 31 or 774 from Bulgwang Station exit 8 to Gwangtan junction, then 37 or 313 to Gisan-ri and a 20-minute walk. Both are slow; a taxi from Munsan or Geumchon is the realistic option.",
            "🎫 Paju City Tour: a coach from Hongik University Station at 09:00, Tuesday to Sunday, with a different course each day (Heyri and Odusan, Majang Lake and Byeokchoji, the sailboat and Jeokseong market, the DMZ). From ₩7,000 per person, booking on pjcitytour.kr or 02-730-0531, minimum 10 people, photo ID on the day.",
            "🍜 The restaurants: two famous eel houses, the Duji-ri river-fish stews, Jangdan-bean tofu at Provence and near Imjingak, the garlic-bread bakery, a 120-year-old chogyetang house, and the big cafés at Munjiri and the Majang bridge.",
          ],
        },
      },
      {
        id: 'hwaseong',
        name: 'Suwon with Hwaseong Fortress',
        seoTitle: 'Suwon Hwaseong Fortress walk: 5.6 km loop',
        seoDescription:
          'Walk the 5.6 km Hwaseong Fortress wall in Suwon, with its four gates and view points, plus Haenggung-dong lanes. Public toilets and 18 pins on the map.',
        duration: '3h',
        updated: '2026-10-31',
        tags: [{ icon: 'village', label: 'Old town' }],
        whyVisit: [
          "A **UNESCO fortress you can walk right round in three hours**: 5.7 km of wall, four gates, and a hilltop command post with a night view over Suwon.",
          "A king built it in two years for the father he could not save, and after the war the whole thing was rebuilt from the original construction record.",
          "Inside the wall is a palace of 576 rooms, and in late autumn **silver grass and yellow ginkgo along the pond**.",
          "An hour from Seoul on Line 1, and the loop ends where it starts.",
        ],
        story: {
          title: 'A fortress built for a father',
          text: [
            "King Jeongjo built Hwaseong from **1794 to 1796** to honour his father, Crown Prince Sado, whose tomb he had moved nearby in 1789. The scholar **Jeong Yak-yong** designed it, with a wall, four main gates and a stream running through the middle.",
            "The Korean War damaged much of it, and it was rebuilt from the **Uigwe**, the construction record written after Jeongjo's death. UNESCO listed it in **1997**.",
          ],
        },
        notices: [
          {
            icon: '⏰',
            title: 'Hwaseong Haenggung palace: open daily, last entry 17:30',
            body: "The palace is open **09:00 to 18:00** every day of the year, with the last entry at **17:30**.",
            since: 'Opening hours on Naver Map, checked 26 October 2026.',
          },
        ],
        image: 'suwon.jpg',
        imageCredit: 'Photo: 김병모 · CC0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1PMZUkDSkLVi-b-z9Igps2p3zW54rNzQ',
        keywords: ['Suwon', 'Gyeonggi', 'HwaseongFortress', 'HwaseongHaenggung', 'Haenggungdong', 'Banghwasuryujeong', 'Seojangdae', 'DayTripFromSeoul', 'KoreaTravel'],
        guide: {
          intro: [
            "🏯 Start at Janganmun, the north gate, walk the wall west and up Paldalsan to Seojangdae, down to Paldalmun, and back along the east wall to the pavilion at Banghwasuryujeong, where you began.",
            "It's 5.6 km and about three hours with stops, more if you add the palace and the mural lane. Try to **be at Seojangdae as it gets dark**.",
          ],
          route: [
            "Janganmun, the north gate: the largest city gate in Korea, destroyed in the Korean War and rebuilt in the 1970s. A public toilet stands beside the meeting square just south.",
            "Hwaseomun, the west gate: small, but a good example of 18th-century fortress building. In autumn the silver-grass field in the park beside it is a popular photo corner.",
            "Seojangdae, the west command post on top of Paldalsan: where the fortress's commanders directed troops, rebuilt in 2007 after an arson fire in 2006. Come at dusk for the night view.",
            "Paldalmun, the south gate: it came through the Korean War mostly intact. The wall east of here is gone, so the route runs through the streets for a stretch before it meets the wall again.",
            "Changnyongmun, the east gate: destroyed in the Korean War and rebuilt in the 1970s (sources say 1975 or 1978).",
            "Banghwasuryujeong pavilion: built in 1794 as the north-east pavilion, meant as a lookout and command post and loved for feasts. The pond below is Yongyeon; reviewers mention silver grass and yellow ginkgo in late autumn.",
            "Hwaseong Haenggung palace, where the Haenggung-dong path starts: King Jeongjo's temporary palace, 576 chambers, used on his trips from 1789 to 1800, mostly destroyed under Japanese rule and open again since 2003.",
            "Haenggungdong Mural Village, on the 1 km path from the palace to Banghwasuryujeong: a lane of old houses with painted walls, between the palace and the wall.",
          ],
          tips: [
            "🚇 Getting there: Line 1 to Suwon Station, then a taxi or local bus to Paldalmun or Janganmun. Check the bus number on the day.",
            "🎬 Drama fans: Wolhwawon (월화원), the Chinese garden 3 km south-east, is free and open until 22:00, and it is on our K-Drama map.",
            "🛍️ The Starfield Suwon library (별마당도서관) is about 2 km west of the wall inside the mall, so it works as a rainy-day stop. Naver lists no separate hours for it.",
            "🏘️ The Korean Folk Village is in Yongin, about 10 km south-east, and needs a trip of its own. Naver lists it open 10:00–19:00 Monday to Thursday and until 22:00 Friday to Sunday.",
            "👟 The wall climbs Paldalsan to Seojangdae, so wear shoes with grip. Allow three hours for the loop and more for the palace.",
          ],
        },
      },
    ],
  },
  {
    id: 'gangwon-do',
    name: 'Gangwon-do',
    intro: [
      "Korea's mountain and coast province, split by the Taebaek range into a quiet inland of valleys and ski resorts and an east coast of beach towns. **Chuncheon** and **Gangneung** are its best-known cities; **Pyeongchang** hosted the 2018 Winter Olympics.",
      "**Seoraksan**, the country's most dramatic national park, rises over **Sokcho**, and the coast road south from there strings together Gangneung's coffee street, Jeongdongjin's sunrise beach and Gangwon's cold-noodle and squid-ink towns.",
    ],
    image: 'gangwon-do.jpg',
    imageCredit: 'Photo: Loewelad · CC BY-SA 3.0',
    paths: [
      {
        id: 'uiam-lake-rail-bike',
        name: 'Chuncheon: Uiam Lake & Gim Yu-jeong Rail Bike',
        seoTitle: 'Chuncheon day trip: Uiam Lake & rail bike',
        seoDescription:
          "Chuncheon day trip with Legoland Korea: the Soyanggang Skywalk and Samaksan cable car over Uiam Lake, the Gim Yu-jeong Rail Bike to the old Gangchon station, a 28 km lake circuit, the Myeongdong dakgalbi alley and cafes.",
        duration: 'Day trip',
        image: 'gimyujeong-railbike.jpg',
        imageCredit: 'Photo: Gage Skidmore · CC BY-SA 4.0',
        updated: '2026-10-31',
        keywords: ['Chuncheon', 'Gangwon', 'DayTripFromSeoul', 'LegolandKorea', 'UiamLake', 'SoyanggangSkywalk', 'GimYujeongRailBike', 'Dakgalbi', 'KoreaTravel'],
        whyVisit: [
          "A lake city an hour from Seoul by train, with **a cable car across the water and Korea's longest glass-floor skywalk**.",
          "Pedal an 8 km rail bike down a disused railway through a river gorge, then eat the dakgalbi the city invented on a whole street of it.",
          "Legoland opened on an island in the lake in 2022, and **the lake itself is still the better day**.",
        ],
        story: {
          title: 'A valley remade twice',
          text: [
            "Chuncheon was not always a lake city. **Uiam Dam**, finished in 1967, flooded the valley west of downtown into 17 km² of **Uiam Lake**; the high ground left dry became islands, among them Jungdo, where Legoland Korea now stands. Upstream, the **Soyanggang Dam** was Asia's largest rock-fill dam when it was completed in 1973, backing the Bukhan River up into Soyang Lake, still Korea's biggest reservoir.",
            "The old Gyeongchun railway had its own second life. This station opened in 1939 as Sillam; renamed **Gim Yu-jeong** in 2004 for the writer born in the village next door, it became the first Korean station named after a person. The 2010 double-tracking of the line left this stretch disused, and by 2012 it had reopened as the rail bike.",
          ],
        },
        notices: [
          {
            icon: '🎟️',
            title: 'Book the rail bike online, in advance',
            body: "Gim Yu-jeong Rail Bike is popular and weekend seats sell out, so **book online ahead of time** rather than turning up. The official site, [en.railpark.co.kr](https://en.railpark.co.kr/course/gimyujeong/schedule), takes English bookings: a 2-seater is **₩40,000**, a 4-seater **₩56,000**, and the ticket covers both the rail bike and the sightseeing train on to the old Gangchon station. English-language resellers such as Klook and Pelago list the same Gimyujeong-course ticket.",
            since: 'en.railpark.co.kr, checked 30 October 2026.',
          },
          {
            icon: '📅',
            title: 'Monday closures at the Literary Village and the dam café',
            body: "The **Gim Yu-jeong Literary Village** and the café inside the **Soyanggang Dam water-culture centre** are both closed every **Monday**.",
            since: 'Naver listings, checked 30 October 2026.',
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1Kn1Wg2IeegR-2gIu2wUqIPvlcF5RocU',
        guide: {
          intro: [
            "🚂 The ITX from Yongsan gets you to Chuncheon in about 1h10. **Book the rail bike first**, ride it from Gimyujeong down the gorge to the old Gangchon station, then cross the lake by cable car or skywalk for the view.",
            "Finish with charcoal dakgalbi downtown. The stops are 10–30 minutes apart by car, so **pick two or three** and leave the rest for next time.",
          ],
          route: [
            "Samaksan Lake Cable Car, Uiam Lake station: Chuncheon's newest attraction, crossing Uiam Lake to Samaksan; glass-floor cabins cost extra.",
            "Legoland Korea: the country's first Legoland, a theme park and resort opened in 2022 on Jungdo, an island in Uiam Lake.",
            "Gim Yu-jeong Rail Bike boarding platform, next to Gimyujeong Station: an 8 km ride down the old Gyeongchun line, 6 km by rail bike through the Bukhan River gorge and a themed tunnel to Nangu Village, then 2 km by sightseeing train on to the old Gangchon station. A free shuttle brings you back.",
            "Gimyujeong Station, disused, and the Gim Yu-jeong Literary Village: the old closed station is a well-known photo spot; next to it is the reconstructed home village of the writer Gim Yu-jeong (1908–1937). Renamed from Sillam in 2004 in his honour, it was the first Korean station named after a person.",
            "Soyanggang Dam and the Soyang Lake cruise: Korea's largest dam by reservoir volume, nicknamed the country's own fjord, with a cruise boat across Soyang Lake to its remoter temples and villages. Finished in 1973, once Asia's largest rock-fill dam.",
            "Soyanggang Skywalk: Korea's longest glass-floor skywalk, out over the Soyang River beside the Maiden statue.",
            "The Uiam Lake circuit (의암호 둘레길), a 28 km lakeside loop built more for cyclists than for one walk: Yungrim Land, the Literature Park, the Animation Museum, Songam Sports Town, Gongjicheon and the Ethiopia Korean War Memorial.",
            "Restaurants and cafés: charcoal dakgalbi at Todam, the potato-bread bakery Gamjabat and the lakeside cafés along Baksa-ro. Downtown, the Myeongdong Dakgalbi Alley is a whole street of dakgalbi restaurants side by side.",
          ],
          tips: [
            "🚆 Getting there: the ITX-Cheongchun runs from Yongsan to Chuncheon Station in about 1h10; the stops here are spread around the lake, so a car or taxi between them is easier than the bus.",
            "🚲 The Uiam Lake circuit is built for cyclists, not one walk: rent a bike near the Skywalk or the cable car station, or just walk the short stretch between the two.",
            "🎟️ Book the rail bike before you go (box above); a free shuttle bus brings riders back from the old Gangchon station to Gimyujeong.",
            "🍗 Dakgalbi country: Todam Charcoal Dakgalbi and Top Place Dining by the lake, or head downtown to the Myeongdong Dakgalbi Alley for a whole street of it.",
            "🥔 Gamjabat's potato bread (감자빵) is the Chuncheon bakery everyone photographs; go early, it sells out.",
            "🔗 The old Gangchon station here is the same end point as our Gapyeong river trail from Gapyeong Station — the two maps meet.",
          ],
        },
      },
      {
        id: 'gangneung',
        name: 'Gangneung Highlights',
        seoTitle: 'Gangneung travel map: 30 places, one trip',
        seoDescription:
          "Gangneung in one map: Wolhwa-geori's old rail trail, Anmok Coffee Street, Gyeongpo's lake and pavilions, Ojukheon, Jumunjin's Goblin-drama breakwater, Jeongdongjin's sunrise station and the Anbandegi highland village.",
        duration: '2 days (by car)',
        tags: [{ icon: 'car', label: 'Road trip' }],
        image: 'gangneung.jpg',
        imageCredit: 'Photo: Mobius6 · CC BY-SA 4.0',
        imageWhole: true,
        updated: '2026-10-31',
        keywords: ['Gangneung', 'Gangwon', 'WolhwaGeori', 'AnmokCoffeeStreet', 'GyeongpoBeach', 'JeongdongjinStation', 'Anbandegi', 'Ojukheon', 'KoreaTravel'],
        whyVisit: [
          "Two days on the coast where **the East Sea and the mountains meet**, from a beachside coffee street to a highland village above the clouds.",
          "Drink your coffee where Korea's café culture began, on a beach strip that started with vending machines in the 1980s.",
          "Stand on the Goblin-drama breakwater at Jumunjin, then watch the sun come up at Jeongdongjin, **the station closest to the sea in the world**.",
          "Wake early at Anbandegi for a sea of clouds below your feet.",
        ],
        story: {
          title: 'Two literary families, one city',
          text: [
            "Barely 5 km apart on this map are two of Joseon Korea's most celebrated literary families. **Shin Saimdang** (1504–1551) painted and raised her son at **Ojukheon**, a Treasure-listed house named for its black bamboo. That son, the scholar **Yi I** (Yulgok), now shares Korea's banknotes with her — Saimdang on the ₩50,000 note, Yulgok on the ₩5,000 — said to be the first mother and son on any country's currency.",
            "At Chodang, named for scholar **Heo Yeop**'s pen name, his son **Heo Gyun** (1569–1618) wrote Korea's first Hangul novel, The Tale of Hong Gildong. His sister **Heo Nanseolheon** (1563–1589) wrote poetry so admired it reached China and Japan before she died at 27; their memorial park stands on her birthplace.",
          ],
        },
        notices: [
          {
            icon: '🎟️',
            title: 'Bada-buchae-gil fee, hours and weather closures',
            body: 'Entry to the coastal trail is **₩5,000** adult (₩4,000 teen, ₩3,000 child). Open **09:00–17:30** (last ticket 16:30) April–October, **09:00–16:30** (last ticket 15:30) November–March. It **closes entirely** under a wind or wave advisory, and can also close for military reasons, so check before you drive out.',
            since: 'searoad.gtdc.or.kr and news reports, checked 30 October 2026.',
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1FoMgpM80SNMCVbsmITD2_YoB1p-4W0s',
        guide: {
          intro: [
            "🌊 Give it two days and **one or two clusters a day**. Downtown, Gyeongpo and Anmok sit close together; Jumunjin, Jeongdongjin and the Daegwallyeong highlands are each another 30–50 minutes by car.",
            "Have your coffee at Anmok mid-morning before the sunset crowds, then follow the coast north to Jumunjin. If you can manage it, **sleep up at Daegwallyeong** and start the second day at dawn.",
          ],
          route: [
            "Downtown (도심권): Jungang Market, dating to before Japanese colonial rule; the Myeongju-dong art alley, named for Gangneung's own Silla-era name; and the Daedohobu government office, whose surviving gate is a National Treasure.",
            "Wolhwa-geori (월화거리), 2.2 km: the Gangneung rail line, closed in 2012, turned into a lantern-lit park, named for a local legend said to have inspired the classic story of Chunhyang.",
            "Gyeongpo (경포권): the beach, the Sageunjin cape viewpoint, Gyeongpoho lake, the 1326-built Gyeongpodae pavilion, the Seongyojang estate, Ojukheon (Shin Saimdang and Yulgok's home) and the Heo Gyun & Heo Nanseolheon memorial park.",
            "Anmok Coffee Street (안목 커피거리), 0.7 km of beach from Gangneung Port: the café strip said to have started with beachside vending-machine coffee in the 1980s.",
            "Jumunjin (주문진권): the Goblin-drama breakwater, the fish market trading since 1936, Adeulbawi rock park on 150-million-year-old granite, and the BTS bus stop.",
            "Jeongdongjin (정동진권): Sun Cruise Resort, Hourglass Park (built 1999) and its Time Museum, the Guinness-listed Jeongdongjin Station, and Haslla Art World.",
            "Bada-buchae-gil (바다부채길), 3.0 km along a wave-cut marine terrace, from the Jeongdong ticket gate below Sun Cruise to the Simgok ticket gate.",
            "Daegwallyeong (대관령권): the old pass road Shin Saimdang is said to have walked with young Yulgok, Korea's first recreation forest (1988), Solhyang Arboretum, the Anbandegi highland village and the Nochusan stone-tower path.",
          ],
          tips: [
            '🌄 Anbandegi is best **at sunrise** for its sea of clouds, so it suits an overnight stay nearby rather than a day trip from downtown.',
            '🚗 A car makes this trip work: the five clusters are 20 minutes to over an hour apart by road.',
            '☕ Anmok Coffee Street gets crowded at sunset; come mid-morning for a quieter table with the same sea view.',
            "👟 The Nochusan stone-tower path and Daegwallyeong's old road are forest walks, not paved streets — wear proper shoes.",
            '🗺️ Three spots are drawn as actual walking lines on the map — Wolhwa-geori, Anmok Coffee Street and Bada-buchae-gil — because their names literally mean "street" or "road"; everything else is a pin.',
          ],
        },
      },
      {
        id: 'sokcho',
        name: 'Sokcho: Sea, Lakes & Seoraksan',
        seoTitle: 'Sokcho travel map: 54 places and the bus from Seoul',
        seoDescription:
          "Sokcho on one map: the traveller alley, Yeongnang and Cheongcho lakes, Abai Village and the Gaetbae ferry, Daepo Port, Seorak-hyanggi-ro and Seoraksan, plus the bus from Seoul and hotels by the terminals.",
        duration: '2 days',
        tags: [{ icon: 'hiking', label: 'Coast & mountain' }],
        image: 'sokcho.jpg',
        imageCredit: 'Photo: Bernard Gagnon · CC0',
        imageWhole: true,
        updated: '2026-10-31',
        keywords: ['Sokcho', 'Gangwon', 'Seoraksan', 'SeoulToSokcho', 'AbaiVillage', 'GaetbaeFerry', 'SokchoBeach', 'DaepoPort', 'KoreaTravel'],
        whyVisit: [
          "The endless blue of the East Sea, and Seoraksan, counted among the **finest mountain scenery in Korea**.",
          "A place that holds both of these, sea and mountain, at once: this is Sokcho, **Korea's signature summer destination**.",
          "From East Coast beaches where the cool waves roll in to the grand scenery carved out by Ulsanbawi, two very different faces of nature meet in one place.",
        ],
        story: {
          title: 'A border town that became a refuge',
          text: [
            "After 1945 Sokcho lay **north of the 38th parallel**. The Korean War moved the line, and in 1954 the area passed to South Korean civil rule. Refugees from Hamgyeong, in the far north-east, settled on the empty sand of Cheongho-dong, hoping to go home soon.",
            "They never did, and the hamlet became **Abai Village**, named for the Hamgyeong word for an old man. The hand-pulled **Gaetbae** ferry, ₩500 across the canal, still links it to downtown.",
          ],
        },
        notices: [
          {
            icon: '🚌',
            title: 'Bus from Seoul: about 2 to 2.5 hours',
            body: 'Sokcho has **no train station**, so you come by express or intercity bus, about **2 to 2.5 hours** from Seoul. Buses leave from Dong Seoul Terminal (Gangbyeon Station, Line 2) and from Seoul Express Bus Terminal (Gangnam); a standard premium seat is roughly **₩20,000 to ₩22,000**.',
            since: "The video's own guide and bus timetable sites (bus.koreacharts.com, bustrain.kr), checked 31 October 2026. Times and fares vary by day: confirm on KOBUS or Tmoney before you go.",
          },
          {
            icon: '🚧',
            title: 'Bada-hyanggi-ro seaside walk is closed',
            body: 'Sokcho City closed the whole **Oeongchi Bada-hyanggi-ro** deck walkway on **1 December 2025** after a safety inspection gave it the lowest grade (E). The video expects repairs to last until about **the end of 2027**, and the Sokcho Lighthouse observatory was also under repair. The line stays on the map for when it reopens.',
            since: 'Kyunghyang (27 November 2025) and Cheonji Ilbo reports, plus the video; checked 31 October 2026. Sokcho City tourism: 033-639-2362.',
          },
        ],
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1sVLZpHxUM4IdyPnbwOFy1w8Wggh-i0A',
        guide: {
          intro: [
            "🌊 **Day one, the water.** Take the morning bus from Seoul and leave your bag at a hotel by the terminal. Spend the morning on the traveller alley and the Yeongnang Lake boardwalk, have lunch at the fish market, then cross to Abai Village on the hand-pulled ferry. Stay out until the Expo Tower and the Sokcho Eye light up.",
            "**Day two, the mountain.** Take the city bus to Seoraksan early, before the cable-car queue builds. See Sinheungsa and its Buddha, ride the cable car up and walk the short path to Gwongeumseong. On the way back into town, stop for soft tofu in Hagsapyeong and the outdoor foot bath at Cheoksan Hot Spring. Your bus to Seoul leaves from the terminal you arrived at.",
            "**If it rains**, swap a half-day. Sokcho City Museum and the National Mountaineering Museum in Nohak-dong are indoors, and a café on Yeongnang Lake gives you the view through glass. Mondays close the Literary Village and the dam café, so check the box above first.",
          ],
          route: [
            "Sokcho Intercity Bus Terminal and Soho-geori (소호거리), the traveller alley behind it: small bookshops, cafés and the Soho 259 hostel.",
            "Yeongnang Lake (영랑호), reached by the approximate Yeongri-dan-gil (영리단길): the Yeongnangho Sumit-gil boardwalk and Beom-bawi rock. Starbucks Yeongnangho Resort is the one coffee stop on the water.",
            "Museum X Sokcho and the Sokcho Lighthouse observatory, looking out over the sea.",
            "Yeonggeumjeong, a sunrise pavilion on the rocks, then Dongmyeong Port and the Sokcho Tourist & Fish Market.",
            "Abai Village, across the canal by the hand-pulled Gaetbae ferry, and Chilseong Shipyard café.",
            "Cheongcho Lake, with its own 5 km loop (drawn in pink), an amusement park and Expo Tower.",
            "Sokcho Express Bus Terminal, Sokcho Beach and the Sokcho Eye observation tower.",
            "Oeongchi Beach and Port on the closed Bada-hyanggi-ro, then Daepo Port, known for its fried-seafood alley, and Seorak Port.",
            "Nohak-dong: Sokcho City Museum, the quiet Nori Forest path and the National Mountaineering Museum.",
            "Seorak Chaek bookshop, the Seoraksan Native Plant Garden, Hagsapyeong soft-tofu village and a free outdoor foot bath at Cheoksan Hot Spring.",
            "Sangdomun stone-wall village (상도문 돌담마을): old hanok and low stone walls with stone-art sparrows and dogs, an approximate stroll through the lanes.",
            "Seoraksan: Seorak-hyanggi-ro from Sogongwon and the park gate, then Sinheungsa temple and its Unification Buddha, the Seorak Cable Car and the short path up to the Gwongeumseong fortress site.",
            "Restaurants (맛집): sixteen local favourites, like sundae-guk, tonkatsu and dak-gangjeong near the terminals, and west of Cheongcho Lake the Meokgeori food street, where the raw-fish, grilled-pork and gopchang places line up.",
          ],
          tips: [
            "🚌 Pick your terminal: the Express Bus Terminal is a 5-minute walk from Sokcho Beach, while the Intercity Bus Terminal is by Jungang Market and the traveller alley. Check which one your ticket names.",
            '🍜 Eat by area: dak-gangjeong and squid sundae at the market, Abai sundae and Hamheung cold noodles in Abai Village, mul-hoe (cold raw-fish soup) by the lighthouse beach, soft tofu in Nohak-dong.',
            '🌙 Go to Cheongcho Lake and Sokcho Beach after dark: Expo Tower, the Sokcho Eye and the LED Headland breakwater (121 lights) are lit.',
            "👟 Nori Forest and Sangdomun are quiet walks, and the Gwongeumseong path is gentle earth and rock for about 10 minutes from the cable car's top station.",
            '🗺️ Streets and trails with a gil, geori or ro in their name are drawn as lines on the map; Yeongri-dan-gil and the Sangdomun lanes are approximate, drawn along the nearest mapped streets.',
            '🔗 The Gangneung Highlights map on this site is the next stop down the coast.',
          ],
        },
      },
    ],
  },
  {
    id: 'theme',
    name: 'Theme',
    intro: [
      "Three collections that cross the country instead of staying in one city: **K-Drama shooting spots**, **Abroad in Korea**, the foreign-style villages and districts, and the **BTS Army Tour** of music-video, show and hometown places.",
    ],
    theme: true,
    image: 'theme.jpg',
    imageWhole: true,
    paths: [
      {
        id: 'k-drama-shooting-spots',
        name: 'K-Drama shooting spots',
        seoTitle: 'K-drama filming locations in Korea: 20 spots on a map',
        seoDescription:
          'Where Korean dramas were filmed: Mr. Sunshine, The Glory, Goblin, Winter Sonata, Jumong and more. 20 sets and locations on one map, with the drama behind each place.',
        updated: '2026-10-31',
        image: 'kdrama.jpg',
        imageCredit: 'Photo: Choi2451 · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1EYhgxfPiltP6Ns7IbUJQiuwoBN6ha2U',
        keywords: ['Korea', 'KDrama', 'FilmingLocations', 'MrSunshine', 'TheGlory', 'Goblin', 'WinterSonata', 'NamiIsland', 'KoreanFolkVillage', 'Mungyeong', 'Nonsan', 'KoreaTravel'],
        whyVisit: [
          "For the drama you finished at 2 a.m. and now want to **stand inside**.",
          "Nine whole towns were built for television, from the Mr. Sunshine street to a Joseon royal court. The rest are real places a drama made famous, like **the breakwater where a goblin was summoned**.",
          "Some of it is an hour from Seoul; the rest is a road trip.",
        ],
        story: {
          title: 'Why Korea builds whole towns for television',
          text: [
            "A period drama needs streets that no longer exist, so production companies build them. **Naju** opened its set in 2006 for the drama Jumong, and reports at the time counted 650,000 visitors in the first months. **Mungyeong** has two open sets that, by one count, have hosted about 300 dramas and films since 2000, and Hapcheon's set is reported to have passed 190.",
            "After the cameras leave, the town stays. Some sets became theme parks, some are rented out again, and a few are taken down: the baduk park from The Glory was mostly dismantled once filming ended. That is why each pin below says what you can still see.",
            "Not every pin is a built set. **Nami Island** was already a real place before **Winter Sonata** (2002) made its tree-lined avenue famous and helped start the first wave of Korean-drama tourism, and a **Gangneung breakwater** became a pilgrimage site the same way after **Goblin** (2016–2017): the city itself started promoting it as a filming location in 2026.",
          ],
        },
        notices: [
          {
            icon: '🎬',
            title: 'Sets close on filming days',
            body: 'Open sets can **close for a shoot without much warning**, and sources disagree on Iksan Prison Set\'s closing day. Look at the Naver Map page for the hours before you drive out.',
            since: 'Tourist listings and local press, checked October 2026.',
          },
          {
            icon: '🏗️',
            title: 'The Glory baduk park was a temporary set',
            body: 'The giant **baduk boards beside Cheongnaru** were built for filming in 2022 and mostly removed afterwards. In March 2023 Incheon said it would rebuild part of the set; check what stands there now.',
            since: 'Press report, March 2023. Not rechecked since.',
          },
        ],
        guide: {
          intro: [
            "🎬 The places around Seoul fit into two day trips; each of the southern sets is a trip of its own, and usually needs a car.",
            "Sets close on filming days, so check before a long drive. Where I couldn't confirm a named drama for a place, the text says so rather than guessing.",
          ],
          route: [
            "Yongin Daejanggeum Park: MBC's period-drama park of about 84 hectares. Reports list Jumong, Moon Embracing the Sun and Queen Seondeok among its dramas. The original Dae Jang Geum set stood in Yangju and closed in 2011.",
            "Korean Folk Village, Yongin: a Joseon-style village with a market street and a government office. One report names KBS2's Eun-ae-ha-neun Doejeok-nim-a, shot at its Jeju-mok bridge.",
            "Wolhwawon Garden, Hyowon Park, Suwon: a Cantonese garden built under a 2003 Gyeonggi–Guangdong friendship agreement. Known as a location of Scarlet Heart: Ryeo and Moonlight Drawn by Clouds, both 2016.",
            "Unhyeongung Yanggwan, Seoul: the Western-style house of the Unhyeongung estate. Goblin used Unhyeongung as Kim Shin's house; the sources I found do not say which building. Duksung Women's University uses the Yanggwan today.",
            "Yanghwajin Historical Park, Seoul: a riverside history park with a public toilet at its car park. I found no named drama here; it is a calm Han River stop between the other places.",
            "Incheon Open Port Street: the late-1800s port district. Mr. Sunshine is set in this era and its characters sail from Jemulpo, though it was filmed in Nonsan. Incheon's Goblin course also passes Freedom Park and the Jemulpo Club.",
            "Cheongnaru, Cheongna Lake Park: the pavilion beside the baduk-park scenes of The Glory. The set was mostly dismantled after filming (see the box above).",
            "Heyri Art Village, Paju: set up in 1998 by about 380 publishers and artists, with a 12 m height limit and no walls. Tourist listings call it a modern-drama backdrop; I could not confirm a title.",
            "Byeokchoji Arboretum, Paju: 27 Eastern and Western gardens around a pond. Listings say dramas and films were shot here but do not name them.",
            "First Garden, Paju: a second garden about 15 km away, listed the same way. Treat it as a separate stop.",
            "Sunshine Studio, Nonsan: the main Mr. Sunshine set, with the Glory Hotel, modelled on Seoul's first Western-style hotel, the Sontag Hotel. Sunshine Land, 150 m away, is the experience hall.",
            "Choi Champan House, Pyeongsa-ri, Hadong: a village of 14 hanok built as a set around 2002. It stars as the home in Toji (SBS, 2004 to 2005), and Mr. Sunshine and Moonlight Drawn by Clouds also shot here. The Choi family in the novel is fiction.",
            "Hapcheon Image Theme Park: reported to have hosted over 190 productions, including Mr. Sunshine and the films Assassination, Taxi Driver and The Age of Shadows. A Blue House set was added in 2015 at about two thirds of the real size.",
            "Suncheon Drama Filming Site: a 1960s to 1980s hillside village. Listings name Eden's East, Love and Ambition and Giant; recent shoots include When Life Gives You Tangerines.",
            "Mungyeong Saejae Open Set: a Joseon royal court and market street. Taejo Wang Geon, The King's Affection and The Red Sleeve were shot here, and the 2026 film The King's Warden. Press lists Kingdom's first two seasons too.",
            "Buan Image Theme Park: the set of the 2005 film The King and the Clown. Press also names the dramas Dong Yi (2010) and Gu Family Book (2013) for its naval-headquarters set.",
            "Naju Image Theme Park: opened in 2006 as the Samhanji Theme Park for the drama Jumong. Meet at the main gate.",
            "Iksan Prison Set: Korea's only set built as a prison, on the grounds of a closed branch school. Prison Playbook, Signal and The Penthouse are named in local press; counts of productions vary from about 28 to over 200.",
            "Nami Island, Chuncheon: a real riverside park, not a set, whose tree-lined main avenue was filmed for Winter Sonata (2002). The drama's popularity, especially in Japan, is widely credited with starting the island's run as a tourist destination; reached by ferry from Gapyeong.",
            "Goblin Breakwater, Jumunjin, Gangneung: the breakwater where Gong Yoo summons Kim Go-eun in Goblin (2016 to 2017). Gangneung's own tourism office promoted it as a filming-location spot in March 2026; it is free to walk out on, and busy with photographers at weekends.",
          ],
          tips: [
            "🚗 Everything outside Seoul is easiest by car. Mr. Sunshine fans can chain Nonsan, Hapcheon and Hadong over two days.",
            "📸 Paju has two gardens and Heyri within about 15 km: Byeokchoji and Heyri fit in one afternoon, First Garden is the detour.",
            "🗺️ On the big sets the marker is the main entrance, not each filming spot.",
            "🔗 Heyri also appears on our Abroad in Korea map, Incheon Open Port Street is next to the Incheon China Town walk, and Nami Island has its own full page on our Gapyeong path.",
          ],
        },
      },
      {
        id: 'abroad-in-korea',
        name: 'Abroad in Korea',
        seoTitle: "Korea's German village, Petite France and more",
        seoDescription:
          'Korean places that feel like somewhere else: European villages, Japanese colonial sites, China Towns and Central Asian districts. 22 places, plus a map of the Sinan chapel trail.',
        updated: '2026-10-31',
        image: 'abroad.jpg',
        imageCredit: 'Photo: Choi2451 · CC0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1Bbj7tkaIr9_-vF7Y9NRViJcr3pulbGQ',
        keywords: ['Korea', 'ChinaTown', 'GermanVillage', 'PetiteFrance', 'Gapyeong', 'NijimoriStudio', 'Gunsan', 'Itaewon', 'Sinan', 'Seomtiago', 'ThemedVillages', 'KoreaTravel'],
        whyVisit: [
          "**A change of scene without a flight.** German houses by the sea, a Greek-white resort, an Edo-period film village, a Mongolian lane in Seoul.",
          "**Twelve chapels on five islands joined by tidal causeways**, nicknamed Seomtiago after the Camino.",
          "Twenty-two places in five groups across the country: pick one region.",
        ],
        story: {
          title: 'Why Korea has a German village',
          text: [
            "Most of Korea's \"abroad\" was built for one of three reasons. **Ports**: Incheon opened to foreign trade in 1883, and Busan's Chinese quarter dates to a Qing consulate in 1884. **Armies**: Songtan and Itaewon grew up beside American bases. **Homecomings**: the German Village in Namhae was built for Korean miners and nurses who had worked in Germany and come home.",
            "The rest are copies of a holiday: Provence, Santorini and Switzerland rebuilt as theme villages and resorts, Jeju's Swiss Village as recently as 2016. Gunsan's Japanese houses and temple are different again, left over from the colonial period.",
          ],
        },
        notices: [
          {
            icon: '🌊',
            title: 'Sinan 12 Apostles trail: check the tide',
            body: 'The twelve chapels stand on five islands joined by **causeways that sink at high tide**, so the path can be cut. Look up the tide table (물때표) before you set out. The way over is the **ferry from Songgong Port** (송공항): about 1 hour 7 minutes to the end of the line, reported 2026 departures 06:50, 09:30, 12:30 and 15:10, adult fare 6,500 won. I could not confirm the return times, so check the **last boat back** with the terminal (061-261-4221) before you start walking.',
            since: 'Korean press reports 2019 to 2023; ferry times from a travel blog citing the operator, April 2026. Confirm with Sinan County and the ferry operator before you go.',
          },
        ],
        guide: {
          intro: [
            "🌍 **Pick one region at a time**: the two villages at Gapyeong an hour from Seoul, Paju's Provence and Heyri, Gunsan's Japanese houses, or the long-distance Europe down south, each a trip in itself.",
            "Some of these are theme villages built for visitors; others are neighbourhoods where people live, so ask before you photograph anyone. The Sinan chapel trail depends on the tide.",
          ],
          route: [
            "Gapyeong, about an hour from Seoul: Petite France and the Italian Village (Pinocchio and Da Vinci), a short walk apart.",
            "Paju, north-west of Seoul: Provence Village and the Heyri Art Village, a few minutes apart.",
            "The long-distance Europe: Namhae German Village, Oedo Botania by boat off Geoje, Asan's Mediterranean Village, Solbeach Samcheok, Jade Garden in Chuncheon, Damyang Meta Provence and Jeju's Swiss Village. Each is a trip of its own.",
            "**Sinan 12 Apostles Pilgrimage Trail** (신안 12사도 순례길): twelve small chapels, each named for an apostle, on five islands in Jeungdo-myeon, joined by paths and tidal causeways. It is nicknamed Seomtiago after the Camino de Santiago.",
            "Getting to the Sinan chapels: drive to **Songgong Port** (about 25 minutes from Mokpo over the Aphae Bridge) and take the ferry. It calls at the **Soak**, **Sogijeom** and **Daegijeom** docks, in that order. Chapel 1 stands at the end of the Daegijeom pier.",
            "Japan in Korea: Hirotsu House and Dongguksa temple in Gunsan, and Nijimori Studio, an Edo-style film-set village in Dongducheon.",
            "China Towns: Incheon (our walk is on this site), Busan, where Texas Street next door has had Russian shops since the 1990s, and Daerim-dong in Seoul.",
            "American districts: Songtan beside the Osan air base, and Itaewon's World Food Street near the old Yongsan garrison.",
            "Central Asia and the Middle East in Seoul: Central Asia Street and Mongol Town by Dongdaemun, and the Seoul Central Mosque on Itaewon hill.",
          ],
          tips: [
            "🔗 Several of these have their own page on this site: Gapyeong with Nami island, Incheon China Town and the Busan culture villages.",
            "🕌 At the Seoul Central Mosque, dress modestly and ask before you go inside.",
            "🚌 Check the way to each place on Naver Map before you go; most outside Seoul need a car, a taxi or a long bus ride.",
            "🚢 The Sinan line is approximate in places: the short links to chapels 3, 9, 11 and 12 are drawn straight, so follow the signs on the ground. Wear shoes that can get wet or muddy, and take water with you.",
          ],
        },
      },
      {
        id: 'bts-army-tour',
        name: 'BTS Army Tour',
        seoTitle: 'BTS filming locations in Korea: 34 places on one map',
        seoDescription:
          'BTS pilgrimage map: the Spring Day station, the You Never Walk Alone bus stop, Butter beach, Daechwita, the Tonight Show palace stage, Yujeong Sikdang and the Busan and Daegu murals, with Naver links.',
        updated: '2026-10-31',
        image: 'bts.jpg',
        imageCredit: 'Photo: Real SLOW TV · CC BY 3.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1iNNOEVkwLmYVLl9vaZSpOUs1iMUe1pc',
        keywords: ['Korea', 'BTS', 'ARMY', 'BTSFilmingLocations', 'SpringDay', 'IryeongStation', 'Jumunjin', 'Butter', 'Daechwita', 'Gamcheon', 'KoreaTravel'],
        whyVisit: [
          "**Stand where the video was shot.** The Spring Day platform is a working station, the Butter parasols are still up on the beach, and the trainee-days diner still grills pork.",
          "The palace stage from the Tonight Show, and the members painted on the walls of their hometown streets.",
          "Thirty-four places across the country, and **every one is tied to a song, a show or a member**.",
        ],
        story: {
          title: 'The pilgrimage the label never planned',
          text: [
            "HYBE does not publish where its videos are shot, so every place on this map was found by fans: frame by frame, then on foot. When **Save ME** came out in 2016 nobody could find the field; it turned out to be the reclaimed flats of **Saemangeum**. The lone bus stop from the You Never Walk Alone cover was a prop on Jumunjin's Hyangho Beach, taken down after the shoot; the town rebuilt it when the visitors kept coming.",
            "The cities caught up. For the tenth anniversary in 2023 the Seoul Tourism Organization printed a **Seoul BTS tour map** of 13 places, from the trainee-days diner in Nonhyeon-dong to the Run BTS sites, and Daegu and Busan painted the members on the walls of their hometowns.",
          ],
        },
        notices: [
          {
            icon: '🎬',
            title: 'Which places are confirmed, and which are fan lore',
            body: "The label does not confirm locations. Press-confirmed on this map: **Hyangho Beach, Maengbang Beach, Iryeong Station, Gyeongbokgung, World Cup Bridge, Sungnyemun, the Daegu and Busan murals**. Pins marked \"reported by fan tour lists\" (Achasan, the Oil Tank park, Nodeul Island, Euljiro, Ueumdo, Hwarang Hill and others) rest on fan research only.",
            since: 'Checked against press reports, 30 October 2026.',
          },
          {
            icon: '🚫',
            title: 'Two sites cannot be entered',
            body: "**Jichuk train depot** (Love Yourself: Her photos) is a working Seoul Metro depot and **World Cup Bridge** (Dynamite) is a road bridge: look from the road and the river park, do not go in or walk on them. The SNU old pool is inside a university campus.",
            since: 'Site rules, checked 30 October 2026.',
          },
          {
            icon: '⏰',
            title: 'Gyeongbokgung closes on Tuesdays',
            body: "The palace of the Tonight Show stage is open **09:00–18:00** (to 17:00 November to February), **closed Tuesdays**, ₩3,000, free in hanbok. Sungnyemun is closed Mondays. The Oil Tank Culture Park is closed Mondays.",
            since: 'Official palace site and Naver Map, checked 30 October 2026.',
          },
          {
            icon: '🎟️',
            title: 'Seohuri Forest and Awon charge entry and change by season',
            body: "**Seohuri Forest** (2019 Season's Greetings) is a private forest with an entry fee and opening days that change by season. **Awon** in Wanju (2019 Summer Package) admits day visitors through its gallery café, about ₩10,000 with a drink. Check both on Naver before driving out.",
            since: 'Naver Map, checked 30 October 2026.',
          },
        ],
        guide: {
          intro: [
            "💜 **Pick a region and let Naver drive**: Gangwon, Seoul, Gyeonggi, Chungcheong and Jeolla, or Gyeongsang with the two hometowns.",
            "Start with the place nearest where you're sleeping; the rest of the region follows from there.",
          ],
          route: [
            "Gangwon: the BTS bus stop at Hyangho Beach in Jumunjin (You Never Walk Alone cover; the Spring Day jacket was shot on the breakwater nearby), Maengbang Beach in Samcheok (Butter), Gimyujeong Station as the Chuncheon stop, and Phoenix Pyeongchang, where In the SOOP 2 was filmed and the house was opened to visitors in 2022.",
            "Seoul: Gyeongbokgung (IDOL in front of Geunjeongjeon and Mikrokosmos at Gyeonghoeru for the Tonight Show, September 2020), World Cup Bridge (Dynamite), Sungnyemun (Permission to Dance for Global Citizen Live, 2021), the National Museum (Dear Class of 2020), Yeouido Hangang Park (BTS Festa 2023), HYBE headquarters, and the trainee years in Nonhyeon-dong: Hakdong Park and Yujeong Sikdang.",
            "Gyeonggi: Iryeong Station in Yangju (Spring Day), Seohuri Forest in Yangpyeong (2019 Season's Greetings), Yongin Daejanggeum Park (Daechwita, Agust D), Jichuk depot (Love Yourself: Her, view from outside) and Ueumdo in Hwaseong.",
            "Chungcheong and Jeolla: Awon hanok in Wanju (2019 Summer Package), Jecheon airfield (Epilogue: Young Forever), the Saemangeum Seawall (Save ME), and RM's Damyang walk along the Metasequoia Road and Gwanbangjerim.",
            "Gyeongsang: Gamcheon Culture Village with the Jimin and Jungkook mural, Busan Citizens Park and its V road, the V mural street at Daeseong Elementary in Daegu and the Suga lanes by Myeongdeok Station, Gyeongju's Hwarang Hill and Cheomseongdae from RM's trip, and Gyeongjeong Port in Yeongdeok (HYYH prologue).",
          ],
          tips: [
            "🗺️ Pink camera pins are the filming and photo-shoot sites; purple pins are where the members lived, ate and performed.",
            "🚗 The regions are hours apart: Seoul and Gyeonggi fit in two days by subway and bus, the Gangwon beaches are a day by car along the coast, and the south is a trip of its own. Jumunjin to Maengbang is about 90 minutes by car.",
            "📸 Daeseong Elementary is a working school: photograph the wall from the street and leave the gate alone. The same goes for the SNU campus and the depot.",
            "🍜 Yujeong Sikdang grills pork and is open daily, about 10:00–21:30 on weekdays and to 20:00 at weekends, checked 30 October 2026; the walls are covered in ARMY notes, so bring a pen.",
            "📍 If you know a better-documented spot than one of these, tell me and I'll move it.",
            "🔗 Gyeongbokgung is on our Hanok Villages walk, Gamcheon on the Busan Culture Villages path, and Daejanggeum Park and Heyri are on the K-Drama map.",
          ],
        },
      },
    ],
  },
]

// ── Lookup helpers ───────────────────────────────────────────
export const findCity = (cityId?: string) => cities.find((c) => c.id === cityId)

export const findPath = (cityId?: string, pathId?: string) =>
  findCity(cityId)?.paths.find((p) => p.id === pathId)

// A path whose map link has not been filled in yet is shown but not openable.
export const hasMap = (path: TravelPath) =>
  Boolean(path.mapUrl) && !path.mapUrl.includes('REPLACE_ME')

// Google My Maps share links and embed links share the same `mid` id, so the
// embed URL can be derived instead of stored twice.
export const mapEmbedUrl = (path: TravelPath) => {
  const mid = /[?&]mid=([^&#]+)/.exec(path.mapUrl)?.[1]
  if (!mid || mid === 'REPLACE_ME') return undefined
  return `https://www.google.com/maps/d/embed?mid=${mid}&ehbc=2E312F`
}
