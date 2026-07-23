'use client'

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
    <span className="border-secondary-border bg-secondary-background text-secondary-foreground flex-shrink-0 rounded-full border px-2 py-1 text-[11px] leading-none font-medium tracking-wide uppercase">
      NEW
    </span>
  )
}
