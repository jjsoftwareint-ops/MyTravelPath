import { FaMoon } from 'react-icons/fa6'
import { GiHiking, GiSunset, GiVillage } from 'react-icons/gi'
import type { TagIconName } from '../data/travel'

// Icons for path tags, from the FontAwesome and Game Icons sets in react-icons.
// Each icon can carry its own colour; the rest of the pill follows the theme.
export default function TagIcon({ name }: { name: TagIconName }) {
  switch (name) {
    case 'hiker':
      return <GiHiking className="tag-icon" aria-hidden="true" style={{ color: '#15803d' }} />
    case 'moon':
      return <FaMoon className="tag-icon" aria-hidden="true" style={{ color: '#fbbf24' }} />
    case 'village':
      return <GiVillage className="tag-icon" aria-hidden="true" style={{ color: '#b45309' }} />
    case 'sunset':
      return <GiSunset className="tag-icon" aria-hidden="true" style={{ color: '#f97316' }} />
  }
}
