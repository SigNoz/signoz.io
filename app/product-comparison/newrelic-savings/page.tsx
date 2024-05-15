'use client'
import React from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import MigrateSaving from '../../../components/comparison/migrate-saving'

function NewRelicSaving() {
  return (
    <div title="New Relic Saving">
      <h4> New Relic Saving </h4>
      <HubspotProvider>
        <MigrateSaving data={DATA} />
      </HubspotProvider>
    </div>
  )
}
export default NewRelicSaving

const DATA = {
  TITLE: 'SigNoz vs New Relic Cost Savings',
  DESC: 'Please provide your contact info and we will reach out to you. We will understand your requirements and identify ways to reduce your observability costs.',
  PORTAL_ID: '22308423',
  FORM_ID: 'eb156ce6-5f8b-4820-bc63-cf50da2ae658',
}
