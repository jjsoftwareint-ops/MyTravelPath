import { Fragment } from "react";
import { imageSearchUrl } from "./ImagePopup";

// Tiny inline markup for guide text written in travel.ts:
//   **words**       → highlighted in the accent colour (bold)
//   {red:words}     → bold red, {blue:words} → bold blue: to name a coloured line on the map
//   [label](https://…)  → external link, opens in a new tab (https only; write ( ) in a URL as %28 %29)
//   [[Place]] or [[Place|search words]] → a place name; a tap opens its Google Images in a popup
//     (see ImagePopup). Search in Korean, city included, and add 카페 for a café, e.g.
//     [[Storage Incheon|스토리지 인천 카페]]: Korean results beat English ones for local places.
//     Without search words the English name is searched with the city in front ("Seoul Samcheong-dong").
//     Plain text when the caller passes no onPlace. With onPlace, a [label](Google Images URL) link
//     opens the same popup instead of a new tab.
// Emoji need no markup; put them straight in the string.
const TOKEN = /(\[\[[^\]|]+(?:\|[^\]]+)?\]\]|\*\*.+?\*\*|\{(?:red|blue):[^}]+\}|\[[^\]]+\]\(https:\/\/[^)\s]+\))/g;

// The search words of a Google Images link (https://www.google.com/search?tbm=isch&q=…), else null.
function googleImagesQuery(href: string) {
  try {
    const u = new URL(href);
    if (u.hostname !== "www.google.com" || u.pathname !== "/search" || u.searchParams.get("tbm") !== "isch") return null;
    return u.searchParams.get("q");
  } catch {
    return null;
  }
}

export default function RichText({
  text,
  city,
  onPlace,
}: {
  text: string;
  city?: string; // prefixed to a place's image search, unless the search already names it
  onPlace?: (query: string) => void;
}) {
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
        const place = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/.exec(part);
        if (place) {
          if (!onPlace) return <Fragment key={i}>{place[1]}</Fragment>;
          const words = place[2] ?? place[1].replace(/^The /, "");
          const query =
            city && !/[가-힣]/.test(words) && !words.toLowerCase().includes(city.toLowerCase())
              ? `${city} ${words}`
              : words;
          return (
            <a
              key={i}
              className="link"
              href={imageSearchUrl(query)}
              onClick={(e) => {
                e.preventDefault();
                onPlace(query);
              }}
            >
              {place[1]}
            </a>
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
          // A Google Images link in a blog post opens the popup too; modified clicks still open a tab.
          const imageQuery = onPlace ? googleImagesQuery(link[2]) : null;
          return (
            <a
              key={i}
              className="link"
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              onClick={
                imageQuery
                  ? (e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                      e.preventDefault();
                      onPlace?.(imageQuery);
                    }
                  : undefined
              }
            >
              {link[1]}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
