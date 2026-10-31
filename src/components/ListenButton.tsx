import { useEffect, useRef, useState } from "react";
import { FaStop, FaVolumeHigh } from "react-icons/fa6";
import { useHydrated } from "../hooks";
import { isIOS } from "../platform";

// Reads the page's story aloud with the device's own voice (Web Speech API): free, offline, no key.
// Chrome quirks handled here: speak() right after cancel() is swallowed (so we wait a tick), queued
// utterances are dropped once unreferenced (so we keep the current one and chain the next on `onend`),
// and long utterances stop near 15 s (so paragraphs are split into sentence-sized chunks).
const PREFERRED = [
  /siri/i, /samantha/i, /daniel/i, /karen/i, /moira/i, /google uk english/i, /google us english/i,
  /natural/i, /enhanced/i, /premium/i,
];
const MAX_CHUNK = 220;

function chunk(paragraphs: string[]): string[] {
  const out: string[] = [];
  for (const p of paragraphs) {
    const sentences = p.match(/[^.!?]+[.!?]+["')\]]?|[^.!?]+$/g) ?? [p];
    let cur = "";
    for (const s of sentences) {
      const next = (cur + " " + s).trim();
      if (cur && next.length > MAX_CHUNK) { out.push(cur); cur = s.trim(); } else cur = next;
    }
    if (cur) out.push(cur);
  }
  return out.filter((c) => c.trim());
}

export default function ListenButton({ paragraphs }: { paragraphs: string[] }) {
  const hydrated = useHydrated();
  const [speaking, setSpeaking] = useState(false);
  const voices = useRef<SpeechSynthesisVoice[]>([]);
  const current = useRef<SpeechSynthesisUtterance | null>(null);
  const run = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const load = () => { voices.current = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!hydrated || typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const pickVoice = () => {
    const en = voices.current.filter((v) => /^en[-_]/i.test(v.lang));
    for (const re of PREFERRED) {
      const hit = en.find((v) => re.test(v.name));
      if (hit) return hit;
    }
    return en.find((v) => /en[-_]GB/i.test(v.lang)) ?? en[0];
  };

  const stop = () => {
    run.current += 1;
    current.current = null;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const start = () => {
    const id = ++run.current;
    const synth = window.speechSynthesis;
    const chunks = chunk(paragraphs);
    const voice = pickVoice();
    const speakAt = (i: number) => {
      if (id !== run.current) return;
      if (i >= chunks.length) { current.current = null; setSpeaking(false); return; }
      const u = new SpeechSynthesisUtterance(chunks[i]);
      if (voice) u.voice = voice;
      u.lang = voice?.lang ?? "en-GB";
      u.rate = 1;
      u.onstart = () => { if (id === run.current) setSpeaking(true); };
      u.onend = () => speakAt(i + 1);
      u.onerror = (e) => { if (e.error !== "interrupted" && e.error !== "canceled") stop(); };
      current.current = u;
      synth.speak(u);
      synth.resume();
    };
    // iOS only speaks when speak() runs inside the tap itself, so no deferral here.
    if (synth.speaking || synth.pending) synth.cancel();
    speakAt(0);
  };

  return (
    <span className="listen-wrap">
      <button type="button" className="listen-btn" onClick={speaking ? stop : start} aria-pressed={speaking}>
        {speaking ? <FaStop aria-hidden="true" /> : <FaVolumeHigh aria-hidden="true" />}
        {speaking ? "Stop" : "Listen"}
      </button>
      {speaking && isIOS() && (
        <span className="listen-hint">No sound? Check the silent switch on the side of your iPhone.</span>
      )}
    </span>
  );
}
