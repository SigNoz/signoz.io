import React from 'react'
import MetricsCostEstimation from './MetricsCostEstimation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Metrics Cost Estimation',
  },
  openGraph: {
    title: 'SigNoz | Metrics Cost Estimation',
    description: 'Understand the pricing of metrics in SigNoz cloud.',
  },
  description: 'Understand the pricing of metrics in SigNoz cloud.',
}

export default function MetricsCostEstimationPage() {
  return <MetricsCostEstimation />
}
