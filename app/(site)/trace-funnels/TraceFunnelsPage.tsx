'use client'

import React from 'react'
import Image from 'next/image'
import {
  ANALYZE_REQUEST_FLOW_CARDS,
  ANALYZE_REQUEST_FLOWS_IMAGES,
  ANALYZE_REQUEST_FLOWS_SHOWCASE,
  DEFINE_MULTI_STEP_SEQUENCES_IMAGE,
  DEFINE_MULTI_STEP_SEQUENCES_PANEL,
  IDENTIFY_PROBLEM_TRACES_IMAGE,
  IDENTIFY_PROBLEM_TRACES_PANEL,
  SEE_DROP_OFFS_SHOWCASE,
  STOP_LOSING_USERS_BUTTONS,
  TRACE_FUNNELS_HEADER_BUTTONS,
} from './TraceFunnelsPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'

// Main Component Sections
const Header: React.FC = () => {
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
      buttons={TRACE_FUNNELS_HEADER_BUTTONS}
      heroImageAlt="Trace funnels hero"
      heroImage="/img/platform/TraceFunnelsMeta.webp"
    />
  )
}

const DefineMultiStepSequences: React.FC = () => {
  return (
    <SplitSection
      className="py-10"
      left={DEFINE_MULTI_STEP_SEQUENCES_PANEL}
      right={
        <div className="h-full w-full px-6">
          <Image
            src={DEFINE_MULTI_STEP_SEQUENCES_IMAGE.src}
            alt={DEFINE_MULTI_STEP_SEQUENCES_IMAGE.alt}
            width={10000}
            height={10000}
          />
        </div>
      }
    />
  )
}

const IdentifyProblemTraces: React.FC = () => {
  return (
    <SplitSection
      className="py-10"
      left={
        <div className="h-full w-full px-6">
          <Image
            src={IDENTIFY_PROBLEM_TRACES_IMAGE.src}
            alt={IDENTIFY_PROBLEM_TRACES_IMAGE.alt}
            width={10000}
            height={10000}
          />
        </div>
      }
      right={IDENTIFY_PROBLEM_TRACES_PANEL}
    />
  )
}

const AnalyzeRequestFlowsAcrossMultipleTraceIds: React.FC = () => {
  return (
    <>
      <FeatureShowcase {...ANALYZE_REQUEST_FLOWS_SHOWCASE} imageClassName="mb-0">
        <div className="mb-8 flex w-full gap-8">
          {ANALYZE_REQUEST_FLOWS_IMAGES.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={10000}
              height={10000}
              className="w-1/2"
            />
          ))}
        </div>
      </FeatureShowcase>
      <HeroCards
        cards={ANALYZE_REQUEST_FLOW_CARDS}
        layoutVariant={'no-border'}
        variant="combined"
      />
    </>
  )
}

const SeeDropOffsBetweenSteps: React.FC = () => {
  return <FeatureShowcase {...SEE_DROP_OFFS_SHOWCASE} />
}

const StopLosingUsersBanner: React.FC = () => {
  return (
    <CTABanner
      title={
        <>
          Stop Losing Users in Multi- <br />
          Step Flows
        </>
      }
      buttons={STOP_LOSING_USERS_BUTTONS}
    />
  )
}

// Main Component
const TraceFunnels: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider className="mt-12" />
        <DefineMultiStepSequences />
        <Divider />
        <SeeDropOffsBetweenSteps />
        <Divider className="mt-12" />
        <IdentifyProblemTraces />
        <Divider />
        <AnalyzeRequestFlowsAcrossMultipleTraceIds />
        <Divider />
        <StopLosingUsersBanner />
      </SectionLayout>

      <UsageBasedPricing show={['traces']} />
      <SigNozStats />
      <Divider />
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
