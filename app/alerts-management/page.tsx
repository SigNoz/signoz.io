import React from 'react'
import AlertsPage from './AlertsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Alert Management | SigNoz',
  },
  openGraph: {
    title: 'Alert Management | SigNoz',
    description:
      'Manage alerts for Logs, Metrics and Traces with SigNoz powered by OpenTelemetry. Get real-time notifications, set smart thresholds and resolve issues faster.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
  description:
    'Manage alerts for Logs, Metrics and Traces with SigNoz powered by OpenTelemetry. Get real-time notifications, set smart thresholds and resolve issues faster.',
  twitter: {
    title: 'Alert Management | SigNoz',
    description:
      'Manage alerts for Logs, Metrics and Traces with SigNoz powered by OpenTelemetry. Get real-time notifications, set smart thresholds and resolve issues faster.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
}

export default function AlertsManagementPage() {
  return <AlertsPage />
}
