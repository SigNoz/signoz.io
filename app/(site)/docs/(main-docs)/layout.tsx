'use client'

import { ReactNode, useRef, useEffect } from 'react'
import SectionContainer from '@/components/SectionContainer'
import {
  DOC_CONTENT_CENTER_CLASSES,
  DOC_CONTENT_COLUMN_CLASSES,
} from '@/components/DocsTOC/docLayoutClasses'
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

        <div className={DOC_CONTENT_CENTER_CLASSES}>
          <div className={DOC_CONTENT_COLUMN_CLASSES}>{children}</div>
        </div>
      </SectionContainer>
    </main>
  )
}
