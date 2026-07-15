import React from 'react'
import Hero from './Hero'
import SendDataSection from './SendDataSection'
import ExploreSigNoz from './ExploreSigNoz'
import MigrateSection from './MigrateSection'
import SecurityComplianceSection from './SecurityComplianceSection'
import TroubleshootingCommunitySection from './TroubleshootingCommunitySection'
import SelfHostSection from './SelfHostSection'
import DocsCtaSection from './DocsCtaSection'
import { Metadata } from 'next'
import { generateDocsBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description:
    'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.',
}

export default async function DocsIntroductionPage() {
  const breadcrumbJsonLd = await generateDocsBreadcrumb('introduction', 'Introduction')

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <Hero />
      <SendDataSection />
      <ExploreSigNoz />
      <MigrateSection />
      <SecurityComplianceSection />
      <TroubleshootingCommunitySection />
      <SelfHostSection />
      <DocsCtaSection />
    </>
  )
}
