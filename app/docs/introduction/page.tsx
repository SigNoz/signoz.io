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
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description:
    'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.',
}

export default async function DocsIntroductionPage() {
  // Check if the single CTA experiment is active
  const showOnlyQuickStart = await evaluateFeatureFlag('docs-header-with-only-quick-start')
  const experimentId = 'docs-header-with-only-quick-start'
  const variantId = showOnlyQuickStart ? 'only-quick-start' : 'quick-start-with-install-locally'

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
