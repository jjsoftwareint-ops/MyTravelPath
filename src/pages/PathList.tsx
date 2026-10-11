import { Navigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { findCity, findCountry } from '../data/travel'

export default function PathList() {
  const { countryId, cityId } = useParams()
  const country = findCountry(countryId)
  const city = findCity(countryId, cityId)
  if (!country || !city) return <Navigate to={country ? `/${country.id}` : '/'} replace />

  return (
    <Layout title={city.name} subtitle={country.name} backTo={`/${country.id}`}>
      {city.paths.length === 0 ? (
        <p className="empty">No paths yet. Add some in src/data/travel.ts</p>
      ) : (
        <ul className="list">
          {city.paths.map((path) => (
            <li key={path.id}>
              <a
                href={path.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card path-card"
              >
                <span className="card-body">
                  <span className="card-title">{path.name}</span>
                  {path.description && <span className="card-desc">{path.description}</span>}
                  <span className="card-meta">
                    {path.duration && <span className="pill">{path.duration}</span>}
                    <span className="map-link">Open in Google Maps ↗</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}
