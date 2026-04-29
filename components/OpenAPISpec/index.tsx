'use client'

import './APIReference.styles.css'
import React from 'react'

// TODO: Re-enable @stoplight/elements once it's compatible with React 19
// The package uses legacy react-dom APIs (render, unmountComponentAtNode) that were removed in React 19
// Original code:
// import { API } from '@stoplight/elements'
// import '@stoplight/elements/styles.min.css'
// return <API apiDescriptionUrl="/openAPISpec/api.yaml" router="hash" layout="responsive" />

export default function OpenAPISpec() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-signoz_ink-500 p-8 text-white">
      <h1 className="mb-4 text-2xl font-bold">API Reference</h1>
      <p className="mb-4 text-center text-signoz_vanilla-400">
        The interactive API documentation is temporarily unavailable during our Next.js 16 upgrade.
      </p>
      <a
        href="/openAPISpec/api.yaml"
        className="rounded-md bg-signoz_robin-500 px-4 py-2 text-white hover:bg-signoz_robin-400"
        download
      >
        Download OpenAPI Spec
      </a>
    </div>
  )
}
