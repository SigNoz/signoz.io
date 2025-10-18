'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import { ANALYZE_REQUEST_FLOW_CARDS } from './TraceFunnelsPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import TestimonialCards from '@/shared/components/molecules/FeaturePages/TestimonialCard'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'

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
      href: "/docs/trace-funnels/overview/",
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
          Create Visual Funnels from Traces <br /> to Track Step-by-Step Completion
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          The only distributed tracing tool that tracks multi-step request flows. See where <br /> traces succeed, where they fail, and where they drop off.
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
                    src="/img/platform/TraceFunnelsMeta.png"
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

const DefineMultiStepSequences: React.FC = () => {
  return (
    <div className="bg-signoz_ink-500 py-10 mt-12 border-y-1 border-signoz_slate-400 border-dashed">
      <GridLayout variant="split">
        {/* Left Column - Ingestion */}
        <div className="flex flex-col px-6 w-full h-full justify-center">
          <div className="flex flex-col justify-between">
            <h2 className="text-signoz_vanilla-100 mb-6">Define multi-step sequences</h2>
            <p className="text-signoz_vanilla-400 leading-relaxed">
              Build funnels with unlimited steps. Each step filters traces by service name, operation, HTTP status code, or any custom attribute from your instrumentation. Use operators like CONTAINS, REGEX, IN, or EXISTS.
            </p>
            <p className="text-signoz_vanilla-400 leading-relaxed">
              Save funnel definitions to reuse across different time ranges or share with your team.
            </p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="px-6 w-full h-full">
          <Image src="/img/trace-funnels/funnel_step_definition.png" alt="Defining funnel steps" width={10000} height={10000} />
        </div>
      </GridLayout>
    </div>
  )
}

const IdentifyProblemTraces: React.FC = () => {
  return (
    <div className="bg-signoz_ink-500 py-10 mt-12 border-y-1 border-signoz_slate-400 border-dashed">
      <GridLayout variant="split">
        {/* Left Column */}
        <div className="px-6 w-full h-full">
          <Image src="/img/trace-funnels/identify-problem-traces.png" alt="Identify problem traces" width={10000} height={10000} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col px-6 w-full">
          <div className="flex flex-col justify-between">
            <h2 className="text-signoz_vanilla-100 mb-6">Identify problem traces</h2>
            <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
              See the top 5 slowest traces for each step transition and view all traces with errors separately. Each trace shows its transition duration, making it easy to spot outliers. Click any trace ID to jump to the full trace visualization for detailed debugging.
            </p>
          </div>
        </div>
      </GridLayout>
    </div>
  )
}

const AnalyzeRequestFlowsAcrossMultipleTraceIds: React.FC = () => {
  return (
    <>
    <div className="bg-signoz_ink-500 p-6 border-t-1 border-signoz_slate-400 border-dashed">
      <div className="max-w-4xl mb-8">
        <h2 className="text-signoz_vanilla-100 mb-6">
          Analyze request flows across multiple trace ids
        </h2>
        <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
          A single trace shows one request. Trace funnels aggregate thousands of traces with the same request flow to reveal system-wide issues that individual trace inspection misses.
        </p>
        <Button 
          to="/docs/trace-funnels/overview/"
          variant="secondary" 
          rounded="full"
          className="flex items-center gap-2 w-fit"
        >
          Read Documentation
          <ArrowRight size={14} />
        </Button>
      </div>

      <div className="flex w-full gap-8 mb-8">
        <Image 
          src="/img/trace-funnels/analyze-request-flows-across-multiple-trace-ids-1.png" 
          alt="Analyze request flows across multiple trace ids" 
          width={10000} 
          height={10000} 
          className="w-1/2"
        />
        <Image 
          src="/img/trace-funnels/analyze-request-flows-across-multiple-trace-ids-2.png" 
          alt="Analyze request flows across multiple trace ids" 
          width={10000} 
          height={10000} 
          className="w-1/2"
        />
      </div>
    </div>
    <HeroCards cards={ANALYZE_REQUEST_FLOW_CARDS} layoutVariant={'no-border'} variant="combined" />
    </>
  )
}

const SeeDropOffsBetweenSteps: React.FC = () => {
  return (
    <>
    <div className="bg-signoz_ink-500 p-6 border-t-1 border-signoz_slate-400 border-dashed">
      <div className="max-w-4xl mb-8">
        <h2 className="text-signoz_vanilla-100 mb-6">
          See drop-offs between steps
        </h2>
        <p className="text-signoz_vanilla-400 mb-8 leading-relaxed">
          Each funnel step shows how many traces reached it and what percentage converted from the previous step. View aggregate metrics like average rate, average duration, error count and p99 latency for each transition. Visualize where traces drop off in your sequence and compare performance between different steps to identify bottlenecks.
        </p>
      </div>

      <Image 
        src="/img/trace-funnels/see-drop-offs-between-steps.png" 
        alt="See drop-offs between steps" 
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

const StopLosingUsersBanner: React.FC = () => {
  const stopLosingUsersButtons = [
    {
      text: "Start your free trial",
      href: "/teams/",
      variant: "default" as const,
      className: "flex-center"
    },
    {
      text: "Read Documentation",
      href: "/docs/trace-funnels/overview/",
      variant: "secondary" as const,
      className: "flex-center"
    }
  ]

  return (
    <div className="bg-signoz_ink-500 p-6 py-20 border-t-1 border-signoz_slate-400 border-dashed flex flex-col items-center justify-center">
      <h2 className="text-4xl text-signoz_vanilla-100 mb-6 text-center">Stop Losing Users in Multi- <br />Step Flows</h2>
      <ButtonGroup buttons={stopLosingUsersButtons} />
    </div>
  )
}

// Main Component
const TraceFunnels: React.FC = () => {
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
          <DefineMultiStepSequences />
          <SeeDropOffsBetweenSteps />
          <IdentifyProblemTraces />
          <AnalyzeRequestFlowsAcrossMultipleTraceIds />
          <StopLosingUsersBanner />
        </SectionLayout>
        
        <UsageBasedPricing show={["traces"]} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default TraceFunnels