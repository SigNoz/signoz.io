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
  APM_HEADER_BUTTONS,
  CARD_FASTER_ANALYTICS,
  CARD_CORRELATION,
  CARD_OUT_OF_BOX,
  CARD_EMPTY,
  FEATURE_LANGUAGES,
  FEATURE_MONITOR_SERVICES,
  FEATURE_APM_CHARTS,
  FEATURE_APDEX,
  FEATURE_DB_CALL_METRICS,
  FEATURE_TOP_ENDPOINTS,
  FEATURE_EXTERNAL_CALL_METRICS,
  FEATURE_METRICS_TO_TRACES,
  APM_USE_CASES,
  CTA_BUTTONS,
} from './apm.constants'

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
const Header: React.FC = () => {
  return (
    <FeaturePageHeader
      title={
        <>
          Application Performance Monitoring <br />
          Powered by OpenTelemetry
        </>
      }
      description={
        <>
          SigNoz APM comes with out-of-box charts for key application metrics powered by
          OpenTelemetry.
          <br className="hidden lg:inline" />
          Get latency, requests per second, error percentage, apdex & other key metrics
          <br className="hidden lg:inline" />
          to understand your application performance.
        </>
      }
      buttonGroup={
        <div className="flex flex-col gap-3 md:flex-row">
          <Button
            variant="default"
            rounded="full"
            to={APM_HEADER_BUTTONS[0].href}
            id={APM_HEADER_BUTTONS[0].id}
          >
            <span className={APM_HEADER_BUTTONS[0].className}>
              {APM_HEADER_BUTTONS[0].text}
              <ArrowRight size={14} />
            </span>
          </Button>
          <Button
            variant="secondary"
            rounded="full"
            to={APM_HEADER_BUTTONS[1].href}
            id={APM_HEADER_BUTTONS[1].id}
          >
            <span className={APM_HEADER_BUTTONS[1].className}>
              <BookOpen size={14} />
              {APM_HEADER_BUTTONS[1].text}
            </span>
          </Button>
        </div>
      }
      heroImage="/img/features/apm/apm-cover.webp"
      heroImageAlt="SigNoz APM service overview with latency, rate, and apdex charts"
    />
  )
}

const PlatformCard: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="rounded-md border border-signoz_slate-500 bg-signoz_ink-400 p-4">
      <h3 className="mb-2 text-base font-medium text-signoz_vanilla-100">{title}</h3>
      <p className="mb-0 text-sm font-normal text-signoz_vanilla-400">{description}</p>
    </div>
  )
}

const FeatureListContent: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4 px-10 py-10">
      {APM_USE_CASES.map((feature, index) => (
        <PlatformCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  )
}

const GetStartedCTA: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-signoz_ink-500 p-6 py-20">
      <h2 className="mb-6 text-center text-4xl font-bold text-signoz_vanilla-100">
        Get started with <br /> SigNoz Cloud today
      </h2>
      <div className="flex flex-col items-center justify-center gap-3 pt-4 md:flex-row">
        <Button to={CTA_BUTTONS[0].href} variant="default" rounded="full" id={CTA_BUTTONS[0].id}>
          <span className={CTA_BUTTONS[0].className}>
            {CTA_BUTTONS[0].text}
            <ArrowRight size={14} />
          </span>
        </Button>
        <Button to={CTA_BUTTONS[1].href} variant="secondary" rounded="full" id={CTA_BUTTONS[1].id}>
          <span className={CTA_BUTTONS[1].className}>
            <BookOpen size={14} />
            {CTA_BUTTONS[1].text}
          </span>
        </Button>
      </div>
      <div className="relative mt-16 flex items-center justify-center">
        <Image
          src="/img/landing/landing_thumbnail.webp"
          alt="SigNoz dashboard with application performance metrics - APM"
          width={1440}
          height={810}
          className="z-[0] w-3/5 rounded-lg"
        />
      </div>
    </div>
  )
}

function Apm() {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <Divider className="mt-12" />

        <FeatureShowcase
          title={
            <>
              Why use SigNoz for <br /> Application Performance Monitoring?
            </>
          }
          className="py-20"
        />

        <Divider />

        <SplitSection left={CARD_FASTER_ANALYTICS} right={CARD_CORRELATION} withVerticalDivider />

        <Divider />

        <SplitSection left={CARD_OUT_OF_BOX} right={CARD_EMPTY} withVerticalDivider />

        <Divider />

        <FeatureShowcase
          title={
            <>
              SigNoz Application Performance <br /> Monitoring Overview
            </>
          }
          className="py-20"
        />

        <Divider />

        <SplitSection
          left={FEATURE_LANGUAGES}
          right={FEATURE_MONITOR_SERVICES}
          withVerticalDivider
        />

        <Divider />

        <SplitSection left={FEATURE_APM_CHARTS} right={FEATURE_APDEX} withVerticalDivider />

        <Divider />

        <SplitSection
          left={FEATURE_DB_CALL_METRICS}
          right={FEATURE_TOP_ENDPOINTS}
          withVerticalDivider
        />

        <Divider />

        <SplitSection
          left={FEATURE_EXTERNAL_CALL_METRICS}
          right={FEATURE_METRICS_TO_TRACES}
          withVerticalDivider
        />

        <Divider />

        <SplitSection
          left={
            <div className="flex h-full w-full flex-col px-6">
              <p className="sticky top-[100px] pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl">
                Use SigNoz
                <br /> APM for...
              </p>
            </div>
          }
          right={<FeatureListContent />}
        />

        <Divider />

        <GetStartedCTA />
      </SectionLayout>

      <UsageBasedPricing show={['traces']} />
      <SigNozStats />
      <Divider />
      <CustomerStoriesSection />
    </FeaturePageLayout>
  )
}

export default Apm
