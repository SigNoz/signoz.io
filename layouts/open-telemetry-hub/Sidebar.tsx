'use client'

import Link from 'next/link'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { categoryContainsRoute, normalizeRoute } from './navigation'
import type { SidebarItem } from './types'

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
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const activeItemRef = useRef<HTMLAnchorElement | null>(null)
  const pendingScrollRef = useRef(false)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const expandedSet = new Set<string>(persistExpansionKey ? [persistExpansionKey] : [])
    const markParents = (nodes: SidebarItem[], trail: string[]) => {
      for (const node of nodes) {
        if (node.type === 'doc') continue
        const key = [...trail, node.label].join('>')
        if (categoryContainsRoute(node, activeRoute)) {
          expandedSet.add(key)
          markParents(node.items, [...trail, node.label])
        }
      }
    }
    markParents(items, [])
    setExpanded(expandedSet)
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

  const renderItems = (nodes: SidebarItem[], trail: string[]) => (
    <ul className="list-none space-y-1 p-0">
      {nodes.map((node) => {
        if (node.type === 'doc') {
          const isActive = normalizeRoute(node.route) === activeRoute
          return (
            <li key={node.route} className="group mx-2 my-1 transition-all duration-200">
              <Link
                href={node.route}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500/10 text-blue-400 shadow-sm'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
                onClick={onNavigate}
                ref={isActive ? activeItemRef : undefined}
              >
                <FileText className="flex-shrink-0 opacity-60 group-hover:opacity-100" size={14} />
                <span className="truncate">{node.label}</span>
              </Link>
            </li>
          )
        }

        const key = [...trail, node.label].join('>')
        const isExpanded = expanded.has(key)

        return (
          <li key={key} className="group mx-2 my-1">
            <div
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isExpanded
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-gray-200 hover:bg-gray-800/50 hover:text-white'
              }`}
              onClick={() => toggle(key)}
            >
              <div className="flex-shrink-0 opacity-60 group-hover:opacity-100">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
              <span className="truncate">{node.label}</span>
            </div>
            {isExpanded && node.items.length > 0 && (
              <div className="mt-1 border-l border-gray-700/50 pl-3">
                {renderItems(node.items, [...trail, node.label])}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav
      className="docs-sidebar sticky top-[80px] h-[calc(100vh-100px)] w-full overflow-y-auto py-4 text-white"
      ref={containerRef}
    >
      {languageSelector}
      {renderItems(items, [])}
    </nav>
  )
}
