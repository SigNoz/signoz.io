'use client'

import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { ListicleItem } from '@/components/Listicle/types'
import TrackingLink from '../TrackingLink'

export interface DirectoryNavSection {
  id: string
  label: string
  items: ListicleItem[]
}

interface DirectoryCategoryNavProps {
  variant: 'sidebar' | 'pills'
  sections: DirectoryNavSection[]
  activeId: string
  onSelect: (id: string) => void
}

const rowClasses = (isActive: boolean) =>
  `flex h-8 w-full items-center gap-1.5 rounded-[4px] px-2 text-[13px] transition-colors ${
    isActive
      ? 'bg-[var(--l2-background)] text-[var(--l1-foreground)]'
      : 'text-[var(--l2-foreground)] hover:bg-[var(--l2-background-hover)] hover:text-[var(--l1-foreground)]'
  }`

export default function DirectoryCategoryNav({
  variant,
  sections,
  activeId,
  onSelect,
}: DirectoryCategoryNavProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(activeId !== 'all' ? [activeId] : [])
  )

  useEffect(() => {
    if (activeId === 'all') return
    setExpandedIds((prev) => {
      if (prev.has(activeId)) return prev
      const next = new Set(prev)
      next.add(activeId)
      return next
    })
  }, [activeId])

  if (variant === 'pills') {
    return (
      <nav
        data-markdown-ignore
        aria-label="Integration categories"
        className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden"
      >
        {[{ id: 'all', label: 'All' }, ...sections].map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeId === category.id
                ? 'bg-[var(--primary-background)] text-[var(--primary-foreground)]'
                : 'bg-[var(--l3-background)] text-[var(--l2-foreground)] hover:bg-[var(--l3-background-hover)]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </nav>
    )
  }

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <nav
      data-markdown-ignore
      aria-label="Integration categories"
      className="sticky top-[56px] hidden max-h-[calc(100vh-64px)] w-[240px] shrink-0 self-start overflow-y-auto lg:block"
    >
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        <li>
          <button
            type="button"
            onClick={() => onSelect('all')}
            className={rowClasses(activeId === 'all')}
          >
            <ChevronRight
              size={14}
              className="shrink-0 text-[var(--l3-foreground)]"
              aria-hidden="true"
            />
            All
          </button>
        </li>
        {sections.map((section) => {
          const isExpanded = expandedIds.has(section.id)
          return (
            <li key={section.id}>
              <div className={rowClasses(activeId === section.id)}>
                <button
                  type="button"
                  onClick={() => toggleExpanded(section.id)}
                  aria-expanded={isExpanded}
                  aria-label={`Toggle ${section.label}`}
                  className="flex shrink-0 items-center justify-center"
                >
                  <ChevronRight
                    size={14}
                    className={`text-[var(--l3-foreground)] transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(section.id)
                    setExpandedIds((prev) => {
                      if (prev.has(section.id)) return prev
                      const next = new Set(prev)
                      next.add(section.id)
                      return next
                    })
                  }}
                  className="flex h-full min-w-0 flex-1 items-center text-left"
                >
                  <span className="truncate">{section.label}</span>
                </button>
              </div>
              {isExpanded && section.items.length > 0 && (
                <ul className="m-0 mt-0.5 flex list-none flex-col gap-0.5 p-0 pl-[26px]">
                  {section.items.map((item) => (
                    <li key={`${item.href}-${item.name}`}>
                      <TrackingLink
                        href={item.href}
                        className="flex min-h-7 items-center rounded-[4px] px-2 py-1 text-[13px] text-[var(--l2-foreground)] no-underline transition-colors hover:bg-[var(--l2-background-hover)] hover:text-[var(--l1-foreground)]"
                        clickType="Nav Click"
                        clickName={item.clickName || item.name}
                        clickText={item.name}
                        clickLocation="Integrations Directory Sidebar"
                      >
                        {item.name}
                      </TrackingLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
