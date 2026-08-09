'use client'

import React from 'react'
import MigrateSaving from '@/components/comparison/migrate-saving'

function MigrateFromDynatrace() {
  return (
    <div title="Migrate from Dynatrace">
      <MigrateSaving data={DATA} />
    </div>
  )
}
export default MigrateFromDynatrace

const DATA = {
  TITLE: 'Migrate easily from Dynatrace',
  DESC: 'Please provide your contact information. We will review your requirements and help you migrate to SigNoz Cloud.',
  PORTAL_ID: '22308423',
  FORM_ID: 'a5d960ae-9a0c-485e-a263-c98e5c62c222',
}
