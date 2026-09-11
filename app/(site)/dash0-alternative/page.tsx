import Dash0AlternativePage from './Dash0AlternativePage'
import { Metadata } from 'next'

// 1 year
export const revalidate = 31536000

const TITLE = 'SigNoz Cloud vs Dash0 | SigNoz'
const DESCRIPTION =
  'Both are OpenTelemetry-native. SigNoz Cloud offers deeper investigations and more control. Dash0 offers more convenience and broader workflows. Compare query engines, tracing, dashboards, alerts, and pricing.'
const OG_IMAGE = '/img/dash0-alternative/signoz-trace-view-100k-spans.webp'

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGE,
  },
  description: DESCRIPTION,
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: OG_IMAGE,
  },
}

export default function Dash0Alternative() {
  return <Dash0AlternativePage />
}
