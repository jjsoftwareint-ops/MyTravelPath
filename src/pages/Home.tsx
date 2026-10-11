import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import { countries } from '../data/travel'

// The expanded country lives in the URL (/:countryId) so that coming back from
// a city's path list lands on the home list with that country still open.
export default function Home() {
  const { countryId } = useParams()

  return (
    <Layout title="My Travel Path" subtitle="Pick a country, then a city">
      <Banner />
      <ul className="list">
        {countries.map((country) => {
          const open = country.id === countryId
          const pathCount = country.cities.reduce((n, c) => n + c.paths.length, 0)
          return (
            <li key={country.id} className={open ? 'group open' : 'group'}>
              <Link
                to={open ? '/' : `/${country.id}`}
                replace
                className="card group-head"
                aria-expanded={open}
              >
                <span className="emoji">{country.flag}</span>
                <span className="card-body">
                  <span className="card-title">{country.name}</span>
                  <span className="card-meta">
                    {country.cities.length} {country.cities.length === 1 ? 'city' : 'cities'} ·{' '}
                    {pathCount} {pathCount === 1 ? 'path' : 'paths'}
                  </span>
                </span>
                <span className="chevron caret">›</span>
              </Link>
              {open && (
                <ul className="sublist">
                  {country.cities.map((city) => (
                    <li key={city.id}>
                      <Link to={`/${country.id}/${city.id}`} className="child">
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
              )}
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
