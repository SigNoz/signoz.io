'use client'

import React from 'react'
import { FormBlockedFallback, useHubspotFormFallback } from '@/components/HubspotFormFallback'

function PricingForm({ portalId, formId, formName }) {
  const { formCreated, error, showFallback, formRef } = useHubspotFormFallback({
    portalId,
    formId,
    target: '#my-hubspot-form',
    formName,
  })

  return (
    <>
      <div id="my-hubspot-form" ref={formRef}>
        {!formCreated && !error && !showFallback && <p className="text--center">Loading...</p>}
      </div>
      {showFallback && <FormBlockedFallback />}
    </>
  )
}

export default PricingForm
