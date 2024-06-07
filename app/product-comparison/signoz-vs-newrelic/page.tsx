import SigNozVSNewRelic from './SigNozVsNewRelic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz VS New Relic',
}

export default function SigNozVSNewRelicPage() {
  return <SigNozVSNewRelic />
}