import CloudwatchAlternativePage from './CloudwatchAlternativePage'
import { Metadata } from 'next'

// 1 year
export const revalidate = 31536000

export const metadata: Metadata = {
  title: {
    absolute: 'AWS CloudWatch Alternative | SigNoz',
  },
  openGraph: {
    title: 'AWS CloudWatch Alternative | SigNoz',
    description:
      'Compare AWS CloudWatch with SigNoz Cloud for managed logs, metrics, and traces with unified usage-based pricing.',
    images: '/img/platform/CloudwatchAlternativeMeta.webp',
  },
  description:
    'Compare AWS CloudWatch with SigNoz Cloud for managed logs, metrics, and traces with unified usage-based pricing.',
  twitter: {
    title: 'AWS CloudWatch Alternative | SigNoz',
    description:
      'Compare AWS CloudWatch with SigNoz Cloud for managed logs, metrics, and traces with unified usage-based pricing.',
    images: '/img/platform/CloudwatchAlternativeMeta.webp',
  },
}

export default function CloudwatchAlternative() {
  return <CloudwatchAlternativePage />
}
