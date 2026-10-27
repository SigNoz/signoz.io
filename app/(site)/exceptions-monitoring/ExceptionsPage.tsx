'use client'

import React from 'react'
import Image from 'next/image'
import {
  CHECK_PRICING_BUTTON,
  EXCEPTIONS_HEADER_BUTTONS,
  EXCEPTIONS_HERO_IMAGE,
  EXCEPTIONS_OVERVIEW_PANELS,
  EXCEPTIONS_PRICING_CARDS,
  GET_STARTED_BUTTONS,
  GET_STARTED_IMAGE,
  WHY_EXCEPTIONS_CARDS,
} from './ExceptionsPage.constants'
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
          Record Exceptions Automatically and <br />
          See detailed Stack Traces
        </>
      }
      description={
        <>
          Monitor exceptions automatically in Python, Java, Ruby, and Javascript.
          <br className="hidden lg:inline" />
          For other languages, just drop in a few lines of code and start monitoring exceptions.
        </>
      }
      buttons={EXCEPTIONS_HEADER_BUTTONS}
      heroImage={EXCEPTIONS_HERO_IMAGE.src}
      heroImageAlt={EXCEPTIONS_HERO_IMAGE.alt}
    />
  )
}

const ExceptionsPricingSection: React.FC = () => {
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
        SigNoz Cloud pricing you can trust
      </div>
      <p className="text-base font-normal text-[var(--l2-foreground)]">
        Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?
        <br />
        We’re here for you.
      </p>
      <InfoCardList cards={EXCEPTIONS_PRICING_CARDS} />
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
const ExceptionsPage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <div className="mx-auto w-full">
        <Header />
        <TrustedByTeams page="Exceptions" />

        <SectionLayout variant="bordered" className="!px-0">
          <SectionHeading>
            Exceptions In <br /> SigNoz Cloud
          </SectionHeading>
          <Divider />
          <IconTitleDescriptionCardGrid cards={WHY_EXCEPTIONS_CARDS} variant="xl" titleLevel="h3" />
          <Divider />
          <SectionHeading>
            Exceptions Monitoring <br /> Overview
          </SectionHeading>
          <Divider />
          <SplitSectionRows panels={EXCEPTIONS_OVERVIEW_PANELS} imageClassName="theme-invert" />
          <Divider />
        </SectionLayout>

        <ExceptionsPricingSection />
        <SigNozStats />
        <Divider />
        <GetStartedBanner />
      </div>
    </FeaturePageLayout>
  )
}

export default ExceptionsPage
