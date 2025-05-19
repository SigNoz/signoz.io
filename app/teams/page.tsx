import React, { Suspense } from 'react'
import Teams from './Teams'
import TeamsVariant from './TeamsVariant'
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
  const isExperimentVariant = await evaluateFeatureFlag(EXPERIMENTS.TEAMS_PAGE.flagName)

  return <Suspense>{isExperimentVariant ? <TeamsVariant /> : <Teams />}</Suspense>
}
