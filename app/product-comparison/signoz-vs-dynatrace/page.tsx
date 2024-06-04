import SigNozVSDynatrace from './SigNozVsDynaTrace'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SigNoz VS DynaTrace',
}

export default function SigNozVSDynatracePage() {
  return <SigNozVSDynatrace />
}