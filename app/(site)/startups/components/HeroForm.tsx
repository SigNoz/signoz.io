'use client'

import React from 'react'
import HubspotCustomForm from '@/components/hubspot-custom-form/HubspotCustomForm'

type HeroFormProps = {
  portalId: string
  formId: string
  formName?: string
}

export default function HeroForm({ portalId, formId, formName }: HeroFormProps) {
  return <HubspotCustomForm portalId={portalId} formId={formId} formName={formName} theme="light" />
}
