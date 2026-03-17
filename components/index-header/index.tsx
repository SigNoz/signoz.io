import React from 'react'
import Hero from '@/components/ui/Hero'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'
import { VideoModalPlayer } from './VideoModalPlayer'

// Server component with single CTA
export async function Header() {
  const primaryCTA = 'Get Started - Free'

  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[-1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border  !border-b-0 !border-t-0  border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        <div className="absolute left-0 top-[147px] z-[-1] h-10 !w-[100vw] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 sm:h-14 md:top-[253px] md:!w-[80vw]" />
        <Hero>
          <span className="md:hidden">Observability on Your Terms, Powered by Open Standards.</span>
          <span className="hidden md:inline">Observability on Your Terms,</span>
          <br className="hidden md:inline" />
          <span className="hidden md:inline">Powered by Open Standards.</span>
        </Hero>
        <p className="m-0 p-3 text-base font-medium sm:p-0">
          Traces, metrics, and logs in a unified, OpenTelemetry-native platform. Simple usage-based
          pricing,
          <br className="hidden lg:inline" /> no proprietary lock-in, and the freedom to run on our
          cloud or your infrastructure.
        </p>
      </div>
      <div className="!mx-auto mx-2 flex !w-[100vw] flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw] md:flex-row">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div className="group relative flex flex-col items-center">
            <TrackingLink
              href="/teams/"
              clickType="Primary CTA"
              clickName="Sign Up Button"
              clickText={primaryCTA}
              clickLocation="Hero Section"
              className="block w-[220px]"
            >
              <Button className="flex-center !w-full" id="btn-get-started-homepage-hero">
                {primaryCTA}
                <ArrowRight size={14} />
              </Button>
            </TrackingLink>
            <p className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 whitespace-nowrap pt-2 text-xs opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 md:block">
              No credit card required
            </p>
          </div>
          <TrackingLink
            href="/docs/introduction/"
            clickType="Secondary CTA"
            clickName="Explore Docs Button"
            clickText="Explore the Docs"
            clickLocation="Hero Section"
            className="block w-[220px]"
            prefetch={false}
          >
            <Button className="flex-center !w-full" type={Button.TYPES.SECONDARY}>
              <BookOpen size={14} />
              Explore the Docs
            </Button>
          </TrackingLink>
        </div>
      </div>
      <div className="section-container !mx-auto !mt-0 !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 md:!w-[80vw] md:border-dashed">
        <div className="w-100 mx-[-28px]">
          <VideoModalPlayer
            thumbnailSrc="/img/landing/landing_thumbnail.webp"
            videoId="944340217"
          />
        </div>
      </div>
    </header>
  )
}
