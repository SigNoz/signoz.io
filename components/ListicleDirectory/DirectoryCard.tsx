import type { IconSpec, ListicleItem } from '@/components/Listicle/types'
import ListicleIcon from '../Listicle/ListicleIcon'
import TrackingLink from '../TrackingLink'

function DirectoryCardIcon({ icon }: { icon?: IconSpec }) {
  if (!icon) {
    return <span className="h-12 w-12" />
  }

  if (typeof icon === 'string') {
    return <ListicleIcon src={icon} />
  }

  return (
    <span className="flex h-12 w-12 items-center justify-center">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-[var(--base-white)]"
        style={{ backgroundColor: icon.color }}
      >
        {icon.badge}
      </span>
    </span>
  )
}

export default function DirectoryCard({
  item,
  sectionName,
}: {
  item: ListicleItem
  sectionName: string
}) {
  return (
    <li className="border-b border-r border-dashed border-[var(--l1-border)]">
      <TrackingLink
        href={item.href}
        className="group flex h-full min-h-[152px] flex-col justify-between gap-4 p-4 no-underline transition-colors hover:bg-[var(--l2-background-hover)]"
        clickType="Nav Click"
        clickName={item.clickName || item.name}
        clickText={item.name}
        clickLocation={sectionName}
      >
        <DirectoryCardIcon icon={item.icon} />
        <span className="flex flex-col gap-1.5">
          <span className="text-base font-semibold leading-none text-[var(--l1-foreground)] group-hover:text-[var(--l1-foreground-hover)]">
            {item.name}
          </span>
          {item.description && (
            <span className="line-clamp-2 text-[13px] leading-5 text-[var(--l2-foreground)]">
              {item.description}
            </span>
          )}
        </span>
      </TrackingLink>
    </li>
  )
}
