'use client'

import { useEffect, useRef, useState } from 'react'

import TableOfContents from '@/components/TableOfContents/TableOfContents'
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
  const tocContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const sortedEntries = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )
          const id = sortedEntries[0].target.getAttribute('id')
          if (id) setActiveSection(`#${id}`)
        }
      },
      {
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

  if (!toc.length) {
    return null
  }

  return (
    <div className="doc-toc">
      <div className="mb-3 text-xs uppercase text-gray-400">On this page</div>
      <div
        ref={tocContainerRef}
        className="doc-toc-items doc-toc-scroll border-l border-signoz_slate-500 pl-3"
      >
        <TableOfContents
          toc={toc}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          scrollableContainerRef={tocContainerRef}
        />
      </div>
    </div>
  )
}
