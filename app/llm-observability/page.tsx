import React from 'react'
import LlmObservabilityPage from './LlmObservabilityPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Monitor LLM Apps and Agents, Correlate with Logs & Metrics | SigNoz',
  },
  openGraph: {
    title: 'Monitor LLM Apps and Agents, Correlate with Logs & Metrics | SigNoz',
    description:
      'Track AI workflows, RAG pipelines, and agents alongside microservices. Get unified alerting, dashboards, and correlation across your entire stack.',
    images: '/img/platform/LlmObservabilityMeta.png',
  },
  description:
    'Track AI workflows, RAG pipelines, and agents alongside microservices. Get unified alerting, dashboards, and correlation across your entire stack.',
  twitter: {
    title: 'Monitor LLM Apps and Agents, Correlate with Logs & Metrics | SigNoz',
    description:
      'Track AI workflows, RAG pipelines, and agents alongside microservices. Get unified alerting, dashboards, and correlation across your entire stack.',
    images: '/img/platform/LlmObservabilityMeta.png',
  },
}

export default function LlmObservability() {
  return <LlmObservabilityPage />
}
