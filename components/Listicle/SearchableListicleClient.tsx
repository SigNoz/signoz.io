'use client'

import { useMemo, useState } from 'react'
import ListicleCardGrid from './ListicleCardGrid'
import type { ListicleItem } from './types'

interface SearchableListicleClientProps {
  items: ListicleItem[]
  sectionName: string
  viewAllText?: string
  gridCols?: string
  searchPlaceholder?: string
}

export default function SearchableListicleClient({
  items,
  sectionName,
  viewAllText,
  gridCols,
  searchPlaceholder = 'Search...',
}: SearchableListicleClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const normalizedSearchQuery = searchQuery.toLowerCase()

  const filteredItems = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(normalizedSearchQuery)),
    [items, normalizedSearchQuery]
  )

  return (
    <div className="space-y-6">
      <div className="relative mx-auto mb-8 max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <img src="/img/icons/listicle/lucide-search-gray.svg" alt="" className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="block w-full rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] py-2 pl-10 pr-3 leading-5 text-[var(--l1-foreground)] placeholder-[var(--l3-foreground)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] sm:text-sm"
        />
      </div>

      {filteredItems.length > 0 ? (
        <ListicleCardGrid
          items={filteredItems}
          sectionName={sectionName}
          viewAllText={viewAllText}
          gridCols={gridCols}
        />
      ) : (
        <div className="py-8 text-center text-[var(--l2-foreground)]">
          No results found matching &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </div>
  )
}
