import React from 'react'
import { ArrowRight } from 'lucide-react'
import TrackingLink from '../TrackingLink'
import type { IconSpec, ListicleItem } from './types'

interface ListicleCardGridProps {
  title?: string
  description?: string
  items: ListicleItem[]
  sectionName: string
  viewAllHref?: string
  viewAllText?: string
  gridCols?: string
}

const DEFAULT_GRID_COLS = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'

function renderIcon(spec?: IconSpec): React.ReactNode {
  if (!spec) {
    return null
  }

  if (typeof spec === 'string') {
    return <img src={spec} alt="" className="h-7 w-7 object-contain" loading="lazy" />
  }

  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-[var(--base-white)]"
      style={{ backgroundColor: spec.color }}
    >
      {spec.badge}
    </span>
  )
}

export default function ListicleCardGrid({
  title,
  description,
  items,
  sectionName,
  viewAllHref,
  viewAllText = 'View all',
  gridCols = DEFAULT_GRID_COLS,
}: ListicleCardGridProps) {
  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      {(title || description) && (
        <div className="mb-6 text-left">
          {title && (
            <h2 className="mb-2 text-2xl font-semibold text-[var(--l1-foreground)]">{title}</h2>
          )}
          {description && <p className="text-base text-[var(--l2-foreground)]">{description}</p>}
        </div>
      )}

      <ul className={`grid list-none gap-4 p-0 ${gridCols}`}>
        {items.map((item, index) => (
          <li key={`${item.href}-${item.name}-${index}`} className="h-full w-full">
            <TrackingLink
              href={item.href}
              className="flex h-full w-full flex-col items-start border border-dashed border-[var(--l1-border)] p-4 no-underline transition-colors hover:bg-[var(--l1-background-hover)]"
              clickType="Nav Click"
              clickName={item.clickName || item.name}
              clickText={item.name}
              clickLocation={sectionName}
            >
              {item.icon && typeof item.icon === 'string' ? (
                <div className="mb-3 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-[var(--base-white)]">
                  {renderIcon(item.icon)}
                </div>
              ) : item.icon ? (
                <div className="mb-3 shrink-0">{renderIcon(item.icon)}</div>
              ) : null}
              <div
                className={`flex w-full flex-col items-start ${item.description ? 'mt-auto gap-3' : ''}`}
              >
                <span className="text-base font-semibold leading-none text-[var(--l1-foreground-hover)]">
                  {item.name}
                </span>
                {item.description && (
                  <p className="m-0 text-[13px] leading-5 tracking-[-0.065px] text-[var(--l2-foreground)]">
                    {item.description}
                  </p>
                )}
              </div>
            </TrackingLink>
          </li>
        ))}
      </ul>

      {viewAllHref && (
        <div className="mt-6 text-sm">
          <TrackingLink
            href={viewAllHref}
            className="inline-flex items-center text-[var(--accent-primary)] no-underline transition-colors hover:text-[var(--accent-primary-hover)]"
            clickType="Nav Click"
            clickName={`View All ${title || ''} Link`}
            clickText={viewAllText}
            clickLocation={sectionName}
          >
            {viewAllText} <ArrowRight className="ml-1 h-3 w-3" />
          </TrackingLink>
        </div>
      )}
    </div>
  )
}
