import MigrateFromNewRelic from './MigrateFromNewRelic'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migrate from NewRelic',
}

export default function MigrateFromNewRelicPage() {
  return <MigrateFromNewRelic />
}