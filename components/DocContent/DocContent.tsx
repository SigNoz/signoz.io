'use client'

import React from 'react'
import { Edit3 } from 'lucide-react'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PageFeedback from '../PageFeedback/PageFeedback'
import DocsPrevNext from '../DocsPrevNext/DocsPrevNext'
import TableOfContents from '../DocsTOC/DocsTOC'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { useSearchParams } from 'next/navigation'
import { ONBOARDING_SOURCE } from '@/constants/globals'

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

  return (
    <>
      <div className={`doc-content ${source === ONBOARDING_SOURCE ? 'product-onboarding' : ''}`}>
        <h2 className="mt-2 text-3xl">{title}</h2>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
        <div className="flex justify-between items-center mt-8 text-sm">
          {formattedDate && (
            <p className="text-gray-500 dark:text-gray-400">Last updated: {formattedDate}</p>
          )}
          {editLink && (
            <a
              href={editLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-sm transition-all duration-200"
            >
              <Edit3 size={16} />
              Edit on GitHub
            </a>
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