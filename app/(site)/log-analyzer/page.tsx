import React from 'react'
import type { Metadata } from 'next'
import LogAnalyzerPage from './LogAnalyzerPage'

const TITLE = 'Log Analyzer - Free Online Log Analysis Tool | SigNoz'
const DESCRIPTION =
  'Analyze application, server, container, and Kubernetes logs with SigNoz. Search, filter, visualize, and correlate logs with traces in one tool.'

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://signoz.io/log-analyzer/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://signoz.io/log-analyzer/',
    siteName: 'SigNoz',
    images: [
      {
        url: 'https://signoz.io/img/platform/LogsManagementHero.webp',
        width: 1200,
        height: 630,
        alt: 'SigNoz log analyzer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://signoz.io/img/platform/LogsManagementHero.webp'],
  },
}

export default function LogAnalyzer() {
  return <LogAnalyzerPage />
}
