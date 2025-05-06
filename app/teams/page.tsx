import React, { Suspense } from 'react'
import Teams from './Teams'
import { evaluateFeatureFlag } from '../../utils/growthbookServer'
import { EXPERIMENTS } from '../../constants/experiments'

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
  // Evaluate experiment on server side
  const experimentId = EXPERIMENTS.TEAMS_PAGE.id
  const isExperimentVariant = await evaluateFeatureFlag(EXPERIMENTS.TEAMS_PAGE.flagName)
  const variantId = isExperimentVariant
    ? EXPERIMENTS.TEAMS_PAGE.variants.VARIANT
    : EXPERIMENTS.TEAMS_PAGE.variants.CONTROL

  return (
    <Suspense>
      <Teams experimentId={experimentId} variantId={variantId} />
    </Suspense>
  )
}
