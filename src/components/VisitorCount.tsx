import { useEffect, useState } from "react";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { GOATCOUNTER_SITE } from "./Analytics";

// Unique visitors across the whole site, from GoatCounter's public counter.
// Needs "Allow adding visitor counts on your website" in the GoatCounter
// settings; until then (or offline) nothing is rendered.
export default function VisitorCount() {
  const [count, setCount] = useState<string>();

  useEffect(() => {
    if (!GOATCOUNTER_SITE) return;
    fetch(`https://${GOATCOUNTER_SITE}.goatcounter.com/counter/TOTAL.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { count_unique?: string }) => setCount(d.count_unique))
      .catch(() => {});
  }, []);

  if (!count) return null;
  return (
    <p className="visitors">
      <FaPersonWalkingLuggage aria-hidden="true" />
      <b>{count}</b> visited my travel path
    </p>
  );
}
