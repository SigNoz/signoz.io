'use client'

import { ArrowRight } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import TrackingLink from '@/components/TrackingLink'
import { HERO_DESCRIPTION, SEARCH_PLACEHOLDERS } from './constants'
import Image from 'next/image'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'

/** l1/background (#0A0C10) opacity steps: 100% → 90% → 80% → 60% → 10% → 0% (bottom → top) */
const HERO_OVERLAY_GRADIENT =
  'linear-gradient(0deg, rgba(10, 12, 16, 1) 0%, rgba(10, 12, 16, 0.9) 20%, rgba(10, 12, 16, 0.8) 40%, rgba(10, 12, 16, 0.6) 60%, rgba(10, 12, 16, 0.1) 85%, rgba(10, 12, 16, 0) 100%)'

const PROGRESSIVE_BLUR_LAYERS = [
  { blur: 1, mask: 'linear-gradient(0deg, black 0%, transparent 40%)' },
  { blur: 4, mask: 'linear-gradient(0deg, black 0%, transparent 55%)' },
  { blur: 12, mask: 'linear-gradient(0deg, black 0%, transparent 70%)' },
  { blur: 24, mask: 'linear-gradient(0deg, black 0%, transparent 85%)' },
]

export default function Hero() {
  return (
    <DitherCanvas enableClick={false} className="relative h-[513px] w-full">
      <div className="relative h-[513px] w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src="/img/docs-introduction/hero-banner.webp"
            alt="SigNoz Docs Introduction Hero Banner"
            width={1000}
            height={1000}
            className="absolute left-0 w-full max-w-none"
            style={{ height: '127.63%', top: '-0.44%' }}
            priority
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px]">
          {PROGRESSIVE_BLUR_LAYERS.map((layer, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${layer.blur}px)`,
                WebkitBackdropFilter: `blur(${layer.blur}px)`,
                maskImage: layer.mask,
                WebkitMaskImage: layer.mask,
              }}
            />
          ))}
          <div className="absolute inset-0" style={{ backgroundImage: HERO_OVERLAY_GRADIENT }} />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-[180px] flex-col items-center justify-end px-4 pb-4 pt-0">
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
    </DitherCanvas>
  )
}
