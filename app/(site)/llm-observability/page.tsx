import React from 'react'
import LlmObservabilityPage from './LlmObservabilityPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'LLM Observability - Monitor AI Agents, RAG Pipelines & LLM Performance | SigNoz',
  },
  openGraph: {
    title: 'LLM Observability - Monitor AI Agents, RAG Pipelines & LLM Performance | SigNoz',
    description:
      'Monitor LLM apps and agents with SigNoz. Track AI workflows, RAG pipelines and token usage while correlating traces, logs and metrics in one platform.',
    images: '/img/platform/LlmObservabilityMeta.webp',
  },
  description:
    'Monitor LLM apps and agents with SigNoz. Track AI workflows, RAG pipelines and token usage while correlating traces, logs and metrics in one platform.',
  twitter: {
    title: 'LLM Observability - Monitor AI Agents, RAG Pipelines & LLM Performance | SigNoz',
    description:
      'Monitor LLM apps and agents with SigNoz. Track AI workflows, RAG pipelines and token usage while correlating traces, logs and metrics in one platform.',
    images: '/img/platform/LlmObservabilityMeta.webp',
  },
}

export default function LlmObservability() {
  return <LlmObservabilityPage />
}
