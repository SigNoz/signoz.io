import React from 'react'
import DistributedTracingPage from './DistributedTracingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Process Million-Span Traces Without Sampling | SigNoz',
  },
  openGraph: {
    "title": "Process Million-Span Traces Without Sampling",
    "description": "See every database query, service call, and error in production. Correlate traces with logs and metrics, compare error vs success patterns with Trace Funnels, and run multi-query analysis to find root cause in distributed systems.",
    "images": "/img/platform/DistributedTracingMeta.png"
  },
  "description": "See every database query, service call, and error in production. Correlate traces with logs and metrics, compare error vs success patterns with Trace Funnels, and run multi-query analysis to find root cause in distributed systems.",
  twitter:{
    "title": "Process Million-Span Traces Without Sampling",
    "description": "See every database query, service call, and error in production. Correlate traces with logs and metrics, compare error vs success patterns with Trace Funnels, and run multi-query analysis to find root cause in distributed systems.",
    "images": "/img/platform/DistributedTracingMeta.png"
  }
}

export default function DistributedTracing() {
  return <DistributedTracingPage />
}