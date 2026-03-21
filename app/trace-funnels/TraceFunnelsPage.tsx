'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import Image from 'next/image'
import { ANALYZE_REQUEST_FLOW_CARDS } from './TraceFunnelsPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
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
        clickName: 'Trace Funnels Hero Start Trial',
        clickLocation: 'Trace Funnels Hero',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/trace-funnels/overview/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Trace Funnels Hero Docs',
        clickLocation: 'Trace Funnels Hero',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <FeaturePageHeader
      title={
        <>
          Create Visual Funnels from Traces <br /> to Track Step-by-Step Completion
        </>
      }
      description={
        <>
          The only distributed tracing tool that tracks multi-step request flows. See where <br />{' '}
          traces succeed, where they fail, and where they drop off.
        </>
      }
      buttons={headerButtons}
      heroImageAlt="Trace funnels hero"
      heroImage="/img/platform/TraceFunnelsMeta.webp"
    />
  )
}

const DefineMultiStepSequences: React.FC = () => {
  return (
    <div className="mt-12 border-y-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-10">
      <GridLayout variant="split">
        {/* Left Column - Ingestion */}
        <div className="flex h-full w-full flex-col justify-center px-6">
          <div className="flex flex-col justify-between">
            <h2 className="mb-6 text-signoz_vanilla-100">Define multi-step sequences</h2>
            <p className="leading-relaxed text-signoz_vanilla-400">
              Build funnels with unlimited steps. Each step filters traces by service name,
              operation, HTTP status code, or any custom attribute from your instrumentation. Use
              operators like CONTAINS, REGEX, IN, or EXISTS.
            </p>
            <p className="leading-relaxed text-signoz_vanilla-400">
              Save funnel definitions to reuse across different time ranges or share with your team.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="h-full w-full px-6">
          <Image
            src="/img/trace-funnels/funnel_step_definition.png"
            alt="Defining funnel steps"
            width={10000}
            height={10000}
          />
        </div>
      </GridLayout>
    </div>
  )
}

const IdentifyProblemTraces: React.FC = () => {
  return (
    <div className="mt-12 border-y-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-10">
      <GridLayout variant="split">
        {/* Left Column */}
        <div className="h-full w-full px-6">
          <Image
            src="/img/trace-funnels/identify-problem-traces.png"
            alt="Identify problem traces"
            width={10000}
            height={10000}
          />
        </div>

        {/* Right Column */}
        <div className="flex w-full flex-col px-6">
          <div className="flex flex-col justify-between">
            <h2 className="mb-6 text-signoz_vanilla-100">Identify problem traces</h2>
            <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
              See the top 5 slowest traces for each step transition and view all traces with errors
              separately. Each trace shows its transition duration, making it easy to spot outliers.
              Click any trace ID to jump to the full trace visualization for detailed debugging.
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
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">
            Analyze request flows across multiple trace ids
          </h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            A single trace shows one request. Trace funnels aggregate thousands of traces with the
            same request flow to reveal system-wide issues that individual trace inspection misses.
          </p>
          <Button
            variant="secondary"
            rounded="full"
            className="flex w-fit items-center gap-2"
            asChild
          >
            <TrackingLink
              href="/docs/trace-funnels/overview/"
              clickType="Secondary CTA"
              clickName="Trace Funnels Analyze Request Docs Button"
              clickLocation="Trace Funnels Analyze Section"
              clickText="Read Documentation"
            >
              Read Documentation
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
        </div>

        <div className="mb-8 flex w-full gap-8">
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
      <HeroCards
        cards={ANALYZE_REQUEST_FLOW_CARDS}
        layoutVariant={'no-border'}
        variant="combined"
      />
    </>
  )
}

const SeeDropOffsBetweenSteps: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">See drop-offs between steps</h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            Each funnel step shows how many traces reached it and what percentage converted from the
            previous step. View aggregate metrics like average rate, average duration, error count
            and p99 latency for each transition. Visualize where traces drop off in your sequence
            and compare performance between different steps to identify bottlenecks.
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

const StopLosingUsersBanner: React.FC = () => {
  const stopLosingUsersButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Trace Funnels Banner Start Trial',
        clickLocation: 'Trace Funnels Bottom Banner',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/trace-funnels/overview/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Trace Funnels Banner Docs',
        clickLocation: 'Trace Funnels Bottom Banner',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6 py-20">
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        Stop Losing Users in Multi- <br />
        Step Flows
      </h2>
      <ButtonGroup buttons={stopLosingUsersButtons} />
    </div>
  )
}

// Main Component
const TraceFunnels: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <DefineMultiStepSequences />
        <SeeDropOffsBetweenSteps />
        <IdentifyProblemTraces />
        <AnalyzeRequestFlowsAcrossMultipleTraceIds />
        <StopLosingUsersBanner />
      </SectionLayout>

      <UsageBasedPricing show={['traces']} />
      <SigNozStats />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Trace Funnels Customer Stories Button',
          clickLocation: 'Trace Funnels Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default TraceFunnels
