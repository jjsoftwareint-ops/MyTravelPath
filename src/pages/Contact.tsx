import { useState, type FormEvent } from "react";
import { FaThreads } from "react-icons/fa6";
import Layout from "../components/Layout";
import { usePageMeta } from "../seo";

export const CONTACT_EMAIL = "jjsoftwareint@gmail.com";
export const THREADS_HANDLE = "_mytravelpath";
export const THREADS_URL = `https://www.threads.com/@${THREADS_HANDLE}`;

// The site has no backend, so the form composes an e-mail in the visitor's
// own mail app. Nothing typed here is sent to or stored by this site.
export default function Contact() {
  usePageMeta();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function send(e: FormEvent) {
    e.preventDefault();
    const body = `${message}\n\n— ${name || "A visitor"}`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject || "My Travel Path",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <Layout title="Contact" subtitle="Questions, corrections, ideas" backTo="/">
      <section className="prose">
        <h2>E-mail</h2>
        <p>
          Write to{" "}
          <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          . Replies usually take a few days. English and Korean are both fine.
        </p>

        <h2>Threads</h2>
        <p>
          New walks, photos and quick answers are posted on Threads at{" "}
          <a className="link social" href={THREADS_URL} target="_blank" rel="noreferrer">
            <FaThreads aria-hidden="true" /> @{THREADS_HANDLE}
          </a>
          . A message there works just as well as an e-mail.
        </p>

        <h2>Or use the form</h2>
        <p>
          The form opens the message in your own mail app, addressed to the
          e-mail above. Nothing is stored on this site.
        </p>
        <form className="form" onSubmit={send}>
          <label className="field">
            <span>Your name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span>Subject</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Closed café on the Hongdae path"
            />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button type="submit" className="cta">
            Open in my mail app
          </button>
        </form>

        <h2>What is useful to include</h2>
        <p>
          For a correction: the city, the path name and the stop. For a new
          path idea: the area and roughly how long the walk is. Links to Naver
          Map places or a video of the walk help a lot.
        </p>
      </section>
    </Layout>
  );
}
