import React from 'react'
import LogManagement from './LogManagement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Log Management Software - Search & Analyze Logs | SigNoz',
  },
  openGraph: {
    title: 'Log Management Software - Search & Analyze Logs | SigNoz',
    description:
      'Explore SigNoz log management software to ingest, search, analyze, and correlate logs with metrics and traces in one OpenTelemetry-native platform.',
    images: '/img/platform/LogsManagementHero.webp',
  },
  description:
    'Explore SigNoz log management software to ingest, search, analyze, and correlate logs with metrics and traces in one OpenTelemetry-native platform.',
  twitter: {
    title: 'Log Management Software - Search & Analyze Logs | SigNoz',
    description:
      'Explore SigNoz log management software to ingest, search, analyze, and correlate logs with metrics and traces in one OpenTelemetry-native platform.',
    images: '/img/platform/LogsManagementHero.webp',
  },
}

export default function LogManagementPage() {
  return <LogManagement />
}
