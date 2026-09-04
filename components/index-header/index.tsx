import React from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import Hero from '@/components/ui/Hero'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import HalfBadge from '@/components/ui/ShimmerBadge/HalfBadge'
import { VideoModalPlayer } from './VideoModalPlayer'
import { HeroSectionPill } from './HeroSectionPill'
import HeroCopyMotion from './HeroCopyMotion'
import CustomerStoriesCard from './customer-stories/CustomerStoriesCard'
import landingThumbnail from '@/public/img/landing/landing_thumbnail.webp'

export function HomepageHeroRedesign() {
  const primaryCTA = 'Get Started — Free'

  return (
    <header className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2">
      <DitherCanvas
        fade="bottom"
        enableClick
        desktopOnly
        className="w-full px-4 pb-16 pt-24 sm:px-6 md:pt-40 lg:px-16 lg:pt-44 xl:px-20 xl:pt-[220px]"
      >
        <div className="mx-auto flex w-full max-w-8xl flex-col">
          <HeroCopyMotion delay={0.04}>
            <div className="mb-6">
              <HalfBadge
                badge="NEW"
                href="/agent-native-observability/"
                clickLocation="Hero Section"
                clickName="Agent Native Observability Link"
              >
                Agent Native Observability
              </HalfBadge>
            </div>
          </HeroCopyMotion>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.75fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)] xl:gap-16">
            <HeroCopyMotion>
              <h1 className="m-0 max-w-3xl text-left text-5xl font-medium leading-none tracking-[-1.408px] text-[var(--l1-foreground)] sm:text-6xl lg:text-5xl xl:text-6xl xl:leading-none">
                Observability for your
                <br />
                team and AI agents.
                <br />
                <span className="text-[var(--l2-foreground)]">Powered by open standards.</span>
              </h1>
            </HeroCopyMotion>

            <div className="flex flex-col items-start md:pt-2">
              <HeroCopyMotion delay={0.12}>
                <p className="m-0 max-w-lg text-left text-lg font-normal leading-7 tracking-[-0.165px] text-[var(--l2-foreground)] lg:max-w-sm lg:text-base xl:max-w-lg xl:text-lg">
                  SigNoz Cloud brings your traces, metrics, and logs into one OpenTelemetry-native
                  platform. Simple usage-based pricing, and the freedom to run on your
                  infrastructure with Self-Hosted SigNoz.
                </p>
              </HeroCopyMotion>

              <HeroCopyMotion className="w-full sm:w-auto" delay={0.2}>
                <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <TrackingLink
                    href="/teams/"
                    clickType="Primary CTA"
                    clickName="Sign Up Button"
                    clickText={primaryCTA}
                    clickLocation="Hero Section"
                    className="block w-full no-underline sm:w-auto"
                  >
                    <Button
                      as="span"
                      tactile
                      variant="default"
                      className="!flex w-full justify-center sm:min-w-[184px]"
                      id="btn-get-started-homepage-hero"
                    >
                      {primaryCTA}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Button>
                  </TrackingLink>
                  <TrackingLink
                    href="/contact-us/?source=homepage"
                    clickType="Secondary CTA"
                    clickName="Book a Demo Button"
                    clickText="Book a demo"
                    clickLocation="Hero Section"
                    className="block w-full no-underline sm:w-auto"
                    prefetch={false}
                  >
                    <Button
                      as="span"
                      tactile
                      variant="secondary"
                      className="!flex w-full justify-center sm:w-40"
                    >
                      Book a demo
                      <ArrowRight size={14} aria-hidden="true" />
                    </Button>
                  </TrackingLink>
                </div>
              </HeroCopyMotion>
            </div>
          </div>

          <HeroCopyMotion delay={0.28}>
            <div className="mt-14 md:mt-16">
              <CustomerStoriesCard />
            </div>
          </HeroCopyMotion>
        </div>
      </DitherCanvas>
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
            SigNoz Cloud brings your traces, metrics, and logs into one OpenTelemetry-native
            platform. Simple usage-based pricing, and the freedom to run on your infrastructure with
            Self-Hosted SigNoz.
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
            thumbnailAlt="SigNoz Cloud product demo video thumbnail showing the traces explorer"
            videoId="944340217"
          />
        </div>
      </div>
    </header>
  )
}
