import Link from '../components/Link'
import Layout from '../components/Layout'
import Tags from '../components/Tags'
import { bookmarkKey, postBookmarkKey, useBookmarks } from '../bookmarks'
import { posts } from '../data/blog'
import { formatDate } from '../dates'
import { cities } from '../data/travel'
import { usePageMeta } from '../seo'

// The visitor's saved paths and blog posts, kept in this browser only (see bookmarks.ts).
export default function Saved() {
  usePageMeta()
  const saved = useBookmarks()
  const paths = cities.flatMap((city) =>
    city.paths
      .filter((path) => saved.includes(bookmarkKey(city.id, path.id)))
      .map((path) => ({ city, path })),
  )
  const savedPosts = posts.filter((p) => saved.includes(postBookmarkKey(p.id)))

  return (
    <Layout title="Saved" subtitle="Kept in this browser" backTo="/">
      {paths.length === 0 && savedPosts.length === 0 ? (
        <p className="saved-empty">
          Nothing saved yet. Tap the bookmark on a path's header image, or Save at the top of a blog post, to keep it
          here.
        </p>
      ) : (
        <>
          {paths.length > 0 && (
            <>
              <h2 className="saved-heading">Paths</h2>
              <ul className="sublist saved-list">
                {paths.map(({ city, path }) => (
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
            </>
          )}
          {savedPosts.length > 0 && (
            <>
              <h2 className="saved-heading">Blog posts</h2>
              <ul className="sublist saved-list">
                {savedPosts.map((post) => (
                  <li key={post.id}>
                    <Link to={`/blog/${post.id}/`} className="child">
                      <span className="card-body">
                        <span className="card-title">{post.title}</span>
                        <span className="card-meta">Blog · {formatDate(post.updated)}</span>
                      </span>
                      <span className="chevron">›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </Layout>
  )
}
