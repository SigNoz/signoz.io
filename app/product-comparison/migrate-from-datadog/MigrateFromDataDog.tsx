'use client'
import React from 'react'

import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import MigrateSaving from '../../../components/comparison/migrate-saving'

function MigrateFromDataDog() {
  return (
    <div title="Migrate from Datadog">
      <HubspotProvider>
        <MigrateSaving data={DATA} />
      </HubspotProvider>
    </div>
  )
}
export default MigrateFromDataDog

const DATA = {
  TITLE: 'Migrate easily from Datadog',
  DESC: 'Please provide your contact info and we will reach out to you. We will understand your requirements and help you get started with SigNoz.',
  PORTAL_ID: '22308423',
  FORM_ID: '6039fbdd-3964-42df-8681-c42a676c1f1e',
}
