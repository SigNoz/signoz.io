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
import { safeJsonLdStringify } from '@/utils/structuredData'

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
  '@id': 'https://signoz.io/#organization',
  name: 'SigNoz',
  url: 'https://signoz.io/',
  logo: 'https://signoz.io/img/logo.svg',
  sameAs: [
    'https://x.com/SigNozHQ',
    'https://www.linkedin.com/company/signozio',
    'https://github.com/SigNoz/signoz',
    'https://www.youtube.com/@signoz',
  ],
  description:
    'SigNoz is an open-source observability platform for monitoring metrics, logs, and traces.',
}

const websiteSchema = {
  '@type': 'WebSite',
  url: 'https://signoz.io/',
  name: 'SigNoz',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://signoz.io/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  name: 'SigNoz',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Linux, Kubernetes',
  url: 'https://signoz.io/',
  description:
    'Open-source observability platform for application performance monitoring, logs, and traces.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
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
      '@type': 'SoftwareApplication',
      name: 'SigNoz',
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
      '@type': 'SoftwareApplication',
      name: 'SigNoz',
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
      '@type': 'SoftwareApplication',
      name: 'SigNoz',
    },
  },
]

const videoSchema = {
  '@type': 'VideoObject',
  '@id': 'https://signoz.io/#video',
  name: 'SigNoz Overview - Open Source Observability Platform',
  description: 'Learn how SigNoz helps monitor metrics, logs, and traces in one platform.',
  thumbnailUrl: 'https://signoz.io/img/landing/landing_thumbnail.webp',
  uploadDate: '2024-01-01',
  contentUrl: 'https://vimeo.com/944340217',
  embedUrl: 'https://player.vimeo.com/video/944340217',
  publisher: {
    '@id': 'https://signoz.io/#organization',
  },
}

const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organizationSchema,
    websiteSchema,
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
