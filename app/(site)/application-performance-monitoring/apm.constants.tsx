import React from 'react'
import Image from 'next/image'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import { SplitSectionPanel } from '@/shared/components/molecules/FeaturePages/SplitSection'

export const APM_HEADER_BUTTONS = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    id: 'btn-get-started-homepage-hero',
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    id: 'btn-read-documentation-homepage-hero',
  },
]

export const CARD_FASTER_ANALYTICS: SplitSectionPanel = {
  title: 'Faster Analytics powered by ClickHouse',
  description:
    'We use ClickHouse as our datastore. ClickHouse is a very fast and resource-efficient database for real-time analytics. Big companies like Uber and Cloudflare power their observability with ClickHouse as the database. It provides best-in-class ingestion rates and great compression ratios for efficient storage.',
  imageElement: (
    <Image src="/img/log-management/fast.svg" alt="" width={24} height={24} className="mb-4" />
  ),
  className: 'py-8',
}

export const CARD_CORRELATION: SplitSectionPanel = {
  title: 'Correlation with other signals',
  description:
    'We provide traces, metrics, and logs under a single pane of glass powered by OpenTelemetry SDKs. You can correlate your signals for a much richer context while debugging. Generate metrics from trace data, jump from traces to logs and vice-versa.',
  imageElement: (
    <Image src="/img/log-management/signals.svg" alt="" width={24} height={24} className="mb-4" />
  ),
  className: 'py-8',
}

export const CARD_OUT_OF_BOX: SplitSectionPanel = {
  title: 'Out-of-box charts for key application metrics',
  description:
    'Get key application metrics charts like p99, p90, p50 latency, request rate, error rates, Apdex and others with minimal code changes. Use auto-instrumentation libraries provided by OpenTelemetry to get started with observability quickly.',
  imageElement: (
    <Image
      src="/img/features/apm/chart-column-big.svg"
      alt=""
      width={24}
      height={24}
      className="mb-4"
    />
  ),
  button: {
    text: 'Instrument your application',
    href: 'https://signoz.io/docs/instrumentation/',
  },
  className: 'py-8',
}

export const CARD_EMPTY: SplitSectionPanel = {
  title: '',
  description: '',
  className: 'py-8',
}

export const FEATURE_LANGUAGES: SplitSectionPanel = {
  title: 'Support for all popular languages',
  description:
    'SigNoz supports a wide range of popular languages for application monitoring. Instrument your application code with OpenTelemetry, and start sending data to SigNoz.',
  image: '/img/features/apm/apm-language-supported.webp',
  imageAlt: 'Support for all popular languages',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/instrumentation/',
  },
  className: 'py-8',
}

export const FEATURE_MONITOR_SERVICES: SplitSectionPanel = {
  title: 'Monitor all your services',
  description:
    'Be on top of your application performance with out-of-box charts for latency, error rate, operations per second, and other critical metrics of all your services.',
  image: '/img/features/apm/apm-services.webp',
  imageAlt: 'Monitor all your services',
  className: 'py-8',
}

export const FEATURE_APM_CHARTS: SplitSectionPanel = {
  title: 'Out-of-box APM Charts',
  description:
    'For each of your services, monitor p99, p90, p50 latencies, rate (ops/s), and error rate with out-of-the-box application metrics charts.',
  image: '/img/features/apm/apm-charts.webp',
  imageAlt: 'Out-of-box APM Charts',
  className: 'py-8',
}

export const FEATURE_APDEX: SplitSectionPanel = {
  title: 'Apdex',
  description:
    "Apdex score indicates the end user's level of satisfaction from 0(least satisfied) to 1(most satisfied) with application performance. It helps developers gauge their application's performance from the user's perspective.",
  image: '/img/features/apm/apdex.webp',
  imageAlt: 'Apdex',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/userguide/metrics/#what-are-application-metrics',
  },
  className: 'py-8',
}

export const FEATURE_DB_CALL_METRICS: SplitSectionPanel = {
  title: 'Database Call Metrics',
  description:
    'If your application makes any database calls, you can monitor them under DB Call Metrics. Monitor the number of database calls per second and their average duration.',
  image: '/img/features/apm/database-call-metrics.webp',
  imageAlt: 'Database Call Metrics',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/userguide/metrics/#database-calls-in-signoz',
  },
  className: 'py-8',
}

export const FEATURE_TOP_ENDPOINTS: SplitSectionPanel = {
  title: 'Monitor the Top Endpoints of your service',
  description:
    'Get a list of key endpoints and important metrics about them. It helps you quickly identify slow endpoints of your application.',
  image: '/img/features/apm/top-endpoints.webp',
  imageAlt: 'Monitor the Top Endpoints of your service',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/application-monitoring/api-monitoring/#key-operations-section-in-service-page',
  },
  className: 'py-8',
}

export const FEATURE_EXTERNAL_CALL_METRICS: SplitSectionPanel = {
  title: 'External Call Metrics',
  description:
    'External call metrics allow you to track the external services on which your application depends. Monitor things like the percentage of external calls that resulted in errors.',
  image: '/img/features/apm/external-call-metrics.webp',
  imageAlt: 'External Call Metrics',
  button: {
    text: 'Learn More',
    href: 'https://signoz.io/docs/userguide/metrics/#external-calls-in-signoz',
  },
  className: 'py-8',
}

export const FEATURE_METRICS_TO_TRACES: SplitSectionPanel = {
  title: 'Application Metrics to Traces',
  description:
    "SigNoz APM allows you to view your application's traces from APM charts at any time stamp. You can click on data points with high latencies to view traces around those timestamps.",
  image: '/img/features/apm/apm-view-traces.webp',
  imageAlt: 'Application Metrics to Traces',
  className: 'py-8',
}

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

export const CTA_BUTTONS = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    id: 'btn-get-started-apm-bottom',
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    id: 'btn-read-documentation-apm-bottom',
  },
]
