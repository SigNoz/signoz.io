import React from 'react'

import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import { ARTICLE_TOC_RAIL_CLASS } from '@/components/TableOfContents/tocScrollFade'
import ArticleMetaDetailsCard from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import OpenTelemetryTocClient from './open-telemetry-hub/OpenTelemetryTocClient'
import PageFeedback from '@/components/PageFeedback/PageFeedback'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'
import { formatDisplayDate, resolveLatestDate } from '@/utils/dateUtils'
import { buildRenderedAuthors, getReadingTimeText } from '@/utils/articleMeta'

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
  const formattedUpdatedDate = formatDisplayDate(resolveLatestDate(content))
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

  return (
    <>
      <div
        className={`box-border w-full min-w-0 max-w-full flex-1 lg:px-4 ${!showSidebar ? 'mx-auto max-w-ot-narrow' : ''}`}
      >
        {(showSidebar || hasToc) && <div id={MOBILE_TRIGGER_ID} className="mb-4 lg:hidden" />}

        {breadcrumbs && <Breadcrumb crumbs={breadcrumbs} />}
        <article className="prose prose-slate w-full min-w-0 max-w-full break-words px-3 py-6 dark:prose-invert">
          <h1 className="text-3xl font-bold">{title}</h1>
          {(formattedUpdatedDate || readingTimeText) && (
            <div className="mb-2 mt-3 flex flex-wrap gap-3 text-xs text-gray-400 lg:hidden">
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
      </div>

      {(hasMetaInfo || hasToc) && (
        <aside className={ARTICLE_TOC_RAIL_CLASS} aria-label="On this page navigation">
          <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden">
            {metaInfoCard && <div className="shrink-0">{metaInfoCard}</div>}
            {hasToc && <OpenTelemetryTocClient toc={toc} />}
            <div className="shrink-0 rounded-xl border border-[var(--l2-border)] bg-[var(--l1-background)] p-4">
              <PageFeedback />
            </div>
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
