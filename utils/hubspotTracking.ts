export type HubspotSubmissionValues = Record<string, unknown>

export const EXCLUDED_SUBMISSION_FIELDS = new Set(['hs_context'])

export const normalizeFieldKey = (key: string) =>
  key
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()

export const serializeValue = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map((item) => serializeValue(item)).join(', ')
  if (value === null || typeof value === 'undefined') return ''

  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

export const flattenSubmissionValues = (values: HubspotSubmissionValues) =>
  Object.fromEntries(
    Object.entries(values)
      .filter(([key]) => !EXCLUDED_SUBMISSION_FIELDS.has(key.toLowerCase()))
      .map(([key, value]) => [`hubspot_field_${normalizeFieldKey(key)}`, serializeValue(value)])
  )

export const filterSubmissionValues = (values: HubspotSubmissionValues) =>
  Object.fromEntries(
    Object.entries(values).filter(([key]) => !EXCLUDED_SUBMISSION_FIELDS.has(key.toLowerCase()))
  )
