'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { Card } from '@/components/ui/Card'
import { Badge } from '@signozhq/badge'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import {
  CARDS,
  CLOUD_ICONS,
  CONTAINER_ICONS,
  CORRELATION_CAROUSEL_DATA,
  DIRECT_INTEGRATIONS,
  EXISTING_AGENTS_ICONS,
  POPULAR_TOOLS_ICONS,
  QUERY_BUILDER_CARDS,
  STORAGE_DATA,
} from './LogManagement.constants'
import TabItem from '@/components/TabItem'
import Tabs from '@/components/Tabs'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import TestimonialCards from '@/shared/components/molecules/FeaturePages/TestimonialCard'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import IconGrid from '@/shared/components/molecules/FeaturePages/IconGrid'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'

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
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      {/* Border decorations */}
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      {/* Main content */}
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          High-Performance Log Analytics <br /> Built on Columnar Database
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          Ingest logs from anywhere, quickly search and analyze with a powerful query <br />
          builder backed by ClickHouse, and correlate your logs with other signals.
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
                    src="/img/log-management/LogManagementHero.svg"
                    alt="Log management hero"
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

const LogProcessingSection: React.FC = () => {
  const sourcesTabContent = (
    <div className="flex min-h-52 flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <IconGrid
          icons={CLOUD_ICONS}
          title="CLOUD"
          className="border-r-1 border-dashed border-signoz_slate-400 pr-4"
        />
        <IconGrid icons={CONTAINER_ICONS} title="CONTAINERS" />
      </div>

      <div className="border-b-1 border-dashed border-signoz_slate-400" />

      <IconGrid icons={POPULAR_TOOLS_ICONS} title="POPULAR TOOLS" />

      <Button
        variant="ghost"
        rounded="full"
        size={null}
        className="flex w-fit items-center justify-center gap-2 text-xs hover:bg-transparent"
        asChild
      >
        <TrackingLink
          href="/docs/logs-management/send-logs-to-signoz/"
          clickType="Inline Link"
          clickName="Log Management View Sources Link"
          clickLocation="Log Management Supported Sources Tab"
          clickText="VIEW ALL 50+ SOURCES"
        >
          VIEW ALL 50+ SOURCES
        </TrackingLink>
      </Button>
    </div>
  )

  const methodsTabContent = (
    <div className="flex min-h-52 flex-col gap-8">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="m-0 text-xs font-medium uppercase text-signoz_vanilla-400">
              OPENTELEMETRY
            </h3>
            <Badge color="vanilla" className="text-xs">
              Recommended
            </Badge>
          </div>
          <div className="flex items-center gap-8">
            <Image
              src="/img/website/opentelemetry-icon-color.svg"
              alt="OpenTelemetry"
              className="h-8"
              width={32}
              height={32}
            />
          </div>
        </div>
        <IconGrid icons={EXISTING_AGENTS_ICONS} title="EXISTING AGENTS" />
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase text-signoz_vanilla-400">
          DIRECT INTEGRATIONS
        </h3>
        <div className="flex flex-wrap gap-2">
          {DIRECT_INTEGRATIONS.map((integration, index) => (
            <Badge key={index} color="vanilla" className="rounded-sm">
              {integration}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        rounded="full"
        size={null}
        className="justify-start text-xs hover:bg-transparent"
        asChild
      >
        <TrackingLink
          href="/docs/logs-management/send-logs-to-signoz/"
          clickType="Inline Link"
          clickName="Log Management View Integration Guides Link"
          clickLocation="Log Management Collection Methods Tab"
          clickText="VIEW INTEGRATION GUIDES"
        >
          VIEW INTEGRATION GUIDES
        </TrackingLink>
      </Button>
    </div>
  )

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

          <Card className="bg-signoz_ink-400 [&>*]:p-4 [&>div]:border-1">
            <Tabs entityName="sources">
              <TabItem value="supported-sources" label="Supported Sources">
                {sourcesTabContent}
              </TabItem>
              <TabItem value="collection-methods" label="Collection Methods">
                {methodsTabContent}
              </TabItem>
            </Tabs>
          </Card>
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
                clickName="Log Management Customer Stories Button"
                clickLocation="Log Management Testimonials"
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

// Main Component
const LogsManagement: React.FC = () => {
  return (
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />

      <div className="relative bg-signoz_ink-500">
        {/* Background decorations */}
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        {/* Main sections */}
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
              metrics. Jump from APM traces to their related logs, from infrastructure metrics to
              log context, and from alerts to root cause with consistent trace ID correlation.
            </p>
          </div>

          <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
          <VisualQueryBuilder />
          <StorageSection />
        </SectionLayout>

        <UsageBasedPricing show={['logs']} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default LogsManagement
