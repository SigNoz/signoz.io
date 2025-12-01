'use client'

import React from 'react'
import { Edit } from 'lucide-react'
import Button from '@/components/ui/Button'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PageFeedback from '../PageFeedback/PageFeedback'
import DocsPrevNext from '../DocsPrevNext/DocsPrevNext'
import TableOfContents from '../DocsTOC/DocsTOC'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { useSearchParams } from 'next/navigation'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import CopyAsMarkdown from '@/components/CopyAsMarkdown'
import TagsWithTooltips from '@/components/TagsWithTooltips/TagsWithTooltips'

const DocContent: React.FC<{
  title: string
  post: any
  toc: any
  hideTableOfContents: boolean
  editLink?: string
}> = ({ title, post, toc, hideTableOfContents, editLink }) => {
  const searchParams = useSearchParams()
  const lastUpdatedDate = post?.lastmod || post?.date
  const formattedDate = lastUpdatedDate
    ? new Date(lastUpdatedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null
  const source = searchParams.get(QUERY_PARAMS.SOURCE)
  const isOnboarding = source === ONBOARDING_SOURCE
  // Check if this is the introduction page (exclude copy functionality)
  const isIntroductionPage = post.slug === 'introduction'

  const hasTabs = !!post?.body?.raw && post.body.raw.includes('<Tabs')
  const effectiveHideTOC = hideTableOfContents && !hasTabs
  const shouldRenderTOC =
    !effectiveHideTOC && Array.isArray(toc) && toc.length > 0 && source !== ONBOARDING_SOURCE
  const shouldReserveTocColumn = source !== ONBOARDING_SOURCE

  return (
    <>
      <div className={`doc-content ${source === ONBOARDING_SOURCE ? 'product-onboarding' : ''}`}>
        <div className="doc-title-row mb-4 flex items-center justify-between gap-2">
          <div className="flex flex-col items-start gap-2">
            {!isOnboarding && post.tags && post.tags.length > 0 && (
              <TagsWithTooltips tags={post.tags} />
            )}
            <h1 className="mt-2 text-3xl leading-tight">{title}</h1>
          </div>
          {!isIntroductionPage && post.body?.raw && (
            <CopyAsMarkdown
              markdownContent={post.body.raw}
              className="shrink-0"
              buttonVariant="ghost"
              buttonSize="sm"
              label="Copy markdown"
              docSlug={post.slug}
            />
          )}
        </div>
        <article className="prose prose-slate max-w-none pb-6 dark:prose-invert">
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
        </article>
        <div className="mt-8 flex items-center justify-between text-sm">
          {formattedDate && (
            <p className="text-gray-500 dark:text-gray-400">Last updated: {formattedDate}</p>
          )}
          {editLink && (
            <Button href={editLink} variant="outline" className="gap-2 no-underline">
              <Edit size={16} />
              Edit on GitHub
            </Button>
          )}
        </div>
        <PageFeedback />
        <DocsPrevNext />
      </div>

      {shouldRenderTOC ? (
        <TableOfContents toc={toc} hideTableOfContents={effectiveHideTOC} source={source || ''} />
      ) : shouldReserveTocColumn ? (
        <div className="doc-toc doc-toc--placeholder" aria-hidden="true" />
      ) : null}
    </>
  )
}

export default DocContent
