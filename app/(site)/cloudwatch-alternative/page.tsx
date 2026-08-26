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
      "Compare AWS CloudWatch with SigNoz Cloud for managed logs, metrics, and traces in one place without CloudWatch's fragmented consoles and 12+ billing components.",
    images: '/img/platform/CloudwatchAlternativeMeta.webp',
  },
  description:
    "Compare AWS CloudWatch with SigNoz Cloud for managed logs, metrics, and traces in one place without CloudWatch's fragmented consoles and 12+ billing components.",
  twitter: {
    title: 'AWS CloudWatch Alternative | SigNoz',
    description:
      "Compare AWS CloudWatch with SigNoz Cloud for managed logs, metrics, and traces in one place without CloudWatch's fragmented consoles and 12+ billing components.",
    images: '/img/platform/CloudwatchAlternativeMeta.webp',
  },
}

export default function CloudwatchAlternative() {
  return <CloudwatchAlternativePage />
}
