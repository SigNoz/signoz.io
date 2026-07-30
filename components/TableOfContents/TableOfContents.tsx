/** @jsxImportSource react */
'use client'

import { useRef, useEffect, useState, RefObject } from 'react'
import { usePathname } from 'next/navigation'
import { useLogEvent } from 'hooks/useLogEvent'
import { cn } from 'app/lib/utils'

export interface TocItemProps {
  url: string
  depth: number
  value: string
}

interface TableOfContentsProps {
  toc: TocItemProps[]
  activeSection: string
  setActiveSection: (section: string) => void
  scrollableContainerRef: RefObject<HTMLDivElement | null>
}

const TableOfContents = ({
  toc,
  activeSection,
  setActiveSection: _setActiveSection,
  scrollableContainerRef,
}: TableOfContentsProps) => {
  const tocRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [indicator, setIndicator] = useState<{ top: number; height: number } | null>(null)
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const canonicalize = (s: string | null | undefined) => {
    if (!s) return ''
    const noHash = s.startsWith('#') ? s.slice(1) : s
    return noHash.replace(/-+$/g, '')
  }

  // Position the active indicator next to the active TOC item
  useEffect(() => {
    if (!tocRef.current || !activeSection) {
      setIndicator(null)
      return
    }

    const key = canonicalize(activeSection)
    const activeEl = itemRefs.current.get(key)
    if (!activeEl) {
      setIndicator(null)
      return
    }

    const listTop = tocRef.current.getBoundingClientRect().top
    const itemRect = activeEl.getBoundingClientRect()
    setIndicator({
      top: itemRect.top - listTop,
      height: itemRect.height,
    })
  }, [activeSection, toc])

  // Effect to handle TOC scrolling
  useEffect(() => {
    if (!tocRef.current || !activeSection || !scrollableContainerRef.current) return

    const anchors = Array.from(tocRef.current.querySelectorAll('a')) as HTMLAnchorElement[]
    const activeElement = anchors.find(
      (a) => canonicalize(a.getAttribute('href')) === canonicalize(activeSection)
    )
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
    <div ref={tocRef} className="relative flex items-start gap-[3px]">
      <div className="relative min-h-full w-[2px] shrink-0 self-stretch">
        <div
          className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-[var(--l2-border)]"
          aria-hidden="true"
        />
        {indicator && (
          <div
            className="absolute left-0 w-[2px] rounded-full bg-[var(--primary-background)] transition-[top,height] duration-200 motion-reduce:transition-none"
            style={{ top: indicator.top, height: indicator.height }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-px">
        {toc.map((tocItem: TocItemProps) => {
          const isActive = canonicalize(activeSection) === canonicalize(tocItem.url)
          const itemKey = canonicalize(tocItem.url)
          const nestIndent = Math.max(tocItem.depth - 2, 0) * 20

          const handleClick = () => {
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
          }

          return (
            <div
              className="w-full"
              key={tocItem.url}
              style={{ paddingLeft: nestIndent > 0 ? `${nestIndent}px` : undefined }}
              ref={(el) => {
                if (el) itemRefs.current.set(itemKey, el)
                else itemRefs.current.delete(itemKey)
              }}
            >
              <a
                href={tocItem.url}
                onClick={handleClick}
                className={cn(
                  'inline-block w-full rounded-md py-2 pl-3 text-sm leading-5 transition-colors focus-visible:text-[var(--l2-foreground-hover)] focus-visible:outline-none',
                  isActive
                    ? 'text-[var(--l1-foreground-hover)]'
                    : 'text-[var(--l2-foreground)] hover:text-[var(--l2-foreground-hover)]'
                )}
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
