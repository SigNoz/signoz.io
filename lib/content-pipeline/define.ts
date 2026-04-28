// Field definition types (replaces Zod)
export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object' | 'any'

export interface FieldDef {
  type: FieldType
  required?: boolean
  default?: unknown
  of?: FieldType | FieldDef // For arrays
  nullable?: boolean
  shape?: FieldsShape // For nested objects
}

// Shorthand: just the type string means required field
export type FieldDefOrShorthand = FieldDef | FieldType

export type FieldsShape = Record<string, FieldDefOrShorthand>

// Normalize shorthand to full FieldDef
export function normalizeField(field: FieldDefOrShorthand): FieldDef {
  if (typeof field === 'string') {
    return { type: field, required: true }
  }
  return field
}

export interface FileInfo {
  path: string
  directory: string
  name: string
}

export interface DocumentBase {
  _file: FileInfo
  body: {
    raw: string
    code: string
  }
}

export interface CollectionHelpers {
  readingTime: (text: string) => { minutes: number; words: number; text: string }
  extractToc: (markdown: string) => TocItem[]
}

export interface TocItem {
  value: string
  url: string
  depth: number
}

export type ComputedFieldsFn<T, R> = (doc: T & DocumentBase, helpers: CollectionHelpers) => R

export interface CollectionConfig<F extends FieldsShape, C extends FieldsShape> {
  name: string
  directory: string
  include: string
  fields: F
  computedFields: C
  computedFieldsFn: ComputedFieldsFn<any, any>
}

export interface Collection {
  name: string
  directory: string
  include: string
  fields: FieldsShape
  computedFields: FieldsShape
  computedFieldsFn: ComputedFieldsFn<any, any>
}

export function defineCollection<F extends FieldsShape, C extends FieldsShape>(
  config: CollectionConfig<F, C>
): Collection {
  return {
    name: config.name,
    directory: config.directory,
    include: config.include,
    fields: config.fields,
    computedFields: config.computedFields,
    computedFieldsFn: config.computedFieldsFn,
  }
}

export type CollectionsMap = Record<string, Collection>

// Coercion helper - applies defaults and coerces dates
export function coerceFields(
  data: Record<string, unknown>,
  fields: FieldsShape
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...data }

  for (const [key, fieldDef] of Object.entries(fields)) {
    const field = normalizeField(fieldDef)
    const value = result[key]

    // Apply default if value is undefined
    if (value === undefined && field.default !== undefined) {
      result[key] = field.default
      continue
    }

    // Coerce dates
    if (field.type === 'date' && value !== undefined) {
      result[key] = value instanceof Date ? value : new Date(value as string)
    }

    // Coerce arrays with defaults
    if (field.type === 'array' && value === undefined && field.default !== undefined) {
      result[key] = field.default
    }
  }

  return result
}
