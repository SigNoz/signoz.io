'use client'

import React from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import PricingForm from '../../pricing-form'

type ContactFormProps = {
  portalId: string
  formId: string
  formName?: string
}

export default function ContactForm({ portalId, formId, formName }: ContactFormProps) {
  return (
    <div className="w-full">
      <HubspotProvider>
        <PricingForm portalId={portalId} formId={formId} formName={formName} />
      </HubspotProvider>
    </div>
  )
}
