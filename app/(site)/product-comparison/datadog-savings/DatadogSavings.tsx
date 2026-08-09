'use client'

import React from 'react'
import MigrateSaving from '@/components/comparison/migrate-saving'

const DATA = {
  TITLE: 'SigNoz vs Datadog Cost Savings',
  DESC: 'Share your contact information to request a Datadog-to-SigNoz Cloud cost review. We will use your Datadog products and plans, billing cadence, current spend or discounts, logs volume and retention, trace volume and APM hosts, infrastructure hosts, and metric volume. Any estimate depends on the data you provide and does not guarantee a fixed saving.',
  PORTAL_ID: '22308423',
  FORM_ID: 'f33f929c-a9ec-4fde-b805-f54265078d19',
}

function DatadogSaving() {
  return (
    <div title="Datadog Saving">
      <MigrateSaving data={DATA} />
    </div>
  )
}
export default DatadogSaving
