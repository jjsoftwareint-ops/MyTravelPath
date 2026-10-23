// The blog diary. One entry per post, newest first. Voice, layout and AdSense rules: .claude/skills/blogdiary/SKILL.md

export type Block =
  | { type: 'p'; text: string } // one short paragraph, RichText markup
  | { type: 'h'; text: string; icon?: string } // short heading; icon = a file name in assets/emoji/
  | { type: 'emoji'; name: string } // big 3D emoji (assets/emoji/<name>.png) as a visual rest
  | { type: 'space' } // extra breathing room
  | { type: 'list'; items: string[] }
  | { type: 'dishes'; items: { icon: string; text: string }[] } // list with a 3D emoji per item (file name in assets/emoji/), a stand-in picture when no free photo exists
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'quote'; text: string }
  | { type: 'verdict'; text: string }
  | {
      type: 'img'
      src: string // file in assets/blog/, shown whole
      alt: string
      caption: string
      /** Source page of the photo; the image links to it. */
      href: string
      credit: { author: string; license: string; licenseUrl: string }
    }
  | { type: 'route'; cityId: string; pathId: string; text: string } // link to a walking route page
  | { type: 'ad'; slot: 'inArticle' } // a manual AdSense slot, max two per post (see AdSlot.tsx)

export type Post = {
  id: string
  title: string
  description: string // meta description and social preview
  teaser: string // one short sentence for the title list
  icon: string // 3D emoji after the title on the post page (file name in assets/emoji/)
  date: string // first published, YYYY-MM-DD
  updated: string // last changed, YYYY-MM-DD
  keywords: string[]
  body: Block[]
}

