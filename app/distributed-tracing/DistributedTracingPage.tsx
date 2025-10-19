'use client'

import React from 'react'
import { ArrowRight, MonitorDown, Shovel } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from "@signozhq/badge"
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import { 
  CARDS, 
  CONTAINER_ICONS, 
  CORRELATION_CAROUSEL_DATA, 
  DIRECT_INTEGRATIONS, 
  LANGUAGES_ICONS,
  LEGACY_FORMAT_SUPPORT_ICONS, 
  POPULAR_TOOLS_ICONS, 
  FILTER_AND_ANALYZE_CARDS
} from './DistributedTracingPage.constants'
import TabItem from '@/components/TabItem'
import Tabs from '@/components/Tabs'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import IconGrid from '@/shared/components/molecules/FeaturePages/IconGrid'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import TestimonialCards from '@/shared/components/molecules/FeaturePages/TestimonialCard'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'

// Main Component Sections
const Header: React.FC = () => {
  const headerButtons = [
    {
      text: "Start your free trial",
      href: "/teams/",
      variant: "default" as const,
      className: "flex-center"
    },
    {
      text: "Read Documentation", 
      href: "/docs/instrumentation/overview/",
      variant: "secondary" as const,
      className: "flex-center"
    }
  ]

  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      {/* Border decorations */}
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      
      {/* Main content */}
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">

        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          High-Performance Trace Analysis <br /> Powered by Columnar Storage
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
        Aggregate and analyze millions of spans with ClickHouse performance. Correlate <br /> traces with logs and metrics to find root cause in distributed systems.
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
                    src="/img/distributed-tracing/DistributedTracingHero.png"
                    alt="Distributed tracing hero"
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
    <div className="flex flex-col gap-4 min-h-52">
      <div className="grid grid-cols-2 gap-4">
        <IconGrid
          icons={LANGUAGES_ICONS}
          title="LANGUAGES"
          className="border-r-1 border-signoz_slate-400 border-dashed pr-4"
        />
        <IconGrid
          icons={CONTAINER_ICONS}
          title="FRAMEWORKS"
        />
      </div>

      <div className="border-b-1 border-signoz_slate-400 border-dashed" />

      <IconGrid
        icons={POPULAR_TOOLS_ICONS}
        title="AUTO-INSTRUMENTATED LIBRARIES"
        className="pb-3"
      />
      
      <Button 
        variant="ghost" 
        to="/docs/instrumentation/" 
        rounded="full" 
        size={null} 
        className="flex justify-center items-center gap-2 w-fit hover:bg-transparent text-xs"
      >
        VIEW ALL INSTRUMENTATION GUIDES
      </Button>
    </div>
  )

  const methodsTabContent = (
    <div className="flex flex-col gap-8 min-h-52">
      <div className="flex items-center md:flex-row flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xs font-medium uppercase text-signoz_vanilla-400 m-0">COLLECTOR AS AGENT</h3>
            <Badge color="vanilla" className="text-xs">Recommended</Badge>
          </div>
          <div className="flex items-center gap-8">
            <Image src="/img/website/opentelemetry-icon-color.svg" alt="OpenTelemetry" className="h-8" width={32} height={32} />
          </div>
        </div>
        <IconGrid
          icons={LEGACY_FORMAT_SUPPORT_ICONS}
          title="LEGACY FORMAT SUPPORT"
        />
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase text-signoz_vanilla-400">SUPPORTED PROTOCOLS</h3>
        <div className="flex flex-wrap gap-2">
          {DIRECT_INTEGRATIONS.map((integration, index) => (
            <Badge key={index} color="vanilla" className="rounded-sm">{integration}</Badge>
          ))}
        </div>
      </div>

      <Button 
        variant="ghost" 
        rounded="full" 
        size={null} 
        className="hover:bg-transparent text-xs justify-start" 
        to="/docs/instrumentation/"
      >
        VIEW ALL INSTRUMENTATION GUIDES
      </Button>
    </div>
  )

  return (
    <div className="bg-signoz_ink-500 py-10 mt-12 border-y-1 border-signoz_slate-400 border-dashed">
      <GridLayout variant="split">
        {/* Left Column - Ingestion */}
        <div className="flex flex-col px-6">
          <div className="min-h-72 flex flex-col justify-between">
            <div>
              <h2 className="text-signoz_vanilla-100 mb-6">Instrument services in minutes</h2>
              <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
              Auto-instrument your applications with OpenTelemetry across all major languages and frameworks. Change one environment variable to start sending traces to SigNoz.
              </p>
            </div>
            <Button 
              variant="secondary" 
              rounded="full"
              className="flex items-center gap-2 w-fit mb-8"
              to="/docs/instrumentation/overview/"
            >
              Read Documentation
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
        
        {/* Right Column - Processing */}
        <div className="flex flex-col px-6 -my-10 py-8">
          <div className="min-h-72 flex flex-col justify-between">
            <div>
              <Card className="bg-signoz_ink-400 [&>div]:border-1 [&>*]:p-4">
                <Tabs entityName="sources">
                  <TabItem value="supported-sources" label={<span className='flex-center'><MonitorDown /> Supported Languages & Frameworks</span>}>
                    {sourcesTabContent}
                  </TabItem>
                  <TabItem value="collection-methods" label={<span className='flex-center'><Shovel /> Collection Methods</span>}>
                    {methodsTabContent}
                  </TabItem>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </GridLayout>
    </div>
  )
}

