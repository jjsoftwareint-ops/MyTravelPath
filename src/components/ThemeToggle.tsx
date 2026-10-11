import { useState } from 'react'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import { applyTheme, currentTheme, type Theme } from '../theme'

// Sun/moon button in the header. Shows the mode you would switch to.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => currentTheme())
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggle = () => {
    applyTheme(next)
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'dark' ? <IoSunnyOutline aria-hidden="true" /> : <IoMoonOutline aria-hidden="true" />}
    </button>
  )
}
