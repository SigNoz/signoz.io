import type { ReactNode } from 'react'

import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'

export const NAV_PILL_CLASS =
  'flex items-center truncate rounded-md px-2.5 py-1 text-sm font-normal outline-none transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l1-foreground)]'

interface NavPillLinkProps {
  href: string
  children: ReactNode
  clickName: string
  clickText: string
  className?: string
  clickType?: string
  clickLocation?: string
  prefetch?: boolean
  onClick?: () => void
  target?: string
}

export function NavPillLink({
  children,
  className,
  clickType = 'Nav Click',
  clickLocation = 'Top Navbar',
  ...rest
}: NavPillLinkProps) {
  return (
    <TrackingLink
      className={cn(NAV_PILL_CLASS, className)}
      clickType={clickType}
      clickLocation={clickLocation}
      {...rest}
    >
      {children}
    </TrackingLink>
  )
}
