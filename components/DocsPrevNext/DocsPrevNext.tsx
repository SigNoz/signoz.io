'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import docsSideNav from '@/constants/docsSideNav'
import { getPrevAndNextRoutes } from '../../utils/common'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import { QUERY_PARAMS } from '@/constants/queryParams'

export default function DocsPrevNext() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  if (source === ONBOARDING_SOURCE) {
    return null
  }

  const { prev, next } = getPrevAndNextRoutes(docsSideNav, pathname)
  return (
    <div className="docs-prev-next-nav mt-16 flex items-center justify-between">
      {prev && prev?.route && (
        <Link
          href={prev?.route || ''}
          className="docs-prev rounded bg-signoz_slate-500 p-2 px-4 no-underline"
        >
          <div className="mb-2 text-xs font-bold">Prev</div>

          <div className="flex items-center justify-center gap-1 text-sm font-bold">
            <ChevronsLeft size={14} /> {prev?.label}
          </div>
        </Link>
      )}

      {next && next?.route && (
        <Link
          href={next?.route || ''}
          className="docs-next rounded bg-signoz_slate-500 p-2 px-4 no-underline"
        >
          <div className="mb-2 flex justify-end text-xs font-bold">Next</div>

          <div className="flex items-center justify-end gap-1 text-sm font-bold">
            {next?.label}

            <ChevronsRight size={14} />
          </div>
        </Link>
      )}
    </div>
  )
}
