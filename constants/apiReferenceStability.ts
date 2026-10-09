export const STABILITY_EXTENSION_KEY = 'x-signoz-stability'
export const STABILITY_LEVELS_EXTENSION_KEY = 'x-signoz-stability-levels'

export const STABILITY_ORDER = ['development', 'alpha', 'beta', 'stable'] as const

export type StabilityLevel = (typeof STABILITY_ORDER)[number]

export interface StabilityCopy {
  label: string
  shortLabel: string
  description: string
}

export type StabilityCopyMap = Record<StabilityLevel, StabilityCopy>

export interface StabilityIndex {
  byOperationId: Record<string, StabilityLevel>
  copy: StabilityCopyMap
}

// Used until the spec carries x-signoz-stability-levels itself.
export const DEFAULT_STABILITY_COPY: StabilityCopyMap = {
  development: {
    label: 'Development',
    shortLabel: 'DEV',
    description:
      'Not yet complete. This endpoint may change or disappear in any release and should not be used outside of testing.',
  },
  alpha: {
    label: 'Alpha',
    shortLabel: 'ALPHA',
    description: 'Ready for limited, non-critical use. Breaking changes may ship in any release.',
  },
  beta: {
    label: 'Beta',
    shortLabel: 'BETA',
    description:
      'The request and response shapes are settled. Breaking changes are still possible but will be kept to a minimum.',
  },
  stable: {
    label: 'Stable',
    shortLabel: 'STABLE',
    description: 'Generally available. Bugs are supported and breaking changes are not expected.',
  },
}

export const EMPTY_STABILITY_INDEX: StabilityIndex = {
  byOperationId: {},
  copy: DEFAULT_STABILITY_COPY,
}

export function isStabilityLevel(value: unknown): value is StabilityLevel {
  return typeof value === 'string' && STABILITY_ORDER.includes(value as StabilityLevel)
}
