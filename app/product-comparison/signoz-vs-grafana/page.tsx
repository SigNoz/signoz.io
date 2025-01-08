import SigNozVSGrafanaV2 from './SigNozVsGrafanaV2'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz VS Grafana',
}

export default function SigNozVSGrafanaPage() {
  return <SigNozVSGrafanaV2 />
}
