'use client'

import React from 'react'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PageFeedback from '../PageFeedback/PageFeedback'
import DocsPrevNext from '../DocsPrevNext/DocsPrevNext'
import TableOfContents from '../DocsTOC/DocsTOC'
import TrySigNozFloatingCard from '../TrySigNozFloatingCard/TrySigNozFloatingCard'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import { useSearchParams } from 'next/navigation'

const DocContent: React.FC<{
  title: string
  post: any
  toc: any
  hideTableOfContents: boolean
}> = ({ title, post, toc, hideTableOfContents }) => {
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  return (
    <>
      <div className={`doc-content ${source === ONBOARDING_SOURCE ? 'product-onboarding' : ''}`}>
        <h2 className="mt-2 text-3xl">{title}</h2>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc || []} />
        <PageFeedback 
          lastUpdated={post.lastmod || post.date}
          author={post.authors?.[0]}
        />
        <DocsPrevNext />
      </div>

      {!hideTableOfContents && (
        <TableOfContents
          toc={toc}
          hideTableOfContents={hideTableOfContents}
          source={source || ''}
        />
      )}
      <TrySigNozFloatingCard source={source || ''} />
    </>
  )
}

export default DocContent
