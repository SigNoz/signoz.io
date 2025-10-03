'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ONBOARDING_SOURCE } from '../../constants/globals'
import TableOfContents from '@/components/TableOfContents/TableOfContents'

interface TocItemProps {
  url: string
  depth: number
  value: string
}

interface DocsTOCProps {
  toc: TocItemProps[]
  hideTableOfContents: boolean
  source: string
}

const DocsTOC: React.FC<DocsTOCProps> = ({ toc, hideTableOfContents, source }) => {
  const [activeSection, setActiveSection] = useState<string>('')
  const tocContainerRef = useRef<HTMLDivElement>(null)

  // Mirror blog ToC behavior: observe headings and update active section
  useEffect(() => {
    if (!toc || toc.length === 0) return

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
  }, [toc])

  if (
    hideTableOfContents ||
    !toc ||
    !Array.isArray(toc) ||
    toc.length === 0 ||
    source === ONBOARDING_SOURCE
  ) {
    return null
  }

  return (
    <div className="doc-toc" ref={tocContainerRef}>
      <div className="mb-3 text-xs uppercase"> On this page </div>
      <div className="doc-toc-items border-l border-signoz_slate-500 pl-3">
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

export default DocsTOC
