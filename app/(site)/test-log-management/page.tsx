import React from 'react'
import TestLogManagement from './TestLogManagement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Log Management Software for High-Performance Log Analytics | SigNoz',
  },
  openGraph: {
    title: 'Log Management Software for High-Performance Log Analytics | SigNoz',
    description:
      'Collect logs from any source, search billions of lines in seconds with a ClickHouse-backed query builder, and correlate logs with metrics and traces. OpenTelemetry-native, open source, cloud or self-hosted.',
    images: '/img/platform/LogsManagementHero.webp',
  },
  description:
    'Collect logs from any source, search billions of lines in seconds with a ClickHouse-backed query builder, and correlate logs with metrics and traces. OpenTelemetry-native, open source, cloud or self-hosted.',
  twitter: {
    title: 'Log Management Software for High-Performance Log Analytics | SigNoz',
    description:
      'Collect logs from any source, search billions of lines in seconds with a ClickHouse-backed query builder, and correlate logs with metrics and traces. OpenTelemetry-native, open source, cloud or self-hosted.',
    images: '/img/platform/LogsManagementHero.webp',
  },
}

const FAQ_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is log management software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Log management software collects log data from your systems, stores it in one place, and lets you search, analyze, and alert on it. It turns scattered log files into a single queryable source you can use for debugging and monitoring.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between log management and log analytics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Log management covers the full lifecycle of collecting, parsing, storing, and retaining logs. Log analytics is the step where you query and aggregate that stored data to find patterns and answer questions. SigNoz handles both in one platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SigNoz an open source log management platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SigNoz is open source under the Apache 2.0 license. You can self-host it for free or use SigNoz Cloud as a fully managed service.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can SigNoz correlate logs with metrics and traces?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SigNoz stores logs, metrics, and traces together and links them through OpenTelemetry trace IDs, so you can move between signals while debugging an incident.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does SigNoz compare with Datadog and New Relic for log management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SigNoz is OpenTelemetry-native and can be self-hosted, while Datadog and New Relic are proprietary SaaS platforms. SigNoz uses usage-based pricing with no per-user fees, which makes log costs easier to predict as your team grows.',
      },
    },
  ],
}

export default function TestLogManagementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_STRUCTURED_DATA) }}
      />
      <TestLogManagement />
    </>
  )
}
