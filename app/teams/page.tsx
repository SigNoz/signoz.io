import Teams from './Teams'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teams',
  description:
    'Sign up for SigNoz cloud and get 30 days of free trial with access to all features.',
}

export default function TeamsPage() {
  return <Teams />
}
