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
      'Use SigNoz Cloud to monitor application exceptions, inspect stack traces, correlate errors with traces, and debug issues faster.',
    images: '/img/features/exceptions/exceptions-overview.webp',
  },
  description:
    'Use SigNoz Cloud to monitor application exceptions, inspect stack traces, correlate errors with traces, and debug issues faster.',
  twitter: {
    title: 'Exceptions Monitoring - Track and Debug Application Errors | SigNoz',
    description:
      'Use SigNoz Cloud to monitor application exceptions, inspect stack traces, correlate errors with traces, and debug issues faster.',
    images: '/img/features/exceptions/exceptions-overview.webp',
  },
}

export default function ExceptionsPage() {
  return <Exceptions />
}
