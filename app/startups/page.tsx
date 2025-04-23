import React from 'react'
import StartUpsLayout from './StartUpsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "SigNoz for Startups | Observability That Doesn't Burn Your Budget",
  description:
    'Special pricing for startups. 50% off standard pricing to help startups with limited resources.',
}

export default function StartUpsPage() {
  return <StartUpsLayout />
}
