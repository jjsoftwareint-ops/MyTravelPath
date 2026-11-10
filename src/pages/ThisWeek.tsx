import { useCallback, useState, type MouseEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IoCalendarOutline, IoImagesOutline, IoLocationOutline, IoTicketOutline } from 'react-icons/io5'
import ImagePopup, { imageSearchUrl, type PopupPage } from '../components/ImagePopup'
import Layout from '../components/Layout'
import Link from '../components/Link'
import RichText from '../components/RichText'
import ShareLink from '../components/ShareLink'
import { cities } from '../data/travel'
import { liveWeek, thisWeek, todayInSeoul, type WeekEvent } from '../data/thisWeek'
import { useHydrated } from '../hooks'
import { formatDate } from '../dates'
import { usePageMeta } from '../seo'

/** Search words for the event's Google Images: the card's own Korean words, or its title and city. */
const photoQuery = (e: WeekEvent) => e.photoQuery ?? `${e.title} ${e.city}`

function EventCard({ e, onPhotos }: { e: WeekEvent; onPhotos: (query: string) => void }) {
  // A plain tap opens the photos in the site's popup (like place names on path pages); a modified click
  // (new tab, new window) keeps the link's normal behaviour.
  const openPhotos = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return
    ev.preventDefault()
    onPhotos(photoQuery(e))
  }
  return (
    <li className="event">
      {/* Gallery button, top right: Google Images of the event in the site's popup instead of a stored photo
          (user, 2026-11-10: "google image link is better, I don't wanna waste storage", "use iframe page",
          "gallery icon on the top-right of the event card"). */}
      <a
        className="event-photos"
        href={imageSearchUrl(photoQuery(e))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={openPhotos}
        aria-label={`Photos of ${e.title}`}
        title="Photos"
      >
        <IoImagesOutline aria-hidden="true" />
      </a>
      <div className="event-head">
        <span className="pill tag">{e.city}</span>
        <h3>{e.title}</h3>
      </div>
      {/* Date, place and price as icon rows, so each line reads on its own (user, 2026-11-10: "readability is low"). */}
      <ul className="event-meta">
        <li className="event-when">
          <IoCalendarOutline aria-hidden="true" />
          <span>{e.when}</span>
        </li>
        <li>
          <IoLocationOutline aria-hidden="true" />
          <span>{e.where}</span>
        </li>
        <li>
          <IoTicketOutline aria-hidden="true" />
          <span>{e.price}</span>
        </li>
      </ul>
      <p className="event-text">
        <RichText text={e.text} />
      </p>
      <div className="event-todo">
        <p className="event-todo-label">What you do</p>
        <ul>
          {e.todo.map((t, i) => (
            <li key={i}>
              <RichText text={t} />
            </li>
          ))}
        </ul>
      </div>
      {e.tip && (
        <p className="event-tip">
          <RichText text={e.tip} />
        </p>
      )}
      {/* One link per line. */}
      {(e.href || e.routes || e.posts) && (
        <p className="event-links">
          {e.href && (
            <a className="link" href={e.href.url} target="_blank" rel="noopener noreferrer">
              {e.href.label}
            </a>
          )}
          {e.routes?.map((r) => (
            <Link key={r.pathId} className="link" to={`/${r.cityId}/${r.pathId}`}>
              🗺️ {r.text} ›
            </Link>
          ))}
          {e.posts?.map((p) => (
            <Link key={p.id} className="link" to={`/blog/${p.id}/`}>
              📝 {p.text} ›
            </Link>
          ))}
        </p>
      )}
    </li>
  )
}

// Weekly events page: this week and next, a few things that run all through, and a heads-up.
// Refreshed by hand every week (src/data/thisWeek.ts, .claude/skills/thisweek/SKILL.md).
// /this-week/?city=busan shows one city's events (the calendar on each home-page city card links there).
// The city filter and the "finished events drop out" rule (each card's `ends`) are applied after hydration
// only, so the pre-rendered page always shows everything.
export default function ThisWeek() {
  usePageMeta()
  const hydrated = useHydrated()
  const [popup, setPopup] = useState<PopupPage | null>(null)
  const closePopup = useCallback(() => setPopup(null), [])
  const openPhotos = useCallback((query: string) => setPopup({ query }), [])
  const [params] = useSearchParams()
  const filterCities = cities.filter((c) => !c.theme)
  const wanted = params.get('city')
  const city = hydrated ? filterCities.find((c) => c.id === wanted) : undefined
  const keep = (e: WeekEvent) => !city || e.cityId === city.id

  const live = liveWeek(hydrated ? todayInSeoul() : undefined)
  const weeks = live.weeks
    .map((w) => ({ ...w, events: w.events.filter(keep) }))
    .filter((w) => w.events.length > 0)
  const ongoing = live.ongoing.filter(keep)
  const comingUp = live.comingUp.filter((c) => !city || !c.cityId || c.cityId === city.id)

  const heading = `Events in ${city ? city.name : 'Korea'}`

  return (
    <Layout
      title={heading}
      subtitle="Festivals, fireworks and light shows"
      backTo="/"
      noSaved
      actions={<ShareLink compact title={heading} text="Festivals and events in Korea this week, on My Travel Path" />}
    >
      <div className="blog-wrap week-wrap">
        <time className="updated blog-updated" dateTime={thisWeek.updated}>
          Updated {formatDate(thisWeek.updated)}
        </time>

        {filterCities.length > 1 && (
          <nav className="week-filter" aria-label="Filter by city">
            <Link to="/this-week" replace className="chip" aria-current={city ? undefined : 'page'}>
              All
            </Link>
            {filterCities.map((c) => (
              <Link
                key={c.id}
                to={`/this-week/?city=${c.id}`}
                replace
                className="chip"
                aria-current={city?.id === c.id ? 'page' : undefined}
              >
                {c.name}
              </Link>
            ))}
          </nav>
        )}

        {weeks.map((w) => (
          <section key={w.range} aria-labelledby={`w-${w.range.replace(/\W+/g, '-')}`}>
            <h2 id={`w-${w.range.replace(/\W+/g, '-')}`} className="week-range">
              {w.range}
            </h2>
            <ul className="events">
              {w.events.map((e) => (
                <EventCard key={e.id} e={e} onPhotos={openPhotos} />
              ))}
            </ul>
          </section>
        ))}

        {ongoing.length > 0 && (
          <section aria-labelledby="w-ongoing">
            <h2 id="w-ongoing" className="week-range">
              All through
            </h2>
            <ul className="events">
              {ongoing.map((e) => (
                <EventCard key={e.id} e={e} onPhotos={openPhotos} />
              ))}
            </ul>
          </section>
        )}

        {comingUp.length > 0 && (
          <section aria-labelledby="w-coming">
            <h2 id="w-coming" className="week-range">
              Coming up
            </h2>
            <ul className="events coming">
              {comingUp.map((c) => (
                <li key={c.when} className="event">
                  <p className="event-when">{c.when}</p>
                  <p className="event-text">
                    <RichText text={c.text} />
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="week-note">Dates and prices can change. Check the official page before you go.</p>
      </div>
      {popup && <ImagePopup {...popup} onClose={closePopup} />}
    </Layout>
  )
}
