import type { TagIconName } from '../data/travel'

// Small inline icons for path tags. Drawn in currentColor so they follow the
// pill's text colour in light and dark mode.
export default function TagIcon({ name }: { name: TagIconName }) {
  switch (name) {
    case 'hiker':
      // Walker with a trekking pole and a backpack.
      return (
        <svg
          className="tag-icon"
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8.5" cy="2.4" r="1.6" fill="currentColor" stroke="none" />
          <rect x="4" y="5" width="2.6" height="4.2" rx="1" fill="currentColor" stroke="none" />
          <path d="M8.2 4.6 7 9.6" />
          <path d="M7 9.6 5 14.2" />
          <path d="M7 9.6 9.6 11.4 9 14.6" />
          <path d="M8 6.2 11 8" />
          <path d="M11.4 6.2 12.8 14.6" />
        </svg>
      )
  }
}
