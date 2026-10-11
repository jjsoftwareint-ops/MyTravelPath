import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  subtitle?: string
  backTo?: string
  /** Image shown in place of the back button, e.g. a flag on the home screen. */
  icon?: { src: string; alt: string }
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
          <img className="header-icon" src={icon.src} alt={icon.alt} width={32} height={32} />
        ) : (
          <span className="back placeholder" />
        )}
        <div className="header-text">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </header>
      <main className="content">{children}</main>
    </div>
  )
}
