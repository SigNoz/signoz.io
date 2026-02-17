'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import { ALERTS_MANAGEMENT_CARDS } from './AlertsPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import TestimonialCards from '@/shared/components/molecules/FeaturePages/TestimonialCard'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'

// Main Component Sections
const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
    },
    {
      text: 'Read Documentation',
      href: '/docs/trace-funnels/overview/',
      variant: 'secondary' as const,
      className: 'flex-center',
    },
  ]

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
      buttons={headerButtons}
    >
      <div className="w-100 mx-[-28px]">
        <div className="product-explainer-video hero-figure rounded-xl px-3">
          <div className="embed-container">
            <div className="absolute w-full">
              <div className="p-0">
                <Image
                  src="/img/platform/AlertsManagementMeta.png"
                  alt="Alerts management hero"
                  className="w-full rounded-xl"
                  width={10000}
                  height={10000}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FeaturePageHeader>
  )
}

const ManageAlertsAsCode: React.FC = () => {
  return (
    <div className="bg-signoz_ink-500 py-6">
      <GridLayout variant="split">
        {/* Left Column */}
        <div className="flex h-full w-full flex-col justify-center px-6">
          <div className="flex flex-col justify-between">
            <h2 className="mb-6 text-signoz_vanilla-100">Manage alerts as code with Terraform</h2>
            <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
              Define alerts as Terraform resources with full version control. Import existing alerts
              from the UI into your codebase. Deploy consistent alert configurations across
              environments through standard Terraform workflows.
            </p>
          </div>

          <Button
            variant="secondary"
            rounded="full"
            className="flex w-fit items-center gap-2"
            to="/docs/alerts-management/terraform-provider-signoz/"
          >
            Read Documentation
            <ArrowRight size={14} />
          </Button>
        </div>

        {/* Right Column */}
        <div className="h-full w-full px-6">
          <Image
            src="/img/alerts-management/manage-alerts-as-code.png"
            alt="Manage alerts as code"
            width={10000}
            height={10000}
          />
        </div>
      </GridLayout>
    </div>
  )
}

const CreateAlertsAndDefineConditions: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 pt-6">
        <HeroCards
          cards={ALERTS_MANAGEMENT_CARDS}
          layoutVariant={'no-border'}
          variant="default"
          cols={2}
          className="!-ml-6 -mt-6"
        />

        <Image
          src="/img/alerts-management/create-alerts.png"
          alt="Create alerts"
          width={10000}
          height={10000}
        />
      </div>
    </>
  )
}

const RouteAlertsDynamically: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">
            Route alerts dynamically with label-based policies
          </h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            Define routing policies that match alerts based on service, environment, severity,
            Kubernetes labels, or custom attributes. Automatically send notifications to the right
            teams and channels based on alert context. One alert can match multiple policies and
            notify different channels.
          </p>
        </div>

        <Button
          variant="secondary"
          rounded="full"
          className="flex w-fit items-center gap-2"
          to="/docs/alerts-management/routing-policy/"
        >
          Read Documentation
          <ArrowRight size={14} />
        </Button>

        <Image
          src="/img/alerts-management/route-alerts-dynamically.png"
          alt="Route alerts dynamically with label-based policies"
          width={10000}
          height={10000}
          className="mb-8"
        />
      </div>
    </>
  )
}

const AnalyzeAlertPatterns: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">
            Analyze alert patterns with history and timelines
          </h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            Understand why alerts fire repeatedly, identify which services or pods are contributing
            most, and jump directly to related logs, traces, or metrics for faster root cause
            analysis.
          </p>
        </div>

        <Image
          src="/img/alerts-management/analyze-alert-patterns.png"
          alt="Analyze alert patterns"
          width={10000}
          height={10000}
          className="mb-8"
        />
      </div>
    </>
  )
}

