import React from 'react'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface DocsIntroSectionHeaderProps {
  title: string
  description: string
  guidesCount?: number
  viewAllHref?: string
  illustration?: string
  illustrationAlt?: string
  tall?: boolean
}

export default function DocsIntroSectionHeader({
  title,
  description,
  guidesCount,
  viewAllHref,
  illustration,
  illustrationAlt = '',
  tall = false,
}: DocsIntroSectionHeaderProps) {
  const hasGuides = guidesCount != null || viewAllHref
  const height = illustration
    ? 'min-h-[300px]'
    : hasGuides || tall
      ? 'min-h-[180px]'
      : 'min-h-[148px]'

  return (
    <div className={`flex ${height}`}>
      <div className="border-border flex flex-1 flex-col justify-end border-b border-dashed p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-foreground text-2xl leading-9 font-semibold">{title}</h2>
          <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
          {hasGuides && (
            <div className="flex items-center gap-2">
              {guidesCount != null && (
                <div className="text-muted-foreground flex items-center gap-1.5 rounded py-2 pr-2 pl-1.5 text-base">
                  <BookOpen size={14} />
                  <span>{guidesCount} guides</span>
                </div>
              )}
              {guidesCount != null && viewAllHref && (
                <div className="bg-muted-foreground h-1 w-1 rounded-full" />
              )}
              {viewAllHref && (
                <Link
                  href={viewAllHref}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 rounded py-2 pr-2 pl-1.5 text-base transition-colors"
                >
                  <span>View all</span>
                  <ArrowUpRight size={12} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-border hidden w-1/3 flex-shrink-0 overflow-hidden border-b border-dashed md:block">
        {illustration && (
          <img src={illustration} alt={illustrationAlt} className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  )
}
