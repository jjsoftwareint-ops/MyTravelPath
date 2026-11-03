import { FaCalendarDays } from 'react-icons/fa6'
import Link from './Link'
import { useWeekUnseen } from '../weekSeen'

// Header button left of the blog icon, main page only: opens the events page.
// A red dot shows when the page was refreshed since the visitor last opened it.
export default function EventLink() {
  const unseen = useWeekUnseen()
  const label = unseen ? 'Events this week, updated' : 'Events this week'
  return (
    <Link to="/this-week/" className="icon-button event-button" aria-label={label} title={label}>
      <FaCalendarDays aria-hidden="true" />
      {unseen && <span className="badge dot" aria-hidden="true" />}
    </Link>
  )
}
