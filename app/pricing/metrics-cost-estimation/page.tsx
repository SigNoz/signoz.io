import React from 'react'
import MetricsCostEstimation from './MetricsCostEstimation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metrics Cost Estimation',
  openGraph: {
    title: 'SigNoz | Metrics Cost Estimation',
    description: 'Meta description - Understand the pricing of metrics in SigNoz cloud.',
  },
  description: 'Meta description - Understand the pricing of metrics in SigNoz cloud.',
}

export default function MetricsCostEstimationPage() {
  return <MetricsCostEstimation />
}
