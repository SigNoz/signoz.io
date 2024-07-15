'use client'

import React from 'react'
import OpenAPISpec from '../../components/OpenAPISpec'

export default function APIReference() {
  if (typeof window === 'undefined') return null

  return (
    <div className="api-reference" data-theme="dark">
      <OpenAPISpec />
    </div>
  )
}
