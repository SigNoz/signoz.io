import React from 'react'
import AlertsPage from './AlertsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Alert Management Platform | SigNoz',
  },
  openGraph: {
    title: 'Alert Management Platform | SigNoz',
    description:
      'Manage alerts across logs, metrics, traces, and exceptions with SigNoz Cloud. Route notifications dynamically and resolve issues faster.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
  description:
    'Manage alerts across logs, metrics, traces, and exceptions with SigNoz Cloud. Route notifications dynamically and resolve issues faster.',
  twitter: {
    title: 'Alert Management Platform | SigNoz',
    description:
      'Manage alerts across logs, metrics, traces, and exceptions with SigNoz Cloud. Route notifications dynamically and resolve issues faster.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
}

export default function AlertsManagementPage() {
  return <AlertsPage />
}
