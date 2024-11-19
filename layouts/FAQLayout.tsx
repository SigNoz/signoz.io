'use client'

import '../css/post.css'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import FAQHeader, { AuthorProps } from '@/components/FAQHeader/FAQHeader'
import RelatedArticles from '@/components/RelatedArticles/RelatedArticles'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import GetStartedSigNoz from '@/components/GetStartedSigNoz/GetStartedSigNoz'

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

export default function FAQLayout({ content, authors, children, toc }: LayoutProps) {
  const { slug, date, title, tags, readingTime, relatedArticles } = content
  const mainRef = useRef<HTMLElement | null>(null)
  const [isTocVisible, setIsTocVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef<'up' | 'down'>('up')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const scrollThreshold = viewportHeight * 0.3 // 30% of viewport height

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        scrollDirection.current = 'down'
      } else if (currentScrollY < lastScrollY.current) {
        scrollDirection.current = 'up'
      }

      // Update TOC visibility based on scroll position and direction
      if (scrollDirection.current === 'down' && currentScrollY > scrollThreshold) {
        setIsTocVisible(false)
      } else if (scrollDirection.current === 'up') {
        setIsTocVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main ref={mainRef} className="container mx-auto">
      <SectionContainer>
        <ScrollTopAndComment />

        <FAQHeader
          title={title}
          tags={tags}
          authors={authors}
          publishedDate={date}
          readingTime={readingTime.text}
          key={slug}
        />
        <ProgressBar target={mainRef} />
        <div className="post container flex flex-row-reverse overflow-clip">
          <div
            className={`post-toc ml-4 w-1/4 transition-opacity duration-1000 ${
              isTocVisible ? 'opacity-100' : 'opacity-30'
            } hover:opacity-100`}
          >
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

          <div className="post-content w-3/4 pr-4" style={{ paddingLeft: '0px' }}>
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
            <div className="my-8">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl pt-8 pb-4 px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <GetStartedSigNoz />
              </div>
            </div>
          </div>
        </div>
        {relatedArticles && Array.isArray(relatedArticles) && (
          <RelatedArticles relatedArticles={relatedArticles} />
        )}
      </SectionContainer>

      
    </main>
  )
}
