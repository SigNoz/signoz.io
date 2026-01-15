'use client'

import '../css/article-layout.css'

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors, Comparison, Guide } from 'contentlayer/generated'
import { ExternalLink } from 'lucide-react'

import SectionContainer from '@/components/SectionContainer'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import ArticleMetaDetailsCard, {
  type RenderedAuthor,
} from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import TrackingLink from '@/components/TrackingLink'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import NewsletterSubscription from '@/components/NewsletterSubscription/NewsletterSubscription'
import authorsDirectory from '@/constants/authors.json'
import { useScrollToHash } from '@/hooks/useScrollToHash'

const MAIN_CONTENT_ID = 'article-main'

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

type ContentType = Blog | Comparison | Guide

type ArticleContent = ContentType & {
  cta_title?: string
  cta_text?: string
  relatedArticles?: Array<{ title: string; url: string; publishedOn: string }>
}

interface LayoutProps {
  content: CoreContent<ArticleContent>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  contentType?: 'blog' | 'guide' | 'comparison'
  showNewsletter?: boolean
  showRelatedArticles?: boolean
}

const buildRenderedAuthors = (
  authorDetails: LayoutProps['authorDetails'],
  authors: LayoutProps['authors'],
  directory: Record<string, { name?: string; url?: string; image_url?: string }>
): RenderedAuthor[] => {
  if (authorDetails && authorDetails.length > 0) {
    return authorDetails
      .map((detail, idx) => {
        const slug = authors?.[idx]
        const fallbackProfile = slug ? directory[slug] : undefined

        const name = detail.name || fallbackProfile?.name

        if (!name) return null

        return {
          name,
          url: detail.url || fallbackProfile?.url,
          image: fallbackProfile?.image_url,
        }
      })
      .filter(Boolean) as RenderedAuthor[]
  }

  if (authors && authors.length > 0) {
    return authors
      .map((slug) => {
        const profile = directory[slug]
        if (!profile?.name) return null
        return {
          name: profile.name,
          url: profile.url,
          image: profile.image_url,
        }
      })
      .filter(Boolean) as RenderedAuthor[]
  }

  return []
}

const getReadingTimeText = (content: LayoutProps['content']) => {
  if ('readingTime' in content && content.readingTime) {
    const rt = content.readingTime as { text?: string; minutes?: number }
    return rt.text || (rt.minutes ? `${Math.ceil(rt.minutes)} min read` : null)
  }
  return null
}

