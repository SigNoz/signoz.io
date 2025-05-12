import React from 'react'
import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import { Zap, Server } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { getFeatureValue } from '@/utils/growthbookServer'
import { ExperimentTracker } from '@/components/ExperimentTracker'
import { EXPERIMENTS } from '@/constants/experiments'

// Quick Start button only variant
function QuickStartOnlyVariant({
  experimentId,
  variantId,
}: {
  experimentId: string
  variantId: string
}) {
  // Use the quickstart doc link for everyone
  const quickStartLink = '/docs/cloud/quickstart/'

  return (
    <div className="mx-auto mb-12 mt-12 flex w-full justify-center">
      <TrackingLink
        href={quickStartLink}
        className="relative flex w-full max-w-xl transform flex-col rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-7 ring-2 ring-signoz_robin-500 ring-offset-2 ring-offset-signoz_ink-400 transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
        clickType="Primary CTA"
        clickName="Quick Start Button"
        clickText="Get started with SigNoz Cloud"
        clickLocation="Page Header"
        experimentId={experimentId}
        variantId={variantId}
      >
        <div className="mb-3 flex items-center gap-3">
          <Zap size={24} className="text-signoz_robin-500" />
          <h2 className="mb-0 text-xl font-semibold text-signoz_vanilla-100">Quick Start</h2>
        </div>
        <p className="mb-0 text-left text-base text-signoz_vanilla-400">
          Send Demo App Data to SigNoz Cloud
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

// No Quick Start variant - no buttons in the header
function NoQuickStartVariant({
  experimentId,
  variantId,
}: {
  experimentId: string
  variantId: string
}) {
  // Don't show any buttons
  return null
}

export default async function Header() {
  // Get the feature variant using getFeatureValue with string type
  const headerVariant = await getFeatureValue<string>(
    EXPERIMENTS.DOCS_HEADER_PART_TWO.flagName,
    EXPERIMENTS.DOCS_HEADER_PART_TWO.variants.BOTH_BUTTONS
  )
  const experimentId = EXPERIMENTS.DOCS_HEADER_PART_TWO.id
  const variantId = headerVariant

  // Determine which variant to render
  let selectedVariant = 'BOTH_BUTTONS'

  // Compare using type-safe approach
  if (headerVariant === EXPERIMENTS.DOCS_HEADER_PART_TWO.variants.ONLY_QUICKSTART) {
    selectedVariant = 'ONLY_QUICKSTART'
  } else if (headerVariant === EXPERIMENTS.DOCS_HEADER_PART_TWO.variants.NO_QUICKSTART) {
    selectedVariant = 'NO_QUICKSTART'
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
        {selectedVariant === 'ONLY_QUICKSTART' ? (
          <QuickStartOnlyVariant experimentId={experimentId} variantId={variantId} />
        ) : selectedVariant === 'BOTH_BUTTONS' ? (
          <DualButtonVariant experimentId={experimentId} variantId={variantId} />
        ) : (
          <NoQuickStartVariant experimentId={experimentId} variantId={variantId} />
        )}
      </ExperimentTracker>
    </div>
  )
}
