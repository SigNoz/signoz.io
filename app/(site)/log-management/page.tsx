import React from 'react'
import LogManagement from './LogManagement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Log Management Software for Fast Log Analytics | SigNoz',
  },
  openGraph: {
    title: 'Log Management Software for Fast Log Analytics | SigNoz',
    description:
      'Ingest, parse, search, and analyze logs at scale with SigNoz. Correlate logs with metrics and traces in an OpenTelemetry-native log management platform.',
    images: '/img/platform/LogsManagementHero.webp',
  },
  description:
    'Ingest, parse, search, and analyze logs at scale with SigNoz. Correlate logs with metrics and traces in an OpenTelemetry-native log management platform.',
  twitter: {
    title: 'Log Management Software for Fast Log Analytics | SigNoz',
    description:
      'Ingest, parse, search, and analyze logs at scale with SigNoz. Correlate logs with metrics and traces in an OpenTelemetry-native log management platform.',
    images: '/img/platform/LogsManagementHero.webp',
  },
}

export default function LogManagementPage() {
  return <LogManagement />
}
