import React from 'react'
import Exceptions from './Exceptions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Exceptions Monitoring - Track and Debug Application Errors | SigNoz',
  },
  openGraph: {
    title: 'Exceptions Monitoring - Track and Debug Application Errors | SigNoz',
    description:
      'Monitor Exceptions and application errors with SigNoz powered by OpenTelemetry. Track traces, debug faster and ensure reliable performance in real time.',
    images: '/img/features/exceptions/exceptions-overview.webp',
  },
  description:
    'Monitor Exceptions and application errors with SigNoz powered by OpenTelemetry. Track traces, debug faster and ensure reliable performance in real time.',
  twitter: {
    title: 'Exceptions Monitoring - Track and Debug Application Errors | SigNoz',
    description:
      'Monitor Exceptions and application errors with SigNoz powered by OpenTelemetry. Track traces, debug faster and ensure reliable performance in real time.',
    images: '/img/features/exceptions/exceptions-overview.webp',
  },
}

export default function ExceptionsPage() {
  return <Exceptions />
}
