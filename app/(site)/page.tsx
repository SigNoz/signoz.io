import { Metadata } from 'next'
import DecimalClient from '@/components/Decimal/DecimalClient'

import siteMetadata from '@/data/siteMetadata'
import JsonLdScript from '@/components/JsonLdScript'
import { ExperimentTracker } from '@/components/ExperimentTracker'
import { EXPERIMENTS } from '@/constants/experiments'
import { getFeatureValue } from '@/utils/growthbookServer'
import { homepageFaqItems } from '@/components/index-faq/faqContent'

const siteUrl = siteMetadata.siteUrl
const organizationId = `${siteUrl}/#organization`
const websiteId = `${siteUrl}/#website`
const signozCloudId = `${siteUrl}/#signoz-cloud`
const selfHostedSignozId = `${siteUrl}/#self-hosted-signoz`
const webpageId = `${siteUrl}/#webpage`
const homepageTitle = 'SigNoz | The Open Source Datadog Alternative'
const homepageDescription =
  'SigNoz Cloud is a managed, OpenTelemetry-native Datadog alternative for logs, metrics, traces, dashboards, alerts, and AI. Self-Hosted SigNoz is also available.'

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
  '@id': organizationId,
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
  '@id': websiteId,
  url: `${siteUrl}/`,
  name: 'SigNoz',
  description:
    'The official website for SigNoz Cloud, the managed observability platform, and Self-Hosted SigNoz, the open-source deployment.',
  publisher: {
    '@id': organizationId,
  },
}

const webpageSchema = {
  '@type': 'WebPage',
  '@id': webpageId,
  url: `${siteUrl}/`,
  name: homepageTitle,
  description: homepageDescription,
  isPartOf: {
    '@id': websiteId,
  },
  about: {
    '@id': signozCloudId,
  },
  mentions: {
    '@id': selfHostedSignozId,
  },
}

const signozCloudSchema = {
  '@type': 'SoftwareApplication',
  '@id': signozCloudId,
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
    '@id': organizationId,
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
  '@id': selfHostedSignozId,
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
    '@id': organizationId,
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

const videoSchema = {
  '@type': 'VideoObject',
  '@id': `${siteUrl}/#video`,
  name: 'SigNoz Overview - Open Source Observability Platform',
  description: 'Learn how SigNoz helps monitor metrics, logs, and traces in one platform.',
  thumbnailUrl: `${siteUrl}/img/landing/landing_thumbnail.webp`,
  uploadDate: '2024-05-09T00:00:00-07:00',
  duration: 'PT1M54S',
  contentUrl: 'https://vimeo.com/944340217',
  embedUrl: 'https://player.vimeo.com/video/944340217',
  publisher: {
    '@id': organizationId,
  },
}

function getHomepageStructuredData(includeFaq: boolean) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      webpageSchema,
      signozCloudSchema,
      selfHostedSignozSchema,
      ...(includeFaq ? [faqPageSchema] : []),
      videoSchema,
    ],
  }
}

type HomepageHeroVariant =
  (typeof EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants)[keyof typeof EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants]
type HomepageHeroFeatureValue = HomepageHeroVariant | boolean

async function getHomepageHeroVariant(): Promise<HomepageHeroVariant> {
  const defaultVariant: HomepageHeroVariant =
    process.env.NODE_ENV === 'development'
      ? EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT
      : EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.defaultVariant
  const featureValue = await getFeatureValue<HomepageHeroFeatureValue>(
    EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.flagName,
    defaultVariant
  )

  if (featureValue === true) return EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT
  if (featureValue === false) return EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.CONTROL

  if (
    featureValue === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT ||
    featureValue === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.CONTROL
  ) {
    return featureValue
  }

  return defaultVariant
}

export default async function Page() {
  const variant = await getHomepageHeroVariant()
  const { default: Homepage } =
    variant === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT
      ? await import('./HomepageRedesign')
      : await import('./HomepageControl')
  const isControlVariant = variant === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.CONTROL
  const homepageStructuredData = getHomepageStructuredData(!isControlVariant)

  return (
    <>
      <JsonLdScript data={homepageStructuredData} />
      <div className="relative mt-[-56px] bg-signoz_ink-500 ">
        {isControlVariant ? (
          <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        ) : null}
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
        <main className="relative z-[1] mx-auto max-w-8xl xl:max-[1728px]:max-w-[80dvw]">
          <ExperimentTracker
            experimentId={EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.id}
            variantId={variant}
          >
            <Homepage />
          </ExperimentTracker>
        </main>
        <DecimalClient />
      </div>
    </>
  )
}
