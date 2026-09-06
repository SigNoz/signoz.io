'use client'

import React from 'react'
import Image from 'next/image'
import {
  CORRELATE_LOGS_IMAGE,
  CORRELATE_LOGS_PANEL,
  LIVE_LOGS_IMAGE,
  LIVE_LOGS_PANEL,
  LOG_ANALYSIS_CARDS,
  LOG_ANALYZER_CTA_BUTTONS,
  LOG_SOURCE_CARDS,
  LOG_SOURCE_SHOWCASE,
  SEARCH_AND_FILTER_SHOWCASE,
} from './LogAnalyzerPage.constants'
import LogAnalyzerTool from './LogAnalyzerTool'
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'

const SeoIntroduction: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="px-6 py-20 text-center">
      <h1 className="text-gradient m-0 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[44px]">
        Free Online Log Analyzer
      </h1>
      <p className="mx-auto mb-0 mt-6 max-w-4xl text-base font-normal leading-relaxed text-signoz_vanilla-400 sm:text-lg">
        Paste or upload logs. Search, filter, visualize, and inspect every record in your browser.
        No signup is required, and your log contents stay on your device.
      </p>
    </SectionLayout>
  )
}

const SearchAndFilterLogs: React.FC = () => {
  return <FeatureShowcase {...SEARCH_AND_FILTER_SHOWCASE} />
}

const AnalyzeLiveLogs: React.FC = () => {
  return (
    <SplitSection
      className="py-10"
      left={LIVE_LOGS_PANEL}
      right={
        <div className="flex h-full w-full items-center px-6">
          <Image src={LIVE_LOGS_IMAGE.src} alt={LIVE_LOGS_IMAGE.alt} width={10000} height={10000} />
        </div>
      }
    />
  )
}

const CorrelateLogsWithTraces: React.FC = () => {
  return (
    <SplitSection
      className="py-10"
      left={
        <div className="flex h-full w-full items-center px-6">
          <Image
            src={CORRELATE_LOGS_IMAGE.src}
            alt={CORRELATE_LOGS_IMAGE.alt}
            width={10000}
            height={10000}
          />
        </div>
      }
      right={CORRELATE_LOGS_PANEL}
    />
  )
}

const AnalyzeEveryLogSource: React.FC = () => {
  return (
    <FeatureShowcase {...LOG_SOURCE_SHOWCASE} className="px-6 pb-0 pt-6">
      <HeroCards cards={LOG_SOURCE_CARDS} layoutVariant="no-border" variant="combined" cols={2} />
    </FeatureShowcase>
  )
}

const StartAnalyzingLogsBanner: React.FC = () => {
  return (
    <CTABanner
      title={
        <>
          Stop searching one server at a time. <br /> Analyze all your logs in SigNoz.
        </>
      }
      buttons={LOG_ANALYZER_CTA_BUTTONS}
    />
  )
}

const LogAnalyzerPage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false}>
      <div className="px-4 pt-[10px]">
        <div className="mx-auto w-full max-w-8xl">
          <LogAnalyzerTool />
        </div>
      </div>

      <SeoIntroduction />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider />
        <HeroCards cards={LOG_ANALYSIS_CARDS} layoutVariant="no-border" />
        <Divider />
        <SearchAndFilterLogs />
        <Divider />
        <AnalyzeLiveLogs />
        <Divider />
        <CorrelateLogsWithTraces />
        <Divider />
        <AnalyzeEveryLogSource />
        <Divider />
        <StartAnalyzingLogsBanner />
      </SectionLayout>

      <UsageBasedPricing show={['logs']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Log Analyzer Customer Stories Button',
          clickLocation: 'Log Analyzer Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default LogAnalyzerPage
