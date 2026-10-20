// ─────────────────────────────────────────────────────────────
// Edit this file to add your own cities and paths.
// Each path's `mapUrl` is a Google My Maps share link, e.g.
//   https://www.google.com/maps/d/viewer?mid=XXXXXXXX
// ─────────────────────────────────────────────────────────────

// Tags are shown as pills under the path title. A plain string can start
// with an emoji; for a drawn icon use { icon, label } (see TagIcon.tsx).
export type TagIconName = 'hiker' | 'moon' | 'village' | 'sunset' | 'blossom' | 'hiking' | 'hot'
export type Tag = string | { icon: TagIconName; label: string }

// Longer text for the detail page: what the walk is, the stages in order and
// practical tips. Short sentences; the map carries the details per stop.
export type PathGuide = {
  intro: string[] // one or two short paragraphs
  route?: string[] // the stages in walking order, one line each
  tips?: string[] // getting there, food, best time, nearby
}

export type TravelPath = {
  id: string
  name: string
  description?: string
  guide?: PathGuide // shown under the map on the detail page
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
        tags: [
          { icon: 'hiker', label: 'Trekking' },
          { icon: 'sunset', label: 'Evening walk' },
        ],
        image: 'inwangsan.jpg',
        imageCredit: 'Photo: Rtflakfizer · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1JPHJVSHobZnrwTiCPU8KQt-3SUX3Wqg',
      },
      {
        id: 'cherry-blossom-walk',
        name: 'Cherry Blossom walk',
        description:
          'Four blossom walks for early April: Dorimcheon and the Anyangcheon embankment, Yeouido Yunjung-ro, the Seokchon Lake loop and the Namsan North Loop.',
        duration: '2–3h each',
        tags: [{ icon: 'blossom', label: 'Cherry blossom' }],
        image: 'cherry.jpg',
        imageCredit: 'Photo: Alexey Komarov · CC BY 3.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1PeaxeqCRk2SBgINAteHz4-fODippOZc',
      },
      {
        id: 'hongdae-hot-places',
        name: 'Hongdae Hot Places',
        description:
          'Two walks through the student quarter: the Gyeongui Line Forest Park from Yeontral Park past the Book Street to Seogang, and the Red Road busking street from Hongik University Station down to the Han River.',
        duration: '1–2h each',
        tags: [{ icon: 'hot', label: 'Hot place' }],
        image: 'hongdae-hot.jpg',
        imageCredit: 'Photo: Ken Eckert · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1MacGBkR5Qdw577FGrG4yztVioZYpBy0',
      },
      {
        id: 'gangnam-night-streets',
        name: 'Gangnam Night Streets',
        description:
          'The back streets around Gangnam Station after dark: Seocho-daero 75-gil and 77-gil on the west side, Teheran-ro 1-gil on the east, and short walks from exits 10 and 11 along Gangnam-daero. Starfield Library and Bongeunsa Temple are pinned for the daytime.',
        duration: '2h',
        tags: [{ icon: 'moon', label: 'Night walk' }],
        image: 'gangnam.jpg',
        imageCredit: 'Photo: 최광모 · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1VIazL8nrcXwzKDjTxKyxrbKGaNR9NYg',
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
        id: 'cherry-blossom-walk',
        name: 'Cherry Blossom walk',
        description:
          'Four blossom walks for late March: the Oncheoncheon stream, Namcheon-dong to Gwangalli, Dalmaji-gil over the pass to Songjeong, and the Nakdong embankment at Samnak.',
        duration: '1.5–3h each',
        tags: [{ icon: 'blossom', label: 'Cherry blossom' }],
        image: 'cherry.jpg',
        imageCredit: 'Photo: Alexey Komarov · CC BY 3.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1_cT5HhnFhhBcEl_BPKPGmZRP33I163c',
      },
      {
        id: 'haeundae-coast',
        name: 'Haeundae Coastal Path',
        description: 'Beach → Dongbaek Island → Blueline Park sky capsule.',
        duration: 'Half day',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=REPLACE_ME',
      },
    ],
  },
  {
    id: 'jeju',
    name: 'Jeju',
    image: 'jeju.jpg',
    imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
    paths: [
      {
        id: 'jeju-olle-trail',
        name: 'Jeju Olle Trail',
        description:
          'Routes 5, 6 and 7 of the 437 km island trail: Namwon → Soesokkak → Seogwipo → Seogwipo Bus Terminal along the south coast, one colour per route, with every toilet and first-aid kit from the official maps.',
        duration: '1 day per route',
        tags: [{ icon: 'hiking', label: 'Hiking' }],
        image: 'olle.jpg',
        imageCredit: 'Photo: Jeju Olle Foundation · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1KEy42fnL8YeGcNgyhB_9PVreKLgwiTM',
      },
    ],
  },
  {
    id: 'incheon',
    name: 'Incheon',
    image: 'incheon.jpg',
    imageCredit: 'Photo: Cameron Henderson · Public domain',
    paths: [
      {
        id: 'china-town',
        name: 'Incheon China Town',
        description:
          'Korea\'s oldest China Town, 2 minutes from Incheon Station: the lantern street and its lanes, the Songwol-dong Fairy Tale Village loop, the Japanese-style street of the old port, plus the two mural streets and the Incheon Citizens\' House.',
        duration: '2–3h',
        tags: [{ icon: 'village', label: 'Old town' }],
        image: 'chinatown.jpg',
        imageCredit: 'Photo: Mobius6 · CC BY-SA 4.0',
        mapUrl: 'https://www.google.com/maps/d/viewer?mid=1RoZet4u2GSJ8N6XbSHqcuN0xW6vYEXA',
        guide: {
          intro: [
            "Korea's oldest China Town grew up on the slope above the port after Incheon opened to foreign trade in 1883, when merchants from Qing China settled here. Today it is a compact hill of red gates, lantern-strung streets and the restaurants that invented jajangmyeon, Korea's black-bean noodles.",
            'The old Japanese quarter and a village painted with fairy-tale scenes are a few minutes away on foot. Everything lies within one kilometre of Incheon Station, so it makes an easy half-day trip from Seoul.',
          ],
          route: [
            'Incheon Station to the 1st Paeru gate: cross the plaza to the red gate and walk uphill along Chinatown-ro under the lanterns.',
            'Main street: the Jajangmyeon Museum in the old Gonghwachun building, the small Uiseondang temple on the left and the big restaurants. Lanes 51, 55 and 59 run parallel and are quieter.',
            '3rd Paeru gate at the top of the hill. The Chu-Han mural street climbs from here towards Jayu Park.',
            'Songwol-dong Fairy Tale Village: a 600 m loop of houses painted with Pinocchio, Snow White and the Little Prince, five minutes from the top gate. Free, best photos in the side alleys.',
            'Three Kingdoms mural street, 77 panels along the lane, down to the 1880s boundary stairs: Chinese lanterns on one side, Japanese wooden façades on the other.',
            'Japanese-style street: restored bank buildings along Sinpo-ro 23beon-gil with the Open Port Museum and the Modern Architecture Exhibition Hall. Incheon Citizens\' House, a former mayor\'s residence with a garden over the port, is five minutes further below Jayu Park.',
          ],
          tips: [
            'Getting there: Line 1 or the Suin-Bundang line to Incheon Station, about one hour from Seoul Station. The gate is straight across the plaza.',
            'Food: Gonghwachun and Yeongyeong (home of white jajangmyeon) draw queues at lunch, so eat early or late. For snacks on the move try the clay-oven buns at Simnihyang, hollow gonggalppang bread and the Macau egg tarts at Tart King. The pink pins on the map were checked in October 2026.',
            'The main street and the mural streets are steep; the Fairy Tale Village and the Japanese street are flat. Allow two to three hours including a meal.',
            'Weekends are crowded. A weekday late morning is calmer, and the lanterns look best after dark.',
            'With time left, the Wolmi Sea Train next to Incheon Station runs out to Wolmido island, and Sinpo Market is ten minutes past the Japanese street.',
          ],
        },
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
