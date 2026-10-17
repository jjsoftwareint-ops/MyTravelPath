// Home-header mark: the site's own artwork (a suitcase with a Korean flag tag
// among cherry blossoms), supplied by the owner and used whole, never cropped.
export default function BrandMark() {
  return (
    <img
      className="brand-mark"
      src={`${import.meta.env.BASE_URL}brand.png?v=5`}
      alt=""
      width={36}
      height={36}
      aria-hidden="true"
    />
  )
}
