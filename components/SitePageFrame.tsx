'use client'

import { usePathname } from 'next/navigation'
import { cn } from 'app/lib/utils'

const FULL_BLEED_ROUTES = new Set(['/log-analyzer', '/log-analyzer/'])

export default function SitePageFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFullBleedRoute = FULL_BLEED_ROUTES.has(pathname)

  return (
    <main className={cn('mb-auto bg-[var(--l1-background)]', !isFullBleedRoute && 'mt-[48px]')}>
      {children}
    </main>
  )
}
