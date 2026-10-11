import { FaSuitcaseRolling } from 'react-icons/fa6'

// Home-header mark: FontAwesome rolling suitcase with the round Korean flag
// (circle-flags) laid over its top corner like a sticker. Composed from icon
// sets, nothing hand-drawn; sized and coloured in index.css (.brand-mark).
export default function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <FaSuitcaseRolling />
      <img src={`${import.meta.env.BASE_URL}flag-kr.svg`} alt="" width={16} height={16} />
    </span>
  )
}
