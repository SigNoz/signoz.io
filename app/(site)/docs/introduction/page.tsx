import React from 'react'
import Hero from './Hero'
import DocsCtaSection from './DocsCtaSection'
import DocsIntroSection from '@/components/DocsIntroSection/DocsIntroSection'
import { INTRO_SECTIONS } from './constants'
import { Metadata } from 'next'
import { generateDocsBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'
import { INTRO_DESCRIPTION } from '@/utils/docs/agentDiscovery'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description: INTRO_DESCRIPTION,
}

export default async function DocsIntroductionPage() {
  const breadcrumbJsonLd = await generateDocsBreadcrumb('introduction', 'Introduction')

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <Hero />
      {INTRO_SECTIONS.map((section) => (
        <DocsIntroSection key={section.clickLocation} {...section} />
      ))}
      <DocsCtaSection />
    </>
  )
}
