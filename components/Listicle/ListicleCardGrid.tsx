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
      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
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
          {title && <h2 className="text-l1-foreground mb-2 text-2xl font-semibold">{title}</h2>}
          {description && <p className="text-muted-foreground text-base">{description}</p>}
        </div>
      )}

      <ul className={`grid gap-4 ${gridCols} list-none p-0`}>
        {items.map((item, index) => (
          <li key={`${item.href}-${item.name}-${index}`} className="h-full w-full">
            <TrackingLink
              href={item.href}
              className="border-border bg-card hover:border-primary hover:bg-l3-background flex h-full w-full flex-col items-center justify-center rounded-lg border p-4 text-center no-underline transition-all"
              clickType="Nav Click"
              clickName={item.clickName || item.name}
              clickText={item.name}
              clickLocation={sectionName}
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md">
                {renderIcon(item.icon)}
              </div>
              <span className="text-l1-foreground text-sm font-medium">{item.name}</span>
            </TrackingLink>
          </li>
        ))}
      </ul>

      {viewAllHref && (
        <div className="mt-6 text-sm">
          <TrackingLink
            href={viewAllHref}
            className="text-primary hover:text-accent-primary inline-flex items-center no-underline transition-colors"
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
