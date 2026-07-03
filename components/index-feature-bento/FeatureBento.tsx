'use client'

import TrackingLink from '@/components/TrackingLink'

import EnterpriseReadyStrip from './EnterpriseReadyStrip'
import FeatureCard from './FeatureCard'
import { features } from './FeatureBentoData'

export default function FeatureBento() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-32 min-[1441px]:max-w-8xl min-[1441px]:px-0"
      data-homepage-feature-bento
    >
      <div className="mx-auto max-w-8xl">
        <div
          className="pointer-events-none absolute left-4 right-4 top-24 h-[1740px] sm:left-6 sm:right-6 lg:left-20 lg:right-20 lg:top-32"
          data-homepage-floating-cta="Explore docs"
          data-homepage-floating-href="/docs/introduction/"
          aria-hidden="true"
        />

        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <h2 className="m-0 max-w-3xl text-3xl font-medium leading-none tracking-tight text-signoz_vanilla-100 sm:text-4xl md:text-6xl md:leading-none">
              Everything your team needs to investigate production.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="m-0 text-base leading-7 tracking-normal text-signoz_vanilla-400 sm:text-lg sm:leading-8">
              Move from symptoms to evidence across APM, logs, traces, infra, LLM telemetry, alerts,
              and dashboards.
            </p>
            <TrackingLink
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
              clickLocation="Homepage Feature Bento"
              clickName="Explore Docs Link"
              clickText="Explore docs"
              clickType="Secondary CTA"
              href="/docs/introduction/"
            >
              Explore docs
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                -&gt;
              </span>
            </TrackingLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-8xl">
          <div className="relative">
            <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-6 md:grid-rows-[686px_342px_342px_456px] md:overflow-visible md:px-0 md:pb-0 lg:gap-1.5 [&::-webkit-scrollbar]:hidden">
              {features.map((feature) => (
                <FeatureCard key={feature.product} feature={feature} />
              ))}
            </div>
          </div>
        </div>

        <EnterpriseReadyStrip />
      </div>
    </section>
  )
}
