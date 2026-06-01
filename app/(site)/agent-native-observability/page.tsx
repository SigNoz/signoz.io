import AgentNativeObservabilityPage from './AgentNativeObservabilityPage'
import { Metadata } from 'next'

// 1 year
export const revalidate = 31536000

export const metadata: Metadata = {
  title: {
    absolute: 'Agent Native Observability | SigNoz',
  },
  openGraph: {
    title: 'Agent Native Observability | SigNoz',
    description:
      'Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place. Or use Noz, our new AI Assistant out-of-the-box. No AI SRE required.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
  description:
    'Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place. Or use Noz, our new AI Assistant out-of-the-box. No AI SRE required.',
  twitter: {
    title: 'Agent Native Observability | SigNoz',
    description:
      'Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production issues without leaving your dev environment. Traces, logs, metrics, service topology, and your actual codebase — all in one place. Or use Noz, our new AI Assistant out-of-the-box. No AI SRE required.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
}

export default function AgentNativeObservability() {
  return <AgentNativeObservabilityPage />
}
