import { FaBlogger } from 'react-icons/fa6'
import Link from './Link'

// Header button right of the saved-paths icon, main page only: opens the blog's title list.
export default function BlogLink() {
  return (
    <Link to="/blog/" className="icon-button blog-button" aria-label="Blog" title="Blog">
      <FaBlogger aria-hidden="true" />
    </Link>
  )
}
