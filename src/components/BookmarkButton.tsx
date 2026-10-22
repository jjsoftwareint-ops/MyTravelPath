import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { bookmarkKey, toggleBookmark, useBookmarks } from '../bookmarks'

// Header button left of the theme toggle: opens the list of saved paths, with a count.
export function BookmarkLink() {
  const saved = useBookmarks()
  return (
    <Link to="/saved" className="icon-button bookmark-button" aria-label="Saved paths" title="Saved paths">
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
