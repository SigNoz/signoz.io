'use client'

import React from 'react'
import styles from './styles.module.css'
import { FormBlockedFallback, useHubspotFormFallback } from '@/components/HubspotFormFallback'

function PricingForm({ portalId, formId }) {
  const { formCreated, error, showFallback, formRef } = useHubspotFormFallback({
    portalId,
    formId,
    target: '#my-hubspot-form',
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
