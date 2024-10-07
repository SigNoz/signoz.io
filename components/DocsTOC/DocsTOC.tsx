'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '../../constants/queryParams'
import { ONBOARDING_SOURCE } from '../../constants/globals'
interface TocItemProps {
  url: string
  depth: number
  value: string
}

interface TableOfContentsProps {
  toc: TocItemProps[]
  hideTableOfContents: boolean
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc, hideTableOfContents }) => {
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  if (
    hideTableOfContents ||
    !toc ||
    !Array.isArray(toc) ||
    toc.length === 0 ||
    source === ONBOARDING_SOURCE
  ) {
    return null
  }

  return (
    <div className="doc-toc">
      <div className="mb-3 text-xs uppercase"> On this page </div>
      <div className="doc-toc-items border-l border-signoz_slate-500 pl-3">
        {toc.map((tocItem) => (
          <div className="doc-toc-item" key={tocItem.url}>
            <a data-level={tocItem.depth} href={tocItem.url} className="mb-1 line-clamp-2 text-xs">
              {tocItem.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableOfContents
