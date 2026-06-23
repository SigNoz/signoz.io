import React from 'react'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/ui/Hero'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'
import { VideoModalPlayer } from './VideoModalPlayer'
import { HeroSectionPill } from './HeroSectionPill'
import HeroCopyMotion from './HeroCopyMotion'
import HeroTracePreview from './HeroTracePreview'
import landingThumbnail from '@/public/img/landing/landing_thumbnail.webp'

export function HomepageHeroRedesign() {
  const primaryCTA = 'Get Started - Free'

  return (
    <header className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] -translate-x-1/2 overflow-hidden px-4 pt-24 sm:px-6 md:pt-[220px] lg:px-[78px]">
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col">
        <HeroCopyMotion delay={0.04}>
          <TrackingLink
            href="/agent-native-observability/"
            clickType="Secondary CTA"
            clickName="Agent Native Observability Link"
            clickText="New Agent Native Observability"
            clickLocation="Hero Section"
            className="group mb-6 inline-flex items-center gap-2 text-sm font-normal leading-5 text-signoz_vanilla-400 transition-colors hover:text-signoz_vanilla-100"
          >
            <span className="rounded-full border border-signoz_slate-100 px-2 py-0.5 text-xs text-signoz_vanilla-100">
              New
            </span>
            Agent Native Observability
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </TrackingLink>
        </HeroCopyMotion>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] md:items-start md:gap-16">
          <HeroCopyMotion>
            <h1 className="m-0 max-w-[760px] text-left text-[44px] font-medium leading-[1.04] tracking-[-1.408px] text-signoz_vanilla-100 sm:text-[56px] md:text-[64px] md:leading-[64px]">
              Observability for your
              <br />
              team, and AI agents.
              <br />
              <span className="text-signoz_vanilla-400">Powered by open standards.</span>
            </h1>
          </HeroCopyMotion>

          <div className="flex flex-col items-start md:pt-2">
            <HeroCopyMotion delay={0.12}>
              <p className="m-0 max-w-[520px] text-left text-[17px] font-normal leading-7 tracking-[-0.165px] text-signoz_vanilla-400">
                SigNoz brings your traces, metrics, logs, and alerts into one OpenTelemetry-native
                workspace so you don&apos;t have to stitch together five tools during an incident.
              </p>
            </HeroCopyMotion>

            <HeroCopyMotion className="w-full sm:w-auto" delay={0.2}>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-6">
                <TrackingLink
                  href="/teams/"
                  clickType="Primary CTA"
                  clickName="Sign Up Button"
                  clickText={primaryCTA}
                  clickLocation="Hero Section"
                  className="block w-full sm:w-auto"
                >
                  <Button
                    as="span"
                    className="!w-full sm:!w-auto sm:min-w-[184px]"
                    id="btn-get-started-homepage-hero"
                  >
                    {primaryCTA}
                  </Button>
                </TrackingLink>
                <TrackingLink
                  href="/contact-us/?source=homepage"
                  clickType="Secondary CTA"
                  clickName="Book a Demo Button"
                  clickText="Book a Demo"
                  clickLocation="Hero Section"
                  className="block w-full sm:w-[160px]"
                  prefetch={false}
                >
                  <Button
                    as="span"
                    className="homepage-button--secondary-with-icon !w-full"
                    type={Button.TYPES.SECONDARY}
                  >
                    Book a Demo
                  </Button>
                </TrackingLink>
              </div>
            </HeroCopyMotion>
          </div>
        </div>

        <div className="relative left-1/2 mt-[76px] w-[calc(100dvw-8px)] -translate-x-1/2 px-5 pb-52 md:px-[78px]">
          <div className="pointer-events-none absolute bottom-24 left-1/2 h-56 w-[calc(100%-32px)] max-w-[1410px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(190,198,207,0.46)_0%,rgba(86,95,104,0.34)_38%,rgba(8,9,10,0)_74%)] blur-2xl" />
          <div className="pointer-events-none absolute bottom-40 left-1/2 h-28 w-[min(1180px,82vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16)_0%,rgba(96,105,115,0.12)_44%,rgba(8,9,10,0)_76%)] blur-xl" />
          <HeroTracePreview />
        </div>
      </div>
    </header>
  )
}

export function Header() {
  const primaryCTA = 'Get Started - Free'

  return (
    <header className="relative mx-auto mt-16 w-full max-w-8xl">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[-1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      <div className="relative mx-auto flex w-full flex-col items-center border  !border-b-0 !border-t-0  border-dashed border-signoz_slate-400 pt-12 text-center md:pt-16">
        <HeroSectionPill
          href="/agent-native-observability/"
          text="Introducing Agent Native Observability →"
        />
        <Hero>
          <span className="md:hidden">Observability on Your Terms, Powered by Open Standards.</span>
          <span className="hidden md:inline">Observability on Your Terms,</span>
          <br className="hidden md:inline" />
          <span className="hidden md:inline">Powered by Open Standards.</span>
        </Hero>
        <div className="w-full border !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 px-6 py-2">
          <p className="m-0 p-3 text-base font-medium sm:p-0">
            Traces, metrics, and logs in a unified, OpenTelemetry-native platform. Simple
            usage-based pricing,
            <br className="hidden lg:inline" /> no proprietary lock-in, and the freedom to run on
            our cloud or your infrastructure.
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:flex-row">
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
              <Button as="span" className="flex-center !w-full" id="btn-get-started-homepage-hero">
                {primaryCTA}
              </Button>
            </TrackingLink>
            <p className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 whitespace-nowrap pt-2 text-xs opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 md:block">
              No credit card required
            </p>
          </div>
          <TrackingLink
            href="/contact-us/?source=homepage"
            clickType="Secondary CTA"
            clickName="Book a Demo Button"
            clickText="Book a Demo"
            clickLocation="Hero Section"
            className="block w-[220px]"
            prefetch={false}
          >
            <Button as="span" className="flex-center !w-full" type={Button.TYPES.SECONDARY}>
              Book a Demo
            </Button>
          </TrackingLink>
        </div>
      </div>
      <div className="mx-auto mt-0 w-full border !border-b-0 !border-t-0 border-none border-signoz_slate-400 md:border-dashed">
        <div className="w-full">
          <VideoModalPlayer
            thumbnailSrc={landingThumbnail}
            thumbnailAlt="SigNoz product demo video thumbnail showing the traces explorer"
            videoId="944340217"
          />
        </div>
      </div>
    </header>
  )
}
