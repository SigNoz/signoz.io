'use client'

import React, { ReactNode, useRef, useState, useEffect } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import BlogBanner from '@/components/BlogBanner/BlogBanner'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import SidebarAuthorInfo from '@/components/SidebarAuthorInfo/SidebarAuthorInfo'
import TrackingLink from '@/components/TrackingLink'
import { ExternalLink } from 'lucide-react'
import MobileAuthorInfo from '@/components/MobileAuthorInfo/MobileAuthorInfo'
import NewsletterSubscription from '@/components/NewsletterSubscription/NewsletterSubscription'
import { useScrollToHash } from '@/hooks/useScrollToHash'

// Extend the Blog type to include CTA fields
interface BlogContent extends Blog {
  cta_title?: string
  cta_text?: string
}

interface LayoutProps {
  content: CoreContent<BlogContent>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
}

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

export default function GuidesLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
}: LayoutProps) {
  const { slug, date, title, tags, readingTime, cta_title, cta_text, relatedArticles } = content
  const mainRef = useRef<HTMLElement | null>(null)
  const tocContainerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>('')

  useScrollToHash()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first element that is intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by their position and select the one closest to the top
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const id = sortedEntries[0].target.getAttribute('id')
          if (id) setActiveSection(`#${id}`)
        }
      },
      {
        // This creates a trigger zone near the top of the viewport
        rootMargin: '-10% -20% -80% -20%',
        threshold: 0,
      }
    )

    const headings = document.querySelectorAll('h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  return (
    <main ref={mainRef}>
      <ScrollTopAndComment />

      <BlogBanner title={title} date={date} readingTime={readingTime.text} tags={tags} />

      <SectionContainer>
        <div className="post relative flex 2xl:max-w-[90rem]">
          {/* Main content area centered in the remaining space */}
          <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
            {/* Mobile author info - Visible only on mobile/tablet */}
            <MobileAuthorInfo authors={authors} />

            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>

            {/* Newsletter Section */}
            <div className="mb-16">
              <NewsletterSubscription />
            </div>
          </div>

          {/* Right sidebar - Hidden on mobile/tablet, Fixed position with internal scrolling on desktop */}
          <div className="post-toc hidden lg:fixed lg:right-0 lg:top-[120px] lg:flex lg:h-[calc(100vh-140px)] lg:w-64 lg:flex-col lg:border-l lg:border-signoz_ink-300 lg:pl-8">
            {/* TOC with internal scroll */}
            <div ref={tocContainerRef} className="mb-4 h-[calc(100%-180px)] overflow-y-auto">
              <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                On this page
              </h3>
              <TableOfContents
                toc={toc}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                scrollableContainerRef={tocContainerRef}
              />
            </div>

            {/* Author info fixed at bottom */}
            <div className="mt-auto">
              <h3 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                {authors.length === 1 ? 'Author' : 'Authors'}
              </h3>
              <SidebarAuthorInfo authors={authors} />
            </div>
          </div>
        </div>

        {/* Bottom sections */}
        <div className="my-12 px-4 md:px-6">
          {/* Related Articles Section */}
          {relatedArticles && Array.isArray(relatedArticles) && relatedArticles.length > 0 && (
            <div className="pt-16">
              <div className="mx-auto flex max-w-4xl flex-col items-start justify-between lg:flex-row">
                <h2 className="mb-6 w-full text-xl font-semibold text-white lg:mb-0 lg:w-1/3">
                  Related Articles
                </h2>
                <div className="w-full space-y-4 lg:w-2/3">
                  {relatedArticles.slice(0, 2).map((article, index) => (
                    <TrackingLink
                      key={index}
                      href={article.url}
                      target="_blank"
                      clickType="Nav Click"
                      clickName="Related Article Link"
                      clickText={article.title}
                      clickLocation="Blog Related Articles"
                      className="group flex items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/50 p-4 transition-colors hover:border-signoz_robin-500 md:p-6"
                    >
                      <div>
                        <h3 className="text-base font-medium text-white md:text-lg">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-400">
                          {new Date(article.publishedOn).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <ExternalLink
                        size={20}
                        className="text-gray-400 transition-colors group-hover:text-white"
                      />
                    </TrackingLink>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionContainer>
      <ProgressBar target={mainRef} />
    </main>
  )
}
