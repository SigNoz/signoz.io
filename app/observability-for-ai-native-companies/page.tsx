import React from 'react'
import ObservabilityForAiNativeCompaniesPage from './ObservabilityForAiNativeCompaniesPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute:
      'Monitor AI Workloads Across LLM Layer and Infrastructure with Correlated Logs, Metrics, and Traces | SigNoz',
  },
  openGraph: {
    title:
      'Monitor AI Workloads Across LLM Layer and Infrastructure with Correlated Logs, Metrics, and Traces | SigNoz',
    description:
      'Track token usage, latency, and costs alongside your microservices, databases, and GPU clusters. Handle high-cardinality data at scale with usage-based pricing and span-level alerting for traces.',
    images: '/img/platform/ObservabilityForAiNativeCompaniesMeta.webp',
  },
  description:
    'Track token usage, latency, and costs alongside your microservices, databases, and GPU clusters. Handle high-cardinality data at scale with usage-based pricing and span-level alerting for traces.',
  twitter: {
    title:
      'Monitor AI Workloads Across LLM Layer and Infrastructure with Correlated Logs, Metrics, and Traces | SigNoz',
    description:
      'Track token usage, latency, and costs alongside your microservices, databases, and GPU clusters. Handle high-cardinality data at scale with usage-based pricing and span-level alerting for traces.',
    images: '/img/platform/ObservabilityForAiNativeCompaniesMeta.webp',
  },
}

export default function ObservabilityForAiNativeCompanies() {
  return <ObservabilityForAiNativeCompaniesPage />
}
