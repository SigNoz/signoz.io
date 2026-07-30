'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { AuthorDetail, Blog, Comparison, Guide } from '../types/transformedContent'
import { ArrowRight } from 'lucide-react'

import SectionContainer from '@/components/SectionContainer'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import {
  ARTICLE_TOC_RAIL_CLASS,
  TOC_SCROLL_CONTAINER_CLASS,
  TOC_SECTION_LABEL_CLASS,
  useTocScrollFade,
} from '@/components/TableOfContents/tocScrollFade'
import ArticleMetaDetailsCard, {
  type RenderedAuthor,
} from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import TrackingLink from '@/components/TrackingLink'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import NewsletterSubscription from '@/components/NewsletterSubscription/NewsletterSubscription'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'
import { getFormattedDates } from '@/utils/dateUtils'

const MAIN_CONTENT_ID = 'article-main'

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

type ContentType = Blog | Guide | Comparison

type ArticleContent = ContentType & {
  cta_title?: string
  cta_text?: string
  published_date?: string | null
  updated_date?: string | null
  relatedArticles?: Array<{ title: string; url: string; publishedOn: string }>
}

interface LayoutProps {
  content: CoreContent<ArticleContent>
  authorDetails: AuthorDetail[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
  contentType?: 'blog' | 'guide' | 'comparison'
  showNewsletter?: boolean
  showRelatedArticles?: boolean
  authorDirectory?: Record<string, { name?: string; url?: string; image_url?: string }>
  breadcrumbs?: BreadcrumbCrumb[]
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

export default function ArticleLayout({
  content,
  authorDetails,
  authors,
  children,
  toc,
  contentType = 'blog',
  showNewsletter = true,
  showRelatedArticles = true,
  authorDirectory = {},
  breadcrumbs,
}: LayoutProps) {
  const { title, relatedArticles } = content
  const mainRef = useRef<HTMLElement | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const hasToc = Array.isArray(toc) && toc.length > 0
  const { tocItemsRef, scrollFadeStyle } = useTocScrollFade(toc?.length ?? 0)

  useScrollToHash()

  useEffect(() => {
    if (!hasToc) return

    const HEADER_OFFSET_PX = 120

    const resolveHeading = (item: TocItemProps) => {
      const rawId = item.url.startsWith('#') ? item.url.slice(1) : item.url
      const normalizedId = rawId.replace(/-+$/g, '')
      const el = document.getElementById(rawId) || document.getElementById(normalizedId)
      if (!el || el.getClientRects().length === 0) return null
      return {
        url: item.url.startsWith('#') ? item.url : `#${rawId}`,
        el,
      }
    }

    const updateActiveSection = () => {
      const headings = toc
        .map(resolveHeading)
        .filter((item): item is { url: string; el: HTMLElement } => item !== null)
        .sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top)

      if (headings.length === 0) return

      let activeUrl = headings[0].url
      for (const heading of headings) {
        if (heading.el.getBoundingClientRect().top <= HEADER_OFFSET_PX) {
          activeUrl = heading.url
        }
      }
      setActiveSection((prev) => (prev === activeUrl ? prev : activeUrl))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [hasToc, toc])

  const renderedAuthors = buildRenderedAuthors(authorDetails, authors, authorDirectory)
  const { publishedDate: formattedPublishedDate, updatedDate: formattedUpdatedDate } =
    getFormattedDates(content)
  const readingTimeText = getReadingTimeText(content)

  const MAX_VISIBLE_TAGS = 2
  const MAX_RELATED_ARTICLES = 3
  const tagsArray = Array.isArray(content.tags) ? content.tags : []
  const primaryTags = tagsArray.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTags = tagsArray.slice(MAX_VISIBLE_TAGS)
  const hiddenTagsTitle = hiddenTags.length ? hiddenTags.join(', ') : undefined
  const hasMetaInfo =
    renderedAuthors.length > 0 ||
    Boolean(readingTimeText) ||
    Boolean(formattedPublishedDate) ||
    Boolean(formattedUpdatedDate) ||
    primaryTags.length > 0

  const metaInfoCard = hasMetaInfo ? (
    <ArticleMetaDetailsCard
      authors={renderedAuthors}
      readingTimeText={readingTimeText}
      formattedPublishedDate={formattedPublishedDate}
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
        <div className="mx-auto flex h-full w-full max-w-ot-hub items-start justify-center gap-4 overflow-clip px-3 pt-8 max-lg:flex-col max-lg:gap-3 md:px-6 md:pt-12 lg:px-8">
          <div className="mx-auto box-border w-full min-w-0 max-w-[780px] flex-auto md:px-0 lg:px-4">
            {hasToc && <div className="mb-4 lg:hidden" />}

            {breadcrumbs && <Breadcrumb crumbs={breadcrumbs} />}
            <article className="prose prose-slate max-w-none px-3 py-6 dark:prose-invert">
              <h1 className="text-3xl font-bold">{title}</h1>
              {(formattedPublishedDate || formattedUpdatedDate || readingTimeText) && (
                <div className="mb-2 mt-3 flex flex-wrap gap-3 text-xs text-gray-400 lg:hidden">
                  {formattedPublishedDate && <span>Published on: {formattedPublishedDate}</span>}
                  {formattedUpdatedDate && <span>Last Updated: {formattedUpdatedDate}</span>}
                  {readingTimeText && <span>{readingTimeText}</span>}
                </div>
              )}
              {children}
            </article>
            <div className="mt-8 lg:hidden">
              <PageFeedback />
            </div>

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
                            objectPosition="center"
                            objectFit="cover"
                            className="h-9 w-9 rounded-full border border-white/10 object-cover object-center"
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
                                    prefetch={false}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
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

            {/* Related Articles Section */}
            {showRelatedArticles &&
              relatedArticles &&
              Array.isArray(relatedArticles) &&
              relatedArticles.length > 0 && (
                <div className="mt-12 border-t border-signoz_ink-300 pt-10">
                  <div className="mb-6">
                    <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-signoz_robin-400">
                      Keep Reading
                    </p>
                    <h2 className="text-xl font-semibold text-white">Related Articles</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedArticles.slice(0, MAX_RELATED_ARTICLES).map((article, index) => (
                      <TrackingLink
                        key={index}
                        href={article.url}
                        target="_blank"
                        clickType="Nav Click"
                        clickName="Related Article Link"
                        clickText={article.title}
                        clickLocation={`${contentType} Related Articles`}
                        className="group flex flex-col justify-between rounded-xl border border-signoz_ink-300 bg-signoz_ink-400/50 p-5 transition-all duration-200 hover:border-signoz_robin-500/60 hover:bg-signoz_ink-400"
                      >
                        <div>
                          <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-signoz_robin-400/70">
                            {new Date(article.publishedOn || article.date).toLocaleDateString(
                              'en-US',
                              { month: 'short', year: 'numeric' }
                            )}
                          </p>
                          <h3 className="text-sm font-medium leading-snug text-white/90 group-hover:text-white">
                            {article.title}
                          </h3>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-xs text-signoz_robin-400/60 transition-all duration-200 group-hover:gap-2 group-hover:text-signoz_robin-400">
                          <span>Read article</span>
                          <ArrowRight size={12} />
                        </div>
                      </TrackingLink>
                    ))}
                  </div>
                </div>
              )}

            {/* Newsletter Section */}
            {showNewsletter && (
              <div className="mb-16 mt-8">
                <NewsletterSubscription />
              </div>
            )}
          </div>

          {/* Right sidebar - Desktop only */}
          {(hasMetaInfo || hasToc) && (
            <aside className={ARTICLE_TOC_RAIL_CLASS} aria-label="On this page navigation">
              <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
                {metaInfoCard && <div className="shrink-0">{metaInfoCard}</div>}
                {hasToc && (
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className={TOC_SECTION_LABEL_CLASS}>On this page</div>
                    <div
                      ref={tocItemsRef}
                      className={TOC_SCROLL_CONTAINER_CLASS}
                      style={scrollFadeStyle}
                    >
                      <TableOfContents
                        toc={toc}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        scrollableContainerRef={tocItemsRef}
                        size="xs"
                      />
                    </div>
                  </div>
                )}
                <div className="shrink-0 rounded-xl border border-[var(--l2-border)] bg-[var(--l1-background)] p-4">
                  <PageFeedback />
                </div>
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
