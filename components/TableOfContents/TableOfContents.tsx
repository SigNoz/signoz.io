/** @jsxImportSource react */
'use client'

import { useRef, useEffect, RefObject } from 'react'
import { usePathname } from 'next/navigation'
import { useLogEvent } from 'hooks/useLogEvent'

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

interface TableOfContentsProps {
  toc: TocItemProps[]
  activeSection: string
  setActiveSection: (section: string) => void
  scrollableContainerRef: RefObject<HTMLDivElement>
}

const TableOfContents = ({
  toc,
  activeSection,
  setActiveSection,
  scrollableContainerRef,
}: TableOfContentsProps) => {
  const tocRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const logEvent = useLogEvent()

  // Effect to handle TOC scrolling
  useEffect(() => {
    if (!tocRef.current || !activeSection || !scrollableContainerRef.current) return

    const activeElement = tocRef.current.querySelector(`a[href="${activeSection}"]`)
    if (!activeElement) return

    const scrollableContainer = scrollableContainerRef.current
    const containerHeight = scrollableContainer.clientHeight
    const activeElementTop = activeElement.getBoundingClientRect().top
    const containerTop = scrollableContainer.getBoundingClientRect().top
    const relativePosition = activeElementTop - containerTop

    // If the active element is not in view, scroll to it
    if (relativePosition < 0 || relativePosition > containerHeight) {
      scrollableContainer.scrollTo({
        top: scrollableContainer.scrollTop + relativePosition - containerHeight / 2,
        behavior: 'smooth',
      })
    }
  }, [activeSection, scrollableContainerRef])

  return (
    <div ref={tocRef} className="flex flex-col gap-1.5">
      {toc.map((tocItem: TocItemProps) => {
        const isActive = activeSection === tocItem.url

        const handleClick = () => {
          // Log the TOC click event
          logEvent({
            eventName: 'Website Click',
            eventType: 'track',
            attributes: {
              clickType: 'ToC Click',
              clickName: 'TOC Link',
              clickText: tocItem.value,
              clickLocation: 'Table of Contents',
              pageLocation: pathname,
            },
          })
          // Note: No need for e.preventDefault() or router.push()
          // We want the default anchor link behavior to scroll the page.
        }

        return (
          <div
            className="post-toc-item"
            key={tocItem.url}
            style={{ paddingLeft: `${(tocItem.depth - 1) * 12}px` }}
          >
            <a
              data-level={tocItem.depth}
              href={tocItem.url}
              onClick={handleClick}
              className={`line-clamp-2 text-[11px] transition-colors hover:text-white ${
                isActive ? 'font-medium text-signoz_robin-500' : 'text-gray-500'
              }`}
            >
              {tocItem.value}
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default TableOfContents
