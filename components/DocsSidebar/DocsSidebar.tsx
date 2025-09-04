// @ts-nocheck
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, File, FileText } from 'lucide-react'
import Link from 'next/link'
import { NavItem, Doc, Category } from './types'
import docsSideNav from 'constants/docsSideNav'
import { usePathname } from 'next/navigation'
import { Tooltip } from '@nextui-org/react'

interface DocsSidebarProps {
  onNavItemClick?: () => void
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ onNavItemClick }) => {
  const pathname = usePathname()
  const [sideNav, setSideNav] = useState(docsSideNav)
  const [isClient, setIsClient] = useState(false)
  const [activeRoute, setActiveRoute] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

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

  function findParentsForRoute(items, route, parents = []) {
    for (const item of items) {
      if (item.route === route) {
        return parents
      }
      if (item.items) {
        const result = findParentsForRoute(item.items, route, [...parents, item.label])
        if (result) {
          return result
        }
      }
    }
    return null
  }

  function getParents(docsSideNav, route) {
    for (const item of docsSideNav) {
      const parents = findParentsForRoute([item], route)
      if (parents) {
        return parents
      }
    }
    return []
  }

  useEffect(() => {
    setActiveRoute(pathname)
    const currentRoute = pathname
    // Normalize the currentRoute by stripping the trailing slash if it exists
    const normalizedRoute = currentRoute.endsWith('/') ? currentRoute.slice(0, -1) : currentRoute

    const parents = getParents(docsSideNav, normalizedRoute)

    for (const parent of parents) {
      toggleIsExpandedByLabel(parent, true)
    }

    const rIC = window.requestIdleCallback ?? setTimeout

    rIC(() => {
      const elementId = `#${pathname.substring(0, pathname.length - 1)}`
      const element = document.getElementById(elementId)

      if (element && sidebarRef.current) {
        // Only scroll within the sidebar container, not the entire document
        const sidebar = sidebarRef.current
        const elementRect = element.getBoundingClientRect()
        const sidebarRect = sidebar.getBoundingClientRect()
        
        // Check if element is outside the visible area of the sidebar
        const isAboveView = elementRect.top < sidebarRect.top
        const isBelowView = elementRect.bottom > sidebarRect.bottom
        
        if (isAboveView || isBelowView) {
          // Calculate scroll position to center the element within the sidebar
          const elementOffsetTop = element.offsetTop
          const sidebarScrollTop = sidebar.scrollTop
          const sidebarHeight = sidebar.clientHeight
          const elementHeight = element.clientHeight
          
          const targetScrollTop = elementOffsetTop - (sidebarHeight / 2) + (elementHeight / 2)
          
          sidebar.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
          })
        }
      }
    })
  }, [pathname])

  const renderDoc = (doc: Doc) => {
    // Normalize both routes for comparison
    const normalizeRoute = (route: string) => (route.endsWith('/') ? route.slice(0, -1) : route)
    const normalizedActiveRoute = normalizeRoute(activeRoute || '')
    const normalizedDocRoute = normalizeRoute(doc.route)
    const isGetStarted = doc.route === '/docs' && doc.label === 'Get Started'

    // Special case: "Get Started" should be active when on /docs/introduction/ (since /docs/ redirects there)
    const isActiveRoute = isGetStarted
      ? normalizedActiveRoute === normalizedDocRoute ||
        normalizedActiveRoute === '/docs/introduction'
      : normalizedActiveRoute === normalizedDocRoute

    return (
      <li
        key={doc.route}
        id={`#${doc.route}`}
        className={`group transition-all duration-200 ${
          isGetStarted ? 'mb-4 ml-4 mr-2 mt-2' : 'mx-2 my-1'
        }`}
        onClick={() => onNavItemClick && typeof onNavItemClick == 'function' && onNavItemClick()}
      >
        <Link
          href={doc.route}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
            isGetStarted
              ? `font-medium ${
                  isActiveRoute
                    ? 'border border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border border-gray-600 text-gray-200 hover:border-blue-500 hover:bg-blue-500/5 hover:text-blue-400'
                }`
              : `${
                  isActiveRoute
                    ? 'bg-blue-500/10 text-blue-400 shadow-sm'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`
          } ${doc.className || ''}`}
        >
          {!isGetStarted && (
            <FileText className="flex-shrink-0 opacity-60 group-hover:opacity-100" size={14} />
          )}
          <Tooltip content={doc.label} placement="right" delay={500}>
            <span className="truncate font-medium">{doc.label}</span>
          </Tooltip>
        </Link>
      </li>
    )
  }

  const renderCategory = (category: Category) => {
    // Normalize both routes for comparison
    const normalizeRoute = (route: string) => (route.endsWith('/') ? route.slice(0, -1) : route)
    const normalizedActiveRoute = normalizeRoute(activeRoute || '')
    const normalizedCategoryRoute = normalizeRoute(category.route || '')
    const isActiveRoute = normalizedActiveRoute === normalizedCategoryRoute

    return (
      <li key={category.label} className="group mx-2 my-1">
        <Link href={category.route || ''}>
          <div
            onClick={() => toggleIsExpandedByLabel(category.label)}
            className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActiveRoute
                ? 'bg-blue-500/10 text-blue-400'
                : 'text-gray-200 hover:bg-gray-800/50 hover:text-white'
            } ${category.className || ''}`}
          >
            <div className="flex-shrink-0 opacity-60 group-hover:opacity-100">
              {category.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            <Tooltip content={category.label} placement="right" delay={500}>
              <span className="truncate font-medium">{category.label}</span>
            </Tooltip>
          </div>
        </Link>
        {category.isExpanded && (
          <div className="mt-1">
            {category.link && category.link.type === 'generated-index' && (
              <div className="mx-5 mb-2 mt-2">
                <Tooltip content={category.link.title} placement="right" delay={500}>
                  <h4
                    className={`truncate text-xs font-medium text-gray-400 ${
                      isActiveRoute ? 'text-blue-400' : 'hover:text-gray-300'
                    }`}
                  >
                    {category.link.title}
                  </h4>
                </Tooltip>
              </div>
            )}
            <ul className="ml-4 space-y-0.5 border-l border-gray-700/50 pl-0">
              {category?.items?.map(renderItem)}
            </ul>
          </div>
        )}
      </li>
    )
  }

  const renderItem = (item: NavItem | string) => {
    if (typeof item === 'string') {
      const referencedItem = findItemById(item, docsSideNav)
      if (referencedItem) {
        return renderItem(referencedItem)
      }
      return null
    } else if (item.type === 'doc') {
      return renderDoc(item)
    } else if (item.type === 'category') {
      return renderCategory(item as Category)
    }
  }

  const findItemById = (route: string, items: NavItem[]): NavItem | undefined => {
    for (const item of items) {
      if (item.type === 'doc' && item.route === route) {
        return item
      }

      if (item.type === 'category') {
        const found = findItemById(route, item.items)
        if (found) {
          return found
        }
      }
    }
    return undefined
  }

  if (!isClient) return null

  return (
    <nav
      ref={sidebarRef}
      className="docs-sidebar sticky top-[48px] h-full w-full overflow-y-auto py-4 text-white"
    >
      <ul className="list-none space-y-1 p-0">{sideNav.map(renderItem)}</ul>
    </nav>
  )
}

export default DocsSidebar
