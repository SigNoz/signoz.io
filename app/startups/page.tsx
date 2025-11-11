import React from 'react'
import StartUpsLayout from './StartUpsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SigNoz for Startups | Observability That Doesn't Burn Your Budget",
  description:
    'Special pricing for startups. 50% off standard pricing to help startups with limited resources.',
  openGraph: {
    title: "SigNoz for Startups | Observability That Doesn't Burn Your Budget",
    description:
      'Special pricing for startups. 50% off standard pricing to help startups with limited resources.',
    url: 'https://signoz.io/startups/',
    siteName: 'SigNoz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SigNoz for Startups | Observability That Doesn't Burn Your Budget",
    description:
      'Special pricing for startups. 50% off standard pricing to help startups with limited resources.',
    creator: '@SigNozHQ',
  },
  alternates: {
    canonical: 'https://signoz.io/startups/',
  },
  keywords:
    'startup observability, startup monitoring, startup pricing, observability for startups, SigNoz startup program',
}

export default function StartUpsPage() {
  return <StartUpsLayout />
}
