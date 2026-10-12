import { useState } from "react";
import { ImInfo } from "react-icons/im";
import { Navigate, useParams } from "react-router-dom";
import CopyLink from "../components/CopyLink";
import Layout from "../components/Layout";
import Tags from "../components/Tags";
import { findCity, findPath, hasMap, mapEmbedUrl } from "../data/travel";
import { browserUrl, isIOS } from "../platform";

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
            {/* iPhone/iPad: the Safari-only scheme (see platform.ts) opens the map in a
                new Safari tab instead of the Google Maps app, which shows the
                Naver Map links in descriptions as plain text. */}
            <a
              href={isIOS() ? browserUrl(path.mapUrl) : path.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta"
            >
              Open in Google Maps ↗
            </a>
            <CopyLink url={path.mapUrl} />
          </>
        ) : (
          <span className="cta">Map link coming soon</span>
        )}
      </article>
    </Layout>
  );
}
