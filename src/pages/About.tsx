import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { usePageMeta } from "../seo";

// Who runs the site and what it does (also required by ad networks).
export default function About() {
  usePageMeta({ title: "About", description: "Who makes My Travel Path, how the walking routes in Korea are built and checked, and how the site is funded." });
  return (
    <Layout title="About" subtitle="Who makes My Travel Path" backTo="/">
      <section className="prose">
        <h2>What this site is</h2>
        <p>
          My Travel Path is a free collection of walking routes for travellers in
          Korea: Seoul, Busan, Jeju and Incheon so far. Each path is a real,
          walkable course drawn street by street on Google My Maps, with a Naver
          Map link for every stop so that navigation works on the ground. There
          is no sign-up, no app to install and nothing to pay.
        </p>

        <h2>Who runs it</h2>
        <p>
          My Travel Path is published by JJ SOFTWARE, a small registered
          business in Guro-gu, Seoul, represented by Uijin Lee. The paths are
          put together by a Korean software developer who grew up with these
          streets and still walks them on every visit home; they are the routes
          we send to friends visiting Korea for the first time. Full company
          details are in the{" "}
          <Link className="link" to="/imprint">
            imprint
          </Link>
          .
        </p>

        <h2>How the paths are made</h2>
        <p>
          A path starts from a walk I know, a local YouTuber's course or a list
          of places that locals actually visit. I check every stop on Naver Map,
          drop the places that have closed, and trace the route along real
          footpaths and stairs rather than straight lines. Restaurants and
          cafés are re-checked regularly and the date of the last check is
          written in the pin.
        </p>

        <h2>How to use a path</h2>
        <p>
          Open a city, pick a path and tap “Open in Google Maps”. Google Maps
          shows the route and the numbered stops; each pin carries a Naver Map
          link, which is far more accurate for walking directions, opening hours
          and menus in Korea. On a phone, installing the Naver Map app before
          you travel is strongly recommended.
        </p>

        <h2>Photos and credits</h2>
        <p>
          City and path photos come from Wikimedia Commons and Korean public
          archives under free licences (CC BY, CC BY-SA, CC0 or KOGL). The
          photographer and licence are shown on every image.
        </p>

        <h2>How the site is funded</h2>
        <p>
          The site is free to use. It is paid for out of pocket, voluntary
          donations through the PayPal link on each path, and advertising that
          may be shown on some pages. See the{" "}
          <Link className="link" to="/privacy">
            privacy policy
          </Link>{" "}
          for what that means for your data.
        </p>

        <h2>Corrections and suggestions</h2>
        <p>
          A closed shop, a wrong turn, a walk you think belongs here: please{" "}
          <Link className="link" to="/contact">
            get in touch
          </Link>
          . Every message is read and most corrections are live within a few
          days.
        </p>
      </section>
    </Layout>
  );
}
