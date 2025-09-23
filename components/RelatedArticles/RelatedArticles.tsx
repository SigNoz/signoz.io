import { RelatedArticleProps } from '@/layouts/PostLayout'
import Link from 'next/link'
import * as React from 'react'

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

const RelatedArticles: React.FC<{
  relatedArticles: RelatedArticleProps[]
}> = ({ relatedArticles }) => {
  return (
    <div className="related-articles my-8 flex flex-col">
      {relatedArticles && Array.isArray(relatedArticles) && relatedArticles.length > 0 && (
        <h2 className="w-full text-sm font-semibold uppercase leading-5 tracking-wide text-white max-md:max-w-full">
          Related Articles
        </h2>
      )}

      <section className="px5 mt-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default RelatedArticles
