import { useEffect } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import Link from '../components/Link'
import AdSlot from '../components/AdSlot'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import RichText from '../components/RichText'
import ShareLink from '../components/ShareLink'
import { findPost, neighbours, type Block } from '../data/blog'
import { formatDate } from '../dates'
import { setLastRead } from '../lastRead'
import { usePageMeta } from '../seo'

function renderBlock(b: Block, i: number, from: string) {
  switch (b.type) {
    case 'p':
      return (
        <p key={i}>
          <RichText text={b.text} />
        </p>
      )
    case 'h':
      return (
        <h2 key={i}>
          {b.icon && <img className="h-emoji" src={`${import.meta.env.BASE_URL}emoji/${b.icon}.png`} alt="" width="28" height="28" />}
          {b.text}
        </h2>
      )
    case 'emoji':
      return (
        <p key={i} className="post-emoji" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}emoji/${b.name}.png`} alt="" width="72" height="72" />
        </p>
      )
    case 'space':
      return <div key={i} className="post-space" aria-hidden="true" />
    case 'list':
      return (
        <ul key={i} className="post-bullets">
          {b.items.map((t) => (
            <li key={t}>
              <RichText text={t} />
            </li>
          ))}
        </ul>
      )
    case 'dishes':
      return (
        <ul key={i} className="post-dishes">
          {b.items.map((d) => {
            return (
              <li key={d.text}>
                <span className="dish-icon" aria-hidden="true">
                  <img src={`${import.meta.env.BASE_URL}emoji/${d.icon}.png`} alt="" width="40" height="40" />
                </span>
                <span>
                  <RichText text={d.text} />
                </span>
              </li>
            )
          })}
        </ul>
      )
    case 'table':
      return (
        <table key={i} className="post-table">
          <thead>
            <tr>
              {b.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c) => (
                  <td key={c}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    case 'quote':
      return (
        <blockquote key={i}>
          <RichText text={b.text} />
        </blockquote>
      )
    case 'verdict':
      return (
        <p key={i} className="post-verdict">
          <RichText text={b.text} />
        </p>
      )
    case 'img':
      return (
        <figure key={i} className="post-figure">
          <a href={b.href} target="_blank" rel="noopener noreferrer">
            <img src={`${import.meta.env.BASE_URL}blog/${b.src}`} alt={b.alt} loading="lazy" decoding="async" />
          </a>
          <figcaption>
            {b.caption} Photo:{' '}
            <a href={b.href} target="_blank" rel="noopener noreferrer">
              {b.credit.author}
            </a>
            {', '}
            <a href={b.credit.licenseUrl} target="_blank" rel="noopener noreferrer">
              {b.credit.license}
            </a>
            {', via Wikimedia Commons.'}
          </figcaption>
        </figure>
      )
    case 'photo':
      return (
        <figure key={i} className="post-figure">
          <img src={`${import.meta.env.BASE_URL}blog/${b.src}`} alt={b.alt} loading="lazy" decoding="async" />
          <figcaption>{b.caption}</figcaption>
        </figure>
      )
    case 'route':
      return (
        <p key={i} className="post-route">
          <Link to={`/${b.cityId}/${b.pathId}/`} state={{ from }}>
            {b.text} ›
          </Link>
        </p>
      )
    case 'ad':
      return <AdSlot key={i} slot={b.slot} />
  }
}

export default function BlogPost() {
  const { postId } = useParams()
  const { pathname } = useLocation()
  const post = findPost(postId)
  usePageMeta()
  useEffect(() => {
    if (post) setLastRead(post.id)
  }, [post])
  if (!post) return <Navigate to="/blog/" replace />
  const { newer, older } = neighbours(post.id)
  return (
    <Layout
      title="Blog"
      subtitle="Stories about Korea"
      backTo="/blog/"
      actions={<ShareLink compact title={post.title} text={`${post.title} – on the My Travel Path blog`} />}
    >
      <article className="card post">
        <header className="post-head">
          <time className="updated post-updated" dateTime={post.updated}>
            Updated {formatDate(post.updated)}
          </time>
          <h1>
            {post.title}{' '}
            <img className="title-emoji" src={`${import.meta.env.BASE_URL}emoji/${post.icon}.png`} alt="" width="32" height="32" />
          </h1>
        </header>
        <div className="post-body">{post.body.map((b, i) => renderBlock(b, i, pathname))}</div>
        <AdSlot slot="below" />
        <ul className="hashtags" aria-label="Tags">
          {post.keywords.map((k) => (
            <li key={k}>#{k}</li>
          ))}
        </ul>
        <nav className="post-nav" aria-label="More posts">
          {older ? (
            <Link to={`/blog/${older.id}/`} rel="prev">
              <small>‹ Previous</small>
              <strong>{older.title}</strong>
            </Link>
          ) : (
            <span className="disabled" aria-disabled="true">
              <small>‹ Previous</small>
              <strong>This is the first post</strong>
            </span>
          )}
          {newer ? (
            <Link to={`/blog/${newer.id}/`} rel="next" className="next">
              <small>Next ›</small>
              <strong>{newer.title}</strong>
            </Link>
          ) : (
            <span className="disabled next" aria-disabled="true">
              <small>Next ›</small>
              <strong>You are up to date</strong>
            </span>
          )}
        </nav>
      </article>
      <section className="blog-wrap all-posts">
        <h2>All posts</h2>
        <PostList currentId={post.id} />
        <p className="emoji-credit">Emoji: Fluent Emoji by Microsoft (MIT)</p>
      </section>
    </Layout>
  )
}
