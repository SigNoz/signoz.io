'use client'

import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

interface DocsIntroCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  clickName: string
  clickLocation: string
  external?: boolean
  className?: string
}

export default function DocsIntroCard({
  title,
  description,
  href,
  icon,
  clickName,
  clickLocation,
  external = false,
  className = '',
}: DocsIntroCardProps) {
  return (
    <TrackingLink
      href={href}
      clickType="Nav Click"
      clickName={clickName}
      clickText={title}
      clickLocation={clickLocation}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer nofollow' } : {})}
      className={`group border-b border-r border-dashed border-signoz_ink-300 p-4 transition-colors hover:bg-signoz_ink-500/50 ${className}`}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="h-6 w-6">{icon}</div>
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="text-base font-semibold leading-none text-signoz_vanilla-100">
              {title}
            </h3>
            <p className="text-base leading-relaxed text-signoz_vanilla-400">{description}</p>
          </div>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-signoz_ink-300 bg-signoz_ink-400/60">
            <ArrowUpRight
              size={20}
              className="text-signoz_vanilla-400 transition-colors group-hover:text-signoz_vanilla-100"
            />
          </div>
        </div>
      </div>
    </TrackingLink>
  )
}
