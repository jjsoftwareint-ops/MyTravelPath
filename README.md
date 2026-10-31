# My Travel Path

**Live site: https://koreatravelpath.com/** — free, curated walking routes for
travellers in Korea (Seoul, Busan, Jeju, Incheon). Each path opens in Google My Maps, with a Naver Map link
for every stop so navigation works on the ground. No sign-up, no app to install.

A tiny mobile-first website listing cities → walking paths,
each linking to a Google My Maps route. No backend; all data lives in one file.

## Run locally

```bash
npm install
npm run dev
```

## Add a city or path

Edit `src/data/travel.ts`. Every entry needs a unique `id` (used in the URL).
Paste your Google My Maps share link into `mapUrl`.

```ts
{
  id: 'seoul-night-walk',
  name: 'Seoul Night Walk',
  description: 'Cheonggyecheon → Gwangjang Market → DDP',
  duration: '3h',
  mapUrl: 'https://www.google.com/maps/d/viewer?mid=...',
}
```

## Build

```bash
npm run build   # output in dist/
```

The build runs three steps: the normal Vite client build, a Vite SSR build of
`src/entry-server.tsx` into the temporary `dist-ssr/`, and `scripts/prerender.mjs`,
which renders every route (home, About/Contact/Privacy/Imprint, each city, each
path) into its own `dist/<route>/index.html` with the full page HTML, per-page
`<title>`, description, canonical, Open Graph tags and JSON-LD. It also writes
`dist/sitemap.xml` from the data (`updated` becomes `lastmod`) and `dist/404.html`.
Pages use real URLs (`/seoul/hanok-villages/`); old `/#/…` links are redirected
by a small script in `index.html`. All head data lives in `src/seo.ts`.

## Deploy (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. One-time setup in the repo:
**Settings → Pages → Source → "GitHub Actions"**.

Site URL: https://koreatravelpath.com/

## Analytics

Page views and visitor countries are counted with
[GoatCounter](https://www.goatcounter.com), which is free for personal sites
and sets no cookies, so no consent banner is needed. To turn it on:

1. Sign up at https://www.goatcounter.com/signup and choose a site code,
   e.g. `mytravelpath`. Your dashboard is then `https://mytravelpath.goatcounter.com`.
2. Put that code in `GOATCOUNTER_SITE` in `src/components/Analytics.tsx` and push.

Each route is reported as its own path (`/`, `/seoul`, `/seoul/hanok-villages`), without a trailing slash.
Nothing is sent while running locally or while the site code is empty.

## Credits

Photos are from Wikimedia Commons: the Seoul and Busan cards under the Korea Open
Government License (KOGL) Type 1, the Jeju card under CC BY-SA 4.0, the Incheon card public domain, the path banners under CC BY 3.0, CC BY-SA 4.0 or CC0.
All allow free use; the credit is given in every case.

- Seoul card photo: *Downtown Seoul from Inwangsan in 2023*,
  Seoul Tourism Organization.
  https://commons.wikimedia.org/wiki/File:Downtown_Seoul_from_Inwangsan_in_2023.jpg
- Busan card photo: *Busan City Haeundae Beach KOGL (01)*, Busan Metropolitan
  City (부산광역시).
  https://commons.wikimedia.org/wiki/File:Busan_City_Haeundae_Beach_KOGL_(01).jpg
- Haebangchon path banner (Sinheung Market): *Haebangchon (55192248983)*, Lee Jeong
  Woo (이정우) / Ministry of Culture, Sports and Tourism, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Haebangchon_(55192248983).jpg
- Hanok Villages path banner: *Bukchon Hanok Village 01*, Bgag, CC0.
  https://commons.wikimedia.org/wiki/File:Bukchon_Hanok_Village_01.jpg
- Inwang Mountain Trail path banner: *Seoul Fortress Wall, Inwangsan.3*, Rtflakfizer,
  CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Seoul_Fortress_Wall,_Inwangsan.3.jpg
- Jeju card photo: *Jeju Olle Route 8* (Jusangjeolli basalt columns), Jeju Olle
  Foundation, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Jeju_Olle_Route_8.jpg
- Jeju Olle Trail path banner: *Jeju Olle Route 1-1 03*, Jeju Olle Foundation,
  CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Jeju_Olle_Route_1-1_03.jpg
- Incheon card photo: *Incheon Grand Bridge*, Cameron Henderson, public domain.
  https://commons.wikimedia.org/wiki/File:Incheon_Grand_Bridge.jpg
- Suwon with Hwaseong Fortress path banner: *방화수류정 Banghwa Suryu Pavilion, Hwaseong Fortress*, 김병모, CC0,
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:%EB%B0%A9%ED%99%94%EC%88%98%EB%A5%98%EC%A0%95_Banghwa_Suryu_Pavilion,_Hwaseong_Fortress.jpg).
- Gyeonggi-do card photo: *Gapyeong-eup, Gapyeong-gun, Gyeonggi-do*, Korea Tourism Organization,
  KOGL Type 1. https://commons.wikimedia.org/wiki/File:Gapyeong-eup,_Gapyeong-gun,_Gyeonggi-do.jpg
