# My Travel Path

A tiny mobile-first website listing travel countries → cities → walking paths,
each linking to a Google My Maps route. No backend; all data lives in one file.

## Run locally

```bash
npm install
npm run dev
```

## Add a country, city or path

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

## Credits

Home banner photo: *Downtown Seoul from Inwangsan in 2023* by the Seoul
Tourism Organization, via Wikimedia Commons, Korea Open Government License
(KOGL) Type 1. https://commons.wikimedia.org/wiki/File:Downtown_Seoul_from_Inwangsan_in_2023.jpg
