/** @jsxImportSource react */
'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import OpenTelemetryBanner from '@/components/OpenTelemetryBanner/OpenTelemetryBanner'
import SignUpStrip from '@/components/SignUpStrip/SignUpStrip'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import SidebarAuthorInfo from '@/components/SidebarAuthorInfo/SidebarAuthorInfo'
import RelatedJobs from '@/components/RelatedJobs/RelatedJobs'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

// Extend the Blog type to include CTA fields
interface OpenTelemetryContent extends Blog {
  cta_title?: string
  cta_text?: string
}

interface LayoutProps {
  content: CoreContent<OpenTelemetryContent>
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

export default function OpenTelemetryLayout({
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
  const [showSignUpStrip, setShowSignUpStrip] = useState(false)

  // Handle scroll to show/hide sign-up strip
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const showThreshold = 400 // Adjust this value to control when the strip appears
      setShowSignUpStrip(scrollPosition > showThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      {/* Floating Sign-up Strip */}
      <SignUpStrip showSignUpStrip={showSignUpStrip} cta_title={cta_title} cta_text={cta_text} />

      <OpenTelemetryBanner title={title} date={date} readingTime={readingTime.text} tags={tags} />

      <SectionContainer>
        <div className="post relative flex">
          {/* Main content area centered in the remaining space */}
          <div className="mx-auto w-full max-w-3xl">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>

          {/* Right sidebar - Fixed position with internal scrolling */}
          <div className="post-toc fixed right-0 top-[120px] flex h-[calc(100vh-140px)] w-64 flex-col border-l border-signoz_ink-300 pl-8">
            {/* Learn OpenTelemetry Card */}
            <Link
              href="/resource-center/opentelemetry/"
              className="group mb-6 flex flex-col rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/50 p-3 transition-colors hover:border-signoz_robin-500"
            >
              <h3 className="text-sm font-medium text-white">Learn OpenTelemetry with SigNoz</h3>
              <div className="flex items-center gap-1 text-[11px] text-gray-400 transition-colors group-hover:text-white">
                <span>Explore tutorials</span>
                <ArrowRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>

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
        <div className="my-12">
          {/* Related Jobs Section */}
          <RelatedJobs />
          {/* Related Articles Section */}
          {relatedArticles && Array.isArray(relatedArticles) && (
            <div className="pt-16">
              <div className="mx-auto flex max-w-4xl items-start justify-between">
                <h2 className="w-1/3 text-xl font-semibold text-white">Related Articles</h2>
                <div className="w-2/3 space-y-4">
                  {relatedArticles.slice(0, 2).map((article, index) => (
                    <Link
                      key={index}
                      href={article.url}
                      target="_blank"
                      className="group flex items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/50 p-6 transition-colors hover:border-signoz_robin-500"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-white">{article.title}</h3>
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
                    </Link>
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
