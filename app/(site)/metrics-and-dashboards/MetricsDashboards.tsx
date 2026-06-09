'use client'

import React from 'react'
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
  WHY_SIGNOZ_PANEL_1,
  WHY_SIGNOZ_PANEL_2,
  WHY_SIGNOZ_PANEL_3,
  WHY_SIGNOZ_PANEL_EMPTY,
  FEATURE_PANEL_SEND_METRICS,
  FEATURE_PANEL_OTEL_SDK,
  FEATURE_PANEL_QUERY_BUILDER,
  FEATURE_PANEL_FUNCTIONS,
  FEATURE_PANEL_VISUALIZATIONS,
  FEATURE_PANEL_DASHBOARDS,
  FEATURE_PANEL_CLICKHOUSE,
  FEATURE_PANEL_PROMQL,
  FEATURE_PANEL_API,
  FEATURE_PANEL_NO_CUSTOM_PRICING,
} from './MetricsDashboards.constants'

const Header: React.FC = () => {
  return (
    <FeaturePageHeader
      title={
        <>
          Infrastructure monitoring, custom metrics & <br />
          dashboards to fit any use case
        </>
      }
      description={
        <>
          Monitor any metrics important to you. Ingest metrics from your infrastructure or
          applications
          <br className="hidden lg:inline" />
          and create customized dashboards to monitor them. Set alerts and get notified
          <br className="hidden lg:inline" />
          in your preferred notification channel.
        </>
      }
      buttonGroup={
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
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
      heroImage="/img/features/metrics/metrics-overview1.webp"
      heroImageAlt="SigNoz metrics dashboard showing CPU and memory usage charts by namespace and pod"
    />
  )
}

const WhySigNozSection: React.FC = () => {
  return (
    <>
      <FeatureShowcase
        title={
          <>
            Why use SigNoz for <br /> Metrics Monitoring?
          </>
        }
      />
      <Divider />
      <SplitSection left={WHY_SIGNOZ_PANEL_1} right={WHY_SIGNOZ_PANEL_2} withVerticalDivider />
      <Divider />
      <SplitSection left={WHY_SIGNOZ_PANEL_3} right={WHY_SIGNOZ_PANEL_EMPTY} withVerticalDivider />
    </>
  )
}

const MetricsOverviewSection: React.FC = () => {
  return (
    <>
      <FeatureShowcase
        title={
          <>
            SigNoz Metrics & <br /> Dashboards Overview
          </>
        }
      />
      <Divider />
      <SplitSection
        left={FEATURE_PANEL_SEND_METRICS}
        right={FEATURE_PANEL_OTEL_SDK}
        withVerticalDivider
      />
      <Divider />
      <SplitSection
        left={FEATURE_PANEL_QUERY_BUILDER}
        right={FEATURE_PANEL_FUNCTIONS}
        withVerticalDivider
      />
      <Divider />
      <SplitSection
        left={FEATURE_PANEL_VISUALIZATIONS}
        right={FEATURE_PANEL_DASHBOARDS}
        withVerticalDivider
      />
      <Divider />
      <SplitSection
        left={FEATURE_PANEL_CLICKHOUSE}
        right={FEATURE_PANEL_PROMQL}
        withVerticalDivider
      />
      <Divider />
      <SplitSection
        left={FEATURE_PANEL_API}
        right={FEATURE_PANEL_NO_CUSTOM_PRICING}
        withVerticalDivider
      />
    </>
  )
}

const GetStarted: React.FC = () => {
  return (
    <SectionLayout variant="bordered">
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
          Get started with <br /> SigNoz Cloud today
        </h2>
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <Button
            id="btn-get-started-MetricsDashboards-bottom"
            variant="default"
            rounded="full"
            className="flex !w-fit items-center gap-2"
            to="/teams/"
          >
            Get Started - Free
            <ArrowRight size={14} />
          </Button>
          <Button
            id="btn-read-documentation-MetricsDashboards-bottom"
            variant="secondary"
            rounded="full"
            className="flex !w-fit items-center gap-2"
            to="/docs/introduction/"
          >
            <BookOpen size={14} />
            Read Documentation
          </Button>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <img
          src="/img/landing/landing_thumbnail.webp"
          alt="SigNoz dashboard with application performance metrics - Metrics and Dashboards"
          className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
        />
      </div>
    </SectionLayout>
  )
}

const MetricsDashboards: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <CustomerStoriesSection
        tracking={{
          clickName: 'Metrics Dashboards Customer Stories Button',
          clickLocation: 'Metrics Dashboards Hero',
        }}
      />

      <SectionLayout variant="bordered" className="!px-0">
        <WhySigNozSection />
        <Divider />
        <MetricsOverviewSection />
      </SectionLayout>

      <UsageBasedPricing show={['metrics']} />
      <SectionLayout variant="bordered" className="flex items-center justify-center py-6">
        <Button
          variant="default"
          rounded="full"
          className="flex !w-fit items-center gap-2"
          to="/pricing/metrics-cost-estimation/"
        >
          Estimate Metrics Cost
          <ArrowRight size={14} />
        </Button>
      </SectionLayout>
      <SigNozStats />
      <Divider />
      <GetStarted />
    </FeaturePageLayout>
  )
}

export default MetricsDashboards
