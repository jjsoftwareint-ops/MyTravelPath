import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  mapsUrl: string // ordinary link; on iOS the Google Maps app claims it
  browserUrl: string // Safari-only scheme, see platform.ts
}

// Shown on iPhone/iPad before leaving for the map. The Google Maps app renders
// My Maps descriptions as plain text, so the Naver Map links inside them only
// work when the map is opened in a browser. Both choices are real links so the
// navigation counts as a user tap (required for custom URL schemes).
export default function OpenMapDialog({ open, onClose, mapsUrl, browserUrl }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose() // tap on the backdrop
      }}
    >
      <div className="dialog-body">
        <h2>Open the map</h2>
        <p>
          Use “Browser” to open the <b className="naver">Naver Map</b> links. The Google Maps app
          shows them as plain text.
        </p>
        <div className="dialog-actions">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="cta secondary" onClick={onClose}>
            Google Maps
          </a>
          <a href={browserUrl} className="cta" onClick={onClose}>
            Browser
          </a>
        </div>
      </div>
    </dialog>
  )
}
