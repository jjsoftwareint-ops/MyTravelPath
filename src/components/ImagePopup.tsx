import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

// Google Images search link for a place; also the link's plain href, so it still works without script.
export function imageSearchUrl(query: string) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
}

// Google Images results in a popup instead of a new tab. igu=1 is the parameter Google accepts for
// being shown inside a frame; without it the page refuses to load in an iframe.
export default function ImagePopup({
  query,
  onClose,
}: {
  query: string;
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
        aria-label={`Images of ${query}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="image-popup-bar">
          <span className="image-popup-title">{query}</span>
          <button
            ref={closeRef}
            type="button"
            className="image-popup-close"
            aria-label="Close images"
            onClick={onClose}
          >
            <IoClose aria-hidden="true" />
          </button>
        </div>
        <iframe src={`${imageSearchUrl(query)}&igu=1`} title={`Google Images: ${query}`} />
      </div>
    </div>
  );
}