- Ganghwa-do path banner: *분오리돈대* (Bunori Dondae), HyeonChangu, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:%EB%B6%84%EC%98%A4%EB%A6%AC%EB%8F%88%EB%8C%80.jpg
- Incheon China Town path banner: *Chinatown, incheon 20230430 002* (the 1st Paeru gate),
  Mobius6, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Chinatown,_incheon_20230430_002.jpg
- Hongdae Hot Places path banner: *Hongdae Party District at Night, Seoul*, Ken Eckert,
  CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Hongdae_Party_District_at_Night,_Seoul.jpg
- Gangnam Night Streets path banner: *20150209-20150214강남대로C300* (Gangnam-daero at night, by Gangnam
  Station), 최광모, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:20150209-20150214강남대로C300.jpg
- Cherry Blossom walk banners (Seoul and Busan): *Cherry Blossom in Yeouido Park - panoramio (1)*, Alexey
  Komarov, CC BY 3.0.
  https://commons.wikimedia.org/wiki/File:Cherry_Blossom_in_Yeouido_Park_-_panoramio_(1).jpg
- Abroad in Korea path banner: *German Village in Namhae* (photo by Choi2451), CC0.
  https://commons.wikimedia.org/wiki/File:View_of_German_Village_in_Namhae,_South_Korea.jpg
- K-Drama shooting spots path banner: *Mungyeong Saejae Open Film Set* (photo by Choi2451), CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Mungyeong_Saejae_Open_Film_Set.jpg
- Wolmido Sunset path banner: *Sunset over Incheon Harbor* (looking west from Wolmido), JNicol, CC BY-SA 3.0.
  https://commons.wikimedia.org/wiki/File:Sunset_over_Incheon_Harbor.jpg
- Gapyeong path banner: *0012-10-12 (2024-11-12) Gapyeong - Chuncheon* (autumn maples by the river on Nami Island),
  Katsujiro Maekawa, CC0.
  https://commons.wikimedia.org/wiki/File:0012-10-12_(2024-11-12)_*Gapyeong_-_Chuncheon_*Gyeonggi_-_Gangwon.jpg
- Paju path banner: *Imjingak pyunghwanuri* (the windmill hill of Pyeonghwa Nuri park at Imjingak),
  한국문화관광연구원 (Korea Culture & Tourism Institute), CC0.
  https://commons.wikimedia.org/wiki/File:Imjingak_pyunghwanuri.jpg
- BTS Army Tour path banner: *BTS 'Spring Day' bus stop* (the rebuilt bus stop on Hyangho Beach, Jumunjin),
  Real SLOW TV-The sound of nature (YouTube frame), CC BY 3.0.
  https://commons.wikimedia.org/wiki/File:BTS_%27Spring_Day%27_bus_stop.jpg
- Bukhansan Dulle-gil path banner: *Korea Bukhansan Mountain 20140731 13*, Korea.net / Korean Culture and
  Information Service, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Korea_Bukhansan_Mountain_20140731_13_(14822171914).jpg
- Haeundae Coast path banner: *Sky Capsule train at Haeundae Blueline Park, Busan*, VN.NguyenDucDuy, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Sky_Capsule_train_at_Haeundae_Blueline_Park,_Busan.jpg
- Busan Culture Villages path banner: *Colorful houses in Gamcheon Culture Village at sunset in Busan South Korea*,
  Basile Morin, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg
- Jeju Olle 18-1 (Chuja) path banner: *Jeju Olle Route 18-1*, Jeju Olle Foundation, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Jeju_Olle_Route_18-1.jpg
- Jeju Olle 17 path banner: *Jejuolle-route-17(4)*, Jeju Olle Foundation, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Jejuolle-route-17(4).jpg
- Jeju Olle 1 and 1-1 (Udo) path banner: *Udo, Jeju Province, South Korea 02*, Jeju Film Commission (제주영상문화산업진흥원),
  KOGL Type 1. https://commons.wikimedia.org/wiki/File:Udo,_Jeju_Province,_South_Korea_02.jpg
