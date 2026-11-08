import { useCallback, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { FaBus } from "react-icons/fa6";
import { IoFootstepsSharp } from "react-icons/io5";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { BookmarkToggle } from "../components/BookmarkButton";
import Emoji from "../components/Emoji";
import FollowTipDialog from "../components/FollowTipDialog";
import ImagePopup, { type PopupPage } from "../components/ImagePopup";
import InstallButton from "../components/InstallButton";
import RichText from "../components/RichText";
import Layout from "../components/Layout";
import MapOverlay from "../components/MapOverlay";
import MoreWalks from "../components/MoreWalks";
import ShareLink from "../components/ShareLink";
import SocialLinks from "../components/SocialLinks";
import Tags from "../components/Tags";
import { findCity, findPath, hasMap, mapEmbedUrl } from "../data/travel";
import { formatDate } from "../dates";
import { useFollowTipHidden } from "../followTip";
import { emojiFile, splitLeadingEmoji } from "../emoji";
import { browserUrl, isIOS } from "../platform";
import { useHydrated } from "../hooks";
import { usePageMeta } from "../seo";

// A guide line (intro paragraph, route step or tip) with its native leading emoji swapped for the
// matching flat OpenMoji icon (site rule 2026-10-30: flat icons everywhere, not just the blog).
function GuideLine({
  text,
  city,
  onPlace,
  onLink,
}: {
  text: string;
  city?: string;
  onPlace?: (query: string) => void;
  onLink?: (page: PopupPage) => void;
}) {
  const { icon, rest } = splitLeadingEmoji(text);
  return (
    <>
      {icon && <Emoji name={icon} className="guide-emoji" />}
      <RichText text={rest} city={city} onPlace={onPlace} onLink={onLink} />
    </>
  );
}

export default function PathDetail() {
  const { cityId, pathId } = useParams();
  // Opened from a blog post? The back button returns there (the post passes its own URL in the link state).
  const from = (useLocation().state as { from?: string } | null)?.from;
  const backTo = from?.startsWith("/blog/") ? from : undefined;
  const city = findCity(cityId);
  const path = findPath(cityId, pathId);
  // The small map is only a preview: a cover blocks every touch and scroll on it (visitors kept
  // trying to pan it in place), and a tap on it, like "To the point & Location", opens the whole
  // My Map full screen instead of opening a new tab.
  const [mapOpen, setMapOpen] = useState(false);
  const closeMap = useCallback(() => setMapOpen(false), []);
  // A place name in "The Locations" opens its Google Images in a popup (the search words, or null).
  // Outside links in the guide (src/framing.ts) open in the same popup.
  const [popup, setPopup] = useState<PopupPage | null>(null);
  const closePopup = useCallback(() => setPopup(null), []);
  const setPlaceQuery = useCallback((query: string) => setPopup({ query }), []);
  // iPhone tip before "To follow the path", unless the visitor chose not to see it again.
  const [tipOpen, setTipOpen] = useState(false);
  const closeTip = useCallback(() => setTipOpen(false), []);
  const tipHidden = useFollowTipHidden();
  // Folded part of the page: History ("Read more"). The Locations list and the notices stay open.
  const [historyOpen, setHistoryOpen] = useState(false);
  usePageMeta();
  // The iOS two-button variant only after hydration (see hooks.ts).
  const hydrated = useHydrated();

  if (!city || !path)
    return <Navigate to={city ? `/${city.id}` : "/"} replace />;

  const ready = hasMap(path);
  const embed = ready ? mapEmbedUrl(path) : undefined;
  // Notices stay in one block above the map, urgent ones (closures, cancellations) first, the rest in their written order.
  const urgent = (n: { icon?: string; title: string }) =>
    ["🚫", "🚧", "🔥", "🔦"].includes(n.icon ?? "") ||
    /clos|skipp|no sailings|no longer|no lighting/i.test(n.title);
  const notices = [
    ...(path.notices?.filter(urgent) ?? []),
    ...(path.notices?.filter((n) => !urgent(n)) ?? []),
  ];
  // History: a few lines show, the rest unfolds. A short history needs no fold.
  const foldHistory = (path.story?.text.join(" ").length ?? 0) > 260;
  // Jump links at the top; each target is also reachable by scrolling.
  const jump =
    (id: string, unfold?: () => void) =>
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      unfold?.();
      requestAnimationFrame(() =>
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    };
  // A notice is one line (icon + headline) that opens on tap: a TL;DR first (user, 2026-11-02). The full text stays
  // in the page whether or not it is open.
  const noticeItem = (n: NonNullable<typeof path.notices>[number]) => (
    <li
      key={n.title}
      className={urgent(n) ? "notice-card urgent" : "notice-card"}
    >
      <details>
        <summary>
          <span className="notice-card-icon" aria-hidden="true">
            <Emoji
              name={emojiFile(n.icon ?? "ℹ️") ?? "information"}
              size={20}
            />
          </span>
          <strong className="notice-card-title">{n.title}</strong>
        </summary>
        <div className="notice-card-body">
          <p>
            <RichText text={n.body} onLink={setPopup} />
          </p>
          {n.since && <small>{n.since}</small>}
        </div>
      </details>
    </li>
  );
  // Information boxes: the general ones sit right under "The Locations" title; a box tied to one place (its `at` phrase is
  // in that location's line) sits under that location. A page without a route list shows them all in one block.
  const route = path.guide?.route ?? [];
  const placeOf = (n: { at?: string }) =>
    n.at ? route.findIndex((step) => step.includes(n.at as string)) : -1;
  const overallNotices = notices.filter((n) => placeOf(n) < 0);
  const noticeList = (list: typeof notices) =>
    list.length > 0 && (
      <ul className="notices" aria-label="Important information">
        {list.map(noticeItem)}
      </ul>
    );
  const noticesBlock = noticeList(overallNotices);
  const noticesAt = (i: number) =>
    noticeList(notices.filter((n) => placeOf(n) === i));
  const hasMapBlock = Boolean(embed || path.screenshot);
  const chips = [
    hasMapBlock && { id: "path-map", label: "Map", unfold: undefined },
    path.story && {
      id: "history",
      label: "History",
      unfold: () => setHistoryOpen(true),
    },
    (path.guide?.route || path.guide?.groups) && {
      id: "locations",
      label: "Locations",
      unfold: undefined,
    },
    path.guide?.tips && {
      id: "tips",
      label: "Good to know",
      unfold: undefined,
    },
  ].filter(Boolean) as { id: string; label: string; unfold?: () => void }[];
  // YouTube live stream: under the map by default, above it when the path asks for it. Live cams always start muted.
  const liveCam = path.liveCam && (
    <figure className="live-cam">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${path.liveCam.videoId}?mute=1`}
        title={`${path.name} live cam`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="picture-in-picture; fullscreen"
        allowFullScreen
      />
      <figcaption>{path.liveCam.caption}</figcaption>
    </figure>
  );

  return (
    <Layout
      title={path.name}
      subtitle={city.name}
      backTo={backTo ?? `/${city.id}`}
      hideSaved
      actions={<ShareLink compact title={`${path.name} (${city.name})`} />}
    >
      <div className={path.guide ? "path-layout" : "path-layout solo"}>
        <article
          className={ready ? "card path-card" : "card path-card disabled"}
        >
          <BookmarkToggle cityId={city.id} pathId={path.id} />
          {path.image && (
            <span
              className={
                path.imageWhole
                  ? "card-image path-image whole"
                  : "card-image path-image"
              }
            >
              <img
                src={`${import.meta.env.BASE_URL}${path.image}`}
                alt=""
                decoding="async"
              />
            </span>
          )}
          <div className="card-body">
            <div className="meta-row">
              <Tags tags={path.tags} duration={path.duration} />
              <time className="updated" dateTime={path.updated}>
                Updated {formatDate(path.updated)}
              </time>
            </div>
            {path.description && (
              <p className="card-desc">
                <RichText text={path.description} onLink={setPopup} />
              </p>
            )}
          </div>

          {path.whyVisit && (
            <section className="path-why" aria-labelledby="why-visit-title">
              <h2 id="why-visit-title">
                <Emoji name="star" size={20} /> What makes it worth a visit
              </h2>
              {path.whyVisit.map((text) => (
                <p key={text}>
                  <GuideLine text={text} />
                </p>
              ))}
            </section>
          )}

          {chips.length >= 3 && (
            <nav className="path-jump" aria-label="On this page">
              {chips.map((c) => (
                <a key={c.id} href={`#${c.id}`} onClick={jump(c.id, c.unfold)}>
                  {c.label}
                </a>
              ))}
            </nav>
          )}

          {!path.guide && noticesBlock}

          {path.liveCam?.above && liveCam}

          {embed && (
            <div className="map" id="path-map">
              <iframe
                src={embed}
                title={`${path.name} map`}
                loading="lazy"
                tabIndex={-1}
              />
              <button
                type="button"
                className="map-cover"
                aria-label={`Open the ${path.name} map full screen`}
                onClick={() => setMapOpen(true)}
              >
                <span>Tap to open the full map</span>
              </button>
            </div>
          )}

          {path.screenshot && (
            <figure className="map-shot" id={embed ? undefined : "path-map"}>
              <img
                src={`${import.meta.env.BASE_URL}${path.screenshot}`}
                alt={`${path.name} trail map`}
                loading="lazy"
                decoding="async"
              />
              {path.screenshotCaption && (
                <figcaption>{path.screenshotCaption}</figcaption>
              )}
            </figure>
          )}

          {!path.liveCam?.above && liveCam}

          {ready ? (
            <>
              {hydrated && isIOS() ? (
                <>
                  {/* iPhone/iPad: the Google Maps app follows the route well but shows the
                    Naver Map links in pin descriptions as plain text, so a second button
                    shows the same map full screen in the page (new Safari tab only as fallback, see platform.ts). */}
                  {tipHidden ? (
                    <a
                      href={path.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta"
                    >
                      To follow the path
                      <IoFootstepsSharp
                        className="cta-icon"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="cta"
                      onClick={() => setTipOpen(true)}
                    >
                      To follow the path
                      <IoFootstepsSharp
                        className="cta-icon"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                  {embed ? (
                    <button
                      type="button"
                      className="cta secondary"
                      onClick={() => setMapOpen(true)}
                    >
                      To the point
                      <FaBus className="cta-icon" aria-hidden="true" />
                      &amp; Location
                      <FaInfoCircle className="cta-icon" aria-hidden="true" />
                    </button>
                  ) : (
                    <a
                      href={browserUrl(path.mapUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta secondary"
                    >
                      To the point
                      <FaBus className="cta-icon" aria-hidden="true" />
                      &amp; Location
                      <FaInfoCircle className="cta-icon" aria-hidden="true" />
                    </a>
                  )}
                </>
              ) : (
                <a
                  href={path.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta"
                >
                  Open in Google Maps ↗
                </a>
              )}
            </>
          ) : (
            <span className="cta">Map link coming soon</span>
          )}
        </article>

        {(path.story || path.guide) && (
          <div className="path-side">
            {path.guide && (
              <section className="guide" aria-labelledby="guide-title">
                <h2 id="guide-title">
                  <Emoji name="sparkles" size={26} /> About this walk
                </h2>
                <div className="talk-bubbles">
                  {path.guide.intro.map((text, i) => {
                    // The avatar is the line's own leading emoji (a wave for a coast, a surfer for a surf town,
                    // a train for a rail bike), moved out of the text; the first bubble falls back to a walker.
                    const { icon, rest } = splitLeadingEmoji(text);
                    const avatar =
                      icon ?? (i === 0 ? "person_walking" : undefined);
                    return (
                      <div className="talk-bubble-row" key={text}>
                        <span className="talk-avatar" aria-hidden="true">
                          {avatar && <Emoji name={avatar} size={26} />}
                        </span>
                        <p className="talk-bubble">
                          <RichText text={rest} onLink={setPopup} />
                        </p>
                      </div>
                    );
                  })}
                </div>
                {!path.guide.route && !path.guide.groups && noticesBlock}
                {path.guide.groups && (
                  <>
                    <h3 id="locations">
                      <Emoji name="round_pushpin" size={20} /> The Locations
                    </h3>
                    {noticesBlock}
                    {path.guide.groups.map((group) => (
                      <section className="place-group" key={group.title}>
                        <h4>{group.title}</h4>
                        <ul>
                          {group.places.map((place) => (
                            <li key={place}>
                              <GuideLine
                                text={place}
                                onPlace={setPlaceQuery}
                                onLink={setPopup}
                              />
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </>
                )}
                {path.guide.route && (
                  <>
                    <h3 id="locations">
                      <Emoji name="round_pushpin" size={20} /> The Locations
                    </h3>
                    {noticesBlock}
                    <ol id="locations-list">
                      {path.guide.route.map((step, i) => (
                        <li key={step}>
                          <GuideLine
                            text={step}
                            city={
                              city.theme
                                ? undefined
                                : city.name.replace(/-do$/, "")
                            }
                            onPlace={setPlaceQuery}
                            onLink={setPopup}
                          />
                          {noticesAt(i)}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
                {path.guide.tips && (
                  <>
                    <h3 id="tips">
                      <Emoji name="light_bulb" size={20} /> Good to know
                    </h3>
                    <ul>
                      {path.guide.tips.map((tip) => (
                        <li key={tip}>
                          <GuideLine text={tip} />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {path.keywords && (
                  <ul className="hashtags" aria-label="Tags">
                    {path.keywords.map((k) => (
                      <li key={k}>#{k}</li>
                    ))}
                  </ul>
                )}
                {path.imageCredit && (
                  <p className="photo-credit">{path.imageCredit}</p>
                )}
              </section>
            )}

            {path.story && (
              <section
                className="path-story"
                id="history"
                aria-labelledby="history-title"
              >
                <h2 id="history-title">
                  <Emoji name="classical_building" size={20} /> History
                </h2>
                <h3>{path.story.title}</h3>
                <div
                  id="history-text"
                  className={foldHistory && !historyOpen ? "fold" : undefined}
                >
                  {path.story.text.map((text) => (
                    <p key={text}>
                      <GuideLine text={text} />
                    </p>
                  ))}
                </div>
                {foldHistory && (
                  <button
                    type="button"
                    className="show-all"
                    aria-expanded={historyOpen}
                    aria-controls="history-text"
                    onClick={() => setHistoryOpen((o) => !o)}
                  >
                    {historyOpen ? "Show less" : "Read more"}
                  </button>
                )}
              </section>
            )}
            <MoreWalks cityId={city.id} pathId={path.id} />
            <SocialLinks />
          </div>
        )}
      </div>
      {tipOpen && <FollowTipDialog url={path.mapUrl} onClose={closeTip} />}
      {mapOpen && embed && (
        <MapOverlay src={embed} title={`${path.name} map`} onClose={closeMap} />
      )}
      {popup && <ImagePopup {...popup} onClose={closePopup} />}
      <InstallButton />
    </Layout>
  );
}
