import React from 'react'
import Header from './Header'
import SendData from './SendData'
import Monitor from './Monitor'
import Integrations from './Integrations'
import MigrateFromDatadog from './MigrateFromDatadog'
import SecurityCompliance from './SecurityCompliance'
import SigNozFeatures from './SigNozFeatures'
import TroubleshootingCommunity from './TroubleshootingCommunity'
import AdditionalResources from './AdditionalResources'
import QuickStartCloud from '@/components/QuickStartCloud'
import InstallLocallySection from './InstallLocallySection'
import { Metadata } from 'next'
import Chatbase from '@/components/Chatbase'
import { evaluateFeatureFlag } from '@/utils/growthbookServer'
import { EXPERIMENTS } from '@/constants/experiments'
import { ExperimentTracker } from '@/components/ExperimentTracker'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description:
    'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.',
}

export default async function DocsIntroductionPage() {
  // Check if the chatbase bubble experiment is enabled
  const isChatbaseBubbleVariant = await evaluateFeatureFlag(EXPERIMENTS.CHATBASE_BUBBLE.flagName)

  return (
    <>
      <Header />
      <SendData />
      <Monitor />
      <Integrations />
      <MigrateFromDatadog />
      <SigNozFeatures />
      <SecurityCompliance />
      <TroubleshootingCommunity />
      <AdditionalResources />
      <InstallLocallySection />
      <QuickStartCloud />

      {isChatbaseBubbleVariant ? (
        <ExperimentTracker
          experimentId={EXPERIMENTS.CHATBASE_BUBBLE.id}
          variantId={EXPERIMENTS.CHATBASE_BUBBLE.variants.VARIANT}
        >
          <Chatbase />
        </ExperimentTracker>
      ) : (
        <ExperimentTracker
          experimentId={EXPERIMENTS.CHATBASE_BUBBLE.id}
          variantId={EXPERIMENTS.CHATBASE_BUBBLE.variants.CONTROL}
        >
          <></>
        </ExperimentTracker>
      )}
    </>
  )
}
