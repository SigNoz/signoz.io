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
      'Use SigNoz Cloud to create alerts across logs, metrics, traces, and exceptions, route notifications dynamically, and resolve issues faster.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
  description:
    'Use SigNoz Cloud to create alerts across logs, metrics, traces, and exceptions, route notifications dynamically, and resolve issues faster.',
  twitter: {
    title: 'Alert Management Platform | SigNoz',
    description:
      'Use SigNoz Cloud to create alerts across logs, metrics, traces, and exceptions, route notifications dynamically, and resolve issues faster.',
    images: '/img/platform/AlertsManagementMeta.webp',
  },
}

export default function AlertsManagementPage() {
  return <AlertsPage />
}
