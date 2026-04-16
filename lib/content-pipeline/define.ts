// lib/content-pipeline/define.ts
import { z, ZodObject, ZodRawShape } from 'zod'

export { z }

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

export type ComputedFieldsFn<T> = (
  doc: T & DocumentBase,
  helpers: CollectionHelpers
) => Record<string, unknown>

export interface CollectionConfig<T extends ZodRawShape> {
  name: string
  directory: string
  include: string
  fields: T
  computedFields: ComputedFieldsFn<z.infer<ZodObject<T>>>
}

export interface Collection<T extends ZodRawShape = ZodRawShape> {
  name: string
  directory: string
  include: string
  schema: ZodObject<T>
  computedFields: ComputedFieldsFn<z.infer<ZodObject<T>>>
}

export function defineCollection<T extends ZodRawShape>(
  config: CollectionConfig<T>
): Collection<T> {
  return {
    name: config.name,
    directory: config.directory,
    include: config.include,
    schema: z.object(config.fields),
    computedFields: config.computedFields,
  }
}

export type CollectionsMap = Record<string, Collection>
