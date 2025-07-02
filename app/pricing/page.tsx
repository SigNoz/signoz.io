import React from 'react'
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
  // Check if the chatbase bubble experiment is enabled
  const isChatbaseBubbleVariant = await evaluateFeatureFlag(
    EXPERIMENTS.CHATBASE_BUBBLE?.flagName || 'chatbase-bubble-experiment'
  )

  // Safety checks for experiment configurations
  const chatbaseExperiment = EXPERIMENTS.CHATBASE_BUBBLE
  const chatbaseExperimentId = chatbaseExperiment?.id || 'chatbase-bubble-experiment'
  const chatbaseVariantId = chatbaseExperiment?.variants?.VARIANT || 'with-chatbase-bubble'
  const chatbaseControlId = chatbaseExperiment?.variants?.CONTROL || 'no-chatbase-bubble'

  return (
    <>
      <PricingV1 />

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
