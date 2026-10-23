import { useEffect, useState } from "react";
import { IoCheckmark, IoShareOutline } from "react-icons/io5";

// "Share this path": the system share sheet on phones (Web Share API), a copied
// link elsewhere. Each path has its own hash URL, so the link lands on the path.
// `compact` renders the round icon-only version used in the page header.
export default function ShareLink({ title, text, compact = false }: { title: string; text?: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const share = async () => {
    const url = window.location.href;
    const message = text ?? `${title} – a free walking route on My Travel Path`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: message, url });
        return;
      } catch {
        /* user cancelled the sheet */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      /* clipboard blocked: nothing else to do */
    }
  };

  if (compact) {
    const label = copied ? "Link copied" : "Share this page";
    return (
      <button
        type="button"
        className="icon-button share-icon"
        onClick={share}
        aria-label={label}
        title={label}
        aria-live="polite"
      >
        {copied ? <IoCheckmark aria-hidden="true" /> : <IoShareOutline aria-hidden="true" />}
      </button>
    );
  }

  return (
    <button type="button" className="share" onClick={share} aria-live="polite">
      {copied ? <IoCheckmark aria-hidden="true" /> : <IoShareOutline aria-hidden="true" />}
      {copied ? "Link copied" : "Share this path"}
    </button>
  );
}
