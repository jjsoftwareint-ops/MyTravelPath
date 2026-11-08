import { FiDownload } from "react-icons/fi";
import Link from "../components/Link";
import Layout from "../components/Layout";
import { usePageMeta } from "../seo";

// The print file sits in ./assets and is served from the site root as it is (never resized or recompressed).
// The preview is a small separate copy so this page stays light.
export const POSTER_FILE = "/my_korea_path_poster_print_300dpi.png";
const PREVIEW_FILE = "/poster-preview.jpg";

// A page for guesthouses, hostels and cafés that agreed to hang the poster: preview, then the original file.
// Written in Korean because its readers are the Korean hosts, not the travellers.
export default function Poster() {
  usePageMeta();
  return (
    <Layout title="포스터" subtitle="인쇄해서 붙여 주세요" backTo="/">
      <section className="prose" lang="ko">
        <p>
          게스트하우스, 호스텔, 카페, 관광안내소 전시용 포스터입니다. QR 코드를
          스캔하면 이 사이트로 연결됩니다.
        </p>

        <div className="poster-preview">
          <img
            src={PREVIEW_FILE}
            width={640}
            height={960}
            alt="My Korea Path 포스터: Enjoy Korea. We've Done the Planning. 걷기 코스, 맛집, 현지 팁이 담겨 있고 QR 코드로 koreatravelpath.com에 연결됩니다."
          />
        </div>

        <a
          className="cta"
          href={POSTER_FILE}
          download="My-Korea-Path-poster.png"
        >
          <FiDownload className="cta-icon" aria-hidden="true" />
          포스터 다운로드
        </a>
        <p className="poster-meta">
          PNG, 7.2MB, 2560 × 3840px. 2:3 비율이며 300dpi 기준 약 21.7 ×
          32.5cm입니다.
        </p>

        <h2>인쇄 방법</h2>
        <p>
          원본 그대로 인쇄해 주세요. 인쇄 창에서 ‘페이지에 맞춤’을 선택하면
          잘리는 부분이 없습니다. A3 이상은 같은 파일을 인쇄소에 맡기시면
          됩니다. A4는 포스터가 조금 더 좁아서 양옆에 얇은 여백이 생깁니다.
        </p>

        <h2>문의</h2>
        <p>
          포스터에 대해 궁금한 점은{" "}
          <Link className="link" to="/contact">
            문의 페이지
          </Link>
          로 연락해 주세요.
        </p>
      </section>
    </Layout>
  );
}
