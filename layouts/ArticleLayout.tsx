'use client'

import { ReactNode, useRef } from 'react'
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
import ArticleMetaDetailsCard from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import TrackingLink from '@/components/TrackingLink'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import NewsletterSubscription from '@/components/NewsletterSubscription/NewsletterSubscription'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useScrollToHash } from '@/hooks/useScrollToHash'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'
import { getFormattedDates } from '@/utils/dateUtils'
import { buildRenderedAuthors, getReadingTimeText } from '@/utils/articleMeta'

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
  const hasToc = Array.isArray(toc) && toc.length > 0
  const { activeSection, setActiveSection } = useScrollSpy(hasToc ? toc : [], { offset: 120 })
  const { tocItemsRef, scrollFadeStyle } = useTocScrollFade(toc?.length ?? 0)

  useScrollToHash()

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
            <div className="mt-8 max-lg:py-6 lg:hidden">
              <PageFeedback />
            </div>

            {(renderedAuthors.length > 0 || primaryTags.length > 0) && (
              <div className="lg:hidden">
                <ArticleMetaDetailsCard
                  authors={renderedAuthors}
                  primaryTags={primaryTags}
                  hiddenTags={hiddenTags}
                  hiddenTagsTitle={hiddenTagsTitle}
                />
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
