import Teams from './Teams'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Teams',
  },
  openGraph: {
    title: 'SigNoz | Teams',
    description: ' Sign up for SigNoz cloud and get 30 days of free trial with access to all features.',
  },
  description:
    'Sign up for SigNoz cloud and get 30 days of free trial with access to all features.',
}

export default function TeamsPage() {
  return <Teams />
}
