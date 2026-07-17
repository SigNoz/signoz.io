'use client'

import { ReactNode } from 'react'
import DocsSidebar from '@/components/DocsSidebar/DocsSidebar'
import { DOC_SIDENAV_CLASSES } from '@/components/DocsTOC/docLayoutClasses'
import MainFooter from '@/components/mainFooter'

/**
 * Persistent docs shell — sidebar lives here so expanded state is kept
 * across introduction ↔ article navigations (those use different route-group layouts).
 * Footer sits in the content column so the sidenav spans the full page height.
 */
export default function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full items-stretch max-sm:px-4">
      <div className={DOC_SIDENAV_CLASSES}>
        <DocsSidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="min-w-0 flex-1">{children}</div>
        <MainFooter inDocsShell />
      </div>
    </div>
  )
}
