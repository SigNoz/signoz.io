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
      'LLM-powered migration tool that automatically translates your Datadog dashboards to SigNoz through a simple UI, preserving your configurations, queries, and panels.',
    images: '/img/platform/DatadogMigrationToolHero.png',
  },
  description:
    'LLM-powered migration tool that automatically translates your Datadog dashboards to SigNoz through a simple UI, preserving your configurations, queries, and panels.',
  twitter: {
    title: 'Migrate from Datadog to SigNoz in Minutes | SigNoz',
    description:
      'LLM-powered migration tool that automatically translates your Datadog dashboards to SigNoz through a simple UI, preserving your configurations, queries, and panels.',
    images: '/img/platform/DatadogMigrationToolHero.png',
  },
}

export default function DatadogMigrationToolPage() {
  return <DatadogMigrationTool />
}
