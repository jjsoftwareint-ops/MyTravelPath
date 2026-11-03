import { FaBlogger } from 'react-icons/fa6'
import Link from './Link'
import { useNewPosts } from '../newPosts'

// Header button right of the saved-paths icon, main page only: opens the blog's title list.
// A red count on the icon shows how many posts appeared since the visitor last opened the list.
export default function BlogLink() {
  const fresh = useNewPosts().length
  const label = fresh ? `Blog, ${fresh} new ${fresh === 1 ? 'story' : 'stories'}` : 'Blog'
  return (
    <Link to="/blog/" className="icon-button blog-button" aria-label={label} title={label}>
      <FaBlogger aria-hidden="true" />
      {fresh > 0 && (
        <span className="badge" aria-hidden="true">
          {fresh > 9 ? '9+' : fresh}
        </span>
      )}
    </Link>
  )
}
