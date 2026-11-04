import { useEffect, useRef, useState } from 'react'
import { IoRefresh } from 'react-icons/io5'
import { isStandalone } from '../install'

// Pull-to-refresh, only in the home-screen app: it has no browser bar, so no reload button, and
// iPhone gives home-screen apps no pull-to-refresh of its own. Pull down at the very top of a page
// and let go past the mark to reload. Touches inside popups, dialogs and maps are ignored.
const TRIGGER = 70 // px the circle travels before letting go reloads
const MAX = 96
const IGNORE = '.image-popup-backdrop, .map-overlay, .map-fullscreen, .dialog-backdrop'

export default function PullToRefresh() {
  const [on, setOn] = useState(false)
  const circle = useRef<HTMLDivElement>(null)

  useEffect(() => setOn(isStandalone()), [])

  useEffect(() => {
    if (!on) return
    let startY: number | null = null
    let pull = 0
    let busy = false
    const draw = (px: number, animate: boolean) => {
      const el = circle.current
      if (!el) return
      el.style.transition = animate ? 'transform 0.2s ease, opacity 0.2s ease' : 'none'
      el.style.transform = `translate(-50%, ${px}px) rotate(${px * 4}deg)`
      el.style.opacity = String(Math.min(px / TRIGGER, 1))
      el.classList.toggle('ready', px >= TRIGGER)
    }
    const start = (e: TouchEvent) => {
      if (busy || window.scrollY > 0 || e.touches.length !== 1) return
      if ((e.target as Element).closest?.(IGNORE)) return
      startY = e.touches[0].clientY
      pull = 0
    }
    const move = (e: TouchEvent) => {
      if (startY === null) return
      const dy = e.touches[0].clientY - startY
      if (dy <= 0 || window.scrollY > 0) {
        if (pull) draw(0, true)
        startY = dy <= 0 ? startY : null
        pull = 0
        return
      }
      pull = Math.min(dy / 2, MAX)
      draw(pull, false)
    }
    const end = () => {
      if (startY === null) return
      startY = null
      if (pull >= TRIGGER) {
        busy = true
        draw(TRIGGER, true)
        circle.current?.classList.add('spinning')
        window.location.reload()
      } else {
        draw(0, true)
      }
      pull = 0
    }
    window.addEventListener('touchstart', start, { passive: true })
    window.addEventListener('touchmove', move, { passive: true })
    window.addEventListener('touchend', end)
    window.addEventListener('touchcancel', end)
    return () => {
      window.removeEventListener('touchstart', start)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', end)
      window.removeEventListener('touchcancel', end)
    }
  }, [on])

  if (!on) return null
  return (
    <div ref={circle} className="ptr" aria-hidden="true">
      <IoRefresh />
    </div>
  )
}