const getFormattedDate = (content: LayoutProps['content']) => {
  const updatedDate = content.lastmod || content.date
  return updatedDate
    ? new Date(updatedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null
}

export default function ArticleLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  contentType = 'blog',
  showNewsletter = true,
  showRelatedArticles = true,
}: LayoutProps) {
  const { title, relatedArticles } = content
  const mainRef = useRef<HTMLElement | null>(null)
  const tocContainerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>('')

  useScrollToHash()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const id = sortedEntries[0].target.getAttribute('id')
          if (id) setActiveSection(`#${id}`)
        }
      },
      {
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

  const hasToc = Array.isArray(toc) && toc.length > 0

  const renderedAuthors = buildRenderedAuthors(
    authorDetails,
    authors,
    authorsDirectory as Record<string, { name?: string; url?: string; image_url?: string }>
  )
  const formattedUpdatedDate = getFormattedDate(content)
  const readingTimeText = getReadingTimeText(content)

  const MAX_VISIBLE_TAGS = 2
  const tagsArray = Array.isArray(content.tags) ? content.tags : []
  const primaryTags = tagsArray.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTags = tagsArray.slice(MAX_VISIBLE_TAGS)
  const hiddenTagsTitle = hiddenTags.length ? hiddenTags.join(', ') : undefined
  const hasMetaInfo =
    renderedAuthors.length > 0 ||
    Boolean(readingTimeText) ||
    Boolean(formattedUpdatedDate) ||
    primaryTags.length > 0

  const metaInfoCard = hasMetaInfo ? (
    <ArticleMetaDetailsCard
      authors={renderedAuthors}
      readingTimeText={readingTimeText}
      formattedUpdatedDate={formattedUpdatedDate}
      primaryTags={primaryTags}
      hiddenTags={hiddenTags}
      hiddenTagsTitle={hiddenTagsTitle}
    />
  ) : null

  const primaryAuthor = renderedAuthors[0]

  return (
    <main id={MAIN_CONTENT_ID} ref={mainRef}>
      <SectionContainer>
        <div className="doc doc-no-sidebar overflow-clip px-3 pt-8 md:px-6 md:pt-12 lg:px-8">
          <div className="doc-content md:px-0 lg:px-4">
            {hasToc && <div className="mb-4 lg:hidden" />}

            <article className="prose prose-slate max-w-none px-3 py-6 dark:prose-invert">
              <h1 className="text-3xl font-bold">{title}</h1>
              {(formattedUpdatedDate || readingTimeText) && (
                <div className="mb-2 mt-3 flex flex-wrap gap-3 text-xs text-gray-400 lg:hidden">
                  {formattedUpdatedDate && <span>Updated {formattedUpdatedDate}</span>}
                  {readingTimeText && <span>{readingTimeText}</span>}
                </div>
              )}
              {children}
            </article>

            {/* Mobile meta info card */}
            {(renderedAuthors.length > 0 || primaryTags.length > 0) && (
              <div className="lg:hidden">
                <div className="rounded-xl border border-signoz_ink-300/80 bg-signoz_ink-500/50 p-4 text-xs text-white/90 shadow-lg">
                  <div className="flex flex-col gap-4">
                    {renderedAuthors.length > 0 && (
                      <div className="flex items-center gap-3">
                        {primaryAuthor?.image && (
                          <Image
                            src={primaryAuthor.image}
                            alt={primaryAuthor.name}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full border border-white/10 object-cover"
                          />
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                            Author{renderedAuthors.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-sm text-white">
                            {renderedAuthors.map((author, idx) => (
                              <span key={`${author.name}-${idx}`}>
                                {author.url ? (
                                  <Link
                                    href={author.url}
                                    className="!text-gray-200 transition-colors hover:text-signoz_robin-400"
                                  >
                                    {author.name}
                                  </Link>
                                ) : (
                                  author.name
                                )}
                                {idx < renderedAuthors.length - 1 && (
                                  <span className="text-white/60">, </span>
                                )}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    )}

                    {primaryTags.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                          Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {primaryTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                          {hiddenTags.length > 0 && (
                            <span
                              className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                              title={hiddenTagsTitle}
                            >
                              +{hiddenTags.length} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter Section */}
            {showNewsletter && (
              <div className="mb-16 mt-8">
                <NewsletterSubscription />
              </div>
            )}

            {/* Related Articles Section */}
            {showRelatedArticles &&
              relatedArticles &&
              Array.isArray(relatedArticles) &&
              relatedArticles.length > 0 && (
                <div className="pt-8">
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
                          clickLocation={`${contentType} Related Articles`}
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

          {/* Right sidebar - Desktop only */}
          {(hasMetaInfo || hasToc) && (
            <aside className="doc-right hidden lg:block" aria-label="On this page navigation">
              <div className="doc-right-inner">
                {metaInfoCard}
                {hasToc && (
                  <div className="doc-toc">
                    <div className="mb-3 text-xs uppercase text-gray-400">On this page</div>
                    <div
                      ref={tocContainerRef}
                      className="doc-toc-items doc-toc-scroll border-l border-signoz_slate-500 pl-3"
                    >
                      <TableOfContents
                        toc={toc}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        scrollableContainerRef={tocContainerRef}
                      />
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>

        {/* Floating TOC for mobile */}
        {hasToc && (
          <div className="lg:hidden">
            <FloatingTableOfContents />
          </div>
        )}
      </SectionContainer>
      <ProgressBar target={mainRef} />
    </main>
  )
}
