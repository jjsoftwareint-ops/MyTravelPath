// ─────────────────────────────────────────────────────────────
// Edit this file to add your own countries, cities and paths.
// Each path's `mapUrl` is a Google My Maps share link, e.g.
//   https://www.google.com/maps/d/viewer?mid=XXXXXXXX
// ─────────────────────────────────────────────────────────────

export type TravelPath = {
  id: string
  name: string
  description?: string
  duration?: string // e.g. "2h", "Half day"
  tags?: string[] // e.g. ["🌙 Night walk"], shown as pills under the title
  mapUrl: string
}

export type City = {
  id: string
  name: string
  paths: TravelPath[]
}

export type Country = {
  id: string
  name: string
  flag: string
  cities: City[]
}

export const countries: Country[] = [
  {
    id: 'korea',
    name: 'South Korea',
    flag: '🇰🇷',
    cities: [
      {
        id: 'seoul',
        name: 'Seoul',
        paths: [
          {
            id: 'naksan-cheonggyecheon',
            name: 'Naksan Park and Cheonggyecheon',
            description: 'Naksan Park fortress wall at dusk, then down to the Cheonggyecheon stream lights.',
            duration: '3h',
            tags: ['🌙 Night walk'],
            mapUrl: 'https://www.google.com/maps/d/viewer?mid=1w8F-eVqm5RpMFykhZ3HQUrb9TydjQV8',
          },
          {
            id: 'bukchon-hanok',
            name: 'Bukchon Hanok Village Walk',
            description: 'Traditional houses, Samcheong-dong cafés, Gyeongbokgung views.',
            duration: '2h',
            mapUrl: 'https://www.google.com/maps/d/viewer?mid=REPLACE_ME',
          },
          {
            id: 'inwang-mountain-trail',
            name: 'Inwang Mountain Trail',
            description: 'Seoul fortress wall climb with views over Gyeongbokgung and the whole city.',
            duration: '2.5h',
            mapUrl: 'https://www.google.com/maps/d/viewer?mid=1JPHJVSHobZnrwTiCPU8KQt-3SUX3Wqg',
          },
        ],
      },
      {
        id: 'busan',
        name: 'Busan',
        paths: [
          {
            id: 'haeundae-coast',
            name: 'Haeundae Coastal Path',
            description: 'Beach → Dongbaek Island → Blueline Park sky capsule.',
            duration: 'Half day',
            mapUrl: 'https://www.google.com/maps/d/viewer?mid=REPLACE_ME',
          },
        ],
      },
    ],
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    cities: [
      {
        id: 'berlin',
        name: 'Berlin',
        paths: [
          {
            id: 'berlin-wall-trail',
            name: 'Berlin Wall Memorial Trail',
            description: 'Bernauer Straße memorial → Mauerpark → Prenzlauer Berg.',
            duration: '2.5h',
            mapUrl: 'https://www.google.com/maps/d/viewer?mid=REPLACE_ME',
          },
        ],
      },
    ],
  },
]

// ── Lookup helpers ───────────────────────────────────────────
export const findCountry = (countryId?: string) =>
  countries.find((c) => c.id === countryId)

export const findCity = (countryId?: string, cityId?: string) =>
  findCountry(countryId)?.cities.find((c) => c.id === cityId)

// Google My Maps share links and embed links share the same `mid` id, so the
// embed URL can be derived instead of stored twice.
export const mapEmbedUrl = (path: TravelPath) => {
  const mid = /[?&]mid=([^&#]+)/.exec(path.mapUrl)?.[1]
  if (!mid || mid === 'REPLACE_ME') return undefined
  return `https://www.google.com/maps/d/embed?mid=${mid}&ehbc=2E312F`
}
