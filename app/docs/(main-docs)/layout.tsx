'use client'

import '../../../css/doc.css'

import { ReactNode, useRef, Suspense } from 'react'
import SectionContainer from '@/components/SectionContainer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import React from 'react'
import DocsSidebar from '@/components/DocsSidebar/DocsSidebar'

export interface tocItemProps {
  url: string
  depth: number
  value: string
}

interface LayoutProps {
  children: ReactNode
}

export default function DocLayout({ children }: LayoutProps) {
  const mainRef = useRef<HTMLElement | null>(null)

  return (
    // <Suspense fallback={null}>
    <main ref={mainRef} className="">
      <SectionContainer>
        <ProgressBar target={mainRef} />
        <div className="doc overflow-clip max-sm:px-4">
          <div className="doc-sidenav border-r border-signoz_slate-500">
            <Suspense fallback={null}>
              <DocsSidebar />
            </Suspense>
          </div>
          <div className="doc-content md:px-0 lg:px-4">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>
        </div>
        </SectionContainer>
      </main>
    // </Suspense>
  )
}