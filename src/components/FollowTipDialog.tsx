import { useEffect, useState } from "react";
import { hideFollowTip } from "../followTip";

// Shown on iPhone/iPad before "To follow the path" opens the Google Maps app: if the app shows
// no locations, the map has to be opened in Google Maps first.
export default function FollowTipDialog({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const proceed = () => {
    if (hide) hideFollowTip();
    onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Before you follow the path"
        onClick={(e) => e.stopPropagation()}
      >
        <p>
          Open <b>Google Maps</b> first <u>when you don't see the locations</u>.
        </p>
        <label className="dialog-check">
          <input
            type="checkbox"
            checked={hide}
            onChange={(e) => setHide(e.target.checked)}
          />
          Don't show it again
        </label>
        <div className="dialog-actions">
          <button type="button" className="dialog-cancel" onClick={onClose}>
            Cancel
          </button>
          {/* A real link, so the tap opens the Google Maps app like the button did before. */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
            onClick={proceed}
          >
            Continue
          </a>
        </div>
      </div>
    </div>
  );
}
