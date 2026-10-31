import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

// Full-screen My Maps viewer. The iframe is shown whole (Google's own toolbar and attribution
// included, nothing trimmed), so the pin descriptions with their Naver Map links work in place.
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
    <div className="map-fullscreen" role="dialog" aria-modal="true" aria-label={title}>
      <iframe src={src} title={title} allowFullScreen />
      <button
        ref={closeRef}
        type="button"
        className="map-fullscreen-close"
        aria-label="Close map"
        onClick={onClose}
      >
        <IoClose aria-hidden="true" />
      </button>
    </div>
  );
}
