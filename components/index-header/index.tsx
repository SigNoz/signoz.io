import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import HalfBadge from '@/components/ui/ShimmerBadge/HalfBadge'
import HeroCopyMotion from './HeroCopyMotion'
import CustomerStoriesCard from './customer-stories/CustomerStoriesCard'

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
          <HeroCopyMotion delay={0.03}>
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
              <h1 className="m-0 max-w-3xl text-left text-[2.625rem] font-medium leading-none tracking-[-1.408px] text-[var(--l1-foreground)] sm:text-6xl lg:text-5xl xl:text-6xl xl:leading-none">
                Observability for your <br className="hidden sm:inline" />
                team and AI agents.
                <br />
                <span className="text-[var(--l2-foreground)]">Powered by open standards.</span>
              </h1>
            </HeroCopyMotion>

            <div className="flex flex-col items-start md:pt-2">
              <HeroCopyMotion delay={0.08}>
                <p className="m-0 max-w-lg text-left text-lg font-normal leading-7 tracking-[-0.165px] text-[var(--l2-foreground)] lg:max-w-sm lg:text-base xl:max-w-lg xl:text-lg">
                  SigNoz Cloud brings your traces, metrics, and logs into one OpenTelemetry-native
                  platform. Simple usage-based pricing, and the freedom to run on your
                  infrastructure with Self-Hosted SigNoz.
                </p>
              </HeroCopyMotion>

              <HeroCopyMotion className="w-full sm:w-auto" delay={0.12}>
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
                      size="lg"
                      variant="default"
                      className="!flex w-full justify-center sm:min-w-[196px]"
                      id="btn-get-started-homepage-hero"
                    >
                      {primaryCTA}
                      <ArrowRight size={16} aria-hidden="true" />
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
                      size="lg"
                      variant="secondary"
                      className="!flex w-full justify-center sm:w-44"
                    >
                      Book a demo
                      <ArrowRight size={16} aria-hidden="true" />
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
