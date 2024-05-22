// @ts-nocheck

'use client'

import React, { useState } from 'react'
import { TocItem, Doc, Category } from './types'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type TocProps = {
  toc: TocItem[]
}

const TocComponent: React.FC<TocProps> = ({ toc }) => {
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({})

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const renderDoc = (doc: Doc) => (
    <li
      key={doc.route}
      className="cursor-pointer truncate py-[8px] pl-[20px] text-sm font-normal text-gray-300  hover:text-white"
    >
      <Link href={doc.route} replace>
        {doc.label}
      </Link>
    </li>
  )

  const renderCategory = (category: Category) => {
    const isExpanded = true

    return (
      <li key={category.label} className="py-[8px] pl-[20px]">
        <div
          onClick={() => toggleCategory(category.label)}
          className="flex cursor-pointer items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}

          <Link href={category.route || ''} replace>
            <span className="font-normal">{category.label}</span>
          </Link>
        </div>
        {isExpanded && (
          <ul className="ml-4 mt-2 pl-0">
            {category.link && category.link.type === 'generated-index' && (
              <div className="ml-4 mt-2">
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

  const renderItem = (item: TocItem | string) => {
    if (typeof item === 'string') {
      const referencedItem = findItemById(item, toc)
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

  const findItemById = (route: string, items: TocItem[]): TocItem | undefined => {
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

  return (
    <nav className="w-100 sticky top-[64px] p-4 pl-0 text-white">
      <ul className="list-none p-0 pl-0">{toc.map(renderItem)}</ul>
    </nav>
  )
}

export default TocComponent
