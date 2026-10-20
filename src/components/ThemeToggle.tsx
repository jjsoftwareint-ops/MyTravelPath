import { useSyncExternalStore } from 'react'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import { applyTheme, currentTheme, subscribeTheme, type Theme } from '../theme'

const serverTheme = (): Theme => 'light'

// Sun/moon button in the header. Shows the mode you would switch to.
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, serverTheme)
  const next: Theme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => applyTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === 'dark' ? <IoSunnyOutline aria-hidden="true" /> : <IoMoonOutline aria-hidden="true" />}
    </button>
  )
}
