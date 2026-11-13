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
    // The map has its own zoom, so the page must not zoom while it is open: a pinch should move the
    // map, not blow up the whole overlay. Android honours the viewport limit; iOS Safari ignores
    // user-scalable and is stopped by cancelling its pinch gesture instead. The CSS (.map-fullscreen
    // touch-action) covers the rest. Everything is restored on close, so the page itself stays zoomable.
    const viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    const prevViewport = viewport?.getAttribute("content") ?? null;
    if (viewport && prevViewport)
      viewport.setAttribute("content", `${prevViewport}, maximum-scale=1, user-scalable=no`);
    const noPinch = (e: Event) => e.preventDefault();
    const noTwoFinger = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener("gesturestart", noPinch);
    document.addEventListener("gesturechange", noPinch);
    document.addEventListener("touchmove", noTwoFinger, { passive: false });
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      if (viewport && prevViewport) viewport.setAttribute("content", prevViewport);
      document.removeEventListener("gesturestart", noPinch);
      document.removeEventListener("gesturechange", noPinch);
      document.removeEventListener("touchmove", noTwoFinger);
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
