// "This week in Korea": the weekly events page (/this-week/), the card on the home page and the
// calendar button on each city card. Updated by hand every week, see .claude/skills/thisweek/SKILL.md.
// Text uses RichText markup (**highlight**, {red:...}, [label](https://...)); no years, no restaurants.

export type WeekEvent = {
  id: string // lowercase-hyphen, unique on the page
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
}

export type Week = {
  range: string // "Tue 3 to Sun 8 Nov"
  events: WeekEvent[]
}

export type ThisWeek = {
  updated: string // YYYY-MM-DD, the day the page was last refreshed (drives the red dot on the header icon)
  headline: string // id of the event the home-page card names; the one most readers should not miss
  weeks: Week[] // this week first, then next week
  ongoing: WeekEvent[] // runs through both weeks
  comingUp: { when: string; text: string; cityId?: string }[] // dated heads-ups just after the period; no cityId = nationwide, shown for every city
}

export const thisWeek: ThisWeek = {
  updated: '2026-11-03',
  headline: 'busan-fireworks-festival',
  weeks: [
    {
      range: 'Tue 3 to Sun 8 Nov',
      events: [
        {
          id: 'autumn-colours-now',
          title: 'Autumn colours are at their best',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Now to about mid-November',
          where: 'Ginkgo streets in Seoul and Suwon, mountains further south',
          price: 'Free',
          text: 'Ginkgo and maple turn together in Seoul this week and next. Forecasts differ by about a week, so go soon.',
          todo: [
            'Walk the ginkgo avenue of **Garosu-gil** in Sinsa in the late afternoon, when the yellow leaves are at their best.',
            'In Suwon, walk **Hwaseong Haenggung** palace and look for silver grass and yellow ginkgo along the pond.',
            '**Naejangsan** National Park, in North Jeolla, peaks around 4 to 10 Nov.',
          ],
          routes: [
            { cityId: 'seoul', pathId: 'gangnam-night-streets', text: 'Garosu-gil and Gangnam at night' },
            { cityId: 'gyeonggi-do', pathId: 'hwaseong', text: 'Suwon with Hwaseong Fortress' },
          ],
        },
        {
          id: 'icnx-incheon',
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
          title: 'Shinsegae Christmas media facade',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'From Fri 6 Nov · evenings',
          where: 'Shinsegae Main Store, Myeongdong',
          price: 'Free',
          text: 'The department store turns its whole outer wall into a Christmas screen, the first big Christmas light show of the season.',
          todo: [
            'Watch the Christmas film play on the building: a bear carries wishes on a balloon and finishes the Christmas tree.',
            'Show hours are not announced yet. Last season it ran from 17:00 to midnight.',
          ],
          tip: '🚇 **Hoehyeon Station** (line 4).',
        },
        {
          id: 'busan-fireworks-festival',
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
      ],
    },
    {
      range: 'Mon 9 to Sun 15 Nov',
      events: [
        {
          id: 'seoul-cafe-show',
          title: 'Seoul Cafe Show',
          city: 'Seoul',
          cityId: 'seoul',
          when: 'Fri 13 Nov 10:00 to 18:00 · Sat 14 Nov 10:00 to 16:00',
          where: 'COEX, Gangnam',
          price: 'Day ticket, early-bird price was about ₩15,000',
          text: 'Korea\'s biggest coffee and café fair. **Open to everyone on Fri 13 and Sat 14 Nov**, the first two days are for trade visitors only.',
          todo: [
            'Walk the booths of café brands from around the world to see new coffee, dessert and café trends.',
            'The Seoul Coffee Festival runs at Starfield Library, in the same mall.',
            'Last entry is half an hour before closing, and Saturday closes early.',
          ],
          tip: '🚇 **Samseong Station** (line 2), COEX is a few minutes underground.',
        },
        {
          id: 'jeju-biennale-last-days',
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
    },
    {
      id: 'seoul-autumn-festa',
      title: 'Seoul Autumn Festa',
      city: 'Seoul',
      cityId: 'seoul',
      when: 'Until Sun 29 Nov',
      where: 'Theatres, Han River parks and open-air stages across the city',
      price: 'Free and paid programs',
      text: 'The city\'s performing-arts festival: 38 festivals and 478 performances in total.',
      todo: [
        'Pick a show by date on the official program page.',
        'Ask for help at the information centre on the 1st floor of the Daehangno Center, open until 29 Nov and **{red:closed on Mondays}**.',
      ],
      href: { label: 'Program ↗', url: 'https://english.visitseoul.net/events/2026SeoulAutumnFesta/ENPjm3hw1' },
    },
    {
      id: 'gwangalli-drone-show',
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
    },
    {
      id: 'hwadam-forest-autumn',
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
    },
    {
      id: 'unjeong-light-garden',
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
    },
  ],
  comingUp: [
    {
      when: 'Thu 19 Nov',
      text: '**CSAT, the national university exam.** Extra subway trains run in the morning, many offices start at 10:00, and flights pause during the English listening test. Plan around the morning rush.',
    },
    {
      when: 'From Fri 11 Dec',
      cityId: 'seoul',
      text: 'The **Seoul Lantern Festival** lights the Cheonggyecheon stream every evening until 31 Jan.',
    },
  ],
}

/** The event the home-page card names. */
export const weekHeadline = () => allEvents().find((e) => e.id === thisWeek.headline)

/** Every event on the page, ongoing ones included. */
export const allEvents = () => [...thisWeek.weeks.flatMap((w) => w.events), ...thisWeek.ongoing]

/** Number of events on the page, for the count on the home-page card. */
export const weekCount = () => allEvents().length

/** How many events the page lists for one city card on the home page. */
export const eventCount = (cityId: string) => allEvents().filter((e) => e.cityId === cityId).length

/** City ids that have at least one event, in the order the filter chips show them. */
export const eventCityIds = () => [...new Set(allEvents().map((e) => e.cityId).filter((id): id is string => !!id))]
