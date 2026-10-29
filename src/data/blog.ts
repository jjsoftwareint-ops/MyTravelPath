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
  | { type: 'photo'; src: string; alt: string; caption: string } // our own photo (file in assets/blog/), shown whole, no outside credit
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
    id: 'why-the-laugh-track-confuses-us',
    title: 'Why the laugh track on Friends confuses us',
    description:
      'Americans, Europeans and Koreans laugh at different moments. A sitcom that a whole country learned English from, a film critic who understands 97% of a Korean comedy, and the 3% that is the joke.',
    teaser: 'We know every word. We still miss the joke.',
    icon: 'rolling_on_the_floor_laughing',
    date: '2026-10-29',
    updated: '2026-10-29',
    keywords: ['KoreaCulture', 'KoreanHumor', 'Friends', 'Sitcom', 'KoreaVsEurope', 'Ajaegag', 'KoreanVariety', 'LearnKorean'],
    body: [
      {
        type: 'p',
        text: 'We have watched Friends more times than we would admit. We know the lines. And still, a few times an episode, the laugh track goes off and we sit there thinking: what was that?',
      },
      {
        type: 'p',
        text: 'It is not the English. It is the laughing point. Americans, Europeans and Koreans put it in different places, and once you notice, you cannot stop noticing.',
      },
      { type: 'emoji', name: 'television' },
      { type: 'h', text: 'The missing 3 percent', icon: 'thinking_face' },
      {
        type: 'p',
        text: 'The best description of this feeling comes from the other direction. Darcy Paquet, the American film critic who has lived in Korea since the 90s and did the English subtitles for Parasite, once wrote that he understands about 97 percent of a Korean comedy. "내가 이해하지 못하는 그 3%는 다 웃기는 부분이다 (nae-ga ihae-haji mothaneun geu sam-peosenteu-neun da utgineun bubun-ida)": the 3 percent I don\'t get is all the funny parts.',
      },
      {
        type: 'p',
        text: 'His guess at why: Korean humour is "more dynamic and direct". American humour is delivered calm, because, in his words, Americans always have to look cool. The joke is in the composure. Which is exactly where we lose it.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'h', text: 'America: the cool line', icon: 'speech_balloon' },
      {
        type: 'p',
        text: 'Think of Chandler. Half of his jokes are sarcasm aimed at a friend, delivered flat. To an American audience that is affection. Research on how sarcasm is read across cultures found that Western participants tend to hear it as amusing, while East Asian participants tend to hear it as also aggressive. So when Chandler mocks Joey, we hear a small insult and wait for the apology. The laugh track hears love.',
      },
      {
        type: 'p',
        text: 'Americans do soften it. Simon Pegg once pointed out that they like to add a "just kidding" at the end, in case. A Korean would not make the joke at all, unless the friendship is old enough to survive it. Teasing is a privilege you earn, not an opener.',
      },
      { type: 'h', text: 'Europe: the awkward silence', icon: 'hourglass_not_done' },
      {
        type: 'p',
        text: 'The British, says Ricky Gervais, use irony "as liberally as prepositions". The joke is often that nothing happens: someone says something wrong, nobody reacts, and the silence is the punchline. The original Office is forty minutes of that. Germans and Scandinavians have their own flavours of it, dry enough to miss entirely if you are waiting for a cue.',
      },
      {
        type: 'p',
        text: 'Gervais also thinks Americans are raised to believe they could be president, and Brits are told early that they will not be, so British comedy is comfortable with losers. Korea sits closer to Britain here. Our variety shows run on a cast of lovable failures.',
      },
      { type: 'emoji', name: 'face_with_tears_of_joy' },
      { type: 'h', text: 'Korea: the caption laughs first', icon: 'television' },
      {
        type: 'p',
        text: 'A European watching a Korean variety show (**예능 (yeneung)**) for the first time usually asks the same question: why is the screen full of writing? The captions are the Korean laugh track. A producer told the Korea Herald they are "an extra narrator", there to make sure no one misses the point. Someone falls into a pond, the caption says "splash", a sad trombone plays, and a second caption says what the person is probably thinking. The silence a British show would leave empty, a Korean show fills with text.',
      },
      {
        type: 'p',
        text: 'Then there is the pun. The **아재개그 (ajae-gaeg)**, literally "uncle joke", is Korea\'s dad joke, and it had a nationwide revival on TV around 2015. The form: a word that sounds like the start of another word, glued on. "알겠습니다람쥐 (algesseumni-daramjwi)" is "understood" with a squirrel attached. It is objectively terrible. Everyone groans. The groan is the laugh.',
      },
      {
        type: 'p',
        text: 'And the body. **몸개그 (mom-gaeg)**, "body gag", is slapstick with full commitment: the exaggerated fall, the face, the recovery. Western comedy left this mostly behind after the silent era. Korea never did, because a fall needs no vocabulary and no rank. Which brings us to the real difference.',
      },
      {
        type: 'h', text: 'Who is allowed to joke', icon: 'owl' },
      {
        type: 'p',
        text: 'Korean has honorific speech levels that change with the age and rank of the person you talk to. A workplace study in Korea found that the kind of humour people use depends on their position, and so does how a junior may respond. You do not roast your senior. He can roast you, gently, and you laugh. So the sharp, equal, everyone-mocks-everyone humour of a New York apartment has no natural home at a Korean dinner table. Puns and pratfalls do: they punch nobody.',
      },
      {
        type: 'table',
        head: ['', 'Where the laugh is', 'How it is delivered'],
        rows: [
          ['USA', 'the sarcastic line', 'calm, cool, to a friend'],
          ['Britain / Europe', 'the silence after', 'deadpan, nobody reacts'],
          ['Korea', 'the pun, the fall, the face', 'loud, physical, captioned'],
        ],
      },
      { type: 'space' },
      { type: 'h', text: 'The textbook nobody laughs at', icon: 'books' },
      {
        type: 'p',
        text: 'Here is the funny part. Friends is the most-used English textbook in Korea. A teacher says he imported it as class material as early as 1991, publishers have sold pattern books built on it for twenty years, and when RM of BTS told an American talk show he learned English from it, sales went up again. A whole country learned to speak from a show whose jokes it half gets.',
      },
      {
        type: 'p',
        text: 'Maybe that is fine. You can learn "how you doin\'" without understanding why it is funny. The joke is the last thing you learn in any language, and the first thing that tells you where you are.',
      },
      {
        type: 'verdict',
        text: 'Our verdict, for visitors: do not open with sarcasm, it reads as an insult until you are friends. A bad pun will land. Laughing loudly at your own mistake will land better. And if a Korean laughs at a moment that seems like nothing to you, that was the 3 percent.',
      },
    ],
  },
  {
    id: 'danpung-nori-korea-goes-to-the-mountains',
    title: 'Danpung-nori: the week Korea goes to the mountains',
    description:
      'Autumn leaves are a national event in Korea, with forecast maps, chartered buses and daily visitor caps. When the colour peaks in 2026, where to see it in Seoul, and how to avoid the crowd.',
    teaser: 'The leaves have a forecast, like the weather.',
    icon: 'maple_leaf',
    date: '2026-10-29',
    updated: '2026-10-29',
    keywords: ['KoreaTravel', 'Danpung', 'AutumnInKorea', 'Seoul', 'Naejangsan', 'Bukhansan', 'Deoksugung', 'Hiking', 'KoreaVsEurope'],
    body: [
      {
        type: 'p',
        text: 'Every autumn, the Korean evening news does something we have never seen a European weather report do. It forecasts the leaves.',
      },
      {
        type: 'p',
        text: 'A map of the country, a date on every mountain, revised when the weather changes its mind. People plan weekends around it. The habit has its own word, **단풍놀이 (danpung-nori)**, literally "playing in the red leaves", which tells you how seriously it is taken: it is not a walk, it is play.',
      },
      {
        type: 'img',
        src: 'naejangsan-autumn.jpg',
        alt: 'A painted wooden pavilion at Naejangsan with maple branches turning orange and red in front of it',
        caption: 'Naejangsan (내장산), the mountain Koreans name first when you say 단풍 (danpung).',
        href: 'https://commons.wikimedia.org/wiki/File:%EB%82%B4%EC%9E%A5%EC%82%B0%EC%9D%98_%EB%8B%A8%ED%92%8D1.jpg',
        credit: { author: 'Shunshan Piao', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0' },
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'h', text: 'The leaf forecast', icon: 'deciduous_tree' },
      {
        type: 'p',
        text: 'The colour comes down the country like a slow red wave: north first, high first. Seoraksan (설악산) in the north-east goes around 20 October, Seoul\'s mountains in the first days of November, Naejangsan (내장산) in the south-west right after, and Jeju last.',
      },
      {
        type: 'table',
        head: ['Where', 'Peak colour, 2026'],
        rows: [
          ['Seoraksan (설악산), Gangwon', 'around 20 Oct'],
          ['Bukhansan (북한산), Seoul', 'around 4 Nov'],
          ['Naejangsan (내장산), Jeolla', 'around 4 Nov'],
          ['Hallasan (한라산), Jeju', 'around 6 Nov'],
        ],
      },
      {
        type: 'p',
        text: 'Those are the Forest Service dates. The weather office publishes its own, a few days later, because it waits for more of the mountain to turn before it will say "peak". So every mountain has two birthdays and the newspapers print both. Nobody minds. More weekends.',
      },
      {
        type: 'p',
        text: 'One thing the map does not hide: the wave is arriving later every year. Autumn nights have to drop to 5 degrees before a leaf bothers to change, and warm Septembers keep pushing that night back. The forecasters say the big mountains now turn about a week later than they did in the 1990s.',
      },
      { type: 'space' },
      { type: 'h', text: 'A sport, not a stroll', icon: 'hiking_boot' },
      {
        type: 'p',
        text: 'In most of Europe, autumn leaves are something you notice on the way to work and rake off the lawn on Sunday. In Korea they are a destination. Ten million people visited the national parks in the two leaf months last year, a quarter of the whole year squeezed into eight weeks.',
      },
      {
        type: 'p',
        text: 'The engine behind this is the **산악회 (sanakhoe)**, the hiking club. Every office, church, apartment block and online café seems to have one. The club charters a coach, leaves Seoul before sunrise on Saturday, drives four hours to the mountain of the week, climbs it, and drives back in time for dinner. Multiply by a few thousand clubs.',
      },
      {
        type: 'p',
        text: 'Then there is the outfit. A Korean hiking club at the trailhead looks like a summit expedition: matching shell jackets, two poles each, a hat with a neck flap, a backpack with a hip belt. The trail is mostly wooden stairs. We laughed at this once. Then we saw how fast it gets dark and cold at five o\'clock in November and quietly bought a jacket.',
      },
      {
        type: 'p',
        text: 'At the top, the ritual. First the queue for the summit stone, because a photo with the stone is the proof and the proof is the point. Thirty people in line at Gwanaksan (관악산) on a weekday morning is normal. Then the kimbap comes out, and the cup noodle, and often a bottle of **막걸리 (makgeolli)**, the milky rice wine, because the descent is easier when you are cheerful.',
      },
      {
        type: 'p',
        text: 'The famous mountains have started acting like nightclubs. Naejangsan now puts a guest list on its best section, **790 people a day**, from 19 October to 17 November, and Seoraksan\'s prettiest valley needs a reservation until the end of November. Walk up without one and a ranger turns you around, politely, with the view behind him.',
      },
      { type: 'emoji', name: 'fallen_leaf' },
      { type: 'h', text: 'The yellow version', icon: 'camera' },
      {
        type: 'p',
        text: 'Here is the thing the coach people miss. Seoul\'s best autumn colour is not red and it is not on a mountain. It is the yellow of the **은행나무 (eunhaengnamu)**, the ginkgo, which lines the old streets of the city centre and goes gold about a week before the maples.',
      },
      {
        type: 'p',
        text: 'If you grew up in Europe you may have met one ginkgo in your life, in a botanical garden, with a label. Goethe had one in Weimar and wrote it a love poem. In Seoul it is the street tree. A hundred thousand of them, on ordinary roads, planted like plane trees.',
      },
      {
        type: 'p',
        text: 'It is a strange tree to be so ordinary. The ginkgo is the last survivor of a family that was already old when the dinosaurs arrived; every other relative is a fossil. It has no close living cousins, it is nearly extinct in the wild, and it survived in Chinese and Korean temple gardens for a thousand years before anyone in the West had seen a leaf. Then Korea made it a kerbside tree.',
      },
      {
        type: 'img',
        src: 'deoksugung-autumn.jpg',
        alt: 'Deoksugung palace seen from above in November, its grounds full of yellow ginkgo and red maples against the office towers of central Seoul',
        caption: 'Deoksugung (덕수궁) from above in early November. The yellow is ginkgo, the red is maple, the grey is City Hall.',
        href: 'https://commons.wikimedia.org/wiki/File:%EB%8D%95%EC%88%98%EA%B6%81%EC%9D%98_%EA%B0%80%EC%9D%84.jpg',
        credit: { author: '라성민', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0' },
      },
      {
        type: 'p',
        text: 'The ginkgo has one problem, and every Seoul resident will tell you about it unprompted. The female trees drop a fruit that smells, with no exaggeration, like a dog has been at the pavement. About a quarter of Seoul\'s ginkgo street trees are female.',
      },
      {
        type: 'p',
        text: 'So every September, before the fruit falls, district teams go out with cherry pickers, nets and a machine that grips the trunk and shakes it, and harvest the stink in advance. One district is replacing 115 female trees with males this year. The trees have no say.',
      },
      {
        type: 'list',
        items: [
          '**덕수궁 돌담길 (Deoksugung doldam-gil)**, the lane along the palace wall: the gold tunnel in the photo above, two minutes from City Hall station, flat, free. Best around 10 November.',
          '**삼청동 (Samcheong-dong)** and the lane along Gyeongbokgung (경복궁)\'s east wall: cafés on one side, palace wall on the other, late October to early November.',
          '**북한산 둘레길 (Bukhansan Dulle-gil)**, the trail round the foot of the big mountain: all the colour of the national park, none of the stairs, and it holds a few days longer than the summit.',
          '**남산 (Namsan)**: the lazy one. A paved loop, a cable car, and the leaves stay until mid November.',
        ],
      },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'bukhansan-dulle-gil-1-3',
        text: 'Our Bukhansan Dulle-gil map, sections 1 to 3: the easy forest trail round the park, with the November closure dates and last-entry times in the notes.',
      },
      {
        type: 'p',
        text: 'And if you want the full Korean experience with a guide, Seoul runs a **Hiking Week** from 26 October to 15 November this year, one mountain per week, with free boots and poles for foreign visitors at the Seoul Hiking Tourism Centers. There is a lantern night hike along the old city wall in the last week.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'h', text: 'How to not hate it', icon: 'compass' },
      {
        type: 'list',
        items: [
          'Go on a weekday. The coaches run at weekends. The same trail on a Tuesday is a different mountain.',
          'If it must be a weekend, be walking by eight. Entrances jam after nine at the famous places.',
          'Dress like the clubs, a little. The forest is dark by half past five, and last entry on the mountain trails is **17:00**.',
          'Bukhansan closes some trails from **15 November to 15 December** for fire season. The fine for walking a closed one is up to ₩500,000, which buys a lot of makgeolli (막걸리).',
          'A week of wind and rain can end the show early. If the forecast says storm, go this week, not next.',
        ],
      },
      {
        type: 'verdict',
        text: 'Our verdict: do it once the Korean way, up a mountain, in the queue, with the clubs and the noodles, because the crowd is the show. Then do the ginkgo lanes on a weekday morning. They cost nothing, need no coach, and the photo is probably better.',
      },
    ],
  },
  {
    id: 'why-korea-is-awake-at-midnight',
    title: 'Why is Korea still awake at midnight?',
    description:
      'Hongdae at 1 am looks like a European city at 7 pm. Where the lights, the late restaurants and the all-night shops come from, and why some of it is fading.',
    teaser: 'Europe is in bed, Seoul is ordering chicken.',
    icon: 'night_with_stars',
    date: '2026-10-28',
    updated: '2026-10-28',
    keywords: ['KoreaTravel', 'Seoul', 'Hongdae', 'Sinchon', 'SeoulNightlife', 'Yasik', 'ConvenienceStore', 'KoreaVsEurope', 'KoreaCulture'],
    body: [
      {
        type: 'p',
        text: 'Coming back to Seoul from Europe, the thing that hit us was not the food or the traffic. It was the clock.',
      },
      {
        type: 'p',
        text: 'At 11 pm in **홍대 (Hongdae)** the street is still filling up. People are arriving, not leaving. In **신촌 (Sinchon)** every second sign is lit, and the restaurants are not wiping tables, they are seating.',
      },
      {
        type: 'p',
        text: 'In most European cities we know, 11 pm looks like this: the kitchen closed an hour ago, the tram is half empty, and the only light on the street comes from a kebab shop.',
      },
      {
        type: 'img',
        src: 'hongdae-night.jpg',
        alt: 'A narrow Hongdae street at night, packed with people under bright shop signs and neon',
        caption: 'Hongdae on a Saturday night. This is the quiet end.',
        href: 'https://commons.wikimedia.org/wiki/File:Hongdae_Party_District_at_Night,_Seoul.jpg',
        credit: { author: 'Ken Eckert', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0' },
      },
      { type: 'space' },
      { type: 'h', icon: 'owl', text: '"Dark and silent", said the city' },
      {
        type: 'p',
        text: 'Back in 2014 Seoul published a guide to 58 places that stay open all night. The official who presented it put it bluntly: "Most European cities become dark and silent at night." A city government said that on the record, as a selling point.',
      },
      {
        type: 'p',
        text: 'Twelve years on, it is still the plan. Reports say the city announced a new night-time economy push this August, branding itself a 24-hour city and aiming for 5 trillion won more spent after dark within five years.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'convenience_store', text: 'The machinery behind the lights' },
      {
        type: 'p',
        text: 'Lights need something to shine on. Korea has built a whole set of systems that assume you will be out late.',
      },
      {
        type: 'list',
        items: [
          '[편의점](https://www.google.com/search?tbm=isch&q=%ED%8E%B8%EC%9D%98%EC%A0%90%20%EC%95%BC%EA%B0%84) (pyeonuijeom), convenience stores: about 55,000 nationwide at the last industry count, roughly one for every 950 people, the densest in the world. Most never lock the door.',
          '**야식 (yasik)**, food after 10 pm: a word, not an exception. Delivery apps now run until 5 am, and Coupang Eats reportedly went 24 hours in Seoul and the big cities this year.',
          '[올빼미버스](https://www.google.com/search?tbm=isch&q=%EC%98%AC%EB%B9%BC%EB%AF%B8%EB%B2%84%EC%8A%A4) (olppaemi beoseu), the Owl Bus: 14 night routes for after the last train, which in Seoul leaves around midnight.',
          '**2차 (i-cha)** and **3차 (sam-cha)**, the second and third round: dinner is only the start, then a bar, then karaoke or a [포장마차](https://www.google.com/search?tbm=isch&q=%ED%8F%AC%EC%9E%A5%EB%A7%88%EC%B0%A8) (pojangmacha), a tent bar on the pavement.',
        ],
      },
      {
        type: 'p',
        text: 'City data puts about 342,000 people on the move in Seoul between midnight and 4 am. That is not a party crowd. That is a town.',
      },
      {
        type: 'img',
        src: 'daegu-street-food-night.jpg',
        alt: 'Street food stalls lit up at night on a pavement in Daegu, with customers standing at the counters',
        caption: 'Street food stalls at night near Keimyung University, Daegu. The same scene plays out in every Korean city.',
        href: 'https://commons.wikimedia.org/wiki/File:Street_Food_in_Daegu,_South_Korea.jpg',
        credit: { author: 'Ken Eckert', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0' },
      },
      { type: 'space' },
      { type: 'h', icon: 'sleeping_face', text: 'Why Europe goes to bed' },
      {
        type: 'p',
        text: 'It is not that Europeans dislike fun. The rules are different, and so is the history.',
      },
      {
        type: 'p',
        text: 'In Germany, **Ruhezeit**, the legal quiet time, runs from about 10 pm to 6 am, and all of Sunday. Shops are closed on Sundays by state law. A sign reading **Küchenschluss 22 Uhr**, kitchen closes at ten, is normal, and nobody argues with it.',
      },
      {
        type: 'p',
        text: 'Korea, meanwhile, works long. The average was 1,833 hours a year in 2025, against an OECD average of 1,736. Leave the office at eight, and dinner starts at nine and the evening at ten. Our reading: the Korean night did not come from freedom. It came from the lack of it.',
      },
      {
        type: 'p',
        text: 'Density does the rest. Seoul puts over nine million people in one city, so a food street is never far away. A 2 am kitchen can live on that. A European town of 30,000 cannot feed one.',
      },
      { type: 'space' },
      { type: 'h', icon: 'crescent_moon', text: 'One night, two clocks' },
      {
        type: 'p',
        text: 'Put a Friday in Seoul next to a Friday in a German city and the two days barely overlap.',
      },
      {
        type: 'table',
        head: ['Time', 'Seoul', 'Germany'],
        rows: [
          ['20:00', 'Leaving the office. Dinner starts now.', 'Dinner is over. Tatort is on.'],
          ['22:00', 'Second round. "One more."', 'Küchenschluss. Ruhezeit begins. Shh.'],
          ['00:00', 'Last train. Taxi, or stay?', 'Lights off. The kebab shop glows alone.'],
          ['02:00', 'Chicken and beer, in a 24-hour place or on the sofa.', 'Silence.'],
          ['04:00', 'Clubs still going. Apps still delivering.', 'The baker clocks in.'],
          ['05:30', 'First train. Hangover soup.', 'First tram, same hour, far fewer regrets.'],
        ],
      },
      {
        type: 'p',
        text: 'The soup is **해장국 (haejangguk)**, and whole restaurants exist for the morning after. Both timetables are normal to the people living them. That is the fun of it: nobody in either city thinks they are the strange one.',
      },
      {
        type: 'p',
        text: 'One small aside. Even Koreans say the night is getting shorter, with restaurants trimming hours and pubs closing by the thousand. Hongdae has not got the memo.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'clinking_beer_mugs', text: 'Our verdict' },
      {
        type: 'verdict',
        text: 'Korea is awake at midnight because it built a city that expects you to be. Europe is asleep because it wrote laws to protect the sleep. Both are a choice. Only one of them lets you eat [치맥](https://www.google.com/search?tbm=isch&q=%EC%B9%98%EB%A7%A5) (chimaek), fried chicken with beer, at 2 am without feeling like a criminal.',
      },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'hongdae-hot-places',
        text: 'Walk the Red Road busking street in Hongdae with our map. Best after 7 pm.',
      },
      {
        type: 'p',
        text: 'One practical note. Last trains in Seoul moved half an hour earlier in 2025 on Lines 1 to 8, so check the time in Naver Map before the **2차 (i-cha)**, or keep taxi money aside.',
      },
    ],
  },
  {
    id: 'bugaksan-opens-after-58-years',
    title: '58 years later, the mountain behind the Blue House is open',
    description:
      'The last locked trail on Bugaksan, behind Cheong Wa Dae, opened on 17 October 2026, after 58 years and nine months. What opened and what we could not confirm.',
    teaser: 'It is open round the clock.',
    icon: 'mountain',
    date: '2026-10-27',
    updated: '2026-10-27',
    keywords: ['KoreaTravel', 'Seoul', 'Bugaksan', 'Bukaksan', 'BlueHouse', 'CheongWaDae', 'KoreaTrends', 'Hiking'],
    body: [
      {
        type: 'p',
        text: 'On 17 October the last locked trail on **북악산 (Bugaksan)** opened. The mountain stands right behind **청와대 (Cheong Wa Dae)**, the Blue House, Korea\'s presidential compound. For almost six decades, most of it was off limits to ordinary walkers.',
      },
      {
        type: 'p',
        text: 'It is not a hidden mountain. It is the green peak behind Gyeongbokgung in most photos of the palace. You could photograph it, but you could not climb all of it.',
      },
      {
        type: 'img',
        src: 'bugaksan-folk-museum.jpg',
        alt: 'A green, rocky peak rising behind the tower of the National Folk Museum, with a path and a palace wall in the foreground',
        caption: 'Bugaksan rising behind the National Folk Museum, inside the Gyeongbokgung grounds.',
        href: 'https://commons.wikimedia.org/wiki/File:Bugaksan_and_National_Folk_Museum_of_Korea.jpg',
        credit: { author: 'Tristan Surtel', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0' },
      },
      { type: 'space' },
      { type: 'h', icon: 'hourglass_not_done', text: 'Why it was closed' },
      {
        type: 'p',
        text: 'On 21 January 1968, 31 North Korean commandos tried to reach the Blue House. The raid is known as the **김신조 (Kim Sin-jo)** incident, after one of the men. Afterwards the hills behind the compound were closed for security.',
      },
      {
        type: 'p',
        text: 'By the calendar that is 58 years and about nine months. Korean papers round it up to 59 years.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'door', text: 'It opened one slice at a time' },
      {
        type: 'table',
        head: ['When', 'What opened'],
        rows: [
          ['2007', '4.3 km of the Seoul city wall trail, from Changuimun to Waryong Park'],
          ['2020', '2.2 km of trail on the north side'],
          ['April 2022', '3.0 km on the south-east side'],
          ['17 Oct 2026', 'The last 1.32 km, on the south-west side toward Cheongun-dong'],
        ],
      },
      {
        type: 'p',
        text: 'So the opening was never one big day. It came in four steps, and this one finishes the set.',
      },
      { type: 'space' },
      { type: 'h', icon: 'compass', text: 'What the new 1.32 km is like' },
      {
        type: 'p',
        text: 'It climbs the south-west slope above Cheongun-dong, in Jongno-gu. Most of it follows an old patrol path the soldiers used, so less of the mountain had to be dug up.',
      },
      {
        type: 'p',
        text: 'Four new viewing spots look over Inwangsan, Namsan, the Blue House grounds, Gyeongbokgung and the streets of Seoul.',
      },
      {
        type: 'img',
        src: 'bugaksan-south-trail-bench.jpg',
        alt: 'A wooden bench on a granite rock under pine trees, looking out over a hazy Seoul',
        caption: 'A bench on Bugaksan\'s south trail, opened in 2022 (photo from March 2022). The new south-west section is a different stretch.',
        href: 'https://commons.wikimedia.org/wiki/File:Bukaksan_Mountain_11.jpg',
        credit: { author: 'Republic of Korea (Korean Culture and Information Service)', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0' },
      },
      {
        type: 'p',
        text: 'The Korea Herald describes the start at **Dolgorae Shelter**, the first rest stop on the way up from Changuimun. Then come rocky outcrops and pine groves, and **Manse Dongbang**, a spring beside a rock carved with a wish for the king\'s long life. Further on stands the Jan. 21 Incident Pine, which still has bullet holes from 1968.',
      },
      { type: 'space' },
      { type: 'h', icon: 'flashlight', text: 'Open all night, with guards' },
      {
        type: 'p',
        text: 'The Presidential Security Service says all the trails, the new one included, are open 24 hours a day.',
      },
      {
        type: 'p',
        text: 'It is a strange kind of open. The presidential office moved back to the Blue House, and in March the service chose to keep the mountain open round the clock under what it calls "open security, low-profile security".',
      },
      {
        type: 'p',
        text: 'Expect patrols and cameras. Six information centres (Changuimun, Cheongundae, Gokjang, Sukjeongmun, Malbawi and Samcheong) run daily from 09:00 to 18:00. The area is still a security zone.',
      },
      {
        type: 'p',
        text: 'We could not confirm whether you need to show ID or take a pass at an entrance. Ask at an information centre first.',
      },
      { type: 'space' },
      { type: 'h', icon: 'thinking_face', text: 'Our view' },
      {
        type: 'p',
        text: 'We like it. You could photograph this mountain from Gyeongbokgung for years. Now you can also climb it.',
      },
      {
        type: 'p',
        text: 'What we would watch: "open 24 hours" is a promise from the security service, with a president living next door. Rules at the gates can change, so check on the day.',
      },
      {
        type: 'verdict',
        text: 'Our verdict: worth the climb. Go in daylight, and ask the information centre what is open that day.',
      },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'inwang-mountain-trail',
        text: 'Next door: the Inwangsan trail, one of the mountains you can see from the new viewing spots',
      },
      {
        type: 'p',
        text: 'What we read: the Korea Herald (16 Oct 2026), Seoul Economic Daily (5 Mar and 13 Oct 2026) and Kyunghyang Shinmun (13 Oct 2026).',
      },
    ],
  },
  {
    id: 'kakao-t-for-foreigners',
    title: "The taxi app that won't let tourists in",
    description:
      "In Seoul the street is closed to taxis and the app has a lock. Kakao's side door for foreigners is k.ride: email login, card from abroad. What to know.",
    teaser: 'Your email is enough.',
    icon: 'taxi',
    date: '2026-10-26',
    updated: '2026-10-26',
    keywords: ['KoreaTravel', 'KakaoT', 'Kride', 'Taxi', 'Seoul', 'KoreaApps'],
    body: [
      {
        type: 'p',
        text: 'Picture Seoul at 11 pm. It is raining. The street is full of taxis, and not one of them will stop for you.',
      },
      {
        type: 'p',
        text: 'Some are not even looking. One driver told a Korean news outlet in 2017 that he waits in a side street with his lights off, until the app rings with a passenger heading his way. A passenger he refuses on the street counts against him. A call from the app does not.',
      },
      {
        type: 'p',
        text: 'So the street is closed and the app is the door. We would go further: in Seoul at night, hailing a taxi by hand is close to impossible now. We found no number for street hailing itself, so that is our view, not a statistic.',
      },
      {
        type: 'p',
        text: "What we can back is the shift. A 2020 Seoul Institute survey found 42% of passengers already booked through an app, and in 2021 the city estimated Kakao's share of the app market at nearly 90%.",
      },
      { type: 'space' },
      { type: 'h', icon: 'door', text: 'And the door has a lock' },
      {
        type: 'p',
        text: "The door is **카카오 T (Kakao T)**. It runs on a Kakao account and a Korean phone number, and guides say paying works best with a Korean card. Most tourists have none of the three.",
      },
      {
        type: 'p',
        text: 'Our view: that is Korean online life in one example. Wonderful once you are inside, a locked door from the outside. Banks, delivery, ticketing and taxis all do it.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'mobile_phone', text: 'The side door' },
      {
        type: 'p',
        text: "Kakao quietly built one. It is called **k.ride**, it comes from Kakao Mobility, the same company as Kakao T, and it has been out since 2024. The App Store lists May 2024, Korean press covered the launch on 4 June 2024, and the store page shows an update on 21 October 2026. It is the best-kept secret of a company that is not small.",
      },
      {
        type: 'p',
        text: "If you heard news about a \"new Kakao app for foreigners\", it may be this one, or one of two other stories. This month Kakao Bank opened its services to foreigners. Last November Kakao Pay added a Global Home screen for foreign residents.",
      },
      { type: 'space' },
      { type: 'h', icon: 'compass', text: 'What changes' },
      {
        type: 'table',
        head: ['', 'Kakao T', 'k.ride'],
        rows: [
          ['Sign-up', 'Kakao account and Korean phone verification, as guides describe it', 'Google, Apple or email account'],
          ['Payment', 'Korean cards work best; paying the driver is the fallback', 'Credit cards issued abroad'],
          ['Language', 'Three languages on its App Store page', 'Four (English, Japanese, two Chinese scripts), plus translated destination search and driver chat'],
        ],
      },
      {
        type: 'p',
        text: "It plugs into Kakao T's taxi network in Korea, and it works beyond Korea too: the App Store lists 35 countries, from the US and Germany to Japan and Thailand. The store says chat and search translation covers 133 languages. At launch the company said about 100.",
      },
      { type: 'space' },
      { type: 'h', icon: 'stopwatch', text: 'What it costs' },
      {
        type: 'p',
        text: "Not the same as the meter, and not the same on every car. Kakao's own price page for k.ride lists four types:",
      },
      {
        type: 'list',
        items: [
          '**Standard** (Kakao T Blue partner taxis): the meter fare plus a 10% service fee.',
          '**Deluxe**: the meter fare, a flexible fee of 0 to 5,000 won, and the 10% service fee.',
          '**Comfort** (Kakao T Venti): its own fare, 4,000 won for the first 800 m, a demand multiplier of 0.8 to 4.0, and the 10% fee.',
          '**Luxury** (Kakao T Black): from 6,000 won, a multiplier of 0.7 to 4.0, and the 10% fee.',
        ],
      },
      {
        type: 'p',
        text: "So the cheapest way in is Standard, and it costs the meter plus 10%. Kakao says the service fee can change with demand and traffic. One 2026 travel guide warns that the app can default to a pricier type, so check which car is selected before you confirm. That tip is from a blog, not Kakao.",
      },
      {
        type: 'p',
        text: "Is that dearer than Kakao T for Koreans? Probably about the same on a short ride and more on a long one. Reports from 2021 put Kakao T's fees at up to 3,000 won for a Blue call and 1,000 won (2,000 at night) for a smart call, while a regular call had none. Ten percent of a 10,000 won ride is 1,000 won, and it only passes 3,000 won when the meter is above 30,000 won. Those 2021 figures may have changed, and we found no current Kakao T fee page, so check the estimate in the app.",
      },
      {
        type: 'p',
        text: 'And set it up before you land. Add your card and language on hotel Wi-Fi, not on the pavement at 11 pm.',
      },
      {
        type: 'verdict',
        text: 'Install [k.ride](https://apps.apple.com/us/app/k-ride-taxi-cab-travel/id6474654222) on the plane. Add your card at the hotel. Then, when it rains at 11 pm and the taxis go dark, be the smug one.',
      },
    ],
  },
  {
    id: 'bukangi-the-shark-of-busan',
    title: 'A shark moved into a Busan park canal',
    description:
      'A 3 m dusky shark swam into a canal in a Busan park, got a nickname, an honorary job, trademark filings and 1.5 million visits. What we know so far.',
    teaser: 'Would you have gone to look?',
    icon: 'shark',
    date: '2026-10-25',
    updated: '2026-10-25',
    keywords: ['KoreaTravel', 'Busan', 'Bukangi', 'Shark', 'KoreaTrends', 'Bukhang'],
    body: [
      {
        type: 'p',
        text: 'On 18 September, somebody spotted a shark in a canal. Not in an aquarium. In a landscaped waterway in a city park, a short walk from Busan Station.',
      },
      {
        type: 'p',
        text: 'Within a month it had a nickname, an honorary city job, a pile of trademark filings and over a million visitors. Meet **부캉이 (bukang-i)**.',
      },
      { type: 'space' },
      { type: 'h', icon: 'shark', text: 'Who is 부캉이 (bukang-i)?' },
      {
        type: 'p',
        text: 'The name is a pun on a place. The park sits at Busan\'s North Port, **북항 (Bukhang)**. Say 북항이 (bukhang-i), "the one from Bukhang", quickly and it comes out as 부캉이 (bukang-i).',
      },
      {
        type: 'p',
        text: 'A fact-check in Kyunghyang Weekly says the park\'s operator coined it and used it in its social posts. The same piece had to swat down an online claim that the name was a plot to make North Korea sound friendly, a play on 북한 (Bukhan). It found no evidence for that.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'thinking_face', text: 'A guess, then a correction' },
      {
        type: 'img',
        src: 'dusky-shark-noaa.jpg',
        alt: 'A small grey-brown shark held across the deck of a boat by a researcher in an orange life vest and white glove',
        caption: 'A young dusky shark held by a NOAA researcher. 부캉이 (bukang-i) is about 3 m long, far bigger than this one.',
        href: 'https://commons.wikimedia.org/wiki/File:Carcharhinus_obscurus_noaa.jpg',
        credit: { author: 'NOAA', license: 'Public domain', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/' },
      },
      {
        type: 'p',
        text: 'At first it was called a **무태상어 (mutae-sangeo)**, a sandbar shark. On 6 October the National Institute of Fisheries Science corrected that: a female **흑상어 (heuk-sangeo)**, a dusky shark, about 3 m long.',
      },
      {
        type: 'p',
        text: 'The clue was a ridge of skin between the two back fins. The sandbar shark has no such ridge.',
      },
      {
        type: 'p',
        text: 'Dusky sharks are listed as Endangered by the IUCN. They grow slowly, breed slowly, and can reach about 4.2 m.',
      },
      { type: 'space' },
      { type: 'h', icon: 'stopwatch', text: 'How the month went' },
      {
        type: 'table',
        head: ['Date', 'What happened'],
        rows: [
          ['18 Sep', 'Spotted in the canal'],
          ['29 Sep', 'First guided release attempt; named honorary city ambassador'],
          ['2 to 3 Oct', 'A net snags on the canal bottom and the shark swims over it'],
          ['6 Oct', 'Identified as a dusky shark'],
          ['21 Oct', 'Third attempt, with divers: it leaves the canal'],
          ['24 Oct', 'Found about 2 km away, in good health'],
        ],
      },
      { type: 'space' },
      { type: 'h', icon: 'sparkles', text: 'Why a million people came' },
      {
        type: 'p',
        text: 'Before the shark, the park saw about 2,000 visitors on an average weekend, reports say. Then came Chuseok, the harvest holiday.',
      },
      {
        type: 'p',
        text: 'On 25 September about 136,000 people came in one day. The park passed one million visits on 5 October, and by 20 October the count was 1.54 million.',
      },
      {
        type: 'p',
        text: 'It is free, it is next to a station, and it is a real wild animal where nobody expected one. A student at Pukyong National University even built a "where is Bukangi now" page where people post sightings.',
      },
      { type: 'space' },
      { type: 'h', icon: 'flashlight', text: 'Fans and flashlights' },
      {
        type: 'p',
        text: 'The fun has a limit. On 7 October the fisheries institute reported a scrape near the shark\'s snout. It said bright lights shone at night make the shark swerve suddenly, and asked visitors to stop.',
      },
      {
        type: 'p',
        text: 'Experts also said they could not confirm it was feeding, and the water was cooling. That is why the city pushed to guide it out.',
      },
      {
        type: 'p',
        text: 'Our view: a shark in a dead-end canal is a lost animal, not an attraction. If you are European, think of the whale that swam up the Thames in 2006. Same crowds on the bank, same urge to look at something that should not be there.',
      },
      { type: 'space' },
      { type: 'h', icon: 'ribbon', text: 'Ambassadors and trademarks' },
      {
        type: 'p',
        text: 'On 29 September Busan named the shark an honorary PR ambassador, after an Instagram poll where 91% of over 8,000 voters said yes. The city now uses it in its social and YouTube posts.',
      },
      {
        type: 'p',
        text: 'The merch rush was faster. The Seoul Shinmun reports five trademark applications from 21 September, three days after the sighting, covering about 40 products such as keyrings, clothes and plush toys.',
      },
      {
        type: 'p',
        text: 'Busan said it would file its own in October and respond to the private filings, so that no single party owns a name the whole city used. A filing alone grants nothing; the examiners decide. We side with the city here.',
      },
      { type: 'space' },
      { type: 'h', icon: 'water_wave', text: 'Where is it now?' },
      {
        type: 'p',
        text: 'On 21 October the third rescue attempt worked and the shark swam out of the canal. On 25 October it was reported healthy about 2 km away, near the Busan Port International Passenger Terminal, not yet in open sea.',
      },
      {
        type: 'p',
        text: 'That will be out of date soon. For the current position, try the fan-made site [부캉스 (bukang-seu)](https://boocance.vercel.app/), which maps sightings sent in by visitors. It is not an official tracker. Busan City\'s live broadcast from 29 September is [still on YouTube](https://youtu.be/61LTo2BjNyE).',
      },
      {
        type: 'verdict',
        text: 'The best ending for 부캉이 (bukang-i) is a boring one: back in the open sea, unwatched. The crowds were fun while they lasted, but a wild shark is a visitor that lost its way, not a show.',
      },
    ],
  },
  {
    id: 'korean-sauna-stone-oven-for-humans',
    title: 'The Korean sauna is a stone oven for humans',
    description:
      "Korea's traditional sauna started as a stone dome fired with pine logs. Where the kiln came from, how it works, and how to sweat without cooking yourself.",
    teaser: 'Would you climb into one?',
    icon: 'hot_springs',
    date: '2026-10-25',
    updated: '2026-10-25',
    keywords: ['KoreaTravel', 'Jjimjilbang', 'KoreanSauna', 'Hanjeungmak', 'Seoul'],
    body: [
      {
        type: 'p',
        text: 'Here is a Korean pastime that sounds like a threat. You pay a small fee, walk into a stone dome that was heated by burning logs, and sit there until you have had enough.',
      },
      {
        type: 'p',
        text: 'We call it **a stone oven for humans**. Nobody gets baked, but the idea is not far off.',
      },
      { type: 'space' },
      { type: 'h', icon: 'fire', text: 'How the oven works' },
      {
        type: 'img',
        src: 'jjimjilbang-bulgama.jpg',
        alt: 'A tiled hall in a jjimjilbang with a large dome painted with a farming scene on the right and arched stone doorways on the left',
        caption: 'A kiln room in a modern jjimjilbang: the painted dome on the right.',
        href: 'https://commons.wikimedia.org/wiki/File:2020-03-11_20.39.31_%EC%B0%9C%EC%A7%88%EB%B0%A9_%EB%B6%88%EA%B0%80%EB%A7%88.jpg',
        credit: { author: 'Choikwangmo9', license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
      },
      {
        type: 'p',
        text: 'The old kind is called 한증막 (hanjeungmak). It is a dome of stone, heated by burning pine wood inside it.',
      },
      {
        type: 'p',
        text: 'The order matters. One hanjeungmak on Mount Palgong told a newspaper in 2012 that it burns pine logs for about three hours, lets the heat settle, rakes the ash out, and only then opens the door.',
      },
      {
        type: 'p',
        text: 'A women\'s sweat lodge on Ganghwa Island, visited in 2014, worked the same way. Fire first, and once it had burned out, people crawled in and sat on green pine twigs. So it is a wood-fired oven, and you are the pizza.',
      },
      { type: 'ad', slot: 'inArticle' },
      { type: 'space' },
      { type: 'h', icon: 'hourglass_not_done', text: 'Older than it looks' },
      {
        type: 'p',
        text: 'Reports say the first record of the **한증소 (hanjeungso)**, the early kiln sauna, is in the Annals of Sejong in the 15th century. It was medicine, supported by the state and run by Buddhist monks, and men and women got separate buildings from 1429.',
      },
      {
        type: 'p',
        text: 'So sweating as a cure is no new wellness trend. It was already state business about 600 years ago.',
      },
      { type: 'space' },
      { type: 'h', icon: 'sparkles', text: 'Then came the jjimjilbang' },
      {
        type: 'p',
        text: 'Today the kiln lives inside the **찜질방 (jjimjilbang)**, the Korean bathhouse that boomed in the 1990s. The hanjeungmak was folded into it, and the hot version is called a 불가마 (bulgama), the fire kiln.',
      },
      {
        type: 'p',
        text: 'A jjimjilbang has two halves. The baths are same-gender and nude. Everything else is shared: you wear the T-shirt and shorts from the front desk and walk between hot rooms, salt rooms, ice rooms, a snack bar and a sleeping floor.',
      },
      {
        type: 'p',
        text: 'If you know a German sauna, expect a different mood. There it is nude and mixed, and people go to be quiet. Here the hot rooms are a place to hang out, with families and friends together on the floor.',
      },
      { type: 'space' },
      { type: 'h', icon: 'hot_face', text: 'The charcoal kiln' },
      {
        type: 'p',
        text: 'The wildest version is the **숯가마 (sutgama)**, the charcoal kiln. Makers fire a clay kiln for days to turn wood into charcoal, and the leftover heat becomes a sauna.',
      },
      {
        type: 'p',
        text: 'A 2012 newspaper report described the inside of such a kiln at 150 to 300 °C. Its advice for beginners: 30 seconds in, 30 seconds out, then a little longer each round. About 30 minutes of heat in total, spread over two hours.',
      },
      {
        type: 'p',
        text: 'We have one on our map. 숲속한방랜드 (Supsok Hanbang-raendeu), or Forest Herbal Land, sits in the woods near Sinchon with its charcoal kilns outdoors. Write-ups from 2025 describe low, middle and high kilns and advise beginners to start in the middle.',
      },
      {
        type: 'route',
        cityId: 'seoul',
        pathId: 'indoors-trip',
        text: 'Forest Herbal Land is pinned on our Indoors Trip map, with the museums and the Magok greenhouse.',
      },
      { type: 'space' },
      { type: 'h', icon: 'roasted_sweet_potato', text: 'Sweet potatoes and sleepy cats' },
      {
        type: 'photo',
        src: 'jjimjilbang-yard-night.jpg',
        alt: 'A dim kiln yard at night: a wooden platform with towels and a black-and-white cat sitting on a red mat, a charcoal brazier on the right and a TV on the wall',
        caption: 'The kiln yard at night: a wooden platform to rest on, a charcoal brazier, and a cat on a red mat.',
      },
      {
        type: 'p',
        text: 'The best part was outside. Next to the kilns there was a charcoal brazier, and I ate a **군고구마 (gungogu-ma)**, a sweet potato roasted on it.',
      },
      {
        type: 'photo',
        src: 'jjimjilbang-sweet-potatoes.jpg',
        alt: 'Sweet potatoes wrapped in foil on a grill over glowing red charcoal',
        caption: 'Sweet potatoes roasting in foil over the coals.',
      },
      {
        type: 'p',
        text: 'The yard has other regulars: cats. They roam around there, and the reason is easy to guess. It is warm.',
      },
      {
        type: 'photo',
        src: 'jjimjilbang-cat.jpg',
        alt: 'A black-and-white cat on a wooden bench pressing its chin into an open hand',
        caption: "One of the yard's cats, enjoying a scratch under the chin.",
      },
      { type: 'space' },
      { type: 'h', icon: 'stopwatch', text: 'Do not cook yourself' },
      {
        type: 'p',
        text: 'The boring part matters. A Hallym University professor, quoted in a 2001 Seoul Shinmun article, said not to stay in the heat for more than 10 minutes at a time.',
      },
      {
        type: 'p',
        text: 'The same article says the pulse can reach 160 to 170 after about five minutes, which is a sprint, sitting down. It tells people with high blood pressure, diabetes, severe obesity or chest pain to skip it, and so anyone hungry, stuffed or within two hours of a drink.',
      },
      {
        type: 'p',
        text: 'And the far-infrared sales pitch? The professor said those rays reach only 1 to 2 cm into the body, and no sauna could show a measurement. It is one old article, so be sceptical, not certain. We would enjoy the heat and skip the miracle claims.',
      },
      { type: 'space' },
      { type: 'h', icon: 'egg', text: 'What to eat' },
      {
        type: 'p',
        text: 'The classic snack-bar order is [맥반석 계란](https://www.google.com/search?tbm=isch&q=%EB%A7%A5%EB%B0%98%EC%84%9D+%EA%B3%84%EB%9E%80) (maekbanseok gyeran), eggs baked until the shells turn brown, with a cold cup of [식혜](https://www.google.com/search?tbm=isch&q=%EC%8B%9D%ED%98%9C) (sikhye), a sweet rice punch.',
      },
      { type: 'space' },
      { type: 'h', icon: 'door', text: 'Your first visit' },
      {
        type: 'list',
        items: [
          'Shoes go in a locker at the entrance. Its key gets you the key to your clothes locker.',
          'Shower first, then the bath. The wet area is same-gender and nude.',
          'Drink water between rounds, and step out when you feel dizzy.',
        ],
      },
      {
        type: 'verdict',
        text: 'Go once, on a cold evening. Short rounds, plenty of water, and ignore the miracle claims. You will leave warm, a bit silly and very hungry.',
      },
    ],
  },
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
