'use client'

import '../../../css/doc.css'

import { ReactNode, useRef, Suspense, useEffect } from 'react'
import SectionContainer from '@/components/SectionContainer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import React from 'react'
import DocsSidebar from '@/components/DocsSidebar/DocsSidebar'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from 'constants/queryParams'
import { ONBOARDING_SOURCE } from 'constants/globals'

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

  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  const scrollToHash = () => {
    if (window.location.hash && source !== ONBOARDING_SOURCE) {
      const element = document.querySelector(window.location.hash)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const rIC = window.requestIdleCallback ?? setTimeout

    rIC(() => {
      scrollToHash()
    })
  }, [])

  return (
    // <Suspense fallback={null}>
    <main ref={mainRef} className="">
      <SectionContainer>
        {source !== ONBOARDING_SOURCE && <ProgressBar target={mainRef} />}
        <div className="doc overflow-clip max-sm:px-4">
          <div className="doc-sidenav border-r border-signoz_slate-500">
            <Suspense fallback={null}>
              <DocsSidebar />
            </Suspense>
          </div>
          {/* <div className="doc-content md:px-0 lg:px-4"> */}
          <div
            className={`doc-content md:px-0 lg:px-4 ${
              source === ONBOARDING_SOURCE ? 'product-onboarding' : ''
            }`}
          >
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