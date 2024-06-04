import Teams from './Teams'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teams',
}

export default function TeamsPage() {
  return <Teams />
}