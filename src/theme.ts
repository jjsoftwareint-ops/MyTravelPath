// Light/dark preference. Unset means "follow the system"; the toggle in the
// header switches between light and dark and stores the choice.
export type Theme = 'light' | 'dark'

const KEY = 'theme'

export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

export function currentTheme(): Theme {
  return storedTheme() ?? systemTheme()
}

const BACKGROUND: Record<Theme, string> = { light: '#f4f5f7', dark: '#0f1115' }

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  // Browser chrome (status bar) colour: both meta tags get the chosen theme's
  // background so it matches whichever one the browser picks.
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', BACKGROUND[theme]))
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* private mode: the choice simply lasts for this page view */
  }
}