const VisualQueryBuilder: React.FC = () => {
  return (
    <>
    <div className="bg-signoz_ink-500 p-6 border-t-1 border-signoz_slate-400 border-dashed">
      <div className="max-w-4xl mb-8">
        <h2 className="text-signoz_vanilla-100 mb-6">
          Find and analyze traces with powerful queries
        </h2>
        <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
          Filter traces by session ID, user ID, HTTP headers, or custom tags with auto-complete suggesting from your telemetry data as you type. Build complex queries visually, run aggregations like P95 latency calculations grouped by service or region, apply HAVING clauses to filter results, then dive deeper with trace operators to understand parent-child span relationships across your distributed system.
        </p>
        <Button 
          to="/docs/userguide/query-builder-v5/#multi-query-analysis-advanced-comparisons"
          variant="secondary" 
          rounded="full"
          className="flex items-center gap-2 w-fit"
        >
          Read Documentation
          <ArrowRight size={14} />
        </Button>
      </div>

      <Image 
        src="/img/distributed-tracing/find-and-analyze-traces-with-powerful-queries.png" 
        alt="Find and analyze traces with powerful queries" 
        width={10000} 
        height={10000} 
        className="mb-8"
      />
      
      {/* <HeroCards cards={FILTER_AND_ANALYZE_CARDS} layoutVariant={null} variant="combined" /> */}
    </div>
    <HeroCards cards={FILTER_AND_ANALYZE_CARDS} layoutVariant={'no-border'} variant="combined" />
    </>
  )
}

const StorageSection: React.FC = () => {
  return (
    <div className="p-0 bg-transparent border-y-1 border-signoz_slate-400 border-dashed mb-12">
      <div className="flex flex-col md:flex-row gap-8 items-start h-full px-6">
        <div className="w-full h-full flex flex-col justify-between border-r-1 border-signoz_slate-400 border-dashed pr-6 py-6">
          <h2 className="font-semibold text-signoz_vanilla-100 mb-6">See related logs of every span</h2>
          <p className="text-signoz_vanilla-400 mb-6 leading-relaxed">
            Click any span to see correlated logs instantly. OpenTelemetry automatically injects trace context into your logs, connecting traces and logs in both directions. Jump from traces to logs with one click, or click `trace_id` in any log to view the complete distributed trace.
          </p>
          <div className="flex flex-col">
            <Button variant="secondary" rounded="full" className="flex items-center gap-2 w-fit z-10" to="/docs/traces-management/guides/correlate-traces-and-logs/">
              Read Documentation
              <ArrowRight size={14} />
            </Button>
            <Image src="/img/distributed-tracing/see-related-logs-of-every-span.png" alt="See related logs of every span" width={10000} height={10000} className="-mt-8" />
          </div>
        </div>
        
        <div className="w-full h-full flex flex-col justify-between py-6">
          <h2 className="font-semibold text-signoz_vanilla-100 mb-6">Control traces volume</h2>
          <p className="text-signoz_vanilla-400 mb-6 leading-relaxed">
            Drop spans you don't need to optimize costs further. Define filter rules to exclude health checks, internal endpoints, or noisy traces. Remove sensitive attributes before storage, or drop entire spans based on service, operation name, or custom span attributes.
          </p>
          <div className="flex flex-col">
            <Button variant="secondary" rounded="full" className="flex items-center gap-2 w-fit" to="/docs/traces-management/guides/drop-spans/">
              Read Documentation
              <ArrowRight size={14} />
            </Button>
            <Image src="/img/distributed-tracing/control-traces-volume.png" alt="Control traces volume" width={10000} height={10000} />
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
      <section className="relative mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90 pointer-events-none" />
        
        <div className="relative">
          <div className="container pb-16">
            <div className="flex flex-col gap-6 py-32">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100 flex flex-col items-center gap-12">
                  <Image src="/img/case_study/logos/shaped-logo.svg" alt="Shaped" width={100} height={100} />
                  Every single time we have an issue, SigNoz is always the first place to check. It was super straightforward to migrate - just updating the exporter configuration, basically three lines of code.
                  <span className="text-signoz_vanilla-400 text-sm">
                    <span className="font-semibold">Karl Lyons</span> <br /> Senior SRE, Shaped
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials grid */}
      <SectionLayout variant="bordered" className="!mx-auto max-md:-mb-[3rem] p-0">
        <div className="container pb-16">
          <TestimonialCards />
          
          <div className="flex justify-center items-end -mt-[25rem] z-5 bg-gradient-to-t from-signoz_ink-500 to-transparent relative h-96 py-6 max-md:py-16">
            <Button 
              variant="secondary" 
              rounded="full"
              className="flex items-center gap-2"
              to="/case-study/"
            >
              Read customer stories
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </SectionLayout>
    </>
  )
}

// Main Component
const DistributedTracing: React.FC = () => {
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
          
          <SectionLayout variant="full-width" className="px-6 pt-6">
            <h2 className="text-signoz_vanilla-100 mb-6">
              Load traces with million spans without browser crashes
            </h2>
            <p className="text-signoz_vanilla-400 mb-2 leading-relaxed">
              Virtualized rendering and progressive loading handle traces with 1M+ spans without UI degradation. Synchronized flame graph and waterfall views update together as you navigate, with span events appearing as timeline indicators. Hierarchical flame graphs provide topology overview while detailed waterfall views show exact timing. Scroll and drill down with instant response times. 
            </p>
          </SectionLayout>
          
          <CarouselCards cards={CORRELATION_CAROUSEL_DATA} buttonLink="/opentelemetry/correlating-traces-logs-metrics-nodejs/" buttonText="Read Blog" />
          <VisualQueryBuilder />
          <StorageSection />
        </SectionLayout>
        
        <UsageBasedPricing show={["traces"]} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default DistributedTracing