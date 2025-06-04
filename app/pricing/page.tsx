import React from 'react'
import Pricing from './Pricing'
import { Metadata } from 'next'
import { evaluateFeatureFlag } from '@/utils/growthbookServer'
import { EXPERIMENTS } from '@/constants/experiments'
import PricingV1 from './pricingv1/PricingV1'
import { ExperimentTracker } from '@/components/ExperimentTracker'
import Chatbase from '@/components/Chatbase'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Pricing',
  },
  openGraph: {
    title: 'SigNoz | Pricing',
    description:
      'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
  },
  description:
    'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
}

export default async function PricingPage() {
  // Check if the cloud-first experiment is enabled
  const isCloudFirstVariant = await evaluateFeatureFlag(
    EXPERIMENTS.CLOUD_FIRST_PRICING_PAGE?.flagName || 'cloud-first-pricing-page'
  )

  // Check if the chatbase bubble experiment is enabled
  const isChatbaseBubbleVariant = await evaluateFeatureFlag(
    EXPERIMENTS.CHATBASE_BUBBLE?.flagName || 'chatbase-bubble-experiment'
  )

  // Safety checks for experiment configurations
  const cloudFirstExperiment = EXPERIMENTS.CLOUD_FIRST_PRICING_PAGE
  const cloudFirstExperimentId = cloudFirstExperiment?.id || 'cloud-first-pricing-page'
  const cloudFirstVariantId = cloudFirstExperiment?.variants?.VARIANT || 'without-self-host-tab'
  const cloudFirstControlId = cloudFirstExperiment?.variants?.CONTROL || 'with-self-host-tab'

  const chatbaseExperiment = EXPERIMENTS.CHATBASE_BUBBLE
  const chatbaseExperimentId = chatbaseExperiment?.id || 'chatbase-bubble-experiment'
  const chatbaseVariantId = chatbaseExperiment?.variants?.VARIANT || 'with-chatbase-bubble'
  const chatbaseControlId = chatbaseExperiment?.variants?.CONTROL || 'no-chatbase-bubble'

  // Render PricingV1 for the test variant, otherwise render the current Pricing component
  return (
    <>
      {isCloudFirstVariant ? (
        <ExperimentTracker experimentId={cloudFirstExperimentId} variantId={cloudFirstVariantId}>
          <PricingV1 />
        </ExperimentTracker>
      ) : (
        <ExperimentTracker experimentId={cloudFirstExperimentId} variantId={cloudFirstControlId}>
          <Pricing />
        </ExperimentTracker>
      )}

      {isChatbaseBubbleVariant ? (
        <ExperimentTracker experimentId={chatbaseExperimentId} variantId={chatbaseVariantId}>
          <Chatbase />
        </ExperimentTracker>
      ) : (
        <ExperimentTracker experimentId={chatbaseExperimentId} variantId={chatbaseControlId}>
          <></>
        </ExperimentTracker>
      )}
    </>
  )
}
