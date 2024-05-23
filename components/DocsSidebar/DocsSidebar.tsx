// @ts-nocheck

'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, File, FileText } from 'lucide-react'
import Link from 'next/link'
import { NavItem, Doc, Category } from './types'
import docsSideNav from 'constants/docsSideNav'
import { useExpandedCategories } from '@/hooks/useExpandedCategories'
import { usePathname } from 'next/navigation'

const DocsSidebar: React.FC = () => {
  const pathname = usePathname()
  const { expandedCategories, toggleCategory } = useExpandedCategories()
  const [isClient, setIsClient] = useState(false)
  const [activeRoute, setActiveRoute] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setActiveRoute(pathname)
    const currentRoute = pathname

    const expandCategoriesForRoute = (items: NavItem[], parentCategories: string[] = []) => {
      for (const item of items) {
        if (item.type === 'doc' && item.route === currentRoute) {
          parentCategories.forEach((category) => {
            toggleCategory(category)
          })

          return
        }
        if (item.type === 'category') {
          expandCategoriesForRoute(item.items, [...parentCategories, item.label])
        }
      }
    }

    expandCategoriesForRoute(docsSideNav)
  }, [pathname])

  const scrollToDoc = (route: string) => {
    console.log('first', sidebarRef)

    if (!sidebarRef.current) return

    const docElement = sidebarRef.current.querySelector(`li[id="${route}"]`)
    if (docElement) {
      docElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const renderDoc = (doc: Doc) => {
    const isActiveRoute = activeRoute === `${doc.route}/`

    return (
      <li
        key={doc.route}
        id={`#${doc.route}`}
        className={`flex cursor-pointer truncate pl-[16px] pt-[8px] text-sm font-normal ${
          isActiveRoute ? 'active-route text-white' : 'text-gray-300 hover:text-white'
        }`}
      >
        <Link href={doc.route} className="line-clamp-2 flex w-full items-center gap-2" replace>
          <FileText size={12} />
          <div className="line-clamp-2"> {doc.label} </div>
        </Link>
      </li>
    )
  }

  const renderCategory = (category: Category) => {
    const isExpanded = !!expandedCategories[category.label]

    return (
      <li key={category.label} className="pl-[16px] pt-[8px]">
        <div
          onClick={() => toggleCategory(category.label)}
          className="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          <span className="font-normal">{category.label}</span>
        </div>
        {isExpanded && (
          <ul className="ml-2 pl-0">
            {category.link && category.link.type === 'generated-index' && (
              <div className="ml-2 mt-2">
                <h4 className="mb-2 truncate text-sm font-normal text-gray-300">
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
      className="w-100 docs-sidebar sticky top-[48px] overflow-y-auto p-4 pl-0 text-white"
    >
      <ul className="list-none p-0 pl-0">{docsSideNav.map(renderItem)}</ul>
    </nav>
  )
}

export default DocsSidebar
