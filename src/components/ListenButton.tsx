import { useEffect, useRef, useState } from "react";
import { FaStop, FaVolumeHigh } from "react-icons/fa6";
import { useHydrated } from "../hooks";

// Reads the page's story aloud with the device's own voice (Web Speech API): free, offline, no key.
// One utterance per paragraph so Stop is instant and iOS does not drop long texts.
const PREFERRED = [
  /siri/i, /samantha/i, /daniel/i, /karen/i, /moira/i, /google uk english/i, /google us english/i,
  /natural/i, /enhanced/i, /premium/i,
];

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  for (const re of PREFERRED) {
    const hit = voices.find((v) => re.test(v.name));
    if (hit) return hit;
  }
  return voices.find((v) => /en[-_]GB/i.test(v.lang)) ?? voices[0];
}

export default function ListenButton({ paragraphs }: { paragraphs: string[] }) {
  const hydrated = useHydrated();
  const [speaking, setSpeaking] = useState(false);
  const stopped = useRef(false);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  if (!hydrated || typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const stop = () => {
    stopped.current = true;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const start = () => {
    stopped.current = false;
    window.speechSynthesis.cancel();
    const voice = pickVoice();
    const queue = paragraphs.filter((p) => p.trim());
    queue.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.lang = voice?.lang ?? "en-GB";
      u.rate = 1;
      if (i === queue.length - 1) u.onend = () => { if (!stopped.current) setSpeaking(false); };
      u.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(u);
    });
    setSpeaking(true);
  };

  return (
    <button type="button" className="listen-btn" onClick={speaking ? stop : start} aria-pressed={speaking}>
      {speaking ? <FaStop aria-hidden="true" /> : <FaVolumeHigh aria-hidden="true" />}
      {speaking ? "Stop" : "Listen"}
    </button>
  );
}
