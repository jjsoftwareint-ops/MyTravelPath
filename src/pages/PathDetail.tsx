import { useState } from "react";
import { ImInfo } from "react-icons/im";
import { Navigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Tags from "../components/Tags";
import { findCity, findPath, hasMap, mapEmbedUrl } from "../data/travel";
import { browserUrl, isIOS, isPhone } from "../platform";

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
      <div className="notice">
        <ImInfo className="notice-icon" aria-hidden="true" />
        <ul className="notice-list">
          <li>
            Please open Google Maps first in case the path is not visible.
          </li>
          <li>
            <b>Naver Map</b> is more accurate in Korea. Each location has a
            Naver Map link.
          </li>
          {isIOS() && (
            <li>
              Use “Open with a browser” below to open the <b>Naver Map</b>{" "}
              links.
            </li>
          )}
        </ul>
      </div>

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

        {ready ? (
          <>
            <a
              href={path.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta"
            >
              Open in Google Maps ↗
            </a>
            {isPhone() && (
              <a href={browserUrl(path.mapUrl)} className="cta secondary">
                Open with a browser ↗
              </a>
            )}
          </>
        ) : (
          <span className="cta">Map link coming soon</span>
        )}
      </article>
    </Layout>
  );
}
