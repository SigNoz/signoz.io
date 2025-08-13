'use client'

import React from 'react'
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
        <div className="flex justify-between items-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          {formattedDate && (
            <p>Last updated: {formattedDate}</p>
          )}
          {editLink && (
            <a
              href={editLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 dark:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 0111.27 9.782l3.106-1.262a2 2 0 01.815.815l-1.262 3.106a4 4 0 01-1.885 1.885l-3.106 1.262a2 2 0 01-.815-.815z" />
                <path d="M10.92 2.08a6 6 0 00-7.03 7.03l-1.262 3.106a2 2 0 00.815.815l3.106-1.262a6 6 0 007.03-7.03l-3.106-1.262a2 2 0 00-.815-.815zM14.25 12.25a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5z" />
              </svg>
              <span>Edit this page</span>
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
