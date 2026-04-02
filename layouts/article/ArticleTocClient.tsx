'use client'

import { useEffect, useRef, useState } from 'react'

import PageFeedback from '@/components/PageFeedback/PageFeedback'
import TableOfContents from '@/components/TableOfContents/TableOfContents'

interface TocItemProps {
  url: string
  depth: number
  value: string
}

interface ArticleTocClientProps {
  toc: TocItemProps[]
}

export default function ArticleTocClient({ toc }: ArticleTocClientProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const tocContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!toc.length) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length === 0) {
          return
        }

        const sortedEntries = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )
        const id = sortedEntries[0].target.getAttribute('id')
        if (id) {
          setActiveSection(`#${id}`)
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
          scrollableContainerRef={tocContainerRef}
        />
      </div>
      <PageFeedback placement="toc" />
    </div>
  )
}
