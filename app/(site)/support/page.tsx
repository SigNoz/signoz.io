import Support from './Support'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Reach out to Signoz for any queries - We are an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
}

export default function SupportPage() {
  return <Support />
}
