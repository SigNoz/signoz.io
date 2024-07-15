'use client'

import './APIReference.styles.css'
import { API } from '@stoplight/elements'
import '@stoplight/elements/styles.min.css'
import React from 'react'

export default function OpenAPISpec() {
  return <API apiDescriptionUrl="/openAPISpec/alerts.yaml" router="hash" layout="responsive" />
}
