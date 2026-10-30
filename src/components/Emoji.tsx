// A flat OpenMoji icon (assets/emoji/<name>.png), used in place of a native emoji glyph.
export default function Emoji({
  name,
  size = 18,
  className,
}: {
  name: string
  size?: number
  className?: string
}) {
  return (
    <img
      className={`emoji-icon${className ? ` ${className}` : ""}`}
      src={`${import.meta.env.BASE_URL}emoji/${name}.png`}
      width={size}
      height={size}
      alt=""
    />
  )
}
