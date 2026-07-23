'use client'

import { ArrowRight } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import TrackingLink from '@/components/TrackingLink'
import { HERO_DESCRIPTION, SEARCH_PLACEHOLDERS } from './constants'
import Image from 'next/image'

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

      <div className="from-background via-background/95 absolute inset-x-0 bottom-0 flex h-[180px] flex-col items-center justify-end bg-gradient-to-t to-transparent px-4 pt-0 pb-4">
        <div className="flex w-full max-w-[671px] flex-col items-center gap-4">
          <p className="text-muted-foreground max-w-2xl text-center text-base leading-[26px]">
            {HERO_DESCRIPTION}
          </p>
          <div className="flex w-full items-center gap-2">
            <SearchBar
              placeholder={SEARCH_PLACEHOLDERS}
              clickLocation="Docs Hero"
              className="!border-border !bg-card hidden !h-8 flex-1 !rounded-full !py-0 !pr-4 !pl-2 sm:flex [&_svg]:!mr-2 [&_svg]:!h-4 [&_svg]:!w-4 [&>span]:!text-xs"
            />
            <TrackingLink
              href="/teams/"
              clickType="Primary CTA"
              clickName="Sign up for SigNoz Cloud"
              clickText="Sign up for SigNoz Cloud"
              clickLocation="Docs Hero"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-8 flex-shrink-0 items-center gap-2 rounded-full px-4 pr-3.5 text-sm font-medium whitespace-nowrap transition-colors"
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
