import React from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import MigrateSaving from '../../../components/comparison/migrate-saving'

function MigrateFromNewRelic() {
  return (
    <div title="Migrate from New Relic">
      <HubspotProvider>
        <MigrateSaving data={DATA} />
      </HubspotProvider>
    </div>
  )
}
export default MigrateFromNewRelic

const DATA = {
  TITLE: 'Migrate easily from New Relic',
  DESC: 'Please provide your contact info and we will reach out to you. We will understand your requirements and help you get started with SigNoz.',
  PORTAL_ID: '22308423',
  FORM_ID: '69d0c2ab-c0b8-4303-8cc7-661c8001b91e',
}
