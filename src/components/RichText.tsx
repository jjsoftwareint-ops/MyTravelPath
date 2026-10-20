import { Fragment } from "react";

// Tiny inline markup for guide text written in travel.ts:
//   **words**  → highlighted in the accent colour (bold)
// Emoji need no markup; put them straight in the string.
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="hl">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
