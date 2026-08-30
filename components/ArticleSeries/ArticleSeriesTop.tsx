import React from 'react'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'
import Link from 'next/link'
import { Typography } from '@signozhq/ui/typography'
import { AppTooltip as Tooltip } from '@/components/ui/AppTooltip'
import { cn } from '../../app/lib/utils'

type ArticleLink = {
  title: string
  href: string
}

type ArticleSeriesTopProps = {
  seriesName: string
  seriesOverviewHref?: string
  currentPart: number | string
  totalParts: number | string
  previous?: ArticleLink | null
  next?: ArticleLink | null
  previousTitle?: string
  previousHref?: string
  nextTitle?: string
  nextHref?: string
  className?: string
}

const navIconClassName =
  'flex h-8 w-8 items-center justify-center rounded-md bg-[var(--l2-background)] no-underline transition-all hover:bg-[var(--l2-background-hover)] hover:text-[var(--accent-primary)]'

export default function ArticleSeriesTop({
  seriesName,
  seriesOverviewHref,
  currentPart,
  totalParts,
  previous,
  next,
  previousTitle,
  previousHref,
  nextTitle,
  nextHref,
  className,
}: ArticleSeriesTopProps) {
  const part = Number(currentPart)
  const total = Number(totalParts)
  const prevLink =
    previous ??
    (previousTitle && previousHref ? { title: previousTitle, href: previousHref } : null)
  const nextLink = next ?? (nextTitle && nextHref ? { title: nextTitle, href: nextHref } : null)
  const showPrevious = Boolean(prevLink)
  const showNext = Boolean(nextLink)

  return (
    <div
      className={cn(
        'mb-8 flex items-center justify-between border-b border-[var(--l2-border)] pb-3 text-sm text-[var(--l2-foreground)]',
        className
      )}
    >
      {seriesOverviewHref ? (
        <Link
          href={seriesOverviewHref}
          className="group inline-flex items-center font-medium no-underline transition-colors hover:text-[var(--accent-primary)]"
          prefetch={false}
        >
          <List className="mr-2 h-4 w-4 opacity-90 transition-opacity group-hover:opacity-100" />
          <span className="text-[var(--accent-primary)] opacity-90 transition-opacity group-hover:opacity-100">
            {seriesName}
          </span>
        </Link>
      ) : (
        <Typography.Text className="inline-flex items-center font-medium text-[var(--accent-primary)]">
          {seriesName}
        </Typography.Text>
      )}

      <div className="flex items-center space-x-4">
        {showPrevious && prevLink ? (
          <Tooltip
            contentClassName="text-[var(--l1-foreground)] text-sm"
            content={`Previous: ${prevLink.title}`}
            delayDuration={150}
            side="top"
          >
            <Link
              href={prevLink.href}
              className={navIconClassName}
              aria-label={`Previous article: ${prevLink.title}`}
              prefetch={false}
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Tooltip>
        ) : (
          <div className="h-8 w-8" aria-hidden="true" />
        )}

        <Typography.Text color="muted" className="whitespace-nowrap">
          Part {part} of {total}
        </Typography.Text>

        {showNext && nextLink ? (
          <Tooltip content={`Next: ${nextLink.title}`} delayDuration={150} side="top">
            <Link
              href={nextLink.href}
              className={navIconClassName}
              aria-label={`Next article: ${nextLink.title}`}
              prefetch={false}
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Tooltip>
        ) : (
          <div className="h-8 w-8" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
