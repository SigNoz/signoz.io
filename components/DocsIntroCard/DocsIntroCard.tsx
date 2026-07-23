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
      className={`group border-border hover:bg-muted/50 border-r border-b border-dashed p-4 transition-colors ${className}`}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="h-6 w-6">{icon}</div>
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-3">
            <h3 className="text-foreground text-base leading-none font-semibold">{title}</h3>
            <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
          </div>
          <div className="border-border bg-card/60 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border">
            <ArrowUpRight
              size={20}
              className="text-muted-foreground group-hover:text-foreground transition-colors"
            />
          </div>
        </div>
      </div>
    </TrackingLink>
  )
}
