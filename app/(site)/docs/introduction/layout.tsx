'use client'

import React, { ReactNode, useRef } from 'react'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import SectionContainer from '@/components/SectionContainer'

interface LayoutProps {
  children: ReactNode
}

export default function IntroductionLayout({ children }: LayoutProps) {
  const mainRef = useRef<HTMLDivElement | null>(null)

  return (
    <div ref={mainRef} className="introduction-page relative bg-[var(--l1-background)]">
      <div className="bg-dot-pattern masked-dots pointer-events-none absolute top-0 flex h-screen w-full items-center justify-center opacity-30" />

      <SectionContainer>
        <ProgressBar target={mainRef} />

        <div className="relative flex min-w-0 flex-1 flex-col">{children}</div>
      </SectionContainer>
    </div>
  )
}
