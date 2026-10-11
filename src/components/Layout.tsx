import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  subtitle?: string
  backTo?: string
  children: ReactNode
}

export default function Layout({ title, subtitle, backTo, children }: Props) {
  return (
    <div className="screen">
      <header className="header">
        {backTo !== undefined ? (
          <Link to={backTo} className="back" aria-label="Back">
            ‹
          </Link>
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
