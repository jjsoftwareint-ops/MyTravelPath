import Layout from "../components/Layout";
import { usePageMeta } from "../seo";

// Legal notice (Impressum) with the site owner's contact details.
export default function Imprint() {
  usePageMeta({ title: "Imprint", description: "Legal notice and business registration of JJ SOFTWARE, publisher of My Travel Path." });
  return (
    <Layout title="Imprint" subtitle="Legal notice" backTo="/">
      <section className="prose">
        <h2>Responsible for this site</h2>
        <p>
          JJ SOFTWARE (제이제이 소프트웨어)
          <br />
          Representative: Uijin Lee (이의진)
          <br />
          Business registration number: 862-07-02045
          <br />
          Registered with the Guro District Tax Office, Seoul, as an individual
          business (simplified VAT taxpayer) since 6 October 2021
        </p>
        <p>
          101-2108, 134 Gurojungang-ro, Guro-gu, Seoul, Republic of Korea
          <br />
          (서울특별시 구로구 구로중앙로 134, 2108호)
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
          My Travel Path is a free collection of walking routes published by
          JJ SOFTWARE. It is funded by voluntary donations and by advertising
          served by Google AdSense; see the privacy policy for details. Routes
          open in Google My Maps, a service of Google LLC; its own terms and
          privacy policy apply there.
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
