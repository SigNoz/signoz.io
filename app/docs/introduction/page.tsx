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
import { evaluateFeatureFlag } from '@/utils/growthbookServer'
import { EXPERIMENTS } from '@/constants/experiments'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description:
    'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.',
}

export default async function DocsIntroductionPage() {
  // Check if the single CTA experiment is active
  const showOnlyQuickStart = await evaluateFeatureFlag(EXPERIMENTS.DOCS_HEADER.flagName)
  const experimentId = EXPERIMENTS.DOCS_HEADER.id
  const variantId = showOnlyQuickStart
    ? EXPERIMENTS.DOCS_HEADER.variants.QUICK_START_ONLY
    : EXPERIMENTS.DOCS_HEADER.variants.DUAL_BUTTONS

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

      {/* Only show the Install Locally section at the end if single CTA experiment is active */}
      {showOnlyQuickStart && (
        <InstallLocallySection experimentId={experimentId} variantId={variantId} />
      )}

      <QuickStartCloud />
    </>
  )
}
