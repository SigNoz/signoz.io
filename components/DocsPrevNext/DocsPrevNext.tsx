'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import docsSideNav from '@/constants/docsSideNav'
import { getPrevAndNextRoutes } from '../../utils/common'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'

export default function DocsPrevNext() {
  const pathname = usePathname()
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
