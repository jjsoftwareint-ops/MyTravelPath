import type { Tag } from '../data/travel'
import TagIcon from './TagIcon'

// Pills for a path's tags and duration, used in list rows and on the detail page.
export default function Tags({ tags, duration }: { tags?: Tag[]; duration?: string }) {
  if (!tags?.length && !duration) return null
  return (
    <span className="card-meta">
      {tags?.map((tag) =>
        typeof tag === 'string' ? (
          <span key={tag} className="pill tag">
            {tag}
          </span>
        ) : (
          <span key={tag.label} className="pill tag">
            <TagIcon name={tag.icon} />
            {tag.label}
          </span>
        ),
      )}
      {duration && <span className="pill">{duration}</span>}
    </span>
  )
}
