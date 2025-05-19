import React from 'react'
import Pricing from './Pricing'
import { Metadata } from 'next'
import { evaluateFeatureFlag } from '@/utils/growthbookServer'
import { EXPERIMENTS } from '@/constants/experiments'
import PricingV1 from './pricingv1/PricingV1'
import { ExperimentTracker } from '@/components/ExperimentTracker'

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
    EXPERIMENTS.CLOUD_FIRST_PRICING_PAGE.flagName
  )

  // Render PricingV1 for the test variant, otherwise render the current Pricing component
  return isCloudFirstVariant ? (
    <ExperimentTracker
      experimentId={EXPERIMENTS.CLOUD_FIRST_PRICING_PAGE.id}
      variantId={EXPERIMENTS.CLOUD_FIRST_PRICING_PAGE.variants.VARIANT}
    >
      <PricingV1 />
    </ExperimentTracker>
  ) : (
    <ExperimentTracker
      experimentId={EXPERIMENTS.CLOUD_FIRST_PRICING_PAGE.id}
      variantId={EXPERIMENTS.CLOUD_FIRST_PRICING_PAGE.variants.CONTROL}
    >
      <Pricing />
    </ExperimentTracker>
  )
}
