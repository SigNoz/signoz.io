import React from 'react'
import { ArrowLeft, ArrowRight, List } from 'lucide-react'
import Link from 'next/link'
import { Tooltip } from '@nextui-org/react'
import { cn } from '../../app/lib/utils'
import articleSeriesData from '../../constants/articleSeries.json'

type ArticleSeriesTopProps = {
  seriesKey: string
  currentSlug: string
  className?: string
}

export default function ArticleSeriesTop({
  seriesKey,
  currentSlug,
  className,
}: ArticleSeriesTopProps) {
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

  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  return (
    <div
      className={cn(
        'mb-8 flex items-center justify-between border-b border-gray-200 pb-3 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400',
        className
      )}
    >
      {/* Left: Series Name + View All Link */}
      <Link
        href={seriesOverviewHref || '#'}
        className="group inline-flex items-center font-medium no-underline transition-colors hover:text-blue-600 dark:hover:text-blue-400"
      >
        <List className="mr-2 h-4 w-4 opacity-90 transition-opacity group-hover:opacity-100" />
        <span className="text-blue-600 opacity-90 transition-opacity group-hover:opacity-100 dark:text-blue-400">
          {seriesName}
        </span>
      </Link>

      {/* Right: Prev/Current Position/Next */}
      <div className="flex items-center space-x-4">
        {previousArticle ? (
          <Tooltip content={`Previous: ${previousArticle.title}`} delay={150}>
            <Link
              href={previousArticle.href}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 no-underline transition-all hover:bg-gray-200 hover:text-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              aria-label={`Previous article: ${previousArticle.title}`}
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Tooltip>
        ) : (
          <div className="h-8 w-8" aria-hidden="true" />
        )}

        <span className="whitespace-nowrap text-gray-500 dark:text-gray-500">
          Part {currentIndex + 1} of {articles.length}
        </span>

        {nextArticle ? (
          <Tooltip content={`Next: ${nextArticle.title}`} delay={150}>
            <Link
              href={nextArticle.href}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 no-underline transition-all hover:bg-gray-200 hover:text-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              aria-label={`Next article: ${nextArticle.title}`}
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
