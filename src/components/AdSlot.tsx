import { useEffect } from 'react'
import { useHydrated } from '../hooks'

// Manual AdSense slots for blog posts. Fill in the ad-unit ids from the AdSense console;
// an empty id keeps that slot switched off (Auto ads from index.html keep working either way).
const AD_SLOTS = { inArticle: '', below: '' }
const CLIENT = 'ca-pub-4846752594884580'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function AdSlot({ slot }: { slot: keyof typeof AD_SLOTS }) {
  const id = AD_SLOTS[slot]
  // Only after hydration, so the pre-rendered HTML stays free of empty ad boxes.
  const hydrated = useHydrated()
  const show = hydrated && !!id
  useEffect(() => {
    if (!show) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      /* blocked by an ad blocker or not yet approved */
    }
  }, [show])
  if (!show) return null
  return (
    <div className="ad-slot" aria-label="Advertisement">
      <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={CLIENT} data-ad-slot={id} data-ad-format="auto" data-full-width-responsive="true" />
    </div>
  )
}
