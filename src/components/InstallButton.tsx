import { useEffect, useState } from 'react'
import { IoShareOutline } from 'react-icons/io5'
import { MdAddToHomeScreen, MdMoreVert } from 'react-icons/md'
import { hideInstallHint, promptInstall, useInstallHint } from '../install'

// Round floating button on path and blog pages: slides in while the reader scrolls up, out while they
// scroll down. Android with Chrome's install sheet: one tap installs. Otherwise a small dialog
// says where the browser's own "Add to Home Screen" is.
export default function InstallButton() {
  const hint = useInstallHint()
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!hint.show) return
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < last - 6) setVisible(true)
      else if (y > last + 6) setVisible(false)
      if (Math.abs(y - last) > 6) last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hint.show])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!hint.show) return null

  const tap = () => {
    if (hint.platform === 'android' && hint.canPrompt) void promptInstall()
    else setOpen(true)
  }

  return (
    <>
      <button
        type="button"
        className={visible ? 'install-fab shown' : 'install-fab'}
        onClick={tap}
        aria-label="Add to Home Screen"
        tabIndex={visible ? 0 : -1}
      >
        <MdAddToHomeScreen aria-hidden="true" />
      </button>
      {open && (
        <div className="dialog-backdrop" onClick={() => setOpen(false)}>
          <div
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Add to Home Screen"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              Keep My Travel Path on your phone: tap{' '}
              {hint.platform === 'ios' ? (
                <IoShareOutline className="install-inline" aria-label="Share" />
              ) : (
                <MdMoreVert className="install-inline" aria-label="Menu" />
              )}{' '}
              then <b>Add to Home Screen</b>.
            </p>
            <div className="dialog-actions">
              <button type="button" className="dialog-cancel" onClick={() => setOpen(false)}>
                Later
              </button>
              <button
                type="button"
                className="cta"
                onClick={() => {
                  setOpen(false)
                  hideInstallHint()
                }}
              >
                I added it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
