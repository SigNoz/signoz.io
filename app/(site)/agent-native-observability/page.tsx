import AgentNativeObservabilityPage from './AgentNativeObservabilityPage'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 24 * 365

export const metadata: Metadata = {
  title: {
    absolute: 'Agent Native Observability | SigNoz',
  },
  openGraph: {
    title: 'Agent Native Observability | SigNoz',
    description:
      'Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place. No separate AI SRE product required.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
  description:
    'Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place. No separate AI SRE product required.',
  twitter: {
    title: 'Agent Native Observability | SigNoz',
    description:
      'Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place. No separate AI SRE product required.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
}

export default function AgentNativeObservability() {
  return <AgentNativeObservabilityPage />
}
