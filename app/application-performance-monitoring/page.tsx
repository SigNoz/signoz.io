import React from 'react'
import Apm from './apm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'APM | SigNoz',
  },
  openGraph: {
    title: 'APM | SigNoz',
    description: 'SigNoz APM comes with out-of-box charts for key application metrics powered by OpenTelemetry. Get latency, requests per second, error percentage, apdex & other key metrics to understand your application performance.',
    images:"/img/features/apm/apm-cover.webp"
  },
  description:
    'SigNoz APM comes with out-of-box charts for key application metrics powered by OpenTelemetry. Get latency, requests per second, error percentage, apdex & other key metrics to understand your application performance.',
  twitter:{
    title: 'APM | SigNoz',
    description: 'SigNoz APM comes with out-of-box charts for key application metrics powered by OpenTelemetry. Get latency, requests per second, error percentage, apdex & other key metrics to understand your application performance.',
    images:"/img/features/apm/apm-cover.webp",
  }
}

export default function apmPage() {
  return <Apm />
}