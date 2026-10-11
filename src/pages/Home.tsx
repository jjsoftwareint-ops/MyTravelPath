import { ImInfo } from 'react-icons/im'
import { Link, useParams } from 'react-router-dom'
import { dashboardUrl } from '../components/Analytics'
import BrandMark from '../components/BrandMark'
import Layout from '../components/Layout'
import Tags from '../components/Tags'
import { cities } from '../data/travel'

// The expanded city lives in the URL (/:cityId) so that coming back from a
// path's detail page lands on the list with that city still open.
export default function Home() {
  const { cityId } = useParams()

  return (
    <Layout
      title="My Travel Path"
      subtitle="Pick a city, then a path"
      icon={<BrandMark />}
    >
      <p className="notice">
        <ImInfo className="notice-icon" aria-hidden="true" /> Restaurant, café and event information
        is regularly updated.
      </p>

      <ul className="list">
        {cities.map((city) => {
          const open = city.id === cityId
          return (
            <li key={city.id} className={open ? 'group open' : 'group'}>
              <Link
                to={open ? '/' : `/${city.id}`}
                replace
                className="card group-head"
                aria-expanded={open}
              >
                {city.image && (
                  <span className="card-image">
                    <img
                      src={`${import.meta.env.BASE_URL}${city.image}`}
                      alt=""
                      decoding="async"
                    />
                    {city.imageCredit && <span className="credit">{city.imageCredit}</span>}
                  </span>
                )}
                <span className="row">
                  <span className="card-body">
                    <span className="card-title">{city.name}</span>
                    <span className="card-meta">
                      {city.paths.length} {city.paths.length === 1 ? 'path' : 'paths'}
                    </span>
                  </span>
                  <span className="chevron caret">›</span>
                </span>
              </Link>
              {open && (
                <ul className="sublist">
                  {city.paths.map((path) => (
                    <li key={path.id}>
                      <Link to={`/${city.id}/${path.id}`} className="child">
                        <span className="card-body">
                          <span className="card-title">{path.name}</span>
                          <Tags tags={path.tags} duration={path.duration} />
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

      <footer className="footer">
        <Link to="/imprint">Imprint</Link>
        <span aria-hidden="true">·</span>
        <a href={dashboardUrl} target="_blank" rel="noreferrer">
          Analytics
        </a>
      </footer>
    </Layout>
  )
}
