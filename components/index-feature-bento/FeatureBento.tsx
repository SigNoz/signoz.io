import SectionHeader from '@/components/homepage/SectionHeader'

import EnterpriseReadyStrip from './EnterpriseReadyStrip'
import FeatureCard from './FeatureCard'
import { features } from './FeatureBentoData'

export default function FeatureBento() {
  return (
    <section
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 md:py-24 lg:px-16 lg:py-32 xl:px-20 wide:max-w-8xl wide:px-0"
      data-homepage-feature-bento
    >
      <div className="mx-auto max-w-8xl">
        <div
          className="pointer-events-none absolute left-4 right-4 top-24 h-[1740px] sm:left-6 sm:right-6 lg:left-20 lg:right-20 lg:top-32"
          data-homepage-floating-cta="Explore docs"
          data-homepage-floating-href="/docs/introduction/"
          aria-hidden="true"
        />

        <SectionHeader
          title="One-stop platform for all"
          mutedTitle="your observability needs."
          description="Move from symptoms to evidence across APM, logs, traces, infra, LLM telemetry, alerts, and dashboards."
          cta={{
            label: 'Explore Docs',
            href: '/docs/introduction/',
            clickLocation: 'Homepage Feature Bento',
            clickName: 'Explore Docs Link',
          }}
        />

        <div className="relative mx-auto w-full max-w-8xl">
          <div className="flex flex-col gap-2 md:grid md:grid-cols-6 md:grid-rows-[686px_342px_342px_456px] lg:gap-1.5">
            {features.map((feature) => (
              <FeatureCard key={feature.product} feature={feature} />
            ))}
          </div>
        </div>

        <EnterpriseReadyStrip />
      </div>
    </section>
  )
}
