'use client'

import React from 'react'
import Image from 'next/image'
import {
  ALERTS_HEADER_BUTTONS,
  ALERTS_MANAGEMENT_CARDS,
  ANALYZE_ALERT_PATTERNS_SHOWCASE,
  CREATE_ALERTS_SHOWCASE,
  FINE_TUNE_ALERT_BEHAVIOR_PANEL,
  MAINTENANCE_WINDOWS_PANEL,
  MANAGE_ALERTS_AS_CODE_IMAGE,
  MANAGE_ALERTS_AS_CODE_PANEL,
  ROUTE_ALERTS_DYNAMICALLY_SHOWCASE,
  SET_MULTIPLE_SEVERITY_THRESHOLDS_SHOWCASE,
  STOP_ALERT_FATIGUE_BUTTONS,
} from './AlertsPage.constants'
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
          Alerts with multiple thresholds and <br /> dynamic routing
        </>
      }
      description={
        <>
          Define warning and critical levels in a single rule. Automatically route to teams based on{' '}
          <br /> service, environment, or labels. Group notifications by deployment, customer, or
          any attribute.
        </>
      }
      buttons={ALERTS_HEADER_BUTTONS}
      heroImage="/img/platform/AlertsManagementMeta.webp"
      heroImageAlt="Alerts management hero"
    />
  )
}

const ManageAlertsAsCode: React.FC = () => {
  return (
    <SplitSection
      className="py-6"
      left={{
        ...MANAGE_ALERTS_AS_CODE_PANEL,
        className: 'justify-center',
      }}
      right={
        <div className="h-full w-full px-6">
          <Image
            src={MANAGE_ALERTS_AS_CODE_IMAGE.src}
            alt={MANAGE_ALERTS_AS_CODE_IMAGE.alt}
            width={10000}
            height={10000}
          />
        </div>
      }
    />
  )
}

const CreateAlertsAndDefineConditions: React.FC = () => {
  return (
    <FeatureShowcase {...CREATE_ALERTS_SHOWCASE} className="px-6 pb-0 pt-6" imageClassName="mb-0">
      <HeroCards
        cards={ALERTS_MANAGEMENT_CARDS}
        layoutVariant={'no-border'}
        variant="default"
        cols={2}
        className="!-ml-6 -mt-6"
      />
    </FeatureShowcase>
  )
}

const RouteAlertsDynamically: React.FC = () => {
  return <FeatureShowcase {...ROUTE_ALERTS_DYNAMICALLY_SHOWCASE} />
}

const AnalyzeAlertPatterns: React.FC = () => {
  return <FeatureShowcase {...ANALYZE_ALERT_PATTERNS_SHOWCASE} />
}

const SetMultipleSeverityThresholds: React.FC = () => {
  return <FeatureShowcase {...SET_MULTIPLE_SEVERITY_THRESHOLDS_SHOWCASE} />
}

const StopAlertFatigueBanner: React.FC = () => {
  return (
    <CTABanner
      title={
        <>
          Stop alert fatigue. <br /> Start catching real issues.
        </>
      }
      buttons={STOP_ALERT_FATIGUE_BUTTONS}
    />
  )
}

const FineTuneAndMaintainenceWindows: React.FC = () => {
  return (
    <SplitSection
      left={FINE_TUNE_ALERT_BEHAVIOR_PANEL}
      right={MAINTENANCE_WINDOWS_PANEL}
      withVerticalDivider
    />
  )
}

// Main Component
const AlertsManagement: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider />
        <CreateAlertsAndDefineConditions />
        <Divider />
        <SetMultipleSeverityThresholds />
        <Divider />
        <RouteAlertsDynamically />
        <Divider />
        <AnalyzeAlertPatterns />
        <Divider className="mt-12" />
        <FineTuneAndMaintainenceWindows />
        <Divider />
        <ManageAlertsAsCode />
        <Divider />
        <StopAlertFatigueBanner />
      </SectionLayout>

      <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection />
    </FeaturePageLayout>
  )
}

export default AlertsManagement
