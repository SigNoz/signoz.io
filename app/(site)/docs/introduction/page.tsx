import React from 'react'
import Hero from './Hero'
import DocsCtaSection from './DocsCtaSection'
import DocsIntroSection from '@/components/DocsIntroSection/DocsIntroSection'
import {
  SEND_DATA_CARDS,
  EXPLORE_SIGNOZ_CARDS,
  MIGRATE_CARDS,
  SECURITY_CARDS,
  TROUBLESHOOTING_CARDS,
  SELF_HOST_CARDS,
} from './constants'
import { Metadata } from 'next'
import { generateDocsBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'
import siteMetadata from '@/data/siteMetadata'

const description =
  'Start with managed SigNoz Cloud, or choose Self-Hosted SigNoz when your team needs to operate the observability platform and its infrastructure.'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description,
  openGraph: {
    title: siteMetadata.title,
    description,
    url: '/docs/introduction/',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: siteMetadata.title,
    description,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default async function DocsIntroductionPage() {
  const breadcrumbJsonLd = await generateDocsBreadcrumb('introduction', 'Introduction')

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <Hero />
      <DocsIntroSection clickLocation="Send Data Section" cards={SEND_DATA_CARDS} showTopBorder />
      <DocsIntroSection
        clickLocation="Explore SigNoz Section"
        title="Explore the rest of SigNoz"
        description="Once your data is flowing in — go deeper into what we offer."
        guidesCount={12}
        viewAllHref="/docs/querying/overview/"
        illustration="/img/docs-introduction/explore-illustration.webp"
        illustrationAlt="Explore SigNoz"
        cards={EXPLORE_SIGNOZ_CARDS}
      />
      <DocsIntroSection
        clickLocation="Migrate Section"
        title="Migrate to SigNoz Cloud"
        description="Move telemetry to the managed path. Adapt endpoint and authentication steps when you use Self-Hosted SigNoz."
        guidesCount={8}
        viewAllHref="/docs/migration/migrate-to-signoz/"
        cards={MIGRATE_CARDS}
      />
      <DocsIntroSection
        clickLocation="Security and Compliance Section"
        title="Security & Compliance"
        description="Secure your SigNoz deployment and ensure compliance."
        cards={SECURITY_CARDS}
      />
      <DocsIntroSection
        clickLocation="Troubleshooting and Community Section"
        title="Troubleshooting & Community"
        description="Get help and connect with the SigNoz community."
        illustration="/img/docs-introduction/explore-illustration.webp"
        illustrationAlt="Troubleshooting and community"
        cards={TROUBLESHOOTING_CARDS}
      />
      <DocsIntroSection
        clickLocation="Self-Host Installation Section"
        title="Self-Hosted SigNoz"
        description="Install and operate SigNoz in your environment, including storage, scaling, upgrades, security, and availability."
        cards={SELF_HOST_CARDS}
      />
      <DocsCtaSection />
    </>
  )
}
