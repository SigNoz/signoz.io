'use client'

import React from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import JsonLdScript from '@/components/JsonLdScript'
import TrackingLink from '@/components/TrackingLink'
import Image from 'next/image'
import {
  CARDS,
  COMPARISON_LINKS,
  COMPARISON_ROWS,
  COMPARISON_VENDORS,
  CORRELATION_CAROUSEL_DATA,
  COST_CONTROL_CARDS,
  FAQ_ITEMS,
  INGESTION_CARDS,
  PROCESSING_CARDS,
  QUERY_BUILDER_CARDS,
} from './LogManagement.constants'
import SourcesTabsGrid from '@/shared/components/molecules/SourcesTabsGrid'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import ComparisonTable from '@/shared/components/molecules/FeaturePages/ComparisonTable'

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

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
      href: '/docs/logs-management/overview/',
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
          Ingest, parse, search, and analyze logs at scale in an OpenTelemetry-native
          <br />
          log management platform. Correlate logs with metrics and traces, choose Cloud
          <br />
          or self-hosted deployment, and keep log costs predictable.
        </>
      }
      buttons={headerButtons}
      heroImage="/img/log-management/LogManagementHero.svg"
      heroImageAlt="SigNoz log management software showing log analytics workflows"
    />
  )
}

const SectionIntro: React.FC<{
  title: string | React.ReactNode
  description: string
  className?: string
}> = ({ title, description, className = '' }) => (
  <div className={`bg-blur-ellipse-207 ${className}`}>
    <div className="grid place-items-center py-8 text-center md:py-20">
      <h2 className="text-3xl font-semibold leading-[3.5rem] text-signoz_sakura-100 sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-3xl text-center text-sm font-medium text-signoz_vanilla-400 sm:text-base">
        {description}
      </p>
    </div>
  </div>
)

const FeatureCardGrid: React.FC<{
  cards: typeof PROCESSING_CARDS
  cols?: 2 | 3
}> = ({ cards, cols = 2 }) => (
  <div
    className={`grid grid-cols-1 border-t border-dashed border-signoz_slate-400 ${
      cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
    }`}
  >
    {cards.map((card, index) => (
      <div
        key={index}
        className="border-b border-dashed border-signoz_slate-400 p-8 lg:border-r lg:last:border-r-0"
      >
        <div className="mb-6 text-signoz_robin-400">{card.icon}</div>
        <h3 className="m-0 text-xl font-semibold text-signoz_vanilla-100">{card.title}</h3>
        <p className="mb-0 mt-3 text-sm leading-relaxed text-signoz_vanilla-400">
          {card.description}
        </p>
      </div>
    ))}
  </div>
)

const LogProcessingSection: React.FC = () => {
  return (
    <div className="border-y-1 mt-12 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-16">
      <GridLayout variant="split">
        <div className="flex flex-col px-6">
          <div className="flex min-h-72 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">Ingest logs from any source</h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                Bring application, infrastructure, cloud, container, database, and platform logs
                into one OpenTelemetry-native log management workflow. Use the OpenTelemetry
                Collector or existing agents to route logs into SigNoz without proprietary
                collection lock-in.
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

        <div className="border-l-1 -my-16 flex flex-col border-dashed border-signoz_slate-400 px-6 pt-16 max-lg:border-l-0 max-lg:border-t max-lg:pt-10">
          <div className="flex min-h-72 flex-col justify-between">
            <div>
              <h2 className="mb-6 text-signoz_vanilla-100">
                Parse, transform, and secure logs before storage
              </h2>
              <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                Create processing pipelines through a visual UI to parse unstructured logs, extract
                attributes, normalize JSON fields, and mask sensitive data before logs are stored
                and queried.
              </p>
            </div>
            <Button
              variant="secondary"
              rounded="full"
              className="mb-8 flex w-fit items-center gap-2"
              asChild
            >
              <TrackingLink
                href="/docs/logs-pipelines/introduction/"
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
            alt="Visual log pipeline for parsing, transforming, and masking logs"
            width={10000}
            height={10000}
          />
        </div>
      </GridLayout>

      <div className="mt-16 border-t border-dashed border-signoz_slate-400">
        <FeatureCardGrid cards={INGESTION_CARDS} cols={3} />
        <FeatureCardGrid cards={PROCESSING_CARDS} />
      </div>
    </div>
  )
}

const VisualQueryBuilder: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-12">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">Search and analyze logs at scale</h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            Build log queries visually with auto-complete for attributes and values. Filter by
            regex, LIKE, IN, and nested JSON fields, run aggregations across high-volume log data,
            and turn useful queries into dashboards or alerts.
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
          alt="SigNoz visual query builder for log analysis"
          width={10000}
          height={10000}
          className="mb-8"
        />
      </div>
      <HeroCards cards={QUERY_BUILDER_CARDS} layoutVariant={'no-border'} cols={4} />
    </>
  )
}

const CostDeploymentSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const visibleCount = 2
  const totalPositions = COST_CONTROL_CARDS.length - visibleCount + 1

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % totalPositions)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + totalPositions) % totalPositions)

  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 pt-12">
      <div className="mb-10 px-8">
        <h2 className="mb-6 text-signoz_vanilla-100">
          Control log retention, deployment, and cost
        </h2>
        <p className="mb-0 max-w-3xl leading-relaxed text-signoz_vanilla-400">
          Keep cost and deployment choices visible while your log volume grows. SigNoz gives teams
          hot retention controls, queryable cold storage options, Cloud or self-hosted deployment,
          data residency choices, and transparent usage-based pricing.
        </p>
      </div>

      <div className="relative border-t border-dashed border-signoz_slate-400">
        <button
          onClick={handlePrev}
          className="absolute -left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-signoz_slate-400 bg-signoz_ink-500 text-signoz_vanilla-100 transition-colors hover:bg-signoz_ink-400"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {COST_CONTROL_CARDS.map((card, index) => (
              <div
                key={index}
                className="w-1/2 flex-shrink-0 border-r border-dashed border-signoz_slate-400 p-8 last:border-r-0"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="m-0 text-lg font-semibold text-signoz_vanilla-100">{card.title}</h3>
                <p className="mb-0 mt-2 text-sm leading-relaxed text-signoz_vanilla-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="absolute -right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-signoz_slate-400 bg-signoz_ink-500 text-signoz_vanilla-100 transition-colors hover:bg-signoz_ink-400"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

const LegacyComparisonSection: React.FC = () => {
  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 pb-12">
      <SectionIntro
        title="Compare SigNoz with legacy log management software"
        description="Use this compact comparison to evaluate SigNoz against common log management tools by open standards, deployment flexibility, cross-signal correlation, cost control, and query performance."
      />

      <div className="px-6">
        <ComparisonTable vendors={COMPARISON_VENDORS} rows={COMPARISON_ROWS} />

        <div className="mt-8 flex flex-wrap gap-3">
          {COMPARISON_LINKS.map((link) => (
            <Button key={link.href} variant="secondary" rounded="full" className="flex" asChild>
              <TrackingLink
                href={link.href}
                clickType="Secondary CTA"
                clickName={`Log Management Comparison ${link.text}`}
                clickLocation="Log Management Comparison Section"
                clickText={link.text}
              >
                {link.text}
                <ArrowRight size={14} />
              </TrackingLink>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

const LogManagementFAQSection: React.FC = () => {
  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-12 text-signoz_vanilla-100">
      <JsonLdScript data={faqStructuredData} />
      <div className="max-w-4xl">
        <h2 className="mb-6 text-signoz_vanilla-100">Frequently asked questions</h2>
        <p className="mb-6 leading-relaxed text-signoz_vanilla-400">
          Quick answers for teams evaluating log management software, log analytics,
          OpenTelemetry-native collection, and logs-metrics-traces correlation in SigNoz.
        </p>
        <div className="divide-y divide-signoz_slate-400 border-y border-signoz_slate-400">
          {FAQ_ITEMS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-signoz_vanilla-100 sm:text-lg">
                <span>{faq.question}</span>
                <span className="text-signoz_robin-400 transition-transform group-open:rotate-45">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="mb-0 mt-3 text-sm leading-relaxed text-signoz_vanilla-400 sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

const LogsManagement: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="border-x" className="!px-0">
        <SectionIntro
          title={
            <>
              Log management software built for <br className="hidden md:inline" /> modern
              engineering teams
            </>
          }
          description="SigNoz helps teams collect, process, query, correlate, and control logs in the same observability platform they use for metrics, traces, dashboards, and alerts."
        />
      </SectionLayout>
      <SectionLayout variant="border-x" className="!px-0">
        <HeroCards cards={CARDS} layoutVariant={'no-border'} cols={4} />
      </SectionLayout>
      <SectionLayout variant="bordered" className="!px-0">
        <LogProcessingSection />

        <div className="px-6 pt-12">
          <h2 className="mb-6 text-signoz_vanilla-100">Correlate logs with metrics and traces</h2>
          <p className="mb-2 leading-relaxed text-signoz_vanilla-400">
            Use OpenTelemetry semantic conventions to link logs with traces and metrics. Jump from
            logs to traces during incident debugging, move from infrastructure metrics to related
            logs, investigate alerts with contextual log data, and use trace IDs to speed up
            root-cause analysis.
          </p>
        </div>

        <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
        <VisualQueryBuilder />
        <CostDeploymentSection />
        <LegacyComparisonSection />
        <LogManagementFAQSection />
      </SectionLayout>

      <UsageBasedPricing show={['logs']} />
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
