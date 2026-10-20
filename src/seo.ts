import { useEffect } from "react";

export const SITE_NAME = "My Travel Path";
const DEFAULT_DESCRIPTION =
  "Free walking routes for travellers in Korea: Seoul, Busan, Jeju and Incheon. Each path opens in Google My Maps, with Naver Map links for every stop.";

function setMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.content = content;
}

type Meta = { title?: string; description?: string; keywords?: string[] };

// Per-page <title>, description and keywords, so each route reads as its own
// page to search engines, link previews and the GoatCounter dashboard.
export function usePageMeta({ title, description, keywords }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const desc = description ?? DEFAULT_DESCRIPTION;
    document.title = fullTitle;
    setMeta('meta[name="description"]', { name: "description" }, desc);
    setMeta('meta[property="og:title"]', { property: "og:title" }, fullTitle);
    setMeta('meta[property="og:description"]', { property: "og:description" }, desc);
    setMeta('meta[name="twitter:title"]', { name: "twitter:title" }, fullTitle);
    setMeta('meta[name="twitter:description"]', { name: "twitter:description" }, desc);
    setMeta('meta[name="keywords"]', { name: "keywords" }, (keywords ?? []).join(", "));
  }, [title, description, keywords?.join(",")]);
}
