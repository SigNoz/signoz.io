import SupportPage from './SupportPage'

import { Metadata } from 'next'

const supportDescription =
  'Find SigNoz Cloud and contracted enterprise support, or use community Slack and GitHub Discussions for Self-Hosted SigNoz and project questions.'

export const metadata: Metadata = {
  title: 'Support',
  description: supportDescription,
  openGraph: {
    description: supportDescription,
  },
  twitter: {
    description: supportDescription,
  },
}

export default function SupportPageRoute() {
  return <SupportPage />
}
