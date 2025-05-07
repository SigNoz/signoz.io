import React from 'react'
import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import { Zap, Server } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { evaluateFeatureFlag } from '@/utils/growthbookServer'
import { ExperimentTracker } from '@/components/ExperimentTracker'
import { EXPERIMENTS } from '@/constants/experiments'

// Single CTA variant - only shows the Quick Start button
function QuickStartOnlyVariant({
  experimentId,
  variantId,
  quickStartLinkExperimentId,
  quickStartLinkVariantId,
  quickStartLink,
}: {
  experimentId: string
  variantId: string
  quickStartLinkExperimentId: string
  quickStartLinkVariantId: string
  quickStartLink: string
}) {
  return (
    <div className="mx-auto mb-12 mt-12 flex w-full justify-center">
      <TrackingLink
        href={quickStartLink}
        className="relative flex w-full max-w-xl transform flex-col rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-7 ring-2 ring-signoz_robin-500 ring-offset-2 ring-offset-signoz_ink-400 transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
        clickType="Primary CTA"
        clickName="Quick Start Button"
        clickText="Get started with SigNoz Cloud"
        clickLocation="Page Header"
        experimentId={quickStartLinkExperimentId}
        variantId={quickStartLinkVariantId}
      >
        <div className="mb-3 flex items-center gap-3">
          <Zap size={24} className="text-signoz_robin-500" />
          <h2 className="mb-0 text-xl font-semibold text-signoz_vanilla-100">Quick Start</h2>
        </div>
        <p className="mb-0 text-left text-base text-signoz_vanilla-400">
          Setup Monitoring in Minutes with SigNoz Cloud
        </p>
      </TrackingLink>
    </div>
  )
}

// Dual CTA variant - shows both Quick Start and Install Locally buttons
function DualButtonVariant({
  experimentId,
  variantId,
}: {
  experimentId: string
  variantId: string
}) {
  return (
    <div className="mx-auto mb-12 mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2">
      <TrackingLink
        href="/teams/"
        className="relative flex flex-col rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-6 ring-2 ring-signoz_robin-500 ring-offset-2 ring-offset-signoz_ink-400 transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
        clickType="Primary CTA"
        clickName="Quick Start Button"
        clickText="Get started with SigNoz Cloud"
        clickLocation="Page Header"
        experimentId={experimentId}
        variantId={variantId}
      >
        <div className="mb-2 flex items-center gap-3">
          <Zap size={24} className="text-signoz_robin-500" />
          <h2 className="mb-0 text-xl font-semibold text-signoz_vanilla-100">Quick Start</h2>
        </div>
        <p className="mb-0 text-left text-signoz_vanilla-400">
          Setup Monitoring in Minutes with SigNoz Cloud
        </p>
      </TrackingLink>

      <TrackingLink
        href="/docs/install/self-host/"
        className="flex flex-col rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-6 transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
        clickType="Secondary CTA"
        clickName="Install Locally Button"
        clickText="Get started with self-hosted SigNoz"
        clickLocation="Page Header"
        experimentId={experimentId}
        variantId={variantId}
      >
        <div className="mb-2 flex items-center gap-3">
          <Server size={24} className="text-signoz_robin-500" />
          <h2 className="mb-0 text-xl font-semibold text-signoz_vanilla-100">Install Locally</h2>
        </div>
        <p className="mb-0 text-left text-signoz_vanilla-400">
          Get started with self-hosted SigNoz
        </p>
      </TrackingLink>
    </div>
  )
}

export default async function Header() {
  // Evaluate the feature flag to determine which variant to show
  const showOnlyQuickStart = await evaluateFeatureFlag(EXPERIMENTS.DOCS_HEADER.flagName)
  const experimentId = EXPERIMENTS.DOCS_HEADER.id
  const variantId = showOnlyQuickStart
    ? EXPERIMENTS.DOCS_HEADER.variants.QUICK_START_ONLY
    : EXPERIMENTS.DOCS_HEADER.variants.DUAL_BUTTONS

  // Evaluate the quick start link experiment (only applies to Quick Start Only variant)
  let quickStartLinkExperimentId = ''
  let quickStartLinkVariantId = ''
  let quickStartLink = '/teams/'

  if (showOnlyQuickStart) {
    const useQuickStartDocLink = await evaluateFeatureFlag(
      EXPERIMENTS.DOCS_QUICK_START_LINK.flagName
    )
    quickStartLinkExperimentId = EXPERIMENTS.DOCS_QUICK_START_LINK.id
    quickStartLinkVariantId = useQuickStartDocLink
      ? EXPERIMENTS.DOCS_QUICK_START_LINK.variants.QUICKSTART_DOC_LINK
      : EXPERIMENTS.DOCS_QUICK_START_LINK.variants.TEAMS_LINK

    quickStartLink = useQuickStartDocLink ? '/docs/cloud/quickstart/' : '/teams/'
  }

  return (
    <div className="mx-auto mb-12 w-full max-w-6xl">
      <div className="text-center">
        <Heading type={1} className="mb-4">
          SigNoz Docs
        </Heading>
        <SubHeading className="mx-auto max-w-3xl text-signoz_vanilla-400">
          Learn how to monitor and troubleshoot your applications with SigNoz using step-by-step
          guides, reference docs, and video tutorials.
        </SubHeading>
      </div>

      <ExperimentTracker experimentId={experimentId} variantId={variantId}>
        {showOnlyQuickStart ? (
          <QuickStartOnlyVariant
            experimentId={experimentId}
            variantId={variantId}
            quickStartLinkExperimentId={quickStartLinkExperimentId}
            quickStartLinkVariantId={quickStartLinkVariantId}
            quickStartLink={quickStartLink}
          />
        ) : (
          <DualButtonVariant experimentId={experimentId} variantId={variantId} />
        )}
      </ExperimentTracker>
    </div>
  )
}
