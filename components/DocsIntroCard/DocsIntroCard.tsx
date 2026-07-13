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
      className={`group border-b border-r border-dashed border-[#16181d] p-4 transition-colors hover:bg-signoz_ink-500/50 ${className}`}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="h-6 w-6">{icon}</div>
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="text-base font-semibold leading-none text-white">{title}</h3>
            <p className="text-base leading-[26px] text-signoz_vanilla-400">{description}</p>
          </div>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#16181d] bg-[rgba(18,19,23,0.6)]">
            <ArrowUpRight
              size={20}
              className="text-signoz_vanilla-400 transition-colors group-hover:text-white"
            />
          </div>
        </div>
      </div>
    </TrackingLink>
  )
}
