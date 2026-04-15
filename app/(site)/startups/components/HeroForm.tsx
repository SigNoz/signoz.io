'use client'

import React from 'react'
import { HubspotProvider } from '@aaronhayes/react-use-hubspot-form'
import PricingForm from '../../pricing-form'

type HeroFormProps = {
  portalId: string
  formId: string
  formName?: string
}

export default function HeroForm({ portalId, formId, formName }: HeroFormProps) {
  return (
    <HubspotProvider>
      <PricingForm portalId={portalId} formId={formId} formName={formName} />
    </HubspotProvider>
  )
}
