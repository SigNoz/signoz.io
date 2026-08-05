'use client'

import React, { useCallback, useMemo, useRef } from 'react'
import { Edit } from 'lucide-react'
import { cn } from 'app/lib/utils'
import PageFeedback from '../PageFeedback/PageFeedback'
import DocsPrevNext from '../DocsPrevNext/DocsPrevNext'
import TableOfContents from '../DocsTOC/DocsTOC'
import { DOC_TOC_CLASSES } from '@/components/DocsTOC/docLayoutClasses'
import OpenInAI from '@/components/OpenInAI'
import TagsWithTooltips from '@/components/TagsWithTooltips/TagsWithTooltips'
import { usePathname } from 'next/navigation'
import { buildCopyMarkdownFromRendered } from '@/utils/docs/buildCopyMarkdownFromRendered'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import { resolveLatestDate, formatDisplayDate } from '@/utils/dateUtils'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import type { BreadcrumbCrumb } from '@/utils/breadcrumbTypes'

const DocContent: React.FC<{
  title: string
  post: any
  toc: any
  hideTableOfContents: boolean
  editLink?: string
  breadcrumbs?: BreadcrumbCrumb[]
  children: React.ReactNode
}> = ({ title, post, toc, hideTableOfContents, editLink, breadcrumbs, children }) => {
  const pathname = usePathname()
  const lastUpdatedDate = post?.lastmod || resolveLatestDate(post)
  const formattedDate = formatDisplayDate(lastUpdatedDate)
  const isOnboarding = isDocsOnboardingPathname(pathname)
  // Check if this is the introduction page (exclude copy functionality)
  const isIntroductionPage = post.slug === 'introduction'

  const hasTabs = !!post?.body?.raw && post.body.raw.includes('<Tabs')
  const effectiveHideTOC = hideTableOfContents && !hasTabs
  const shouldRenderTOC = !effectiveHideTOC && Array.isArray(toc) && toc.length > 0 && !isOnboarding
  const shouldReserveTocColumn = !isOnboarding
  const articleRef = useRef<HTMLElement | null>(null)

  const docTags = useMemo(() => post?.docTags || [], [post?.docTags])

  const fallbackMarkdown = useMemo(() => {
    const tagLine = docTags.length > 0 ? `Tags: ${docTags.join(', ')}` : ''
    return [`# ${title}`, tagLine, post?.body?.raw || ''].filter(Boolean).join('\n\n')
  }, [docTags, post?.body?.raw, title])

  const getMarkdownContent = useCallback(async () => {
    if (!articleRef.current) {
      return fallbackMarkdown
    }
    return buildCopyMarkdownFromRendered(articleRef.current, {
      title,
      tags: docTags,
      includeTagDefinitions: true,
    })
  }, [docTags, fallbackMarkdown, title])

  return (
    <>
      <div
        data-docs-content-column=""
        className={`box-border min-w-0 flex-[1_1_auto] [&_details+details]:mt-8 ${isOnboarding ? 'w-full px-4' : ''}`}
      >
        {breadcrumbs && !isOnboarding && <Breadcrumb crumbs={breadcrumbs} />}
        <div className="m-0 flex items-center justify-between gap-2">
          <div className="flex flex-col items-start gap-2">
            <h1 className="mt-2 text-3xl leading-tight">{title}</h1>
          </div>
          {!isIntroductionPage && post.body?.raw && (
            <OpenInAI
              getMarkdownContent={getMarkdownContent}
              pageUrl={pathname}
              className="shrink-0"
              copyLabel="Copy markdown"
              docSlug={post.slug}
            />
          )}
        </div>
        {!isOnboarding && post.docTags && post.docTags.length > 0 && (
          <TagsWithTooltips tags={post.docTags} />
        )}
        <article ref={articleRef} className="prose prose-slate max-w-none py-6 dark:prose-invert">
          {children}
        </article>
        {/* Mobile / no-TOC: feedback → last updated → Edit on GitHub, above prev/next */}
        <div className={cn('mt-8 flex flex-col gap-6', shouldRenderTOC && 'lg:hidden')}>
          <PageFeedback />
          {(formattedDate || editLink) && (
            <div className="flex flex-col gap-4">
              {formattedDate && (
                <p className="m-0 text-sm font-medium text-[var(--l2-foreground)]">
                  Last updated
                  <span className="mx-1">—</span>
                  <span className="text-[var(--l1-foreground-hover)]">{formattedDate}</span>
                </p>
              )}
              {editLink && (
                <a
                  href={editLink}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--l2-foreground)] no-underline transition-colors hover:text-[var(--l2-foreground-hover)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Edit size={12} aria-hidden="true" />
                  Edit on GitHub
                </a>
              )}
            </div>
          )}
        </div>
        <DocsPrevNext />
      </div>

      {shouldRenderTOC ? (
        <>
          <TableOfContents
            toc={toc}
            hideTableOfContents={!shouldRenderTOC}
            source=""
            formattedDate={formattedDate || undefined}
            editLink={editLink}
          />
        </>
      ) : shouldReserveTocColumn ? (
        <>
          <div className={`${DOC_TOC_CLASSES} invisible`} aria-hidden="true" />
        </>
      ) : null}
    </>
  )
}

export default DocContent
