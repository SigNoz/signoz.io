'use client'

import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { AppTooltip as Tooltip } from '@/components/ui/AppTooltip'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { SITE_BASE_URL } from '@/components/Link'
import { useTocScrollFade } from '@/components/TableOfContents/tocScrollFade'
import {
  DOC_SIDENAV_NAV_CLASSES,
  DOC_SIDENAV_PINNED_CLASSES,
  DOC_SIDENAV_SCROLL_BASE_CLASSES,
} from '@/components/DocsTOC/docLayoutClasses'
import { categoryContainsRoute, normalizeRoute } from './navigation'
import type { SidebarItem } from './types'

let expandedKeysCache = new Set<string>()

function buildActiveAncestorSet(
  items: SidebarItem[],
  activeRoute: string,
  persistExpansionKey?: string
): Set<string> {
  const set = new Set<string>()
  if (persistExpansionKey) {
    set.add(persistExpansionKey)
  }
  const markParents = (nodes: SidebarItem[], trail: string[]) => {
    for (const node of nodes) {
      if (node.type === 'doc') continue
      const key = [...trail, node.label].join('>')
      if (categoryContainsRoute(node, activeRoute)) {
        set.add(key)
        markParents(node.items, [...trail, node.label])
      }
    }
  }
  markParents(items, [])
  return set
}

interface SidebarProps {
  items: SidebarItem[]
  activeRoute: string
  onNavigate?: () => void
  languageSelector?: ReactNode
  persistExpansionKey?: string
}

export function Sidebar({
  items,
  activeRoute,
  onNavigate,
  languageSelector,
  persistExpansionKey,
}: SidebarProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    if (expandedKeysCache.size > 0) {
      const set = new Set(expandedKeysCache)
      // Ensure active route ancestors are always expanded
      const markParents = (nodes: SidebarItem[], trail: string[]) => {
        for (const node of nodes) {
          if (node.type === 'doc') continue
          const key = [...trail, node.label].join('>')
          if (categoryContainsRoute(node, activeRoute)) {
            set.add(key)
            markParents(node.items, [...trail, node.label])
          }
        }
      }
      markParents(items, [])
      return set
    }
    return buildActiveAncestorSet(items, activeRoute, persistExpansionKey)
  })

  const activeItemRef = useRef<HTMLAnchorElement | null>(null)
  const pendingScrollRef = useRef(false)
  const { tocItemsRef: containerRef, scrollFadeStyle } = useTocScrollFade(items.length)

  useEffect(() => {
    expandedKeysCache = new Set(expanded)
  }, [expanded])

  useEffect(() => {
    setExpanded((prev) => {
      const next = new Set(prev)

      const markParents = (nodes: SidebarItem[], trail: string[]) => {
        for (const node of nodes) {
          if (node.type === 'doc') continue
          const key = [...trail, node.label].join('>')
          if (categoryContainsRoute(node, activeRoute)) {
            next.add(key)
            markParents(node.items, [...trail, node.label])
          }
        }
      }
      markParents(items, [])
      return next
    })
    pendingScrollRef.current = true
  }, [activeRoute, items, persistExpansionKey])

  // Ensure the sidebar scrolls to reveal the active item without shifting the main content.
  useEffect(() => {
    if (!pendingScrollRef.current || !activeItemRef.current || !containerRef.current) {
      return
    }

    const container = containerRef.current
    const activeElement = activeItemRef.current
    const containerRect = container.getBoundingClientRect()
    const activeRect = activeElement.getBoundingClientRect()
    const isAbove = activeRect.top < containerRect.top
    const isBelow = activeRect.bottom > containerRect.bottom

    if (isAbove || isBelow) {
      const offsetWithinContainer = activeRect.top - containerRect.top + activeRect.height / 2
      const nextScrollTop = container.scrollTop + offsetWithinContainer - container.clientHeight / 2
      container.scrollTo({
        top: nextScrollTop,
        behavior: 'smooth',
      })
    }

    pendingScrollRef.current = false
  }, [activeRoute, expanded])

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  // Item styling mirrors the docs sidenav (DocsSidebar.tsx renderDoc/renderCategory).
  const renderItems = (nodes: SidebarItem[], trail: string[], nested = false) => (
    <ul className={nested ? 'ml-3 list-none space-y-0 p-0 pl-1' : 'list-none space-y-0 p-0'}>
      {nodes.map((node) => {
        if (node.type === 'doc') {
          const isActive = normalizeRoute(node.route) === activeRoute
          return (
            <li key={node.route} className="group mx-2 my-0.5 transition-all duration-200">
              <Link
                href={`${SITE_BASE_URL}${node.route}`}
                target="_self"
                className={`flex w-full items-center gap-1 rounded px-3 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--l1-background-hover)] text-[var(--l1-foreground-hover)]'
                    : 'text-[var(--l2-foreground)] hover:bg-[var(--l1-background-hover)] hover:text-[var(--l1-foreground-hover)]'
                }`}
                onClick={onNavigate}
                ref={isActive ? activeItemRef : undefined}
              >
                <Tooltip
                  content={node.label}
                  side="right"
                  delayDuration={500}
                  sideOffset={12}
                  contentClassName="max-w-[260px]"
                >
                  <span className="min-w-0 flex-1 truncate">{node.label}</span>
                </Tooltip>
              </Link>
            </li>
          )
        }

        const key = [...trail, node.label].join('>')
        const isExpanded = expanded.has(key)
        const containsActive = categoryContainsRoute(node, activeRoute)

        return (
          <li key={key} className="group mx-2 my-0.5">
            <div
              className={`flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-sm transition-all duration-200 ${
                containsActive
                  ? 'bg-[var(--l1-background-hover)] text-[var(--l1-foreground-hover)]'
                  : 'text-[var(--l2-foreground)] hover:bg-[var(--l1-background-hover)] hover:text-[var(--l1-foreground-hover)]'
              }`}
              onClick={() => toggle(key)}
            >
              <div className="flex-shrink-0 text-[var(--l2-foreground)]">
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </div>
              <Tooltip
                content={node.label}
                side="right"
                delayDuration={500}
                sideOffset={12}
                contentClassName="max-w-[260px]"
              >
                <span className="min-w-0 flex-1 truncate">{node.label}</span>
              </Tooltip>
            </div>
            {node.items.length > 0 && (
              <div className={isExpanded ? 'mt-0.5' : 'h-0 overflow-hidden'}>
                {renderItems(node.items, [...trail, node.label], true)}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav className={DOC_SIDENAV_NAV_CLASSES}>
      {languageSelector && <div className={DOC_SIDENAV_PINNED_CLASSES}>{languageSelector}</div>}
      <div
        ref={containerRef}
        className={`${DOC_SIDENAV_SCROLL_BASE_CLASSES} ${languageSelector ? 'pb-3 pt-1' : 'py-3'}`}
        style={scrollFadeStyle}
      >
        {renderItems(items, [])}
      </div>
    </nav>
  )
}
