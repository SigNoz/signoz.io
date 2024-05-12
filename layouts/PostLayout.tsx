'use client'

import '../css/post.css'

import { ReactNode, useRef } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import BlogHeader, { AuthorProps } from '@/components/BlogHeader/BlogHeader'
import RelatedArticles from '@/components/RelatedArticles/RelatedArticles'
import BlogFeedback from '@/components/BlogFeedback/BlogFeedback'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: tocItemProps[]
}

export default function PostLayout({ content, authors, children, toc }: LayoutProps) {
  const { filePath, path, slug, date, title, image, tags, readingTime } = content
  const basePath = path.split('/')[0]
  const mainRef = useRef<HTMLElement | null>(null)
  console.log('content', content.images)

  return (
    <main ref={mainRef}>
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
        <div className="post container overflow-clip">
          <div className="post-toc">
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

          <div className="post-content">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
              <BlogFeedback />
            </article>
          </div>
        </div>

        <RelatedArticles />
      </SectionContainer>
    </main>
  )
}
