'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import TrackingLink from '@/components/TrackingLink'
import { HERO_DESCRIPTION, SEARCH_PLACEHOLDERS } from './constants'

export default function Hero() {
  return (
    <div className="relative w-full">
      <div className="relative h-[513px] w-full overflow-hidden">
        <img
          src="/img/docs-introduction/hero-banner.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div
        className="absolute bottom-0 left-0 flex h-[180px] w-full flex-col items-center justify-center border-b border-dashed border-[#16181d] p-4"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgb(10, 12, 16) 30.14%, rgba(10, 12, 16, 0.9) 46.35%, rgba(10, 12, 16, 0.8) 56.39%, rgba(10, 12, 16, 0.6) 69.51%, rgba(10, 12, 16, 0.1) 83.79%, rgba(10, 12, 16, 0) 100%)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <p className="max-w-[671px] text-center text-base leading-[26px] text-signoz_vanilla-400">
            {HERO_DESCRIPTION}
          </p>
          <div className="flex w-full max-w-[671px] items-center gap-2">
            <SearchBar
              placeholder={SEARCH_PLACEHOLDERS}
              clickLocation="Docs Hero"
              className="hidden !h-8 flex-1 !rounded-full !border-[#23262e] !bg-[#121317] !py-0 !pl-2 !pr-4 sm:flex [&>span]:!text-xs [&>span]:!tracking-[-0.065px] [&_svg]:!mr-2 [&_svg]:!h-4 [&_svg]:!w-4"
            />
            <TrackingLink
              href="/teams/"
              clickType="Primary CTA"
              clickName="Sign up for SigNoz Cloud"
              clickText="Sign up for SigNoz Cloud"
              clickLocation="Docs Hero"
              className="flex h-8 flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#4e74f8] px-4 pr-3.5 text-[13px] font-medium tracking-[-0.065px] text-[#eceef2] transition-colors hover:bg-[#3d63e7]"
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
