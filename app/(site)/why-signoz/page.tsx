import EnterprisePage from './EnterprisePage'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 24 * 365

export const metadata: Metadata = {
  title: {
    absolute: 'Enterprise observability, built for the AI era | SigNoz',
  },
  openGraph: {
    title: 'Enterprise observability, built for the AI era | SigNoz',
    description:
      'Logs, metrics, traces, and LLM observability unified in a single OpenTelemetry-native platform. Built for engineering teams, from start up to scale. 100% Predictable & Transparent Pricing.',
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
  description:
    'Logs, metrics, traces, and LLM observability unified in a single OpenTelemetry-native platform. Built for engineering teams, from start up to scale. 100% Predictable & Transparent Pricing.',
  twitter: {
    title: 'Enterprise observability, built for the AI era | SigNoz',
    description:
      'Logs, metrics, traces, and LLM observability unified in a single OpenTelemetry-native platform. Built for engineering teams, from start up to scale. 100% Predictable & Transparent Pricing.',
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
}

export default function Enterprise() {
  return <EnterprisePage />
}
