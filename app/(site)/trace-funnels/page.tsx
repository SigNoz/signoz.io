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
      'Create visual trace funnels with SigNoz to track multi-step request flows, visualize drop-offs, and identify bottlenecks in distributed systems.',
    images: '/img/platform/TraceFunnelsMeta.webp',
  },
  description:
    'Create visual trace funnels with SigNoz to track multi-step request flows, visualize drop-offs, and identify bottlenecks in distributed systems.',
  twitter: {
    title: 'Trace Funnels - Create Visual Funnels to Track Step-by-Step Flows & Drop-Offs | SigNoz',
    description:
      'Create visual trace funnels with SigNoz to track multi-step request flows, visualize drop-offs, and identify bottlenecks in distributed systems.',
    images: '/img/platform/TraceFunnelsMeta.webp',
  },
}

export default function TraceFunnels() {
  return <TraceFunnelsPage />
}
