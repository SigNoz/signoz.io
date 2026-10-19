'use client'

import { Badge } from '@signozhq/ui/badge'

interface NewBadgeProps {
  publishedDate: string
}

export default function NewBadge({ publishedDate }: NewBadgeProps) {
  const published = new Date(publishedDate)
  const now = new Date()
  const diffMs = now.getTime() - published.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  if (diffDays > 14 || diffDays < 0) return null

  return (
    <Badge variant="outline" color="secondary" className="flex-shrink-0 uppercase">
      NEW
    </Badge>
  )
}
