// Small decorative illustration for the home screen: three stops joined by a
// dotted route, echoing the country → city → path flow. Pure SVG, no assets.
export default function RouteArt() {
  return (
    <svg viewBox="0 0 320 110" role="img" aria-label="A dotted route joining three stops">
      <path
        d="M30 80 C 80 20, 120 20, 160 60 S 240 100, 290 30"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="0 13"
      />
      <circle cx="30" cy="80" r="11" fill="var(--card)" stroke="var(--accent)" strokeWidth="4" />
      <circle cx="160" cy="60" r="11" fill="var(--card)" stroke="var(--accent)" strokeWidth="4" />
      <path
        d="M290 2c-14 0-25 11-25 25 0 18 25 42 25 42s25-24 25-42c0-14-11-25-25-25z"
        fill="var(--accent)"
      />
      <circle cx="290" cy="27" r="9" fill="var(--card)" />
    </svg>
  )
}
