// Home-header mark: the round Korean flag from the circle-flags set (MIT),
// served from /assets/kr.svg. Decorative only; the title carries the name.
export default function BrandMark() {
  return (
    <img
      className="brand-mark"
      src={`${import.meta.env.BASE_URL}kr.svg`}
      alt=""
      width={36}
      height={36}
      aria-hidden="true"
    />
  )
}
