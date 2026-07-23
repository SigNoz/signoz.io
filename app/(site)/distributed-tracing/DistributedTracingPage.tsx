'use client'

import React from 'react'
import { MonitorDown, Shovel } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { Card } from '@/components/ui/Card'
import { Badge } from '@signozhq/badge'
import Image from 'next/image'
import {
  CARDS,
  CONTAINER_ICONS,
  CORRELATION_CAROUSEL_DATA,
  DIRECT_INTEGRATIONS,
  DISTRIBUTED_TRACING_HEADER_BUTTONS,
  LANGUAGES_ICONS,
  LEGACY_FORMAT_SUPPORT_ICONS,
  CONTROL_TRACES_VOLUME_PANEL,
  POPULAR_TOOLS_ICONS,
  FILTER_AND_ANALYZE_CARDS,
  INSTRUMENT_SERVICES_PANEL,
  MASSIVE_TRACES_SHOWCASE,
  RELATED_LOGS_PANEL,
  TRACE_QUERY_BUILDER_IMAGE,
  TRACE_QUERY_BUILDER_SHOWCASE,
} from './DistributedTracingPage.constants'
import TabItem from '@/components/TabItem'
import Tabs from '@/components/Tabs'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import IconGrid from '@/shared/components/molecules/FeaturePages/IconGrid'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'

// Main Component Sections
const Header: React.FC = () => {
  return (
    <FeaturePageHeader
      title={
        <>
          High-Performance Trace Analysis <br /> Powered by Columnar Storage
        </>
      }
      description={
        <>
          Aggregate and analyze millions of spans with ClickHouse performance. Correlate <br />{' '}
          traces with logs and metrics to find root cause in distributed systems.
        </>
      }
      buttons={DISTRIBUTED_TRACING_HEADER_BUTTONS}
      heroImage="/img/distributed-tracing/DistributedTracingHero.webp"
      heroImageAlt="Distributed tracing hero"
    />
  )
}

const LogProcessingSection: React.FC = () => {
  const sourcesTabContent = (
    <div className="flex min-h-52 flex-col gap-4">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        <IconGrid icons={LANGUAGES_ICONS} title="LANGUAGES" className="pr-4" />
        <Divider orientation="vertical" />
        <IconGrid icons={CONTAINER_ICONS} title="FRAMEWORKS" />
      </div>

      <Divider />

      <IconGrid
        icons={POPULAR_TOOLS_ICONS}
        title="AUTO-INSTRUMENTATED LIBRARIES"
        className="pb-3"
      />

      <Button
        variant="ghost"
        rounded="full"
        size={null}
        className="flex w-fit items-center justify-center gap-2 text-xs hover:bg-transparent"
        asChild
      >
        <TrackingLink
          href="/docs/instrumentation/"
          clickType="Inline Link"
          clickName="Distributed Tracing View Instrumentation Guides Link"
          clickLocation="Distributed Tracing Supported Sources Tab"
          clickText="VIEW ALL INSTRUMENTATION GUIDES"
        >
          VIEW ALL INSTRUMENTATION GUIDES
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
              COLLECTOR AS AGENT
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
        <IconGrid icons={LEGACY_FORMAT_SUPPORT_ICONS} title="LEGACY FORMAT SUPPORT" />
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase text-signoz_vanilla-400">
          SUPPORTED PROTOCOLS
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
          href="/docs/instrumentation/"
          clickType="Inline Link"
          clickName="Distributed Tracing View Methods Guides Link"
          clickLocation="Distributed Tracing Collection Methods Tab"
          clickText="VIEW ALL INSTRUMENTATION GUIDES"
        >
          VIEW ALL INSTRUMENTATION GUIDES
        </TrackingLink>
      </Button>
    </div>
  )

  return (
    <SplitSection
      className="py-10"
      left={INSTRUMENT_SERVICES_PANEL}
      right={
        <div className="-my-10 flex flex-col px-6 py-8">
          <div className="flex min-h-72 flex-col justify-between">
            <div>
              <Card className="[&>div]:border-1 bg-signoz_ink-400 [&>*]:p-4">
                <Tabs entityName="sources">
                  <TabItem
                    value="supported-sources"
                    label={
                      <span className="flex h-full w-full items-center justify-center gap-1">
                        <MonitorDown /> Supported Languages & Frameworks
                      </span>
                    }
                  >
                    {sourcesTabContent}
                  </TabItem>
                  <TabItem
                    value="collection-methods"
                    label={
                      <span className="flex h-full w-full items-center justify-center gap-1">
                        <Shovel /> Collection Methods
                      </span>
                    }
                  >
                    {methodsTabContent}
                  </TabItem>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      }
    />
  )
}

const VisualQueryBuilder: React.FC = () => {
  return (
    <>
      <FeatureShowcase {...TRACE_QUERY_BUILDER_SHOWCASE}>
        <Image
          src={TRACE_QUERY_BUILDER_IMAGE.src}
          alt={TRACE_QUERY_BUILDER_IMAGE.alt}
          width={10000}
          height={10000}
          className="mb-8"
        />

        {/* <HeroCards cards={FILTER_AND_ANALYZE_CARDS} layoutVariant={null} variant="combined" /> */}
      </FeatureShowcase>
      <HeroCards cards={FILTER_AND_ANALYZE_CARDS} layoutVariant={'no-border'} variant="combined" />
    </>
  )
}

const StorageSection: React.FC = () => {
  return (
    <div>
      <Divider />
      <SplitSection
        className="bg-transparent"
        left={RELATED_LOGS_PANEL}
        right={CONTROL_TRACES_VOLUME_PANEL}
        withVerticalDivider
      />
    </div>
  )
}

// Main Component
const DistributedTracing: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider />
        <HeroCards layoutVariant="no-border" cards={CARDS} />
        <Divider className="mb-12" />
        <Divider />
        <LogProcessingSection />

        <Divider />
        <FeatureShowcase
          {...MASSIVE_TRACES_SHOWCASE}
          className="!mx-auto px-6 pb-0 pt-6"
          contentClassName="mb-0"
        />
        <Divider orientation="vertical" />

        <CarouselCards
          cards={CORRELATION_CAROUSEL_DATA}
          buttonLink="/opentelemetry/correlating-traces-logs-metrics-nodejs/"
          buttonText="Read Blog"
        />
        <Divider />
        <VisualQueryBuilder />
        <StorageSection />
        <Divider className="pb-12" />
      </SectionLayout>
      <UsageBasedPricing show={['traces']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Distributed Tracing Customer Stories Button',
          clickLocation: 'Distributed Tracing Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default DistributedTracing
