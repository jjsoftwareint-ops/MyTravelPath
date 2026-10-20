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
      count?: (vars: { path: string; title?: string }) => void
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

// Renders nothing; sends one page view per route change (e.g. /seoul/hanok-villages).
// Trailing slashes are dropped so /seoul/ and /seoul count as the same page.
export default function Analytics() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!GOATCOUNTER_SITE || import.meta.env.DEV) return
    void loadScript().then(() => {
      const path = pathname.replace(/\/+$/, '') || '/'
      window.goatcounter?.count?.({ path, title: document.title })
    })
  }, [pathname])

  return null
}
