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
  className = 'h-[152px]',
}: DocsIntroCardProps) {
  return (
    <TrackingLink
      href={href}
      clickType="Nav Click"
      clickName={clickName}
      clickText={title}
      clickLocation={clickLocation}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer nofollow' } : {})}
      className={`group box-border flex flex-col border-b border-r border-dashed border-signoz_ink-300 bg-transparent p-4 transition-colors hover:bg-signoz_ink-300 ${className}`}
    >
      <div className="flex h-full min-h-0 w-full flex-col justify-between">
        <div className="h-6 w-6 shrink-0">{icon}</div>

        <div className="flex w-full items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="m-0 text-base font-semibold leading-none text-signoz_vanilla-100">
              {title}
            </h3>
            <p className="m-0 text-base leading-[26px] text-[#adb4c2] transition-colors group-hover:text-[#eceef2]">
              {description}
            </p>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-solid border-signoz_ink-200 bg-signoz_ink-300 transition-colors group-hover:border-signoz_ink-200 group-hover:bg-[#23262e]">
            <ArrowUpRight
              size={20}
              strokeWidth={1.75}
              className="text-signoz_vanilla-400 transition-colors group-hover:text-signoz_vanilla-100"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </TrackingLink>
  )
}
