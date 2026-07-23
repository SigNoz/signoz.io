'use client'

import React, { ReactNode, useRef } from 'react'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import SectionContainer from '@/components/SectionContainer'
import DocsSidebar from '@/components/DocsSidebar/DocsSidebar'

interface LayoutProps {
  children: ReactNode
}

export default function IntroductionLayout({ children }: LayoutProps) {
  const mainRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={mainRef} className="introduction-page bg-background relative">
      <div className="bg-dot-pattern masked-dots pointer-events-none absolute top-0 flex h-screen w-full items-center justify-center opacity-30" />

      <SectionContainer>
        <ProgressBar target={mainRef} />

        <div className="flex h-full w-full items-start">
          <div className="border-border box-border w-[276px] max-w-[276px] min-w-[276px] self-stretch border-r max-md:hidden">
            <DocsSidebar />
          </div>

          <div className="border-border relative flex min-w-0 flex-1 flex-col border-r border-dashed">
            {children}
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
