import { Metadata } from 'next'
import DecimalClient from '@/components/Decimal/DecimalClient'

import siteMetadata from '@/data/siteMetadata'
import JsonLdScript from '@/components/JsonLdScript'
import { HomepageHeroRedesign } from '@/components/index-header'
import Faq from '@/components/index-faq/Faq'
import AgentNativeObservabilitySection from '@/components/index-agent-native-observability/AgentNativeObservability'
import FeatureBento from '@/components/index-feature-bento/FeatureBento'
import WhySignoz from '@/components/index-why-signoz/WhySignoz'
import NoiseToSignal from '@/components/index-noise-to-signal/NoiseToSignal'
import Pricing from '@/components/index-pricing/Pricing'
import HomepageGetStarted from '@/components/index-get-started/HomepageGetStarted'
import CustomersAndBlog from '@/components/index-customers-blog/CustomersAndBlog'
import { homepageFaqItems } from '@/components/index-faq/faqContent'
import { STRUCTURED_DATA_IDS } from '@/utils/structuredData'

const siteUrl = siteMetadata.siteUrl
const webpageId = `${siteUrl}/#webpage`
const homepageTitle = 'SigNoz | The Open Source Datadog Alternative'
const homepageDescription =
  'SigNoz Cloud is a one-stop observability tool built on top of OpenTelemetry. Get APM, logs, traces, metrics, exceptions, AI observability & alerts in a single tool.'

export const metadata: Metadata = {
  title: {
    absolute: homepageTitle,
  },
  description: homepageDescription,
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: './',
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        alt: 'SigNoz Cloud OpenTelemetry-native observability platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: homepageTitle,
    description: homepageDescription,
    card: 'summary_large_image',
    images: [
      {
        url: siteMetadata.socialBanner,
        alt: 'SigNoz Cloud OpenTelemetry-native observability platform',
      },
    ],
  },
}

const organizationSchema = {
  '@type': 'Organization',
  '@id': STRUCTURED_DATA_IDS.organization,
  name: 'SigNoz',
  url: `${siteUrl}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/svgs/icons/signoz.svg`,
    width: 512,
    height: 512,
  },
  image: `${siteUrl}/img/signoz-meta-image.webp`,
  description:
    'SigNoz builds OpenTelemetry-native observability products, including SigNoz Cloud and Self-Hosted SigNoz, for monitoring metrics, logs, and traces.',
  slogan: 'OpenTelemetry-Native Traces, Metrics, and Logs in a single pane of glass',
  email: siteMetadata.email,
  foundingDate: '2020',
  founder: [
    {
      '@type': 'Person',
      name: 'Pranay Prateek',
      jobTitle: 'CEO & Co-Founder',
    },
    {
      '@type': 'Person',
      name: 'Ankit Nayan',
      jobTitle: 'CTO & Co-Founder',
    },
  ],
  sameAs: [
    siteMetadata.linkedin,
    siteMetadata.x,
    siteMetadata.github,
    siteMetadata.youtube,
    siteMetadata.hackernews,
  ],
}

const websiteSchema = {
  '@type': 'WebSite',
  '@id': STRUCTURED_DATA_IDS.website,
  url: `${siteUrl}/`,
  name: 'SigNoz',
  description:
    'The official website for SigNoz Cloud, the managed observability platform, and Self-Hosted SigNoz, the open-source deployment.',
  publisher: {
    '@id': STRUCTURED_DATA_IDS.organization,
  },
}

const webpageSchema = {
  '@type': 'WebPage',
  '@id': webpageId,
  url: `${siteUrl}/`,
  name: homepageTitle,
  description: homepageDescription,
  isPartOf: {
    '@id': STRUCTURED_DATA_IDS.website,
  },
  about: {
    '@id': STRUCTURED_DATA_IDS.signozCloud,
  },
  mentions: {
    '@id': STRUCTURED_DATA_IDS.selfHostedSignoz,
  },
}

const signozCloudSchema = {
  '@type': 'SoftwareApplication',
  '@id': STRUCTURED_DATA_IDS.signozCloud,
  name: 'SigNoz Cloud',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Observability Platform',
  operatingSystem: 'Web',
  url: `${siteUrl}/`,
  description:
    'Managed, OpenTelemetry-native observability platform for application performance monitoring, distributed tracing, log management, metrics monitoring, exceptions tracking, alerts, and AI.',
  screenshot: `${siteUrl}/img/signoz-meta-image.webp`,
  featureList:
    'Application Performance Monitoring, Distributed Tracing, Log Management, Metrics & Dashboards, Exceptions Tracking, Alerts & Notifications, Service Maps, Flame Graphs, OpenTelemetry-Native',
  publisher: {
    '@id': STRUCTURED_DATA_IDS.organization,
  },
  offers: {
    '@type': 'Offer',
    name: 'SigNoz Cloud',
    description: 'Managed observability with usage-based pricing',
    url: `${siteUrl}/pricing/`,
  },
}

const selfHostedSignozSchema = {
  '@type': 'SoftwareApplication',
  '@id': STRUCTURED_DATA_IDS.selfHostedSignoz,
  name: 'Self-Hosted SigNoz',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Observability Platform',
  operatingSystem: 'Linux, macOS, Windows',
  url: `${siteUrl}/docs/install/`,
  description:
    'Open-source, OpenTelemetry-native observability software that you run and operate on your own infrastructure, including its storage, scaling, upgrades, and backups.',
  screenshot: `${siteUrl}/img/signoz-meta-image.webp`,
  featureList:
    'Application Performance Monitoring, Distributed Tracing, Log Management, Metrics & Dashboards, Exceptions Tracking, Alerts & Notifications, Service Maps, Flame Graphs, OpenTelemetry-Native',
  license: 'https://github.com/SigNoz/signoz/blob/develop/LICENSE',
  publisher: {
    '@id': STRUCTURED_DATA_IDS.organization,
  },
}

const faqPageSchema = {
  '@type': 'FAQPage',
  '@id': `${siteUrl}/#faq`,
  mainEntity: homepageFaqItems.map(({ answer, question }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
}

const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    webpageSchema,
    signozCloudSchema,
    selfHostedSignozSchema,
    faqPageSchema,
  ],
}

export default function Page() {
  return (
    <>
      <JsonLdScript data={homepageStructuredData} />
      <div className="relative mt-[-56px] bg-[var(--l1-background)]">
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
        <main className="relative z-[1] mx-auto max-w-8xl xl:max-[1728px]:max-w-[80dvw]">
          <HomepageHeroRedesign />
          <FeatureBento />
          <AgentNativeObservabilitySection />
          <WhySignoz />
          <HomepageGetStarted />
          <NoiseToSignal />
          <Pricing />
          <CustomersAndBlog />
          <Faq />
        </main>
        <DecimalClient />
      </div>
    </>
  )
}
