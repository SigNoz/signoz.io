import React from 'react'
import ExternalApisPage from './ExternalApisPage'
import { Metadata } from 'next'
import ClarityPriority from '@/components/Analytics/ClarityPriority'

export const metadata: Metadata = {
  title: {
    absolute: 'Monitor External APIs With Built-In Service Correlation | SigNoz',
  },
  openGraph: {
    title: 'Monitor External APIs With Built-In Service Correlation',
    description:
      'Automatically detect external API calls using OpenTelemetry semantic conventions. Click any metric to view the service making the call or the underlying trace.',
    images: '/img/platform/ExternalApisMeta.png',
  },
  description:
    'Automatically detect external API calls using OpenTelemetry semantic conventions. Click any metric to view the service making the call or the underlying trace.',
  twitter: {
    title: 'Monitor External APIs With Built-In Service Correlation',
    description:
      'Automatically detect external API calls using OpenTelemetry semantic conventions. Click any metric to view the service making the call or the underlying trace.',
    images: '/img/platform/ExternalApisMeta.png',
  },
}

export default function TraceFunnels() {
  return (
    <>
      <ClarityPriority />
      <ExternalApisPage />
    </>
  )
}
