'use client'

import React, { ReactNode } from 'react'
import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import SectionContainer from '@/components/SectionContainer'

interface LayoutProps {
  children: ReactNode
}

export default function IntroductionLayout({ children }: LayoutProps) {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  return (
    <div ref={mainRef} className="introduction-page relative bg-signoz_ink-500">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      
      <SectionContainer>
        {source !== ONBOARDING_SOURCE && <ProgressBar target={mainRef} />}
        
        <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-8 md:px-0 pt-12 md:!w-[90vw] md:px-5 md:pt-24">
          {children}
        </div>
      </SectionContainer>
    </div>
  )
} 