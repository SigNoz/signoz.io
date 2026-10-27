import { parse as parseYaml } from 'yaml'
import {
  DEFAULT_STABILITY_COPY,
  EMPTY_STABILITY_INDEX,
  STABILITY_EXTENSION_KEY,
  STABILITY_LEVELS_EXTENSION_KEY,
  STABILITY_ORDER,
  isStabilityLevel,
  type StabilityCopyMap,
  type StabilityIndex,
  type StabilityLevel,
} from '@/constants/apiReferenceStability'

const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readOperations(spec: Record<string, unknown>): Record<string, StabilityLevel> {
  const byOperationId: Record<string, StabilityLevel> = {}
  const paths = spec.paths
  if (!isRecord(paths)) return byOperationId

  for (const pathItem of Object.values(paths)) {
    if (!isRecord(pathItem)) continue

    for (const [method, operation] of Object.entries(pathItem)) {
      if (!HTTP_METHODS.has(method) || !isRecord(operation)) continue

      const { operationId } = operation
      const level = operation[STABILITY_EXTENSION_KEY]
      if (typeof operationId !== 'string' || !operationId) continue
      if (!isStabilityLevel(level)) continue

      byOperationId[operationId] = level
    }
  }

  return byOperationId
}

function readCopy(spec: Record<string, unknown>): StabilityCopyMap {
  const declared = spec[STABILITY_LEVELS_EXTENSION_KEY]
  if (!isRecord(declared)) return DEFAULT_STABILITY_COPY

  const copy = { ...DEFAULT_STABILITY_COPY }

  for (const level of STABILITY_ORDER) {
    const entry = declared[level]
    if (!isRecord(entry)) continue

    const { label, shortLabel, description } = entry
    copy[level] = {
      label: typeof label === 'string' && label ? label : copy[level].label,
      shortLabel:
        typeof shortLabel === 'string' && shortLabel ? shortLabel : copy[level].shortLabel,
      description:
        typeof description === 'string' && description ? description : copy[level].description,
    }
  }

  return copy
}

export function parseStabilityIndex(specContent: string): StabilityIndex {
  let spec: unknown
  try {
    spec = parseYaml(specContent)
  } catch (err) {
    console.error('[api-reference] Failed to parse spec for stability badges:', err)
    return EMPTY_STABILITY_INDEX
  }

  if (!isRecord(spec)) return EMPTY_STABILITY_INDEX

  return { byOperationId: readOperations(spec), copy: readCopy(spec) }
}
