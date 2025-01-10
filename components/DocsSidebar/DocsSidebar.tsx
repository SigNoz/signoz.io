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

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    })
  }, [pathname])

  const renderDoc = (doc: Doc) => {
    const isActiveRoute = activeRoute === `${doc.route}/`

    return (
      <li
        key={doc.route}
        id={`#${doc.route}`}
        className={`doc flex cursor-pointer truncate pl-[16px] pt-[8px] text-lg font-normal ${
          isActiveRoute
            ? 'active-route text-white'
            : 'text-gray-300 hover:text-white hover:underline'
        }`}
        onClick={() => onNavItemClick && typeof onNavItemClick == 'function' && onNavItemClick()}
      >
        <Link
          href={doc.route}
          className={`line-clamp-2 flex w-full items-center gap-2 ${doc.className}`}
        >
          <FileText className="flex-none" size={12} />
          <Tooltip content={doc.label}>
            <div className="sidebar-label line-clamp-2 text-sm"> {doc.label} </div>
          </Tooltip>
        </Link>
      </li>
    )
  }

  const renderCategory = (category: Category) => {
    const isActiveRoute = activeRoute === `${category.route}/`

    return (
      <li key={category.label} className="pt-[8px] md:pl-[0px] lg:pl-[16px]">
        <Link href={category.route || ''}>
          <div
            onClick={() => toggleIsExpandedByLabel(category.label)}
            className={`folder flex cursor-pointer items-center gap-2 text-sm text-gray-200 hover:text-white ${category.className} ${isActiveRoute ? 'active-route text-white' : ''}`}
          >
            {category.isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}

            <span className={`sidebar-label text-sm font-normal`}>{category.label}</span>
          </div>
        </Link>
        {category.isExpanded && (
          <ul className={`ml-2 pl-0`}>
            {category.link && category.link.type === 'generated-index' && (
              <div className="ml-2 mt-2">
                <h4
                  className={`mb-2 truncate text-sm font-normal text-gray-300 hover:text-white hover:underline ${
                    isActiveRoute ? 'active-route text-white' : ''
                  }`}
                >
                  {category.link.title}
                </h4>
              </div>
            )}
            {category?.items?.map(renderItem)}
          </ul>
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
      className="w-100 docs-sidebar sticky top-[48px] overflow-y-auto pl-0 text-white md:pt-0 lg:p-4 lg:pt-4"
    >
      <ul className="list-none p-0 pl-0">{sideNav.map(renderItem)}</ul>
    </nav>
  )
}

export default DocsSidebar
