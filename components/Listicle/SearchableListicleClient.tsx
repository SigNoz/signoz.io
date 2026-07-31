'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@signozhq/ui/input'
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
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          prefix={<Search className="h-4 w-4 text-[var(--l3-foreground)]" aria-hidden="true" />}
          aria-label={searchPlaceholder}
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
        <div className="py-8 text-center text-[var(--l3-foreground)]">
          No results found matching &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </div>
  )
}
