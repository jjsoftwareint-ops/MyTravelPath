import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { countries } from '../data/travel'

export default function CountryList() {
  return (
    <Layout title="My Travel Path" subtitle="Pick a country">
      <ul className="list">
        {countries.map((country) => {
          const pathCount = country.cities.reduce((n, c) => n + c.paths.length, 0)
          return (
            <li key={country.id}>
              <Link to={`/${country.id}`} className="card">
                <span className="emoji">{country.flag}</span>
                <span className="card-body">
                  <span className="card-title">{country.name}</span>
                  <span className="card-meta">
                    {country.cities.length} {country.cities.length === 1 ? 'city' : 'cities'} ·{' '}
                    {pathCount} {pathCount === 1 ? 'path' : 'paths'}
                  </span>
                </span>
                <span className="chevron">›</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
