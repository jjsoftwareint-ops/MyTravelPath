import Link from "./Link";
import Tags from "./Tags";
import { cities, hasMap, type Tag } from "../data/travel";

// Tags are compared by icon, not label ("Trekking", "Hiking" and "Fortress walk" share the hiking icon), and the
// wall-walk hiker counts as hiking.
const tagKey = (tag: Tag) => (typeof tag === "string" ? tag : tag.icon === "hiker" ? "hiking" : tag.icon);

// "More walks like this" at the end of a path page: up to three other walks, the ones that share a tag with this
// one first (Trekking leads to other Trekking walks, in any city), then the rest of the same city. Walks whose map
// is not ready yet are left out. Nothing is shown when there is no match.
export default function MoreWalks({ cityId, pathId }: { cityId: string; pathId: string }) {
  const here = cities.find((c) => c.id === cityId)?.paths.find((p) => p.id === pathId);
  if (!here) return null;
  const myTags = new Set((here.tags ?? []).map(tagKey));

  const picks = cities
    .flatMap((city, cityOrder) =>
      city.paths
        .filter((p) => hasMap(p) && !(city.id === cityId && p.id === pathId))
        .map((path, order) => {
          const shared = (path.tags ?? []).filter((t) => myTags.has(tagKey(t))).length;
          const score = (shared ? 2 : 0) + (city.id === cityId ? 1 : 0);
          return { city, path, score, rank: cityOrder * 1000 + order };
        }),
    )
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score || a.rank - b.rank)
    .slice(0, 3);

  if (!picks.length) return null;
  return (
    <section className="more-walks" aria-labelledby="more-walks-title">
      <h2 id="more-walks-title">More walks like this</h2>
      <ul>
        {picks.map(({ city, path }) => (
          <li key={`${city.id}/${path.id}`}>
            <Link to={`/${city.id}/${path.id}`} className="child">
              <span className="card-body">
                <span className="card-title">{path.name}</span>
                <span className="card-desc">{city.name}</span>
                <Tags tags={path.tags} duration={path.duration} />
              </span>
              <span className="chevron">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
