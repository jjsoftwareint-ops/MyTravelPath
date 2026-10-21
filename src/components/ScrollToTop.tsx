import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// A path detail page (/city/path) always opens at the top. The list (/ and
// /city) keeps its position: untouched when a city accordion toggles, restored
// by the browser on back/forward, and restored by us when the visitor returns
// through the header's back button (an in-app link, so the browser cannot).
const isDetail = (pathname: string) => pathname.split('/').filter(Boolean).length === 2

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const type = useNavigationType()
  const previous = useRef(pathname)
  const listScroll = useRef(0)
  useEffect(() => {
    const from = previous.current
    previous.current = pathname
    if (type === 'POP') return
    if (isDetail(pathname)) {
      if (!isDetail(from)) listScroll.current = window.scrollY
      window.scrollTo(0, 0)
    } else if (isDetail(from)) {
      window.scrollTo(0, listScroll.current)
    }
  }, [pathname, type])
  return null
}
