import SupportPage from './SupportPage'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Enterprise-grade support for every stage of your observability journey. From open source community to mission-critical production - SigNoz support is built for engineering teams.',
}

export default function SupportPageRoute() {
  return <SupportPage />
}
