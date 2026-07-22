'use client'

import React from 'react'
import Image from 'next/image'
import {
  AZURE_MONITORING_HEADER_BUTTONS,
  INTEGRATE_AZURE_PANEL,
  RCA_NOZ_AI_PANEL,
  AKS_VISIBILITY_SHOWCASE,
  DISTRIBUTED_TRACING_PANEL,
  TROUBLESHOOT_PANEL,
  OTEL_NATIVE_PANEL,
  DASHBOARD_TEMPLATES_PANEL,
  TRANSPARENT_PRICING_PANEL,
  BOTTOM_CTA_BUTTONS,
} from './AzureMonitoringPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'

const Header: React.FC = () => {
  return (
    <FeaturePageHeader
      title={
        <>
          One-Click Integration for <br /> Azure Monitoring
        </>
      }
      description={
        <>
          Monitor every Azure service — VMs, AKS, App Service, Container Apps, Azure Functions,
          <br className="hidden md:block" /> SQL Database, Blob Storage, Cosmos DB — in a single
          OTel-native ClickHouse backend.
          <br className="hidden md:block" /> Metrics, logs, and traces correlated in one view. No
          per-metric charges. No proprietary agents.
        </>
      }
      buttons={AZURE_MONITORING_HEADER_BUTTONS}
      align="left"
      sectionLayoutClassName="!mt-0 !p-0 !border-0 !hidden"
    />
  )
}

const IntegrateAndRCA: React.FC = () => {
  return <SplitSection left={INTEGRATE_AZURE_PANEL} right={RCA_NOZ_AI_PANEL} withVerticalDivider />
}

const AKSVisibility: React.FC = () => {
  return <FeatureShowcase {...AKS_VISIBILITY_SHOWCASE} />
}

const DistributedTracing: React.FC = () => {
  return (
    <SplitSection
      className="py-10"
      left={DISTRIBUTED_TRACING_PANEL}
      right={
        <div className="flex h-full w-full items-center justify-center px-6">
          <Image
            src="/img/azure-monitoring/section-4.svg"
            alt="End-to-end distributed tracing for Azure"
            width={528}
            height={320}
          />
        </div>
      }
    />
  )
}

const TroubleshootAndOTel: React.FC = () => {
  return <SplitSection left={TROUBLESHOOT_PANEL} right={OTEL_NATIVE_PANEL} withVerticalDivider />
}

const DashboardsAndPricing: React.FC = () => {
  return (
    <SplitSection
      left={DASHBOARD_TEMPLATES_PANEL}
      right={TRANSPARENT_PRICING_PANEL}
      withVerticalDivider
    />
  )
}

const BottomCTASection: React.FC = () => {
  return (
    <CTABanner
      title={
        <>
          Get Started with One-Click Integration.
          <br />
          Transparent Price. AI-Powered. OTel-Native.
        </>
      }
      buttons={BOTTOM_CTA_BUTTONS}
    />
  )
}

const AzureMonitoringPage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false}>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider className="max-md:mt-12" />
        <IntegrateAndRCA />
        <Divider />
        <AKSVisibility />
        <Divider />
        <DistributedTracing />
        <Divider />
        <TroubleshootAndOTel />
        <Divider />
        <DashboardsAndPricing />
        <Divider />
        <BottomCTASection />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default AzureMonitoringPage
