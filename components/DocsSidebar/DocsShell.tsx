'use client'

import { ReactNode } from 'react'
import DocsSidebar from '@/components/DocsSidebar/DocsSidebar'
import { DOC_SIDENAV_CLASSES } from '@/components/DocsTOC/docLayoutClasses'

/**
 * Persistent docs shell — sidebar lives here so expanded state is kept
 * across introduction ↔ article navigations (those use different route-group layouts).
 */
export default function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-start max-sm:px-4">
      <div className={DOC_SIDENAV_CLASSES}>
        <DocsSidebar />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
