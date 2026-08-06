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
      'Connect SigNoz Cloud to coding agents such as Claude Code and Cursor to debug production issues from your development environment. Use Noz, the AI teammate built into SigNoz Cloud.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
  description:
    'Connect SigNoz Cloud to coding agents such as Claude Code and Cursor to debug production issues from your development environment. Use Noz, the AI teammate built into SigNoz Cloud.',
  twitter: {
    title: 'Agent Native Observability | SigNoz',
    description:
      'Connect SigNoz Cloud to coding agents such as Claude Code and Cursor to debug production issues from your development environment. Use Noz, the AI teammate built into SigNoz Cloud.',
    images: '/img/platform/AgentNativeObservabilityMeta.webp',
  },
}

export default function AgentNativeObservability() {
  return <AgentNativeObservabilityPage />
}
