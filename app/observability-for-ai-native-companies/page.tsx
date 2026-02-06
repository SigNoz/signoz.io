import React from 'react'
import ObservabilityForAiNativeCompaniesPage from './ObservabilityForAiNativeCompaniesPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Observability for AI Native Companies | SigNoz',
  },
  openGraph: {
    title: 'Observability for AI Native Companies | SigNoz',
    description:
      'Monitor AI Workloads Across LLM Layer and Infrastructure with Correlated Logs, Metrics, and Traces.',
    images: '/img/platform/LlmObservabilityMeta.webp',
  },
  description:
    'Monitor AI Workloads Across LLM Layer and Infrastructure with Correlated Logs, Metrics, and Traces.',
  twitter: {
    title: 'Observability for AI Native Companies | SigNoz',
    description:
      'Monitor AI Workloads Across LLM Layer and Infrastructure with Correlated Logs, Metrics, and Traces.',
    images: '/img/platform/LlmObservabilityMeta.webp',
  },
}

export default function ObservabilityForAiNativeCompanies() {
  return <ObservabilityForAiNativeCompaniesPage />
}
