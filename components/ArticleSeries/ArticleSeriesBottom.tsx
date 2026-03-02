import React from 'react'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'
import Link from 'next/link'
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
        'overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
        className
      )}
    >
      {/* Next Article Section */}
      {showNext && nextLink ? (
        <Link
          href={nextLink.href}
          className="group block p-4 no-underline transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Next in "{seriesName}" (Part {part + 1} of {total})
              </p>
              <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {nextLink.title}
              </h3>
            </div>
            <ArrowRight className="ml-4 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
          </div>
        </Link>
      ) : (
        <div className="p-4 text-center sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            You've reached the end of the series!
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Congratulations on completing "{seriesName}".
          </p>
        </div>
      )}

      {/* Footer for Previous & Full Series */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700/30 sm:px-6">
        {showPrevious && prevLink ? (
          <Link
            href={prevLink.href}
            className="group flex items-center font-medium text-gray-600 no-underline transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </Link>
        ) : (
          <div /> // Placeholder for spacing if no previous article
        )}

        {seriesOverviewHref && (
          <Link
            href={seriesOverviewHref}
            className="group flex items-center font-medium text-gray-600 no-underline transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            View Full Series
            <List className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </Link>
        )}
      </div>
    </div>
  )
}
