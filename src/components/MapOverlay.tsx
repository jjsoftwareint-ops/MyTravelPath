import { useEffect, useRef, useState } from "react";
import { IoClose, IoPhoneLandscapeOutline, IoPhonePortraitOutline } from "react-icons/io5";

// Full-screen My Maps viewer. The iframe is shown whole (Google's own toolbar and attribution
// included, nothing trimmed), so the pin descriptions with their Naver Map links work in place.
// A page cannot rotate the phone (iOS has no orientation lock), so the landscape button turns the
// map itself 90 degrees; the user then turns the phone to match (see .map-fullscreen.landscape).
export default function MapOverlay({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [landscape, setLandscape] = useState(false);

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
    <div className={landscape ? "map-fullscreen landscape" : "map-fullscreen"} role="dialog" aria-modal="true" aria-label={title}>
      <iframe src={src} title={title} allowFullScreen />
      <div className="map-fullscreen-actions">
        <button
          type="button"
          className="map-fullscreen-btn rotate"
          aria-label={landscape ? "Portrait mode" : "Landscape mode"}
          aria-pressed={landscape}
          onClick={() => setLandscape((v) => !v)}
        >
          {landscape ? (
            <IoPhonePortraitOutline aria-hidden="true" />
          ) : (
            <IoPhoneLandscapeOutline aria-hidden="true" />
          )}
        </button>
        <button
          ref={closeRef}
          type="button"
          className="map-fullscreen-btn close"
          aria-label="Close map"
          onClick={onClose}
        >
          <IoClose aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
