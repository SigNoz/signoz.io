import SecurityAndCompliance from './Security'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security And Compliance',
}

export default function SecurityPage() {
  return <SecurityAndCompliance />
}