import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import fastIconUrl from '@/public/img/log-management/fast.svg?url'
import signalsIconUrl from '@/public/img/log-management/signals.svg?url'
import chartColumnBigIconUrl from '@/public/img/features/apm/chart-column-big.svg?url'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { SplitSectionPanel } from '@/shared/components/molecules/FeaturePages/SplitSection/SplitSection.types'
import { ButtonGroupButton } from '@/shared/components/molecules/FeaturePages/ButtonGroup/ButtonGroup.types'

export const APM_HEADER_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    icon: <ArrowRight size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Get Started Button',
      clickLocation: 'APM Hero',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    icon: <BookOpen size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'APM Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const APM_HERO_IMAGE = {
  src: '/img/features/apm/apm-cover.webp',
  alt: 'SigNoz Cloud APM service overview with latency, rate, and apdex charts',
}

const cardIcon = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={24} height={24} className="theme-invert h-5 w-5" />
)

export const WHY_APM_CARDS: IconTitleDescriptionCardData[] = [
  {
    icon: cardIcon(fastIconUrl, 'Faster Analytics powered by ClickHouse'),
    title: 'Faster Analytics powered by ClickHouse',
    description:
      'We use ClickHouse as our datastore. ClickHouse is a very fast and resource-efficient database for real-time analytics. Big companies like Uber and Cloudflare power their observability with ClickHouse as the database. It provides best-in-class ingestion rates and great compression ratios for efficient storage.',
  },
  {
    icon: cardIcon(signalsIconUrl, 'Correlation with other signals'),
    title: 'Correlation with other signals',
    description:
      'We provide traces, metrics, and logs under a single pane of glass powered by OpenTelemetry SDKs. You can correlate your signals for a much richer context while debugging. Generate metrics from trace data, jump from traces to logs and vice-versa.',
  },
  {
    icon: cardIcon(chartColumnBigIconUrl, 'Out-of-box charts for key application metrics'),
    title: 'Out-of-box charts for key application metrics',
    description:
      'Get key application metrics charts like p99, p90, p50 latency, request rate, error rates, Apdex and others with minimal code changes. Use auto-instrumentation libraries provided by OpenTelemetry to get started with observability quickly.',
    button: {
      text: 'Instrument your application',
      href: 'https://signoz.io/docs/instrumentation/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'APM Why SigNoz Section',
        clickText: 'Instrument your application',
      },
    },
  },
]

export const APM_OVERVIEW_PANELS: SplitSectionPanel[] = [
  {
    title: 'Support for all popular languages',
    description:
      'SigNoz supports a wide range of popular languages for application monitoring. Instrument your application code with OpenTelemetry, and start sending data to SigNoz.',
    image: '/img/features/apm/apm-language-supported.webp',
    imageAlt: 'Support for all popular languages',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/instrumentation/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'APM Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'Monitor all your services',
    description:
      'Be on top of your application performance with out-of-box charts for latency, error rate, operations per second, and other critical metrics of all your services.',
    image: '/img/features/apm/apm-services.webp',
    imageAlt: 'Monitor all your services',
  },
  {
    title: 'Out-of-box APM Charts',
    description:
      'For each of your services, monitor p99, p90, p50 latencies, rate (ops/s), and error rate with out-of-the-box application metrics charts.',
    image: '/img/features/apm/apm-charts.webp',
    imageAlt: 'Out-of-box APM Charts',
  },
  {
    title: 'Apdex',
    description:
      "Apdex score indicates the end user’s level of satisfaction from 0(least satisfied) to 1(most satisfied) with application performance. It helps developers gauge their application's performance from the user's perspective.",
    image: '/img/features/apm/apdex.webp',
    imageAlt: 'Apdex',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/userguide/metrics/#what-are-application-metrics',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'APM Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'Database Call Metrics',
    description:
      'If your application makes any database calls, you can monitor them under DB Call Metrics. Monitor the number of database calls per second and their average duration.',
    image: '/img/features/apm/database-call-metrics.webp',
    imageAlt: 'Database Call Metrics',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/userguide/metrics/#database-calls-in-signoz',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'APM Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'Monitor the Top Endpoints of your service',
    description:
      'Get a list of key endpoints and important metrics about them. It helps you quickly identify slow endpoints of your application.',
    image: '/img/features/apm/top-endpoints.webp',
    imageAlt: 'Monitor the Top Endpoints of your service',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/application-monitoring/api-monitoring/#key-operations-section-in-service-page',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'APM Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'External Call Metrics',
    description:
      'External call metrics allow you to track the external services on which your application depends. Monitor things like the percentage of external calls that resulted in errors.',
    image: '/img/features/apm/external-call-metrics.webp',
    imageAlt: 'External Call Metrics',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/userguide/metrics/#external-calls-in-signoz',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Docs Link',
        clickLocation: 'APM Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'Application Metrics to Traces',
    description:
      "SigNoz APM allows you to view your application's traces from APM charts at any time stamp. You can click on data points with high latencies to view traces around those timestamps.",
    image: '/img/features/apm/apm-view-traces.webp',
    imageAlt: 'Application Metrics to Traces',
  },
]

export const APM_USE_CASES = [
  {
    title: 'Real-Time Monitoring',
    description:
      ' Get real-time insights and alerts on application performance issues, enabling rapid response and resolution.',
  },
  {
    title: 'End-point monitoring/Transaction monitoring',
    description:
      'Monitor top API end-points of your services for latency, number of calls, and error rate.',
  },
  {
    title: 'Database Monitoring',
    description:
      'Monitor the performance of database queries and transactions made from your application.',
  },
  {
    title: 'External API monitoring',
    description:
      'Track the performance and reliability of third-party APIs. Monitor the latency, error rates, and response times of external API calls.',
  },
  {
    title: 'Root Cause Analysis',
    description:
      'Quickly identify and diagnose the root causes of performance issues and errors in applications with the ability to view traces around high latencies.',
  },
  {
    title: 'Service Dependency Mapping',
    description:
      'Visualize service dependencies and understand how different services interact within the application architecture.',
  },
]

export const APM_PRICING_CARDS = [
  {
    title: 'Pay only for data you send',
    description:
      "SigNoz Cloud doesn't have any SKU-based pricing. Get access to all features in the plan selected and only pay for the data you send. Pay only $0.3 per GB of ingested traces.",
  },
  {
    title: 'Add unlimited team members',
    description:
      "Observability should be available to every developer at your company. After all, anyone can need debugging. That's why SigNoz Cloud doesn't charge for user seats, and you can add as many team members as you want.",
  },
  {
    title: 'No Host (container or node) based pricing',
    description:
      'For modern cloud-based applications it doesn’t make sense to charge on the basis of number of hosts or containers. You don’t need to worry about auto-scaling during peak hours. Only pay for the amount of data sent no matter the number of hosts.',
  },
]

export const CHECK_PRICING_BUTTON: ButtonGroupButton = {
  text: 'Check Pricing',
  href: '/pricing/',
  variant: 'default' as const,
  icon: <ArrowRight size={14} />,
  tracking: {
    clickType: 'Primary CTA',
    clickName: 'Check Pricing Button',
    clickLocation: 'APM Pricing Section',
    clickText: 'Check Pricing',
  },
}

export const GET_STARTED_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    icon: <ArrowRight size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Get Started Button',
      clickLocation: 'APM Bottom Banner',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    icon: <BookOpen size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Docs Link',
      clickLocation: 'APM Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]

export const GET_STARTED_IMAGE = {
  src: '/img/landing/landing_thumbnail.webp',
  alt: 'SigNoz Cloud dashboard with application performance metrics - APM',
}
