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
      'Compare ClickStack/HyperDX with SigNoz Cloud for dashboards, alerting, query support, and usage-based pricing.',
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
  description:
    'Compare ClickStack/HyperDX with SigNoz Cloud for dashboards, alerting, query support, and usage-based pricing.',
  twitter: {
    title: 'ClickStack/HyperDX Alternative | SigNoz',
    description:
      'Compare ClickStack/HyperDX with SigNoz Cloud for dashboards, alerting, query support, and usage-based pricing.',
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
}

export default function ClickStackAlternative() {
  return <ClickStackAlternativePage />
}
