import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Link from './Link'
import { dashboardUrl } from './Analytics'
import BlogLink from './BlogLink'
import { BookmarkLink } from './BookmarkButton'
import ThemeToggle from './ThemeToggle'
import BlogThemePicker from './BlogThemePicker'

type Props = {
  title: string
  /** Wordmark shown in place of the title text (file in ./assets, scaled whole); the title stays as its alt text. */
  titleImage?: string
  subtitle?: string
  backTo?: string
  /** Element shown in place of the back button, e.g. the brand mark on the home screen. */
  icon?: ReactNode
  /** Extra header buttons shown right of the theme toggle, e.g. the share button on a path page. */
  actions?: ReactNode
  /** Hide the Saved paths link on phones, where the header is short of space (a path page has its own save button). */
  hideSaved?: boolean
  /** Leave the Saved paths link out entirely, on every screen size (the blog pages). */
  noSaved?: boolean
  /** Blog button left of the Saved paths icon; the main page only. */
  showBlog?: boolean
  /** Blog pages: a reading-theme palette replaces the light/dark toggle. */
  blogTheme?: boolean
  children: ReactNode
}

export default function Layout({ title, titleImage, subtitle, backTo: backToProp, icon, actions, hideSaved, noSaved, showBlog, blogTheme, children }: Props) {
  // Opened from a link inside a blog post? The back button returns to that post (the link passes its URL in state.from).
  const from = (useLocation().state as { from?: string } | null)?.from
  const backTo = backToProp !== undefined && from?.startsWith('/blog/') ? from : backToProp
  // Back respects the visitor's own history: if they came here from another page of this site in this tab, go back
  // to exactly that page (a blog post opened from a path page returns to the path page). Only with no in-app history
  // (a shared link, a new tab, a search result) does it fall back to `backTo`, the blog list or the parent page.
  // React Router keeps its position in history.state.idx: 0 on the first page of the visit, higher after in-app moves.
  const navigate = useNavigate()
  const onBack = (e: MouseEvent<HTMLAnchorElement>) => {
    const idx = (window.history.state as { idx?: number } | null)?.idx
    if (typeof idx === 'number' && idx > 0) {
      e.preventDefault()
      navigate(-1)
    }
  }
  // Publish the header's height as --header-h so sticky rows in the list sit right under it.
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const set = () => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div className="screen">
      <header
        className={`${backTo !== undefined ? "header detail" : "header"}${hideSaved ? " hide-saved" : ""}`}
        ref={headerRef}
      >
        {backTo !== undefined ? (
          <Link to={backTo} className="back" aria-label="Back" onClick={onBack}>
            ‹
          </Link>
        ) : icon ? (
          // The brand mark reloads the home page (a plain <a>, not the router Link, so the browser really reloads).
          // The wordmark beside it carries the same link with its accessible name, so this one is hidden from readers.
          titleImage ? (
            <a href={import.meta.env.BASE_URL} className="brand-link" aria-hidden="true" tabIndex={-1}>
              {icon}
            </a>
          ) : (
            icon
          )
        ) : (
          <span className="back placeholder" />
        )}
        <div className="header-text">
          {titleImage ? (
            <h1 className="wordmark">
              {/* Tapping the wordmark reloads the home page: a full page load, so filters and scroll start fresh. */}
              <a href={import.meta.env.BASE_URL} className="brand-link">
                <img src={`${import.meta.env.BASE_URL}${titleImage}`} alt={title} width={800} height={266} />
              </a>
            </h1>
          ) : (
            <h1>{title}</h1>
          )}
          {subtitle && <p>{subtitle}</p>}
        </div>
        {showBlog && <BlogLink />}
        {!noSaved && <BookmarkLink />}
        {blogTheme ? <BlogThemePicker /> : <ThemeToggle />}
        {actions}
      </header>
      <main className="content">{children}</main>
      {/* Same footer on every page so the policy pages are one tap away anywhere. */}
      <footer className="footer">
        <Link to="/about">About</Link>
        <span aria-hidden="true">·</span>
        <Link to="/contact">Contact</Link>
        <span aria-hidden="true">·</span>
        <Link to="/privacy">Privacy</Link>
        <span aria-hidden="true">·</span>
        <Link to="/imprint">Imprint</Link>
        <span aria-hidden="true">·</span>
        <a href={dashboardUrl} target="_blank" rel="noreferrer">
          Visitors
        </a>
      </footer>
    </div>
  )
}
