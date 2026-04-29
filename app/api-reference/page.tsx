'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const OpenAPISpec = dynamic(() => import('../../components/OpenAPISpec'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">Loading API Reference...</div>
  ),
})

export default function APIReference() {
  return (
    <div className="api-reference" data-theme="dark">
      <OpenAPISpec />
    </div>
  )
}
