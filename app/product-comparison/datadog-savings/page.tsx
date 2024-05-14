'use client'

import React from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import MigrateSaving from '../../../components/comparison/migrate-saving'

function DatadogSaving() {
  return (
    <div title="Datadog Saving">
      <HubspotProvider>
        <MigrateSaving data={DATA} />
      </HubspotProvider>
    </div>
  )
}
export default DatadogSaving

const DATA = {
  TITLE: 'SigNoz vs Datadog Cost Savings',
  DESC: 'Please provide your contact info and we will reach out to you. We will understand your requirements and identify ways to reduce your observability costs.',
  PORTAL_ID: '22308423',
  FORM_ID: 'f33f929c-a9ec-4fde-b805-f54265078d19',
}
