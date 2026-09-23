import './StabilityPill.styles.css'
import type { ExtensionAddonRenderer } from '@stoplight/elements-core'

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

export type PillStability = keyof typeof STABILITY_PILLS

function isPillStability(value: unknown): value is PillStability {
  return value === 'alpha' || value === 'beta'
}

interface StabilityPillProps {
  stability: PillStability
}

export default function StabilityPill({ stability }: StabilityPillProps) {
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

// Elements calls this for every operation, model, and JSON schema property row
// that carries an `x-*` key, and renders the result under the description.
// Only `alpha` and `beta` get a marker; `stable` (and spec versions published
// before `x-stability` existed) render nothing.
export const renderStabilityPill: ExtensionAddonRenderer = ({ vendorExtensions }) => {
  const stability = vendorExtensions['x-stability']
  if (!isPillStability(stability)) return null

  return <StabilityPill stability={stability} />
}
