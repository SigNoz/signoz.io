import { CalendarDays, MapPin, Store } from 'lucide-react'

import BoothMarquee from './BoothMarquee'
import { HERO } from './KubeconPage.constants'

const ICONS = [CalendarDays, Store, MapPin]

export default function EventDetailsCard() {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)]">
      <BoothMarquee variant="inline" />
      <dl className="m-0 grid grid-cols-[minmax(0,140px)_minmax(0,1fr)] gap-x-2 gap-y-4 p-4">
        {HERO.details.map((detail, index) => {
          const Icon = ICONS[index]
          return (
            <div key={detail.label} className="contents">
              <dt className="flex items-center gap-2 text-sm leading-5 text-[var(--l2-foreground)]">
                <Icon size={14} aria-hidden="true" />
                {detail.label}
              </dt>
              <dd className="m-0 text-sm leading-5 text-[var(--l1-foreground)]">{detail.value}</dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
