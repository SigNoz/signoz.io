import React from 'react'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../../app/lib/utils'
import articleSeriesData from '../../constants/articleSeries.json'

type ArticleInfo = {
  title: string
  href: string
}

type ArticleSeriesProps = {
  seriesKey: string
  currentSlug: string
  className?: string
}

export default function ArticleSeriesBottom({
  seriesKey,
  currentSlug,
  className,
}: ArticleSeriesProps) {
  const seriesData = articleSeriesData[seriesKey as keyof typeof articleSeriesData]

  if (!seriesData) {
    console.warn(`Series "${seriesKey}" not found in articleSeries.json`)
    return null
  }

  const { name: seriesName, articles, seriesOverviewHref } = seriesData

  // Find current article index based on slug
  const currentIndex = articles.findIndex((article) => article.href.includes(currentSlug))

  if (currentIndex === -1) {
    console.warn(`Current slug "${currentSlug}" not found in series "${seriesKey}"`)
    return null
  }

  const currentArticle = articles[currentIndex]
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
        className
      )}
    >
      {/* Next Article Section */}
      {nextArticle ? (
        <Link
          href={nextArticle.href}
          className="group block p-4 no-underline transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 sm:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Next in "{seriesName}" (Part {currentIndex + 2} of {articles.length})
              </p>
              <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                {nextArticle.title}
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
        {previousArticle ? (
          <Link
            href={previousArticle.href}
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
