import { FaCalendarDays } from 'react-icons/fa6'
import Link from './Link'
import { thisWeek, weekCount, weekHeadline } from '../data/thisWeek'

// Main page, under the notice: names the week's headline event and links to /this-week/.
export default function WeekCard() {
  const first = weekHeadline()
  if (!first) return null
  const more = weekCount() - 1
  return (
    <Link to="/this-week/" className="new-posts week-card">
      <FaCalendarDays className="new-posts-icon" aria-hidden="true" />
      <span className="new-posts-text">
        <span className="new-posts-label">Events this week · {thisWeek.weeks[0].range}</span>
        <strong>
          {first.title}, {first.when.split(' · ')[0]}
        </strong>
        {more > 0 && (
          <span className="new-posts-more">
            and {more} more {more === 1 ? 'event' : 'events'}
          </span>
        )}
      </span>
      <span className="new-posts-arrow" aria-hidden="true">
        ›
      </span>
    </Link>
  )
}
