import { Fragment } from "react";

// Tiny inline markup for guide text written in travel.ts:
//   **words**       → highlighted in the accent colour (bold)
//   {red:words}     → bold red, {blue:words} → bold blue: to name a coloured line on the map
//   [label](https://…)  → external link, opens in a new tab (https only; write ( ) in a URL as %28 %29)
// Emoji need no markup; put them straight in the string.
const TOKEN = /(\*\*.+?\*\*|\{(?:red|blue):[^}]+\}|\[[^\]]+\]\(https:\/\/[^)\s]+\))/g;

export default function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="hl">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const colour = /^\{(red|blue):([^}]+)\}$/.exec(part);
        if (colour) {
          return (
            <strong key={i} className={colour[1] === "red" ? "hl hl-red" : "hl"}>
              {colour[2]}
            </strong>
          );
        }
        const link = /^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/.exec(part);
        if (link) {
          return (
            <a key={i} className="link" href={link[2]} target="_blank" rel="noopener noreferrer">
              {link[1]}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
