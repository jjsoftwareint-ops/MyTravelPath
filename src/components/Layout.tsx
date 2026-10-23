import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { dashboardUrl } from './Analytics'
import { BookmarkLink } from './BookmarkButton'
import ThemeToggle from './ThemeToggle'

type Props = {
  title: string
  subtitle?: string
  backTo?: string
  /** Element shown in place of the back button, e.g. the brand mark on the home screen. */
  icon?: ReactNode
  /** Extra header buttons shown right of the theme toggle, e.g. the share button on a path page. */
  actions?: ReactNode
  /** Hide the Saved paths link on phones, where the header is short of space (a path page has its own save button). */
  hideSaved?: boolean
  children: ReactNode
}

export default function Layout({ title, subtitle, backTo, icon, actions, hideSaved, children }: Props) {
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
          <Link to={backTo} className="back" aria-label="Back">
            ‹
          </Link>
        ) : icon ? (
          icon
        ) : (
          <span className="back placeholder" />
        )}
        <div className="header-text">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <BookmarkLink />
        <ThemeToggle />
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
