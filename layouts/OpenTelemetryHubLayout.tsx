import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import ArticleMetaDetailsCard, {
  type RenderedAuthor,
} from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import OpenTelemetryTocClient from './open-telemetry-hub/OpenTelemetryTocClient'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'
import { getFormattedDates } from '@/utils/dateUtils'

const MOBILE_TRIGGER_ID = 'ot-hub-mobile-trigger'

export interface HubContentProps {
  content: {
    title?: string
    published_date?: string | null
    updated_date?: string | null
    /** @deprecated Use `published_date` and `updated_date` instead. */
    date?: string | null
    lastmod?: string
    tags?: string[]
    readingTime?: { text?: string; minutes?: number; time?: number; words?: number }
    authors?: string[]
  }
  authorDetails: { name?: string; url?: string; [key: string]: any }[]
  authors: string[]
  children: React.ReactNode
  toc: { url: string; depth: number; value: string }[]
  showSidebar: boolean
  authorDirectory?: Record<string, { name?: string; url?: string; image_url?: string }>
  breadcrumbs?: BreadcrumbCrumb[]
}

export function buildRenderedAuthors(
  authorDetails: HubContentProps['authorDetails'],
  authors: HubContentProps['authors'],
  directory: Record<string, { name?: string; url?: string; image_url?: string }>
): RenderedAuthor[] {
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

export function getReadingTimeText(content: HubContentProps['content']) {
  if (content.readingTime) {
    return (
      content.readingTime.text ||
      (content.readingTime.minutes ? `${Math.ceil(content.readingTime.minutes)} min read` : null)
    )
  }
  return null
}

/**
 * Content-only hub component. The outer shell (sidebar, header tabs, grid
 * container) lives in `app/(opentelemetry-hub-routes)/layout.tsx` so the
 * sidebar persists across all route-segment navigations.
 */
export default function OpenTelemetryHubContent({
  content,
  authorDetails,
  authors,
  children,
  toc,
  showSidebar,
  authorDirectory = {},
  breadcrumbs,
}: HubContentProps) {
  const title = content.title || ''
  const hasToc = Array.isArray(toc) && toc.length > 0

  const renderedAuthors = buildRenderedAuthors(authorDetails, authors, authorDirectory)
  const { publishedDate: formattedPublishedDate, updatedDate: formattedUpdatedDate } =
    getFormattedDates(content)
  const readingTimeText = getReadingTimeText(content)

  const MAX_VISIBLE_TAGS = 2
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
    <>
      <div
        className={`box-border w-full max-w-full min-w-0 flex-1 lg:px-4 ${!showSidebar ? 'max-w-ot-narrow mx-auto' : ''}`}
      >
        {(showSidebar || hasToc) && <div id={MOBILE_TRIGGER_ID} className="mb-4 lg:hidden" />}

        {breadcrumbs && <Breadcrumb crumbs={breadcrumbs} />}
        <article className="prose prose-slate dark:prose-invert w-full max-w-full min-w-0 px-3 py-6 break-words">
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

        {(renderedAuthors.length > 0 || primaryTags.length > 0) && (
          <div className="lg:hidden">
            <div className="border-border/80 bg-background/50 text-foreground rounded-xl border p-4 text-xs shadow-lg">
              <div className="flex flex-col gap-4">
                {renderedAuthors.length > 0 && (
                  <div className="flex items-center gap-3">
                    {renderedAuthors[0].image && (
                      <Image
                        src={renderedAuthors[0].image}
                        alt={renderedAuthors[0].name}
                        width={36}
                        height={36}
                        className="border-border h-9 w-9 rounded-full border object-cover"
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
      </div>

      {(hasMetaInfo || hasToc) && (
        <aside
          className="box-border hidden w-full max-w-none min-w-0 shrink-0 px-4 max-lg:static max-lg:h-auto max-lg:max-h-none lg:sticky lg:top-[120px] lg:block lg:h-[calc(100vh-140px)] lg:max-h-[calc(100vh-140px)] lg:w-80 lg:max-w-[320px] lg:min-w-[320px] lg:self-start"
          aria-label="On this page navigation"
        >
          <div className="flex h-full flex-col gap-3">
            {metaInfoCard}
            {hasToc && <OpenTelemetryTocClient toc={toc} />}
          </div>
        </aside>
      )}

      {hasToc && (
        <div className="lg:hidden">
          <FloatingTableOfContents />
        </div>
      )}
    </>
  )
}
