import React, { Suspense } from 'react'
import TeamsVariant from './TeamsVariant'
import { evaluateFeatureFlag } from '@/utils/growthbookServer'
import { EXPERIMENTS } from '@/constants/experiments'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Teams',
  },
  openGraph: {
    title: 'SigNoz | Teams',
    description:
      ' Sign up for SigNoz cloud and get 30 days of free trial with access to all features.',
  },
  description:
    'Sign up for SigNoz cloud and get 30 days of free trial with access to all features.',
}

export default async function TeamsPage() {
  const showVariant = await evaluateFeatureFlag(EXPERIMENTS.TEAMS_PAGE_VALUE_PROPS.flagName)
  const experimentId = EXPERIMENTS.TEAMS_PAGE_VALUE_PROPS.id
  const variantId = showVariant
    ? EXPERIMENTS.TEAMS_PAGE_VALUE_PROPS.variants.VARIANT
    : EXPERIMENTS.TEAMS_PAGE_VALUE_PROPS.variants.CONTROL

  return (
    <Suspense>
      <TeamsVariant showVariant={showVariant} experimentId={experimentId} variantId={variantId} />
    </Suspense>
  )
}
