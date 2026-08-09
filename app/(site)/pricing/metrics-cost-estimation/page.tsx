import React from 'react'
import MetricsCostEstimation from './MetricsCostEstimation'
import { Metadata } from 'next'

const metricsCalculatorDescription =
  'Estimate managed SigNoz Cloud metric costs by samples and retention. This calculator does not estimate Self-Hosted SigNoz infrastructure, storage, or operations costs.'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Metrics Cost Estimation',
  },
  openGraph: {
    title: 'SigNoz | Metrics Cost Estimation',
    description: metricsCalculatorDescription,
  },
  twitter: {
    description: metricsCalculatorDescription,
  },
  description: metricsCalculatorDescription,
}

export default function MetricsCostEstimationPage() {
  return <MetricsCostEstimation />
}
