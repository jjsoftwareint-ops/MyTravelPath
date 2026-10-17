# My Travel Path

**Live site: https://jjsoftwareint-ops.github.io/MyTravelPath/** — free, curated walking routes for
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

The build uses a relative base path and hash routing, so `dist/` can be hosted
on any static host (GitHub Pages, Netlify, etc.) without extra configuration.

## Deploy (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. One-time setup in the repo:
**Settings → Pages → Source → "GitHub Actions"**.

Site URL: https://jjsoftwareint-ops.github.io/MyTravelPath/

## Analytics

Page views and visitor countries are counted with
[GoatCounter](https://www.goatcounter.com), which is free for personal sites
and sets no cookies, so no consent banner is needed. To turn it on:

1. Sign up at https://www.goatcounter.com/signup and choose a site code,
   e.g. `mytravelpath`. Your dashboard is then `https://mytravelpath.goatcounter.com`.
2. Put that code in `GOATCOUNTER_SITE` in `src/components/Analytics.tsx` and push.

Each route is reported as its own path (`/`, `/seoul`, `/seoul/hanok-villages`).
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
- Incheon China Town path banner: *Chinatown, incheon 20230430 002* (the 1st Paeru gate),
  Mobius6, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Chinatown,_incheon_20230430_002.jpg
- Hongdae Hot Places path banner: *Hongdae Party District at Night, Seoul*, Ken Eckert,
  CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Hongdae_Party_District_at_Night,_Seoul.jpg
- Cherry Blossom walk banners (Seoul and Busan): *Cherry Blossom in Yeouido Park - panoramio (1)*, Alexey
  Komarov, CC BY 3.0.
  https://commons.wikimedia.org/wiki/File:Cherry_Blossom_in_Yeouido_Park_-_panoramio_(1).jpg
- Naksan Park path banner: *서울 한양도성 … 낙산야경1-1*, Seoul Metropolitan Fire &
  Disaster Headquarters (서울특별시 소방재난본부), CC BY-SA 4.0.
  https://commons.wikimedia.org/wiki/File:%EC%84%9C%EC%9A%B8_%ED%95%9C%EC%96%91%EB%8F%84%EC%84%B1(%EC%84%9C%EC%9A%B8_%E6%BC%A2%E9%99%BD%E9%83%BD%E5%9F%8E,_Fortress_Wall_of_Seoul)_2011%EB%85%84_11%EC%9B%94_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C_%EB%AA%85%EC%86%8C_(Seoul_best_attractions)_%EC%82%AC%EB%B3%B8_-%EB%82%99%EC%82%B0%EC%95%BC%EA%B2%BD1-1.jpg

The home-header mark is the FontAwesome rolling suitcase with `kr.svg` from
HatScripts [circle-flags](https://github.com/HatScripts/circle-flags) (MIT).

The app icon and favicon are the project's own artwork.
Tag icons are from FontAwesome (CC BY 4.0), Game Icons (CC BY 3.0) and Lucide (ISC),
the path notice icon from IcoMoon Free (CC BY 4.0), the home announcement icon from
Grommet Icons (Apache 2.0) and the light/dark toggle from Ionicons (MIT), all via the
react-icons package.
