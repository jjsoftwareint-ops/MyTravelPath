import { FaInstagram, FaThreads } from "react-icons/fa6";
import { INSTAGRAM_URL, THREADS_URL } from "../pages/Contact";

// Instagram and Threads buttons: under the Korea map on the home page and at the end of every path page.
export default function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Follow My Travel Path">
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
        <FaInstagram aria-hidden="true" /> Instagram
      </a>
      <a href={THREADS_URL} target="_blank" rel="noreferrer">
        <FaThreads aria-hidden="true" /> Threads
      </a>
    </nav>
  );
}
