import React from 'react'
import DatadogMigrationTool from './DatadogMigrationTool'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Migrate from Datadog to SigNoz in Minutes | SigNoz',
  },
  openGraph: {
    title: 'Migrate from Datadog to SigNoz in Minutes | SigNoz',
    description:
      'Use the LLM-powered migration tool to translate Datadog dashboards for SigNoz Cloud or Self-Hosted SigNoz while preserving configurations, queries, and panels.',
    images: '/img/platform/DatadogMigrationToolHero.webp',
  },
  description:
    'Use the LLM-powered migration tool to translate Datadog dashboards for SigNoz Cloud or Self-Hosted SigNoz while preserving configurations, queries, and panels.',
  twitter: {
    title: 'Migrate from Datadog to SigNoz in Minutes | SigNoz',
    description:
      'Use the LLM-powered migration tool to translate Datadog dashboards for SigNoz Cloud or Self-Hosted SigNoz while preserving configurations, queries, and panels.',
    images: '/img/platform/DatadogMigrationToolHero.webp',
  },
}

export default function DatadogMigrationToolPage() {
  return <DatadogMigrationTool />
}
