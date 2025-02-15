/** @jsxImportSource react */
'use client'

import { useRef, useEffect } from 'react'

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

interface TableOfContentsProps {
  toc: TocItemProps[]
  activeSection: string
  setActiveSection: (section: string) => void
}

const TableOfContents = ({ toc, activeSection, setActiveSection }: TableOfContentsProps) => {
  const tocRef = useRef<HTMLDivElement>(null)

  // Effect to handle TOC scrolling
  useEffect(() => {
    if (!tocRef.current || !activeSection) return

    const activeElement = tocRef.current.querySelector(`a[href="${activeSection}"]`)
    if (!activeElement) return

    const tocContainer = tocRef.current
    const containerHeight = tocContainer.clientHeight
    const activeElementTop = activeElement.getBoundingClientRect().top
    const containerTop = tocContainer.getBoundingClientRect().top
    const relativePosition = activeElementTop - containerTop

    // If the active element is not in view, scroll to it
    if (relativePosition < 0 || relativePosition > containerHeight) {
      tocContainer.scrollTo({
        top: tocContainer.scrollTop + relativePosition - containerHeight / 2,
        behavior: 'smooth',
      })
    }
  }, [activeSection])

  return (
    <div className="post-toc fixed right-0 top-[120px] h-screen w-64 border-l border-signoz_ink-300 pl-8">
      <div ref={tocRef} className="flex h-[calc(100vh-180px)] flex-col gap-1.5 overflow-y-auto">
        {toc.map((tocItem: TocItemProps) => {
          const isActive = activeSection === tocItem.url
          return (
            <div
              className="post-toc-item"
              key={tocItem.url}
              style={{ paddingLeft: `${(tocItem.depth - 1) * 12}px` }}
            >
              <a
                data-level={tocItem.depth}
                href={tocItem.url}
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
    </div>
  )
}

export default TableOfContents
