import React from 'react'
import Apm from './apm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Application Performance Monitoring (APM) with OpenTelemetry | SigNoz',
  },
  openGraph: {
    title: 'Application Performance Monitoring (APM) with OpenTelemetry | SigNoz Cloud',
    description:
      'Monitor latency, error rates, Apdex, and requests per second with SigNoz Cloud APM powered by OpenTelemetry. Get real-time insights, root cause analysis, and usage-based pricing.',
    images: '/img/features/apm/apm-cover.webp',
  },
  description:
    'Monitor latency, error rates, Apdex, and requests per second with SigNoz Cloud APM powered by OpenTelemetry. Get real-time insights, root cause analysis, and usage-based pricing.',
  twitter: {
    title: 'Application Performance Monitoring (APM) with OpenTelemetry | SigNoz Cloud',
    description:
      'Monitor latency, error rates, Apdex, and requests per second with SigNoz Cloud APM powered by OpenTelemetry. Get real-time insights, root cause analysis, and usage-based pricing.',
    images: '/img/features/apm/apm-cover.webp',
  },
}

export default function apmPage() {
  return <Apm />
}
