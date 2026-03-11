import React from 'react'
import AlertsPage from './AlertsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Alerts with multiple thresholds and dynamic routing | SigNoz',
  },
  openGraph: {
    title: 'Alerts with multiple thresholds and dynamic routing | SigNoz',
    description:
      'Define warning and critical levels in a single rule. Automatically route to teams based on service, environment, or labels. Group notifications by deployment, customer, or any attribute.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
  description:
    'Define warning and critical levels in a single rule. Automatically route to teams based on service, environment, or labels. Group notifications by deployment, customer, or any attribute.',
  twitter: {
    title: 'Alerts with multiple thresholds and dynamic routing | SigNoz',
    description:
      'Define warning and critical levels in a single rule. Automatically route to teams based on service, environment, or labels. Group notifications by deployment, customer, or any attribute.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
}

export default function AlertsManagementPage() {
  return <AlertsPage />
}
