/** @jsxImportSource react */
'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import OpenTelemetryBanner from '@/components/OpenTelemetryBanner/OpenTelemetryBanner'
import SignUpStrip from '@/components/SignUpStrip/SignUpStrip'
import TableOfContents from '@/components/TableOfContents/TableOfContents'

// Extend the Blog type to include CTA fields
interface OpenTelemetryContent extends Blog {
  cta_title?: string
  cta_text?: string
}

interface LayoutProps {
  content: CoreContent<OpenTelemetryContent>
  authorDetails: CoreContent<Authors>[]
  authors: string[]
  children: ReactNode
  toc: TocItemProps[]
}

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

export default function OpenTelemetryLayout({ content, authors, children, toc }: LayoutProps) {
  const { slug, date, title, tags, readingTime, cta_title, cta_text } = content
  const mainRef = useRef<HTMLElement | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [showSignUpStrip, setShowSignUpStrip] = useState(false)

  // Handle scroll to show/hide sign-up strip
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const showThreshold = 400 // Adjust this value to control when the strip appears
      setShowSignUpStrip(scrollPosition > showThreshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first element that is intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by their position and select the one closest to the top
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const id = sortedEntries[0].target.getAttribute('id')
          if (id) setActiveSection(`#${id}`)
        }
      },
      {
        // This creates a trigger zone near the top of the viewport
        rootMargin: '-10% -20% -80% -20%',
        threshold: 0,
      }
    )

    const headings = document.querySelectorAll('h2, h3')
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  return (
    <main ref={mainRef}>
      <ScrollTopAndComment />

      {/* Floating Sign-up Strip */}
      <SignUpStrip showSignUpStrip={showSignUpStrip} cta_title={cta_title} cta_text={cta_text} />

      <OpenTelemetryBanner title={title} date={date} readingTime={readingTime.text} tags={tags} />

      <SectionContainer>
        <div className="post relative flex">
          {/* Main content area centered in the remaining space */}
          <div className="mx-auto w-full max-w-3xl">
            <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
              {children}
            </article>
          </div>

          {/* Table of Contents */}
          <TableOfContents
            toc={toc}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      </SectionContainer>
      <ProgressBar target={mainRef} />
    </main>
  )
}
