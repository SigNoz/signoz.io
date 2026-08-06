import React from 'react'
import MetricsDashboards from './MetricsDashboards'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Metrics Monitoring & Customized Dashboards | SigNoz',
  },
  openGraph: {
    title: 'Metrics Monitoring & Customized Dashboards | SigNoz',
    description:
      'Use SigNoz Cloud to monitor infrastructure and application metrics, build custom dashboards, and set alerts without a custom-metric surcharge.',
    images: '/img/features/metrics/metrics-overview1.webp',
  },
  description:
    'Use SigNoz Cloud to monitor infrastructure and application metrics, build custom dashboards, and set alerts without a custom-metric surcharge.',
  twitter: {
    title: 'Metrics Monitoring & Customized Dashboards | SigNoz',
    description:
      'Use SigNoz Cloud to monitor infrastructure and application metrics, build custom dashboards, and set alerts without a custom-metric surcharge.',
    images: '/img/features/metrics/metrics-overview1.webp',
  },
}

export default function MetricsDashboardsPage() {
  return <MetricsDashboards />
}
