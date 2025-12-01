'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import { CORRELATION_CAROUSEL_DATA } from './ExternalApisPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import TestimonialCards from '@/shared/components/molecules/FeaturePages/TestimonialCard'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'

// Main Component Sections
const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'External APIs Hero Start Trial',
        clickLocation: 'External APIs Hero',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/external-api-monitoring/overview/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'External APIs Hero Docs',
        clickLocation: 'External APIs Hero',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      {/* Border decorations */}
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      {/* Main content */}
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          Monitor External APIs With Built-In <br /> Service Correlation
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          Automatically detect external API calls using OpenTelemetry semantic conventions. <br />{' '}
          Click any metric to view the service making the call or the underlying trace.
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-[1] !mx-auto mx-2 !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw]">
        <ButtonGroup buttons={headerButtons} />
      </div>

      {/* Hero image */}
      <SectionLayout variant="no-border" className="!mt-0 max-md:-mb-[3rem]">
        <div className="w-100 mx-[-28px]">
          <div className="product-explainer-video hero-figure rounded-xl px-3">
            <div className="embed-container">
              <div className="absolute w-full">
                <div className="p-0">
                  <Image
                    src="/img/platform/ExternalApisMeta.png"
                    alt="External APIs hero"
                    className="w-full rounded-xl"
                    width={10000}
                    height={10000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>
    </header>
  )
}

const ViewAllExternalApiDomains: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">View all external API domains</h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            View all external domains with endpoints in use, last accessed time, operations per
            second, error percentage, and average latency.
          </p>
        </div>

        <Image
          src="/img/external-apis/view-all-external-api-domains.png"
          alt="View all external API domains"
          width={10000}
          height={10000}
          className="mb-8"
        />
      </div>
    </>
  )
}

const SeeServicesCallingApis: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">
            See which services call your API and jump to traces
          </h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            View call counts, latency, error rates, and request rates for each service calling an
            external API. Click any service name to open its dashboard in a new tab. Click any chart
            to view traces. Correlation is automatic via shared client spans.
          </p>
        </div>

        <Image
          src="/img/external-apis/see-services-calling-apis.png"
          alt="See which services call your API and jump to traces"
          width={10000}
          height={10000}
          className="mb-8"
        />
      </div>
    </>
  )
}

const CustomerStories: React.FC = () => {
  return (
    <>
      {/* Featured testimonial */}
      <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />

        <div className="relative">
          <div className="container pb-16">
            <div className="flex flex-col gap-6 py-32">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
                  <Image
                    src="/img/case_study/logos/shaped-logo.svg"
                    alt="Shaped"
                    width={100}
                    height={100}
                  />
                  Every single time we have an issue, SigNoz is always the first place to check. It
                  was super straightforward to migrate - just updating the exporter configuration,
                  basically three lines of code.
                  <span className="text-sm text-signoz_vanilla-400">
                    <span className="font-semibold">Karl Lyons</span> <br /> Senior SRE, Shaped
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <SectionLayout variant="bordered" className="!mx-auto p-0 max-md:-mb-[3rem]">
        <div className="container pb-16">
          <TestimonialCards />

          <div className="z-5 relative -mt-[25rem] flex h-96 items-end justify-center bg-gradient-to-t from-signoz_ink-500 to-transparent py-6 max-md:py-16">
            <Button variant="secondary" rounded="full" className="flex items-center gap-2" asChild>
              <TrackingLink
                href="/case-study/"
                clickType="Secondary CTA"
                clickName="External APIs Customer Stories Button"
                clickLocation="External APIs Testimonials"
                clickText="Read customer stories"
              >
                Read customer stories
                <ArrowRight size={14} />
              </TrackingLink>
            </Button>
          </div>
        </div>
      </SectionLayout>
    </>
  )
}

const ReadyToMonitorYourExternalApisBanner: React.FC = () => {
  const stopLosingUsersButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'External APIs Banner Start Trial',
        clickLocation: 'External APIs Bottom Banner',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/external-api-monitoring/overview/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'External APIs Banner Docs',
        clickLocation: 'External APIs Bottom Banner',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6 py-20">
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        Ready to Monitor Your <br /> External APIs?
      </h2>
      <ButtonGroup buttons={stopLosingUsersButtons} />
    </div>
  )
}

const FilterAndAutomaticDetectionSection: React.FC = () => {
  return (
    <div className="mt-12 border-y-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-16">
      <GridLayout variant="split">
        {/* Left Column - Ingestion */}
        <div className="flex flex-col px-6">
          <div className="flex min-h-56 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">
                Filter by environment, service or method
              </h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                Use the left panel to filter domains by Deployment Environment, Service Name, or RPC
                Method. When viewing endpoints for a domain, search for specific endpoints or filter
                by suggested attributes like deployment environment, host, status code, and more.
              </p>
            </div>
          </div>

          <Image
            src="/img/external-apis/filter-by-environment-service-or-method.png"
            alt="Filter by environment, service or method"
            width={10000}
            height={10000}
          />
        </div>

        {/* Right Column - Processing */}
        <div className="-my-16 flex flex-col border-l-1 border-dashed border-signoz_slate-400 px-6 pt-16">
          <div className="flex min-h-56 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">
                Automatic detection of external calls
              </h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                External API calls are automatically identified using OpenTelemetry's span.kind
                attribute to detect client spans. API details like domain, endpoint, and URL are
                extracted from semantic convention attributes (net.peer.name, http.url,
                http.target).
              </p>
            </div>
          </div>

          <div className="flex h-full flex-col items-center justify-center pb-16">
            <Image
              src="/img/external-apis/automatic-detection-of-external-calls.png"
              alt="Automatic detection of external calls"
              width={10000}
              height={10000}
            />
          </div>
        </div>
      </GridLayout>
    </div>
  )
}

// Main Component
const ExternalApis: React.FC = () => {
  return (
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />

      <div className="relative bg-signoz_ink-500">
        {/* Background decorations */}
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        {/* Main sections */}
        <Header />

        <SectionLayout variant="bordered" className="!px-0">
          <ViewAllExternalApiDomains />

          <div className="!mx-auto !w-[80vw] px-6 pt-6">
            <h2 className="mb-6 text-signoz_vanilla-100">
              Drill into domains to see endpoints and their performance
            </h2>
            <p className="mb-2 leading-relaxed text-signoz_vanilla-400">
              Click any domain to see all endpoints with call counts, latency, last used time, and
              error percentage. View performance visualizations including call response status,
              status code breakdown, rate over time, and latency trends.
            </p>
          </div>

          <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
          <FilterAndAutomaticDetectionSection />
          <SeeServicesCallingApis />
          <ReadyToMonitorYourExternalApisBanner />
        </SectionLayout>

        <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default ExternalApis
