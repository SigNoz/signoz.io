import React from 'react'
import ObservabilityForAiNativeCompaniesPage from './ObservabilityForAiNativeCompaniesPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'AI Observability - Monitor LLM Apps & Microservices Together | SigNoz',
  },
  openGraph: {
    title: 'AI Observability - Monitor LLM Apps & Microservices Together | SigNoz',
    description:
      'SigNoz AI Observability helps you monitor AI apps in minutes. Track latency, errors, token usage and costs with OpenTelemetry in one unified platform.',
    images: '/img/platform/ObservabilityForAiNativeCompaniesMeta.webp',
  },
  description:
    'SigNoz AI Observability helps you monitor AI apps in minutes. Track latency, errors, token usage and costs with OpenTelemetry in one unified platform.',
  twitter: {
    title: 'AI Observability - Monitor LLM Apps & Microservices Together | SigNoz',
    description:
      'SigNoz AI Observability helps you monitor AI apps in minutes. Track latency, errors, token usage and costs with OpenTelemetry in one unified platform.',
    images: '/img/platform/ObservabilityForAiNativeCompaniesMeta.webp',
  },
}

export default function ObservabilityForAiNativeCompanies() {
  return <ObservabilityForAiNativeCompaniesPage />
}
