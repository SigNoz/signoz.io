import React from 'react'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'
import Link from 'next/link'
import { Typography } from '@signozhq/ui/typography'
import { cn } from '../../app/lib/utils'

type ArticleLink = {
  title: string
  href: string
}

type ArticleSeriesProps = {
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

const footerLinkClassName =
  'group flex items-center font-medium text-[var(--l2-foreground)] no-underline transition-colors hover:text-[var(--accent-primary)]'

export default function ArticleSeriesBottom({
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
}: ArticleSeriesProps) {
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
        'overflow-hidden rounded-lg border border-[var(--l2-border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm',
        className
      )}
    >
      {showNext && nextLink ? (
        <Link
          href={nextLink.href}
          className="group block p-4 no-underline transition-colors hover:bg-[var(--l2-background-hover)] sm:p-6"
          prefetch={false}
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <Typography.Text color="muted" className="text-sm font-medium">
                Next in &quot;{seriesName}&quot; (Part {part + 1} of {total})
              </Typography.Text>
              <Typography.Title
                level={3}
                className="mt-1 line-clamp-2 text-lg font-semibold text-[var(--l1-foreground)]"
              >
                {nextLink.title}
              </Typography.Title>
            </div>
            <ArrowRight className="ml-4 h-5 w-5 flex-shrink-0 text-[var(--muted-foreground)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent-primary)]" />
          </div>
        </Link>
      ) : (
        <div className="p-4 text-center sm:p-6">
          <Typography.Title level={3} className="text-lg font-semibold text-[var(--l1-foreground)]">
            You&apos;ve reached the end of the series!
          </Typography.Title>
          <Typography.Text color="muted" className="mt-1 text-sm">
            Congratulations on completing &quot;{seriesName}&quot;.
          </Typography.Text>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-[var(--l2-border)] bg-[var(--l2-background)] px-4 py-3 text-sm sm:px-6">
        {showPrevious && prevLink ? (
          <Link href={prevLink.href} className={footerLinkClassName} prefetch={false}>
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </Link>
        ) : (
          <div />
        )}

        {seriesOverviewHref && (
          <Link href={seriesOverviewHref} className={footerLinkClassName} prefetch={false}>
            View Full Series
            <List className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
        )}
      </div>
    </div>
  )
}
