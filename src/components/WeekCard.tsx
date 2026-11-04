import { FaCalendarDays } from 'react-icons/fa6'
import Link from './Link'
import { liveWeek, todayInSeoul, weekCount, weekHeadline } from '../data/thisWeek'
import { useHydrated } from '../hooks'

// Main page, under the notice: names the first event still on and links to /this-week/.
// Finished events drop out by their `ends` date once hydrated (the pre-rendered card shows the file as built).
export default function WeekCard() {
  const hydrated = useHydrated()
  const today = hydrated ? todayInSeoul() : undefined
  const first = weekHeadline(today)
  if (!first) return null
  const more = weekCount(today) - 1
  const range = liveWeek(today).weeks[0]?.range
  return (
    <Link to="/this-week/" className="new-posts week-card">
      <FaCalendarDays className="new-posts-icon" aria-hidden="true" />
      <span className="new-posts-text">
        <span className="new-posts-label">
          Events this week{range && <> · <span className="as-written">{range}</span></>}
        </span>
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
