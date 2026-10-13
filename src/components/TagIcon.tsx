import { FaMoon } from 'react-icons/fa6'
import { GiHiking, GiSunset, GiVillage } from 'react-icons/gi'
import { LuFlower } from 'react-icons/lu'
import type { TagIconName } from '../data/travel'

// Icons for path tags, from the FontAwesome and Game Icons sets in react-icons.
// Colours come from the pill (.tag-<name> in index.css), so icon and text match.
export default function TagIcon({ name }: { name: TagIconName }) {
  switch (name) {
    case 'hiker':
      return <GiHiking className="tag-icon" aria-hidden="true" />
    case 'moon':
      return <FaMoon className="tag-icon" aria-hidden="true" />
    case 'village':
      return <GiVillage className="tag-icon" aria-hidden="true" />
    case 'sunset':
      return <GiSunset className="tag-icon" aria-hidden="true" />
    case 'blossom':
      return <LuFlower className="tag-icon" aria-hidden="true" />
  }
}
