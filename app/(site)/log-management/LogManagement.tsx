'use client'

import React from 'react'
import Image from 'next/image'
import {
  CARDS,
  CORRELATION_CAROUSEL_DATA,
  INGEST_LOGS_PANEL,
  LOG_CORRELATION_SHOWCASE,
  LOG_MANAGEMENT_HEADER_BUTTONS,
  LOG_QUERY_BUILDER_IMAGE,
  LOG_QUERY_BUILDER_SHOWCASE,
  PROCESS_LOGS_PANEL,
  QUERY_BUILDER_CARDS,
} from './LogManagement.constants'
import SourcesTabsGrid from '@/shared/components/molecules/SourcesTabsGrid'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
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
          High-Performance Log Analytics <br /> Built on Columnar Database
        </>
      }
      description={
        <>
          Ingest logs from anywhere, quickly search and analyze with a powerful query <br />
          builder backed by ClickHouse, and correlate your logs with other signals.
        </>
      }
      buttons={LOG_MANAGEMENT_HEADER_BUTTONS}
      heroImage="/img/log-management/LogManagementHero.svg"
      heroImageAlt="Log management hero"
    />
  )
}

const LogProcessingSection: React.FC = () => {
  return (
    <SplitSection
      left={{
        ...INGEST_LOGS_PANEL,
        imageElement: <SourcesTabsGrid />,
      }}
      right={PROCESS_LOGS_PANEL}
      withVerticalDivider
    />
  )
}

const VisualQueryBuilder: React.FC = () => {
  return (
    <FeatureShowcase
      {...LOG_QUERY_BUILDER_SHOWCASE}
      imageElement={
        <>
          <Image
            src={LOG_QUERY_BUILDER_IMAGE.src}
            alt={LOG_QUERY_BUILDER_IMAGE.alt}
            width={10000}
            height={10000}
            className="mb-8"
          />
          <HeroCards cards={QUERY_BUILDER_CARDS} layoutVariant={'no-border'} variant="combined" />
        </>
      }
    />
  )
}

// Main Component
const LogsManagement: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <HeroCards cards={CARDS} layoutVariant="no-border" />
        <Divider />
        <Divider className="mt-12" />
        <LogProcessingSection />
        <Divider />

        <FeatureShowcase
          {...LOG_CORRELATION_SHOWCASE}
          className="!mx-auto w-full px-6 pb-0 pt-6"
          contentClassName="mb-0"
        />

        <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
        <Divider />
        <VisualQueryBuilder />
      </SectionLayout>

      <UsageBasedPricing show={['logs']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Log Management Customer Stories Button',
          clickLocation: 'Log Management Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default LogsManagement
