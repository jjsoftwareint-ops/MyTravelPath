import type { MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate, type LinkProps } from 'react-router-dom'

// A <Link> whose navigation runs inside document.startViewTransition, so elements
// that share a view-transition-name (the path title in the list row and in the
// detail header) morph between pages. Plain navigation where the API is missing.
// Only one transition at a time; a click during one navigates plainly so it never gets lost.
let active = false

export default function TransitionLink({ to, replace, onClick, ...rest }: LinkProps) {
  const navigate = useNavigate()
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (rest.target && rest.target !== '_self') return
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> }
    }
    if (!doc.startViewTransition || active) return
    e.preventDefault()
    active = true
    const done = () => {
      active = false
    }
    try {
      const t = doc.startViewTransition(() => {
        flushSync(() => navigate(to, { replace }))
      })
      t.finished.then(done, done)
    } catch {
      done()
      navigate(to, { replace })
    }
  }
  return <Link to={to} replace={replace} onClick={handle} {...rest} />
}
