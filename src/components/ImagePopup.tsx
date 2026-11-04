import { useEffect, useRef } from "react";
import { IoClose, IoOpenOutline } from "react-icons/io5";

// Google Images search link for a place; also the link's plain href, so it still works without script.
export function imageSearchUrl(query: string) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}

// Google Images results in a popup instead of a new tab. igu=1 is the parameter Google accepts for
// being shown inside a frame; without it the page refuses to load in an iframe.
// With `src`, any outside page (an article, a YouTube player) opens in the same popup, `query` is
// then its title and `href` the address the "new tab" button opens (see src/framing.ts).
export type PopupPage = { query: string; src?: string; href?: string };

export default function ImagePopup({
  query,
  src,
  href,
  onClose,
}: PopupPage & {
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="image-popup-backdrop" onClick={onClose}>
      <div
        className="image-popup"
        role="dialog"
        aria-modal="true"
        aria-label={src ? query : `Images of ${query}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="image-popup-bar">
          <span className="image-popup-title">{query}</span>
          <span className="image-popup-actions">
            <a
              className="image-popup-close image-popup-tab"
              href={href ?? imageSearchUrl(query)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in a new tab"
              title="Open in a new tab"
            >
              <IoOpenOutline aria-hidden="true" />
            </a>
            <button
              ref={closeRef}
              type="button"
              className="image-popup-close"
              aria-label="Close"
              onClick={onClose}
            >
              <IoClose aria-hidden="true" />
            </button>
          </span>
        </div>
        <iframe
          src={src ?? `${imageSearchUrl(query)}&igu=1`}
          title={src ? query : `Google Images: ${query}`}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
