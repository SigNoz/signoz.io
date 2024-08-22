'use client'

import '../css/post.css'

import { ReactNode, useRef } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import BlogHeader, { AuthorProps } from '@/components/BlogHeader/BlogHeader'
import RelatedArticles from '@/components/RelatedArticles/RelatedArticles'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

export interface RelatedArticleProps {
  title: string
  publishedOn: string
  url: string
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: tocItemProps[]
  relatedArticles?: RelatedArticleProps[]
}

export default function PostLayout({ content, authors, children, toc }: LayoutProps) {
  const { slug, date, title, tags, readingTime, relatedArticles } = content
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main ref={mainRef} className="container mx-auto">
      <SectionContainer>
        <ScrollTopAndComment />

        <BlogHeader
          title={title}
          tags={tags}
          authors={authors}
          publishedDate={date}
          readingTime={readingTime.text}
          key={slug}
        />
        <ProgressBar target={mainRef} />
        <div className="post container flex flex-row-reverse overflow-clip">
          <div className="post-toc ml-4 w-1/4">
            {toc.map((tocItem: tocItemProps) => {
              return (
                <div className="post-toc-item" key={tocItem.url}>
                  <a data-level={tocItem.depth} href={tocItem.url} className="line-clamp-2">
                    {tocItem.value}
                  </a>
                </div>
              )
            })}
          </div>

          <div className="post-content w-3/4 pr-4">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>
        </div>

        {relatedArticles && Array.isArray(relatedArticles) && (
          <RelatedArticles relatedArticles={relatedArticles} />
        )}
      </SectionContainer>
    </main>
  )
}
