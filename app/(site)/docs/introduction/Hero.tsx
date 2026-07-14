'use client'

import { ArrowRight } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import TrackingLink from '@/components/TrackingLink'
import { HERO_DESCRIPTION, SEARCH_PLACEHOLDERS } from './constants'
import Image from 'next/image'

const HERO_OVERLAY_GRADIENT =
  'linear-gradient(0deg, rgb(10, 12, 16) 0%, rgb(10, 12, 16) 36%, rgba(10, 12, 16, 0.95) 50%, rgba(10, 12, 16, 0.78) 62%, rgba(10, 12, 16, 0.45) 76%, rgba(10, 12, 16, 0.12) 90%, rgba(10, 12, 16, 0) 100%)'

export default function Hero() {
  return (
    <div className="relative h-[513px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/img/docs-introduction/hero-banner.webp"
          alt="SigNoz Docs Introduction Hero Banner"
          width={1000}
          height={1000}
          className="absolute left-0 w-full max-w-none"
          style={{ height: '127.63%', top: '-0.44%' }}
        />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex h-[180px] flex-col items-center justify-end px-4 pb-4 pt-0"
        style={{ backgroundImage: HERO_OVERLAY_GRADIENT }}
      >
        <div className="flex w-full max-w-[671px] flex-col items-center gap-4">
          <p className="max-w-2xl text-center text-base leading-[26px] text-[#adb4c2]">
            {HERO_DESCRIPTION}
          </p>
          <div className="flex w-full items-center gap-2">
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
