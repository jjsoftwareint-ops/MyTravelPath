import { FaFacebook, FaInstagram, FaThreads } from "react-icons/fa6";
import { FACEBOOK_URL, INSTAGRAM_URL, THREADS_URL } from "../pages/Contact";

// Instagram, Threads and Facebook buttons: under the Korea map on the home page and at the end of every path page.
export default function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Follow My Travel Path">
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
        <FaInstagram aria-hidden="true" /> Instagram
      </a>
      <a href={THREADS_URL} target="_blank" rel="noreferrer">
        <FaThreads aria-hidden="true" /> Threads
      </a>
      <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
        <FaFacebook aria-hidden="true" /> Facebook
      </a>
    </nav>
  );
}
