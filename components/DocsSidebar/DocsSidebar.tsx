// @ts-nocheck
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import MetronomeIcon from '@/components/icons/MetronomeIcon'
import Link from 'next/link'
import { NavItem, Doc, Category } from './types'
import { useDocsSideNav } from './DocsSideNavContext'
import { usePathname } from 'next/navigation'
import { AppTooltip as Tooltip } from '@/components/ui/AppTooltip'
import { useBrowserSearch } from '@/hooks/useBrowserSearch'
import NewBadge from './NewBadge'
import SidebarRegionSelector from './SidebarRegionSelector'

interface DocsSidebarProps {
  onNavItemClick?: () => void
  showRegionSelector?: boolean
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ onNavItemClick, showRegionSelector = true }) => {
  const originalSideNav = useDocsSideNav()
  const pathname = usePathname()
  const search = useBrowserSearch()
  const [sideNav, setSideNav] = useState(originalSideNav)
  const [isClient, setIsClient] = useState(false)
  const [activeRoute, setActiveRoute] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const searchParams = isClient ? new URLSearchParams(search) : null
  const regionParam = searchParams?.get('region')
  const cloudRegionParam = searchParams?.get('cloud_region')

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleIsExpandedByLabel = (label, isExpanded) => {
    const toggle = (items) => {
      return items.map((item) => {
        if (item.type === 'category' && item.label === label && item.hasOwnProperty('isExpanded')) {
          return { ...item, isExpanded: isExpanded || !item.isExpanded }
        }
        if (item.items) {
          return { ...item, items: toggle(item.items) }
        }
        return item
      })
    }
    setSideNav((prevState) => toggle(prevState))
  }

  const expandLabels = (labels: string[]) => {
    if (!labels.length) return
    const labelSet = new Set(labels)
    const expand = (items) =>
      items.map((item) => {
        if (item.type === 'category' && item.hasOwnProperty('isExpanded')) {
          return {
            ...item,
            isExpanded: labelSet.has(item.label) ? true : item.isExpanded,
            items: item.items ? expand(item.items) : item.items,
          }
        }
        if (item.items) {
          return { ...item, items: expand(item.items) }
        }
        return item
      })
    setSideNav((prev) => expand(prev))
  }

  function findParentsForRoute(items, route, parents = []) {
    for (const item of items) {
      const itemRoute = item.route
        ? item.route.endsWith('/')
          ? item.route.slice(0, -1)
          : item.route
        : ''

      // Prefer a deeper match inside children when category route equals the path
      if (item.items) {
        const result = findParentsForRoute(item.items, route, [...parents, item.label])
        if (result) return result
      }

      if (itemRoute && itemRoute === route) return parents
    }
    return null
  }

  function getParents(docsSideNav, route) {
    for (const item of docsSideNav) {
      const parents = findParentsForRoute([item], route)
      if (parents) return parents
    }
    return []
  }

  // Check if a route has the active child (so the category itself should NOT be highlighted)
  function hasActiveChild(items, normalizedActiveRoute) {
    for (const item of items) {
      const normalizedRoute = item.route
        ? item.route.endsWith('/')
          ? item.route.slice(0, -1)
          : item.route
        : ''
      if (item.type === 'doc' && normalizedRoute === normalizedActiveRoute) return true
      if (item.type === 'category') {
        if (item.items && hasActiveChild(item.items, normalizedActiveRoute)) return true
      }
    }
    return false
  }

  useEffect(() => {
    setActiveRoute(pathname)
    const currentRoute = pathname
    const normalizedRoute = currentRoute.endsWith('/') ? currentRoute.slice(0, -1) : currentRoute
    const parents = getParents(originalSideNav, normalizedRoute)
    expandLabels(parents)

    const rIC = window.requestIdleCallback ?? setTimeout
    rIC(() => {
      const elementId = `#${pathname.substring(0, pathname.length - 1)}`
      const element = document.getElementById(elementId)
      if (element && sidebarRef.current) {
        const sidebar = sidebarRef.current
        const elementRect = element.getBoundingClientRect()
        const sidebarRect = sidebar.getBoundingClientRect()
        const isAboveView = elementRect.top < sidebarRect.top
        const isBelowView = elementRect.bottom > sidebarRect.bottom
        if (isAboveView || isBelowView) {
          const elementOffsetTop = element.offsetTop
          const sidebarHeight = sidebar.clientHeight
          const elementHeight = element.clientHeight
          const targetScrollTop = elementOffsetTop - sidebarHeight / 2 + elementHeight / 2
          sidebar.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
        }
      }
    })
  }, [pathname])

  const constructHref = (route: string) => {
    let href = route
    if (regionParam) {
      href = `${href}${href.includes('?') ? '&' : '?'}region=${regionParam}`
      if (cloudRegionParam) {
        href = `${href}&cloud_region=${cloudRegionParam}`
      }
    }
    return href
  }

  const normalizeRoute = (route: string) => (route.endsWith('/') ? route.slice(0, -1) : route)
  const normalizedActiveRoute = normalizeRoute(activeRoute || '')

  const renderDoc = (doc: Doc) => {
    const normalizedDocRoute = normalizeRoute(doc.route)
    const isGetStarted = doc.route === '/docs' && doc.label === 'Get Started'

    const isActiveRoute = isGetStarted
      ? normalizedActiveRoute === normalizedDocRoute ||
        normalizedActiveRoute === '/docs/introduction'
      : normalizedActiveRoute === normalizedDocRoute

    return (
      <li
        key={doc.route}
        id={`#${doc.route}`}
        className="group mx-2 my-0.5 transition-all duration-200"
        onClick={() => onNavItemClick && typeof onNavItemClick == 'function' && onNavItemClick()}
      >
        <Link
          href={constructHref(doc.route)}
          className={`flex w-full items-center gap-1 rounded px-3 py-2 text-sm transition-all duration-200 ${
            isActiveRoute
              ? 'bg-signoz_ink-300 text-signoz_vanilla-100'
              : 'text-signoz_vanilla-400 hover:bg-signoz_ink-300 hover:text-signoz_vanilla-100'
          } ${doc.className || ''}`}
        >
          {isGetStarted && (
            <div className="flex-shrink-0 text-signoz_vanilla-400">
              <MetronomeIcon size={12} />
            </div>
          )}
          <Tooltip content={doc.label} side="right" delayDuration={500} sideOffset={12}>
            <span className="min-w-0 flex-1 truncate">{doc.label}</span>
          </Tooltip>
          {doc.published_date && <NewBadge publishedDate={doc.published_date} />}
        </Link>
      </li>
    )
  }

  const renderCategory = (category: Category) => {
    const normalizedCategoryRoute = normalizeRoute(category.route || '')
    // Category is "active" only if its own route matches AND it has no active child
    const routeMatches = normalizedActiveRoute === normalizedCategoryRoute
    const childIsActive = category.items
      ? hasActiveChild(category.items, normalizedActiveRoute)
      : false
    const isActiveRoute = routeMatches && !childIsActive

    return (
      <li key={category.label} className="group mx-2 my-0.5">
        <Link href={category.route ? constructHref(category.route) : ''}>
          <div
            onClick={() => toggleIsExpandedByLabel(category.label)}
            className={`flex cursor-pointer items-center gap-1 rounded px-3 py-2 text-sm transition-all duration-200 ${
              isActiveRoute
                ? 'bg-signoz_ink-300 text-signoz_vanilla-100'
                : 'text-signoz_vanilla-400 hover:bg-signoz_ink-300 hover:text-signoz_vanilla-100'
            } ${category.className || ''}`}
          >
            <div className="flex-shrink-0 text-signoz_vanilla-400">
              {category.isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </div>
            <Tooltip content={category.label} side="right" delayDuration={500} sideOffset={12}>
              <span className="min-w-0 flex-1 truncate">{category.label}</span>
            </Tooltip>
          </div>
        </Link>
        {category.isExpanded && (
          <div className="mt-0.5">
            {category.link && category.link.type === 'generated-index' && (
              <div className="mx-5 mb-1 mt-1">
                <Tooltip
                  content={category.link.title}
                  side="right"
                  delayDuration={500}
                  sideOffset={12}
                >
                  <h4
                    className={`truncate text-xs text-signoz_vanilla-400 ${
                      isActiveRoute ? 'text-white' : 'hover:text-white'
                    }`}
                  >
                    {category.link.title}
                  </h4>
                </Tooltip>
              </div>
            )}
            <ul className="ml-3 space-y-0 pl-1">{category?.items?.map(renderItem)}</ul>
          </div>
        )}
      </li>
    )
  }

  const renderItem = (item: NavItem | string) => {
    if (typeof item === 'string') {
      const referencedItem = findItemById(item, originalSideNav)
      if (referencedItem) return renderItem(referencedItem)
      return null
    } else if (item.type === 'doc') {
      return renderDoc(item)
    } else if (item.type === 'category') {
      return renderCategory(item as Category)
    }
  }

  const findItemById = (route: string, items: NavItem[]): NavItem | undefined => {
    for (const item of items) {
      if (item.type === 'doc' && item.route === route) return item
      if (item.type === 'category') {
        const found = findItemById(route, item.items)
        if (found) return found
      }
    }
    return undefined
  }

  if (!isClient) return null

  return (
    <nav
      ref={sidebarRef}
      className="docs-sidebar sticky top-[48px] h-full w-full overflow-y-auto py-3 text-white"
    >
      {showRegionSelector && <SidebarRegionSelector />}
      <ul className="list-none space-y-0 p-0">{sideNav.map(renderItem)}</ul>
    </nav>
  )
}

export default DocsSidebar
