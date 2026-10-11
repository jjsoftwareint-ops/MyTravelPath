# My Travel Path

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

Photos are from Wikimedia Commons under the Korea Open Government License
(KOGL) Type 1, which allows free use with a source credit.

- Seoul card photo: *Downtown Seoul from Inwangsan in 2023*,
  Seoul Tourism Organization.
  https://commons.wikimedia.org/wiki/File:Downtown_Seoul_from_Inwangsan_in_2023.jpg
- Busan card photo: *Busan City Haeundae Beach KOGL (01)*, Busan Metropolitan
  City (부산광역시).
  https://commons.wikimedia.org/wiki/File:Busan_City_Haeundae_Beach_KOGL_(01).jpg

The app icon and favicon are the project's own artwork.
Tag icons are from FontAwesome (CC BY 4.0) and Game Icons (CC BY 3.0), and the
notice icon from IcoMoon Free (CC BY 4.0) and the light/dark toggle from
Ionicons (MIT), all via the react-icons package.
