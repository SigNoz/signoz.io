import DatadogSaving from './DatadogSavings'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz vs Datadog Cost Savings',
}

export default function DatadogSavingsPage() {
  return <DatadogSaving />
}
