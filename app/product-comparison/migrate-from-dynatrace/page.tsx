import React from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import MigrateSaving from '../../../components/comparison/migrate-saving'

function MigrateFromDynatrace() {
  return (
    <div title="Migrate from Dynatrace">
      <HubspotProvider>
        <MigrateSaving data={DATA} />
      </HubspotProvider>
    </div>
  )
}
export default MigrateFromDynatrace

const DATA = {
  TITLE: 'Migrate easily from Dynatrace',
  DESC: 'Please provide your contact info and we will reach out to you. We will understand your requirements and help you get started with SigNoz.',
  PORTAL_ID: '22308423',
  FORM_ID: 'a5d960ae-9a0c-485e-a263-c98e5c62c222',
}
