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
  const formattedDate =
    lastUpdatedDate
      ? new Date(lastUpdatedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null
  const source = searchParams.get(QUERY_PARAMS.SOURCE)
  const isOnboarding = source === ONBOARDING_SOURCE

  return (
    <>
      <div className={`doc-content ${isOnboarding ? 'product-onboarding' : ''}`}>
        {!isOnboarding && post.tags && post.tags.length > 0 && (
          <TagsWithTooltips tags={post.tags} />
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 mb-4">
          <h2 className="text-3xl m-0">{title}</h2>
        </div>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
        <div className="flex justify-between items-center mt-8 text-sm">
          {formattedDate && (
            <p className="text-gray-500 dark:text-gray-400">Last updated: {formattedDate}</p>
          )}
          {editLink && (
            <Button
              href={editLink}
              variant='outline'
              className="gap-2 no-underline"
            >
              <Edit size={16} />
              Edit on GitHub
            </Button>
          )}
        </div>
        <PageFeedback />
        <DocsPrevNext />
      </div>

      {!hideTableOfContents && (
        <TableOfContents
          toc={toc}
          hideTableOfContents={hideTableOfContents}
          source={source || ''}
        />
      )}
    </>
  )
}

export default DocContent