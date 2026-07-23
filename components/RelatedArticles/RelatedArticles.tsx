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
      className="dark:bg-card flex flex-col rounded-sm max-md:ml-0 max-md:w-full dark:border-gray-900"
      prefetch={false}
    >
      <img className="h-24 w-full object-cover" src="/img/hexagonal-pattern.webp" alt="" />

      <article className="mx-auto flex w-full grow flex-col rounded px-4 py-8 max-md:mt-6">
        <h3 className="text-muted-foreground truncate text-sm leading-6 font-medium dark:text-neutral-100">
          {title}
        </h3>
        <div className="mt-3 flex gap-2 text-xs leading-5 font-medium tracking-wide uppercase">
          <div className="bg-muted bg-opacity-10 justify-center rounded-full px-2.5 py-1 text-xs dark:bg-stone-300 dark:text-slate-950">
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
        <h2 className="text-foreground w-full text-sm leading-5 font-semibold tracking-wide uppercase max-md:max-w-full">
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
