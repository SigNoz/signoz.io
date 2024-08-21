import React from 'react'
import MetricsDashboards from './MetricsDashboards'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Metrics & Dashboards | SigNoz',
  },
  openGraph: {
    title: 'Metrics & Dashboards | SigNoz',
    description: 'Monitor any metrics important to you. Ingest metrics from your infrastructure or applications and create customized dashboards to monitor them. Set alerts and get notified in your preferred notification channel.',
    images:"/img/platform/LogsManagementHero.webp"
  },
  description:
    'Monitor any metrics important to you. Ingest metrics from your infrastructure or applications and create customized dashboards to monitor them. Set alerts and get notified in your preferred notification channel.',
  twitter:{
    title: 'Metrics & Dashboards | SigNoz',
    description: 'Monitor any metrics important to you. Ingest metrics from your infrastructure or applications and create customized dashboards to monitor them. Set alerts and get notified in your preferred notification channel.',
    images:"/img/platform/LogsManagementHero.webp",
  }
}

export default function MetricsDashboardsPage() {
  return <MetricsDashboards />
}