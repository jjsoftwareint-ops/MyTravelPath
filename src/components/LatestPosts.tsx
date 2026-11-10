import Link from './Link'
import { posts, type Post } from '../data/blog'

// Main page, under the events card: the newest blog posts as a row of photo cards that scrolls sideways,
// so every visitor sees the blog, not only those who find the header icon (blog posts had ~5% of views, 2026-11-10).
const SHOWN = 4
// Each tap counts one anonymous GoatCounter event, so the dashboard shows whether the strip brings readers.
export const STRIP_EVENT = 'home-blog-strip'

/** The post's first photo (Commons or our own), or undefined for a text-only post. */
function cover(post: Post): { src: string; alt: string } | undefined {
  for (const b of post.body) if (b.type === 'img' || b.type === 'photo') return { src: b.src, alt: b.alt }
  return undefined
}

function countTap() {
  if (import.meta.env.DEV) return
  window.goatcounter?.count?.({ path: STRIP_EVENT, title: 'Home blog strip tap', event: true })
}

export default function LatestPosts() {
  const base = import.meta.env.BASE_URL
  return (
    <section className="latest-posts" aria-labelledby="latest-posts-title">
      <div className="latest-posts-head">
        <h2 id="latest-posts-title" className="new-posts-label">
          Latest from the blog
        </h2>
        <Link to="/blog/" className="latest-posts-all">
          All stories ›
        </Link>
      </div>
      <ul className="latest-posts-row">
        {posts.slice(0, SHOWN).map((p) => {
          const img = cover(p)
          return (
            <li key={p.id}>
              <Link to={`/blog/${p.id}/`} className="latest-post" onClick={countTap}>
                <span className="latest-post-image">
                  {img ? (
                    <img src={`${base}blog/${img.src}`} alt={img.alt} loading="lazy" decoding="async" />
                  ) : (
                    <img className="latest-post-emoji" src={`${base}emoji/${p.icon}.png`} alt="" width="56" height="56" />
                  )}
                </span>
                <span className="latest-post-body">
                  <strong>{p.title}</strong>
                  <span>{p.teaser}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
