import MigrateFromDynatrace from './MigrateFromDynatrace'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migrate from Dynatrace',
}

export default function MigrateFromDynatracePage() {
  return <MigrateFromDynatrace />
}