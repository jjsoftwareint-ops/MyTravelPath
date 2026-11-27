// "This week in Korea": the weekly events page (/this-week/), the card on the home page and the
// calendar button on each city card. Updated by hand every week, see .claude/skills/thisweek/SKILL.md.
// Text uses RichText markup (**highlight**, {red:...}, [label](https://...)); no years, no restaurants.

export type WeekEvent = {
  id: string // lowercase-hyphen, unique on the page
  ends: string // YYYY-MM-DD, the last day a visitor can still go (inclusive). After it the card disappears by itself.
  title: string
  city: string // pill on the card: Seoul, Busan, Jeju, ...
  cityId?: string // city card on the home page that shows this event (id in travel.ts); none = only on /this-week/
  when: string // day and time, e.g. "Sat 7 Nov · 19:00 to 20:00"
  where: string // venue, one short line
  price: string // "Free", "₩30,000", ...
  text: string // one or two short sentences: what the event is
  todo: string[] // "What you do": 2 to 4 short, concrete things a visitor does there, from sourced facts only
  tip?: string // 🚇 getting there: stations (bold) only, no car advice
  href?: { label: string; url: string } // one official link, https only
  routes?: { cityId: string; pathId: string; text: string }[] // walking route pages on this site
  posts?: { id: string; text: string }[] // blog posts on this site about the same topic (id in blog.ts)
  photoQuery?: string // Google Images search words for the "See photos" link, in Korean (finds the real event); default title + city
}

export type Week = {
  range: string // "Nov 3rd(Tue) ~ 8th(Sun)"; across a month end "Nov 30th(Mon) ~ Dec 6th(Sun)"
  ends: string // YYYY-MM-DD, the week's Sunday. After it the heading goes and its still-running events move to "All through".
  events: WeekEvent[]
}

export type ThisWeek = {
  updated: string // YYYY-MM-DD, the day the page was last refreshed (shown as Updated, and the sitemap lastmod)
  headline?: string // optional: id of the event the home-page card names while it is still on. Normally omitted: the first event still running is named.
  weeks: Week[] // this week first, then next week
  ongoing: WeekEvent[] // runs through both weeks
  comingUp: { when: string; ends: string; text: string; cityId?: string }[] // dated heads-ups just after the period; no cityId = nationwide, shown for every city; `ends` = last day to show it
}

