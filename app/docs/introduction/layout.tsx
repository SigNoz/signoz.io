'use client'

import React, { ReactNode } from 'react'
import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '../../../constants/queryParams'
import { ONBOARDING_SOURCE } from '../../../constants/globals'
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar'
import SectionContainer from '../../../components/SectionContainer'

interface LayoutProps {
  children: ReactNode
}

export default function IntroductionLayout({ children }: LayoutProps) {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  return (
    <div ref={mainRef} className="introduction-page">
      <SectionContainer>
        {source !== ONBOARDING_SOURCE && <ProgressBar target={mainRef} />}
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </SectionContainer>
    </div>
  )
} 