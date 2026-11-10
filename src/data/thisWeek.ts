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
  updated: '2026-11-10',
  weeks: [
    {
      range: 'Nov 10th(Tue) ~ 15th(Sun)',
      ends: '2026-11-15',
      events: [
        {
          id: 'autumn-colours-now',
          photoQuery: '서울 은행나무 단풍',
          ends: '2026-11-15',
          title: 'Autumn colours are at their best',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Now to about mid-November',
          where: 'Ginkgo streets in Seoul, Suwon and Jeonju, mountains further south',
          price: 'Free',
          text: 'Ginkgo and maple are turning together in Seoul, and the forecasts put the peak by mid-November, so go this week.',
          todo: [
            'Walk the ginkgo avenue of **Garosu-gil** in Sinsa in the late afternoon light.',
            'In Suwon, walk **Hwaseong Haenggung** palace and look for silver grass and yellow ginkgo along the pond.',
            'In Jeonju, see the 400-year-old ginkgo trees of **Jeonju Hyanggyo** turn gold; the school is {red:closed on Mondays}.',
          ],
          routes: [
            { cityId: 'gyeonggi-do', pathId: 'hwaseong', text: 'Suwon with Hwaseong Fortress' },
            { cityId: 'gyeongju-jeonju', pathId: 'jeonju', text: 'Jeonju Hanok Village and Hyanggyo' },
          ],
          posts: [{ id: 'danpung-nori-korea-goes-to-the-mountains', text: 'Danpung-nori: the week Korea goes to the mountains' }],
        },
        {
          id: 'seoul-cafe-show',
          photoQuery: '서울카페쇼 코엑스',
          ends: '2026-11-14',
          title: 'Seoul Cafe Show',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Fri 13 Nov 10:00 to 18:00 · Sat 14 Nov 10:00 to 16:00',
          where: 'COEX, Gangnam',
          price: '₩25,000 for one day at the door, less if you book online first',
          text: 'Korea\'s biggest coffee and café fair, in all four halls of COEX. **Open to everyone on Fri 13 and Sat 14 Nov**; the first two days are trade only.',
          todo: [
            'Walk the booths of café brands from around the world to see new coffee, tea, dessert and bakery trends.',
            'The Seoul Coffee Festival runs at Starfield Library, in the same mall.',
            'Last entry is half an hour before closing, and Saturday closes early.',
          ],
          tip: '🚇 **Samseong Station** (line 2), COEX is a few minutes underground.',
          href: { label: 'Official visitor guide ↗', url: 'https://eng.cafeshow.com/eng/visitor/visitor_guide.asp' },
          routes: [
            { cityId: 'theme', pathId: 'cafe-around-me', text: 'Café Around Me map' },
            { cityId: 'seoul', pathId: 'gangnam-night-streets', text: 'Gangnam walk, with Starfield Library' },
          ],
          posts: [{ id: '2026-11-03-0119', text: 'Why do Koreans drink iced coffee in the snow?' }],
        },
        {
          id: 'jeju-biennale-last-days',
          photoQuery: '제주비엔날레 2026',
          ends: '2026-11-15',
          title: 'Jeju Biennale: last days',
          city: 'Jeju',
          cityId: 'jeju',
          when: 'Until Sun 15 Nov',
          where: 'Jeju Museum of Art and spaces across Jeju\'s old town',
          price: 'Ticket prices on the official page',
          text: 'An art exhibition about how Jeju\'s own culture changed through contact with the outside world, in three parts: stone, exile and myth.',
          todo: [
            'Start at the **Jeju Museum of Art**, the main venue.',
            'Walk on through the old town to the other venues, like the Gwandeokjeong pavilion and Jeju Mok Gwana.',
            'See works by about 70 artists and teams from around 20 countries.',
          ],
          href: { label: 'Official page ↗', url: 'https://jejubiennale.org' },
        },
        {
          id: 'gwangju-biennale-last-days',
          photoQuery: '광주비엔날레 2026',
          ends: '2026-11-15',
          title: 'Gwangju Biennale: last days',
          city: 'Gwangju',
          when: 'Until Sun 15 Nov',
          where: 'Gwangju Biennale Exhibition Hall',
          price: 'Ticket prices on the official page',
          text: 'The 16th edition is titled You Must Change Your Life and looks at change as a sudden break and as a daily practice.',
          todo: [
            'See film, sound installations and archive material by about 45 artists from 20 countries, among them Matthew Barney.',
            'Look for the work that reworks a **Korean shamanic ritual**, made with metal donated by people of Gwangju and South Jeolla.',
          ],
          href: { label: 'Official page ↗', url: 'https://gwangjubiennale.org' },
        },
      ],
    },
    {
      range: 'Nov 16th(Mon) ~ 22nd(Sun)',
      ends: '2026-11-22',
      events: [
        {
          id: 'pohang-light-festival',
          photoQuery: '포항국제불빛축제 불꽃',
          ends: '2026-11-21',
          title: 'Pohang International Fireworks Festival',
          city: 'Pohang',
          when: 'Thu 19 to Sat 21 Nov · main fireworks Sat 21 Nov, evening',
          where: 'Yeongildae Beach and Songdo Pier, Pohang',
          price: 'Free',
          text: 'One of Korea\'s big **fireworks festivals**, moved from summer to November this year. The city expects more than 150,000 people.',
          todo: [
            'Thu 19 Nov at Songdo Pier: the opening, a media facade lighting and a citizens\' fireworks show.',
            'Fri 20 Nov: an Asian DJ festival and a night carnival.',
            'Sat 21 Nov at **Yeongildae Beach**: fireworks by teams from France and Japan, then a Korean finale.',
            'The start time is not out yet: check the festival page that week. Food stalls run all three days.',
          ],
          tip: '🚄 KTX to **Pohang Station**, then a taxi; arrive early on Saturday.',
          href: { label: 'Festival page (Korean) ↗', url: 'https://festival.phcf.or.kr' },
          routes: [{ cityId: 'gyeongju-jeonju', pathId: 'gyeongju', text: 'Gyeongju, the old Silla capital next door' }],
          posts: [{ id: '2026-11-04-1852', text: 'Busan fireworks: skip the seat, bring the chicken' }],
        },
        {
          id: 'lotte-christmas-market',
          photoQuery: '롯데타운 크리스마스마켓 잠실',
          ends: '2027-01-03',
          title: 'Lotte Town Christmas Market',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'From Thu 19 Nov · daily until 3 Jan',
          where: 'World Park lawn by Lotte World Tower, Jamsil',
          price: 'Free with a booking; a paid Fast Pass skips the queue',
          text: 'An outdoor Christmas market dressed as a **19th-century English winter street**, with red brick, arched windows and carols.',
          todo: [
            'See the Christmas trees, the carousel and a 17 m Victorian clock tower.',
            'Browse stalls of English and international Christmas goods; eat fish and chips or rotisserie chicken.',
            'Stay after dark for the nightly light and music show around Lotte World Mall.',
            'Book first: November tickets are on sale, December ones from 20 Nov. Weekend Fast Passes sell out fast.',
          ],
          tip: '🚇 **Jamsil Station** (lines 2 and 8).',
          href: { label: 'Official page (Korean) ↗', url: 'https://www.lotteshopping.com/contents/christmas-market' },
          routes: [{ cityId: 'seoul', pathId: 'cherry-blossom-walk', text: 'Seokchon Lake walk, right beside it' }],
          posts: [{ id: '2026-11-07-0709', text: "It's Finally Here!!! Shinsegae Christmas Media Facade 2026" }],
        },
        {
          id: 'jeju-citrus-expo',
          photoQuery: '제주감귤박람회',
          ends: '2026-11-23',
          title: 'Jeju Citrus Expo',
          city: 'Jeju',
          cityId: 'jeju',
          when: 'Thu 19 to Mon 23 Nov · about 10:00 to 17:00',
          where: 'Seogwipo Agricultural Technology Center, Namwon',
          price: 'About ₩2,000, less if booked online by 18 Nov; under 13 and over 65 free',
          text: 'Jeju\'s tangerine fair, held in the middle of the harvest season on the south side of the island.',
          todo: [
            'Walk the halls on citrus varieties and farming, then the market where growers sell their own tangerines.',
            'Jump into **Gamgyul-wat**, a pool of tangerines with lucky coins hidden in it (separate ticket, book ahead).',
            'Come on the opening day, Thu 19 Nov, for the parade and stage shows.',
          ],
          href: { label: 'Official site ↗', url: 'https://www.jicexpo.com' },
          routes: [{ cityId: 'jeju', pathId: 'jeju-olle-trail', text: 'Jeju Olle routes 5, 6 and 7, from Namwon' }],
        },
        {
          id: 'g-star',
          photoQuery: '지스타 벡스코',
          ends: '2026-11-22',
          title: 'G-STAR game show',
          city: 'Busan',
          cityId: 'busan',
          when: 'Thu 19 to Sun 22 Nov',
          where: 'BEXCO, Haeundae',
          price: '₩18,000 for one day (youth ₩8,000), tickets online',
          text: 'Korea\'s biggest **game show**, open to the public on all four days.',
          todo: [
            'Play new games at the booths, among them more than 100 indie studios.',
            'Watch the **Overwatch Champions Series** Asia grand final at BEXCO, Fri 20 to Sun 22 Nov.',
            'Buy your ticket online before you go; it is valid on the day you choose.',
          ],
          tip: '🚇 **BEXCO Station** (line 2).',
          href: { label: 'Official site ↗', url: 'https://www.gstar.or.kr/eng' },
          routes: [{ cityId: 'busan', pathId: 'haeundae-coast', text: 'Haeundae Coastal Path' }],
        },
      ],
    },
  ],
  ongoing: [
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
      posts: [{ id: '2026-11-07-0709', text: "It's Finally Here!!! Shinsegae Christmas Media Facade 2026" }],
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
        'Find a spot in the middle of the beach, or at Millak Waterfront Park, before dark.',
        'Check the weather on the day.',
      ],
      tip: '🚇 **Gwangan Station** (line 2).',
      href: { label: 'Official page ↗', url: 'https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=194990' },
      routes: [{ cityId: 'busan', pathId: 'villages-and-hotspots', text: 'Gwangalli night walk and Busan highlights' }],
    },
    {
      id: 'namsan-night-festival',
      photoQuery: '남산 나이트 페스티벌',
      ends: '2026-11-14',
      title: 'Namsan Night Festival',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Until Sat 14 Nov · evenings',
      where: 'Namsan Park, around N Seoul Tower',
      price: 'Book ahead, refundable deposit ₩5,000 per person (Campnic ₩10,000 per team)',
      text: 'Three small evening programs on Namsan, each capped per day, so reserve before you go.',
      todo: [
        '**Autumn Foliage Walk** at Yejang Park: forest paths at night with autumn colours and city views, 700 people a day.',
        '**Palgak Club** near the tower: a silent club party with a night view of Seoul, 300 people a day.',
        '**Namsan Campnic** at Baekbeom Plaza: a picnic with music and movies, 100 teams a day, up to 4 people each.',
      ],
      tip: '🚇 **Hoehyeon Station** (line 4).',
      href: { label: 'Official page ↗', url: 'https://english.visitseoul.net/events/2026Namsan-Night-Festival/ENP3rjagy' },
      routes: [{ cityId: 'seoul', pathId: 'hanyang-dosung-gil-3-4', text: 'City Wall Trail over Namsan' }],
    },
    {
      id: 'hwadam-forest-autumn',
      photoQuery: '화담숲 단풍 모노레일',
      ends: '2026-11-15',
      title: 'Hwadam Forest autumn season',
      city: 'Gyeonggi-do',
      cityId: 'gyeonggi-do',
      when: 'Until Sun 15 Nov · about 09:00 to 17:00',
      where: 'Hwadam Botanic Garden, Gwangju, Gyeonggi',
      price: 'About ₩11,000, monorail ₩5,000 extra, online booking only',
      text: 'A hillside botanic garden with walking paths through autumn trees. In peak season entry is online only and sells out.',
      todo: [
        'Walk the garden paths through the autumn trees.',
        'Ride the monorail up the 1.9 km section: about 5 minutes instead of 40 on foot. Separate ticket, sells out fast.',
        'Book ahead: no tickets at the gate in peak season, and the booking site is Korean only. A day tour from Seoul with entry is easier.',
        '{red:Possibly closed on Mondays}, so plan another day.',
      ],
      tip: '🚇 **Gonjiam Station** (Gyeonggang line), then a taxi. A garden shuttle runs in peak season.',
      href: { label: 'Official site, online tickets ↗', url: 'https://www.hwadamsup.com' },
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
      when: 'Thu 19 Nov',
      ends: '2026-11-19',
      text: '**CSAT, the national university exam.** Extra morning subway trains, many offices open at 10:00, and flights pause during the English listening test. Avoid the morning rush.',
    },
    {
      when: 'From Fri 11 Dec',
      ends: '2026-12-10',
      cityId: 'seoul',
      text: 'The **Seoul Lantern Festival** lights the Cheonggyecheon stream every evening until 31 Jan.',
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
