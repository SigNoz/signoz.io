import ClickStackAlternativePage from './ClickStackAlternativePage'
import { Metadata } from 'next'

export const dynamic = 'force-static'
export const revalidate = 60 * 60 * 24 * 365

export const metadata: Metadata = {
  title: {
    absolute: 'ClickStack/HyperDX Alternative | SigNoz',
  },
  openGraph: {
    title: 'ClickStack/HyperDX Alternative | SigNoz',
    description:
      "SigNoz gives you interactive dashboards, anomaly detection-based alerting, and PromQL support. You're billed on how much data you ingest, not how often you query it.",
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
  description:
    "SigNoz gives you interactive dashboards, anomaly detection-based alerting, and PromQL support. You're billed on how much data you ingest, not how often you query it.",
  twitter: {
    title: 'ClickStack/HyperDX Alternative | SigNoz',
    description:
      "SigNoz gives you interactive dashboards, anomaly detection-based alerting, and PromQL support. You're billed on how much data you ingest, not how often you query it.",
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
}

export default function ClickStackAlternative() {
  return <ClickStackAlternativePage />
}
