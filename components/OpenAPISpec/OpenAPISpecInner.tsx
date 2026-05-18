'use client'

import './APIReference.styles.css'
import { API } from '@stoplight/elements'
import '@stoplight/elements/styles.min.css'

interface OpenAPISpecInnerProps {
  specContent: string
}

export default function OpenAPISpecInner({ specContent }: OpenAPISpecInnerProps) {
  return <API apiDescriptionDocument={specContent} router="hash" layout="responsive" hideTryIt />
}
