'use client'

import React, { Suspense } from 'react'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PageFeedback from '../PageFeedback/PageFeedback'
import DocsPrevNext from '../DocsPrevNext/DocsPrevNext'
import TableOfContents from '../DocsTOC/DocsTOC'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { useSearchParams } from 'next/navigation'
import { ONBOARDING_SOURCE } from '@/constants/globals'

const StaticDocContent = ({ title, post, toc, hideTableOfContents, formattedDate }: { title: string, post: any, toc: any, hideTableOfContents: boolean, formattedDate: string | null }) => {
  return (
    <>
      <div className="doc-content">
        <h2 className="mt-2 text-3xl">{title}</h2>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
        {formattedDate && (
          <p className="mt-8 text-sm text-gray-500">
            Last updated: {formattedDate}
          </p>
        )}
        <PageFeedback />
        <DocsPrevNext />
      </div>
      <TableOfContents
        toc={toc}
        hideTableOfContents={hideTableOfContents}
        source={''}
      />
    </>
  )
}

const DocContentInner: React.FC<{
  title: string
  post: any
  toc: any
  hideTableOfContents: boolean
  formattedDate: string | null
}> = ({ title, post, toc, hideTableOfContents, formattedDate }) => {
  const searchParams = useSearchParams()
  
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  return (
    <>
      <div className={`doc-content ${source === ONBOARDING_SOURCE ? 'product-onboarding' : ''}`}>
        <h2 className="mt-2 text-3xl">{title}</h2>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
        {formattedDate && (
          <p className="mt-8 text-sm text-gray-500">
            Last updated: {formattedDate}
          </p>
        )}
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

const DocContent: React.FC<{
  title: string
  post: any
  toc: any
  hideTableOfContents: boolean
}> = (props) => {
  const lastUpdatedDate = props.post?.lastmod || props.post?.date
  const formattedDate =
    lastUpdatedDate
      ? new Date(lastUpdatedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null

  return (
    <Suspense fallback={<><StaticDocContent {...props} formattedDate={formattedDate} /></>}>
      <DocContentInner {...props} formattedDate={formattedDate} />
    </Suspense>
  )
}

export default DocContent