export const posts: Post[] = [
  {
    id: 'palace-dates-and-museum-shops',
    title: 'The hottest date spot in Seoul is 600 years old',
    description:
      'Koreans in their 20s and 30s are swapping trendy cafés for palaces and museums: palace staycations, cute museum goods and a royal tea room you win by lottery. Why, and how to join in.',
    teaser: 'Why Koreans now go on dates in palaces.',
    icon: 'red_paper_lantern',
    date: '2026-10-23',
    updated: '2026-10-23',
    keywords: ['KoreaTravel', 'Gyeongbokgung', 'Museum', 'Souvenirs', 'SeoulPalaces', 'KoreaTrends'],
    body: [
      {
        type: 'p',
        text: 'Quick quiz. Which is the better date spot in Seoul right now: a trendy café in Seongsu, or a palace finished in 1395?',
      },
      {
        type: 'p',
        text: 'More and more Koreans in their 20s and 30s pick the palace. The word going around is **궁캉스** (gungkangseu): 궁 (palace) plus 바캉스 (vacance, as in holiday). A staycation, but royal.',
      },
      {
        type: 'img',
        src: 'gyeongbokgung-geunjeongjeon.jpg',
        alt: 'Geunjeongjeon, the throne hall of Gyeongbokgung palace, seen across its stone courtyard',
        caption: 'Geunjeongjeon, the throne hall at Gyeongbokgung.',
        href: 'https://commons.wikimedia.org/wiki/File:Gyeongbokgung(palace)_Geunjeongjeon(hall).jpg',
        credit: { author: 'Brady Bellini', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
      },
      { type: 'space' },
      { type: 'h', icon: 'thinking_face', text: 'Why on earth?' },
      {
        type: 'p',
        text: 'Nobody can say for sure. Here are our guesses, next to the facts we could find.',
      },
      {
        type: 'list',
        items: [
          '**Quiet.** After a month of queueing for 버터떡 (beoteo-tteok), a palace courtyard feels like a deep breath.',
          '**Cheap.** A palace ticket costs a few thousand won, and visitors in hanbok get in free.',
          '**Pretty without trying.** Stone, tiled roofs, a mountain behind them. The photos take themselves.',
          '**It is having a moment.** Reports say Korea\'s national museums passed 10 million visitors in a year for the first time, and Gyeongbokgung drew a record of about 6.9 million in 2025.',
        ],
      },
      { type: 'space' },
      { type: 'h', icon: 'sparkles', text: 'Not quite like Europe' },
      {
        type: 'p',
        text: 'In a lot of Europe, a palace is a school trip. You go once, follow an audio guide, take your photo and leave.',
      },
      {
        type: 'p',
        text: 'In Seoul the palace sits in the middle of a working city, and plenty of visitors dress up in hanbok to stroll around in it. It feels less like a monument and more like a very old park where people hang out.',
      },
      {
        type: 'p',
        text: 'Museums too. The shop in a European museum sells postcards. Here, it sells a tiny Buddha that keeps selling out.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'h', icon: 'teddy_bear', text: '뮷즈 (myut-jeu): souvenirs with a story' },
      {
        type: 'p',
        text: '**뮷즈** (myut-jeu) is the National Museum of Korea\'s goods line, a mash-up of museum and goods: things shaped like the museum\'s treasures.',
      },
      {
        type: 'img',
        src: 'pensive-bodhisattva.jpg',
        alt: 'The gilt-bronze Pensive Bodhisattva, a slim seated figure with one leg crossed and a hand raised to the cheek',
        caption: 'A 반가사유상 (banga-sayusang, the Pensive Bodhisattva) from the museum, the kind of treasure the miniatures copy.',
        href: 'https://commons.wikimedia.org/wiki/File:Pensive_Bodhisattva_01.jpg',
        credit: { author: '국립중앙박물관 (National Museum of Korea)', license: 'KOGL Type 1', licenseUrl: 'https://www.kogl.or.kr/info/licenseType1.do' },
      },
      {
        type: 'p',
        text: 'The star is a tiny **반가사유상** (banga-sayusang) figure. More than 60,000 have sold in total, and it kept selling out after **BTS\'s RM** was reported to own one.',
      },
      {
        type: 'p',
        text: 'The numbers are wild. Museum goods took in about 21.8 billion won in the first half of 2026 alone, nearly double the same stretch last year. The shoppers used to be mostly middle-aged. Now they are in their 20s and 30s.',
      },
      {
        type: 'p',
        text: 'Some reports tie part of the boom to the **K-Pop Demon Hunters** craze, which sent fans looking for the real museum pieces.',
      },
      { type: 'space' },
      { type: 'h', icon: 'teacup_without_handle', text: 'The palace tea room' },
      {
        type: 'p',
        text: 'The hardest ticket might be **경복궁 생과방** (Gyeongbokgung Saenggwabang), a seasonal royal tea room where you eat the kind of sweets served at court.',
      },
      {
        type: 'p',
        text: 'Forget the open-run. It runs on a **lottery** through Ticketlink: you enter, and winners pick a date. Sessions are small, around 34 guests per slot according to blogs, and it comes in seasons, so check the dates before you plan.',
      },
      { type: 'p', text: 'A lottery for dessert. Korea, never change.' },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'hanok-villages',
        text: '🗺️ Our Hanok Villages walk starts at Gyeongbokgung and runs through the old palace quarter.',
      },
      { type: 'space' },
      { type: 'h', icon: 'compass', text: 'How to do it' },
      {
        type: 'list',
        items: [
          'Gyeongbokgung is closed on **Tuesdays**. Plan around it.',
          'Rent a hanbok around Anguk. Wearers get into the royal palaces free.',
          'Check the 생과방 (saenggwabang) dates on Ticketlink before you fly, and enter the lottery early.',
        ],
      },
      { type: 'space' },
      {
        type: 'verdict',
        text: '**Our verdict:** it makes sense to us. After years of hotspot hopping, a place that is calm, cheap and 600 years old feels like a plot twist. Quiet beats trendy more often than we expected.',
      },
      {
        type: 'p',
        text: 'Palace or café, where would you take a date? Tell us on the Contact page.',
      },
    ],
  },
  {
    id: 'korea-falls-back-in-love-with-pens',
    title: 'Why Korea is falling back in love with pens',
    description:
      'Copying books by hand, decorating diaries and shoes, writing real letters: the analog hobbies that Korea cannot stop talking about, and how to try them on your trip.',
    teaser: 'What is bringing people back to the pen?',
    icon: 'pen',
    date: '2026-10-23',
    updated: '2026-10-23',
    keywords: ['KoreaTravel', 'Pilsa', 'Dakku', 'Stationery', 'Seongsu', 'KoreaTrends', 'Analog'],
    body: [
      {
        type: 'p',
        text: 'Picture a café in Seoul. One table, four people. Nobody is scrolling. All four are bent over notebooks, copying sentences out of books with pens that cost more than their coffee.',
      },
      {
        type: 'p',
        text: 'Welcome to **필사** (pilsa), which simply means "copying by hand". And no, it is not homework.',
      },
      { type: 'space' },
      { type: 'h', icon: 'books', text: 'Pilsa: slow reading, on purpose' },
      {
        type: 'p',
        text: 'The idea is lovely and simple. Take a book you like, and write it out. Word by word. Slowly.',
      },
      {
        type: 'p',
        text: 'Reports say pilsa books and notebooks have sold several times over within a single year. Meditation for people who cannot sit still, basically. The sentence goes through your hand and not only your eyes, so it sticks.',
      },
      {
        type: 'p',
        text: 'Is it a little funny that people then photograph their notebooks for Instagram? There is even a hashtag, #필사스타그램 (pilsa-stagram). Yes, it is funny. We love it anyway.',
      },
      { type: 'space' },
      { type: 'h', icon: 'ribbon', text: '다꾸 (dakku) and 신꾸 (sinkku): decorate everything' },
      {
        type: 'p',
        text: '**다꾸** (dakku) is short for 다이어리 꾸미기 (daieori kkumigi), decorating your diary. Stickers, washi tape, tiny clippings, a page that ends up looking like a collage.',
      },
      {
        type: 'p',
        text: 'Then the habit escaped the notebook. Korean news calls it **별다꾸** (byeol-dakku), "decorating everything": phones, tumblers, bags, and shoes.',
      },
      {
        type: 'p',
        text: 'Shoes even have their own word, **신꾸** (sinkku), from 신발 꾸미기 (sinbal kkumigi). Earlier this year jelly shoes brought it roaring back, with charms and pins in every hole. One fashion app reported jelly-shoe sales up more than forty times over a year, and Dongdaemun market became the place to decorate them on the spot.',
      },
      {
        type: 'p',
        text: 'Small confession: "analog" is a bit of a stretch here. Half of this hobby is shopping. For some people the sticker haul is the hobby.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'love_letter', text: 'The handwritten letter is back' },
      {
        type: 'p',
        text: 'This is our favourite part. The **손편지** (sonpyeonji), the handwritten letter, is having a quiet comeback.',
      },
      {
        type: 'p',
        text: 'Korea has "slow mailboxes", **느린 우체통** (neurin ucheton). You write a letter to yourself or someone you love, and it arrives up to a year later. A Seoul news report from January says the experience at the letter museum in Dobong (편지문학관, pyeonji-munhakgwan) is popular.',
      },
      {
        type: 'p',
        text: 'Think about it. A text takes two seconds and disappears into a chat nobody scrolls back through. A letter takes ten minutes and ends up in a drawer, where it waits for you.',
      },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'seongsu-dong',
        text: '🗺️ Want to browse stationery? Our Seongsu walk passes Point of View, a three-floor shop of stationery and objects.',
      },
      { type: 'space' },
      { type: 'h', icon: 'compass', text: 'Try it on your trip' },
      {
        type: 'list',
        items: [
          'Copy one line from the book you brought into a small notebook. Add the date. That is pilsa, you are officially in.',
          'Buy a few stickers or a charm and decorate something small. A luggage tag is a nice start.',
          'Write a letter to yourself in a slow mailbox and forget about it for a year. Future you will be thrilled.',
        ],
      },
      { type: 'space' },
      {
        type: 'verdict',
        text: '**Our verdict:** the pen is only the excuse. What people really want is ten quiet minutes that belong to them. Cheap, offline, and nobody can like it. That might be the real luxury.',
      },
      {
        type: 'p',
        text: 'What is the last thing you wrote by hand? A shopping list counts. (Okay, it counts a little.) Tell us on the Contact page.',
      },
    ],
  },
  {
    id: 'is-the-long-line-worth-it',
    title: 'Is the long line really worth it?',
    description:
      'Korea loves a queue: the dessert café, the bakery, the noodle shop with 90 people outside. When is the wait worth it, and how many minutes is too many?',
    teaser: 'How long would you wait for a dessert?',
    icon: 'hourglass_not_done',
    date: '2026-10-23',
    updated: '2026-10-23',
    keywords: ['KoreaTravel', 'Waiting', 'OpenRun', 'Cafe', 'Bakery', 'SeoulFood', 'Dessert', 'KoreaTrends', 'Seongsu'],
    body: [
      {
        type: 'p',
        text: 'Walk through Seongsu or Hongdae on a Saturday and you will see it. A line curling around the corner, everybody on their phone, all waiting for one bakery.',
      },
      {
        type: 'p',
        text: 'Koreans even have a word for the sprint before opening time: **open-run** (오픈런, opeun-reon). People show up before the doors do.',
      },
      { type: 'p', text: 'So the question every visitor ends up asking: is it actually worth it?' },
      { type: 'space' },
      { type: 'h', icon: 'thinking_face', text: 'Why does everyone queue?' },
      {
        type: 'p',
        text: 'A long line is the cheapest advertising there is. Sixty people waiting means the place must be good. Right?',
      },
      { type: 'p', text: 'Then there is the photo. A cake you waited an hour for looks better on your feed. It even tastes better, funny enough.' },
      {
        type: 'p',
        text: 'And sometimes the shop really is great. That happens too. It is just less common than the line suggests.',
      },
      { type: 'space' },
      { type: 'h', icon: 'fire', text: 'What is in the line right now' },
      {
        type: 'p',
        text: 'Trends move fast here. One craze hands the baton to the next, and lately it is all chewy, crunchy, or both:',
      },
      {
        type: 'dishes',
        items: [
          { icon: 'cookie', text: '**두쫀쿠** (dujjonku), the Dubai chewy cookie that started the run.' },
          { icon: 'butter', text: '**버터떡** (beoteo-tteok), the "Shanghai butter rice cake": chewy inside, crisp at the edges.' },
          { icon: 'baguette_bread', text: '**초코바게트** (choco baguette), a baguette with a deep, dark chocolate flavour.' },
          { icon: 'mango', text: '**양쯔깐루** (Yangzhi Ganlu), the Hong Kong style mango dessert with sago.' },
        ],
      },
      {
        type: 'img',
        src: 'mango-pomelo-sago.jpg',
        alt: 'A square bowl of mango pomelo sago: yellow mango pieces, pomelo and tiny sago pearls in a creamy mango base',
        caption: 'Mango pomelo sago, the Hong Kong dessert behind 양쯔깐루 (Yangzhi Ganlu).',
        href: 'https://commons.wikimedia.org/wiki/File:MangoPomeloSago_1.jpg',
        credit: { author: 'Thomas.Lu', license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' },
      },
      {
        type: 'p',
        text: 'Notice something? Every one of them is easy to photograph and easy to queue for. I do not think that is an accident.',
      },
      {
        type: 'p',
        text: 'And the cycle is fast. Yakgwa, tanghulu, Dubai chocolate, 두쫀쿠 (dujjonku), now butter rice cake: Korean news keeps pointing out that a dessert craze can be over in a few months. Earlier this year, reports from Seongsu even mentioned weekend waits of several hours for the hottest ones. By the time you read this, the line may have moved on to something else.',
      },
      { type: 'space' },
      { type: 'h', icon: 'round_pushpin', text: 'Where the lines gather' },
      {
        type: 'p',
        text: 'Queues are not random. They pile up on a few streets, and once you know them you can plan around them.',
      },
      {
        type: 'list',
        items: [
          '**연무장길** (Yeonmujang-gil) in Seongsu. The main street of the old warehouse district, lined with pop-up spaces, bakeries and brunch spots. Weekends are the busiest, and some pop-ups hand out queue tickets or want a reservation on the day.',
          '**Hongdae** (홍대). Cafés, snack stalls and dessert shops all around the station. Lines tend to be longest on weekends, afternoon into evening.',
        ],
      },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'seongsu-dong',
        text: '🗺️ Heading to Seongsu anyway? Our Seongsu Popup Street + Forest walk passes Yeonmujang-gil.',
      },
      { type: 'space' },
      { type: 'h', icon: 'stopwatch', text: 'How long is too long?' },
      { type: 'p', text: 'Here is my rule of thumb. Not science, just a starting point. Yours may differ.' },
      {
        type: 'table',
        head: ['Wait', 'Verdict'],
        rows: [
          ['Under 15 min', '😀 Just go'],
          ['15 to 30 min', '🙂 Fine, if it is the reason you came'],
          ['30 to 60 min', '😐 Only with time to spare and a real craving'],
          ['Over 1 hour', '🙅 Skip it, your day is worth more'],
        ],
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'h', icon: 'croissant', text: 'Bakery' },
      {
        type: 'p',
        text: 'Bakeries are the easiest to judge, because you can see the tray. When the good stuff sells out by early afternoon, the line is telling you to come earlier or not at all.',
      },
      { type: 'h', icon: 'shortcake', text: 'Dessert café' },
      {
        type: 'p',
        text: 'This is where lines fool people most, and the trendy ones above are the perfect example. You are often paying for the hype and the photo. The dessert is usually fine, rarely life-changing.',
      },
      { type: 'p', text: 'Forty-five minutes for a good cake is hard to defend. A bad one even harder.' },
      { type: 'h', icon: 'steaming_bowl', text: 'Restaurant' },
      {
        type: 'p',
        text: 'Restaurants are different. A noodle shop with a lunch line of office workers is worth 20 or 30 minutes. The line usually moves faster than it looks, and the food is the whole point.',
      },
      { type: 'space' },
      { type: 'h', icon: 'mobile_phone', text: 'Queue smarter' },
      {
        type: 'list',
        items: [
          'Go on a weekday, before opening or in the quiet hour around 3 pm.',
          'Use a waiting app. Many popular places let you join the line from your phone and come back when your turn is close. **CatchTable Global** is the one to try as a visitor: travel guides say you can sign up with Google, Apple or an email address. **Tabling** is mostly built for locals and usually wants a Korean phone number.',
          'Do not wander too far. If your name is called and you are not there, you can lose your spot, so keep an eye on the app.',
          'Look for a **QR code** at the shop front. Some places put one by the door: scan it, join the waiting list online, then wander off and come back when your turn is close. It is the easiest trick of all, and it saves you from standing there. If it asks for a Korean phone number, look for a "no Korean number" option before you walk away.',
          'Ask the staff how long it will take. They know, and they usually tell you straight.',
          'Keep a plan B two doors down. Korean streets are full of good places with no line at all.',
        ],
      },
      { type: 'space' },
      {
        type: 'verdict',
        text: '**Our verdict:** about 20 minutes is the happy limit for food, and maybe 40 for a bakery you really want. Past that, the best part of your trip is spent standing still.',
      },
      {
        type: 'p',
        text: 'What is the longest you have waited for something in Korea, and was it worth it? Tell us on the Contact page.',
      },
    ],
  },
]

export const findPost = (id?: string) => posts.find((p) => p.id === id)

/** Neighbours in the newest-first list: `newer` is the post before it, `older` the one after. */
export function neighbours(id: string) {
  const i = posts.findIndex((p) => p.id === id)
  return { newer: i > 0 ? posts[i - 1] : undefined, older: i >= 0 ? posts[i + 1] : undefined }
}

/** Posts grouped by month, keeping the newest-first order. */
export function postsByMonth() {
  const groups: { month: string; posts: Post[] }[] = []
  for (const p of posts) {
    const month = p.date.slice(0, 7)
    const last = groups[groups.length - 1]
    if (last && last.month === month) last.posts.push(p)
    else groups.push({ month, posts: [p] })
  }
  return groups
}

export const blogUpdated = posts.reduce((a, p) => (a > p.updated ? a : p.updated), '2026-10-01')
