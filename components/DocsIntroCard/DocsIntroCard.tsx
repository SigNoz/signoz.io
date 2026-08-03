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
      className={`group box-border flex flex-col border-b border-l border-r border-dashed border-[var(--l2-border)] bg-[var(--l1-background)] p-4 transition-colors md:border-l-0 md:[&:nth-child(3n)]:border-r-0 ${className}`}
    >
      <div className="flex h-full min-h-0 w-full flex-col justify-between">
        <div className="h-6 w-6 shrink-0">{icon}</div>

        <div className="flex w-full items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-[12px]">
            <h3 className="m-0 text-base font-semibold leading-none text-[var(--l1-foreground)]">
              {title}
            </h3>
            <p className="m-0 text-base leading-[26px] text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]">
              {description}
            </p>
          </div>

          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-solid border-[var(--l2-border)] bg-[var(--l2-background)] transition-colors group-hover:border-[var(--l2-border)] group-hover:bg-[var(--l3-background)]">
            <ArrowUpRight
              size={20}
              strokeWidth={1.75}
              className="text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </TrackingLink>
  )
}
