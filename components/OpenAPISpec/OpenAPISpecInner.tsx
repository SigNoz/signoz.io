'use client'

import './APIReference.styles.css'
import { API } from '@stoplight/elements'
import type { ExtensionAddonRenderer } from '@stoplight/elements-core'
import '@stoplight/elements/styles.min.css'

interface OpenAPISpecInnerProps {
  specContent: string
}

const STABILITY_PILLS = {
  alpha: {
    label: 'Alpha',
    title:
      'This endpoint is in alpha. It is experimental and may change or be removed without notice.',
  },
  beta: {
    label: 'Beta',
    title: 'This endpoint is in beta. It may change before it is considered stable.',
  },
} as const

type PillStability = keyof typeof STABILITY_PILLS

function isPillStability(value: unknown): value is PillStability {
  return value === 'alpha' || value === 'beta'
}

// Elements calls this for every operation, model, and JSON schema property row
// that carries an `x-*` key, and renders the result under the description.
// Only `alpha` and `beta` get a marker; `stable` (and spec versions published
// before `x-stability` existed) render nothing.
const renderStabilityPill: ExtensionAddonRenderer = ({ vendorExtensions }) => {
  const stability = vendorExtensions['x-stability']
  if (!isPillStability(stability)) return null

  const { label, title } = STABILITY_PILLS[stability]
  return (
    <span
      className={`api-stability-pill api-stability-pill--${stability}`}
      title={title}
      data-testid="api-stability-pill"
    >
      {label}
    </span>
  )
}

export default function OpenAPISpecInner({ specContent }: OpenAPISpecInnerProps) {
  return (
    <API
      apiDescriptionDocument={specContent}
      router="hash"
      layout="responsive"
      hideTryIt
      renderExtensionAddon={renderStabilityPill}
    />
  )
}
