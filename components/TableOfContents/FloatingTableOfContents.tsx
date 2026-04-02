'use client'

import React, { useState, useEffect } from 'react'
import { Menu, ChevronRight } from 'lucide-react'

interface TocSourceItem {
  url: string
  depth: number
  value: string
}

interface TOCItem {
  id: string
  text: string
  level: number
  children?: TOCItem[]
}

interface FloatingTableOfContentsProps {
  toc?: TocSourceItem[]
}

const normalizeId = (value: string) => {
  const rawId = value.startsWith('#') ? value.slice(1) : value
  return decodeURIComponent(rawId).replace(/-+$/g, '')
}

const buildTOCFromSource = (toc: TocSourceItem[]): TOCItem[] => {
  const items: TOCItem[] = []
  let currentParent: TOCItem | null = null

  toc.forEach((item) => {
    const normalizedItem: TOCItem = {
      id: normalizeId(item.url),
      text: item.value,
      level: item.depth,
    }

    if (item.depth <= 2) {
      currentParent = normalizedItem
      items.push(normalizedItem)
      return
    }

    if (!currentParent) {
      items.push(normalizedItem)
      return
    }

    if (!currentParent.children) {
      currentParent.children = []
    }

    currentParent.children.push(normalizedItem)
  })

  return items
}

const FloatingTableOfContents: React.FC<FloatingTableOfContentsProps> = ({ toc }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let frameId: number | null = null

    const updateVisibility = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const hideThreshold = documentHeight - windowHeight - 800

      if (scrollPosition < hideThreshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateVisibility()
      })
    }

    updateVisibility()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    if (toc && toc.length > 0) {
      setTocItems(buildTOCFromSource(toc))
      return
    }

    const getTextContent = (element: Element): string => {
      const cloned = element.cloneNode(true) as Element
      cloned.querySelectorAll('a').forEach((link) => link.remove())
      return cloned.textContent?.trim() || ''
    }

    const buildTOC = () => {
      const headings = document.querySelectorAll('h2, h3')
      const items: TOCItem[] = []
      let currentH2: TOCItem | null = null

      headings.forEach((heading) => {
        const text = getTextContent(heading)
        // Restore the ID generation logic while keeping existing IDs
        const id = heading.id || text.toLowerCase().replace(/\s+/g, '-') || ''
        if (!heading.id) {
          heading.id = id
        }

        const item: TOCItem = {
          id,
          text,
          level: parseInt(heading.tagName[1]),
        }

        if (item.level === 2) {
          currentH2 = item
          items.push(item)
        } else if (item.level === 3 && currentH2) {
          if (!currentH2.children) {
            currentH2.children = []
          }
          currentH2.children.push(item)
        }
      })

      setTocItems(items)
    }

    if (typeof window.requestIdleCallback === 'function') {
      const idleHandle = window.requestIdleCallback(buildTOC)
      return () => window.cancelIdleCallback(idleHandle)
    }

    const timeoutHandle = window.setTimeout(buildTOC, 0)
    return () => window.clearTimeout(timeoutHandle)
  }, [toc])

  const handleItemClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Update URL without causing a page reload
      window.history.pushState({}, '', `#${id}`)

      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <div
      className={`fixed bottom-8 left-8 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
      }`}
    >
      {/* Menu Items */}
      <div
        className={`absolute bottom-16 left-0 min-w-[240px] rounded-lg bg-gray-800/95 p-3 shadow-xl backdrop-blur-sm transition-all duration-300 ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="flex max-h-[60vh] flex-col gap-1 overflow-y-auto">
          {tocItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                transition: `all 300ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms`,
                opacity: isOpen ? 1 : 0,
                transform: `translateY(${isOpen ? 0 : 8}px)`,
              }}
            >
              <button
                onClick={() => handleItemClick(item.id)}
                className="w-full rounded-md px-3 py-2 text-left text-sm text-white transition-colors hover:bg-gray-700/80"
              >
                {item.text}
              </button>
              {item.children && item.children.length > 0 && (
                <div className="ml-3 flex flex-col gap-0.5 pt-0.5">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleItemClick(child.id)}
                      className="flex items-center gap-1 rounded-md px-3 py-1.5 text-left text-xs text-gray-300 transition-colors hover:bg-gray-700/80"
                    >
                      <ChevronRight className="h-3 w-3" />
                      {child.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-full bg-gray-800/90 px-4 py-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/90 ${
          isOpen ? 'bg-gray-700/90' : ''
        }`}
      >
        <Menu className="h-4 w-4" />
        <span className="text-xs font-medium">Table of Contents</span>
      </button>
    </div>
  )
}

export default FloatingTableOfContents
