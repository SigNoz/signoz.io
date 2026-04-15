import React from 'react'
import { Metadata } from 'next'
import PricingV1 from './pricingv1/PricingV1'
import Chatbase from '@/components/Chatbase'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Pricing',
  },
  openGraph: {
    title: 'SigNoz | Pricing',
    description:
      'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
  },
  description:
    'Explore SigNoz plans and pricing. Transparent & predictable with only usage-based pricing. No user-based pricing, no pricing based on containers, hosts, or nodes. No special pricing for custom metrics.',
}

export default function PricingPage() {
  return (
    <>
      <PricingV1 />
      <Chatbase />
    </>
  )
}
