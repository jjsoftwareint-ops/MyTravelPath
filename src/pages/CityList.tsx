import { Link, Navigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { findCountry } from '../data/travel'

export default function CityList() {
  const { countryId } = useParams()
  const country = findCountry(countryId)
  if (!country) return <Navigate to="/" replace />

  return (
    <Layout title={`${country.flag} ${country.name}`} subtitle="Pick a city" backTo="/">
      <ul className="list">
        {country.cities.map((city) => (
          <li key={city.id}>
            <Link to={`/${country.id}/${city.id}`} className="card">
              <span className="card-body">
                <span className="card-title">{city.name}</span>
                <span className="card-meta">
                  {city.paths.length} {city.paths.length === 1 ? 'path' : 'paths'}
                </span>
              </span>
              <span className="chevron">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
