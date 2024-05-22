'use client'

import { fetchRelatedArticles } from '@/api/relatedArticles'
import Link from 'next/link'
import * as React from 'react'

const EXPIRY = 3600000

interface ArticleCardProps {
  title: string
  url: string
  publishedOn: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, publishedOn, url }) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="flex flex-col rounded-sm dark:border-gray-900 dark:bg-signoz_ink-400 max-md:ml-0 max-md:w-full"
    >
      <img className="h-24 w-full object-cover" src="/img/hexagonal-pattern.webp" alt="" />

      <article className="mx-auto flex w-full grow flex-col rounded px-4 py-8  max-md:mt-6">
        <h3 className="truncate text-sm font-medium leading-6 text-signoz_ink-300 dark:text-neutral-100">
          {title}
        </h3>
        <div className="mt-3 flex gap-2 text-xs font-medium uppercase leading-5 tracking-wide">
          <div className="justify-center rounded-full bg-slate-500 bg-opacity-10 px-2.5 py-1 text-xs dark:bg-stone-300 dark:text-slate-950">
            {publishedOn}
          </div>
        </div>
      </article>
    </Link>
  )
}

const RelatedArticles: React.FC = () => {
  const [relatedArticles, setRelatedArticles] = React.useState<ArticleCardProps[]>([])
  const [loadingRelatedArticles, setLoadingRelatedArticles] = React.useState(false)

  React.useEffect(() => {
    setLoadingRelatedArticles(true)

    const blogPath = window.location.pathname
    const AIRTABLE_URL = `${process.env.AIRTABLE_BASE_URL}?filterByFormula={blogURL}='${blogPath}'&maxRecords=1`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      },
    }

    const fetchAndCacheData = async () => {
      try {
        const articles = await fetchRelatedArticles(AIRTABLE_URL, blogPath, EXPIRY, options)

        if (articles && Array.isArray(articles)) {
          setRelatedArticles(articles)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingRelatedArticles(false)
      }
    }

    fetchAndCacheData()
  }, [])

  return (
    <div className="my-8 flex flex-col">
      {!loadingRelatedArticles &&
        relatedArticles &&
        Array.isArray(relatedArticles) &&
        relatedArticles.length > 0 && (
          <h2 className="w-full px-5 text-sm font-semibold uppercase leading-5 tracking-wide text-gray-700 max-md:max-w-full">
            {' '}
            Related Articles{' '}
          </h2>
        )}

      <section className="mt-5 w-full px-5 max-md:max-w-full">
        <div className="grid grid-cols-3 gap-5 max-md:flex-col max-md:gap-0">
          {relatedArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default RelatedArticles
