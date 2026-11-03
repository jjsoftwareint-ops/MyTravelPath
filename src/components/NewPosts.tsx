import { IoSparkles } from 'react-icons/io5'
import Link from './Link'
import { useNewPosts } from '../newPosts'

// Main page, under the notice: the newest post since the visitor's last look at the blog list,
// with a count of the others. Nothing for first-time visitors or once the list has been opened.
export default function NewPosts() {
  const fresh = useNewPosts()
  if (!fresh.length) return null
  const more = fresh.length - 1
  return (
    <Link to="/blog/" className="new-posts">
      <IoSparkles className="new-posts-icon" aria-hidden="true" />
      <span className="new-posts-text">
        <span className="new-posts-label">New since your last visit</span>
        <strong>{fresh[0].title}</strong>
        {more > 0 && (
          <span className="new-posts-more">
            and {more} more {more === 1 ? 'story' : 'stories'}
          </span>
        )}
      </span>
      <span className="new-posts-arrow" aria-hidden="true">
        ›
      </span>
    </Link>
  )
}
