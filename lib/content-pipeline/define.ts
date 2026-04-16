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

export type ComputedFieldsFn<T, R> = (doc: T & DocumentBase, helpers: CollectionHelpers) => R

export interface CollectionConfig<T extends ZodRawShape, C extends ZodRawShape> {
  name: string
  directory: string
  include: string
  fields: T
  computedFields: C
  computedFieldsFn: ComputedFieldsFn<z.infer<ZodObject<T>>, z.infer<ZodObject<C>>>
}

export interface Collection<
  T extends ZodRawShape = ZodRawShape,
  C extends ZodRawShape = ZodRawShape,
> {
  name: string
  directory: string
  include: string
  schema: ZodObject<T>
  computedFieldsSchema: ZodObject<C>
  computedFieldsFn: ComputedFieldsFn<z.infer<ZodObject<T>>, z.infer<ZodObject<C>>>
}

export function defineCollection<T extends ZodRawShape, C extends ZodRawShape>(
  config: CollectionConfig<T, C>
): Collection<T, C> {
  return {
    name: config.name,
    directory: config.directory,
    include: config.include,
    schema: z.object(config.fields),
    computedFieldsSchema: z.object(config.computedFields),
    computedFieldsFn: config.computedFieldsFn,
  }
}

export type CollectionsMap = Record<string, Collection>
