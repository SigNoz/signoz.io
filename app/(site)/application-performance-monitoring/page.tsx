import React from 'react'
import Apm from './apm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Application Performance Monitoring (APM) with OpenTelemetry | SigNoz',
  },
  openGraph: {
    title: 'Application Performance Monitoring (APM) with OpenTelemetry | SigNoz',
    description:
      'Monitor Latency, Error Rates, Apdex, and Requests per second with SigNoz APM Tool powered by OpenTelemetry. Get real-time insights, root cause analysis & usage-based pricing.',
    images: '/img/features/apm/apm-cover.webp',
  },
  description:
    'Monitor Latency, Error Rates, Apdex, and Requests per second with SigNoz APM Tool powered by OpenTelemetry. Get real-time insights, root cause analysis & usage-based pricing.',
  twitter: {
    title: 'Application Performance Monitoring (APM) with OpenTelemetry | SigNoz',
    description:
      'Monitor Latency, Error Rates, Apdex, and Requests per second with SigNoz APM Tool powered by OpenTelemetry. Get real-time insights, root cause analysis & usage-based pricing.',
    images: '/img/features/apm/apm-cover.webp',
  },
}

export default function apmPage() {
  return <Apm />
}
