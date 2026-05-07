'use client'

import React from 'react'
import HubspotCustomForm from '@/components/hubspot-custom-form/HubspotCustomForm'

type ContactFormProps = {
  portalId: string
  formId: string
  formName?: string
}

export default function ContactForm({ portalId, formId, formName }: ContactFormProps) {
  return (
    <div className="w-full">
      <HubspotCustomForm portalId={portalId} formId={formId} formName={formName} />
    </div>
  )
}
