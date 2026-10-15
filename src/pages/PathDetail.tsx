import { useState } from "react";
import { FaBus, FaPaypal } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { ImInfo } from "react-icons/im";
import { MdOutlinePinDrop } from "react-icons/md";
import { Navigate, useParams } from "react-router-dom";
import CopyLink from "../components/CopyLink";
import Layout from "../components/Layout";
import ShareLink from "../components/ShareLink";
import Tags from "../components/Tags";
import { findCity, findPath, hasMap, mapEmbedUrl } from "../data/travel";
import { browserUrl, isIOS } from "../platform";

// The site owner's PayPal.Me link.
const DONATE_URL = "https://paypal.me/berlinersejin";

export default function PathDetail() {
  const { cityId, pathId } = useParams();
  const city = findCity(cityId);
  const path = findPath(cityId, pathId);
  // The embedded map starts behind a cover so that scrolling the page over it
  // does not pan the map instead. One tap hands control to the map.
  const [mapActive, setMapActive] = useState(false);

  if (!city || !path)
    return <Navigate to={city ? `/${city.id}` : "/"} replace />;

  const ready = hasMap(path);
  const embed = ready ? mapEmbedUrl(path) : undefined;

  return (
    <Layout title={path.name} subtitle={city.name} backTo={`/${city.id}`}>
      <article className={ready ? "card path-card" : "card path-card disabled"}>
        {path.image && (
          <span className="card-image path-image">
            <img
              src={`${import.meta.env.BASE_URL}${path.image}`}
              alt=""
              decoding="async"
            />
            {path.imageCredit && (
              <span className="credit">{path.imageCredit}</span>
            )}
          </span>
        )}
        <div className="card-body">
          <Tags tags={path.tags} duration={path.duration} />
          {path.description && <p className="card-desc">{path.description}</p>}
        </div>

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

        <div className="notice">
          <ImInfo className="notice-icon" aria-hidden="true" />
          <ul className="notice-list">
            <li className="warn">
              <b className="naver">Naver Map</b> is more accurate for navigation
              in Korea. Each location has the link.
            </li>
          </ul>
        </div>

        {ready ? (
          <>
            {isIOS() ? (
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
            <ShareLink title={`${path.name} (${city.name})`} />
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
    </Layout>
  );
}
