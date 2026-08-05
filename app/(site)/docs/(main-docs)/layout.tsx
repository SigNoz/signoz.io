'use client'

import { ReactNode, useRef, useEffect } from 'react'
import SectionContainer from '@/components/SectionContainer'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import React from 'react'

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

  const scrollToHash = () => {
    if (window.location.hash) {
      const hash = window.location.hash
      const targetId = decodeURIComponent(hash.startsWith('#') ? hash.slice(1) : hash)
      const element = document.getElementById(targetId)

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
    <main ref={mainRef} className="">
      <SectionContainer>
        <ProgressBar target={mainRef} />

        <div className="flex min-w-0 flex-[1_1_auto] justify-center overflow-clip">
          <div className="box-border w-full max-w-[1200px] py-6 md:px-0 lg:px-4 [&_details+details]:mt-8">
            {children}
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}
