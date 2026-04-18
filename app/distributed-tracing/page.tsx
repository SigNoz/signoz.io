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
      'SigNoz offers powerful Distributed Tracing powered by OpenTelemetry. Analyze millions of spans, track requests across services & quickly find root causes to optimize application performance.',
    images: '/img/platform/DistributedTracingMeta.webp',
  },
  description:
    'SigNoz offers powerful Distributed Tracing powered by OpenTelemetry. Analyze millions of spans, track requests across services & quickly find root causes to optimize application performance.',
  twitter: {
    title:
      'Distributed Tracing - High-Performance Trace Analysis Powered by OpenTelemetry | SigNoz',
    description:
      'SigNoz offers powerful Distributed Tracing powered by OpenTelemetry. Analyze millions of spans, track requests across services & quickly find root causes to optimize application performance.',
    images: '/img/platform/DistributedTracingMeta.webp',
  },
}

export default function DistributedTracing() {
  return <DistributedTracingPage />
}
