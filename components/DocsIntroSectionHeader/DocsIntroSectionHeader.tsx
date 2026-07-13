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
  const height = illustration ? 'min-h-[300px]' : hasGuides ? 'min-h-[180px]' : 'min-h-[148px]'

  return (
    <div className={`flex ${height}`}>
      <div className="flex flex-1 flex-col justify-end border-b border-dashed border-[#16181d] p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold leading-9 text-white">{title}</h2>
          <p className="text-base leading-[26px] text-signoz_vanilla-400">{description}</p>
          {hasGuides && (
            <div className="flex items-center gap-2">
              {guidesCount != null && (
                <div className="flex items-center gap-1.5 rounded py-2 pl-1.5 pr-2 text-base text-signoz_vanilla-400">
                  <BookOpen size={14} />
                  <span>{guidesCount} guides</span>
                </div>
              )}
              {guidesCount != null && viewAllHref && (
                <div className="h-1 w-1 rounded-full bg-[#747b8b]" />
              )}
              {viewAllHref && (
                <Link
                  href={viewAllHref}
                  className="flex items-center gap-1.5 rounded py-2 pl-1.5 pr-2 text-base text-signoz_vanilla-400 transition-colors hover:text-white"
                >
                  <span>View all</span>
                  <ArrowUpRight size={12} />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="hidden w-1/3 flex-shrink-0 overflow-hidden border-b border-dashed border-[#16181d] md:block">
        {illustration && (
          <img src={illustration} alt={illustrationAlt} className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  )
}
