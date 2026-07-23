import React from 'react'
import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'
import { BASE_URL } from '@/utils/breadcrumbTypes'

interface BreadcrumbProps {
  crumbs: BreadcrumbCrumb[]
}

const toRelativePath = (url: string): string => {
  if (url.startsWith(BASE_URL)) {
    return url.slice(BASE_URL.length) || '/'
  }
  return url
}

const Separator = () => (
  <ChevronRight size={12} className="text-muted-foreground/40 shrink-0" aria-hidden="true" />
)

export default function Breadcrumb({ crumbs }: BreadcrumbProps) {
  if (!crumbs || crumbs.length === 0) return null

  // When > 4 crumbs, on mobile: show first + "..." + last 2
  const truncate = crumbs.length > 4
  const hiddenStart = 1
  const hiddenEnd = crumbs.length - 3 // inclusive

  const items: React.ReactNode[] = []

  crumbs.forEach((crumb, index) => {
    const isFirst = index === 0
    const isLast = index === crumbs.length - 1
    const isHiddenOnMobile = truncate && index >= hiddenStart && index <= hiddenEnd

    // Insert mobile-only ellipsis before the first hidden crumb
    if (truncate && index === hiddenStart) {
      items.push(
        <li key="ellipsis" className="flex items-center gap-1.5 md:hidden" aria-hidden="true">
          <Separator />
          <span className="text-muted-foreground">...</span>
        </li>
      )
    }

    items.push(
      <li
        key={`${index}-${crumb.name}`}
        className={`items-center gap-1.5 ${isHiddenOnMobile ? 'hidden md:flex' : 'flex'}`}
      >
        {!isFirst && <Separator />}

        {isLast ? (
          <span
            aria-current="page"
            className="text-l1-foreground max-w-[300px] truncate font-medium"
          >
            {crumb.name}
          </span>
        ) : isFirst ? (
          <Link
            href={toRelativePath(crumb.url)}
            className="text-muted-foreground hover:text-accent-primary flex items-center transition-colors"
          >
            <Home size={14} aria-label="Home" />
          </Link>
        ) : (
          <Link
            href={toRelativePath(crumb.url)}
            className="text-muted-foreground hover:text-accent-primary whitespace-nowrap transition-colors"
          >
            {crumb.name}
          </Link>
        )}
      </li>
    )
  })

  return (
    <nav aria-label="Breadcrumb" className="not-prose mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 p-0 text-sm">{items}</ol>
    </nav>
  )
}
