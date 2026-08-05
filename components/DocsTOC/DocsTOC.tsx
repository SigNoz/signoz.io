'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Edit } from 'lucide-react'
import { ONBOARDING_SOURCE } from '../../constants/globals'
import { DOC_TOC_CLASSES } from './docLayoutClasses'
import TableOfContents from '@/components/TableOfContents/TableOfContents'
import {
  TOC_SCROLL_CONTAINER_CLASS,
  TOC_SECTION_LABEL_CLASS,
  useTocScrollFade,
} from '@/components/TableOfContents/tocScrollFade'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { RegionDropdown } from '../Region/RegionDropdown'
import PageFeedback from '../PageFeedback/PageFeedback'

interface TocItemProps {
  url: string
  depth: number
  value: string
}

interface DocsTOCProps {
  toc: TocItemProps[]
  hideTableOfContents: boolean
  source: string
  formattedDate?: string
  editLink?: string
}

const DocsTOC: React.FC<DocsTOCProps> = ({
  toc,
  hideTableOfContents,
  source,
  formattedDate,
  editLink,
}) => {
  const [filteredToc, setFilteredToc] = useState<TocItemProps[]>(toc || [])
  // Scroll-spy only tracks headings in the filtered TOC (active tab panels).
  // Observing every h2/h3 breaks when duplicate titles exist (e.g. page-level
  // `#prerequisites` vs tab-level `#prerequisites-1`).
  const { activeSection, setActiveSection } = useScrollSpy(filteredToc, { offset: 96 })
  const tocContainerRef = useRef<HTMLDivElement>(null)
  const { tocItemsRef, scrollFadeStyle } = useTocScrollFade(
    `${filteredToc.length}:${formattedDate ?? ''}:${editLink ?? ''}`
  )

  // Compute TOC entries only for headings that are currently visible (i.e., in active tab panels)
  useEffect(() => {
    if (!toc || toc.length === 0) return

    const areTocItemsEqual = (a: TocItemProps[], b: TocItemProps[]) => {
      if (a.length !== b.length) return false
      return a.every(
        (item, index) =>
          item.url === b[index].url &&
          item.depth === b[index].depth &&
          item.value === b[index].value
      )
    }

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
      setFilteredToc((prev) => (areTocItemsEqual(prev, next) ? prev : next))
    }

    let isScheduled = false
    const scheduleComputeFiltered = () => {
      if (isScheduled) return
      isScheduled = true
      requestAnimationFrame(() => {
        isScheduled = false
        computeFiltered()
      })
    }

    computeFiltered()

    // Recompute on tab button clicks
    const onTabClick = (e: Event) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const isTabButton = !!target.closest('button[data-tab-value]')
      if (isTabButton) {
        // Delay to allow React to update visibility
        setTimeout(scheduleComputeFiltered, 0)
      }
    }
    document.addEventListener('click', onTabClick, { capture: true })

    // Recompute on details toggle
    const onToggle = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLDetailsElement)) return
      setTimeout(scheduleComputeFiltered, 0)
    }
    document.addEventListener('toggle', onToggle, { capture: true })

    // Also observe attribute changes to panels' hidden attribute
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes') {
          scheduleComputeFiltered()
          break
        }
      }
    })
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['hidden', 'open'],
    })

    // Recompute on resize as layout can change
    window.addEventListener('resize', scheduleComputeFiltered)

    return () => {
      document.removeEventListener('click', onTabClick, { capture: true } as any)
      document.removeEventListener('toggle', onToggle, { capture: true } as any)
      observer.disconnect()
      window.removeEventListener('resize', scheduleComputeFiltered)
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
      const target = e.target
      if (!(target instanceof Element)) return
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
    <>
      <div className={DOC_TOC_CLASSES} ref={tocContainerRef}>
        <div className="mb-4 shrink-0">
          <RegionDropdown />
        </div>
        <div className="relative z-[2] mb-5 shrink-0">
          <PageFeedback />
        </div>
        <div className={TOC_SECTION_LABEL_CLASS}>On this page</div>
        <div ref={tocItemsRef} className={TOC_SCROLL_CONTAINER_CLASS} style={scrollFadeStyle}>
          <TableOfContents
            toc={filteredToc}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            scrollableContainerRef={tocItemsRef}
          />
        </div>
        {(formattedDate || editLink) && (
          <div className="mt-5 shrink-0">
            <div
              className="mb-4 h-2 w-full bg-[radial-gradient(circle,var(--l2-border)_1px,transparent_1px)] bg-[length:6px_6px] bg-center"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-4">
              {formattedDate && (
                <p className="m-0 text-sm font-medium text-[var(--l2-foreground)]">
                  Last updated
                  <span className="mx-1">—</span>
                  <span className="text-[var(--l1-foreground-hover)]">{formattedDate}</span>
                </p>
              )}
              {editLink && (
                <a
                  href={editLink}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--l2-foreground)] no-underline transition-colors hover:text-[var(--l2-foreground-hover)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Edit size={12} aria-hidden="true" />
                  Edit on GitHub
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DocsTOC