export const thisWeek: ThisWeek = {
  updated: '2026-11-27',
  weeks: [
    {
      range: 'Nov 27th(Fri) ~ 29th(Sun)',
      ends: '2026-11-29',
      events: [
        {
          id: 'haeundae-light-festival',
          photoQuery: '해운대 빛축제',
          ends: '2027-01-10',
          title: 'Haeundae Light Festival',
          city: 'Busan',
          cityId: 'busan',
          when: 'From Sat 28 Nov · daily 18:00 to 23:00, until 10 Jan',
          where: 'Gunam-ro and Haeundae Beach',
          price: 'Free',
          text: 'The street down to the beach and the sand itself fill with sea-themed lights. They are switched on at a ceremony on the beach on **Sat 28 Nov at 18:00**.',
          todo: [
            'Walk through the 30 m light tunnel on Gunam-ro down to the beach.',
            'See the 12 m boat, the whales and the sea-turtle arch on the sand.',
            'Touch the lights that change colour, and leave a wish at the lighthouse.',
          ],
          tip: '🚇 **Haeundae Station** (line 2).',
          href: { label: 'Busan city page ↗', url: 'https://www.busan.go.kr/eng/bsevents/1762645' },
          routes: [{ cityId: 'busan', pathId: 'haeundae-coast', text: 'Haeundae Coastal Path' }],
        },
        {
          id: 'christmas-village-busan',
          photoQuery: '크리스마스 빌리지 부산 영화의전당',
          ends: '2026-12-25',
          title: 'Christmas Village Busan',
          city: 'Busan',
          cityId: 'busan',
          when: 'From Thu 26 Nov · Thu to Sun until 20 Dec, then daily to 25 Dec',
          where: 'Busan Cinema Center, Haeundae',
          price: 'About ₩6,000 to ₩10,000, differs by source; 24 and 25 Dec about ₩15,000 to ₩17,000',
          text: 'A ticketed **Christmas market** on the plaza of the Busan Cinema Center, with a big tree, a bell tower and snow effects.',
          todo: [
            'Open 16:00 to 22:00 on weekdays, 11:00 to 22:00 at weekends and on 24 and 25 Dec.',
            'Watch the parades and choirs, and browse the gift market.',
            'Foreign visitors book on KKday, Klook or Trip.com; same-day booking works.',
          ],
          tip: '🚇 **Centum City Station** (line 2).',
          href: { label: 'Busan city page ↗', url: 'https://www.busan.go.kr/eng/bsevents/1762667' },
          routes: [{ cityId: 'busan', pathId: 'indoor-activity', text: 'Busan indoors: the Centum spas and museums' }],
        },
        {
          id: 'seoul-design-festival',
          photoQuery: '서울디자인페스티벌 코엑스',
          ends: '2026-11-29',
          title: 'Seoul Design Festival',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Thu 26 to Sun 29 Nov · 10:30 to 18:30 (Sun to 17:00)',
          where: 'COEX Hall A, Gangnam',
          price: '₩15,000 at the door',
          text: 'A **design fair** where designers and small brands show and sell their work.',
          todo: [
            'Shop the designer and brand booths.',
            'See the illustrators\' exhibition and the young designers\' showcase.',
            'Last entry is one hour before closing.',
          ],
          tip: '🚇 **Samseong Station** (line 2) or **Bongeunsa Station** (line 9).',
          href: { label: 'Tickets and info (Korean) ↗', url: 'https://seoul.designfestival.co.kr/visit/ticket/' },
          routes: [{ cityId: 'seoul', pathId: 'gangnam-night-streets', text: 'Gangnam night streets, two stops from COEX' }],
        },
        {
          id: 'paju-soybean-festival',
          photoQuery: '파주장단콩축제 임진각',
          ends: '2026-11-29',
          title: 'Paju Jangdan Soybean Festival',
          city: 'Gyeonggi-do',
          cityId: 'gyeonggi-do',
          when: 'Fri 27 to Sun 29 Nov',
          where: 'Imjingak Plaza, Paju',
          price: 'Soybeans from ₩9,000 a kilo; no entry fee is stated',
          text: 'A harvest fair for Paju\'s **Jangdan soybeans**, on the plaza at Imjingak.',
          todo: [
            'Buy this year\'s soybeans straight from the growers.',
            'Join the soybean games and the quiz.',
            'Watch yodel, circus and magic acts on the stage: Sat 10:00 to 16:00, Sun 10:00 to 15:30.',
          ],
          tip: '🚇 **Munsan Station**, then the free festival shuttle from exit 1, 09:00 to 17:00.',
          href: { label: 'Paju city page (Korean) ↗', url: 'https://www.paju.go.kr/tour/festival/festival02/festival02_2/festival02_2_01/festival02_2_01_01.jsp' },
          routes: [{ cityId: 'gyeonggi-do', pathId: 'paju', text: 'Paju day trip: Imjingak, the DMZ and Heyri' }],
        },
      ],
    },
    {
      range: 'Nov 30th(Mon) ~ Dec 6th(Sun)',
      ends: '2026-12-06',
      events: [
        {
          id: 'morning-calm-lights',
          photoQuery: '아침고요수목원 오색별빛정원전',
          ends: '2027-03-14',
          title: 'Garden of Morning Calm lights',
          city: 'Gyeonggi-do',
          cityId: 'gyeonggi-do',
          when: 'From Fri 4 Dec · every evening until 14 Mar; lights 17:00 to 21:00, Sat to 23:00',
          where: 'Garden of Morning Calm, Gapyeong',
          price: '₩11,000 at the gate',
          text: 'A mountain garden wraps its trees, hedges and whole hillsides in **coloured lights**, the best-known winter light festival in Korea.',
          todo: [
            'Arrive before dark and walk the garden as the lights come on.',
            'Make it the end of a Gapyeong day: Nami Island in the afternoon, the garden at dusk.',
            '{red:The last bus back leaves the garden at 20:00}, Saturdays too; after that only taxis.',
          ],
          tip: '🚆 **Cheongpyeong Station**, then city bus **30-6** to the last stop.',
          href: { label: 'VisitKorea page ↗', url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=77816' },
          routes: [{ cityId: 'gyeonggi-do', pathId: 'gapyeong', text: 'Gapyeong with Nami Island' }],
          posts: [{ id: '2026-11-20-1713', text: 'Garden of Morning Calm lights: worth the trip from Seoul without a car?' }],
        },
        {
          id: 'incheon-vintage-christmas-market',
          photoQuery: '오슬로우 빈티지 크리스마스 마켓 상상플랫폼',
          ends: '2026-12-20',
          title: 'Vintage Christmas market at Sangsang Platform',
          city: 'Incheon',
          cityId: 'incheon',
          when: 'Fri 4 to Sun 20 Dec · Fri to Sun only, 11:00 to 19:00',
          where: 'Sangsang Platform, by Incheon Station',
          price: '₩5,000 booked ahead, ₩10,000 at the door; children of primary age and under free',
          text: 'An indoor **vintage Christmas market** in an old harbour warehouse, a few minutes from China Town.',
          todo: [
            'Browse vintage clothes, accessories, small objects and crafts.',
            'Listen to the live sets: jazz, acoustic, city pop, chanson, Latin and DJs.',
            'Make a Christmas ornament and take photos in the Christmas corner.',
          ],
          tip: '🚇 **Incheon Station** (line 1).',
          routes: [
            { cityId: 'incheon', pathId: 'china-town', text: 'Incheon China Town, next door' },
            { cityId: 'incheon', pathId: 'wolmido-sunset', text: 'Wolmido sunset walk' },
          ],
        },
      ],
    },
  ],
  ongoing: [
    {
      id: 'lotte-christmas-market',
      photoQuery: '롯데타운 크리스마스마켓 잠실',
      ends: '2027-01-03',
      title: 'Lotte Town Christmas Market',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Daily until 3 Jan',
      where: 'World Park lawn by Lotte World Tower, Jamsil',
      price: 'Free with a booking; a paid Fast Pass skips the queue',
      text: 'An outdoor Christmas market dressed as a **19th-century English winter street**, with red brick, arched windows and carols.',
      todo: [
        'See the Christmas trees, the carousel and a 17 m Victorian clock tower.',
        'Browse stalls of English and international Christmas goods; eat fish and chips or rotisserie chicken.',
        'Then walk **Seokchon Lake** next door: a tunnel of lights over the lake path, 17:30 to 22:30, until 28 Feb.',
        'Book first: December tickets are on sale since 20 Nov. With the free ticket you still queue on site; the paid Fast Pass goes straight in.',
      ],
      tip: '🚇 **Jamsil Station** (lines 2 and 8).',
      href: { label: 'Official page (Korean) ↗', url: 'https://www.lotteshopping.com/contents/christmas-market' },
      routes: [{ cityId: 'seoul', pathId: 'cherry-blossom-walk', text: 'Seokchon Lake walk, right beside it' }],
      posts: [
        { id: '2026-11-13-1755', text: 'Seoul Christmas markets 2026: the one with a four-hour queue, and three without' },
        { id: '2026-11-07-0709', text: "It's Finally Here!!! Shinsegae Christmas Media Facade 2026" },
      ],
    },
    {
      id: 'shinsegae-christmas-facade',
      photoQuery: '신세계 본점 미디어파사드 크리스마스',
      ends: '2027-01-31',
      title: 'Shinsegae Christmas media facade',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Daily · 17:00 to midnight, until 31 Jan',
      where: 'Shinsegae Main Store, Myeongdong',
      price: 'Free',
      text: 'The department store turns its whole outer wall into a Christmas screen, the first big Christmas light show of the season.',
      todo: [
        'Watch the Christmas film on the building: a bear carries wishes on a balloon to finish the tree.',
        'It plays every day from 17:00 to midnight; watch it from the corner by the Bank of Korea.',
        'Make an evening of it: walk Seoullo 7017 from Seoul Station first and arrive as it gets dark.',
      ],
      tip: '🚇 **Hoehyeon Station** (line 4).',
      routes: [{ cityId: 'seoul', pathId: 'seoul-station-myeongdong', text: 'Seoul Station to Myeong-dong walk' }],
      posts: [
        { id: '2026-11-07-0709', text: "It's Finally Here!!! Shinsegae Christmas Media Facade 2026" },
        { id: '2026-11-13-1755', text: 'Seoul Christmas markets 2026: the one with a four-hour queue, and three without' },
      ],
    },
    {
      id: 'gwangalli-drone-show',
      photoQuery: '광안리 드론쇼',
      ends: '2027-06-30',
      title: 'Gwangalli drone show, every Saturday',
      city: 'Busan',
      cityId: 'busan',
      when: 'Every Sat · 19:00 and 21:00',
      where: 'Gwangalli Beach',
      price: 'Free',
      text: 'About **1,000 drones** draw pictures over the water, about 12 minutes each, twice an evening. {red:Cancelled in rain or strong wind.}',
      todo: [
        'Sat 28 Nov: "Avengers: Doomsday in Gwangalli". The December themes are not out yet.',
        'Find a spot in the middle of the beach, or at Millak Waterfront Park, before dark.',
        'Millak Waterfront Park is lit every evening until 10 Jan, 18:00 to 23:30.',
        'Check the weather on the day.',
      ],
      tip: '🚇 **Gwangan Station** (line 2).',
      href: { label: 'Official page ↗', url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=194990' },
      routes: [{ cityId: 'busan', pathId: 'villages-and-hotspots', text: 'Gwangalli night walk and Busan highlights' }],
    },
    {
      id: 'curtain-call-garden',
      photoQuery: '세종문화회관 커튼콜 가든 크리스마스',
      ends: '2027-01-03',
      title: 'Curtain Call Garden Christmas market',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Daily until 3 Jan · 11:00 to 21:00',
      where: 'Art Garden at the Sejong Center, Gwanghwamun',
      price: 'Free',
      text: 'A small **Christmas market** in the garden of the Sejong Center, beside Gwanghwamun Square.',
      todo: [
        'Browse about 25 stalls of crafts, knitwear and jewellery.',
        'Warm up with fish bread, hotteok and mulled wine.',
        'Take a photo with the big Santa.',
      ],
      tip: '🚇 **Gwanghwamun Station** (line 5).',
      href: { label: 'Sejong Center page (Korean) ↗', url: 'https://www.sejongpac.or.kr/portal/bbs/B0000057/view.do?nttId=50251&bbsId=B0000057&menuNo=200502' },
      routes: [{ cityId: 'seoul', pathId: 'seoul-palaces', text: 'Royal Palaces, starting at Gwanghwamun' }],
      posts: [
        { id: '2026-11-13-1755', text: 'Seoul Christmas markets 2026: the one with a four-hour queue, and three without' },
        { id: '2026-11-11-0011', text: 'Bungeoppang season: Korean fish bread, from ₩1,000 to Dubai pistachio' },
      ],
    },
    {
      id: 'the-hyundai-christmas-village',
      photoQuery: '더현대 서울 크리스마스 2026 뉴욕',
      ends: '2026-12-31',
      title: 'The Hyundai Seoul Christmas Village',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Daily until 31 Dec',
      where: 'The Hyundai Seoul, 5th floor, Yeouido',
      price: 'Free, booking needed',
      text: 'A **1980s New York street** built inside the department store: red-brick buildings, yellow taxis, a news stand and a chimney that puffs steam.',
      todo: [
        'Walk the street and the shops inside the red-brick buildings.',
        '{red:Very hard to get in.} The first online booking round is full; without one, join the QR waiting list on floors 2 to 4.',
        'Last year walk-ins waited three to four hours, so go only with time to spare.',
      ],
      tip: '🚇 **Yeouido Station** (lines 5 and 9).',
      posts: [{ id: '2026-11-13-1755', text: 'Seoul Christmas markets 2026: the one with a four-hour queue, and three without' }],
    },
    {
      id: 'gangneung-christmas-lights',
      photoQuery: '강릉 크리스마스 겨울축제 월화거리',
      ends: '2027-01-09',
      title: 'Gangneung Christmas lights',
      city: 'Gangwon-do',
      cityId: 'gangwon-do',
      when: 'From Sun 22 Nov · every evening until 9 Jan',
      where: 'Wolhwa Street, Anmok Beach and Gangneung Station square',
      price: 'Free',
      text: 'Christmas trees and lights go up across Gangneung. They are switched on **Sun 22 Nov at 16:30** on Wolhwa Street, with choirs and an orchestra.',
      todo: [
        'Walk the lit trees on Wolhwa Street and along the Anmok coffee street by the beach.',
        'Post a card in the "slow mailbox": it is delivered a year later.',
        'A Christmas market with a carousel follows from 23 to 27 Dec.',
      ],
      tip: '🚆 KTX to **Gangneung Station**; the station square is lit too.',
      routes: [{ cityId: 'gangwon-do', pathId: 'gangneung', text: 'Gangneung highlights: Wolhwa Street and Anmok' }],
    },
    {
      id: 'unjeong-light-garden',
      photoQuery: '운정호수공원 빛정원',
      ends: '2026-12-31',
      title: 'Unjeong Lake Park light garden',
      city: 'Gyeonggi-do',
      cityId: 'gyeonggi-do',
      when: 'Every evening until 31 Dec',
      where: 'Unjeong Lake Park, Paju',
      price: 'Free',
      text: 'A lake park decorated with lights for the whole festival period.',
      todo: [
        'Walk around the lake after dark, when the light garden is lit with the street lamps.',
        'The fireworks show was on opening night, 31 Oct, so expect lights, not fireworks.',
      ],
      href: { label: 'Event page ↗', url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=36374' },
    },
    {
      id: 'seoul-autumn-festa',
      photoQuery: '서울어텀페스타',
      ends: '2026-11-29',
      title: 'Seoul Autumn Festa',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Until Sun 29 Nov',
      where: 'Theatres, Han River parks and open-air stages across the city',
      price: 'Free and paid programs',
      text: 'The city\'s performing-arts festival: 38 festivals and 478 performances in total.',
      todo: [
        'Pick a show by date on the official program page.',
        'Get help at the info centre, Daehangno Center 1st floor: open until 29 Nov, {red:closed on Mondays}.',
      ],
      href: { label: 'Program ↗', url: 'https://english.visitseoul.net/events/2026SeoulAutumnFesta/ENPjm3hw1' },
    },
  ],
  comingUp: [
    {
      when: 'From Fri 11 Dec',
      ends: '2026-12-10',
      cityId: 'seoul',
      text: 'The **Seoul Lantern Festival** lights the Cheonggyecheon stream every evening until 31 Jan, and the **Gwanghwamun Market** opens the same day.',
    },
  ],
}

// ── Finished events drop out by themselves ──────────────────────────────────────────────
// Every helper takes `today` (YYYY-MM-DD in Seoul). Without it they return the whole file, which is what the
// pre-rendered HTML and the first client render show; pages pass todayInSeoul() once hydrated (useHydrated),
// so the visitor's own date decides what is still on. New events still need the weekly refresh.

/** Today's date in Seoul as YYYY-MM-DD. Call it only after hydration. */
export const todayInSeoul = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' })

const stillOn = (ends: string, today?: string) => !today || ends >= today

/** The page as a visitor sees it on `today`: finished events gone, a past week's still-running events moved to
 *  "All through", finished heads-ups gone. */
export function liveWeek(today?: string) {
  const weeks: Week[] = []
  const rolled: WeekEvent[] = []
  for (const w of thisWeek.weeks) {
    const events = w.events.filter((e) => stillOn(e.ends, today))
    if (!events.length) continue
    if (stillOn(w.ends, today)) weeks.push({ ...w, events })
    else rolled.push(...events)
  }
  const ongoing = [...rolled, ...thisWeek.ongoing.filter((e) => stillOn(e.ends, today))]
  const comingUp = thisWeek.comingUp.filter((c) => stillOn(c.ends, today))
  return { weeks, ongoing, comingUp }
}

/** Every event still on, dated weeks first, then ongoing. */
export const allEvents = (today?: string) => {
  const v = liveWeek(today)
  return [...v.weeks.flatMap((w) => w.events), ...v.ongoing]
}

/** The event the home-page card names: the chosen `headline` while it is still on, otherwise the first event still on. */
export const weekHeadline = (today?: string) => {
  const all = allEvents(today)
  return (thisWeek.headline && all.find((e) => e.id === thisWeek.headline)) || all[0]
}

/** Number of events still on, for the count on the home-page card. */
export const weekCount = (today?: string) => allEvents(today).length

/** How many events still on the page belong to one city card on the home page. */
export const eventCount = (cityId: string, today?: string) => allEvents(today).filter((e) => e.cityId === cityId).length

/** City ids that have at least one event still on, in the order the filter chips show them. */
export const eventCityIds = (today?: string) => [...new Set(allEvents(today).map((e) => e.cityId).filter((id): id is string => !!id))]
