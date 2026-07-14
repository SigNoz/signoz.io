'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import TrackingLink from '@/components/TrackingLink'
import { HERO_DESCRIPTION, SEARCH_PLACEHOLDERS } from './constants'

export default function Hero() {
  return (
    <div className="relative w-full">
      {/* 513px matches Figma hero banner height */}
      <div className="relative h-[513px] w-full overflow-hidden">
        <img
          src="/img/docs-introduction/hero-banner.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 flex h-[180px] w-full flex-col items-center justify-center border-b border-dashed border-signoz_ink-300 bg-gradient-to-t from-signoz_ink-500 from-[30%] via-signoz_ink-500/80 via-[55%] to-transparent p-4 backdrop-blur-[5px]">
        <div className="flex flex-col items-center gap-4">
          <p className="max-w-2xl text-center text-base leading-relaxed text-signoz_vanilla-400">
            {HERO_DESCRIPTION}
          </p>
          <div className="flex w-full max-w-2xl items-center gap-2">
            <SearchBar
              placeholder={SEARCH_PLACEHOLDERS}
              clickLocation="Docs Hero"
              className="hidden !h-8 flex-1 !rounded-full !border-signoz_ink-200 !bg-signoz_ink-400 !py-0 !pl-2 !pr-4 sm:flex [&>span]:!text-xs [&_svg]:!mr-2 [&_svg]:!h-4 [&_svg]:!w-4"
            />
            <TrackingLink
              href="/teams/"
              clickType="Primary CTA"
              clickName="Sign up for SigNoz Cloud"
              clickText="Sign up for SigNoz Cloud"
              clickLocation="Docs Hero"
              className="flex h-8 flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-signoz_robin-500 px-4 pr-3.5 text-sm font-medium text-signoz_vanilla-100 transition-colors hover:bg-signoz_robin-600"
            >
              Sign up for SigNoz Cloud
              <ArrowRight size={12} className="rotate-[-45deg]" />
            </TrackingLink>
          </div>
        </div>
      </div>
    </div>
  )
}
