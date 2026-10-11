import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import TagIcon from '../components/TagIcon'
import { findCity, findCountry, mapEmbedUrl, type TravelPath } from '../data/travel'

// A path whose map link has not been filled in yet is shown but not tappable,
// so nobody lands on a broken Google Maps page.
const hasMap = (path: TravelPath) => Boolean(path.mapUrl) && !path.mapUrl.includes('REPLACE_ME')

function PathCard({ path }: { path: TravelPath }) {
  const ready = hasMap(path)
  const embed = ready ? mapEmbedUrl(path) : undefined
  // The embedded map starts behind a cover so that scrolling the page over it
  // does not pan the map instead. One tap hands control to the map.
  const [mapActive, setMapActive] = useState(false)

  return (
    <article className={ready ? 'card path-card' : 'card path-card disabled'}>
      <div className="card-body">
        <h2 className="card-title">{path.name}</h2>
        {Boolean(path.tags?.length || path.duration) && (
          <span className="card-meta">
            {path.tags?.map((tag) =>
              typeof tag === 'string' ? (
                <span key={tag} className="pill tag">
                  {tag}
                </span>
              ) : (
                <span key={tag.label} className="pill tag">
                  <TagIcon name={tag.icon} />
                  {tag.label}
                </span>
              ),
            )}
            {path.duration && <span className="pill">{path.duration}</span>}
          </span>
        )}
        {path.description && <p className="card-desc">{path.description}</p>}
      </div>

      {embed && (
        <div className="map">
          <iframe src={embed} title={`${path.name} map`} loading="lazy" allowFullScreen />
          {!mapActive && (
            <button type="button" className="map-cover" onClick={() => setMapActive(true)}>
              <span>Tap to explore the map</span>
            </button>
          )}
        </div>
      )}

      {ready ? (
        <a href={path.mapUrl} target="_blank" rel="noopener noreferrer" className="cta">
          Open in Google Maps ↗
        </a>
      ) : (
        <span className="cta">Map link coming soon</span>
      )}
    </article>
  )
}

export default function PathList() {
  const { countryId, cityId } = useParams()
  const country = findCountry(countryId)
  const city = findCity(countryId, cityId)
  if (!country || !city) return <Navigate to={country ? `/${country.id}` : '/'} replace />

  return (
    <Layout title={city.name} subtitle={`${country.flag} ${country.name}`} backTo={`/${country.id}`}>
      <p className="notice">
        <span aria-hidden="true">ℹ️</span> Please open Google Maps first in case the path is not
        visible.
      </p>
      {city.paths.length === 0 ? (
        <p className="empty">No paths yet. Add some in src/data/travel.ts</p>
      ) : (
        <ul className="list">
          {city.paths.map((path) => (
            <li key={path.id}>
              <PathCard path={path} />
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}
