import CloudwatchAlternativePage from './CloudwatchAlternativePage'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 24 * 365

export const metadata: Metadata = {
  title: {
    absolute: 'AWS CloudWatch Alternative | SigNoz',
  },
  openGraph: {
    title: 'AWS CloudWatch Alternative | SigNoz',
    description:
      "Open-source observability with transparent pricing. Get logs, metrics, and traces in one place without CloudWatch's fragmented consoles and 12+ billing components.",
    images: '/img/platform/CloudwatchAlternativeMeta.webp',
  },
  description:
    "Open-source observability with transparent pricing. Get logs, metrics, and traces in one place without CloudWatch's fragmented consoles and 12+ billing components.",
  twitter: {
    title: 'AWS CloudWatch Alternative | SigNoz',
    description:
      "Open-source observability with transparent pricing. Get logs, metrics, and traces in one place without CloudWatch's fragmented consoles and 12+ billing components.",
    images: '/img/platform/CloudwatchAlternativeMeta.webp',
  },
}

export default function CloudwatchAlternative() {
  return <CloudwatchAlternativePage />
}
