// ─────────────────────────────────────────────────────────────
// Edit this file to add your own cities and paths.
// Each path's `mapUrl` is a Google My Maps share link, e.g.
//   https://www.google.com/maps/d/viewer?mid=XXXXXXXX
// ─────────────────────────────────────────────────────────────

// Tags are shown as pills under the path title. A plain string can start
// with an emoji; for a drawn icon use { icon, label } (see TagIcon.tsx).
export type TagIconName = 'hiker' | 'moon' | 'village' | 'sunset'
export type Tag = string | { icon: TagIconName; label: string }

export type TravelPath = {
  id: string
  name: string
  description?: string
  duration?: string // e.g. "2h", "Half day"
  tags?: Tag[] // e.g. [{ icon: 'moon', label: 'Night walk' }] or a plain string
  image?: string // file in ./assets, shown as a banner above the description on the detail page
  imageCredit?: string // shown as a small label on the banner
  mapUrl: string
}

export type City = {
  id: string
  name: string
  image?: string // file in ./assets, shown as the city card's header photo
  imageCredit?: string // shown as a small label on the photo
  paths: TravelPath[]
}

export const cities: City[] = [
  {
    id: 'seoul',
    name: 'Seoul',
    image: 'seoul.jpg',
    imageCredit: 'Photo: Seoul Tourism Organization · KOGL 1',
    paths: [
      {
        id: 'naksan-cheonggyecheon',
        name: 'Fortress wall and stream',
        description: 'Naksan Park fortress wall at dusk, then down to the Cheonggyecheon stream lights.',
        duration: '3h',
        tags: [{ icon: 'moon', label: 'Night walk' }],
        image: 'naksan.jpg',
        imageCredit: 'Photo: Seoul Metropolitan Fire & Disaster HQ · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1w8F-eVqm5RpMFykhZ3HQUrb9TydjQV8',
      },
      {
        id: 'haebangchon-evening',
        name: 'Haebangchon late evening walk',
        description:
          'Huam-dong 108 Stairs, Sinheung Market, Sowol-ro rooftops and the City Wall to Baekbeom Square. 2.4 km.',
        duration: '2h',
        tags: [{ icon: 'sunset', label: 'Evening walk' }],
        image: 'haebangchon.jpg',
        imageCredit: 'Photo: Lee Jeong Woo / Korea MCST · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1kOFoicmAJJvQvsioIIOu1ng9dDQ4Exk',
      },
      {
        id: 'hanok-villages',
        name: 'Hanok Villages',
        description: 'Cheong Wa Dae to Bukchon, Ikseon-dong and Insadong, ending at Ssamziegil. 5.1 km.',
        duration: '2h',
        tags: [{ icon: 'village', label: 'Traditional' }],
        image: 'bukchon.jpg',
        imageCredit: 'Photo: Bgag · CC0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=14TBNrDcRMm9lNuEBH3QZbcEAg_mnuNU',
      },
      {
        id: 'inwang-mountain-trail',
        name: 'Inwang Mountain Trail',
        description: 'Seoul fortress wall climb with views over Gyeongbokgung and the whole city.',
        duration: '2.5h',
        tags: [{ icon: 'hiker', label: 'Trekking' }],
        image: 'inwangsan.jpg',
        imageCredit: 'Photo: Rtflakfizer · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1JPHJVSHobZnrwTiCPU8KQt-3SUX3Wqg',
      },
    ],
  },
  {
    id: 'busan',
    name: 'Busan',
    image: 'busan.jpg',
    imageCredit: 'Photo: Busan Metropolitan City · KOGL 1',
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
]

// ── Lookup helpers ───────────────────────────────────────────
export const findCity = (cityId?: string) => cities.find((c) => c.id === cityId)

export const findPath = (cityId?: string, pathId?: string) =>
  findCity(cityId)?.paths.find((p) => p.id === pathId)

// A path whose map link has not been filled in yet is shown but not openable.
export const hasMap = (path: TravelPath) =>
  Boolean(path.mapUrl) && !path.mapUrl.includes('REPLACE_ME')

// Google My Maps share links and embed links share the same `mid` id, so the
// embed URL can be derived instead of stored twice.
export const mapEmbedUrl = (path: TravelPath) => {
  const mid = /[?&]mid=([^&#]+)/.exec(path.mapUrl)?.[1]
  if (!mid || mid === 'REPLACE_ME') return undefined
  return `https://www.google.com/maps/d/embed?mid=${mid}&ehbc=2E312F`
}
