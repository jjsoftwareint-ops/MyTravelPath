import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { IoColorPaletteOutline } from 'react-icons/io5'
import { BLOG_THEMES, hideBlogTheme, setBlogTheme, showBlogTheme, storedBlogTheme, subscribeBlogTheme, type BlogTheme } from '../blogTheme'

const serverTheme = (): BlogTheme => 'auto'

// Palette button in the blog header (it replaces the sun/moon toggle there). Opens a small menu of reading themes.
export default function BlogThemePicker() {
  const theme = useSyncExternalStore(subscribeBlogTheme, storedBlogTheme, serverTheme)
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)

  // The theme is on <html> only while a blog page is open.
  useEffect(() => {
    showBlogTheme(storedBlogTheme())
    return () => hideBlogTheme()
  }, [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="blog-theme" ref={wrap}>
      <button
        type="button"
        className="theme-toggle"
        aria-label="Reading theme"
        title="Reading theme"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <IoColorPaletteOutline aria-hidden="true" />
      </button>
      {open && (
        <div className="blog-theme-menu" role="menu" aria-label="Reading theme">
          {BLOG_THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="menuitemradio"
              aria-checked={theme === t.id}
              className={theme === t.id ? 'blog-theme-item on' : 'blog-theme-item'}
              onClick={() => {
                setBlogTheme(t.id)
                setOpen(false)
              }}
            >
              <span
                className="blog-theme-swatch"
                aria-hidden="true"
                style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 50%, ${t.swatch[1]} 50%)` }}
              />
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
