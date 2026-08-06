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
      'Use SigNoz Cloud for OpenTelemetry-native distributed tracing. Analyze millions of spans, correlate signals, and find root causes faster.',
    images: '/img/platform/DistributedTracingMeta.webp',
  },
  description:
    'Use SigNoz Cloud for OpenTelemetry-native distributed tracing. Analyze millions of spans, correlate signals, and find root causes faster.',
  twitter: {
    title:
      'Distributed Tracing - High-Performance Trace Analysis Powered by OpenTelemetry | SigNoz',
    description:
      'Use SigNoz Cloud for OpenTelemetry-native distributed tracing. Analyze millions of spans, correlate signals, and find root causes faster.',
    images: '/img/platform/DistributedTracingMeta.webp',
  },
}

export default function DistributedTracing() {
  return <DistributedTracingPage />
}
