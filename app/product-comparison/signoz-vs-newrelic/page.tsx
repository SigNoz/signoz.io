import SigNozVSNewRelicV2 from './SigNozVsNewRelicV2'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz VS New Relic',
}

export default function SigNozVSNewRelicPage() {
  return <SigNozVSNewRelicV2 />
}
