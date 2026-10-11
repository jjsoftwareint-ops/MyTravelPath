import Layout from '../components/Layout'

// Legal notice (Impressum). Fill in the bracketed lines before publishing;
// German law requires a postal address and an e-mail address here.
export default function Imprint() {
  return (
    <Layout title="Imprint" subtitle="Legal notice" backTo="/">
      <section className="prose">
        <h2>Responsible for this site</h2>
        <p>
          Sejin Lee
          <br />
          [Street and house number]
          <br />
          [Postcode and city], Germany
          <br />
          E-mail: [your e-mail address]
        </p>

        <h2>About this site</h2>
        <p>
          My Travel Path is a private, non-commercial collection of walking routes. Routes open in
          Google My Maps, a service of Google LLC; its own terms and privacy policy apply there.
        </p>

        <h2>Analytics</h2>
        <p>
          Page views are counted with GoatCounter, which stores no cookies and no personal data on
          your device. Only the visited page, your country and the browser type are recorded, in
          aggregate.
        </p>

        <h2>Liability for links</h2>
        <p>
          This site links to external websites whose content we do not control. The operators of
          those sites are solely responsible for their content.
        </p>
      </section>
    </Layout>
  )
}
