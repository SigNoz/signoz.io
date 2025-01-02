import SigNozVsDatadogV2 from './SigNozVsDatadogV2'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'In Depth - SigNoz vs Datadog',
  description:
    'How is SigNoz a great alternative to Datadog? Learn where SigNoz is a better fit for your use cases when compared to Datadog.',
}

export default function SigNozVSDatadogPage() {
  return <SigNozVsDatadogV2 />
}
