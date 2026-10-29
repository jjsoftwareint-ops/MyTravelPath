import { useState } from "react";
import { FaBus, FaPaypal } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { ImInfo } from "react-icons/im";
import { MdOutlinePinDrop } from "react-icons/md";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { BookmarkToggle } from "../components/BookmarkButton";
import CopyLink from "../components/CopyLink";
import RichText from "../components/RichText";
import Layout from "../components/Layout";
import ShareLink from "../components/ShareLink";
import Tags from "../components/Tags";
import { findCity, findPath, hasMap, mapEmbedUrl } from "../data/travel";
import { formatDate } from "../dates";
import { browserUrl, isIOS, isPhone, NAVER_MAP_STORE } from "../platform";
import { useHydrated } from "../hooks";
import { usePageMeta } from "../seo";

// The site owner's PayPal.Me link.
const DONATE_URL = "https://paypal.me/berlinersejin";

export default function PathDetail() {
  const { cityId, pathId } = useParams();
  // Opened from a blog post? The back button returns there (the post passes its own URL in the link state).
  const from = (useLocation().state as { from?: string } | null)?.from;
  const backTo = from?.startsWith("/blog/") ? from : undefined;
  const city = findCity(cityId);
  const path = findPath(cityId, pathId);
  // The embedded map starts behind a cover so that scrolling the page over it
  // does not pan the map instead. One tap hands control to the map.
  const [mapActive, setMapActive] = useState(false);
  usePageMeta();
  // The iOS two-button variant only after hydration (see hooks.ts).
  const hydrated = useHydrated();

  if (!city || !path)
    return <Navigate to={city ? `/${city.id}` : "/"} replace />;

  const ready = hasMap(path);
  const embed = ready ? mapEmbedUrl(path) : undefined;
  // YouTube live stream: under the map by default, above it when the path asks for it.
  const liveCam = path.liveCam && (
    <figure className="live-cam">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${path.liveCam.videoId}`}
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
              <p className="card-desc">{path.description}</p>
            )}
          </div>

          {path.story && (
            <section className="path-story" aria-label={path.story.title}>
              <h2>{path.story.title}</h2>
              {path.story.text.map((text) => (
                <p key={text}>
                  <RichText text={text} />
                </p>
              ))}
            </section>
          )}

          {path.notices && (
            <ul className="notices" aria-label="Important information">
              {path.notices.map((n) => (
                <li key={n.title} className="notice-card">
                  <span className="notice-card-icon" aria-hidden="true">
                    {n.icon ?? "ℹ️"}
                  </span>
                  <div>
                    <strong className="notice-card-title">{n.title}</strong>
                    <p>
                      <RichText text={n.body} />
                    </p>
                    {n.since && <small>{n.since}</small>}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {path.liveCam?.above && liveCam}

          {embed && (
            <div className="map">
              <iframe
                src={embed}
                title={`${path.name} map`}
                loading="lazy"
                allowFullScreen
              />
              {!mapActive && (
                <button
                  type="button"
                  className="map-cover"
                  onClick={() => setMapActive(true)}
                >
                  <span>Tap to explore the map</span>
                </button>
              )}
            </div>
          )}

          {path.screenshot && (
            <figure className="map-shot">
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

          <div className="notice">
            <ImInfo className="notice-icon" aria-hidden="true" />
            <ul className="notice-list">
              <li className="warn">
                <b className="naver">Naver Map</b> is more accurate to get to
                destinations. Each location has the link.
                {hydrated && isPhone() && (
                  <>
                    {" "}
                    <a
                      className="link"
                      href={NAVER_MAP_STORE[isIOS() ? "ios" : "android"]}
                    >
                      {isIOS()
                        ? "Get it on the App Store ↗"
                        : "Get it on Google Play ↗"}
                    </a>
                  </>
                )}
              </li>
            </ul>
          </div>

          {ready ? (
            <>
              {hydrated && isIOS() ? (
                <>
                  {/* iPhone/iPad: the Google Maps app follows the route well but shows the
                    Naver Map links in pin descriptions as plain text, so a second button
                    opens the same map in a new Safari tab (see platform.ts). */}
                  <a
                    href={path.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta"
                  >
                    To follow the path
                    <GiPathDistance
                      className="cta-icon bold"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href={browserUrl(path.mapUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta secondary"
                  >
                    To the point
                    <MdOutlinePinDrop className="cta-icon" aria-hidden="true" />
                    <FaBus className="cta-icon" aria-hidden="true" />
                    &amp; Location
                    <ImInfo className="cta-icon" aria-hidden="true" />
                  </a>
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
              <CopyLink url={path.mapUrl} />
              <a
                className="donate"
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPaypal aria-hidden="true" /> Would you like to buy me a ☕️?
              </a>
            </>
          ) : (
            <span className="cta">Map link coming soon</span>
          )}
        </article>

        {path.guide && (
          <section className="guide" aria-labelledby="guide-title">
            <h2 id="guide-title">✨ About this walk</h2>
            {path.guide.intro.map((text) => (
              <p key={text}>
                <RichText text={text} />
              </p>
            ))}
            {path.imageCredit && (
              <p className="photo-credit">{path.imageCredit}</p>
            )}
            {path.guide.route && (
              <>
                <h3>🚶 The route</h3>
                <ol>
                  {path.guide.route.map((step) => (
                    <li key={step}>
                      <RichText text={step} />
                    </li>
                  ))}
                </ol>
              </>
            )}
            {path.guide.tips && (
              <>
                <h3>💡 Good to know</h3>
                <ul>
                  {path.guide.tips.map((tip) => (
                    <li key={tip}>
                      <RichText text={tip} />
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
          </section>
        )}
      </div>
    </Layout>
  );
}
