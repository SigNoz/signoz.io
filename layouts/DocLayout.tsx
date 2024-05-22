'use client'

import '../css/doc.css'

import { ReactNode, useRef } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors, Doc } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import React from 'react'
import TocComponent from '@/components/DocsTOC/DocsTOC'
import docsSideNav from '../constants/docsSideNav'
import { TocItem } from '@/components/DocsTOC/types'

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
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    <main ref={mainRef} className="">
      <SectionContainer>
        <ProgressBar target={mainRef} />
        <div className="doc overflow-clip">
          <div className="doc-sidenav border-r border-signoz_slate-500 ">
            <TocComponent toc={docsSideNav as TocItem[]} />
          </div>

          <div className="doc-content px-8">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              <h2 className="text-3xl">{title}</h2>
              {children}
            </article>
          </div>

          <div className="doc-toc">
            <div className="mb-3 text-xs uppercase"> On this page </div>

            <div className="doc-toc-items border-l border-signoz_slate-500 pl-3">
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
        </div>
      </SectionContainer>
    </main>
  )
}
