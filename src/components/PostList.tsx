import Link from './Link'
import { postsByMonth } from '../data/blog'
import { formatMonth } from '../dates'
import { useLastRead } from '../lastRead'

// Title list of every post, grouped by month; used on /blog/ and under each post.
export default function PostList({ currentId }: { currentId?: string }) {
  const lastRead = useLastRead()
  const groups = postsByMonth()
  return (
    <div className="post-list">
      {groups.map((g, i) => (
        <details key={g.month} open={i === 0 || g.posts.some((p) => p.id === currentId)}>
          <summary>{formatMonth(g.month + '-01')}</summary>
          <ul>
            {g.posts.map((p) => (
              <li key={p.id}>
                <Link to={`/blog/${p.id}/`} aria-current={p.id === currentId ? 'page' : undefined}>
                  <strong>{p.title}</strong>
                  <span>{p.teaser}</span>
                  <span className="post-list-tags">{p.keywords.map((k) => `#${k}`).join(' ')}</span>
                  {p.id === lastRead && p.id !== currentId && <em className="pill">📖 Continue reading</em>}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}
