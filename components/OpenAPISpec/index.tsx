'use client'

import dynamic from 'next/dynamic'
import type { StabilityIndex } from '@/constants/apiReferenceStability'

// @stoplight/elements@9 touches `window` during render (its mosaic styling layer
// and react-router-dom v6 internals), which throws under Next 15's SSR pass.
const OpenAPISpecInner = dynamic(() => import('./OpenAPISpecInner'), {
  ssr: false,
})

interface OpenAPISpecProps {
  specContent: string
  stability: StabilityIndex
}

export default function OpenAPISpec({ specContent, stability }: OpenAPISpecProps) {
  return <OpenAPISpecInner specContent={specContent} stability={stability} />
}
