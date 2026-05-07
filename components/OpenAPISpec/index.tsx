'use client'

import './APIReference.styles.css'
import React, { useState, useEffect } from 'react'
import { API } from '@stoplight/elements'
import '@stoplight/elements/styles.min.css'

interface OpenAPISpecProps {
  specContent: string
}

export default function OpenAPISpec({ specContent }: OpenAPISpecProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // SSR placeholder: renders the full spec in a hidden div so crawlers/SEO bots
  // can index endpoint content. The `hidden` class prevents visual display but
  // Stoplight still parses the spec in the DOM — accepted trade-off for SEO coverage.
  if (!mounted)
    return (
      <div className="hidden h-screen w-screen">
        <API apiDescriptionDocument={specContent} router="static" layout="stacked" hideTryIt />
      </div>
    )

  return <API apiDescriptionDocument={specContent} router="hash" layout="responsive" hideTryIt />
}
