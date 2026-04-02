import '../css/opentelemetry-hub.css'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import ArticleMetaDetailsCard, {
  type RenderedAuthor,
} from '@/components/ArticleMetaDetailsCard/ArticleMetaDetailsCard'
import authorsDirectory from '@/constants/authors.json'
import OpenTelemetryTocClient from './open-telemetry-hub/OpenTelemetryTocClient'
import PageFeedback from '@/components/PageFeedback/PageFeedback'

const MOBILE_TRIGGER_ID = 'ot-hub-mobile-trigger'

export interface HubContentProps {
  content: {
    title?: string
    date?: string
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

export function getFormattedDate(content: HubContentProps['content']) {
  const updatedDate = content.date
  return updatedDate
    ? new Date(updatedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null
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
}: HubContentProps) {
  const title = content.title || ''
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

  return (
    <>
      <div className="doc-content md:px-0 lg:px-4">
        {(showSidebar || hasToc) && <div id={MOBILE_TRIGGER_ID} className="mb-4 lg:hidden" />}

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
        <div className={hasToc ? 'lg:hidden' : ''}>
          <PageFeedback />
        </div>

        {(renderedAuthors.length > 0 || primaryTags.length > 0) && (
          <div className="lg:hidden">
            <div className="rounded-xl border border-signoz_ink-300/80 bg-signoz_ink-500/50 p-4 text-xs text-white/90 shadow-lg">
              <div className="flex flex-col gap-4">
                {renderedAuthors.length > 0 && (
                  <div className="flex items-center gap-3">
                    {renderedAuthors[0].image && (
                      <Image
                        src={renderedAuthors[0].image}
                        alt={renderedAuthors[0].name}
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
      </div>

      {(hasMetaInfo || hasToc) && (
        <aside className="doc-right hidden lg:block" aria-label="On this page navigation">
          <div className="doc-right-inner">
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
