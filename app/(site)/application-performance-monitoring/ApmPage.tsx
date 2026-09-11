'use client'

import React from 'react'
import Image from 'next/image'
import {
  APM_HEADER_BUTTONS,
  APM_HERO_IMAGE,
  APM_OVERVIEW_PANELS,
  APM_PRICING_CARDS,
  APM_USE_CASES,
  CHECK_PRICING_BUTTON,
  GET_STARTED_BUTTONS,
  GET_STARTED_IMAGE,
  WHY_APM_CARDS,
} from './ApmPage.constants'
import { TrustedByTeams } from '@/components/trusted-by'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import SectionHeading from '@/shared/components/molecules/FeaturePages/SectionHeading'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import SplitSectionRows from '@/shared/components/molecules/FeaturePages/SplitSectionRows'
import InfoCardList from '@/shared/components/molecules/FeaturePages/InfoCardList'
import StickyTitleSection from '@/shared/components/molecules/FeaturePages/StickyTitleSection'
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'

// Main Component Sections
const Header: React.FC = () => {
  return (
    <FeaturePageHeader
      className="theme-invert-images"
      title={
        <>
          Application Performance Monitoring <br />
          Powered by OpenTelemetry
        </>
      }
      description={
        <>
          SigNoz Cloud APM comes with out-of-box charts for key application metrics powered by
          OpenTelemetry.
          <br className="hidden lg:inline" /> Get latency, requests per second, error percentage,
          apdex & other key metrics
          <br className="hidden lg:inline" /> to understand your application performance.
        </>
      }
      buttons={APM_HEADER_BUTTONS}
      heroImage={APM_HERO_IMAGE.src}
      heroImageAlt={APM_HERO_IMAGE.alt}
    />
  )
}

const ApmUseCasesSection: React.FC = () => {
  return (
    <StickyTitleSection
      title={
        <>
          Use SigNoz Cloud
          <br /> APM for...
        </>
      }
      className="!border-t-1"
    >
      <InfoCardList cards={APM_USE_CASES} />
    </StickyTitleSection>
  )
}

const ApmPricingSection: React.FC = () => {
  return (
    <StickyTitleSection
      title={
        <>
          Simple
          <br /> usage-based <br /> pricing
        </>
      }
      className="!border-b-1 !border-t-1"
    >
      <div className="text-2xl font-semibold text-[var(--l1-foreground)]">
        Pricing you can trust
      </div>
      <p className="text-base font-normal text-[var(--l2-foreground)]">
        Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?
        <br />
        We’re here for you.
      </p>
      <InfoCardList cards={APM_PRICING_CARDS} />
      <ButtonGroup buttons={[CHECK_PRICING_BUTTON]} className="mt-5 md:!justify-start" />
    </StickyTitleSection>
  )
}

const GetStartedBanner: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="!px-0">
      <CTABanner
        title={
          <>
            Get started with <br /> SigNoz Cloud today
          </>
        }
        buttons={GET_STARTED_BUTTONS}
      />
      <div className="flex items-center justify-center px-6 pb-16">
        <Image
          src={GET_STARTED_IMAGE.src}
          alt={GET_STARTED_IMAGE.alt}
          width={10000}
          height={10000}
          className="theme-invert w-full rounded-lg md:w-3/5"
        />
      </div>
    </SectionLayout>
  )
}

// Main Component
const ApmPage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <div className="mx-auto w-full">
        <Header />
        <TrustedByTeams page="apm" />

        <SectionLayout variant="bordered" className="!px-0">
          <SectionHeading>
            Why use SigNoz Cloud for <br /> Application Performance Monitoring?
          </SectionHeading>
          <Divider />
          <IconTitleDescriptionCardGrid cards={WHY_APM_CARDS} variant="xl" titleLevel="h3" />
          <Divider />
          <SectionHeading>
            SigNoz Cloud Application Performance <br /> Monitoring Overview
          </SectionHeading>
          <Divider />
          <SplitSectionRows panels={APM_OVERVIEW_PANELS} imageClassName="theme-invert" />
          <Divider />
        </SectionLayout>

        <ApmUseCasesSection />
        <ApmPricingSection />
        <SigNozStats />
        <Divider />
        <GetStartedBanner />
      </div>
    </FeaturePageLayout>
  )
}

export default ApmPage
