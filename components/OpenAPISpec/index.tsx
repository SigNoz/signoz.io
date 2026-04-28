'use client'

import './APIReference.styles.css'
import { API } from '@stoplight/elements'
import '@stoplight/elements/styles.min.css'
import React, { useState, useEffect } from 'react'

interface OpenAPISpecProps {
  specContent: string
}

export default function OpenAPISpec({ specContent }: OpenAPISpecProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <API apiDescriptionDocument={specContent} router="hash" layout="responsive" hideTryIt />
}
