'use client'

import React from 'react'
import Image from 'next/image'
import { CORRELATION_CAROUSEL_DATA } from './ExternalApisPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'

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
    <FeaturePageHeader
      title={
        <>
          Monitor External APIs With Built-In <br /> Service Correlation
        </>
      }
      description={
        <>
          Automatically detect external API calls using OpenTelemetry semantic conventions. <br />{' '}
          Click any metric to view the service making the call or the underlying trace.
        </>
      }
      buttons={headerButtons}
      heroImageAlt="External APIs hero"
      heroImage="/img/platform/ExternalApisMeta.png"
    />
  )
}

const ViewAllExternalApiDomains: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6 max-md:mt-12">
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
                extracted from semantic convention attributes (server.address, url.full).
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
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <ViewAllExternalApiDomains />

        <div className="!mx-auto !w-[80vw] px-6 pt-6">
          <h2 className="mb-6 text-signoz_vanilla-100">
            Drill into domains to see endpoints and their performance
          </h2>
          <p className="mb-2 leading-relaxed text-signoz_vanilla-400">
            Click any domain to see all endpoints with call counts, latency, last used time, and
            error percentage. View performance visualizations including call response status, status
            code breakdown, rate over time, and latency trends.
          </p>
        </div>

        <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
        <FilterAndAutomaticDetectionSection />
        <SeeServicesCallingApis />
        <ReadyToMonitorYourExternalApisBanner />
      </SectionLayout>

      <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
      <SigNozStats />
      <CustomerStoriesSection
        tracking={{
          clickName: 'External APIs Customer Stories Button',
          clickLocation: 'External APIs Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default ExternalApis
