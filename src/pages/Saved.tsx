import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Tags from '../components/Tags'
import { bookmarkKey, useBookmarks } from '../bookmarks'
import { cities } from '../data/travel'
import { usePageMeta } from '../seo'

// The visitor's saved paths, kept in this browser only (see bookmarks.ts).
export default function Saved() {
  usePageMeta()
  const saved = useBookmarks()
  const items = cities.flatMap((city) =>
    city.paths
      .filter((path) => saved.includes(bookmarkKey(city.id, path.id)))
      .map((path) => ({ city, path })),
  )

  return (
    <Layout title="Saved paths" subtitle="Kept in this browser" backTo="/">
      {items.length === 0 ? (
        <p className="saved-empty">
          Nothing saved yet. Open a path and tap the bookmark on its header image to keep it here.
        </p>
      ) : (
        <ul className="sublist saved-list">
          {items.map(({ city, path }) => (
            <li key={`${city.id}/${path.id}`}>
              <Link to={`/${city.id}/${path.id}`} className="child">
                <span className="card-body">
                  <span className="card-title">{path.name}</span>
                  <span className="card-meta">{city.name}</span>
                  <Tags tags={path.tags} duration={path.duration} />
                </span>
                <span className="chevron">›</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  )
}
