import React from 'react'
import StartUpsLayout from './StartUpsLayout'

import { Metadata } from 'next'

const startupsDescription =
  'Eligible startups get SigNoz Cloud for USD 19 per month for the first 12 months. This includes USD 19 of telemetry usage; additional usage follows published SigNoz Cloud rates.'

export const metadata: Metadata = {
  title: {
    absolute: "SigNoz for Startups | Observability That Doesn't Burn Your Budget",
  },
  description: startupsDescription,
  openGraph: {
    title: "SigNoz for Startups | Observability That Doesn't Burn Your Budget",
    description: startupsDescription,
    url: 'https://signoz.io/startups/',
    siteName: 'SigNoz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SigNoz for Startups | Observability That Doesn't Burn Your Budget",
    description: startupsDescription,
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
