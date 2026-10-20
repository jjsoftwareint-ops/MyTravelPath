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
          'Huam-dong 108 Stairs, Sinheung Market, Sowol-ro rooftops and the City Wall to Baekbeom Square. 2.4 km.',
        duration: '2h',
        updated: '2026-10-20',
        tags: [{ icon: 'sunset', label: 'Evening walk' }],
        image: 'haebangchon.jpg',
        imageCredit: 'Photo: Lee Jeong Woo / Korea MCST · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1kOFoicmAJJvQvsioIIOu1ng9dDQ4Exk',
        keywords: ['Seoul', 'Haebangchon', 'HBC', 'SinheungMarket', 'Namsan', 'RooftopBar', 'EveningWalk', 'Itaewon', 'KoreaTravel'],
        guide: {
          intro: [
            "🌆 **Haebangchon**, 'Liberation Village', is my favourite corner of Seoul after dark. Refugees from the north built it on the hillside between Namsan and Yongsan after 1945, and today its steep lanes hide a tiny roofed market full of Thai, Turkish and Korean kitchens, with **rooftop bars** looking out over the whole city.",
            "This 2.4 km walk climbs 100 m from Huam-dong through **Sinheung Market** and the Sowol-ro viewpoints to the old city wall below Namsan. Set off **an hour before sunset**: dinner in the market, dusk on the rooftops, the lit wall to finish. Trust me on the order.",
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
            "🚇 Getting there: village bus Yongsan 02 from Seoul Station or Noksapyeong Station to the Huam-dong terminus, or a 15 min walk uphill from Seoul Station.",
            "🍜 Dinner in the market: Pad Ka Pao for Thai on the second floor, Haebangchon Dak for herbal roast chicken, H5NG for neon American-Chinese. Mersin Kebab's tantuni and Haebang Wang Gopchang are a minute away. Haebang Park's rooftop café is where to wait out a queue and catch the sunset.",
            "👟 The lanes are steep and some stairs are unlit; wear proper shoes. The village bus shares the narrow road, so step aside when it comes.",
            "📍 From Baekbeom Square, Myeongdong Station is 15 min downhill, or keep climbing the wall path to N Seoul Tower, about 45 minutes.",
          ],
        },
      },
      {
        id: 'hanok-villages',
        name: 'Hanok Villages',
        description: 'Cheong Wa Dae to Bukchon, Ikseon-dong and Insadong, ending at Ssamziegil. 5.1 km.',
        duration: '2h',
        updated: '2026-10-20',
        tags: [{ icon: 'village', label: 'Traditional' }],
        notices: [
          {
            icon: '⏰',
            title: 'Bukchon Hanok Village visiting hours',
            body: "The busiest lane, **Bukchon-ro 11-gil** (the Gahoe-dong 31 alley on this route), is open to visitors **10:00–17:00** only. Outside those hours it is residents only and a ₩100,000 fine applies. The rest of Bukchon, its main streets and cafés, stays open.",
            since: 'Jongno-gu special management area, enforced since March 2025. Checked October 2026.',
          },
        ],
        image: 'bukchon.jpg',
        imageCredit: 'Photo: Bgag · CC0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=14TBNrDcRMm9lNuEBH3QZbcEAg_mnuNU',
        keywords: ['Seoul', 'Bukchon', 'HanokVillage', 'Ikseondong', 'Insadong', 'Jongno', 'Hanbok', 'SeoulPalaces', 'KoreaTravel'],
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
          ],
          tips: [
            "🚇 Getting there: Anguk Station (line 3) sits in the middle of the walk. Cheong Wa Dae visits need a free online reservation in advance.",
            "📍 Bukchon is a residential area with posted quiet hours. Stay on the marked lanes and keep voices down, especially around Gahoe-dong.",
            "🍜 Eat little and often: rice-cake skewers in Samcheong-dong, Ikseon-dong grills, Insadong tea houses. Gwangjang Market is a short hop from the end.",
            "📍 Extras pinned on the map: Gwanghwamun Square and the gate, Changdeokgung and Changgyeonggung palaces, and Seosulla-gil, the café lane along the Jongmyo Shrine wall.",
            "📍 Hanbok rental shops cluster around Anguk; wearers enter the royal palaces free.",
          ],
        },
      },
      {
        id: 'inwang-mountain-trail',
        name: 'Inwang Mountain Trail',
        description: 'Seoul fortress wall climb with views over Gyeongbokgung and the whole city.',
        duration: '2.5h',
        updated: '2026-10-20',
        tags: [
          { icon: 'hiker', label: 'Trekking' },
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
        tags: [{ icon: 'blossom', label: 'Cherry blossom' }],
        image: 'cherry.jpg',
        imageCredit: 'Photo: Alexey Komarov · CC BY 3.0',
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
        id: 'gangnam-night-streets',
        name: 'Gangnam Night Streets',
        description:
          'The back streets around Gangnam Station after dark: Seocho-daero 75-gil and 77-gil on the west side, Teheran-ro 1-gil on the east, and short walks from exits 10 and 11 along Gangnam-daero. Starfield Library and Bongeunsa Temple are pinned for the daytime.',
        duration: '2h',
        updated: '2026-10-20',
        tags: [{ icon: 'moon', label: 'Night walk' }],
        image: 'gangnam.jpg',
        imageCredit: 'Photo: 최광모 · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1VIazL8nrcXwzKDjTxKyxrbKGaNR9NYg',
        keywords: ['Seoul', 'Gangnam', 'GangnamStation', 'SeoulNightlife', 'Teheranro', 'StarfieldLibrary', 'Bongeunsa', 'KoreanBBQ', 'KoreaTravel'],
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
          ],
          tips: [
            "🚇 Getting there: Gangnam Station, line 2 and the Sinbundang line. Exits 10 and 11 are on the west side; the station passage crosses under the road.",
            "⏰ Restaurants serve until late and many bars go on past midnight. Line 2 runs until about midnight; the taxi ranks get long after that.",
            "⏰ Weeknights are busy from 7 pm with office workers; weekend crowds are younger and later.",
            "⏰ Starfield Library and Bongeunsa are free and best in the morning, before the evening walk.",
          ],
        },
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
        description: 'Beach → Dongbaek Island → Blueline Park sky capsule.',
        duration: 'Half day',
        updated: '2026-10-20',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=REPLACE_ME',
        keywords: ['Busan', 'Haeundae', 'DongbaekIsland', 'BluelinePark', 'SkyCapsule', 'Cheongsapo', 'Songjeong', 'CoastalWalk', 'KoreaTravel'],
        guide: {
          intro: [
            "🌊 Haeundae is Korea's most famous beach, but the best part is what comes after it. Walk east and you get the camellia-covered **Dongbaek Island** with the APEC House and the Gwangan Bridge view, then the old railway line along the cliffs to Cheongsapo and Songjeong. It is the **easiest coastal walk** in the country.",
            "The map for this path is **still being drawn**. The outline below is enough to follow it with Naver Map, and the map link will appear here as soon as it is ready.",
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
        name: 'Jeju Olle Trail',
        description:
          'Routes 5, 6 and 7 of the 437 km island trail: Namwon → Soesokkak → Seogwipo → Seogwipo Bus Terminal along the south coast, one colour per route, with every toilet and first-aid kit from the official maps.',
        duration: '1 day per route',
        updated: '2026-10-20',
        tags: [{ icon: 'hiking', label: 'Hiking' }],
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
