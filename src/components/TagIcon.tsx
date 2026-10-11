import { FaMoon } from 'react-icons/fa6'
import { GiHiking } from 'react-icons/gi'
import type { TagIconName } from '../data/travel'

// Icons for path tags, from the FontAwesome and Game Icons sets in react-icons.
// Each icon can carry its own colour; the rest of the pill follows the theme.
export default function TagIcon({ name }: { name: TagIconName }) {
  switch (name) {
    case 'hiker':
      return <GiHiking className="tag-icon" aria-hidden="true" />
    case 'moon':
      return <FaMoon className="tag-icon" aria-hidden="true" style={{ color: '#fbbf24' }} />
  }
}
