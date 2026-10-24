import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { blogUpdated, findPost, posts } from "./data/blog";
import { cities, findCity, findPath, hasMap } from "./data/travel";

// One source of truth for every page's <head>: used by the pre-render script at
// build time (renderHeadTags) and by the client on navigation (usePageMeta).

export const SITE_URL = "https://koreatravelpath.com";
export const SITE_NAME = "My Travel Path";
const HOME_TITLE = "My Travel Path – free walking routes in Korea";
const HOME_DESCRIPTION =
  "Free walking routes for travellers in Korea: Seoul, Busan, Jeju and Incheon. Each path opens in Google My Maps, with Naver Map links for every stop. No sign-up.";
const DEFAULT_IMAGE = `${SITE_URL}/og.jpg`;
const PUBLISHER = { "@type": "Organization", name: "JJ SOFTWARE", url: SITE_URL };

export type PageMeta = {
  path: string; // canonical path with trailing slash, e.g. "/seoul/hanok-villages/"
  title: string; // full <title>
  description: string;
  keywords: string[];
  image: string; // absolute URL, or "" for none
  type: "website" | "article";
  updated: string; // ISO date → sitemap lastmod / dateModified
  jsonLd: object;
};

// Static pages: title, description and the date their text last changed.
const STATIC: Record<string, { title: string; description: string; updated: string }> = {
  blog: {
    title: "Blog",
    description:
      "Short, honest stories about Korea: dessert queues, palace dates, hand-written letters and a few strong opinions.",
    updated: blogUpdated,
  },
  about: {
    title: "About",
    description:
      "Who makes My Travel Path, how the walking routes in Korea are built and checked, and how the site is funded.",
    updated: "2026-10-20",
  },
  contact: {
    title: "Contact",
    description: "Send a correction, a question or a new walk idea to My Travel Path by e-mail or on Threads.",
    updated: "2026-10-21",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How My Travel Path handles data: hosting, GoatCounter statistics, embedded Google maps, PayPal donations and Google AdSense advertising.",
    updated: "2026-10-22",
  },
  imprint: {
    title: "Imprint",
    description: "Legal notice and business registration of JJ SOFTWARE, publisher of My Travel Path.",
    updated: "2026-10-20",
  },
};

/** "/seoul", "/seoul/", "/seoul/index.html" → "/seoul/". */
export function normalizePath(pathname: string): string {
  let p = pathname.replace(/index\.html$/, "");
  if (!p.startsWith("/")) p = "/" + p;
  if (!p.endsWith("/")) p += "/";
  return p.replace(/\/{2,}/g, "/");
}

const latest = (dates: string[]) => dates.reduce((a, b) => (a > b ? a : b), "2026-10-11");

function crumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE_URL + it.path,
    })),
  };
}

function homeMeta(): PageMeta {
  return {
    path: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    keywords: ["KoreaTravel", "Seoul", "Busan", "Jeju", "Incheon", "WalkingRoutes", "NaverMap"],
    image: DEFAULT_IMAGE,
    type: "website",
    updated: latest(cities.flatMap((c) => c.paths.map((p) => p.updated))),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL + "/",
      description: HOME_DESCRIPTION,
      publisher: PUBLISHER,
    },
  };
}

