'use client'

import './APIReference.styles.css'
import { API } from '@stoplight/elements'
import '@stoplight/elements/styles.min.css'
import StabilityBadge from './StabilityBadge'
import StabilitySidebarBadges from './StabilitySidebarBadges'
import {
  isStabilityLevel,
  STABILITY_EXTENSION_KEY,
  type StabilityIndex,
} from '@/constants/apiReferenceStability'

interface OpenAPISpecInnerProps {
  specContent: string
  stability: StabilityIndex
}

export default function OpenAPISpecInner({ specContent, stability }: OpenAPISpecInnerProps) {
  // Stoplight calls this for every node carrying `x-` keys, models included.
  const renderExtensionAddon = ({
    vendorExtensions,
  }: {
    vendorExtensions: Record<string, unknown>
  }) => {
    const level = vendorExtensions?.[STABILITY_EXTENSION_KEY]
    if (!isStabilityLevel(level)) return null

    return <StabilityBadge level={level} copy={stability.copy[level]} variant="full" interactive />
  }

  return (
    <>
      <API
        apiDescriptionDocument={specContent}
        router="hash"
        layout="responsive"
        hideTryIt
        renderExtensionAddon={renderExtensionAddon}
      />
      <StabilitySidebarBadges {...stability} />
    </>
  )
}
