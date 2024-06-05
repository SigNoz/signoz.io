import NewRelicSaving from './NewRelicSavings'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Relic Savings',
}

export default function MigrateFromDataDogPage() {
  return <NewRelicSaving />
}