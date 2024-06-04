import MigrateFromDataDog from './MigrateFromDataDog'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migrate from Datadog',
}

export default function MigrateFromDataDogPage() {
  return <MigrateFromDataDog />
}