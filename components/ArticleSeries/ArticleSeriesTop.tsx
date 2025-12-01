import React from 'react'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'
import Link from 'next/link'
import { Tooltip } from '@nextui-org/react'
import { cn } from '../../app/lib/utils'

type ArticleLink = {
  title: string
  href: string
}

type ArticleSeriesTopProps = {
  seriesName: string
  seriesOverviewHref?: string
  currentPart: number
  totalParts: number
  previous?: ArticleLink | null
  next?: ArticleLink | null
  className?: string
}

export default function ArticleSeriesTop({
  seriesName,
  seriesOverviewHref,
  currentPart,
  totalParts,
  previous,
  next,
  className,
}: ArticleSeriesTopProps) {
  const showPrevious = Boolean(previous)
  const showNext = Boolean(next)

  return (
    <div
      className={cn(
        'mb-8 flex items-center justify-between border-b border-gray-200 pb-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400',
        className
      )}
    >
      {/* Left: Series Name + View All Link */}
      {seriesOverviewHref ? (
        <Link
          href={seriesOverviewHref}
          className="group inline-flex items-center font-medium no-underline transition-colors hover:text-blue-600 dark:hover:text-blue-400"
        >
          <List className="mr-2 h-4 w-4 opacity-90 transition-opacity group-hover:opacity-100" />
          <span className="text-blue-600 opacity-90 transition-opacity group-hover:opacity-100 dark:text-blue-400">
            {seriesName}
          </span>
        </Link>
      ) : (
        <span className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400">
          {seriesName}
        </span>
      )}

      {/* Right: Prev/Current Position/Next */}
      <div className="flex items-center space-x-4">
        {showPrevious && previous ? (
          <Tooltip content={`Previous: ${previous.title}`} delay={150}>
            <Link
              href={previous.href}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 no-underline transition-all hover:bg-gray-200 hover:text-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              aria-label={`Previous article: ${previous.title}`}
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Tooltip>
        ) : (
          <div className="h-8 w-8" aria-hidden="true" />
        )}

        <span className="whitespace-nowrap text-gray-500 dark:text-gray-500">
          Part {currentPart} of {totalParts}
        </span>

        {showNext && next ? (
          <Tooltip content={`Next: ${next.title}`} delay={150}>
            <Link
              href={next.href}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 no-underline transition-all hover:bg-gray-200 hover:text-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              aria-label={`Next article: ${next.title}`}
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