const SetMultipleSeverityThresholds: React.FC = () => {
  return (
    <>
      <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
        <div className="mb-8 max-w-4xl">
          <h2 className="mb-6 text-signoz_vanilla-100">
            Set multiple severity thresholds in one alert rule
          </h2>
          <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
            Define warning, critical, and info thresholds in a single alert rule. Control how
            conditions are evaluated (trigger at least once, all the time, on average, or in total)
            and set evaluation windows to reduce false positives.
          </p>
        </div>

        <Image
          src="/img/alerts-management/set-multiple-severity-thresholds.png"
          alt="Set multiple severity thresholds in one alert rule"
          width={10000}
          height={10000}
          className="mb-8"
        />
      </div>
    </>
  )
}

const CustomerStories: React.FC = () => {
  return (
    <>
      {/* Featured testimonial */}
      <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />

        <div className="relative">
          <div className="container pb-16">
            <div className="flex flex-col gap-6 py-32">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
                  <Image
                    src="/img/case_study/logos/shaped-logo.svg"
                    alt="Shaped"
                    width={100}
                    height={100}
                  />
                  Every single time we have an issue, SigNoz is always the first place to check. It
                  was super straightforward to migrate - just updating the exporter configuration,
                  basically three lines of code.
                  <span className="text-sm text-signoz_vanilla-400">
                    <span className="font-semibold">Karl Lyons</span> <br /> Senior SRE, Shaped
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <SectionLayout variant="bordered" className="!mx-auto p-0 max-md:-mb-[3rem]">
        <div className="container pb-16">
          <TestimonialCards />

          <div className="z-5 relative -mt-[25rem] flex h-96 items-end justify-center bg-gradient-to-t from-signoz_ink-500 to-transparent py-6 max-md:py-16">
            <Button
              variant="secondary"
              rounded="full"
              className="flex items-center gap-2"
              to="/case-study/"
            >
              Read customer stories
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </SectionLayout>
    </>
  )
}

const StopAlertFatigueBanner: React.FC = () => {
  const stopAlertFatigueButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
    },
    {
      text: 'Read Documentation',
      href: '/docs/alerts/',
      variant: 'secondary' as const,
      className: 'flex-center',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6 py-20">
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        Stop alert fatigue. <br /> Start catching real issues.
      </h2>
      <ButtonGroup buttons={stopAlertFatigueButtons} />
    </div>
  )
}

const FineTuneAndMaintainenceWindows: React.FC = () => {
  return (
    <>
      <div className="mt-12 border-y-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-16">
        <GridLayout variant="split">
          {/* Left Column */}
          <div className="flex flex-col px-6">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="mb-6 text-signoz_vanilla-100">Fine-tune alert behavior</h2>
                <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                  Set evaluation frequency and minimum data point requirements. Set alert when data
                  stops flowing and test notifications before saving.
                </p>
              </div>
            </div>

            <Image
              src="/img/alerts-management/fine-tune-alert-behavior.png"
              alt="Fine-tune alert behavior"
              width={10000}
              height={10000}
              className="mb-8"
            />
          </div>

          {/* Right Column */}
          <div className="-my-16 flex flex-col border-l-1 border-dashed border-signoz_slate-400 px-6 pt-16">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="mb-6 text-signoz_vanilla-100">Schedule maintenance windows</h2>
                <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
                  Schedule one-time or recurring maintenance windows. Silence all alerts or select
                  specific ones during planned downtime.
                </p>
              </div>
            </div>

            <Image
              src="/img/alerts-management/schedule-maintenance-windows.png"
              alt="Schedule maintenance windows"
              width={10000}
              height={10000}
            />
          </div>
        </GridLayout>
      </div>
    </>
  )
}

// Main Component
const AlertsManagement: React.FC = () => {
  return (
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />

      <div className="relative bg-signoz_ink-500">
        {/* Background decorations */}
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        {/* Main sections */}
        <Header />

        <SectionLayout variant="bordered" className="!px-0">
          <CreateAlertsAndDefineConditions />
          <SetMultipleSeverityThresholds />
          <RouteAlertsDynamically />
          <AnalyzeAlertPatterns />
          <FineTuneAndMaintainenceWindows />
          <ManageAlertsAsCode />
          <StopAlertFatigueBanner />
        </SectionLayout>

        <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default AlertsManagement
