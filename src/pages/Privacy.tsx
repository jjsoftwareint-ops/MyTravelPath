import Link from "../components/Link";
import Layout from "../components/Layout";
import { usePageMeta } from "../seo";
import { CONTACT_EMAIL } from "./Contact";

const UPDATED = "22 October 2026";

// Privacy policy covering hosting, analytics, embedded maps, donations and
// advertising (Google AdSense). Update UPDATED when the text changes.
export default function Privacy() {
  usePageMeta();
  return (
    <Layout title="Privacy Policy" subtitle={`Last updated ${UPDATED}`} backTo="/">
      <section className="prose">
        <h2>In short</h2>
        <p>
          My Travel Path is a static website. It has no accounts, no login and
          no database of visitors. It does not set tracking cookies of its own.
          Third parties involved in running the site (hosting, page-view
          statistics, embedded maps, donations and advertising) may process
          some data, as described below.
        </p>

        <h2>Who is responsible</h2>
        <p>
          JJ SOFTWARE, represented by Uijin Lee. Business registration number
          862-07-02045. 101-2108, 134 Gurojungang-ro, Guro-gu, Seoul, Republic
          of Korea. E-mail:{" "}
          <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          . See also the <Link className="link" to="/imprint">imprint</Link>.
        </p>

        <h2>Hosting and server logs</h2>
        <p>
          The site is hosted on GitHub Pages (GitHub, Inc., USA). When you open
          a page, GitHub receives your IP address and the usual request data
          (page, time, browser) to deliver the files and protect the service.
          See the{" "}
          <a
            className="link"
            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noreferrer"
          >
            GitHub privacy statement
          </a>
          .
        </p>

        <h2>Page-view statistics</h2>
        <p>
          Page views are counted with GoatCounter, a privacy-friendly analytics
          service that sets no cookies and stores no identifier on your device.
          It records the visited page, the referrer, your country, browser type
          and screen size, in aggregate only. The resulting dashboard is public
          (the “Visitors” link in the footer). See the{" "}
          <a
            className="link"
            href="https://www.goatcounter.com/help/privacy"
            target="_blank"
            rel="noreferrer"
          >
            GoatCounter privacy policy
          </a>
          .
        </p>

        <h2>Settings stored on your device</h2>
        <p>
          Your light or dark theme choice is kept in your browser's local
          storage. It never leaves your device and can be cleared through your
          browser settings.
        </p>

        <h2>Embedded maps and external links</h2>
        <p>
          Each path page embeds a Google My Maps map. Loading it connects your
          browser to Google (Google LLC / Google Ireland Limited), which
          receives your IP address and may set its own cookies under the{" "}
          <a
            className="link"
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google privacy policy
          </a>
          . Links to Google Maps, Naver Map, YouTube, the App Store and Google
          Play open third-party services whose own policies apply once you
          follow them.
        </p>

        <h2>Advertising (Google AdSense)</h2>
        <p>
          This site may display advertisements served by Google AdSense. Google
          and its partners use cookies and similar technologies to serve ads
          based on your prior visits to this and other websites, to limit how
          often you see an ad and to measure ad performance. Google's use of
          advertising cookies enables it and its partners to show you ads
          based on your visit to this site and other sites on the internet.
        </p>
        <p>
          You can opt out of personalised advertising in{" "}
          <a
            className="link"
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noreferrer"
          >
            Google Ads Settings
          </a>{" "}
          and opt out of many third-party vendors' cookies at{" "}
          <a
            className="link"
            href="https://www.aboutads.info/choices"
            target="_blank"
            rel="noreferrer"
          >
            aboutads.info
          </a>{" "}
          or{" "}
          <a
            className="link"
            href="https://www.youronlinechoices.eu"
            target="_blank"
            rel="noreferrer"
          >
            youronlinechoices.eu
          </a>
          . How Google uses data when you use a partner's site is explained at{" "}
          <a
            className="link"
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
          >
            policies.google.com/technologies/partner-sites
          </a>
          .
        </p>
        <p>
          If you visit from the European Economic Area, the United Kingdom or
          Switzerland, a consent message from Google appears on your first
          visit. Advertising cookies and personalised ads are used only if you
          agree; you can decline or choose individual purposes under “Manage
          options”, and you can reopen your choices at any time through the
          small privacy settings button that Google's message leaves on the
          page.</p>

        <h2>Donations</h2>
        <p>
          The “buy me a coffee” link opens PayPal. PayPal processes the payment
          under its own{" "}
          <a
            className="link"
            href="https://www.paypal.com/webapps/mpp/ua/privacy-full"
            target="_blank"
            rel="noreferrer"
          >
            privacy statement
          </a>
          ; we receive the name and e-mail address PayPal passes on with a
          donation and use them only to thank you and for bookkeeping.
        </p>

        <h2>Contact</h2>
        <p>
          When you e-mail us, we keep your message and address only as long as
          needed to answer and to keep the correction it contains. The contact
          form opens your own mail app; this site does not receive or store
          what you type.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live (for example under the GDPR in the EEA or
          the Personal Information Protection Act in Korea) you have the right
          to access, correct or delete personal data held about you, to restrict
          or object to its processing, to data portability, and to complain to
          a supervisory authority. Write to the e-mail address above to exercise
          them.
        </p>

        <h2>Children</h2>
        <p>
          The site is not directed at children under 16 and we do not knowingly
          collect personal data from them.
        </p>

        <h2>Changes</h2>
        <p>
          This policy is updated when the site changes, for example when
          advertising is switched on. The date at the top shows the current
          version.
        </p>
      </section>
    </Layout>
  );
}
