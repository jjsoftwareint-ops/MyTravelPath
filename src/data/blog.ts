// The blog diary. One entry per post, newest first. Voice, layout and AdSense rules: .claude/skills/blogdiary/SKILL.md

export type Block =
  | { type: 'p'; text: string } // one short paragraph, RichText markup
  | { type: 'h'; text: string; icon?: string } // short heading; icon = a file name in assets/emoji/
  | { type: 'emoji'; name: string } // big 3D emoji (assets/emoji/<name>.png) as a visual rest
  | { type: 'space' } // extra breathing room
  | { type: 'list'; items: string[] }
  | { type: 'dishes'; items: { icon: string; text: string }[] } // list with a 3D emoji per item (file name in assets/emoji/); when no free photo exists, the dish name in `text` is a Google Images link
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
    id: 'which-hanok-village-are-you',
    title: 'Seoul has 4 hanok villages',
    description:
      'Bukchon, Ikseon-dong, Insadong and Namsangol all show off traditional hanok houses, but each has its own personality. Here is how to pick, and which one lets you step inside.',
    teaser: 'Which one is your best pick?',
    icon: 'house_with_garden',
    date: '2026-10-24',
    updated: '2026-10-24',
    keywords: ['KoreaTravel', 'Hanok', 'Bukchon', 'Ikseondong', 'Insadong', 'Seoul'],
    body: [
      {
        type: 'p',
        text: 'Ask five people for a hanok neighbourhood in Seoul and you will get five answers. The traditional house, hanok, shows up in more than one place, and each place has a different mood.',
      },
      {
        type: 'p',
        text: 'So here is a quick test. Pick the one that sounds like you.',
      },
      { type: 'space' },
      { type: 'h', icon: 'camera', text: '1. Bukchon: the famous one' },
      {
        type: 'img',
        src: 'bukchon-alley.jpg',
        alt: 'A quiet sloping alley in Bukchon, with a brick wall covered in red roses on the left and traditional tiled-roof hanok houses on the right',
        caption: 'Bukchon: tiled roofs, steep lanes, and the photo everyone wants.',
        href: 'https://commons.wikimedia.org/wiki/File:Flowery_alley_lined_with_hanok_houses_and_red_rosebush_in_Bukchon_Hanok_Village_Seoul.jpg',
        credit: { author: 'Basile Morin', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
      },
      {
        type: 'p',
        text: '북촌 (Bukchon, "the north village") is the one on every postcard. Tiled roofs step down a hill between two palaces. It is beautiful, and it is also where people actually live.',
      },
      {
        type: 'p',
        text: 'That is why the busiest lane is open to visitors only from **10:00 to 17:00**, with a ₩100,000 fine outside those hours. Go early, keep your voice down, and do not block the lane for photos.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'sparkles', text: '2. Ikseon-dong: the cute one' },
      {
        type: 'img',
        src: 'ikseon-dong-alley.jpg',
        alt: 'A narrow alley in Ikseon-dong lined with small shops and cafés in old low buildings',
        caption: 'Ikseon-dong: tiny alleys, tiny cafés.',
        href: 'https://commons.wikimedia.org/wiki/File:Ikseon-dong_%EC%9D%B5%EC%84%A0%EB%8F%99_October_1_2020_1.jpg',
        credit: { author: 'S h y numis', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
      },
      {
        type: 'p',
        text: '익선동 (Ikseon-dong) is a block of small hanok from the 1920s. The same developer, 정세권 (Jeong Se-gwon), is credited with Bukchon\'s hanok as well, according to Korean reports.',
      },
      {
        type: 'p',
        text: 'A redevelopment plan fell through, so owners rented the old houses to cafés and small restaurants. A few years later it was one of Seoul\'s trendiest lanes. It is probably the most popular hanok spot right now, so expect a crowd.',
      },
      { type: 'space' },
      { type: 'h', icon: 'thinking_face', text: '3. Insadong: the artsy one' },
      {
        type: 'img',
        src: 'insadong-street.jpg',
        alt: 'A paved street in Insadong with tiled-roof restaurant fronts, vertical signs and people walking',
        caption: 'Insadong: signs, tea and souvenirs. Not all hanok, all charm.',
        href: 'https://commons.wikimedia.org/wiki/File:Seoul-Insadong-Street-01.jpg',
        credit: { author: 'travelmate2021', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
      },
      {
        type: 'p',
        text: '인사동 (Insadong) is a street of galleries, tea houses and craft shops. Honestly, it is not mostly hanok houses. But it feels old Seoul, and it is the easiest place to buy a gift.',
      },
      { type: 'space' },
      { type: 'h', icon: 'door', text: '4. Namsangol: the one you can walk into' },
      {
        type: 'img',
        src: 'namsangol-inside.jpg',
        alt: 'Inside a hanok at Namsangol Hanok Village: wooden cabinets and a lantern along a white wall, a folding screen on the right and a paper-covered floor',
        caption: 'Inside a Namsangol hanok: a furnished room, open to visitors.',
        href: 'https://commons.wikimedia.org/wiki/File:%EC%98%A5%EC%9D%B8%EB%8F%99%EC%9C%A4%EC%94%A8%EA%B0%80%EC%98%A5_%EC%82%AC%EC%A7%84_(2).jpg',
        credit: { author: '록콜롤룸', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
      },
      {
        type: 'p',
        text: 'The [남산골한옥마을](https://www.google.com/search?tbm=isch&q=%EB%82%A8%EC%82%B0%EA%B3%A8%ED%95%9C%EC%98%A5%EB%A7%88%EC%9D%84) (Namsangol Hanok Village) is a garden with five old hanok. Reports say they were moved here from around Seoul, and the village opened in 1998. Nobody lives here, and entry is free.',
      },
      {
        type: 'p',
        text: 'And this is the one place on our list where you can go **deep inside a hanok**. In Bukchon you only see the outside, because people live there. Here you can step into the houses and look around the rooms, which are shown furnished the way their owners lived.',
      },
      {
        type: 'p',
        text: 'Each house has its own story. Reports say one belonged to a military officer, one to a master carpenter, and one was a family shrine house.',
      },
      {
        type: 'p',
        text: 'A small warning: some houses have steps at the entrance, so it is not easy with a wheelchair or a pushchair.',
      },
      {
        type: 'p',
        text: 'There is even a time capsule, buried in 1994. It is meant to be opened in the year 2394. We will not be there.',
      },
      {
        type: 'p',
        text: 'Reports say the village is closed on Mondays, but opening days and hours can change, so check the official site (hanokmaeul.co.kr) before you go.',
      },
      { type: 'space' },
      { type: 'h', icon: 'thinking_face', text: 'So, which one are you?' },
      {
        type: 'table',
        head: ['If you like…', 'Go to'],
        rows: [
          ['The famous photo', 'Bukchon'],
          ['Cute cafés and alleys', 'Ikseon-dong'],
          ['Tea, art and gifts', 'Insadong'],
          ['Going inside a hanok, for free', 'Namsangol'],
        ],
      },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'hanok-villages',
        text: '🗺️ Our Hanok Villages walk connects Bukchon, Ikseon-dong and Insadong in one day.',
      },
      { type: 'space' },
      {
        type: 'verdict',
        text: '**Our verdict:** Bukchon in the morning, Ikseon-dong for a coffee, and Namsangol when you want to step inside a hanok for real.',
      },
      {
        type: 'p',
        text: 'Which one are you? Tell us on the Contact page.',
      },
    ],
  },
  {
    id: 'why-young-koreans-love-pansori',
    title: 'Why is a centuries-old song style suddenly cool?',
    description:
      'Pansori is old Korean storytelling in song, and the crowd is meant to shout. Why young people love it now, the tiger song everyone hummed, and where to see it live.',
    teaser: 'Plus the tiger song everyone hummed.',
    icon: 'drum',
    date: '2026-10-23',
    updated: '2026-10-23',
    keywords: ['KoreaTravel', 'Pansori', 'Gugak', 'Leenalchi', 'KoreanMusic', 'KoreaTrends'],
    body: [
      {
        type: 'p',
        text: 'A man hits a drum. A woman sings for hours, playing every character in the story. And the audience keeps yelling at her. On purpose.',
      },
      {
        type: 'p',
        text: 'That is **판소리** (pansori), and the yelling is part of the deal. When the singer nails a line, you shout **얼쑤!** (eolssu!), which means roughly "yes, go on!". The shouts have a name, **추임새** (chuimsae).',
      },
      {
        type: 'p',
        text: 'A concert where heckling is encouraged. We love it already.',
      },
      {
        type: 'img',
        src: 'pansori-unhyeongung.jpg',
        alt: 'A pansori performance on an outdoor stage: a singer in a pink and yellow hanbok stands, while a drummer in white sits cross-legged with a barrel drum',
        caption: 'One singer, one drummer: a pansori show at Unhyeongung, Seoul, 2013.',
        href: 'https://commons.wikimedia.org/wiki/File:Pansori_performance_in_Unhyeon_Palace_1.jpg',
        credit: { author: 'Wikimedia Commons contributor', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/' },
      },
      {
        type: 'p',
        text: 'The singer is the [소리꾼](https://www.google.com/search?tbm=isch&q=%ED%8C%90%EC%86%8C%EB%A6%AC%20%EC%86%8C%EB%A6%AC%EA%BE%BC) (sorikkun) and the drummer is the [고수](https://www.google.com/search?tbm=isch&q=%ED%8C%90%EC%86%8C%EB%A6%AC%20%EA%B3%A0%EC%88%98) (gosu). The drummer is no sidekick. He shouts back too.',
      },
      { type: 'ad', slot: 'inArticle' },
      {
        type: 'p',
        text: 'Honestly, for a long time we thought of it as school-trip stuff.',
      },
      { type: 'space' },
      { type: 'h', icon: 'tiger_face', text: 'Then a tiger showed up' },
      {
        type: 'p',
        text: 'A band called [이날치](https://www.google.com/search?tbm=isch&q=%EC%9D%B4%EB%82%A0%EC%B9%98%20%EB%B0%B4%EB%93%9C) (Leenalchi) took a scene from the epic [수궁가](https://www.google.com/search?tbm=isch&q=%ED%8C%90%EC%86%8C%EB%A6%AC%20%EC%88%98%EA%B6%81%EA%B0%80) (Sugungga), the one about a tiger, and put a dance beat under it. The song is [범 내려온다](https://youtu.be/SmTRaSg2fTQ) (beom naeryeoonda), "the tiger comes down". The link is the stage video with a dance company that took off.',
      },
      {
        type: 'p',
        text: 'Suddenly everyone was quoting it. There was even a meme, **1일 1범** (il-il beom), "one tiger a day", like a daily vitamin.',
      },
      {
        type: 'p',
        text: 'Reports say the tourism board videos using it were watched hundreds of millions of times across platforms. For a song about a tiger, from a very old epic. Fine by us.',
      },
      { type: 'space' },
      { type: 'h', icon: 'microphone', text: 'Song So-hee, the plot twist' },
      {
        type: 'p',
        text: 'One small detail first. [송소희](https://www.google.com/search?tbm=isch&q=%EC%86%A1%EC%86%8C%ED%9D%AC) (Song So-hee) is a folk singer, **경기민요** (Gyeonggi minyo), not a pansori singer. They are two kinds of traditional Korean singing, like cousins.',
      },
      {
        type: 'p',
        text: 'She was the child star everyone called **국악소녀** (gugak-sonyeo), "the traditional music girl". She grew up. Reports say she now plays big festival stages and writes rock songs that keep her folk voice.',
      },
      { type: 'h', icon: 'musical_note', text: 'Hear her' },
      {
        type: 'list',
        items: [
          '[Not a Dream](https://youtu.be/Zbo7UY8dxh8): a live clip of this song, before it was even released, reportedly passed 13 million views. It came out properly in March 2025.',
          '[함바칼레](https://youtu.be/YENUe7tTa9k) (Hamba Kahle): the title song of her EP Re:5, which she performed at a big indoor festival this year.',
          '[설화](https://youtu.be/2Cvdk4DzjI0) (seolhwa): her fresh take on the folk song Miryang Arirang, from 2019.',
        ],
      },
      { type: 'space' },
      { type: 'h', icon: 'thinking_face', text: 'Why does it work?' },
      {
        type: 'p',
        text: 'Our guesses, no science:',
      },
      {
        type: 'list',
        items: [
          '**It sounds like nothing on your playlist.** The voice bends, cracks and growls. Autotune cannot do that.',
          '**Pop is crowded.** A real pansori in a sea of idol songs stands out like a hanbok in a nightclub.',
          '**The memes made it safe.** Someone called it **조선의 힙스터** (Joseon-ui hipseuteo), the "Joseon hipster". Once it is a joke, it is allowed to be cool.',
        ],
      },
      {
        type: 'p',
        text: 'Some fans of the old style roll their eyes at three-minute remixes. Fair. But think of the remix as the trailer, and the live show as the movie.',
      },
      { type: 'space' },
      { type: 'h', icon: 'compass', text: 'Catch it live' },
      {
        type: 'list',
        items: [
          'The [국립국악원](https://www.google.com/search?tbm=isch&q=%EA%B5%AD%EB%A6%BD%EA%B5%AD%EC%95%85%EC%9B%90) (Gungnip Gugagwon, National Gugak Center) in Seoul puts on traditional shows. A news report says foreigners were about a third of the audience at its Saturday shows in July, so you will not be the only one.',
          'One travel guide says state-run theatres close online booking at 6 pm the day before. We could not confirm it, so check the official site.',
          'Bring your **얼쑤** (eolssu). If the show invites you to shout, shout.',
        ],
      },
      { type: 'space' },
      {
        type: 'verdict',
        text: '**Our verdict:** start with the tiger, stay for the drum.',
      },
      {
        type: 'p',
        text: 'Be honest: did you hum **범 내려온다** (beom naeryeoonda) while reading this? Tell us on the Contact page.',
      },
    ],
  },
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
        text: 'More and more Koreans in their 20s and 30s pick the palace. The word going around is [궁캉스](https://www.google.com/search?tbm=isch&q=%EA%B6%81%EC%BA%89%EC%8A%A4) (gungkangseu): 궁 (palace) plus 바캉스 (vacance, as in holiday). A staycation, but royal.',
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
        text: '[뮷즈](https://www.google.com/search?tbm=isch&q=%EB%AE%B7%EC%A6%88) (myut-jeu) is the National Museum of Korea\'s goods line, a mash-up of museum and goods: things shaped like the museum\'s treasures.',
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
        text: 'The star is a tiny [반가사유상](https://www.google.com/search?tbm=isch&q=%EB%B0%98%EA%B0%80%EC%82%AC%EC%9C%A0%EC%83%81%20%EB%AF%B8%EB%8B%88%EC%96%B4%EC%B2%98) (banga-sayusang) figure. More than 60,000 have sold in total, and it kept selling out after **BTS\'s RM** was reported to own one.',
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
        text: 'The hardest ticket might be [경복궁 생과방](https://www.google.com/search?tbm=isch&q=%EA%B2%BD%EB%B3%B5%EA%B6%81%20%EC%83%9D%EA%B3%BC%EB%B0%A9) (Gyeongbokgung Saenggwabang), a seasonal royal tea room where you eat the kind of sweets served at court.',
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
        text: 'Welcome to [필사](https://www.google.com/search?tbm=isch&q=%ED%95%84%EC%82%AC) (pilsa), which simply means "copying by hand". And no, it is not homework.',
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
        text: '[다꾸](https://www.google.com/search?tbm=isch&q=%EB%8B%A4%EA%BE%B8) (dakku) is short for 다이어리 꾸미기 (daieori kkumigi), decorating your diary. Stickers, washi tape, tiny clippings, a page that ends up looking like a collage.',
      },
      {
        type: 'p',
        text: 'Then the habit escaped the notebook. Korean news calls it [별다꾸](https://www.google.com/search?tbm=isch&q=%EB%B3%84%EB%8B%A4%EA%BE%B8) (byeol-dakku), "decorating everything": phones, tumblers, bags, and shoes.',
      },
      {
        type: 'p',
        text: 'Shoes even have their own word, [신꾸](https://www.google.com/search?tbm=isch&q=%EC%8B%A0%EA%BE%B8) (sinkku), from 신발 꾸미기 (sinbal kkumigi). Earlier this year jelly shoes brought it roaring back, with charms and pins in every hole. One fashion app reported jelly-shoe sales up more than forty times over a year, and Dongdaemun market became the place to decorate them on the spot.',
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
        text: 'This is our favourite part. The [손편지](https://www.google.com/search?tbm=isch&q=%EC%86%90%ED%8E%B8%EC%A7%80) (sonpyeonji), the handwritten letter, is having a quiet comeback.',
      },
      {
        type: 'p',
        text: 'Korea has "slow mailboxes", [느린 우체통](https://www.google.com/search?tbm=isch&q=%EB%8A%90%EB%A6%B0%20%EC%9A%B0%EC%B2%B4%ED%86%B5) (neurin ucheton). You write a letter to yourself or someone you love, and it arrives up to a year later. A Seoul news report from January says the experience at the letter museum in Dobong (편지문학관, pyeonji-munhakgwan) is popular.',
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
          { icon: 'cookie', text: '[두쫀쿠](https://www.google.com/search?tbm=isch&q=%EB%91%90%EC%AB%80%EC%BF%A0) (dujjonku), the Dubai chewy cookie that started the run.' },
          { icon: 'butter', text: '[버터떡](https://www.google.com/search?tbm=isch&q=%EC%83%81%ED%95%98%EC%9D%B4%20%EB%B2%84%ED%84%B0%EB%96%A1) (beoteo-tteok), the "Shanghai butter rice cake": chewy inside, crisp at the edges.' },
          { icon: 'baguette_bread', text: '[초코바게트](https://www.google.com/search?tbm=isch&q=%EC%B4%88%EC%BD%94%EB%B0%94%EA%B2%8C%ED%8A%B8) (choco baguette), a baguette with a deep, dark chocolate flavour.' },
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
          '[연무장길](https://www.google.com/search?tbm=isch&q=%EC%84%B1%EC%88%98%20%EC%97%B0%EB%AC%B4%EC%9E%A5%EA%B8%B8) (Yeonmujang-gil) in Seongsu. The main street of the old warehouse district, lined with pop-up spaces, bakeries and brunch spots. Weekends are the busiest, and some pop-ups hand out queue tickets or want a reservation on the day.',
          '[Hongdae](https://www.google.com/search?tbm=isch&q=%ED%99%8D%EB%8C%80) (홍대). Cafés, snack stalls and dessert shops all around the station. Lines tend to be longest on weekends, afternoon into evening.',
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
