import Layout from "../components/Layout";

// Legal notice (Impressum) with the site owner's contact details.
export default function Imprint() {
  return (
    <Layout title="Imprint" subtitle="Legal notice" backTo="/">
      <section className="prose">
        <h2>Responsible for this site</h2>
        <p>
          JJSoftware
          <br />
          South Korea
          <br />
          Gurogu-gu, Seoul
          <br />
          E-mail: jjsoftwareint@gmail.com
        </p>

        <h2>Contact</h2>
        <p>
          Feel free to send any inquiry, correction or suggestion by e-mail to{" "}
          <a className="link" href="mailto:jjsoftwareint@gmail.com">
            jjsoftwareint@gmail.com
          </a>
          . Replies may take a few days.
        </p>

        <h2>About this site</h2>
        <p>
          My Travel Path is a private, non-commercial collection of walking
          routes. Routes open in Google My Maps, a service of Google LLC; its
          own terms and privacy policy apply there.
        </p>

        <h2>Donations</h2>
        <p>
          The “Would you like to buy me a coffee?” link on each path page opens PayPal. Donations are entirely
          voluntary, go to the site owner named above, and are used to keep this site running.
        </p>

        <h2>Analytics</h2>
        <p>
          Page views are counted with GoatCounter, which stores no cookies and
          no personal data on your device. Only the visited page, your country
          and the browser type are recorded, in aggregate.
        </p>

        <h2>Liability for links</h2>
        <p>
          This site links to external websites whose content we do not control.
          The operators of those sites are solely responsible for their content.
        </p>
      </section>
    </Layout>
  );
}