- Seongsu-dong path banner: *Seongsu-dong storefronts*, CartoonChess, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Seongsu-dong_storefronts.jpg
- Indoors Trip path banner: *Seoul botanic park 05* (the greenhouse), Korea.net / Korean Culture and
  Information Service, CC BY-SA 2.0. https://commons.wikimedia.org/wiki/File:Seoul_botanic_park_05.jpg
- Naksan Park path banner: *서울 한양도성 … 낙산야경1-1*, Seoul Metropolitan Fire &
  Disaster Headquarters (서울특별시 소방재난본부), CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:%EC%84%9C%EC%9A%B8_%ED%95%9C%EC%96%91%EB%8F%84%EC%84%B1(%EC%84%9C%EC%9A%B8_%E6%BC%A2%E9%99%BD%E9%83%BD%E5%9F%8E,_Fortress_Wall_of_Seoul)_2011%EB%85%84_11%EC%9B%94_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C_%EB%AA%85%EC%86%8C_(Seoul_best_attractions)_%EC%82%AC%EB%B3%B8_-%EB%82%99%EC%82%B0%EC%95%BC%EA%B2%BD1-1.jpg
- Gangwon-do card photo: *Jeongdongjin Beach* (sunrise over the beach, Sun Cruise hotel on the cliff), Loewelad,
  CC BY-SA 3.0. https://commons.wikimedia.org/wiki/File:Jeongdongjin_Beach.jpg
- Sokcho path banner: *Pedestrian bridge at Daepo Port 02*, Bernard Gagnon, CC0.
  https://commons.wikimedia.org/wiki/File:Pedestrian_bridge_at_Daepo_Port_02.jpg

- Blog, Danpung-nori post: *내장산의 단풍1* (Naejangsan pavilion in autumn), Shunshan Piao, CC BY-SA 3.0.
  https://commons.wikimedia.org/wiki/File:%EB%82%B4%EC%9E%A5%EC%82%B0%EC%9D%98_%EB%8B%A8%ED%92%8D1.jpg
- Blog, Danpung-nori post: *덕수궁의 가을* (Deoksugung in autumn, from above), 라성민, CC BY-SA 3.0.
  https://commons.wikimedia.org/wiki/File:%EB%8D%95%EC%88%98%EA%B6%81%EC%9D%98_%EA%B0%80%EC%9D%84.jpg

- Blog, zombie bus post: *Seoul Tiger Open Top Bus* (the Tiger Bus in front of City Hall), Minseong Kim, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Seoul_Tiger_Open_Top_Bus.jpg

- Blog, Naminara Republic post: *0012-10-12 (2024-11-12) Gapyeong - Chuncheon* (same autumn photo as the
  Gapyeong path banner, reused), Katsujiro Maekawa, CC0.
  https://commons.wikimedia.org/wiki/File:0012-10-12_(2024-11-12)_*Gapyeong_-_Chuncheon_*Gyeonggi_-_Gangwon.jpg
- Blog, Naminara Republic post: *Gapyeong-Nami Island Ferry* (the ferry pier flags), Minseong Kim, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:Gapyeong-Nami_Island_Ferry.jpg
- Blog, Naminara Republic post: *남이섬 (36)* (the cenotaph built for General Nami), Jocelyndurrey, CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:%EB%82%A8%EC%9D%B4%EC%84%AC_(36).JPG

- Blog, Patrick Stewart obituary post: *Patrick Stewart (7268383816)* (receiving a Peabody Award from
  director Horace Newcomb, May 2012), Anders Krusberg / Peabody Awards, CC BY 2.0.
  https://commons.wikimedia.org/wiki/File:Patrick_Stewart_(7268383816).jpg

The app icon, favicon and home-header mark are the project's own artwork (a suitcase with a
Korean flag tag among cherry blossoms).
Tag icons are from FontAwesome (CC BY 4.0), Game Icons (CC BY 3.0) and Lucide (ISC),
the path notice icon from IcoMoon Free (CC BY 4.0), the home announcement icon from
Grommet Icons (Apache 2.0) and the light/dark toggle from Ionicons (MIT), all via the
react-icons package.
