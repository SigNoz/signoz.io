'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { Card } from '@/components/ui/Card'
import { Badge } from '@signozhq/badge'
import Image from 'next/image'
import {
  CARDS,
  CORRELATION_CAROUSEL_DATA,
  QUERY_BUILDER_CARDS,
  STORAGE_DATA,
} from './LogManagement.constants'
import SourcesTabsGrid from '@/shared/components/molecules/SourcesTabsGrid'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'

// Main Component Sections
const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Get Started - Free',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Log Management Hero Start Trial',
        clickLocation: 'Log Management Hero',
        clickText: 'Get Started - Free',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/introduction/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Log Management Hero Docs',
        clickLocation: 'Log Management Hero',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <FeaturePageHeader
      title={
        <>
          High-Performance Log Analytics <br /> Built on Columnar Database
        </>
      }
      description={
        <>
          Ingest logs from anywhere, quickly search and analyze with a powerful query <br />
          builder backed by ClickHouse, and correlate your logs with other signals.
        </>
      }
      buttons={headerButtons}
      heroImage="/img/log-management/LogManagementHero.svg"
      heroImageAlt="Log management hero"
    />
  )
}

const LogProcessingSection: React.FC = () => {
  return (
    <div className="mt-12 border-y-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-16">
      <GridLayout variant="split">
        {/* Left Column - Ingestion */}
        <div className="flex flex-col px-6">
          <div className="flex min-h-72 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">Ingest logs from anywhere</h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                OTel-native architecture supports extensive data source integration through multiple
                collection patterns, eliminating vendor lock-in while providing superior correlation
                capabilities.
              </p>
            </div>
            <Button
              variant="secondary"
              rounded="full"
              className="mb-8 flex w-fit items-center gap-2"
              asChild
            >
              <TrackingLink
                href="/docs/logs-management/send-logs-to-signoz/"
                clickType="Secondary CTA"
                clickName="Ingest Logs Read Docs Button"
                clickLocation="Log Management Ingestion Section"
                clickText="Read Documentation"
              >
                Read Documentation
                <ArrowRight size={14} />
              </TrackingLink>
            </Button>
          </div>

          <SourcesTabsGrid />
        </div>

        {/* Right Column - Processing */}
        <div className="-my-16 flex flex-col border-l-1 border-dashed border-signoz_slate-400 px-6 pt-16">
          <div className="flex min-h-72 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">
                Parse and transform logs before storage
              </h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                Create processing pipelines through a visual UI to parse unstructured logs, extract
                attributes, flatten nested JSON, and mask sensitive data. Apply processors like Grok
                patterns, regex, and JSON parsers to transform logs before they're stored and
                indexed.
              </p>
            </div>
            <Button
              variant="secondary"
              rounded="full"
              className="mb-8 flex w-fit items-center gap-2"
              asChild
            >
              <TrackingLink
                href="/docs/logs-pipelines/concepts/"
                clickType="Secondary CTA"
                clickName="Log Processing Read Docs Button"
                clickLocation="Log Management Processing Section"
                clickText="Read Documentation"
              >
                Read Documentation
                <ArrowRight size={14} />
              </TrackingLink>
            </Button>
          </div>

          <Image
            src="/img/log-management/process-logs.png"
            alt="Log Processing"
            width={10000}
            height={10000}
          />
        </div>
      </GridLayout>
    </div>
  )
}

const VisualQueryBuilder: React.FC = () => {
  return (
    <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
      <div className="mb-8 max-w-4xl">
        <h2 className="mb-6 text-signoz_vanilla-100">
          Build ClickHouse queries visually with auto-complete for log attributes
        </h2>
        <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
          Run aggregations grouped by multiple dimensions, filter with regex and LIKE patterns,
          query nested JSON with dot notation, and work directly with the generated SQL. Create
          dashboards directly from query results or export to CSV for analysis.
        </p>
        <Button
          variant="secondary"
          rounded="full"
          className="flex w-fit items-center gap-2"
          asChild
        >
          <TrackingLink
            href="/docs/userguide/query-builder-v5/"
            clickType="Secondary CTA"
            clickName="Visual Query Builder Read Docs Button"
            clickLocation="Log Management Query Builder Section"
            clickText="Read Documentation"
          >
            Read Documentation
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>

      <Image
        src="/img/log-management/logs-explorer-qb.png"
        alt="Query Builder"
        width={10000}
        height={10000}
        className="mb-8"
      />

      <HeroCards cards={QUERY_BUILDER_CARDS} layoutVariant={'no-border'} variant="combined" />
    </div>
  )
}

