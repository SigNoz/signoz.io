import React from 'react'
import { Metadata } from 'next'
import PricingV1 from './pricingv1/PricingV1'
import DecimalClient from '@/components/Decimal/DecimalClient'

const pricingDescription =
  'SigNoz Cloud starts at USD 49 per month, including USD 49 of usage. Logs and traces start at USD 0.30 per GB ingested with 15-day retention, and metrics start at USD 0.10 per million samples with one-month retention.'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Pricing',
  },
  openGraph: {
    title: 'SigNoz | Pricing',
    description: pricingDescription,
  },
  twitter: {
    description: pricingDescription,
  },
  description: pricingDescription,
}

export default function PricingPage() {
  return (
    <>
      <PricingV1 />
      <DecimalClient />
    </>
  )
}
