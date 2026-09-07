import React from 'react'
import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'

import ShimmerBadge, { type ShimmerBadgeTone } from './ShimmerBadge'

interface HalfBadgeProps {
  badge: string
  children: React.ReactNode
  tone?: ShimmerBadgeTone
  href?: string
  clickLocation?: string
  clickName?: string
  className?: string
}

export default function HalfBadge({
  badge,
  children,
  tone = 'green',
  href,
  clickLocation = 'Hero',
  clickName = 'Announcement Pill',
  className,
}: HalfBadgeProps) {
  const content = (
    <>
      <ShimmerBadge tone={tone} shape="right-soft">
        {badge}
      </ShimmerBadge>
      <span className="inline-flex h-[22px] items-center gap-1.5 rounded-[20px_999px_999px_20px] bg-[var(--l3-background)] py-0 pl-3 pr-3.5 text-xs font-medium text-[var(--l2-foreground)]">
        {children}
        {href ? <ArrowRight size={12} aria-hidden="true" /> : null}
      </span>
    </>
  )

  const containerClass = cn('inline-flex items-center gap-1', className)

  if (href) {
    return (
      <TrackingLink
        href={href}
        clickType="Nav Click"
        clickName={clickName}
        clickText={badge}
        clickLocation={clickLocation}
        className={cn(containerClass, 'no-underline')}
      >
        {content}
      </TrackingLink>
    )
  }

  return <span className={containerClass}>{content}</span>
}
