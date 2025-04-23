import StartUps from './StartUps'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startups',
}

export default function StartUpsPage() {
  return <StartUps />
}
