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
  updated: '2026-11-08',
  weeks: [
    {
      range: 'Nov 3rd(Tue) ~ 8th(Sun)',
      ends: '2026-11-08',
      events: [
        {
          id: 'busan-fireworks-festival',
          ends: '2026-11-07',
          title: 'Busan Fireworks Festival',
          city: 'Busan',
          cityId: 'busan',
          when: 'Sat 7 Nov · show 19:00 to 20:00',
          where: 'Gwangalli Beach, over the Gwangan Bridge',
          price: 'Free on the beach, reserved seats ₩70,000 to ₩100,000',
          text: 'The big one: a one-hour fireworks and laser show over the lit bridge.',
          todo: [
            'Come in the afternoon: events on the beach start at 14:00, and entry to the paid seats opens at 15:00 and **closes at 18:00**.',
            'From 19:00: a guest fireworks show from China (15 minutes), Busan\'s own multi-fireworks show (30 minutes), then a 5-minute finale.',
            'Watch from the free beach, or from a reserved seat: R with table and chair ₩100,000, S with chair ₩70,000. Seats are sold in advance.',
          ],
          tip: '🚇 **Gwangan Station** (line 2). Afterwards the station is crushed, so walk on to the next one.',
          href: { label: 'Seat tickets ↗', url: 'https://nol.yanolja.com/ticket/products/26009342' },
          routes: [{ cityId: 'busan', pathId: 'villages-and-hotspots', text: 'Gwangalli night walk and Busan highlights' }],
        },
        {
          id: 'autumn-colours-now',
          ends: '2026-11-15',
          title: 'Autumn colours are at their best',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Now to about mid-November',
          where: 'Ginkgo streets in Seoul, Suwon and Jeonju, mountains further south',
          price: 'Free',
          text: 'Ginkgo and maple turn together in Seoul this week and next. Forecasts differ by about a week, so go soon.',
          todo: [
            'Walk the ginkgo avenue of **Garosu-gil** in Sinsa in the late afternoon, when the yellow leaves are at their best.',
            'In Suwon, walk **Hwaseong Haenggung** palace and look for silver grass and yellow ginkgo along the pond.',
            '**Naejangsan** National Park, in North Jeolla, peaks around 4 to 10 Nov.',
            'In Jeonju, see the 400-year-old ginkgo trees of **Jeonju Hyanggyo** turn gold; the school is {red:closed on Mondays}.',
          ],
          routes: [
            { cityId: 'gyeonggi-do', pathId: 'hwaseong', text: 'Suwon with Hwaseong Fortress' },
            { cityId: 'gyeongju-jeonju', pathId: 'jeonju', text: 'Jeonju Hanok Village and Hyanggyo' },
          ],
          posts: [{ id: 'danpung-nori-korea-goes-to-the-mountains', text: 'Danpung-nori: the week Korea goes to the mountains' }],
        },
        {
          id: 'icnx-incheon',
          ends: '2026-11-04',
          title: 'ICNX media and content conference',
          city: 'Incheon',
          cityId: 'incheon',
          when: 'Tue 3 and Wed 4 Nov',
          where: 'Songdo Convensia, Grand Ballroom A and B',
          price: 'Free for the public',
          text: 'A two-day conference of media and entertainment-tech companies, held in English. It is business-minded, with an exhibition you can walk through.',
          todo: [
            'Hear keynote speeches and special sessions on media technology and content.',
            'Walk the exhibition and experience booths of 37 companies, 17 of them aimed at the public.',
            'How to register is not stated in the announcement, so ask the organiser, Incheon Technopark.',
          ],
          tip: '🚇 **Convensia Station** (Incheon line 1).',
        },
        {
          id: 'nowon-moonlight-walk',
          ends: '2026-11-08',
          title: 'Nowon Moonlight Walk',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Until Sun 8 Nov · 17:30 to 22:00',
          where: 'Danghyeoncheon stream, Nowon, near Junggye Station',
          price: 'Free, no booking',
          text: 'An open-air light-art show along a city stream, themed New Moon. The lights come on at 17:30.',
          todo: [
            'Stroll along the stream path past about **30 light sculptures** by 24 artist teams.',
            'Look for the media installation and the giant book sculpture, two of the favourites.',
            'Join a **free guided moonlight tour**, and catch the weekend performances.',
            'Weekends are busy, weekday evenings are calmer.',
          ],
          tip: '🚇 **Junggye Station** (line 7).',
          href: { label: 'Official site ↗', url: 'https://moonlightwalk.kr' },
        },
        {
          id: 'jeju-olle-walking-festival',
          ends: '2026-11-07',
          title: 'Jeju Olle Walking Festival',
          city: 'Jeju',
          cityId: 'jeju',
          when: 'Thu 5 to Sat 7 Nov',
          where: 'Olle routes 19 and 20, northeast coast, opening at Jocheon Stadium',
          price: '₩30,000 to ₩35,000, sign up on site (online is closed)',
          text: 'Three days of walking the coast together with thousands of other walkers, billed as the last festival in this big-group format.',
          todo: [
            '**Day 1:** opening ceremony at Jocheon Stadium, then a 13 km coastal walk to Dongbok-ri.',
            '**Day 2:** 11.5 km from Dongbok-ri to the Jeju Batdam Theme Park.',
            '**Day 3:** 12.9 km, walked in reverse from the Haenyeo memorial park at the end of route 20.',
            'Lunch tickets and the shuttle bus can only be bought in the Olle Pass app beforehand, not on site.',
          ],
        },
        {
          id: 'seoul-plaza-evening-market',
          ends: '2026-11-06',
          title: 'Seoul Plaza Evening Market',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Fri 6 Nov · 10:00 to 21:00',
          where: 'Seoul Plaza, in front of City Hall',
          price: 'Walk in, the activities are free',
          text: 'A one-day market of 47 small Korean businesses in the middle of the city.',
          todo: [
            'Browse stalls of **food kits, specialty tea and baked goods**, plus handmade soap, leather goods and traditional crafts.',
            'Free face painting, caricatures and photos from 11:00 to 18:00.',
            'Magic and jazz from 15:00, then live gugak fusion, jazz and acoustic sets from 18:00 to 20:40.',
          ],
          tip: '🚇 **City Hall Station** (lines 1 and 2).',
        },
        {
          id: 'shinsegae-christmas-facade',
          ends: '2027-01-31',
          title: 'Shinsegae Christmas media facade',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Daily · 17:00 to midnight, until 31 Jan',
          where: 'Shinsegae Main Store, Myeongdong',
          price: 'Free',
          text: 'The department store turns its whole outer wall into a Christmas screen, the first big Christmas light show of the season.',
          todo: [
            'Watch the Christmas film play on the building: a bear carries wishes on a balloon and finishes the Christmas tree.',
            'It plays every day from 17:00 to midnight; watch it from the corner by the Bank of Korea.',
            'Make an evening of it: walk Seoullo 7017 from Seoul Station first and arrive as it gets dark.',
          ],
          tip: '🚇 **Hoehyeon Station** (line 4).',
          routes: [{ cityId: 'seoul', pathId: 'seoul-station-myeongdong', text: 'Seoul Station to Myeong-dong walk' }],
        },
      ],
    },
    {
      range: 'Nov 9th(Mon) ~ 15th(Sun)',
      ends: '2026-11-15',
      events: [
        {
          id: 'seoul-cafe-show',
          ends: '2026-11-14',
          title: 'Seoul Cafe Show',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Fri 13 Nov 10:00 to 18:00 · Sat 14 Nov 10:00 to 16:00',
          where: 'COEX, Gangnam',
          price: '₩25,000 for one day at the door, less if you book online first',
          text: 'Korea\'s biggest coffee and café fair, filling all four halls of COEX. **Open to everyone on Fri 13 and Sat 14 Nov**, the first two days are for trade visitors only.',
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
            'Walk on through the old town to the other spaces, among them the Gwandeokjeong pavilion and the Jeju Mok Gwana government compound.',
            'See works by about 70 artists and teams from around 20 countries.',
          ],
          href: { label: 'Official page ↗', url: 'https://jejubiennale.org' },
        },
        {
          id: 'gwangju-biennale-last-days',
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
  ],
  ongoing: [
    {
      id: 'namsan-night-festival',
      ends: '2026-11-14',
      title: 'Namsan Night Festival',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Until Sat 14 Nov · evenings',
      where: 'Namsan Park, around N Seoul Tower',
      price: 'Book ahead, refundable deposit ₩5,000 per person (Campnic ₩10,000 per team)',
      text: 'Three small evening programs on Namsan, each capped per day, so reserve before you go.',
      todo: [
        '**Autumn Foliage Walk** at Yejang Park: a night walk on forest paths with autumn colours and city views, 700 people a day.',
        '**Palgak Club** near the tower: a silent club party with a night view of Seoul, 300 people a day.',
        '**Namsan Campnic** at Baekbeom Plaza: a picnic with music and movies, 100 teams a day, up to 4 people each.',
      ],
      tip: '🚇 **Hoehyeon Station** (line 4).',
      href: { label: 'Official page ↗', url: 'https://english.visitseoul.net/events/2026Namsan-Night-Festival/ENP3rjagy' },
      routes: [{ cityId: 'seoul', pathId: 'hanyang-dosung-gil-3-4', text: 'City Wall Trail over Namsan' }],
    },
    {
      id: 'seoul-autumn-festa',
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
        'Ask for help at the information centre on the 1st floor of the Daehangno Center, open until 29 Nov and {red:closed on Mondays}.',
      ],
      href: { label: 'Program ↗', url: 'https://english.visitseoul.net/events/2026SeoulAutumnFesta/ENPjm3hw1' },
    },
    {
      id: 'gwangalli-drone-show',
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
      id: 'hwadam-forest-autumn',
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
        'Ride the monorail over the 1.9 km section: about 5 minutes instead of about 40 minutes on foot. It is booked separately and sells out fast.',
        'Book ahead: there are no tickets at the gate in peak season, and the booking site has no English page. Day tours from Seoul that include entry are the easy way.',
        '{red:Possibly closed on Mondays}, so plan another day.',
      ],
      tip: '🚇 **Gonjiam Station** (Gyeonggang line), then a taxi. A garden shuttle runs in peak season.',
      href: { label: 'Official site, online tickets ↗', url: 'https://www.hwadamsup.com' },
    },
    {
      id: 'unjeong-light-garden',
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
  ],
  comingUp: [
    {
      when: 'Thu 19 Nov',
      ends: '2026-11-19',
      text: '**CSAT, the national university exam.** Extra subway trains run in the morning, many offices start at 10:00, and flights pause during the English listening test. Plan around the morning rush.',
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
