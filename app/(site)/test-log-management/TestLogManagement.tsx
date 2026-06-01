'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import Image from 'next/image'
import {
  WHY_SIGNOZ_CARDS,
  SEARCH_FEATURE_CARDS,
  CORRELATION_CAROUSEL_DATA,
  COMPARISON_VENDORS,
  COMPARISON_ROWS,
  FAQ_ITEMS,
} from './TestLogManagement.constants'
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
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import ComparisonTable from '@/shared/components/molecules/FeaturePages/ComparisonTable'
import FAQAccordion from '@/components/FAQAccordion/FAQAccordion'

// --- Header ---

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
          Log Management Software for <br /> High-Performance Log Analytics
        </>
      }
      description={
        <>
          Collect logs from every service into one fast store, search them in seconds, <br /> and
          connect any line to the metric or trace behind it.
        </>
      }
      buttons={headerButtons}
      heroImage="/img/log-management/LogManagementHero.svg"
      heroImageAlt="Log management hero"
    />
  )
}

// --- Ingest + Pipelines (split layout) ---

const IngestAndPipelinesSection: React.FC = () => {
  return (
    <div className="border-y-1 mt-12 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-16">
      <GridLayout variant="split">
        {/* Left — Ingestion */}
        <div className="flex flex-col px-6">
          <div className="flex min-h-72 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">Ingest logs from any source</h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                SigNoz accepts logs from your entire stack through the OpenTelemetry Collector or
                the log agents you already run. Point your sources at the collector, and SigNoz
                handles receiving, batching, and storage.
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

        {/* Right — Pipelines */}
        <div className="border-l-1 -my-16 flex flex-col border-dashed border-signoz_slate-400 px-6 pt-16">
          <div className="flex min-h-72 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">
                Parse, transform, and secure logs before storage
              </h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                Logs rarely arrive clean. SigNoz lets you build processing pipelines in a visual UI
                that run before data reaches storage, so what you query is already structured,
                consistent, and safe to keep.
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
            alt="Log processing pipelines"
            width={10000}
            height={10000}
          />
        </div>
      </GridLayout>
    </div>
  )
}

// --- Search & Analytics ---

const SearchSection: React.FC = () => {
  return (
    <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
      <div className="mb-8 max-w-4xl">
        <h2 className="mb-6 text-signoz_vanilla-100">Search and analyze logs at scale</h2>
        <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
          Build queries visually, run them against ClickHouse, and turn the results into dashboards.
          The query builder reads from your real log attributes, so you spend time investigating
          rather than memorizing syntax.
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
        alt="Query builder"
        width={10000}
        height={10000}
        className="mb-8"
      />

      <HeroCards
        cards={SEARCH_FEATURE_CARDS}
        layoutVariant={'no-border'}
        variant="combined"
        cols={3}
      />
    </div>
  )
}

// --- Correlation ---

const CorrelationSection: React.FC = () => {
  return (
    <>
      <div className="!mx-auto !w-[80vw] px-6 pt-6">
        <h2 className="mb-6 text-signoz_vanilla-100">Correlate logs with metrics and traces</h2>
        <p className="mb-2 leading-relaxed text-signoz_vanilla-400">
          During an incident, the fastest path to a fix is following one signal into the next.
          SigNoz links logs, metrics, and traces through shared trace IDs, so a single investigation
          flows from the first alert to the root cause.
        </p>
      </div>

      <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
    </>
  )
}

// --- Comparison ---

const ComparisonSection: React.FC = () => {
  return (
    <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
      <div className="mb-8 max-w-4xl">
        <h2 className="mb-6 text-signoz_vanilla-100">
          Compare SigNoz with legacy log management software
        </h2>
        <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
          A quick look at how SigNoz lines up against established tools across the dimensions that
          shape day-to-day log work.
        </p>
      </div>

      <ComparisonTable vendors={COMPARISON_VENDORS} rows={COMPARISON_ROWS} />

      <p className="mt-4 max-w-4xl text-xs text-signoz_vanilla-400/60">
        Comparison reflects general product positioning and the dimensions listed above. Vendor
        features and pricing models change over time, so confirm current details with each provider
        before you decide.
      </p>
    </div>
  )
}

// --- FAQ ---

const FAQSection: React.FC = () => {
  return (
    <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6 pb-12">
      <h2 className="mb-6 text-signoz_vanilla-100">Frequently asked questions</h2>
      <div className="max-w-3xl">
        <FAQAccordion faqs={FAQ_ITEMS} />
      </div>
    </div>
  )
}

// --- CTA Banner ---

const CTABanner: React.FC = () => {
  const ctaButtons = [
    {
      text: 'Get Started - Free',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Log Management CTA Start Trial',
        clickLocation: 'Log Management CTA Banner',
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
        clickName: 'Log Management CTA Docs',
        clickLocation: 'Log Management CTA Banner',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <div className="border-t-1 flex flex-col items-center justify-center border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6 py-20">
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        Start managing your logs <br /> the open way
      </h2>
      <p className="mb-8 text-center leading-relaxed text-signoz_vanilla-400">
        Send your first logs to SigNoz in minutes, then search, analyze, and correlate them across
        your whole stack.
      </p>
      <ButtonGroup buttons={ctaButtons} />
    </div>
  )
}

// --- Main Component ---

const TestLogManagement: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />
      <HeroCards cards={WHY_SIGNOZ_CARDS} cols={4} />

      <SectionLayout variant="bordered" className="!px-0">
        <IngestAndPipelinesSection />
        <SearchSection />
        <CorrelationSection />
        <ComparisonSection />
        <FAQSection />
        <CTABanner />
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

export default TestLogManagement
