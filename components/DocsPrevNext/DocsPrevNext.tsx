'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { useDocsSideNav } from '@/components/DocsSidebar/DocsSideNavContext'
import { getPrevAndNextRoutes } from '../../utils/common'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import { cn } from 'app/lib/utils'

const cardClassName =
  'group flex w-full flex-col gap-2.5 rounded border border-[var(--action-border)] bg-[var(--action-background)] p-4 no-underline transition-colors hover:bg-[var(--action-background-hover)] sm:w-auto sm:min-w-[200px] sm:max-w-[48%]'
const labelClassName =
  'whitespace-nowrap text-base leading-6 text-[var(--action-foreground)] transition-colors group-hover:text-[var(--action-foreground-hover)]'
const arrowClassName =
  'shrink-0 text-[var(--action-foreground)] transition duration-200 group-hover:text-[var(--action-foreground-hover)]'
const titleClassName = 'text-sm leading-5 text-[var(--action-foreground)]'

export default function DocsPrevNext() {
  const sideNav = useDocsSideNav()
  const pathname = usePathname()
  const isOnboarding = isDocsOnboardingPathname(pathname)

  if (isOnboarding) {
    return null
  }

  const { prev, next } = getPrevAndNextRoutes(sideNav, pathname)
  return (
    <div className="docs-prev-next-nav mt-16 flex flex-col gap-4 sm:flex-row sm:justify-between">
      {prev?.route && (
        <Link href={prev.route} className={cn('docs-prev', cardClassName)} prefetch={false}>
          <div className="flex items-center justify-between gap-4">
            <ArrowLeft size={16} className={cn(arrowClassName, 'group-hover:-translate-x-1')} />
            <span className={labelClassName}>Previous</span>
          </div>
          <div className={cn('text-right', titleClassName)}>{prev.label}</div>
        </Link>
      )}

      {next?.route && (
        <Link
          href={next.route}
          className={cn('docs-next sm:ml-auto', cardClassName)}
          prefetch={false}
        >
          <div className="flex items-center justify-between gap-4">
            <span className={labelClassName}>Next</span>
            <ArrowRight size={16} className={cn(arrowClassName, 'group-hover:translate-x-1')} />
          </div>
          <div className={titleClassName}>{next.label}</div>
        </Link>
      )}
    </div>
  )
}
