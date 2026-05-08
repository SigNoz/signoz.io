import React from 'react'
import LogManagement from './LogManagement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Log Management Tool - Ingest, Search & Analyze Logs at Scale | SigNoz',
  },
  openGraph: {
    title: 'Log Management Tool - Ingest, Search & Analyze Logs at Scale | SigNoz',
    description:
      'Ingest, search, and analyze logs at scale with SigNoz log management powered by OpenTelemetry & Columnar Database. Correlate logs with metrics and traces for faster debugging and performance optimization.',
    images: '/img/platform/LogsManagementHero.webp',
  },
  description:
    'Ingest, search, and analyze logs at scale with SigNoz log management powered by OpenTelemetry & Columnar Database. Correlate logs with metrics and traces for faster debugging and performance optimization.',
  twitter: {
    title: 'Log Management Tool - Ingest, Search & Analyze Logs at Scale | SigNoz',
    description:
      'Ingest, search, and analyze logs at scale with SigNoz log management powered by OpenTelemetry & Columnar Database. Correlate logs with metrics and traces for faster debugging and performance optimization.',
    images: '/img/platform/LogsManagementHero.webp',
  },
}

export default function LogManagementPage() {
  return <LogManagement />
}
