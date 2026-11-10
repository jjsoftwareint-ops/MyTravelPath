import { useEffect, useState, type MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Link, { withSlash } from "../components/Link";
import BrandMark from "../components/BrandMark";
import Layout from "../components/Layout";
import RichText from "../components/RichText";
import Tags from "../components/Tags";
import NewPosts from "../components/NewPosts";
import LatestPosts from "../components/LatestPosts";
import SocialLinks from "../components/SocialLinks";
import VisitorCount from "../components/VisitorCount";
import WeekCard from "../components/WeekCard";
import { cities, hasMap } from "../data/travel";
import { eventCount, todayInSeoul } from "../data/thisWeek";
import { FaCalendarDays } from "react-icons/fa6";
import { useHydrated } from "../hooks";
import { usePageMeta } from "../seo";

// The city opened last lives in the URL (/:cityId), so its page has its own address and coming back from a
// path's detail page lands on the list with that city still open. Several cards can be open at once: the
// others are kept in this tab's sessionStorage, so they stay open too when the visitor comes back.
const OPEN_KEY = "openCities";

export default function Home() {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [extra, setExtra] = useState<string[]>([]);
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(OPEN_KEY) || "[]");
      if (Array.isArray(saved)) setExtra(saved.filter((id) => cities.some((c) => c.id === id)));
    } catch {
      /* storage blocked: only the URL city opens */
    }
  }, []);
  const saveExtra = (ids: string[]) => {
    setExtra(ids);
    try {
      sessionStorage.setItem(OPEN_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  };
  // Opening a card keeps the others open; closing one closes only that one.
  const toggle = (e: MouseEvent, id: string) => {
    e.preventDefault();
    if (id === cityId) {
      navigate("/", { replace: true });
      return;
    }
    if (extra.includes(id)) {
      saveExtra(extra.filter((x) => x !== id));
      return;
    }
    saveExtra(cityId ? [...extra.filter((x) => x !== cityId && x !== id), cityId] : extra);
    navigate(withSlash(`/${id}`), { replace: true });
  };
  usePageMeta();
  const [mapOpen, setMapOpen] = useState(false);
  // Event counts on the city cards: finished events drop out by date once hydrated.
  const hydrated = useHydrated();
  const today = hydrated ? todayInSeoul() : undefined;
  const events = (cityId: string) => eventCount(cityId, today);

  useEffect(() => {
    if (!mapOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMapOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mapOpen]);

  return (
    <Layout
      title="My Travel Path"
      titleImage="wordmark.png"
      icon={<BrandMark />}
      showBlog
    >
      <WeekCard />

      <NewPosts />

      <LatestPosts />

      <VisitorCount />

      <ul className="list">
        {cities.map((city) => {
          const open = city.id === cityId || extra.includes(city.id);
          return (
            <li
              key={city.id}
              className={`group${open ? " open" : ""}${city.image ? " has-image" : ""}`}
            >
              {city.image && (
                <Link
                  to={open ? "/" : `/${city.id}`}
                  replace
                  onClick={(e) => toggle(e, city.id)}
                  className="card group-head"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <span className={city.imageWhole ? "card-image whole" : "card-image"}>
                    <img
                      src={`${import.meta.env.BASE_URL}${city.image}`}
                      alt=""
                      decoding="async"
                    />
                  </span>
                </Link>
              )}
              {city.image && !city.theme && (
                // Over the photo's top right corner: this city's events from /this-week/.
                <Link
                  to={`/this-week/?city=${city.id}`}
                  className="city-events"
                  aria-label={
                    events(city.id) > 0
                      ? `Events in ${city.name}: ${events(city.id)}`
                      : `Events in ${city.name}`
                  }
                  title={`Events in ${city.name}`}
                >
                  <FaCalendarDays aria-hidden="true" />
                  {events(city.id) > 0 && (
                    <span className="city-events-count" aria-hidden="true">
                      {events(city.id)}
                    </span>
                  )}
                </Link>
              )}
              {/* The name row sticks under the page header while this city's paths scroll past. */}
              <Link
                to={open ? "/" : `/${city.id}`}
                replace
                onClick={(e) => toggle(e, city.id)}
                className="group-row"
                aria-expanded={open}
              >
                <span className="card-body">
                  <span className="card-title">{city.name}</span>
                  <span className="card-meta">
                    {city.paths.length}{" "}
                    {city.paths.length === 1 ? "path" : "paths"}
                  </span>
                </span>
                <span className="chevron caret">›</span>
              </Link>
              {open && (
                <ul className={`sublist${city.intro ? " has-intro" : ""}`}>
                  {city.paths.map((path) => (
                    <li key={path.id}>
                      <Link to={`/${city.id}/${path.id}`} className="child">
                        <span className="card-body">
                          <span className="card-title">{path.name}</span>
                          <Tags tags={path.tags} duration={path.duration} soon={!hasMap(path)} />
                        </span>
                        <span className="chevron">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {open && city.intro && (
                <section className="city-intro" aria-label={city.theme ? "About these routes" : `About ${city.name}`}>
                  <h3>{city.theme ? "About these routes" : `About ${city.name}`}</h3>
                  {city.intro.map((para, i) => (
                    <p key={i}>
                      <RichText text={para} />
                    </p>
                  ))}
                  {city.imageCredit && (
                    <p className="photo-credit">{city.imageCredit}</p>
                  )}
                </section>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="korea-map-trigger"
        onClick={() => setMapOpen(true)}
        aria-label="View full-size map of South Korea"
      >
        <img
          className="korea-map"
          src={`${import.meta.env.BASE_URL}korea-map.webp`}
          alt="Map of South Korea showing its provinces and major cities"
          width={724}
          height={960}
          decoding="async"
        />
      </button>

      <SocialLinks />

      {mapOpen && (
        <div
          className="map-overlay"
          onClick={() => setMapOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Close map"
        >
          <img
            className="map-overlay-image"
            src={`${import.meta.env.BASE_URL}korea-map.webp`}
            alt="Map of South Korea showing its provinces and major cities"
            decoding="async"
          />
        </div>
      )}
    </Layout>
  );
}
