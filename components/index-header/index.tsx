import React from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import Hero from '@/components/ui/Hero'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { VideoModalPlayer } from './VideoModalPlayer'
import { HeroSectionPill } from './HeroSectionPill'
import HeroCopyMotion from './HeroCopyMotion'
import HeroTracePreview from './HeroTracePreview'
import GradientBlinds from './GradientBlinds'
import landingThumbnail from '@/public/img/landing/landing_thumbnail.webp'

const HERO_GRADIENT_COLORS = ['#0B0C0E', '#121317', '#161922', '#2C3140', '#3F5ECC']

export function HomepageHeroRedesign() {
  const primaryCTA = 'Get Started - Free'

  return (
    <header className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 overflow-hidden px-4 pt-24 sm:px-6 md:pt-40 lg:px-16 lg:pt-44 xl:px-20 xl:pt-[220px] wide:max-w-8xl wide:px-0">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[640px] w-full max-w-8xl -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_0%,#000_58%,rgba(0,0,0,0.72)_72%,transparent_100%)]">
        <GradientBlinds
          angle={20}
          blindCount={16}
          blindMinWidth={60}
          className="h-full w-full"
          distortAmount={0}
          dpr={1}
          gradientColors={HERO_GRADIENT_COLORS}
          mixBlendMode="lighten"
          mouseDampening={0.15}
          noise={0.4}
          shineDirection="left"
          spotlightOpacity={0.55}
          spotlightRadius={0.46}
          spotlightSoftness={1.2}
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-8xl flex-col">
        <HeroCopyMotion delay={0.04}>
          <TrackingLink
            href="/agent-native-observability/"
            clickType="Secondary CTA"
            clickName="Agent Native Observability Link"
            clickText="New Agent Native Observability"
            clickLocation="Hero Section"
            className="group mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-signoz_ink-500/55 px-2.5 py-1 text-sm font-normal leading-5 text-signoz_vanilla-400 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-signoz_ink-400/80 hover:text-signoz_vanilla-100"
          >
            <span className="rounded-full border border-signoz_slate-100/80 bg-signoz_ink-500/80 px-2 py-0.5 text-xs text-signoz_vanilla-100">
              New
            </span>
            Agent Native Observability
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </TrackingLink>
        </HeroCopyMotion>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.75fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] xl:gap-16">
          <HeroCopyMotion>
            <h1 className="m-0 max-w-3xl text-left text-5xl font-medium leading-none tracking-[-1.408px] text-signoz_vanilla-100 sm:text-6xl lg:text-5xl xl:text-6xl xl:leading-none">
              Observability for your
              <br />
              team, and AI agents.
              <br />
              <span className="text-signoz_vanilla-400">Powered by open standards.</span>
            </h1>
          </HeroCopyMotion>

          <div className="flex flex-col items-start md:pt-2">
            <HeroCopyMotion delay={0.12}>
              <p className="m-0 max-w-lg text-left text-lg font-normal leading-7 tracking-[-0.165px] text-signoz_vanilla-400 lg:max-w-sm lg:text-base xl:max-w-lg xl:text-lg">
                SigNoz brings your traces, metrics, and logs into one OpenTelemetry-native platform.
                Simple usage-based pricing, and the freedom to run on our cloud or your
                infrastructure.
              </p>
            </HeroCopyMotion>

            <HeroCopyMotion className="w-full sm:w-auto" delay={0.2}>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 xl:gap-6">
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
                    variant="legacyPrimary"
                    withIcon
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
                  className="block w-full sm:w-40"
                  prefetch={false}
                >
                  <Button
                    as="span"
                    className="!w-full !bg-signoz_ink-500/85 !text-signoz_vanilla-100 ring-1 ring-white/10 backdrop-blur-sm hover:!bg-signoz_ink-300"
                    variant="legacySecondary"
                    withIcon
                  >
                    Book a Demo
                  </Button>
                </TrackingLink>
              </div>
            </HeroCopyMotion>
          </div>
        </div>

        <div className="relative left-1/2 mt-16 w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 pb-40 md:px-16 xl:mt-20 xl:px-20 xl:pb-52 wide:max-w-8xl wide:px-0">
          <div className="pointer-events-none absolute bottom-24 left-1/2 h-56 w-[calc(100%-32px)] max-w-8xl -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(190,198,207,0.46)_0%,rgba(86,95,104,0.34)_38%,rgba(8,9,10,0)_74%)] blur-2xl" />
          <div className="pointer-events-none absolute bottom-40 left-1/2 h-28 w-[min(1180px,82dvw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16)_0%,rgba(96,105,115,0.12)_44%,rgba(8,9,10,0)_76%)] blur-xl" />
          <HeroTracePreview />
        </div>
      </div>
    </header>
  )
}

// Server component with single CTA
export function Header({ variant = 'control' }: { variant?: 'control' | 'ai-agents' }) {
  const primaryCTA = 'Get Started - Free'

  return (
    <header className="relative mx-auto mt-16 w-full max-w-8xl">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[-1] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      <div className="relative mx-auto flex w-full flex-col items-center border  !border-b-0 !border-t-0  border-dashed border-signoz_slate-400 pt-12 text-center md:pt-16">
        <HeroSectionPill
          href="/agent-native-observability/"
          text="Introducing Agent Native Observability →"
        />
        {variant === 'ai-agents' ? (
          <Hero>
            Observability for Your Team and AI Agents.
            <br />
            Powered by Open Standards.
          </Hero>
        ) : (
          <Hero>
            Observability on Your Terms,
            <br className="hidden md:block" />
            Powered by Open Standards.
          </Hero>
        )}
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
              <Button
                as="span"
                variant="legacyPrimary"
                className="flex-center !w-full"
                id="btn-get-started-homepage-hero"
              >
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
            <Button as="span" className="flex-center !w-full" variant="legacySecondary">
              <Calendar size={14} />
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
