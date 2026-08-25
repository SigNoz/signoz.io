import React from 'react'
import { Metadata } from 'next'
import PricingV1 from './pricingv1/PricingV1'
import DecimalClient from '@/components/Decimal/DecimalClient'

const pricingDescription =
  'SigNoz Cloud starts at $49/month, including $49 of usage. Logs and traces start at $0.30/GB ingested with 15-day retention, and metrics start at $0.10/mn samples with one-month retention.'

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
