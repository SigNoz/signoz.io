'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import {
  CARD_PANEL_1,
  CARD_PANEL_2,
  CARD_PANEL_3,
  CARD_PANEL_EMPTY,
  FEATURE_PANEL_1,
  FEATURE_PANEL_2,
  FEATURE_PANEL_3,
  FEATURE_PANEL_4,
} from './Exceptions.constants'

const Header: React.FC = () => {
  return (
    <FeaturePageHeader
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
      buttonGroup={
        <div className="flex flex-col gap-3 md:flex-row">
          <Button
            id="btn-get-started-homepage-hero"
            variant="default"
            rounded="full"
            className="flex !w-fit items-center gap-2"
            to="/teams/"
          >
            Get Started - Free
            <ArrowRight size={14} />
          </Button>
          <Button
            id="btn-read-documentation-homepage-hero"
            variant="secondary"
            rounded="full"
            className="flex !w-fit items-center gap-2"
            to="/docs/introduction/"
          >
            <BookOpen size={14} />
            Read Documentation
          </Button>
        </div>
      }
      heroImage="/img/features/exceptions/exceptions-overview.webp"
      heroImageAlt="SigNoz exception details view with a stack trace and related trace graph"
    />
  )
}

const ExceptionsInSigNoz: React.FC = () => {
  return (
    <>
      <FeatureShowcase
        title={
          <>
            Exceptions In <br /> SigNoz
          </>
        }
        className="py-20"
      />
      <Divider />
      <SplitSection left={CARD_PANEL_1} right={CARD_PANEL_2} withVerticalDivider />
      <Divider />
      <SplitSection left={CARD_PANEL_3} right={CARD_PANEL_EMPTY} withVerticalDivider />
    </>
  )
}

const ExceptionsMonitoringOverview: React.FC = () => {
  return (
    <>
      <FeatureShowcase
        title={
          <>
            Exceptions Monitoring <br /> Overview
          </>
        }
        className="py-20"
      />
      <Divider />
      <SplitSection left={FEATURE_PANEL_1} right={FEATURE_PANEL_2} withVerticalDivider />
      <Divider />
      <SplitSection left={FEATURE_PANEL_3} right={FEATURE_PANEL_4} withVerticalDivider />
    </>
  )
}

const GetStarted: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-signoz_ink-500 p-6 py-20">
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        Get started with <br /> SigNoz Cloud today
      </h2>
      <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
        <Button
          id="btn-get-started-Exceptions-bottom"
          variant="default"
          rounded="full"
          className="flex !w-fit items-center gap-2"
          to="/teams/"
        >
          Get Started - Free
          <ArrowRight size={14} />
        </Button>
        <Button
          id="btn-read-documentation-Exceptions-bottom"
          variant="secondary"
          rounded="full"
          className="flex !w-fit items-center gap-2"
          to="/docs/introduction/"
        >
          <BookOpen size={14} />
          Read Documentation
        </Button>
      </div>
      <div className="relative mt-16 flex items-center justify-center">
        <Image
          src="/img/landing/landing_thumbnail.webp"
          alt="SigNoz dashboard with application performance metrics - Exceptions"
          width={1440}
          height={810}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
        />
      </div>
    </div>
  )
}

function Exceptions() {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <ExceptionsInSigNoz />
        <Divider />
        <ExceptionsMonitoringOverview />
        <Divider className="pb-12" />
      </SectionLayout>

      <UsageBasedPricing show={['traces']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Exceptions Customer Stories Button',
          clickLocation: 'Exceptions Testimonials',
        }}
      />
      <GetStarted />
    </FeaturePageLayout>
  )
}

export default Exceptions
