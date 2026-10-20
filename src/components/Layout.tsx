import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { dashboardUrl } from './Analytics'
import ThemeToggle from './ThemeToggle'

type Props = {
  title: string
  subtitle?: string
  backTo?: string
  /** Element shown in place of the back button, e.g. the brand mark on the home screen. */
  icon?: ReactNode
  children: ReactNode
}

export default function Layout({ title, subtitle, backTo, icon, children }: Props) {
  return (
    <div className="screen">
      <header className="header">
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
        <ThemeToggle />
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