const StorageSection: React.FC = () => {
  return (
    <div className="mb-12 border-y-1 border-dashed border-signoz_slate-400 bg-transparent p-0">
      <div className="flex h-full flex-col items-start gap-12 p-6 md:flex-row">
        <div className="flex h-full flex-1 flex-col justify-between">
          <h2 className="mb-6 font-semibold text-signoz_vanilla-100">
            Configure hot and cold storage
          </h2>
          <p className="mb-24 leading-relaxed text-signoz_vanilla-400">
            Set retention from 15-180 days in hot storage for fast queries. Older logs move to cold
            storage where they remain queryable at 3x slower speeds for compliance needs.
          </p>
          <div className="flex gap-12">
            <div className="border-r border-dashed border-signoz_slate-400/60 pr-12">
              <h3 className="mb-4 font-semibold text-signoz_vanilla-100">50%</h3>
              <div className="text-signoz_vanilla-400">Storage Savings</div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-signoz_vanilla-100">2 years</h3>
              <div className="text-signoz_vanilla-400">Configurable Retention</div>
            </div>
          </div>
        </div>

        <div className="flex-1 max-md:w-full">
          <div className="w-full max-md:flex max-md:justify-center max-md:overflow-x-auto">
            <table className="w-full border-collapse max-md:mx-auto max-md:min-w-[80vw]">
              <thead className="!border-1 !border-signoz_slate-400">
                <tr className="border-y-1 !border-signoz_slate-400">
                  <td className="!border-none bg-signoz_ink-400/60 px-2 py-4">
                    <div className="text-xs font-medium text-signoz_vanilla-400">
                      {STORAGE_DATA.headers.hot}
                    </div>
                  </td>
                  <td className="!border-none bg-signoz_ink-400 px-2 py-4 text-center" colSpan={5}>
                    <div className="text-xs font-medium text-signoz_vanilla-400">
                      {STORAGE_DATA.headers.cold}
                    </div>
                  </td>
                </tr>
                <tr className="border-y-1 !border-signoz_slate-400">
                  <td className="!border-none bg-signoz_ink-400 p-2" />
                  {STORAGE_DATA.coldPeriods.map((period, index) => (
                    <td key={index} className="!border-none p-4 text-center">
                      <div className="text-xs font-medium text-signoz_vanilla-400">
                        {period.value} {period.unit}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className="w-full !border-1 !border-signoz_slate-400">
                {STORAGE_DATA.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-y-1 !border-signoz_slate-400 bg-signoz_ink-400/40"
                  >
                    <td className="!border-none bg-signoz_ink-400/60 p-2">
                      <div className="flex items-center justify-between text-xs text-signoz_robin-400">
                        {row.period.value} {row.period.unit}
                        <Badge color="vanilla">{STORAGE_DATA.subHeader}</Badge>
                      </div>
                    </td>
                    {row.prices.map((price, priceIndex) => (
                      <td
                        key={priceIndex}
                        className="!border-none p-2 text-center text-xs text-signoz_vanilla-100"
                      >
                        {price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
const LogsManagement: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />
      <HeroCards cards={CARDS} />

      <SectionLayout variant="bordered" className="!px-0">
        <LogProcessingSection />

        <div className="!mx-auto !w-[80vw] px-6 pt-6">
          <h2 className="mb-6 text-signoz_vanilla-100">
            Automatic correlation between logs, metrics, and traces
          </h2>
          <p className="mb-2 leading-relaxed text-signoz_vanilla-400">
            Use OpenTelemetry semantic conventions to automatically link logs with traces and
            metrics. Jump from APM traces to their related logs, from infrastructure metrics to log
            context, and from alerts to root cause with consistent trace ID correlation.
          </p>
        </div>

        <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
        <VisualQueryBuilder />
        <StorageSection />
      </SectionLayout>

      <UsageBasedPricing show={['logs']} />
      <SigNozStats />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Log Management Customer Stories Button',
          clickLocation: 'Log Management Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default LogsManagement
