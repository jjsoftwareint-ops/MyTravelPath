// Slim decorative banner for the home screen: a route from a start ring to a
// pin over a quiet mountain skyline, in the same style as the app icon.
export default function Banner() {
  return (
    <div className="banner">
      <svg viewBox="0 0 360 64" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="360" height="64" fill="#0f1f3d" />
        <path
          d="M0 64 L48 34 L92 52 L146 20 L198 48 L238 36 L292 58 L360 26 L360 64 Z"
          fill="#17294d"
        />
        <path d="M40 44 Q 190 48 320 34" fill="none" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" />
        <circle cx="40" cy="44" r="6" fill="#ffffff" />
        <circle cx="40" cy="44" r="2.5" fill="#0f1f3d" />
        <path
          d="M320 6c-7.7 0-14 6.2-14 14 0 10 14 22 14 22s14-12 14-22c0-7.8-6.3-14-14-14z"
          fill="#ffffff"
        />
        <circle cx="320" cy="20" r="5" fill="#0f1f3d" />
      </svg>
    </div>
  )
}
