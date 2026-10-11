import { Navigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { findCity, findCountry, type TravelPath } from '../data/travel'

// A path whose map link has not been filled in yet is shown but not tappable,
// so nobody lands on a broken Google Maps page.
const hasMap = (path: TravelPath) => Boolean(path.mapUrl) && !path.mapUrl.includes('REPLACE_ME')

function PathCard({ path }: { path: TravelPath }) {
  const body = (
    <>
      <span className="card-body">
        <span className="card-title">{path.name}</span>
        {path.description && <span className="card-desc">{path.description}</span>}
        {path.duration && (
          <span className="card-meta">
            <span className="pill">{path.duration}</span>
          </span>
        )}
      </span>
      <span className="cta">{hasMap(path) ? 'Open in Google Maps ↗' : 'Map link coming soon'}</span>
    </>
  )

  if (!hasMap(path)) {
    return (
      <div className="card path-card disabled" aria-disabled="true">
        {body}
      </div>
    )
  }
  return (
    <a href={path.mapUrl} target="_blank" rel="noopener noreferrer" className="card path-card">
      {body}
    </a>
  )
}

export default function PathList() {
  const { countryId, cityId } = useParams()
  const country = findCountry(countryId)
  const city = findCity(countryId, cityId)
  if (!country || !city) return <Navigate to={country ? `/${country.id}` : '/'} replace />

  return (
    <Layout title={city.name} subtitle={`${country.flag} ${country.name}`} backTo={`/${country.id}`}>
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
