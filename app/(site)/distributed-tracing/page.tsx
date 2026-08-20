import React from 'react'
import DistributedTracingPage from './DistributedTracingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute:
      'Distributed Tracing - High-Performance Trace Analysis Powered by OpenTelemetry | SigNoz',
  },
  openGraph: {
    title:
      'Distributed Tracing - High-Performance Trace Analysis Powered by OpenTelemetry | SigNoz',
    description:
      'Analyze OpenTelemetry traces with SigNoz Cloud. Explore millions of spans, track requests across services, and find root causes faster.',
    images: '/img/platform/DistributedTracingMeta.webp',
  },
  description:
    'Analyze OpenTelemetry traces with SigNoz Cloud. Explore millions of spans, track requests across services, and find root causes faster.',
  twitter: {
    title:
      'Distributed Tracing - High-Performance Trace Analysis Powered by OpenTelemetry | SigNoz',
    description:
      'Analyze OpenTelemetry traces with SigNoz Cloud. Explore millions of spans, track requests across services, and find root causes faster.',
    images: '/img/platform/DistributedTracingMeta.webp',
  },
}

export default function DistributedTracing() {
  return <DistributedTracingPage />
}
