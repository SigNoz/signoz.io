'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from "@signozhq/badge"
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
  STORAGE_DATA 
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


// Main Component Sections
const Header: React.FC = () => {
  const headerButtons = [
    {
      text: "Get Started - Free",
      href: "/teams/",
      variant: "default" as const,
      className: "flex-center"
    },
    {
      text: "Read Documentation", 
      href: "/docs/introduction/",
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
    <div className="flex flex-col gap-4 min-h-52">
      <div className="grid grid-cols-2 gap-4">
        <IconGrid
          icons={CLOUD_ICONS}
          title="CLOUD"
          className="border-r-1 border-signoz_slate-400 border-dashed pr-4"
        />
        <IconGrid
          icons={CONTAINER_ICONS}
          title="CONTAINERS"
        />
      </div>

      <div className="border-b-1 border-signoz_slate-400 border-dashed" />

      <IconGrid
        icons={POPULAR_TOOLS_ICONS}
        title="POPULAR TOOLS"
      />
      
      <Button 
        variant="ghost" 
        to="/docs/logs-management/send-logs-to-signoz/" 
        rounded="full" 
        size={null} 
        className="flex justify-center items-center gap-2 w-fit hover:bg-transparent text-xs"
      >
        VIEW ALL 50+ SOURCES
      </Button>
    </div>
  )

  const methodsTabContent = (
    <div className="flex flex-col gap-8 min-h-52">
      <div className="flex items-center md:flex-row flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xs font-medium uppercase text-signoz_vanilla-400 m-0">OPENTELEMETRY</h3>
            <Badge color="vanilla" className="text-xs">Recommended</Badge>
          </div>
          <div className="flex items-center gap-8">
            <Image src="/img/website/opentelemetry-icon-color.svg" alt="OpenTelemetry" className="h-8" width={32} height={32} />
          </div>
        </div>
        <IconGrid
          icons={EXISTING_AGENTS_ICONS}
          title="EXISTING AGENTS"
        />
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase text-signoz_vanilla-400">DIRECT INTEGRATIONS</h3>
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
        to="/docs/logs-management/send-logs-to-signoz/"
      >
        VIEW INTEGRATION GUIDES
      </Button>
    </div>
  )

  return (
    <div className="bg-signoz_ink-500 py-16 mt-12 border-y-1 border-signoz_slate-400 border-dashed">
      <GridLayout variant="split">
        {/* Left Column - Ingestion */}
        <div className="flex flex-col px-6">
          <div className="min-h-72 flex flex-col justify-between">
            <div>
              <h2 className="text-signoz_vanilla-100 mb-6">Ingest logs from anywhere</h2>
              <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
                OTel-native architecture supports extensive data source integration through multiple 
                collection patterns, eliminating vendor lock-in while providing superior correlation capabilities.
              </p>
            </div>
            <Button 
              variant="secondary" 
              rounded="full"
              className="flex items-center gap-2 w-fit mb-8"
              to="/docs/logs-management/send-logs-to-signoz/"
            >
              Read Documentation
              <ArrowRight size={14} />
            </Button>
          </div>
          
          <Card className="bg-signoz_ink-400 [&>div]:border-1 [&>*]:p-4">
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
        <div className="flex flex-col px-6 border-l-1 border-signoz_slate-400 border-dashed -my-16 pt-16">
          <div className="min-h-72 flex flex-col justify-between">
            <div>
              <h2 className="text-signoz_vanilla-100 mb-6">Parse and transform logs before storage</h2>
              <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
                Create processing pipelines through a visual UI to parse unstructured logs, extract attributes, 
                flatten nested JSON, and mask sensitive data. Apply processors like Grok patterns, regex, and 
                JSON parsers to transform logs before they're stored and indexed.
              </p>
            </div>
            <Button 
              variant="secondary" 
              rounded="full"
              className="flex items-center gap-2 w-fit mb-8"
              to="/docs/logs-pipelines/concepts/"
            >
              Read Documentation
              <ArrowRight size={14} />
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

const CorrelationCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % CORRELATION_CAROUSEL_DATA.length)
        setIsTransitioning(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleCardClick = (index: number) => {
    if (index !== activeIndex && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  return (
    <div className="bg-signoz_ink-500 pb-16 px-6">
      <GridLayout variant="split" className="gap-12 items-center">
        <div className="flex flex-col">
          <Button 
            variant="secondary" 
            rounded="full"
            className="flex items-center gap-2 w-fit mb-12"
            to="/opentelemetry/correlating-traces-logs-metrics-nodejs/"
          >
            Read Blog
            <ArrowRight size={14} />
          </Button>
          
          <div className="space-y-4">
            {CORRELATION_CAROUSEL_DATA.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(index)}
                className={`cursor-pointer transition-all duration-500 ease-in-out transform ${
                  activeIndex === index 
                    ? 'bg-signoz_robin-500/10 border-signoz_robin-500/10 shadow-lg' 
                    : 'bg-signoz_ink-400 border-signoz_slate-400 hover:bg-signoz_ink-300'
                } border rounded-lg p-4 relative overflow-hidden`}
              >
                <div className="flex gap-2 h-fit">
                  <div className="flex h-11 w-0.5 flex-shrink-0 items-center justify-center mr-2">
                    <div className={`h-full w-full rounded-full ${
                      activeIndex === index ? 'bg-signoz_robin-600/60' : 'bg-signoz_slate-200/80'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold mb-2 transition-colors duration-300 ${
                      activeIndex === index ? 'text-signoz_robin-600' : 'text-signoz_vanilla-100'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`m-0 text-xs transition-colors duration-300 ${
                      activeIndex === index ? 'text-signoz_robin-200' : 'text-signoz_vanilla-100'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="relative overflow-hidden rounded-lg h-96">
            <div 
              className="transition-all duration-500 ease-in-out flex flex-col"
              style={{
                transform: `translateY(-${activeIndex * (100 / CORRELATION_CAROUSEL_DATA.length)}%)`,
                height: `${CORRELATION_CAROUSEL_DATA.length * 100}%`
              }}
            >
              {CORRELATION_CAROUSEL_DATA.map((item) => (
                <div
                  key={item.id}
                  className="h-full flex-shrink-0 relative"
                  style={{ height: `${100 / CORRELATION_CAROUSEL_DATA.length}%` }}
                >
                  <div className="h-full flex items-center justify-center">
                    <Image src={item.image} alt={item.title} width={10000} height={10000} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GridLayout>
    </div>
  )
}

const VisualQueryBuilder: React.FC = () => {
  return (
    <div className="bg-signoz_ink-500 p-6 border-t-1 border-signoz_slate-400 border-dashed">
      <div className="max-w-4xl mb-8">
        <h2 className="text-signoz_vanilla-100 mb-6">
          Build ClickHouse queries visually with auto-complete for log attributes
        </h2>
        <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
          Run aggregations grouped by multiple dimensions, filter with regex and LIKE patterns, 
          query nested JSON with dot notation, and work directly with the generated SQL. Create 
          dashboards directly from query results or export to CSV for analysis.
        </p>
        <Button 
          to="/docs/userguide/query-builder-v5/"
          variant="secondary" 
          rounded="full"
          className="flex items-center gap-2 w-fit"
        >
          Read Documentation
          <ArrowRight size={14} />
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
    <div className="p-0 bg-transparent border-y-1 border-signoz_slate-400 border-dashed mb-12">
      <div className="flex flex-col md:flex-row gap-12 items-start h-full p-6">
        <div className="flex-1 h-full flex flex-col justify-between">
          <h2 className="font-semibold text-signoz_vanilla-100 mb-6">Configure hot and cold storage</h2>
          <p className="text-signoz_vanilla-400 mb-24 leading-relaxed">
            Set retention from 15-180 days in hot storage for fast queries. Older logs move to cold 
            storage where they remain queryable at 3x slower speeds for compliance needs.
          </p>
          <div className="flex gap-12">
            <div className="border-r border-signoz_slate-400/60 border-dashed pr-12">
              <h3 className="font-semibold text-signoz_vanilla-100 mb-4">50%</h3>
              <div className="text-signoz_vanilla-400">Storage Savings</div>
            </div>
            <div>
              <h3 className="font-semibold text-signoz_vanilla-100 mb-4">2 years</h3>
              <div className="text-signoz_vanilla-400">Configurable Retention</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-md:w-full">
          <div className="w-full max-md:overflow-x-auto max-md:flex max-md:justify-center">
            <table className="w-full border-collapse max-md:min-w-[80vw] max-md:mx-auto">
              <thead className="!border-1 !border-signoz_slate-400">
                <tr className="!border-signoz_slate-400 border-y-1">
                  <td className="!border-none px-2 py-4 bg-signoz_ink-400/60">
                    <div className="text-xs font-medium text-signoz_vanilla-400">
                      {STORAGE_DATA.headers.hot}
                    </div>
                  </td>
                  <td className="!border-none px-2 py-4 text-center bg-signoz_ink-400" colSpan={5}>
                    <div className="text-xs font-medium text-signoz_vanilla-400">
                      {STORAGE_DATA.headers.cold}
                    </div>
                  </td>
                </tr>
                <tr className="!border-signoz_slate-400 border-y-1">
                  <td className="!border-none p-2 bg-signoz_ink-400" />
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
                  <tr key={rowIndex} className="!border-signoz_slate-400 border-y-1 bg-signoz_ink-400/40">
                    <td className="!border-none p-2 bg-signoz_ink-400/60">
                      <div className="flex justify-between items-center text-signoz_robin-400 text-xs">
                        {row.period.value} {row.period.unit} 
                        <Badge color="vanilla">{STORAGE_DATA.subHeader}</Badge>
                      </div>
                    </td>
                    {row.prices.map((price, priceIndex) => (
                      <td key={priceIndex} className="!border-none p-2 text-center text-signoz_vanilla-100 text-xs">
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
          
          <div className="px-6 pt-6 !w-[80vw] !mx-auto">
            <h2 className="text-signoz_vanilla-100 mb-6">
              Automatic correlation between logs, metrics, and traces
            </h2>
            <p className="text-signoz_vanilla-400 mb-2 leading-relaxed">
              Use OpenTelemetry semantic conventions to automatically link logs with traces and metrics. 
              Jump from APM traces to their related logs, from infrastructure metrics to log context, 
              and from alerts to root cause with consistent trace ID correlation.
            </p>
          </div>
          
          <CorrelationCarousel />
          <VisualQueryBuilder />
          <StorageSection />
        </SectionLayout>
        
        <UsageBasedPricing show={["logs"]} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default LogsManagement