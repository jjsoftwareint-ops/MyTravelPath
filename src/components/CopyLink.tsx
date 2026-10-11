import { useEffect, useState } from 'react'
import { IoCheckmark, IoCopyOutline } from 'react-icons/io5'

// The map URL as selectable text plus a copy button, for people who would
// rather paste the link into their own browser than tap the embed.
export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Clipboard API unavailable (http, old browser): select the text instead
      // so a long-press / Cmd-C still works.
      const range = document.createRange()
      const node = document.getElementById(`link-${url}`)
      if (node) {
        range.selectNodeContents(node)
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)
      }
    }
  }

  return (
    <div className="copy-link">
      <code id={`link-${url}`} className="copy-link-url">
        {url}
      </code>
      <button type="button" className="copy-link-btn" onClick={copy} aria-live="polite">
        {copied ? <IoCheckmark aria-hidden="true" /> : <IoCopyOutline aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
