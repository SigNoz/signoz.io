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
import { getFeatureValue } from '@/utils/growthbookServer'
import { EXPERIMENTS } from '@/constants/experiments'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description:
    'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.',
}

export default async function DocsIntroductionPage() {
  // Get the variant for the DOCS_HEADER_PART_TWO experiment
  const headerVariant = await getFeatureValue<string>(
    EXPERIMENTS.DOCS_HEADER_PART_TWO.flagName,
    EXPERIMENTS.DOCS_HEADER_PART_TWO.variants.BOTH_BUTTONS
  )
  const experimentId = EXPERIMENTS.DOCS_HEADER_PART_TWO.id

  // Determine if we should show the Install Locally section based on the variant
  const shouldShowInstallLocally =
    headerVariant === EXPERIMENTS.DOCS_HEADER_PART_TWO.variants.ONLY_QUICKSTART ||
    headerVariant === EXPERIMENTS.DOCS_HEADER_PART_TWO.variants.NO_QUICKSTART

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

      {/* Show the Install Locally section for specific variants */}
      {shouldShowInstallLocally && (
        <InstallLocallySection experimentId={experimentId} variantId={headerVariant} />
      )}

      <QuickStartCloud />
    </>
  )
}
