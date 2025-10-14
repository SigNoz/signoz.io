import React from 'react'
import TraceFunnelsPage from './TraceFunnelsPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Create Visual Funnels from Traces to Track Step-by-Step Completion | SigNoz',
  },
  openGraph: {
    title: "Create Visual Funnels from Traces to Track Step-by-Step Completion",
    description: "The only distributed tracing tool that tracks multi-step request flows. See where traces succeed, where they fail, and where they drop off in multi-step processes.",
    images: "/img/platform/TraceFunnelsMeta.png"
  },
  description: "The only distributed tracing tool that tracks multi-step request flows. See where traces succeed, where they fail, and where they drop off in multi-step processes.",
  twitter:{
    title: "Create Visual Funnels from Traces to Track Step-by-Step Completion",
    description: "The only distributed tracing tool that tracks multi-step request flows. See where traces succeed, where they fail, and where they drop off in multi-step processes.",
    images: "/img/platform/TraceFunnelsMeta.png"
  }
}

export default function TraceFunnels() {
  return <TraceFunnelsPage />
}