/** Head data for any pathname, with or without a trailing slash. Unknown paths get the home meta. */
export function pageMeta(pathname: string): PageMeta {
  const path = normalizePath(pathname);
  const [a, b] = path.split("/").filter(Boolean);
  if (!a) return homeMeta();

  if (!b && STATIC[a]) {
    const s = STATIC[a];
    return {
      path,
      title: `${s.title} | ${SITE_NAME}`,
      description: s.description,
      keywords: [],
      image: a === "blog" ? "" : DEFAULT_IMAGE, // the blog list has no preview image
      type: "website",
      updated: s.updated,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: s.title,
        url: SITE_URL + path,
        description: s.description,
        publisher: PUBLISHER,
      },
    };
  }

  if (a === "blog" && b) {
    const post = findPost(b);
    if (post) {
      const image = DEFAULT_IMAGE;
      return {
        path,
        title: `${post.title} | ${SITE_NAME} Blog`,
        description: post.description,
        keywords: post.keywords,
        image,
        type: "article",
        updated: post.updated,
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            crumbs([
              { name: SITE_NAME, path: "/" },
              { name: "Blog", path: "/blog/" },
              { name: post.title, path },
            ]),
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              image,
              datePublished: post.date,
              dateModified: post.updated,
              mainEntityOfPage: SITE_URL + path,
              author: PUBLISHER,
              publisher: PUBLISHER,
              keywords: post.keywords.join(", "),
            },
          ],
        },
      };
    }
    return homeMeta();
  }

  const city = findCity(a);
  if (city && !b) {
    const description = `${city.paths.length} free walking routes in ${city.name}, Korea: ${city.paths
      .map((p) => p.name)
      .join(", ")}. Open in Google Maps and Naver Map.`;
    return {
      path,
      title: `Walking routes in ${city.name} | ${SITE_NAME}`,
      description,
      keywords: [city.name, "KoreaTravel", "WalkingRoutes"],
      image: city.image ? `${SITE_URL}/${city.image}` : DEFAULT_IMAGE,
      type: "website",
      updated: latest(city.paths.map((p) => p.updated)),
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          crumbs([
            { name: SITE_NAME, path: "/" },
            { name: city.name, path },
          ]),
          { "@type": "WebPage", name: `Walking routes in ${city.name}`, url: SITE_URL + path, description },
        ],
      },
    };
  }

  const p = city ? findPath(a, b) : undefined;
  if (city && p) {
    const description = p.description ?? HOME_DESCRIPTION;
    const image = p.image ? `${SITE_URL}/${p.image}` : DEFAULT_IMAGE;
    return {
      path,
      title: `${p.name} – ${city.name} | ${SITE_NAME}`,
      description,
      keywords: p.keywords ?? [],
      image,
      type: "article",
      updated: p.updated,
      jsonLd: {
        "@context": "https://schema.org",
        "@graph": [
          crumbs([
            { name: SITE_NAME, path: "/" },
            { name: city.name, path: `/${city.id}/` },
            { name: p.name, path },
          ]),
          {
            "@type": "Article",
            headline: `${p.name} – ${city.name}`,
            description,
            image,
            dateModified: p.updated,
            mainEntityOfPage: SITE_URL + path,
            author: PUBLISHER,
            publisher: PUBLISHER,
            keywords: (p.keywords ?? []).join(", "),
          },
        ],
      },
    };
  }

  return homeMeta();
}

/** Every page the build pre-renders: home, static pages, cities, paths. */
export function allRoutes(): PageMeta[] {
  const paths = ["/", ...Object.keys(STATIC).map((s) => `/${s}/`), ...posts.map((p) => `/blog/${p.id}/`)];
  for (const c of cities) {
    paths.push(`/${c.id}/`);
    for (const p of c.paths) paths.push(`/${c.id}/${p.id}/`);
  }
  return paths.map(pageMeta);
}

/** Paths still waiting for their map ("Map link coming soon"): thin pages, kept out of the sitemap. */
export function placeholderPaths(): Set<string> {
  const out = new Set<string>();
  for (const c of cities) for (const p of c.paths) if (!hasMap(p)) out.add(`/${c.id}/${p.id}/`);
  return out;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Static <head> tags for the pre-render script. */
export function renderHeadTags(m: PageMeta): string {
  const url = SITE_URL + m.path;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    m.keywords.length ? `<meta name="keywords" content="${esc(m.keywords.join(", "))}" />` : "",
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${m.type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    m.image ? `<meta property="og:image" content="${m.image}" />` : "",
    m.image === DEFAULT_IMAGE
      ? `<meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="Bukchon hanok rooftops with the Seoul skyline, and the My Travel Path icon" />`
      : "",
    `<meta name="twitter:card" content="${m.image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    m.image ? `<meta name="twitter:image" content="${m.image}" />` : "",
    `<script type="application/ld+json">${JSON.stringify(m.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}

// ── Client side: keep the head in step with the route after navigation ──

function setMeta(selector: string, attrs: Record<string, string>, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = pageMeta(pathname);
    const url = SITE_URL + m.path;
    document.title = m.title;
    setMeta('meta[name="description"]', { name: "description" }, m.description);
    setMeta('meta[name="keywords"]', { name: "keywords" }, m.keywords.join(", "));
    setLink("canonical", url);
    setMeta('meta[property="og:type"]', { property: "og:type" }, m.type);
    setMeta('meta[property="og:title"]', { property: "og:title" }, m.title);
    setMeta('meta[property="og:description"]', { property: "og:description" }, m.description);
    setMeta('meta[property="og:url"]', { property: "og:url" }, url);
    if (m.image) setMeta('meta[property="og:image"]', { property: "og:image" }, m.image);
    else document.head.querySelector('meta[property="og:image"]')?.remove();
    setMeta('meta[name="twitter:title"]', { name: "twitter:title" }, m.title);
    setMeta('meta[name="twitter:description"]', { name: "twitter:description" }, m.description);
    if (m.image) setMeta('meta[name="twitter:image"]', { name: "twitter:image" }, m.image);
    else document.head.querySelector('meta[name="twitter:image"]')?.remove();
    setMeta('meta[name="twitter:card"]', { name: "twitter:card" }, m.image ? "summary_large_image" : "summary");
    let ld = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(m.jsonLd);
  }, [pathname]);
}
