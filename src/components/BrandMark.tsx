// Home-header mark: the site emblem as supplied (scaled whole, never cropped), served from /assets/logo.png.
// Decorative only; the title carries the name.
export default function BrandMark() {
  return (
    <img
      className="brand-mark"
      src={`${import.meta.env.BASE_URL}logo.png`}
      alt=""
      width={40}
      height={40}
      aria-hidden="true"
    />
  )
}
