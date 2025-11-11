import React from 'react'
import DistributedTracingPage from './DistributedTracingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'High-Performance Trace Analysis Powered by Columnar Storage | SigNoz',
  },
  openGraph: {
    title: "High-Performance Trace Analysis Powered by Columnar Storage",
    description: "Aggregate and analyze millions of spans with ClickHouse performance. Correlate traces with logs and metrics to find root cause in distributed systems.",
    images: "/img/platform/DistributedTracingMeta.png"
  },
  description: "Aggregate and analyze millions of spans with ClickHouse performance. Correlate traces with logs and metrics to find root cause in distributed systems.",
  twitter:{
    title: "High-Performance Trace Analysis Powered by Columnar Storage",
    description: "Aggregate and analyze millions of spans with ClickHouse performance. Correlate traces with logs and metrics to find root cause in distributed systems.",
    images: "/img/platform/DistributedTracingMeta.png"
  }
}

export default function DistributedTracing() {
  return <DistributedTracingPage />
}