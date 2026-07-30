'use client'

import TableOfContents from '@/components/TableOfContents/TableOfContents'
import {
  TOC_SCROLL_CONTAINER_CLASS,
  TOC_SECTION_LABEL_CLASS,
  useTocScrollFade,
} from '@/components/TableOfContents/tocScrollFade'
import { useScrollSpy } from '@/hooks/useScrollSpy'
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
  const { activeSection, setActiveSection } = useScrollSpy(toc, { offset: 120 })
  const { tocItemsRef, scrollFadeStyle } = useTocScrollFade(toc.length)

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
