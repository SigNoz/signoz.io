/* eslint-disable jsx-a11y/media-has-caption */
import { Header } from '@/components/index-header'
import BuildForDevelopers from '@/components/build-for-developers'
import { SigNozFeatures } from '@/components/index-features'
import SigNozStats from '@/components/signoz-stats'
import { Testimonials } from '@/components/testimonials'
import { TrustedByTeams } from '@/components/trusted-by'
import { WhyOpenTelemetry } from '@/components/why-opentelemetry'
import WhySelectSignoz from '@/components/why-select-signoz'
import { GetStarted } from '@/components/GetStarted'
import { Metadata } from 'next'
import Chatbase from '@/components/Chatbase'
import siteMetadata from '@/data/siteMetadata'
import { safeJsonLdStringify } from '@/utils/structuredData'

const siteUrl = siteMetadata.siteUrl
const organizationId = `${siteUrl}/#organization`
const websiteId = `${siteUrl}/#website`
const softwareAppId = `${siteUrl}/#software`
const webpageId = `${siteUrl}/#webpage`

export const metadata: Metadata = {
  title: 'SigNoz | The Open Source Datadog Alternative',
  openGraph: {
    title: 'SigNoz | The Open Source Datadog Alternative',
    description:
      'SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
  },
  description:
    'SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
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
    'SigNoz is an open-source, OpenTelemetry-native observability platform that provides unified monitoring for metrics, logs, and traces in a single pane of glass.',
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
  description: siteMetadata.description,
  publisher: {
    '@id': organizationId,
  },
}

const webpageSchema = {
  '@type': 'WebPage',
  '@id': webpageId,
  url: `${siteUrl}/`,
  name: 'SigNoz | The Open Source Datadog Alternative',
  description:
    'SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
  isPartOf: {
    '@id': websiteId,
  },
  about: {
    '@id': softwareAppId,
  },
}

const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  '@id': softwareAppId,
  name: 'SigNoz',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Observability Platform',
  operatingSystem: 'Linux, macOS, Windows',
  url: `${siteUrl}/`,
  description:
    'Open-source, OpenTelemetry-native observability platform for application performance monitoring (APM), distributed tracing, log management, metrics monitoring, exceptions tracking, and alerts.',
  screenshot: `${siteUrl}/img/signoz-meta-image.webp`,
  featureList:
    'Application Performance Monitoring, Distributed Tracing, Log Management, Metrics & Dashboards, Exceptions Tracking, Alerts & Notifications, Service Maps, Flame Graphs, OpenTelemetry-Native',
  isAccessibleForFree: true,
  license: 'https://github.com/SigNoz/signoz/blob/develop/LICENSE',
  publisher: {
    '@id': organizationId,
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Community Edition',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free, self-hosted open-source edition',
      url: `${siteUrl}/docs/install/`,
    },
    {
      '@type': 'Offer',
      name: 'Cloud',
      description: 'Fully managed SigNoz cloud with usage-based pricing',
      url: `${siteUrl}/pricing/`,
    },
  ],
}

const reviewSchemas = [
  {
    '@type': 'Review',
    reviewBody:
      'We optimized all our top endpoints and fine-tuned database calls to improve our backend API response times by 35% using SigNoz. Both our dev and QA teams use SigNoz actively in dev and production environments to optimize application performance.',
    author: {
      '@type': 'Person',
      name: 'Vijaya Perumal',
    },
    itemReviewed: {
      '@id': softwareAppId,
    },
  },
  {
    '@type': 'Review',
    reviewBody:
      "We use OTel with SigNoz to spot redundant database connect calls. For example, we found that our database driver wasn't using the connection pool even though the documentation claimed otherwise.",
    author: {
      '@type': 'Person',
      name: 'Subomi Oluwalana',
    },
    itemReviewed: {
      '@id': softwareAppId,
    },
  },
  {
    '@type': 'Review',
    reviewBody:
      "Monitoring done. Thanks to SigNoz, I don't have to deal with Grafana, Loki, Prometheus, and Jaeger separately.",
    author: {
      '@type': 'Person',
      name: 'Go Frendi Gunawan',
    },
    itemReviewed: {
      '@id': softwareAppId,
    },
  },
]

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

const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
    webpageSchema,
    softwareApplicationSchema,
    ...reviewSchemas,
    videoSchema,
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(homepageStructuredData) }}
      />
      <div className="relative mt-[-56px] bg-signoz_ink-500 ">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
        <main className="landing-section relative z-[1] mx-auto max-w-8xl">
          <Header />
          <TrustedByTeams page="homepage" className="max-w-8xl" />
          <SigNozFeatures className="max-w-8xl" />
          <BuildForDevelopers className="max-w-8xl" />
          <WhyOpenTelemetry className="max-w-8xl" />
          <WhySelectSignoz className="max-w-8xl" />
          <SigNozStats className="max-w-8xl" />
          <Testimonials page="homepage" className="max-w-8xl" />
          <GetStarted page="homepage" className="max-w-8xl" />
        </main>
        <Chatbase />
      </div>
    </>
  )
}
