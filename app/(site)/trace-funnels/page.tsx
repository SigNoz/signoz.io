import React from 'react'
import TraceFunnelsPage from './TraceFunnelsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute:
      'Trace Funnels - Create Visual Funnels to Track Step-by-Step Flows & Drop-Offs | SigNoz',
  },
  openGraph: {
    title: 'Trace Funnels - Create Visual Funnels to Track Step-by-Step Flows & Drop-Offs | SigNoz',
    description:
      'Use SigNoz Cloud trace funnels to analyze multi-step request flows, measure drop-offs, and find bottlenecks across distributed systems.',
    images: '/img/platform/TraceFunnelsMeta.webp',
  },
  description:
    'Use SigNoz Cloud trace funnels to analyze multi-step request flows, measure drop-offs, and find bottlenecks across distributed systems.',
  twitter: {
    title: 'Trace Funnels - Create Visual Funnels to Track Step-by-Step Flows & Drop-Offs | SigNoz',
    description:
      'Use SigNoz Cloud trace funnels to analyze multi-step request flows, measure drop-offs, and find bottlenecks across distributed systems.',
    images: '/img/platform/TraceFunnelsMeta.webp',
  },
}

export default function TraceFunnels() {
  return <TraceFunnelsPage />
}
