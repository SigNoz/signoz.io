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
      'Connect SigNoz to your coding agents like Claude Code and Cursor. Debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
  description:
    'Connect SigNoz to your coding agents like Claude Code and Cursor. Debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place.',
  twitter: {
    title: 'Agent Native Observability | SigNoz',
    description:
      'Connect SigNoz to your coding agents like Claude Code and Cursor. Debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
}

export default function AgentNativeObservability() {
  return <AgentNativeObservabilityPage />
}
