import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import Link from './Link'
import { bookmarkKey, postBookmarkKey, toggleBookmark, useBookmarks } from '../bookmarks'

// Header button left of the theme toggle: opens the list of saved paths and posts, with a count.
export function BookmarkLink() {
  const saved = useBookmarks()
  return (
    <Link to="/saved" className="icon-button bookmark-button" aria-label="Saved" title="Saved">
      <IoBookmarkOutline aria-hidden="true" />
      {saved.length > 0 && <span className="bookmark-count">{saved.length}</span>}
    </Link>
  )
}

// Save / remove toggle in the top right corner of a path page's header image.
export function BookmarkToggle({ cityId, pathId }: { cityId: string; pathId: string }) {
  const key = bookmarkKey(cityId, pathId)
  const on = useBookmarks().includes(key)
  const label = on ? 'Remove from saved paths' : 'Save this path'
  return (
    <button
      type="button"
      className="bookmark-toggle"
      onClick={() => toggleBookmark(key)}
      aria-label={label}
      aria-pressed={on}
      title={label}
    >
      {on ? <IoBookmark aria-hidden="true" /> : <IoBookmarkOutline aria-hidden="true" />}
    </button>
  )
}

// "Save" pill beside the date at the top of a blog post; the post then shows on the Saved page.
export function PostBookmarkToggle({ postId }: { postId: string }) {
  const key = postBookmarkKey(postId)
  const on = useBookmarks().includes(key)
  return (
    <button
      type="button"
      className="bookmark-toggle inline"
      onClick={() => toggleBookmark(key)}
      aria-pressed={on}
      title={on ? 'Remove from saved' : 'Save this post'}
    >
      {on ? <IoBookmark aria-hidden="true" /> : <IoBookmarkOutline aria-hidden="true" />}
      {on ? 'Saved' : 'Save'}
    </button>
  )
}
