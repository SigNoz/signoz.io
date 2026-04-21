'use client'

import React from 'react'
import TrackingLink from '@/components/TrackingLink'

export function NewsletterPill() {
  return (
    <TrackingLink
      href="https://newsletter.signoz.io/p/our-project-hail-mary-the-observability"
      clickType="Pill CTA"
      clickName="Newsletter Pill"
      clickText="From our Newsletter: How we observe 21B metric points daily"
      clickLocation="Hero Section"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-signoz_slate-200 bg-signoz_slate-400 px-4 py-2 text-xs font-medium leading-5 text-white shadow-[0_0_14px_0_rgba(78,116,248,0.40)] sm:gap-2 sm:text-sm">
        💌 From our Newsletter: How we observe 21B metric points daily →
      </span>
    </TrackingLink>
  )
}
