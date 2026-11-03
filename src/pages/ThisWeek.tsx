import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Link from '../components/Link'
import RichText from '../components/RichText'
import ShareLink from '../components/ShareLink'
import { cities } from '../data/travel'
import { thisWeek, type WeekEvent } from '../data/thisWeek'
import { useHydrated } from '../hooks'
import { formatDate } from '../dates'
import { usePageMeta } from '../seo'
import { markWeekSeen } from '../weekSeen'

function EventCard({ e }: { e: WeekEvent }) {
  return (
    <li className="event">
      <div className="event-head">
        <span className="pill tag">{e.city}</span>
        <h3>{e.title}</h3>
      </div>
      <p className="event-when">{e.when}</p>
      <p className="event-where">{e.where}</p>
      <p className="event-price">{e.price}</p>
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
      {(e.href || e.routes) && (
        <p className="event-links">
          {e.href && (
            <a className="link" href={e.href.url} target="_blank" rel="noopener noreferrer">
              {e.href.label}
            </a>
          )}
          {e.routes?.map((r) => (
            <Link key={r.pathId} className="link" to={`/${r.cityId}/${r.pathId}`}>
              {r.text} ›
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
// The filter is applied after hydration only, so the pre-rendered page always shows everything.
export default function ThisWeek() {
  usePageMeta()
  useEffect(() => markWeekSeen(), [])
  const hydrated = useHydrated()
  const [params] = useSearchParams()
  const filterCities = cities.filter((c) => !c.theme)
  const wanted = params.get('city')
  const city = hydrated ? filterCities.find((c) => c.id === wanted) : undefined
  const keep = (e: WeekEvent) => !city || e.cityId === city.id

  const weeks = thisWeek.weeks
    .map((w) => ({ ...w, events: w.events.filter(keep) }))
    .filter((w) => w.events.length > 0)
  const ongoing = thisWeek.ongoing.filter(keep)
  const comingUp = thisWeek.comingUp.filter((c) => !city || !c.cityId || c.cityId === city.id)

  return (
    <Layout
      title="This week in Korea"
      subtitle={city ? `Events in ${city.name}` : 'Festivals, fireworks and light shows'}
      backTo="/"
      noSaved
      actions={<ShareLink compact title="This week in Korea" text="Festivals and events in Korea this week, on My Travel Path" />}
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
                <EventCard key={e.id} e={e} />
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
                <EventCard key={e.id} e={e} />
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
    </Layout>
  )
}
