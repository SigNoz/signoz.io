'use client'

import { useMemo, useState } from 'react'
import { Input } from '@signozhq/ui/input'
import { Typography } from '@signozhq/ui/typography'
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
          prefix={
            <img src="/img/icons/listicle/lucide-search-gray.svg" alt="" className="h-5 w-5" />
          }
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
        <Typography.Text color="muted" className="py-8 text-center">
          No results found matching &ldquo;{searchQuery}&rdquo;
        </Typography.Text>
      )}
    </div>
  )
}
