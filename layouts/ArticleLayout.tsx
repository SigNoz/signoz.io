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
        <div className="max-w-ot-hub mx-auto flex h-full w-full items-start justify-center gap-4 overflow-clip px-3 pt-8 max-lg:flex-col max-lg:gap-3 md:px-6 md:pt-12 lg:px-8">
          <div className="mx-auto box-border w-full max-w-[780px] min-w-0 flex-auto md:px-0 lg:px-4">
            {hasToc && <div className="mb-4 lg:hidden" />}

            {breadcrumbs && <Breadcrumb crumbs={breadcrumbs} />}
            <article className="prose prose-slate dark:prose-invert max-w-none px-3 py-6">
              <h1 className="text-3xl font-bold">{title}</h1>
              {(formattedPublishedDate || formattedUpdatedDate || readingTimeText) && (
                <div className="mt-3 mb-2 flex flex-wrap gap-3 text-xs text-gray-400 lg:hidden">
                  {formattedPublishedDate && <span>Published on: {formattedPublishedDate}</span>}
                  {formattedUpdatedDate && <span>Last Updated: {formattedUpdatedDate}</span>}
                  {readingTimeText && <span>{readingTimeText}</span>}
                </div>
              )}
              {children}
            </article>
            <div className={hasToc ? 'lg:hidden' : ''}>
              <PageFeedback />
            </div>

            {/* Mobile meta info card */}
            {(renderedAuthors.length > 0 || primaryTags.length > 0) && (
              <div className="lg:hidden">
                <div className="border-border/80 bg-background/50 text-foreground rounded-xl border p-4 text-xs shadow-lg">
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
                            className="border-border h-9 w-9 rounded-full border object-cover object-center"
                          />
                        )}
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">
                            Author{renderedAuthors.length > 1 ? 's' : ''}
                          </span>
                          <span className="text-foreground text-sm">
                            {renderedAuthors.map((author, idx) => (
                              <span key={`${author.name}-${idx}`}>
                                {author.url ? (
                                  <Link
                                    href={author.url}
                                    className="!text-muted-foreground hover:text-accent-primary transition-colors"
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
                                  <span className="text-muted-foreground">, </span>
                                )}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    )}

                    {primaryTags.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase">
                          Tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {primaryTags.map((tag) => (
                            <span
                              key={tag}
                              className="border-border text-foreground rounded-full border px-2 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {hiddenTags.length > 0 && (
                            <span
                              className="border-border text-foreground/70 rounded-full border px-2 py-1 text-xs"
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
                <div className="border-border mt-12 border-t pt-10">
                  <div className="mb-6">
                    <p className="text-accent-primary mb-1 text-xs font-medium tracking-[0.2em] uppercase">
                      Keep Reading
                    </p>
                    <h2 className="text-foreground text-xl font-semibold">Related Articles</h2>
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
                        className="group border-border bg-card/50 hover:border-primary/60 hover:bg-card flex flex-col justify-between rounded-xl border p-5 transition-all duration-200"
                      >
                        <div>
                          <p className="text-accent-primary/70 mb-3 text-[11px] font-medium tracking-widest uppercase">
                            {new Date(article.publishedOn || article.date).toLocaleDateString(
                              'en-US',
                              { month: 'short', year: 'numeric' }
                            )}
                          </p>
                          <h3 className="text-foreground group-hover:text-foreground text-sm leading-snug font-medium">
                            {article.title}
                          </h3>
                        </div>
                        <div className="text-accent-primary/60 group-hover:text-accent-primary mt-4 flex items-center gap-1 text-xs transition-all duration-200 group-hover:gap-2">
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
              <div className="mt-8 mb-16">
                <NewsletterSubscription />
              </div>
            )}
          </div>

          {/* Right sidebar - Desktop only */}
          {(hasMetaInfo || hasToc) && (
            <aside
              className="sticky top-[120px] box-border hidden h-[calc(100vh-140px)] max-h-[calc(100vh-140px)] w-80 max-w-80 min-w-80 flex-[0_0_320px] self-start px-4 lg:block"
              aria-label="On this page navigation"
            >
              <div className="flex h-full flex-col gap-3">
                {metaInfoCard}
                {hasToc && (
                  <div className="flex min-h-0 flex-auto flex-col gap-1">
                    <div className="mb-3 text-xs text-gray-400 uppercase">On this page</div>
                    <div
                      ref={tocContainerRef}
                      className="border-border relative z-[1] max-h-none min-h-0 flex-auto overflow-y-auto border-l pl-3"
                    >
                      <TableOfContents
                        toc={toc}
                        activeSection={activeSection}
                        setActiveSection={setActiveSection}
                        scrollableContainerRef={tocContainerRef}
                      />
                    </div>
                    <PageFeedback placement="toc" />
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
