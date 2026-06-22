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
import ChatbaseClient from '@/components/Chatbase/ChatbaseClient'
import HoverableSidebar from '@/components/HoverableSidebar'
import { generateDocsBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'
import { getDocsSideNav } from '@/utils/docsSideNav'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description:
    'Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.',
}

export default async function DocsIntroductionPage() {
  const docsSideNavItems = await getDocsSideNav()
  const breadcrumbJsonLd = generateDocsBreadcrumb('introduction', 'Introduction', docsSideNavItems)

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <HoverableSidebar items={docsSideNavItems} />
      <Header showSearchBar />
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
      <ChatbaseClient disableFloatingMessages />
    </>
  )
}
