'use client'

import { useEffect, useState } from 'react'

import TableOfContents from '@/components/TableOfContents/TableOfContents'
import {
  TOC_SCROLL_CONTAINER_CLASS,
  TOC_SECTION_LABEL_CLASS,
  useTocScrollFade,
} from '@/components/TableOfContents/tocScrollFade'
import type { TocItemProps } from './types'

interface OpenTelemetryTocClientProps {
  toc: TocItemProps[]
}

/**
 * Tracks the active heading inside the article and feeds it to the existing
 * TableOfContents component. This keeps the observer logic out of the server
 * layout.
 */
export default function OpenTelemetryTocClient({ toc }: OpenTelemetryTocClientProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const { tocItemsRef, scrollFadeStyle } = useTocScrollFade(toc.length)

  useEffect(() => {
    if (!toc.length) return

    const HEADER_OFFSET_PX = 120

    const resolveHeading = (item: TocItemProps) => {
      const rawId = item.url.startsWith('#') ? item.url.slice(1) : item.url
      const normalizedId = rawId.replace(/-+$/g, '')
      const el = document.getElementById(rawId) || document.getElementById(normalizedId)
      if (!el || el.getClientRects().length === 0) return null
      return {
        url: item.url.startsWith('#') ? item.url : `#${rawId}`,
        el,
      }
    }

    const updateActiveSection = () => {
      const headings = toc
        .map(resolveHeading)
        .filter((item): item is { url: string; el: HTMLElement } => item !== null)
        .sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top)

      if (headings.length === 0) return

      let activeUrl = headings[0].url
      for (const heading of headings) {
        if (heading.el.getBoundingClientRect().top <= HEADER_OFFSET_PX) {
          activeUrl = heading.url
        }
      }
      setActiveSection((prev) => (prev === activeUrl ? prev : activeUrl))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [toc])

  if (!toc.length) {
    return null
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className={TOC_SECTION_LABEL_CLASS}>On this page</div>
      <div ref={tocItemsRef} className={TOC_SCROLL_CONTAINER_CLASS} style={scrollFadeStyle}>
        <TableOfContents
          toc={toc}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          scrollableContainerRef={tocItemsRef}
        />
      </div>
    </div>
  )
}
