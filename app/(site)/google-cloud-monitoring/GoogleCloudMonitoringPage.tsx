'use client'

import React from 'react'
import Image from 'next/image'
import {
  GCP_MONITORING_HEADER_BUTTONS,
  UNIFY_GCP_PANEL,
  SCRAPE_GCP_PANEL,
  NOZ_AI_PANEL,
  RESOLVE_PERFORMANCE_SHOWCASE,
  section3Url,
  GCP_ICON_GRID_CARDS,
  BOTTOM_CTA_BUTTONS,
} from './GoogleCloudMonitoringPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'

const Header: React.FC = () => {
  return (
    <FeaturePageHeader
      title={
        <>
          Google Cloud Monitoring. <br /> Zero switching between GCP Console and your observability
          stack.
        </>
      }
      description={
        <>
          Monitor every Google Cloud service - Cloud Run, GKE, Compute Engine, Cloud SQL, Pub/Sub,
          Cloud Storage, App Engine, Cloud Functions, and more - in a single OTel-native backend.
          <br className="hidden md:block" /> Correlated metrics, logs, and traces. No per-metric
          charges. No proprietary agents.
        </>
      }
      buttons={GCP_MONITORING_HEADER_BUTTONS}
      align="left"
      sectionLayoutClassName="!mt-0 !p-0 !border-0 !hidden"
    />
  )
}

const UnifyAndScrape: React.FC = () => {
  return <SplitSection left={UNIFY_GCP_PANEL} right={SCRAPE_GCP_PANEL} withVerticalDivider />
}

const NozAI: React.FC = () => {
  return (
    <SplitSection
      className="py-10"
      left={NOZ_AI_PANEL}
      right={
        <div className="flex h-full w-full items-center justify-center px-6">
          <Image
            src={section3Url}
            alt="Noz AI for GCP infrastructure debugging"
            width={528}
            height={320}
          />
        </div>
      }
    />
  )
}

const ResolvePerformance: React.FC = () => {
  return <FeatureShowcase {...RESOLVE_PERFORMANCE_SHOWCASE} />
}

const IconGrid: React.FC = () => {
  return <IconTitleDescriptionCardGrid cards={GCP_ICON_GRID_CARDS} />
}

const BottomCTASection: React.FC = () => {
  return (
    <CTABanner
      title={
        <>
          Comprehensive Google Cloud visibility. <br /> In hours, not days.
        </>
      }
      buttons={BOTTOM_CTA_BUTTONS}
    />
  )
}

const GoogleCloudMonitoringPage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false}>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider className="max-md:mt-12" />
        <UnifyAndScrape />
        <Divider />
        <NozAI />
        <Divider />
        <ResolvePerformance />
        <Divider />
        <IconGrid />
        <Divider />
        <BottomCTASection />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default GoogleCloudMonitoringPage
