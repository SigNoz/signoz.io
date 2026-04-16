import React from 'react'
import ExternalApisPage from './ExternalApisPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'External APIs - Monitor External API Calls Powered by OpenTelemetry | SigNoz',
  },
  openGraph: {
    title: 'External APIs - Monitor External API Calls Powered by OpenTelemetry | SigNoz',
    description:
      'Monitor External API calls with SigNoz. Automatically detect domains, endpoints, latency and error rates using OpenTelemetry for complete service correlation.',
    images: '/img/platform/ExternalApisMeta.webp',
  },
  description:
    'Monitor External API calls with SigNoz. Automatically detect domains, endpoints, latency and error rates using OpenTelemetry for complete service correlation.',
  twitter: {
    title: 'External APIs - Monitor External API Calls Powered by OpenTelemetry | SigNoz',
    description:
      'Monitor External API calls with SigNoz. Automatically detect domains, endpoints, latency and error rates using OpenTelemetry for complete service correlation.',
    images: '/img/platform/ExternalApisMeta.webp',
  },
}

export default function TraceFunnels() {
  return <ExternalApisPage />
}
