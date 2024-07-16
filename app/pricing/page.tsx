import React from 'react'
import Pricing from './Pricing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  openGraph: {
    title: 'SigNoz | Pricing',
    description: 'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
  },
  description:
    'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
}

export default function PricingPage() {
  return <Pricing />
}
