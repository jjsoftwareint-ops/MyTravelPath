// Home-screen banner: downtown Seoul and Namsan seen from the Inwangsan trail.
// Photo by the Seoul Tourism Organization, Korea Open Government License
// (KOGL) Type 1, which allows free use with a source credit.
const PHOTO_PAGE = 'https://commons.wikimedia.org/wiki/File:Downtown_Seoul_from_Inwangsan_in_2023.jpg'

export default function Banner() {
  return (
    <div className="banner">
      <img
        src={`${import.meta.env.BASE_URL}banner.jpg`}
        alt="Downtown Seoul and Namsan Tower seen from the Inwangsan trail"
        width="1200"
        height="252"
        decoding="async"
      />
      <a className="credit" href={PHOTO_PAGE} target="_blank" rel="noopener noreferrer">
        Photo: Seoul Tourism Organization · KOGL 1
      </a>
    </div>
  )
}
