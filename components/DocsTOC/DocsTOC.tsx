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
        const el =
          typeof document !== 'undefined'
            ? document.getElementById(rawId) || document.getElementById(normalizedId)
            : null
        if (!el) return
        // Check if inside a closed details element
        const closedDetails = el.closest('details:not([open])')
        if (closedDetails) {
          const summary = closedDetails.querySelector('summary')
          if (!summary || !summary.contains(el)) return
        }
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

    // Recompute on details toggle
    const onToggle = (e: Event) => {
      if ((e.target as HTMLElement).tagName === 'DETAILS') {
        setTimeout(computeFiltered, 0)
      }
    }
    document.addEventListener('toggle', onToggle, { capture: true })

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
      document.removeEventListener('toggle', onToggle, { capture: true } as any)
      observer.disconnect()
      window.removeEventListener('resize', computeFiltered)
    }
  }, [toc])

  // Intercept TOC link clicks to switch tabs (if needed) before scrolling
  useEffect(() => {
    const container = tocItemsRef.current
    if (!container) return

    const updateHash = (hash: string) => {
      if (typeof window === 'undefined') return
      const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`
      if (window.location.hash === normalizedHash) return
      try {
        window.history.replaceState(window.history.state, '', normalizedHash)
      } catch (err) {
        window.location.hash = normalizedHash
      }
    }

    const activateTabsForElement = (element: HTMLElement) => {
      const roots: HTMLElement[] = []
      let current: HTMLElement | null = element

      while (current) {
        const root = current.closest('[data-tabs-root]') as HTMLElement | null
        if (!root || roots.includes(root)) break
        roots.push(root)
        current = root.parentElement as HTMLElement | null
      }

      // Activate from outermost to innermost so parent panels are visible first
      roots
        .slice()
        .reverse()
        .forEach((root) => {
          let panel: HTMLElement | null = element
          while (panel && panel !== root) {
            if (
              panel.hasAttribute('data-tab-value') &&
              panel.closest('[data-tabs-root]') === root
            ) {
              break
            }
            panel = panel.parentElement as HTMLElement | null
          }

          if (!panel || panel === root) return

          const panelTabValue = panel.getAttribute('data-tab-value')
          if (!panelTabValue) return

          const button = root.querySelector(
            `button[data-tab-value="${panelTabValue}"]`
          ) as HTMLButtonElement | null
          if (!button) return

          const isAlreadyActive = !panel.hasAttribute('hidden')
          if (!isAlreadyActive) {
            button.click()
          }
        })
    }

    const focusHeading = (
      hash: string,
      options: { behavior?: ScrollBehavior; updateHash?: boolean } = {}
    ) => {
      if (!hash) return false
      const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`
      const rawId = normalizedHash.slice(1)
      const normalizedId = rawId.replace(/-+$/g, '')
      const el = document.getElementById(rawId) || document.getElementById(normalizedId)
      if (!el) return false

      activateTabsForElement(el)

      // Open parent details if closed
      const details = el.closest('details')
      if (details && !details.open) {
        details.open = true
      }

      const scrollBehavior = options.behavior ?? 'smooth'
      setTimeout(() => {
        el.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
        const finalId = el.getAttribute('id') || normalizedId || rawId
        const finalHash = `#${finalId}`
        setActiveSection(finalHash)
        if (options.updateHash !== false) {
          updateHash(finalHash)
        }
      }, 0)

      return true
    }

    const focusHeadingWithRetry = (
      hash: string,
      options: { behavior?: ScrollBehavior; updateHash?: boolean } = {}
    ) => {
      let attempts = 0
      const maxAttempts = 10
      const attemptFocus = () => {
        const didFocus = focusHeading(hash, options)
        if (didFocus || attempts >= maxAttempts) return
        attempts += 1
        setTimeout(attemptFocus, 100)
      }
      attemptFocus()
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a') as HTMLAnchorElement | null
      if (!anchor || !anchor.getAttribute('href')?.startsWith('#')) return

      e.preventDefault()
      const hash = anchor.getAttribute('href') || ''
      focusHeadingWithRetry(hash)
    }

    const syncToHash = () => {
      if (typeof window === 'undefined') return
      const currentHash = window.location.hash
      if (!currentHash) return
      focusHeadingWithRetry(currentHash, { behavior: 'auto', updateHash: false })
    }

    if (typeof window !== 'undefined') {
      // Handle deep links where the hash points to content inside a hidden tab
      if (window.location.hash) {
        setTimeout(() => {
          syncToHash()
        }, 0)
      }
      window.addEventListener('hashchange', syncToHash)
    }

    container.addEventListener('click', handleClick, { capture: true })
    return () => {
      container.removeEventListener('click', handleClick, { capture: true } as any)
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', syncToHash)
      }
    }
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
      <div ref={tocItemsRef} className="doc-toc-items border-l border-signoz_slate-500 pl-3">
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
