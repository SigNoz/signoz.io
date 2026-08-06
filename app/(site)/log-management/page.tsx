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
      'Use SigNoz Cloud to ingest, search, and analyze logs at scale, then correlate logs with metrics and traces for faster debugging.',
    images: '/img/platform/LogsManagementHero.webp',
  },
  description:
    'Use SigNoz Cloud to ingest, search, and analyze logs at scale, then correlate logs with metrics and traces for faster debugging.',
  twitter: {
    title: 'Log Management Tool - Ingest, Search & Analyze Logs at Scale | SigNoz',
    description:
      'Use SigNoz Cloud to ingest, search, and analyze logs at scale, then correlate logs with metrics and traces for faster debugging.',
    images: '/img/platform/LogsManagementHero.webp',
  },
}

export default function LogManagementPage() {
  return <LogManagement />
}
