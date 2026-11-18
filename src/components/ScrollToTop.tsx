import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Every page opens at the top, except the list (/ and /city): it keeps its
// position when a city accordion toggles (the URL moves between / and /city),
// is restored by the browser on back/forward, and is restored by us when the
// visitor comes back through an in-app link (the header's back button), which
// the browser cannot do.
const PAGES = new Set(['about', 'contact', 'privacy', 'imprint', 'saved', 'this-week', 'poster', 'blog'])
const isList = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean)
  return parts.length === 0 || (parts.length === 1 && !PAGES.has(parts[0]))
}

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const type = useNavigationType()
  const previous = useRef(pathname)
  const listScroll = useRef(0)
  useEffect(() => {
    const from = previous.current
    previous.current = pathname
    if (type === 'POP') return
    if (isList(pathname)) {
      if (!isList(from)) window.scrollTo(0, listScroll.current)
    } else {
      if (isList(from)) listScroll.current = window.scrollY
      window.scrollTo(0, 0)
    }
  }, [pathname, type])
  return null
}
