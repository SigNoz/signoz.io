'use client'

import React from 'react'
import Image from 'next/image'
import {
  AUTOMATIC_DETECTION_IMAGE,
  AUTOMATIC_DETECTION_PANEL,
  CORRELATION_CAROUSEL_DATA,
  DRILL_INTO_DOMAINS_SHOWCASE,
  EXTERNAL_APIS_HEADER_BUTTONS,
  FILTER_BY_ENVIRONMENT_PANEL,
  READY_TO_MONITOR_EXTERNAL_APIS_BUTTONS,
  SEE_SERVICES_CALLING_APIS_SHOWCASE,
  VIEW_ALL_EXTERNAL_API_DOMAINS_SHOWCASE,
} from './ExternalApisPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'
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
          Monitor External APIs With Built-In <br /> Service Correlation
        </>
      }
      description={
        <>
          Automatically detect external API calls using OpenTelemetry semantic conventions. <br />{' '}
          Click any metric to view the service making the call or the underlying trace.
        </>
      }
      buttons={EXTERNAL_APIS_HEADER_BUTTONS}
      heroImageAlt="External APIs hero"
      heroImage="/img/platform/ExternalApisMeta.webp"
    />
  )
}

const ViewAllExternalApiDomains: React.FC = () => {
  return <FeatureShowcase {...VIEW_ALL_EXTERNAL_API_DOMAINS_SHOWCASE} />
}

const SeeServicesCallingApis: React.FC = () => {
  return <FeatureShowcase {...SEE_SERVICES_CALLING_APIS_SHOWCASE} />
}

const ReadyToMonitorYourExternalApisBanner: React.FC = () => {
  return (
    <CTABanner
      title={
        <>
          Ready to Monitor Your <br /> External APIs?
        </>
      }
      buttons={READY_TO_MONITOR_EXTERNAL_APIS_BUTTONS}
    />
  )
}

const FilterAndAutomaticDetectionSection: React.FC = () => {
  return (
    <SplitSection
      left={FILTER_BY_ENVIRONMENT_PANEL}
      right={{
        ...AUTOMATIC_DETECTION_PANEL,
        imageElement: (
          <div className="flex h-full flex-col items-center justify-center pb-16">
            <Image
              src={AUTOMATIC_DETECTION_IMAGE.src}
              alt={AUTOMATIC_DETECTION_IMAGE.alt}
              width={10000}
              height={10000}
            />
          </div>
        ),
      }}
      withVerticalDivider
    />
  )
}

// Main Component
const ExternalApis: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider className="max-md:mt-12" />
        <ViewAllExternalApiDomains />

        <FeatureShowcase
          {...DRILL_INTO_DOMAINS_SHOWCASE}
          className="!mx-auto !w-[80vw] px-6 pb-0 pt-6"
          contentClassName="mb-0"
        />

        <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
        <Divider className="mt-12" />
        <FilterAndAutomaticDetectionSection />
        <Divider />
        <SeeServicesCallingApis />
        <Divider />
        <ReadyToMonitorYourExternalApisBanner />
      </SectionLayout>

      <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection
        tracking={{
          clickName: 'External APIs Customer Stories Button',
          clickLocation: 'External APIs Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default ExternalApis
