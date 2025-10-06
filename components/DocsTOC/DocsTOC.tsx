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
  const [filteredToc, setFilteredToc] = useState<TocItemProps[]>(toc || [])
  const tocContainerRef = useRef<HTMLDivElement>(null)
  const tocItemsRef = useRef<HTMLDivElement>(null)

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

  // Compute TOC entries only for headings that are currently visible (i.e., in active tab panels)
  useEffect(() => {
    if (!toc || toc.length === 0) return

    const computeFiltered = () => {
      const next: TocItemProps[] = []
      toc.forEach((item) => {
        const rawId = item.url.startsWith('#') ? item.url.slice(1) : item.url
        const normalizedId = rawId.replace(/-+$/g, '') // trim trailing hyphens
        const el = typeof document !== 'undefined'
          ? (document.getElementById(rawId) || document.getElementById(normalizedId))
          : null
        if (!el) return
        // Only include headings that are currently rendered (not display:none)
        // Using getClientRects is robust across nested hidden ancestors
        const isRendered = el.getClientRects().length > 0
        if (isRendered) next.push(item)
      })
      setFilteredToc(next)
    }

    computeFiltered()

    // Recompute on tab button clicks
    const onTabClick = (e: Event) => {
      const target = e.target as HTMLElement
      const isTabButton = !!target.closest('button[data-tab-value]')
      if (isTabButton) {
        // Delay to allow React to update visibility
        setTimeout(computeFiltered, 0)
      }
    }
    document.addEventListener('click', onTabClick, { capture: true })

    // Also observe attribute changes to panels' hidden attribute
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes') {
          computeFiltered()
          break
        }
      }
    })
    observer.observe(document.body, { attributes: true, subtree: true })

    // Recompute on resize as layout can change
    window.addEventListener('resize', computeFiltered)

    return () => {
      document.removeEventListener('click', onTabClick, { capture: true } as any)
      observer.disconnect()
      window.removeEventListener('resize', computeFiltered)
    }
  }, [toc])

  // Intercept TOC link clicks to switch tabs (if needed) before scrolling
  useEffect(() => {
    const container = tocItemsRef.current
    if (!container) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a') as HTMLAnchorElement | null
      if (!anchor || !anchor.getAttribute('href')?.startsWith('#')) return

      e.preventDefault()
      const hash = anchor.getAttribute('href') || ''
      const rawId = hash.replace('#', '')
      const normalizedId = rawId.replace(/-+$/g, '')
      const el = document.getElementById(rawId) || document.getElementById(normalizedId)
      if (!el) return

      // Activate all ancestor tabs (handles nested Tabs inside Tabs)
      const originalEl = el
      let searchStart: HTMLElement | null = originalEl
      while (searchStart) {
        const tabsRoot = searchStart.closest('[data-tabs-root]') as HTMLElement | null
        if (!tabsRoot) break
        // Find the panel in this tabsRoot that contains the original element
        let panel = originalEl.closest('[data-tab-value]') as HTMLElement | null
        while (panel && !tabsRoot.contains(panel)) {
          panel = panel.parentElement?.closest('[data-tab-value]') as HTMLElement | null
        }
        const panelTabValue = panel?.getAttribute('data-tab-value')
        if (panelTabValue) {
          const button = tabsRoot.querySelector(
            `button[data-tab-value="${panelTabValue}"]`
          ) as HTMLButtonElement | null
          if (button) button.click()
        }
        // Move up to find parent tabs group
        searchStart = tabsRoot.parentElement
      }

      // Smooth scroll to the target after switching
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Set active section using the element's id to avoid slug mismatches
        const finalId = el.getAttribute('id') || normalizedId || rawId
        setActiveSection(`#${finalId}`)
      }, 0)
    }

    container.addEventListener('click', handleClick, { capture: true })
    return () => container.removeEventListener('click', handleClick, { capture: true } as any)
  }, [])

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
      <div
        ref={tocItemsRef}
        className="doc-toc-items border-l border-signoz_slate-500 pl-3"
      >
        <TableOfContents
          toc={filteredToc}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          scrollableContainerRef={tocContainerRef}
        />
      </div>
    </div>
  )
}

export default DocsTOC
