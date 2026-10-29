import { GrAnnounce } from "react-icons/gr";
import { useParams } from "react-router-dom";
import Link from "../components/Link";
import BrandMark from "../components/BrandMark";
import Layout from "../components/Layout";
import RichText from "../components/RichText";
import Tags from "../components/Tags";
import VisitorCount from "../components/VisitorCount";
import { cities, hasMap } from "../data/travel";
import { usePageMeta } from "../seo";

// The expanded city lives in the URL (/:cityId) so that coming back from a
// path's detail page lands on the list with that city still open.
export default function Home() {
  const { cityId } = useParams();
  usePageMeta();

  return (
    <Layout
      title="My Travel Path"
      titleImage="wordmark.png"
      icon={<BrandMark />}
      showBlog
    >
      <div className="notice">
        <GrAnnounce className="notice-icon announce" aria-hidden="true" />
        <ul className="notice-list">
          <li>Restaurant, café and event information is regularly updated.</li>
        </ul>
      </div>

      <VisitorCount />

      <ul className="list">
        {cities.map((city) => {
          const open = city.id === cityId;
          return (
            <li
              key={city.id}
              className={`group${open ? " open" : ""}${city.image ? " has-image" : ""}`}
            >
              {city.image && (
                <Link
                  to={open ? "/" : `/${city.id}`}
                  replace
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
                    {city.imageCredit && (
                      <span className="credit">{city.imageCredit}</span>
                    )}
                  </span>
                </Link>
              )}
              {/* The name row sticks under the page header while this city's paths scroll past. */}
              <Link
                to={open ? "/" : `/${city.id}`}
                replace
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
                </section>
              )}
            </li>
          );
        })}
      </ul>

      <img
        className="korea-map"
        src={`${import.meta.env.BASE_URL}korea-map.webp`}
        alt="Map of South Korea showing its provinces and major cities"
        width={724}
        height={960}
        decoding="async"
      />
    </Layout>
  );
}
