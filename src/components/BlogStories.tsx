import Emoji from "./Emoji";
import Link from "./Link";
import { posts } from "../data/blog";

// "Stories from our blog" at the end of a path page: up to three blog posts, newest first, that link to this walk
// with a `route` block. Nothing to register by hand: a new post with a route block appears here on its own.
// Nothing is shown when no post links to the walk.
export default function BlogStories({ cityId, pathId }: { cityId: string; pathId: string }) {
  const picks = posts
    .filter((post) => post.body.some((b) => b.type === "route" && b.cityId === cityId && b.pathId === pathId))
    .slice(0, 3);

  if (!picks.length) return null;
  return (
    <section className="more-walks blog-stories" aria-labelledby="blog-stories-title">
      <h2 id="blog-stories-title">Stories from our blog</h2>
      <ul>
        {picks.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.id}`} className="child">
              <span className="card-body">
                <span className="card-title">
                  {post.title} <Emoji name={post.icon} size={18} />
                </span>
                <span className="card-desc">{post.teaser}</span>
              </span>
              <span className="chevron">›</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
