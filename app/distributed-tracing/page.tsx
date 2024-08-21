import React from 'react'
import DistributedTracing from './DistributedTracing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Distributed Tracing | SigNoz',
  },
  openGraph: {
    title: 'Distributed Tracing | SigNoz',
    description: 'Implement distributed tracing in your microservices-based applications powered by OpenTelemetry SDKs. Track user requests across services to help you identify performance bottlenecks.',
    images:"/img/features/distributed-tracing/distributed-tracing-cover.webp"
  },
  description:
    'Implement distributed tracing in your microservices-based applications powered by OpenTelemetry SDKs. Track user requests across services to help you identify performance bottlenecks.',
  twitter:{
    title: 'Distributed Tracing | SigNoz',
    description: 'Implement distributed tracing in your microservices-based applications powered by OpenTelemetry SDKs. Track user requests across services to help you identify performance bottlenecks.',
    images:"/img/features/distributed-tracing/distributed-tracing-cover.webp",
  }
}

export default function Page() {
  return <DistributedTracing />
}