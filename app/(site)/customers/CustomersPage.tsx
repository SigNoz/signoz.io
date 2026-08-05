'use client'

import Button from '@/components/ui/Button'

import CustomerProofCarousel from './CustomerProofCarousel'
import CustomerQuoteCarousel from './CustomerQuoteCarousel'
import CustomerStoryGrid from './CustomerStoryGrid'
import CustomerVideoCarousel from './CustomerVideoCarousel'

const customerMetrics = [
  {
    value: '47%',
    label: 'reduction in MTTR and TCO',
  },
  {
    value: '10 TB+/day',
    label: 'daily ingest for one deployment',
  },
  {
    value: '10K+',
    label: 'of engineering teams in production',
  },
] as const

const customerPageContainerClassName =
  'relative mx-auto w-[calc(100dvw-8px)] max-w-none border-x border-dashed border-signoz_slate-400 px-4 sm:px-6 lg:px-16 xl:px-20 wide:max-w-8xl wide:px-0'

export default function CustomersPage() {
  return (
    <div className="relative overflow-x-clip bg-signoz_ink-500 text-signoz_vanilla-100">
      <section className="relative border-b border-dashed border-signoz_slate-400">
        <div className="bg-blur-perlin-noise absolute inset-x-0 top-0 hidden h-screen opacity-60 md:block" />
        <div className="bg-blur-ellipse-388 absolute inset-x-0 top-0 hidden h-screen md:block" />
        <div className={customerPageContainerClassName}>
          <div className="pb-16 pt-28 md:pb-20 md:pt-40 lg:pt-44 xl:pt-[172px]">
            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:items-center lg:gap-14">
              <h1 className="m-0 max-w-3xl text-left text-5xl font-medium leading-none tracking-[-1.408px] text-signoz_vanilla-100 sm:text-6xl lg:text-5xl xl:text-6xl xl:leading-none">
                Meet the teams
                <br />
                building reliable systems
                <br />
                <span className="text-signoz_vanilla-400">with SigNoz.</span>
              </h1>

              <div>
                <div className="grid grid-cols-3 divide-x divide-signoz_slate-400 border-y border-signoz_slate-400 py-5">
                  {customerMetrics.map((metric) => (
                    <div className="px-2 first:pl-0 sm:px-4" key={metric.value}>
                      <div className="text-lg font-semibold tracking-[-0.02em] text-signoz_vanilla-100 sm:text-2xl">
                        {metric.value}
                      </div>
                      <p className="mt-2 max-w-36 text-xs leading-4 text-signoz_vanilla-400 sm:text-sm sm:leading-5">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="!w-full sm:!w-auto sm:min-w-[176px]"
                    to="/teams/"
                    variant="legacyPrimary"
                    withIcon
                  >
                    Get started free
                  </Button>
                  <Button
                    className="!w-full !bg-signoz_ink-500/80 !text-signoz_vanilla-100 ring-1 ring-signoz_slate-400 hover:!bg-signoz_ink-300 sm:!w-auto sm:min-w-[176px]"
                    to="/contact-us/?source=customers"
                    variant="legacySecondary"
                    withIcon
                  >
                    Contact us
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 md:mt-16">
              <CustomerVideoCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-dashed border-signoz_slate-400" id="customer-stories">
        <div className={customerPageContainerClassName}>
          <div className="py-16 lg:py-20">
            <div className="max-w-7xl">
              <h2 className="m-0 text-pretty text-3xl font-medium leading-none tracking-tight sm:text-4xl lg:text-5xl lg:leading-none">
                <span className="block">Stories from teams running SigNoz in production</span>
                <span className="block text-signoz_vanilla-400">
                  Learn how engineering teams instrument, investigate, migrate, and scale with
                  SigNoz.
                </span>
              </h2>
            </div>
            <div className="mt-12">
              <CustomerStoryGrid />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-dashed border-signoz_slate-400">
        <div className={customerPageContainerClassName}>
          <CustomerQuoteCarousel />
        </div>
      </section>

      <section>
        <div className={customerPageContainerClassName}>
          <div className="py-16 lg:py-24">
            <div className="max-w-7xl">
              <h2 className="m-0 text-pretty text-3xl font-medium leading-none tracking-tight sm:text-4xl lg:text-5xl lg:leading-none">
                10K+ engineering teams. One observability platform.
                <span className="block text-signoz_vanilla-400">
                  From tool consolidation and self-hosting to agent workflows and production-scale
                  debugging.
                </span>
              </h2>
            </div>
            <div className="mt-12">
              <CustomerProofCarousel />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
