'use client'

import '../css/doc.css'

import { ReactNode, useEffect, useRef } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Doc } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import React from 'react'
import DocsSidebar from '@/components/DocsSidebar/DocsSidebar'
import { usePathname } from 'next/navigation'
import { getPrevAndNextRoutes } from '../utils/common'
import docsSideNav from '@/constants/docsSideNav'
import Link from 'next/link'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { RegionProvider } from '@/components/Region/RegionContext'

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

interface LayoutProps {
  content: CoreContent<Doc>
  children: ReactNode
  toc: tocItemProps[]
}

export default function DocLayout({ content, children, toc }: LayoutProps) {
  const { title } = content
  const pathname = usePathname()
  const mainRef = useRef<HTMLElement | null>(null)
  const { prev, next } = getPrevAndNextRoutes(docsSideNav, pathname)

  return (
    <RegionProvider>
      <main ref={mainRef} className="">
        <ProgressBar target={mainRef} />
        <SectionContainer>
          <div className="doc overflow-clip">
            <div className="doc-sidenav border-r border-signoz_slate-500">
              <DocsSidebar />
            </div>

            <div className="doc-content md:px-0 lg:px-4">
              <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
                <h2 className="text-3xl">{title}</h2>
                {children}

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
              </article>
            </div>

            {toc && Array.isArray(toc) && toc.length > 0 && (
              <div className="doc-toc">
                <div className="mb-3 text-xs uppercase"> On this page </div>

                <div className="doc-toc-items border-l border-signoz_slate-500 pl-3 ">
                  {toc.map((tocItem: tocItemProps) => {
                    return (
                      <div className="doc-toc-item" key={tocItem.url}>
                        <a
                          data-level={tocItem.depth}
                          href={tocItem.url}
                          className="mb-1 line-clamp-2 text-xs"
                        >
                          {tocItem.value}
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </SectionContainer>
      </main>
    </RegionProvider>
  )
}
