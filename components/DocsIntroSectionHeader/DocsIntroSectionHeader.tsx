'use client'

import { ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import FloatingRingsScene from '@/components/FloatingRingsScene/FloatingRingsScene'

interface DocsIntroSectionHeaderProps {
  title: string
  description: string
  guidesCount?: number
  viewAllHref?: string
  illustration?: string
  illustrationAlt?: string
}

const CHIP_LINK_CLASS =
  'group/chip flex h-8 items-center gap-1.5 rounded py-2 pl-1.5 pr-2 text-base text-[var(--l3-foreground)] transition-colors hover:bg-[var(--l2-background-hover)] hover:text-[var(--l1-foreground)]'

export default function DocsIntroSectionHeader({
  title,
  description,
  guidesCount,
  viewAllHref,
  illustration,
  illustrationAlt = '',
}: DocsIntroSectionHeaderProps) {
  const hasGuides = guidesCount != null || viewAllHref

  return (
    <div className="relative z-0 flex min-h-[300px] overflow-visible">
      <div className="relative z-[1] flex flex-1 flex-col justify-end border-x border-b border-dashed border-[var(--l2-border)] p-4 lg:border-l-0 lg:border-r-0">
        <div className="flex flex-col gap-2">
          <h2 className="m-0 text-2xl font-semibold leading-9 text-[var(--l1-foreground)]">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-[var(--l3-foreground)]">{description}</p>
          {hasGuides && (
            <div className="flex items-center gap-2" data-markdown-ignore>
              {guidesCount != null &&
                (viewAllHref ? (
                  <Link href={viewAllHref} className={CHIP_LINK_CLASS}>
                    <BookOpen size={14} className="shrink-0" />
                    <span>{guidesCount} guides</span>
                  </Link>
                ) : (
                  <div className={CHIP_LINK_CLASS}>
                    <BookOpen size={14} className="shrink-0" />
                    <span>{guidesCount} guides</span>
                  </div>
                ))}
              {guidesCount != null && viewAllHref && (
                <div className="h-1 w-1 rounded-full bg-[var(--l3-foreground)]" />
              )}
              {viewAllHref && (
                <Link href={viewAllHref} className={CHIP_LINK_CLASS}>
                  <span>View all</span>
                  <ArrowRight
                    size={12}
                    className="shrink-0 transition-transform duration-200 group-hover/chip:translate-x-1"
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className="pointer-events-none relative z-0 hidden w-1/3 flex-shrink-0 overflow-visible border-b border-dashed border-[var(--l2-border)] lg:block"
        data-markdown-ignore
      >
        {illustration && (
          <div className="absolute inset-x-0 -bottom-28 top-12">
            <FloatingRingsScene src={illustration} alt={illustrationAlt} />
          </div>
        )}
      </div>
    </div>
  )
}
