// ─────────────────────────────────────────────────────────────
// Edit this file to add your own cities and paths.
// Each path's `mapUrl` is a Google My Maps share link, e.g.
//   https://www.google.com/maps/d/viewer?mid=XXXXXXXX
// ─────────────────────────────────────────────────────────────

// Tags are shown as pills under the path title. A plain string can start
// with an emoji; for a drawn icon use { icon, label } (see TagIcon.tsx).
export type TagIconName = 'hiker' | 'moon' | 'village' | 'sunset' | 'blossom' | 'hiking' | 'hot'
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

export type TravelPath = {
  id: string
  name: string
  description?: string
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
  liveCam?: { videoId: string; caption: string } // YouTube live stream, embedded under the map
  mapUrl: string
}

export type City = {
  id: string
  name: string
  image?: string // file in ./assets, shown as the city card's header photo
  imageCredit?: string // shown as a small label on the photo
  paths: TravelPath[]
}

export const cities: City[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    image: 'seoul.jpg',
    imageCredit: 'Photo: Seoul Tourism Organization · KOGL 1',
    paths: [
      {
        id: 'naksan-cheonggyecheon',
        name: 'Fortress wall and stream',
        description: 'Naksan Park fortress wall at dusk, then down to the Cheonggyecheon stream lights.',
        duration: '3h',
        updated: '2026-10-20',
        tags: [{ icon: 'moon', label: 'Night walk' }],
        image: 'naksan.jpg',
        imageCredit: 'Photo: Seoul Metropolitan Fire & Disaster HQ · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1w8F-eVqm5RpMFykhZ3HQUrb9TydjQV8',
        keywords: ['Seoul', 'NightWalk', 'Naksan', 'SeoulCityWall', 'Cheonggyecheon', 'Dongdaemun', 'GwangjangMarket', 'SunsetView', 'KoreaTravel'],
        guide: {
          intro: [
            "🌙 If I could take a first-time visitor on just one evening walk in Seoul, it would be this one. **Naksan** is a tiny hill, only 125 m, but stand on its old city wall at **sunset** and the whole of Jongno, Bukhansan and Namsan Tower are laid out in front of you, for free.",
            "Then it only gets easier. The wall carries you downhill to Dongdaemun gate, and the **Cheonggyecheon** stream, lit up and full of life after dark, carries you 3.3 km west through the old city to Cheonggye Plaza. 5.6 km, almost all downhill or flat, with dinner at **Gwangjang Market** halfway.",
          ],
          route: [
            "Naksan Park entrance on the Dongsung-dong side, 10 min uphill from Hyehwa Station exit 2: the park path to the central plaza and the small exhibition hall on the wall's history.",
            "First View Plaza: panorama west over Jongno, Bukhansan and N Seoul Tower. Best light at sunset.",
            "Join the Seoul City Wall and keep it on your left all the way down. The first secret gate opens onto Ihwa Mural Village and the angel-wings mural 100 m down the lane. Residents live here, so keep quiet.",
            "Heunginjimun Park above the road, then Dongdaemun gate itself in the middle of the junction. The silver curves of Dongdaemun Design Plaza are a short detour south.",
            "Down the stairs at Cheonggyecheon Fashion Plaza and upstream along the water: the Jeon Tae-il bridge, Gwangjang Market overhead at Saebyeok-dari, the Sewoon arcade sky deck.",
            "The 192 m ceramic mural of King Jeongjo's procession, Gwangtonggyo, the oldest stone bridge on the stream, and the candle fountain at Cheonggye Plaza. Gwanghwamun and City Hall stations are minutes away.",
          ],
          tips: [
            "🚇 Getting there: Hyehwa Station (line 4), exit 2, then through the Daehangno theatre quarter and up Naksan-gil.",
            "🍜 Gwangjang Market, directly above the stream halfway along, is the dinner stop: bindaetteok mung-bean pancakes, mayak gimbap and yukhoe. Most stalls run until late evening.",
            "🔦 The wall path is steps and slopes with dark patches between the lit sections; a phone torch helps. The stream walkway is flat and lit.",
            "📍 The stream walkway closes after heavy rain. Toilets at the Naksan central plaza.",
          ],
        },
      },
      {
        id: 'haebangchon-evening',
        name: 'Haebangchon late evening walk',
        description:
          'Haebangchon evening walk, 2.4 km: the 108 Stairs, the Sinheung Market food alleys, Sowol-ro rooftop views and the Seoul City Wall to Baekbeom Square.',
        duration: '2h',
        updated: '2026-10-23',
        tags: [{ icon: 'sunset', label: 'Evening walk' }],
        image: 'haebangchon.jpg',
        imageCredit: 'Photo: Lee Jeong Woo / Korea MCST · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1kOFoicmAJJvQvsioIIOu1ng9dDQ4Exk',
        keywords: ['Seoul', 'Haebangchon', 'HBC', 'SinheungMarket', 'Namsan', 'RooftopBar', 'SeoulCityWall', 'Itaewon', 'KoreaTravel'],
        guide: {
          intro: [
            "🌆 **Haebangchon**, 'Liberation Village', is my favourite corner of Seoul after dark. Refugees from the north built it on the hillside between Namsan and Yongsan after 1945, and today its steep lanes hide a tiny roofed market full of Thai, American-Chinese and Korean kitchens, with **rooftop bars** looking out over the whole city.",
            "This 2.4 km walk climbs about 160 m in total from Huam-dong through **Sinheung Market** and the Sowol-ro viewpoints to the old city wall below Namsan. Set off **an hour before sunset**: dinner in the market, dusk on the rooftops, the lit wall to finish. Trust me on the order.",
          ],
          route: [
            "Huam-dong bus terminus (village bus Yongsan 02): a short alley to the 108 Stairs, built in 1943 as the approach to a Japanese war shrine. Climb them or ride the inclined elevator beside them.",
            "Up Sinheung-ro to the Sinheung Market sign, the classic photo. Do not go in yet: continue to the five-way junction and enter the market by the hidden stairs opposite Haebang Church.",
            "Inside Sinheung Market: a loop through the alleys under the transparent roof, with restaurants on the ground and upper floors. Leave on the east side by Mega Coffee.",
            "Back to the junction and into the alley between the 7-Eleven and the lottery shop. It climbs north-west to the Cliff rooftop bar, where the valley opens up.",
            "Stairs up to Sowol-ro: the Soyo rest area viewpoint and the Comfort Seoul terrace, where the road runs at rooftop level above the cafés.",
            "Cross Sowol-ro at Namsan Library and follow the Seoul City Wall, Namsan Tower on your right, to Baekbeom Square and the statue of Kim Koo. The lit wall path continues up Namsan from here.",
          ],
          tips: [
            "🚇 Getting there: village bus Yongsan 02 to its last stop, the Huam-dong terminus, where the walk starts.",
            "🍜 Dinner in the market: Pad Ka Pao for Thai on the second floor, Haebangchon Dak for herbal roast chicken, H5NG for neon American-Chinese. Mersin Kebab's tantuni and Haebang Wang Gopchang are a minute away. Haebang Park's rooftop café is where to wait out a queue and catch the sunset.",
            "👟 The lanes are steep and some stairs are unlit; wear proper shoes. The village bus shares the narrow road, so step aside when it comes.",
            "🚻 Public toilets are pinned in their own layer: by Sinheung Market, on the Sowol-ro climb, by Namsan Library and the City Wall, and near Baekbeom Square.",
            "📍 The lit wall path continues up Namsan from Baekbeom Square.",
          ],
        },
      },
      {
        id: 'hanok-villages',
        name: 'Hanok Villages',
        description: 'Cheong Wa Dae to Bukchon, Ikseon-dong and Insadong, ending at Ssamziegil. 5.1 km, with Namsangol Hanok Village and Pil-dong food as an extra.',
        duration: '2h',
        updated: '2026-10-24',
        tags: [{ icon: 'village', label: 'Traditional' }],
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
            "🏯 This is the walk I give friends on their first day in Seoul. Jongno is the old heart of the city, laid out in 1394 between the palaces and the city wall, and in 5.1 km you get all three of its hanok quarters: **Bukchon**, where tiled roofs step down the hill between two palaces; **Ikseon-dong**, a 1920s block of tiny hanok that are now cafés; and **Insadong**, the street of galleries, tea houses and craft shops.",
            "It is a daytime walk and mostly flat, apart from the climb into **Bukchon**. Two hours of walking, but **take the whole day**: there are palaces, markets and far too much good food along the way.",
          ],
          route: [
            "Cheong Wa Dae, the former presidential Blue House, if you have booked a visit; otherwise start at Gyeongbokgung's east gate. Walk east along Cheongwadae-ro to Samcheong-dong.",
            "Turn into the lane beside the Samcheong police box: rice-cake skewers at Pungnyeon Ssalnongsan, then the cafés and galleries around Jeongdok Library.",
            "Up into Bukchon Hanok Village: the Gahoe-dong 31 alley and the viewpoint on Bukchon-ro 12-gil, roofs in the foreground and Namsan behind. Morning is quietest. Back downhill to Anguk Station.",
            "East along Yulgok-ro and down Samil-daero to the Hyundai Trevian apartments; the lane beside them leads into Ikseon-dong's hanok street. Meals are in the grill alley, Donhwamun-ro 11ga-gil.",
            "Past Jongno 3-ga, where one lane fills with pojangmacha street-food tents after dark, and Tapgol Park.",
            "Insadong-gil from its south end to the top, ending at Ssamziegil, the spiral-ramp craft mall. Anguk Station is 250 m north.",
            "Extension, not on the walking line: **Namsangol Hanok Village** at Chungmuro Station exit 4, a garden of old hanok moved here from around Seoul, then lunch or coffee in Pil-dong next door.",
          ],
          tips: [
            "🚇 Getting there: Anguk Station (line 3) sits in the middle of the walk. Cheong Wa Dae visits need a free online reservation in advance.",
            "📍 Bukchon is a residential area with posted quiet hours. Stay on the marked lanes and keep voices down, especially around Gahoe-dong.",
            "🍜 Eat little and often: rice-cake skewers in Samcheong-dong, Ikseon-dong grills, Insadong tea houses. Gwangjang Market is a short hop from the end.",
            "📍 Extras pinned on the map: Gwanghwamun Square and the gate, Changdeokgung and Changgyeonggung palaces, and Seosulla-gil, the café lane along the Jongmyo Shrine wall.",
            "📍 Hanbok rental shops cluster around Anguk; wearers enter the royal palaces free.",
            "🏡 Namsangol Hanok Village is free to enter. Unlike Bukchon, where most hanok were altered and are small, it shows a variety of old elite homes, with a garden, Cheonugak Pavilion and a time capsule buried in 1994. Seoul Namsan Gugakdang, a performance hall, is up the road. Check opening days and the show schedule on the official site (hanokmaeul.or.kr) before you go.",
            "🍜 Pil-dong, beside Namsangol, is the food district: Pildong Myeonok for Pyongyang naengmyeon, Pildong Hambak for hamburger steak, Dongdae Dakhanmari for chicken stew, and cafés like Sector Coffee and Hebe Coffee. Korea House near Chungmuro Station serves royal-style meals and tea. All pinned in their own layers; restaurants and cafés were checked on Naver on 24 October 2026.",
            "🚻 Public toilets are pinned in their own layer: Tapgol Park, Anguk Station, Insadong-gil, near Ssamziegil, by the Bukchon Village Info Centre and at Namsangol.",
          ],
        },
      },
      {
        id: 'inwang-mountain-trail',
        name: 'Inwang Mountain Trail',
        description: 'Seoul fortress wall climb with views over Gyeongbokgung and the whole city.',
        duration: '2.5h',
        updated: '2026-10-22',
        tags: [
          { icon: 'hiker', label: 'Hiking' },
          { icon: 'sunset', label: 'Evening walk' },
        ],
        image: 'inwangsan.jpg',
        imageCredit: 'Photo: Rtflakfizer · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1JPHJVSHobZnrwTiCPU8KQt-3SUX3Wqg',
        keywords: ['Seoul', 'Inwangsan', 'SeoulHiking', 'SeoulCityWall', 'Gyeongbokgung', 'NightView', 'Seochon', 'Beombawi', 'KoreaTravel'],
        guide: {
          intro: [
            "⛰️ **Inwangsan** is the hike I recommend to anyone who thinks Seoul is all neon. It is the granite peak right behind Gyeongbokgung palace, **338 m** high, with the 600-year-old city wall climbing straight over the top. From the summit the palace is at your feet, with Namsan Tower, Lotte Tower and the Bukhansan ridge all around you.",
            "Count on **an hour up** from Gyeongbokgung Station and an hour down through the forest shelter to the cafés of Seochon. It is a real hike, with cables and bare rock near the top, but you need nothing more than **shoes with grip** and a couple of bottles of water.",
          ],
          route: [
            "Gyeongbokgung Station exit 1: west along Sajik-ro to the CU store at the fork, the last shop before the summit. Buy water here.",
            "Past the Sajikdan altar wall onto Inwangsan Jarak-gil, an easy path past the Ungyeong House and the 1898 Hwanghakjeong archery pavilion.",
            "The Tiger Statue marks the trail entrance, 1.4 km from the station. Turn left into steep stairs; after a few minutes the view opens and the city wall appears.",
            "The viewpoint where the wall and Namsan Tower line up, then Beombawi (Tiger Rock), the photo spot and a famous night-view point. Many people turn around here.",
            "The last 400 m to the summit: slippery granite with cables and a cliff section. From the top the whole of central Seoul lies below.",
            "Descent: at the Gichabawi junction follow the Changuimun sign, not Gichabawi, then take the Suseongdong fork. The Forest Shelter, a converted guard post, steep boardwalk stairs to the Choso Bookshop café, and the Jarak-gil down to Suseongdong Valley and Seochon's Sejong Village Food Street.",
          ],
          tips: [
            "🚇 Getting there: Gyeongbokgung Station (line 3), exit 1. A taxi to the Tiger Statue saves the first 20 min on the road.",
            "🔦 Start about two hours before sunset to reach Beombawi as the lights come on, and carry a torch for the way down. Avoid rain and ice: the granite gets slippery.",
            "💧 Nothing is sold between the CU and Choso Bookshop; take two bottles of water each.",
            "🍜 Dinner in Seochon at the end: Seochon Gyedanjip for seasonal seafood, Naejadong Dakgalbi, Kimjin Moksam pork belly or Mokpo Sebal Nakji octopus, all pinned on the map.",
            "✂️ Shorter option: climb only to Beombawi and come back the same way, about 1.5 hours.",
          ],
        },
      },
      {
        id: 'cherry-blossom-walk',
        name: 'Cherry Blossom walk',
        description:
          'Four blossom walks for early April: Dorimcheon and the Anyangcheon embankment, Yeouido Yunjung-ro, the Seokchon Lake loop and the Namsan North Loop.',
        duration: '2–3h each',
        updated: '2026-10-20',
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
        },
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1PeaxeqCRk2SBgINAteHz4-fODippOZc',
        keywords: ['Seoul', 'CherryBlossom', 'Yeouido', 'Yunjungro', 'SeokchonLake', 'Namsan', 'Anyangcheon', 'SpringInKorea', 'KoreaTravel'],
        guide: {
          intro: [
            "🌸 Cherry blossom in Seoul is short and glorious: about **ten days in the first half of April**, usually a week after Busan. Everyone goes to **Yeouido**, and you should too, once. But these four walks are the ones locals actually use: two riverside tunnels in the west, the lake loop in the east and a car-free road on Namsan.",
            "Each is flat, 2 to 3.5 km and right by a subway station. Pick one for a morning or an evening, or do two in a day with **line 2**.",
          ],
          route: [
            "Dorimcheon and Anyangcheon embankment, 3.3 km: Sindorim Station exit 6 along the Dorimcheon stream to Dorimcheon Station, then south on the Anyangcheon embankment tunnel from Sinjeong Bridge to Gocheok Bridge. The quiet, local one.",
            "Yeouido Yunjung-ro, 2.6 km: National Assembly Station exit 6 around the back of the Assembly to the riverside road with about 1,800 trees. The city's festival street, closed to cars and very crowded at peak.",
            "Seokchon Lake loop, 3.4 km: Jamsil Station exit 2 or 3, around both lakes under the trees with Lotte World Tower behind them. The west lake is calmer.",
            "Namsan North Loop, 2.1 km: bus 01A or 01B from Dongguk University Station to the National Theatre, then the car-free loop road to Namsan Library, shaded and with views over the city.",
          ],
          tips: [
            "⏰ Go early morning or after dark. Yunjung-ro and Seokchon Lake are lit at night and far less crowded before 9 am.",
            "📍 Dorimcheon and Anyangcheon are the least busy; bring a picnic, there are few shops on the embankment.",
            "🔗 From Namsan Library, Myeongdong Station is 15 min downhill, and the Haebangchon walk on this site ends nearby if you want an evening extension.",
            "🌸 Timing varies by a week or two each year; check the national blossom forecast published in March before fixing a date.",
          ],
        },
      },
      {
        id: 'hongdae-hot-places',
        name: 'Hongdae Hot Places',
        description:
          'Two walks through the student quarter: the Gyeongui Line Forest Park from Yeontral Park past the Book Street to Seogang, and the Red Road busking street from Hongik University Station down to the Han River.',
        duration: '1–2h each',
        updated: '2026-10-20',
        tags: [{ icon: 'hot', label: 'Hot place' }],
        image: 'hongdae-hot.jpg',
        imageCredit: 'Photo: Ken Eckert · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1MacGBkR5Qdw577FGrG4yztVioZYpBy0',
        keywords: ['Seoul', 'Hongdae', 'Busking', 'YeontralPark', 'GyeonguiLineForestPark', 'RedRoad', 'SeoulNightlife', 'HanRiver', 'KoreaTravel'],
        guide: {
          intro: [
            "🎸 **Hongdae** is where Seoul goes to be young. The quarter around Hongik University, the city's art school, is home to indie music, busking and very late nights, and I have never once managed to walk through it quickly. Two very different walks start at Hongik University Station: a linear park on a buried railway line, and the red-paved **busking street** that runs down to the Han River.",
            "Do the park by day or early evening and the **Red Road after dark**. Together they are 4.6 km, with the station in the middle for a break.",
          ],
          route: [
            "Gyeongui Line Forest Park, 2.7 km: Gajwa Station exit 1 along the stream into Yeontral Park, the lawn stretch of Yeonnam-dong lined with cafés and bakeries where everyone picnics.",
            "Under the main road at Hongik University Station exit 3 and on to the Book Street: 250 m of book kiosks shaped like train carriages, open from about 11 am, closed Mondays.",
            "Ddaengddaeng-geori, the lane of bars named after the old crossing bell, then Seogang Station and the sky bridge. The park continues 1.5 km to Gongdeok if you want more.",
            "Red Road, 1.9 km: Hongik University Station exit 9 opens straight onto the busking street along Eoulmadang-ro. Dance crews and singers most evenings, biggest on Friday and Saturday nights.",
            "The Red Road stage and art centre at the midpoint, with Sangsu Station's café streets a short detour east.",
            "The road ends at Mapo Saebit Culture Forest, the park around the old Danginri power station, and the Han River path. Hapjeong Station is 10 min north-west.",
          ],
          tips: [
            "✂️ Shorter park walk: start at Hongik University Station exit 3 instead of Gajwa, 1.3 km to Seogang.",
            "⏰ Yeontral Park is packed on weekend afternoons; weekday mornings are the time for photos.",
            "🍜 Busking peaks between about 7 and 10 pm. Street food and the Hongdae Playground are beside the main stretch.",
            "⏰ Hongdae is Seoul's late-night district. The last trains leave around midnight; after that it is taxis or the all-night cafés.",
          ],
        },
      },
      {
        id: 'bukhansan-dulle-gil-1-3',
        name: 'Bukhansan Dulle-gil 1-2-3',
        description:
          'Trails 1 to 3 of the path that circles Bukhansan, from the Uiryeong-gil entrance in Ui-dong over the Pine Forest Path, the Pilgrimage Path past the April 19 cemetery and the White Cloud Path to the Bukhansan Eco Forest. 9.3 km, one colour per trail, with public toilets, restaurants and view cafés pinned.',
        duration: '4h',
        updated: '2026-10-22',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'bukhansan.jpg',
        imageCredit: 'Photo: Korea.net / KOCIS · CC BY-SA 2.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1hKTShjnYqc2Vq4R1aCOynVVpxKte1Is',
        keywords: ['Seoul', 'Bukhansan', 'BukhansanDullegil', 'SeoulHiking', 'Uidong', 'April19Cemetery', 'Hwagyesa', 'ForestWalk', 'KoreaTravel'],
        guide: {
          intro: [
            "🌲 **Bukhansan Dulle-gil** is the easy way to have the mountain without the climb: a 71 km path that circles the whole national park at the height where the city stops and the forest starts. These first three trails on the Seoul side are the ones I send people to, because you can start them from a subway station and finish at another.",
            "**9.3 km in three parts**, each with its own colour on the map: the Pine Forest Path from Ui-dong, the Pilgrimage Path past the independence fighters' graves and the April 19 cemetery, and the White Cloud Path up to its cloud viewpoint and down to the Eco Forest. Four hours at a wander, with a tofu lunch and a café stop built in.",
          ],
          route: [
            "Trail 1, Pine Forest Path, 2.9 km, about 1 hour: from the Uiryeong-gil entrance in Ui-dong, five minutes from Bukhansan Ui Station, through red pines past the Ui-dong picnic ground and the grave of independence leader Son Byong-hi to the top of Sol-bat (Pine Field) Park.",
            "Trail 2, Pilgrimage Path, 2.4 km, about 1 hour: from Sol-bat Park along the hillside above the April 19 National Cemetery, with the graves of patriots in the woods, to the entrance of Yi Jun's tomb. Mostly flat.",
            "Trail 3, White Cloud Path, 4.0 km, about 1.6 hours: the hilliest part, from Yi Jun's tomb up and over the ridge behind Hwagyesa temple to the Cloud Observatory, a 12 m tower above the trees, and down to the Bukhansan Eco Forest. Hwagye Station is 15 minutes further.",
            "Toilets are pinned in their own layer: Ui-dong transport plaza and picnic ground, Sol-bat Park, Baengnyeonsa entrance, the sports park and the forest playground near the end.",
            "Food and cafés are the pink pins, all checked on Naver: soft tofu in Ui-dong, the café street north of the start, the restaurants and cafés of the April 19 café road, and a book café in the woods below the Cloud Observatory.",
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
        description:
          'The warehouse district young Seoul goes to: from Seongsu Station along Yeonmujang-gil and its pop-up lanes to the Seoul Forest café street, 2.8 km. Walk it in either direction, and start or finish in Seoul Forest. Pop-up spaces, stationery and concept stores, bakeries and brunch, with toilets and checked cafés pinned.',
        duration: '3h',
        updated: '2026-10-22',
        tags: [{ icon: 'hot', label: 'Hot place' }],
        image: 'seongsu.jpg',
        imageCredit: 'Photo: CartoonChess · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1Xs1Bkx0p_e4CAlyFgUrz6PFnX9L8DGo',
        keywords: ['Seoul', 'Seongsu', 'SeongsuDong', 'PopUpStore', 'Bakery', 'CafeHopping', 'DaelimChanggo', 'SeoulForest', 'KoreaTravel'],
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
            "🧱 **Seongsu-dong** used to be Seoul's shoe-making and print-shop district, and the old brick factories are now the city's busiest streets for young people: pop-up stores, concept shops, stationery, bakeries and cafés in warehouses with the machinery left on show. People call it the Brooklyn of Seoul, which is a fair summary.",
            "The walk is **2.8 km and flat**: from Seongsu Station down the main street, through the pop-up lanes, and west to the quiet café street by **Seoul Forest**. Three hours with browsing and a bakery stop, and it works best late morning to evening, with weekends the busiest.",
            "🌳 **You can walk it either way.** Start at Seoul Forest and finish at Seongsu Station if you would rather begin with the park and end among the shops and a late dinner, or make the park the finale after a day of browsing. **Seoul Forest** is the city's big riverside park, opened in 2005 on a former racecourse: wide lawns, a deer paddock, a butterfly garden, a pond with a boardwalk and a path to the Han River. It is free, open all day, and it is where Seongsu goes to sit down. A picnic mat and a takeaway coffee from the café street is the classic way to end the walk.",
          ],
          route: [
            "Seongsu Station (line 2), exit 3: a few minutes to Daelim Changgo Gallery, the 1970s factory warehouse that started the café boom, and the Musinsa store in the brick building next to it.",
            "Yeonmujang-gil, the main street: Point of View on number 18, three floors of stationery and objects; Ader Error's concept space; and the queues for the salt-bread and ciabatta bakeries.",
            "Yeonmujang 5-gil, the pop-up lane: Dior, Lush's pop-up theatre, Frika and the changing food and brand events. Atelier-gil's small workshops and showrooms sit in the lanes beside it.",
            "Then west along the Seoulsup-gil café street, with Low Coffee Stand and Poset, the first Blue Bottle store in Korea in its old garage, and Seoul Forest at the end: lawns, deer, the pond boardwalk and the river path. Reverse the whole list if you start here.",
            "Toilets are pinned in their own layer, at the station and around Seoul Forest; bakeries, cafés and restaurants are pinned and checked on Naver.",
          ],
          tips: [
            "🚇 Getting there: Seongsu Station on line 2, exit 3, or Seoul Forest Station on the Bundang line at the park end. Both stations have toilets.",
            "⏰ Weekday late morning is the calm time. Weekend afternoons mean queues of an hour or more at the famous bakeries and pop-ups; ask for the day's wait on the Naver Map page.",
            "🍞 Salt bread and ciabatta sell out by late afternoon at the most popular shops.",
            "👟 Flat and fully on pavement. The lanes are one-way for cars, so watch for scooters and delivery vans.",
            "📍 Atelier-gil is marked approximately on the map: it is a local name for the workshop lanes between Yeonmujang 5-gil and Seoul Forest.",
          ],
        },
      },
      {
        id: 'gangnam-night-streets',
        name: 'Gangnam Night and Rainbow Bridge',
        description:
          'The back streets around Gangnam Station after dark: Seocho-daero 75-gil and 77-gil on the west side, Teheran-ro 1-gil on the east, and short walks from exits 10 and 11 along Gangnam-daero. Plus Garosu-gil in Sinsa-dong and the Banpo Bridge fountain with Sevit Island on the Han River. Starfield Library and Bongeunsa Temple are pinned for the daytime.',
        duration: '2h',
        updated: '2026-10-22',
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
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1VIazL8nrcXwzKDjTxKyxrbKGaNR9NYg',
        keywords: ['Seoul', 'Gangnam', 'GangnamStation', 'SeoulNightlife', 'Garosugil', 'KStarRoad', 'Apgujeong', 'BanpoBridge', 'MoonlightRainbowFountain', 'SevitIsland', 'StarfieldLibrary', 'Bongeunsa', 'KoreaTravel'],
        guide: {
          intro: [
            "🌃 **Gangnam Station** is where office Seoul lets its hair down. The main road is all towers and screens, but behind it is a dense grid of restaurants, bars, karaoke rooms and late shops that fills up the moment work ends. I have picked out the **three back streets** worth walking after dark and two short strolls from the station exits.",
            "There is no single route here. Wander the streets in any order, cross Gangnam-daero through the station and compare the two sides. **Two hours** covers it with a meal.",
          ],
          route: [
            "West side, Seocho-daero 77-gil and 75-gil: the main nightlife lanes behind the station, 0.6 km and 0.5 km of restaurants and pubs with queues from early evening.",
            "East side, Teheran-ro 1-gil and its branch: the quieter office-worker lanes from Gangnam-daero 102-gil up to Teheran-ro, with grill houses and bars.",
            "Gangnam Station exit 10, north along Gangnam-daero to the Kakao Friends flagship store, 0.3 km with the whole street lit by screens.",
            "Exit 11 to CGV Gangnam, the site of the old Dong-A Theatre, 0.4 km the other way.",
            "Pinned for daytime: Starfield Library in COEX mall and Bongeunsa temple opposite it, both at Samseong Station, two stops east on line 2.",
            "K-Star Road, about 1 km from Galleria West to Cheongdam crossing: Gangnam-gu's walking route past the Gangnam-dol photo house, the Rodeo street, a figure museum and the Dosan Park end, with the K-pop agency streets at Cheongdam. A good daytime walk before the night streets; toilets, brunch cafés and restaurants are pinned on the map. Gangnam-gu's own [K-Star Road guidebook (English PDF, large file)](https://www.gangnam.go.kr/etc/k_star_road_en/Gangnam_KSTARROAD_Guidebook%28EN%29.pdf) has the full zone-by-zone list.",
            "Garosu-gil, 1 km from Sinsa Station exit 8: 250 m along Dosan-daero, then the 700 m avenue of ginkgo trees north to Apgujeong-ro, flagship stores on the street and the quieter boutiques in the side lanes. Best in the late afternoon, yellow in early November.",
            "Banpo Bridge Moonlight Rainbow Fountain and Sevit Island: 15 min from Express Bus Terminal Station exit 8-1 through the underpass to Banpo Hangang Park. Watch the 19:30 or 20:00 show from the lawn, then walk over to the lit floating islands for the close-up view.",
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
        id: 'Indoors Trip',
        name: 'Indoors Trip',
        description: 'Rainy-day and winter-day spots under a roof: museums, markets, malls and cafés. Map coming soon.',
        updated: '2026-10-23',
        mapUrl: 'REPLACE_ME',
      },
    ],
  },
  {
    id: 'busan',
    name: 'Busan',
    image: 'busan.jpg',
    imageCredit: 'Photo: Busan Metropolitan City · KOGL 1',
    paths: [
      {
        id: 'cherry-blossom-walk',
        name: 'Cherry Blossom walk',
        description:
          'Four blossom walks for late March: the Oncheoncheon stream, Namcheon-dong to Gwangalli, Dalmaji-gil over the pass to Songjeong, and the Nakdong embankment at Samnak.',
        duration: '1.5–3h each',
        updated: '2026-10-20',
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
            "🌸 Busan gets its cherry blossom first, in the **last week of March**, about a week before Seoul. If you are in Korea at the end of March, this is where to be. These four walks spread across the city: a stream in the north, an apartment avenue by Gwangalli, the coast road over the pass to Songjeong and the Nakdong river levee near the airport.",
            "All start at a subway or light-rail station. Oncheoncheon, Namcheon-dong and Samnak are flat; **Dalmaji-gil** is a hill, and **worth every step**.",
          ],
          route: [
            "Oncheoncheon stream, 4.2 km: Oncheonjang Station down to the stream and south past Dongnae to Sebyeong Bridge and the Citizens Park with the festival stage. Lit at night.",
            "Namcheon-dong to Gwangalli, 3.4 km: Geumnyeonsan Station exit 3 to the 1 km tunnel of 40-year-old trees between the Samik Beach apartment blocks, then along the beach road to Gwangalli and the bridge light show.",
            "Dalmaji-gil to Songjeong, 7.3 km: Jung-dong Station to the east end of Haeundae Beach at Mipo, up the winding cherry road with the sea below, down to the Cheongsapo lighthouses and on to Songjeong Station.",
            "Nakdong embankment, 2.4 km: Gwaebeop-Renecite Station on the Gimhae light rail, north along the levee-top tunnel above Samnak Ecological Park, with canola fields below in April.",
          ],
          tips: [
            "⏰ Namcheon-dong is small and famous: weekday mornings only, unless you like crowds.",
            "🍜 On Dalmaji-gil the Blueline Park beach train and sky capsules run between Mipo and Cheongsapo if you want to ride one way. Cheongsapo does grilled clams.",
            "✈️ Samnak is 15 min from Gimhae Airport on the light rail, a good first or last stop of a trip.",
            "🍜 The Oncheoncheon festival weekend brings food stalls to the Citizens Park, and Dongnae's hot springs are a short walk from the start.",
          ],
        },
      },
      {
        id: 'haeundae-coast',
        name: 'Haeundae Coastal Path',
        description:
          'Haeundae Station to the beach, the Dongbaek Island boardwalk past Nurimaru, east along the sand to Mipo, the Blueline Park walkway along the cliffs to Cheongsapo and the Daritdol skywalk, and on to Songjeong Beach. 9.5 km in three parts.',
        duration: 'Half day',
        updated: '2026-10-21',
        image: 'haeundae.jpg',
        imageCredit: 'Photo: VN.NguyenDucDuy · CC BY-SA 4.0',
        liveCam: {
          videoId: 'NBZdNZYF1gI',
          caption: 'Live now at Songjeong Beach, where the walk ends. Stream: Ola Hotel Songjeong on YouTube.',
        },
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1gKDREXR2sVQ1HEIZyf-iAgOvJPGFgHY',
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
            "🌊 Haeundae is Korea's most famous beach, but the best part is what comes after it. Walk east and you get the camellia-covered **Dongbaek Island** with the APEC House and the Gwangan Bridge view, then the old railway line along the cliffs to Cheongsapo and Songjeong. It is the **easiest coastal walk** in the country.",
            "It is 9.5 km end to end, but it splits naturally into **three parts**: the island loop, the cliff walkway to Cheongsapo, and the stretch on to Songjeong. Do all three in half a day, or ride the Beach Train back from wherever your legs give out.",
          ],
          route: [
            "Dongbaek Island, the camellia-covered headland at the west end of the beach: a boardwalk loop around it past the Nurimaru APEC House, the mermaid statue and the view of Gwangan Bridge.",
            "The full length of Haeundae Beach east to Mipo, with the towers of Marine City behind you.",
            "From Mipo, the Blueline Park walkway follows the old Donghae Nambu railway along the cliffs to Cheongsapo, about 2 km, with the beach train and the sky capsules running beside it.",
            "Cheongsapo's twin lighthouses and the Daritdol skywalk; on to Songjeong Beach another 2.5 km if you have the legs, or the train back to Mipo.",
          ],
          tips: [
            "🚇 Getting there: Haeundae Station (line 2), exit 3 or 5, 10 min to the beach. Dongbaek Island is to the right as you face the sea.",
            "⏰ Half a day at an easy pace. Sunset from Dongbaek Island, or ride the sky capsule back from Cheongsapo at dusk; book capsules ahead on busy weekends.",
            "👟 Flat throughout: the island loop is boardwalk, the Blueline path is paved.",
            "🌸 The Busan cherry blossom walk on this site covers the Dalmaji-gil hill above the same coast in blossom season.",
          ],
        },
      },
      {
        id: 'villages-and-hotspots',
        name: 'Culture Villages and Hotspots',
        description:
          'The Gwangalli night walk, 2.9 km from Gwangan Station along the beach to the raw-fish town and the waterfront park under the lit bridge, plus the places every visitor asks about pinned on the same map: Jagalchi Market, BIFF Square and Gukje Market, Huinnyeoul and Gamcheon culture villages, and Haedong Yonggungsa temple on the rocks. Toilets and checked restaurants and view cafés at each.',
        duration: '2h walk',
        updated: '2026-10-22',
        tags: [{ icon: 'moon', label: 'Night walk' }, { icon: 'hot', label: 'Hot place' }],
        image: 'gamcheon.jpg',
        imageCredit: 'Photo: Basile Morin · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=11Nm3BTkYHgR9W5t2oMYbhGo-tN8Tg0k',
        keywords: ['Busan', 'Gwangalli', 'GwanganBridge', 'DroneShow', 'Jagalchi', 'BIFFSquare', 'GukjeMarket', 'Gamcheon', 'Huinnyeoul', 'Yonggungsa', 'KoreaTravel'],
        notices: [
          {
            icon: '🚁',
            title: 'Gwangalli drone show: every Saturday, twice',
            body: 'The **Gwangalli M Drone Light Show** flies over the beach **every Saturday**, about 12 minutes, free. **March to September at 20:00 and 22:00; October to February at 19:00 and 21:00.** Best seen from the middle of the beach or Millak Waterfront Park. Cancelled in rain or strong wind, usually announced the day before.',
            since: 'Busan city schedule for the permanent show, July 2026 to June 2027. Checked October 2026.',
          },
        ],
        guide: {
          intro: [
            "🌉 **Gwangalli after dark** is the Busan evening I send everyone to: a long beach with the Diamond Bridge lit in colour across the bay, chicken and beer on the sand, and at the far end a fish market where you buy your dinner downstairs and eat it on the steps under the bridge. On Saturdays a thousand drones draw pictures over the water.",
            "The walk itself is short, **2.9 km and flat**, which is why this map also carries the other places people ask me about in Busan: the Nampo-dong markets, the two hillside villages and the temple on the rocks. They are not on a walking line from each other, so each hot spot has its own pins, toilets and food, and the guide tells you how to get there.",
          ],
          route: [
            "Gwangan Station exit 3, ten minutes down Gwangan-ro, and the bridge fills the end of the street. Turn left along the beach promenade with the bridge ahead; the café street is one block behind you.",
            "Millak raw-fish town at the east end: skip the restaurants and go into the fishermen's market. Pick a fish downstairs, pay by weight, then either eat upstairs for a per-person table fee or carry it out to the park.",
            "Millak Waterfront Park, right under the bridge: steps, lawns and families on mats. The drone show and the bridge lights are best from here. Walk back along the beach for the bars, or on to Millak Port and the coast road.",
            "Nampo-dong, line 1 to Jagalchi: the fish market hall and quay stalls, BIFF Square's hotteok carts, the arcades of Gukje and Kkangtong markets, and the escalators up Yongdusan to Busan Tower for the view. Two hours on foot, all within a few hundred metres.",
            "Huinnyeoul Culture Village, bus 7, 71 or 508 from Nampo-dong over Yeongdo Bridge: white houses on the cliff lane above the sea, the short coastal tunnel and the Jeoryeong coast walk. Quieter than Gamcheon, with the same kind of photos.",
            "Gamcheon Culture Village, the 'Machu Picchu of Busan': hundreds of pastel houses stacked down a steep valley, built in the 1950s by refugees of the Taegeukdo faith and painted and filled with art from 2009. Bus 1-1, 2 or 2-2 from Toseong Station exit 6 to the top. Buy the stamp map at the information centre and follow the fish signs through the alleys: murals, small galleries in old houses, rooftop cafés, the lighthouse viewpoint and the Little Prince and the fox on the railing, the most queued photo in Busan. Allow two hours; it is all stairs and people still live here, so keep to the marked lanes.",
            "Haedong Yonggungsa, bus 181 from Haeundae Station, about 40 minutes: 108 steps down to the temple on the rocks above the sea. Toilets, restaurants and view cafés are pinned at every spot, all checked on Naver.",
          ],
          tips: [
            "🚇 Gwangan Station (line 2) for the walk; Jagalchi and Nampo stations (line 1) for the markets; Toseong Station (line 1) for the Gamcheon bus; Haeundae Station (line 2) for the Yonggungsa bus.",
            "⏰ Saturday is the night: the drone show at 20:00 or 19:00 by season, then the bridge lights on the hour. Weeknights are calmer and the fish market cheaper.",
            "🍜 The fish-market system: buy downstairs, then a table fee upstairs covers side dishes and soup; take-away to the park is free. At BIFF Square the seed hotteok queue moves fast.",
            "👟 Gwangalli and Nampo-dong are flat. Gamcheon and Huinnyeoul are stairs and slopes; Yonggungsa is 108 steps each way.",
            "🔗 The Haeundae Coastal Path on this site is two stops away from Gwangalli and makes the next morning.",
          ],
        },
      },
    ],
  },
  {
    id: 'jeju',
    name: 'Jeju',
    image: 'jeju.jpg',
    imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
    paths: [
      {
        id: 'jeju-olle-trail',
        name: 'Jeju Olle Trail 5-6-7',
        description:
          'Routes 5, 6 and 7 of the 437 km island trail: Namwon → Soesokkak → Seogwipo → Seogwipo Bus Terminal along the south coast, one colour per route, with every toilet and first-aid kit from the official maps.',
        duration: '1 day per route',
        updated: '2026-10-22',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'olle.jpg',
        imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1KEy42fnL8YeGcNgyhB_9PVreKLgwiTM',
        keywords: ['Jeju', 'JejuOlle', 'OlleTrail', 'Seogwipo', 'Oedolgae', 'Soesokkak', 'JejuHiking', 'Camellia', 'KoreaTravel'],
        guide: {
          intro: [
            "🥾 **Jeju Olle** is Korea's answer to the Camino: a 437 km trail around the island in 27 numbered routes. **Routes 5, 6 and 7** are my pick for a first visit. They follow the south coast through **Seogwipo**, the stretch with the warmest weather, the camellia groves and the island's most famous sea cliffs, and each one is a comfortable day's walk with Seogwipo as your base.",
            "Each route is one colour on the map, with the official stamp boxes, toilets and first-aid kits taken from the Olle Foundation's own maps. On the ground, follow the blue-and-orange ribbons and the little **blue horse signs**.",
          ],
          route: [
            "Route 5, Namwon Port to Soesokkak Bridge, 13.4 km: the Keun-ung cliff path, the Wimi camellia habitat (stamp), a 2.4 km wheelchair-accessible section between Taeutgae and Secheon Port, and the basalt shore at Neopbille, ending at the Soesokkak gorge.",
            "Route 6, Soesokkak to the Jeju Olle Tourist Center in Seogwipo, 10.1 km: Jejigi Oreum, the Socheonji tidal pool, the Seogwijinseong fortress walls and the Lee Jung-seop art street into Seogwipo Maeil Olle Market. The easiest of the three.",
            "Route 7, Seogwipo to the Bus Terminal, 12.9 km: over Sammaebong to the Hill of Storm and the Oedolgae sea stack, along the shore pathways to Beophwan, then inland at Dumeonimul Park (stamp) to the terminal. The most popular route on the island.",
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
        description:
          'Route 18-1 on Chuja Island, the Olle trail\'s outlier an hour north of Jeju by ferry: 11.4 km from the township office over Bonggeulle-san, across Chuja Bridge, up Dondae-san and round the Yecho-ri cliffs to Sinyang Port, with the three stamp boxes, every toilet and first-aid kit, and the island\'s restaurants and harbour cafés pinned.',
        duration: '1 day',
        updated: '2026-10-22',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'chuja.jpg',
        imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=18nFqcdb_XV4pLVvRxrVMiNVNSC3nYmM',
        keywords: ['Jeju', 'ChujaIsland', 'Chujado', 'JejuOlle', 'OlleTrail18', 'IslandHiking', 'Dondaesan', 'JejuFerry', 'KoreaTravel'],
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
            "🏝️ **Chuja** is the Olle trail's one outlier: 42 islands halfway between Jeju and the mainland, two of them joined by a bridge, with 1,700 people, a famous salted anchovy and almost no cars. Route 18-1 is the only way most visitors ever see it, and it is one of the best days on the whole trail.",
            "**11.4 km** from the township office on Upper Chuja over the hill with General Choe Yeong's shrine, across the bridge to Lower Chuja, up **Dondae-san** for the view of the whole archipelago, round the wild east coast at Yecho-ri and down to Sinyang Port. Five to six hours with stops, more if you take the Navarone ridge.",
          ],
          route: [
            "Chuja-myeon Office: start stamp, toilets and the Olle information desk, 5 minutes from the ferry pier. The path climbs behind the village past the shrine of General Choe Yeong to Bonggeulle-san at the island's north-west tip.",
            "Back down through Sunhyogak and Chuja Cheosagak to the lighthouse road, then across Chuja Bridge to Lower Chuja and the rest area at its far end.",
            "Up the Eundal-san path to the lookout and on to Dondae-san, 164 m, the highest point of the islands and the mid-route stamp. Hallasan shows on a clear day.",
            "Down the school lane past the tiny Sinyang branch school and east around the headland: Yecho-ri Port, the cliff path and the grave of Hwang Gyeong-han, the martyr's infant son raised by islanders in 1801.",
            "South along the coast to Sinyang Port: end stamp, toilets in the ferry waiting room, and the harbour café for the wait.",
            "Toilets and first-aid kits are pinned in their own layer from the official Olle map; the stamp boxes in theirs; restaurants and cafés in pink, all checked on Naver.",
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
        description:
          'Route 17 into Jeju City: 19 km from Gwangnyeong down the Musucheon gorge to the sea at Oedo Woldae, along Iho Tewoo Beach, over Dodu-bong with the planes landing beside you, past the airport coast to Yongduam and the old town, ending at the Kim Man-deok Memorial by Dongmun Market. Stamps, every toilet and first-aid kit, and 14 checked restaurants and sea-view cafés pinned.',
        duration: '1 day',
        updated: '2026-10-22',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'olle17.jpg',
        imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1cMhDeaaSQ67KAfCaduH2pO01t-d9Rt0',
        keywords: ['Jeju', 'JejuOlle', 'OlleTrail17', 'Yongduam', 'IhoBeach', 'Dodubong', 'JejuCity', 'DongmunMarket', 'KoreaTravel'],
        guide: {
          intro: [
            "🌊 **Route 17** is the Olle trail's arrival in Jeju City, and the one to walk on your last day: it ends ten minutes from Dongmun Market and the airport bus, and for its final hour you are walking the city's seafront with the planes coming in over your head. I like it for the contrast: a quiet river gorge in the morning, the beach at lunch, the lava rocks of Yongduam at sunset.",
            "**19 km** from Gwangnyeong village down the Musucheon stream to the sea at Oedo Woldae, then east along the whole north coast. Six to seven hours with stops, almost all flat; the only climb is 65 m Dodu-bong, and that is the best viewpoint of the day.",
          ],
          route: [
            "Gwangnyeong Elementary: start stamp and information desk at the kids' book café opposite. Down into the Musucheon gorge and north along the stream path past Chang-o Bridge.",
            "Oedo Woldae, where the stream meets the sea under old pines: first toilets and first-aid kit, and the first bakery café. The coast path then runs through Hyeonsa Port to Iho Tewoo Beach and its horse-shaped lighthouses.",
            "Dodu: the painted Memory Lane, the harbour with its noodle houses and the big milk-tea café, then up Dodu-bong for Hallasan behind and the airport runway at your feet.",
            "The airport coast to Eoyeong Park, mid-route stamp, toilets and first-aid kit, then the Yongdam seafront: Leports Park, Sunset Hill and the long line of coast-road cafés.",
            "Yongduam, the Dragon Head Rock, and the Yongyeon Cloud Bridge over the gorge, then inland to Gwandeokjeong, Jeju's oldest building, and the restored Mokgwana.",
            "End stamp at the Kim Man-deok Memorial Hall; Dongmun Market, pork noodles and the airport bus are five minutes away. Toilets and first-aid kits are pinned in their own layer, stamps in theirs, food and cafés in pink.",
          ],
          tips: [
            "🚌 Getting there: bus from Jeju City to the Gwangnyeong 1-ri stop, about 30 minutes; the start is a short walk. The finish is in the old town with buses and taxis everywhere.",
            "🍜 The gorge section has nothing, so eat at the start or carry a snack. After Oedo there is food every few kilometres: noodles at Dodu, mackerel on the Yongdam coast, bracken hangover soup near Gwandeokjeong, pork noodles in Dongmun Market.",
            "⏰ Time Dodu-bong for mid-afternoon and Yongduam for sunset; the rocks and the cloud bridge are lit after dark.",
            "✂️ Shorter: start at Iho Tewoo Beach (bus from the city) and walk the 10 km coast to the finish, which keeps every viewpoint and all the cafés.",
            "🔗 Routes 5, 6 and 7 cover the south coast, and 18.1 is the ferry day out to Chuja Island.",
          ],
        },
      },
      {
        id: 'jeju-olle-trail-1-udo',
        name: 'Jeju Olle Trail 1-1.1 (Udo Island)',
        description:
          'The first two routes of the Olle trail in one map, one colour each: Route 1 from Siheung-ri over the Malmi and Al oreums along the Jongdal and Seongsan coast to Gwangchigi Beach, 14.9 km, and Route 1-1, the 11.3 km loop of Udo island from Cheonjin Port past the coral-sand beach, the lighthouse and Hagosudong Beach. Stamps, every toilet and first-aid kit, and checked restaurants and sea-view cafés pinned.',
        duration: '1 day each',
        updated: '2026-10-22',
        tags: [{ icon: 'hiking', label: 'Trekking' }],
        image: 'udo.jpg',
        imageCredit: 'Photo: Jeju Film Commission · KOGL 1',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1RGT7_JFASnnB4euajgRTSGrM7CVMjC0',
        keywords: ['Jeju', 'JejuOlle', 'OlleTrail1', 'UdoIsland', 'Udo', 'Seongsan', 'Gwangchigi', 'SeobinBaeksa', 'KoreaTravel'],
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
            "🐄 **Route 1** is where the whole Olle trail began in 2007, and **Route 1-1** is its island twin: the loop of **Udo**, the cow-shaped islet a 15-minute ferry from Seongsan. Together they are the classic first two days of the trail, and the view from the first oreum, with Seongsan Ilchulbong rising out of the sea and Udo floating behind it, is the image most people carry home from Jeju.",
            "Route 1 is **14.9 km** from the Siheung-ri bus stop over two small volcanic cones and along the Jongdal and Seongsan shore to the black sand of Gwangchigi Beach. Route 1-1 is **11.3 km** around Udo from Cheonjin Port: coral-sand beaches, the lighthouse on Udobong, lava cliffs and a peanut ice cream at the end. One colour each on the map.",
          ],
          route: [
            "Route 1: Siheung-ri bus stop, start stamp and the Olle information desk at the foot of Malmi Oreum; up Malmi and Al oreums for the Seongsan and Udo panorama, down to Jongdal-ri and its old salt fields, then east along the shore.",
            "The Jongdal coast: Mokhwa rest stop with the mid-route stamp, the Siheung and Ojo haenyeo diving-women's houses, the Osopo beacon mound and Seongsan floodgate. A 2.4 km stretch from the old salt fields to the floodgate is wheelchair accessible.",
            "Seongsan: Yongcheon Park at the harbour, around the bay below Ilchulbong to the April 3rd memorial at Teojinmok, and the end stamp at Gwangchigi Beach, where the sunrise peak stands straight across the water.",
            "Route 1-1: ferry from Seongsan Port to Cheonjin Port on Udo, start stamp at the pier. South past the Hundertwasser Park to the lighthouse on Udobong, the island's one hill, then the east coast past the reservoir and the Ttitti-ppangppang viewpoint.",
            "Hagosudong Beach on the north-east coast, mid-route stamp in front of the noodle house, then the north shore to the Papyeong Yun family park and Hau-mokdong Port, the alternative start and end.",
            "West coast back to Cheonjin: Dokseng-i Koji and the white coral-sand beach of Seobin Baeksa. Toilets, first-aid kits and stamps each have their own layer; restaurants and cafés are the pink pins.",
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
    image: 'incheon.jpg',
    imageCredit: 'Photo: Cameron Henderson · Public domain',
    paths: [
      {
        id: 'china-town',
        name: 'Incheon China Town',
        description:
          'Korea\'s oldest China Town, 2 minutes from Incheon Station: the lantern street and its lanes, the Songwol-dong Fairy Tale Village loop, the Japanese-style street of the old port, plus the two mural streets and the Incheon Citizens\' House.',
        duration: '2–3h',
        updated: '2026-10-20',
        tags: [{ icon: 'village', label: 'Old town' }],
        image: 'chinatown.jpg',
        imageCredit: 'Photo: Mobius6 · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1RoZet4u2GSJ8N6XbSHqcuN0xW6vYEXA',
        keywords: ['Incheon', 'Chinatown', 'Jajangmyeon', 'FairyTaleVillage', 'OpenPort', 'DayTripFromSeoul', 'Songwoldong', 'IncheonStation', 'KoreaTravel'],
        guide: {
          intro: [
            "🥟 Incheon China Town is the **easiest day trip out of Seoul**, and one of the tastiest. Korea's oldest China Town grew up on the slope above the port after Incheon opened to foreign trade in 1883, when merchants from Qing China settled here. Today it is a compact hill of red gates, lantern-strung streets and the restaurants that invented **jajangmyeon**, Korea's black-bean noodles.",
            "The old Japanese quarter and a village painted with fairy-tale scenes are a few minutes away on foot, and everything lies within **one kilometre of Incheon Station**. Take the subway out in the morning, eat your way up the hill, and you are back in Seoul for dinner.",
          ],
          route: [
            'Incheon Station to the 1st Paeru gate: cross the plaza to the red gate and walk uphill along Chinatown-ro under the lanterns.',
            'Main street: the Jajangmyeon Museum in the old Gonghwachun building, the small Uiseondang temple on the left and the big restaurants. Lanes 51, 55 and 59 run parallel and are quieter.',
            '3rd Paeru gate at the top of the hill. The Chu-Han mural street climbs from here towards Jayu Park.',
            'Songwol-dong Fairy Tale Village: a 600 m loop of houses painted with Pinocchio, Snow White and the Little Prince, five minutes from the top gate. Free, best photos in the side alleys.',
            'Three Kingdoms mural street, 77 panels along the lane, down to the 1880s boundary stairs: Chinese lanterns on one side, Japanese wooden façades on the other.',
            'Japanese-style street: restored bank buildings along Sinpo-ro 23beon-gil with the Open Port Museum and the Modern Architecture Exhibition Hall. Incheon Citizens\' House, a former mayor\'s residence with a garden over the port, is five minutes further below Jayu Park.',
          ],
          tips: [
            "🚇 Getting there: Line 1 or the Suin-Bundang line to Incheon Station, about one hour from Seoul Station. The gate is straight across the plaza.",
            "🍜 Food: Gonghwachun and Yeongyeong (home of white jajangmyeon) draw queues at lunch, so eat early or late. For snacks on the move try the clay-oven buns at Simnihyang, hollow gonggalppang bread and the Macau egg tarts at Tart King. The pink pins on the map were checked in October 2026.",
            "👟 The main street and the mural streets are steep; the Fairy Tale Village and the Japanese street are flat. Allow two to three hours including a meal.",
            "⏰ Weekends are crowded. A weekday late morning is calmer, and the lanterns look best after dark.",
            "🍜 With time left, the Wolmi Sea Train next to Incheon Station runs out to Wolmido island, and Sinpo Market is ten minutes past the Japanese street.",
          ],
        },
      },
      {
        id: 'gyeyangsan',
        name: 'Gyeyangsan Night Hiking',
        description:
          'Three ways up Incheon\'s highest peak (395 m): the deck-stair trail from the Gyeyang Park office, the gentler museum and open-air stage route, and the forest climb from Yeonmujeong pavilion, plus the walk from Gyesan Station.',
        duration: '2–3h',
        updated: '2026-10-22',
        tags: [{ icon: 'hiking', label: 'Hiking' }, { icon: 'moon', label: 'Night hiking' }],
        image: 'gyeyangsan.png',
        imageWhole: true,
        screenshot: 'gyeyangsan-naver-map.png',
        screenshotCaption: 'Naver Map: the Gyeyangsan courses and trailheads. Google Maps does not show these trails accurately.',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1XTAYMo1N6LQjXbxIkmdwxT_JUpNReGY',
        keywords: ['Incheon', 'Gyeyangsan', 'NightHiking', 'IncheonHiking', 'DayTripFromSeoul', 'GyesanStation', 'HikingKorea', 'KoreaTravel'],
        guide: {
          intro: [
            "⛰️ **Gyeyangsan** is Incheon's highest mountain at **395 m**, and the nearest proper hike from Gyesan Station on Incheon Line 1. Three trails climb it from the south-east, all ending at the octagonal pavilion on the summit.",
            "The routes share the ridge trail for the upper part, so pick by the **start**: steep and quick, gentle and slower, or a forest climb. Each is 1.2 to 1.6 km and takes 40 minutes to about an hour and a quarter one way.",
          ],
          route: [
            "Route 1, Gyeyang Park Management Office (next to Kyungin Women's University): deck stairs the whole way, about 40 to 50 minutes. The fastest way up.",
            "Route 2, Gyeyangsanseong Museum and the open-air stage: the gentler start, about 1 h 15 min, joining the park-office trail after 350 m.",
            "Route 3, Yeonmujeong pavilion: a forest climb that meets the ridge trail after about 500 m, about 1 h to 1 h 10 min.",
            "Summit: Gyeyangsan summit and octagonal pavilion, open on all sides.",
            "From Gyesan Station exit 5 the museum is 0.7 km on streets and Imhak Park 0.9 km. A short connector links Yeonmujeong with Imhak Park past the forest bathing area.",
          ],
          tips: [
            "🚇 Getting there: Incheon Line 1 to Gyesan Station, exit 5, then 10 minutes on foot to the museum trailhead.",
            "🚻 There is one public toilet, just above the park-office trailhead. None higher up, so go before you climb.",
            "🔦 This is a night hike, so bring a torch or headlamp and keep your phone battery for the way down.",
            "👟 The deck stairs are steep but safe; sturdy shoes and water are enough.",
            "📍 Google Maps does not draw these trails correctly, so use the Naver Map screenshot under the map.",
          ],
        },
      },
      {
        id: 'wolmido-sunset',
        name: 'Wolmido Sunset',
        description: 'An evening on Wolmido island by the Incheon waterfront. Map coming soon.',
        updated: '2026-10-23',
        tags: [{ icon: 'sunset', label: 'Evening walk' }],
        mapUrl: 'REPLACE_ME',
      },
    ],
  },
  {
    id: 'suwon',
    name: 'Suwon',
    image: 'suwon.jpg',
    imageCredit: 'Photo: 김병모 · CC0',
    paths: [
      {
        id: 'hwaseong',
        name: 'Hwaseong Fortress',
        description: 'A walk along the 18th-century fortress wall of Suwon. Map coming soon.',
        updated: '2026-10-23',
        mapUrl: 'REPLACE_ME',
      },
    ],
  },
  {
    id: 'gyeonggi-do',
    name: 'Gyeonggi-do',
    image: 'gyeonggi.jpg',
    imageCredit: 'Photo: Korea Tourism Organization · KOGL 1',
    paths: [
      {
        id: 'gapyeong',
        name: 'Gapyeong',
        description: 'A day trip east of Seoul to the lakes, islands and gardens of Gapyeong: Petite France, Morning Calm Arboretum, Jara Island, Gapyeong Rail Park, Italian Village, Homyeong Lake and Nami Island. Map coming soon.',
        duration: 'Day trip',
        updated: '2026-10-23',
        keywords: ['Gapyeong', 'Gyeonggi', 'DayTripFromSeoul', 'NamiIsland', 'PetiteFrance', 'MorningCalmArboretum', 'JaraIsland', 'RailPark', 'HomyeongLake', 'KoreaTravel'],
        mapUrl: 'REPLACE_ME',
        guide: {
          intro: [
            "🌿 **Gapyeong** is the green day trip east of Seoul: a lake and river valley with islands, gardens and themed villages, all in one county. The map is on its way; here is what will be on it.",
            "The seven stops are spread over a wide area, so this is a **pick two or three** kind of day, not a single walk.",
          ],
          route: [
            "Petite France: a French-themed village on the hillside.",
            "Morning Calm Arboretum: the garden of the morning calm, for a slow walk among the plantings.",
            "Jara Island: a long island in the river, flat and open.",
            "Gapyeong Rail Park: rides on the old railway line.",
            "Italian Village: an Italian-style village to stroll through.",
            "Homyeong Lake: a mountain lake with a view over the valley.",
            "Nami Island: the famous tree-lined island, reached by boat.",
          ],
          tips: [
            "🗺️ Map coming soon, with every stop pinned and a toilet layer.",
            "🚌 The stops are far apart, so plan a car, taxi or bus between them rather than walking.",
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
