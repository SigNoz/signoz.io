'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, List } from 'lucide-react'
import type { ListicleItem } from '@/components/Listicle/types'
import DirectoryCategoryNav from './DirectoryCategoryNav'
import DirectorySearchInput from './DirectorySearchInput'
import DirectorySectionGrid from './DirectorySectionGrid'

export interface DirectorySection {
  id: string
  label: string
  title: string
  description?: string
  sectionName: string
  items: ListicleItem[]
}

interface ListicleDirectoryClientProps {
  sections: DirectorySection[]
  defaultSection?: string
  searchPlaceholder: string
  countLabel: string
}

export default function ListicleDirectoryClient({
  sections,
  defaultSection,
  searchPlaceholder,
  countLabel,
}: ListicleDirectoryClientProps) {
  const categoryIds = useMemo(() => ['all', ...sections.map((section) => section.id)], [sections])
  const navSections = useMemo(
    () =>
      sections.map((section) => ({
        id: section.id,
        label: section.label,
        items: section.items,
      })),
    [sections]
  )
  const [activeSection, setActiveSection] = useState(
    defaultSection && categoryIds.includes(defaultSection) ? defaultSection : 'all'
  )
  const [query, setQuery] = useState('')

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && categoryIds.includes(hash)) {
        setActiveSection(hash)
      }
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [categoryIds])

  const selectCategory = (id: string) => {
    setActiveSection(id)
    setQuery('')
    window.history.replaceState(null, '', `#${id}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const normalizedQuery = query.trim().toLowerCase()
  const visibleSections = useMemo(() => {
    if (normalizedQuery) {
      return sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            `${item.name} ${item.description ?? ''}`.toLowerCase().includes(normalizedQuery)
          ),
        }))
        .filter((section) => section.items.length > 0)
    }
    return activeSection === 'all'
      ? sections
      : sections.filter((section) => section.id === activeSection)
  }, [sections, normalizedQuery, activeSection])

  const visibleCount = visibleSections.reduce((count, section) => count + section.items.length, 0)
  const isFiltered = normalizedQuery !== '' || activeSection !== 'all'
  const activeCategory = normalizedQuery ? 'all' : activeSection

  return (
    <div className="not-prose">
      <DirectorySearchInput value={query} onChange={setQuery} placeholder={searchPlaceholder} />
      <DirectoryCategoryNav
        variant="pills"
        sections={navSections}
        activeId={activeCategory}
        onSelect={selectCategory}
      />
      <div className="my-4 flex items-start gap-8">
        <DirectoryCategoryNav
          variant="sidebar"
          sections={navSections}
          activeId={activeCategory}
          onSelect={selectCategory}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-12">
          {visibleSections.map((section) => (
            <DirectorySectionGrid key={section.id} section={section} />
          ))}
          {normalizedQuery && visibleSections.length === 0 && (
            <div className="py-8 text-center text-[var(--l2-foreground)]">
              No results found matching &ldquo;{query}&rdquo;
            </div>
          )}
          <div data-markdown-ignore className="flex items-center gap-2">
            <div className="flex h-8 items-center gap-1.5 rounded py-2 pl-1.5 pr-2 text-base text-[var(--l3-foreground)]">
              <List size={14} className="shrink-0" aria-hidden="true" />
              <span>
                {visibleCount} {countLabel}
              </span>
            </div>
            {isFiltered && (
              <>
                <div
                  className="h-1 w-1 rounded-full bg-[var(--l3-foreground)]"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => selectCategory('all')}
                  className="group/chip flex h-8 items-center gap-1.5 rounded py-2 pl-1.5 pr-2 text-base text-[var(--l3-foreground)] transition-colors hover:bg-[var(--l2-background-hover)] hover:text-[var(--l1-foreground)]"
                >
                  <span>View all</span>
                  <ArrowRight
                    size={12}
                    className="shrink-0 transition-transform duration-200 group-hover/chip:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
