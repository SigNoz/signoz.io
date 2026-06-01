import React from 'react'
import TestLogManagement from './TestLogManagement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Log Management Software for High-Performance Log Analytics | SigNoz',
  },
  openGraph: {
    title: 'Log Management Software for High-Performance Log Analytics | SigNoz',
    description:
      'Collect logs from any source, search billions of lines in seconds with a ClickHouse-backed query builder, and correlate logs with metrics and traces. OpenTelemetry-native, open source, cloud or self-hosted.',
  },
  description:
    'Collect logs from any source, search billions of lines in seconds with a ClickHouse-backed query builder, and correlate logs with metrics and traces. OpenTelemetry-native, open source, cloud or self-hosted.',
  twitter: {
    title: 'Log Management Software for High-Performance Log Analytics | SigNoz',
    description:
      'Collect logs from any source, search billions of lines in seconds with a ClickHouse-backed query builder, and correlate logs with metrics and traces. OpenTelemetry-native, open source, cloud or self-hosted.',
  },
}

export default function TestLogManagementPage() {
  return <TestLogManagement />
}
