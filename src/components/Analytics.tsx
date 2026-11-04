import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// GoatCounter site code: the part before ".goatcounter.com" that you choose
// at https://www.goatcounter.com/signup. Leave empty to disable tracking.
// GoatCounter stores nothing on the visitor's device, so no consent banner
// is needed; the dashboard shows views per path and visitor countries.
export const GOATCOUNTER_SITE = 'jjsoftware-my-travel-path'

// Public dashboard, linked from the home footer. Enable "Allow public access"
// in the GoatCounter site settings so visitors can open it.
export const dashboardUrl = GOATCOUNTER_SITE
  ? `https://${GOATCOUNTER_SITE}.goatcounter.com`
  : 'https://www.goatcounter.com'

declare global {
  interface Window {
    goatcounter?: {
      no_onload?: boolean
      count?: (vars: { path: string; title?: string; event?: boolean }) => void
    }
  }
}

let loader: Promise<void> | undefined

// Inject count.js once. Page views are sent by hand below so that client-side
// navigations between routes are counted too.
function loadScript(): Promise<void> {
  if (!loader) {
    loader = new Promise((resolve) => {
      window.goatcounter = { no_onload: true }
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://gc.zgo.at/count.js'
      script.dataset.goatcounter = `https://${GOATCOUNTER_SITE}.goatcounter.com/count`
      script.onload = () => resolve()
      script.onerror = () => resolve()
      document.head.appendChild(script)
    })
  }
  return loader
}

// Returning visitors: GoatCounter forgets a visitor after 8 hours, so it cannot tell who came back.
// This browser keeps the day of its last visit (localStorage, never sent anywhere). When it comes
// back on a later day, one anonymous "returning-visitor" event is counted; the dashboard shows it as
// a page with that name, its daily total = returning visitors that day. Nothing identifies the person.
const LAST_DAY = 'last-visit-day'
export const RETURNING_EVENT = 'returning-visitor'

function isReturningToday(): boolean {
  try {
    const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD, visitor's own day
    const last = localStorage.getItem(LAST_DAY)
    if (last === today) return false
    localStorage.setItem(LAST_DAY, today)
    return last !== null
  } catch {
    return false // private mode or storage blocked: not counted
  }
}

// Renders nothing; sends one page view per route change (e.g. /seoul/hanok-villages).
// Trailing slashes are dropped so /seoul/ and /seoul count as the same page.
export default function Analytics() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!GOATCOUNTER_SITE || import.meta.env.DEV) return
    if (!isReturningToday()) return
    void loadScript().then(() => {
      window.goatcounter?.count?.({ path: RETURNING_EVENT, title: 'Returning visitor', event: true })
    })
  }, [])

  useEffect(() => {
    if (!GOATCOUNTER_SITE || import.meta.env.DEV) return
    void loadScript().then(() => {
      const path = pathname.replace(/\/+$/, '') || '/'
      window.goatcounter?.count?.({ path, title: document.title })
    })
  }, [pathname])

  return null
}
