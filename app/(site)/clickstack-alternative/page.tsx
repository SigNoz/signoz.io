import ClickStackAlternativePage from './ClickStackAlternativePage'
import { Metadata } from 'next'

// 1 year
export const revalidate = 31536000

export const metadata: Metadata = {
  title: {
    absolute: 'ClickStack/HyperDX Alternative | SigNoz',
  },
  openGraph: {
    title: 'ClickStack/HyperDX Alternative | SigNoz',
    description:
      'Compare Managed ClickStack with SigNoz Cloud, and ClickStack OSS with Self-Hosted SigNoz, for OpenTelemetry observability.',
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
  description:
    'Compare Managed ClickStack with SigNoz Cloud, and ClickStack OSS with Self-Hosted SigNoz, for OpenTelemetry observability.',
  twitter: {
    title: 'ClickStack/HyperDX Alternative | SigNoz',
    description:
      'Compare Managed ClickStack with SigNoz Cloud, and ClickStack OSS with Self-Hosted SigNoz, for OpenTelemetry observability.',
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
}

export default function ClickStackAlternative() {
  return <ClickStackAlternativePage />
}
