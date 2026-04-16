// lib/content-pipeline/core.ts
import * as fs from 'fs/promises'
import * as path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import { glob } from 'fast-glob'
import readingTimeLib from 'reading-time'
import GithubSlugger from 'github-slugger'
import type { Collection, CollectionHelpers, CollectionsMap, TocItem, DocumentBase } from './define'
import { ContentCache } from './cache'
import { generateTypes } from './types-generator'

export function createHelpers(): CollectionHelpers {
  return {
    readingTime(text: string) {
      const result = readingTimeLib(text)
      return {
        minutes: Math.ceil(result.minutes),
        words: result.words,
        text: result.text,
      }
    },

    extractToc(markdown: string): TocItem[] {
      const slugger = new GithubSlugger()
      const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
      const regXCodeBlock = /```[\s\S]*?```/g

      const contentWithoutCodeBlocks = markdown.replace(regXCodeBlock, '')
      const headings: TocItem[] = []

      for (const match of contentWithoutCodeBlocks.matchAll(regXHeader)) {
        const flag = match.groups?.flag
        const content = match.groups?.content?.trim()

        if (content) {
          headings.push({
            value: content,
            url: `#${slugger.slug(content)}`,
            depth: flag?.length ?? 1,
          })
        }
      }

      return headings
    },
  }
}

interface MdxPluginOptions {
  remarkPlugins?: any[]
  rehypePlugins?: any[]
}

export async function compileDocument<T>(
  filePath: string,
  collection: Collection,
  mdxOptions?: MdxPluginOptions
): Promise<T & DocumentBase> {
  const helpers = createHelpers()
  const raw = await fs.readFile(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)

  // Validate frontmatter against schema
  const validated = collection.schema.parse(frontmatter)

  // Compile MDX
  const cwd = process.cwd()
  const { code } = await bundleMDX({
    source: content,
    cwd,
    mdxOptions: (opts) => ({
      ...opts,
      remarkPlugins: [...(opts.remarkPlugins ?? []), ...(mdxOptions?.remarkPlugins ?? [])],
      rehypePlugins: [...(opts.rehypePlugins ?? []), ...(mdxOptions?.rehypePlugins ?? [])],
    }),
    esbuildOptions: (opts) => ({
      ...opts,
      // Mark component imports as external - they'll be resolved at runtime
      external: ['@/components/*', '@/layouts/*', '@/data/*', '@/shared/*', 'react', 'react-dom'],
      // Define path aliases for resolution
      alias: {
        '@/components': path.join(cwd, 'components'),
        '@/layouts': path.join(cwd, 'layouts'),
        '@/data': path.join(cwd, 'data'),
        '@/shared': path.join(cwd, 'shared'),
      },
    }),
  })

  // Build file info
  const directory = path.dirname(filePath)
  const relativePath = path.relative(collection.directory, filePath)
  const fileName = path.basename(filePath)

  const baseDoc: DocumentBase = {
    _file: {
      path: relativePath,
      directory: path.dirname(relativePath),
      name: fileName,
    },
    body: {
      raw: content,
      code,
    },
  }

  // Compute derived fields
  const docWithFields = { ...validated, ...baseDoc }
  const computed = collection.computedFields(docWithFields as any, helpers)

  return { ...docWithFields, ...computed } as T & DocumentBase
}

interface BuildOptions {
  outputDir: string
  cacheDir: string
  mdxOptions?: MdxPluginOptions
}

interface BuildResult<T> {
  documents: T[]
  cached: number
  compiled: number
}

export async function buildCollection<T>(
  collection: Collection,
  options: BuildOptions
): Promise<BuildResult<T>> {
  const { outputDir, cacheDir, mdxOptions } = options

  // Initialize cache
  const schemaHash = JSON.stringify(collection.schema.shape)
  const cache = new ContentCache(cacheDir)
  await cache.init(schemaHash)

  // Discover files
  const pattern = path.join(collection.directory, collection.include)
  const files = await glob(pattern, { absolute: true })

  // Compile documents
  const documents: T[] = []
  let cached = 0
  let compiled = 0

  for (const filePath of files) {
    const hash = await cache.hashFile(filePath)

    // Try cache first
    let doc = await cache.get<T>(filePath, hash)

    if (doc) {
      cached++
    } else {
      doc = await compileDocument<T>(filePath, collection, mdxOptions)
      await cache.set(filePath, hash, doc)
      compiled++
    }

    documents.push(doc)
  }

  // Write output
  const collectionOutputDir = path.join(outputDir, collection.name)
  await fs.mkdir(collectionOutputDir, { recursive: true })

  // Write individual files
  for (const doc of documents) {
    const slug = (doc as any).slug || (doc as any)._file.name.replace(/\.mdx$/, '')
    // Handle nested slugs by creating subdirectories
    const slugPath = slug.replace(/\/$/, '') || 'index' // Remove trailing slash, default to 'index'
    const outputPath = path.join(collectionOutputDir, `${slugPath}.json`)
    // Ensure parent directory exists for nested paths
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, JSON.stringify(doc, null, 2))
  }

  // Write meta.json (without body)
  const meta = documents.map((doc: any) => {
    const { body, ...rest } = doc
    return rest
  })
  await fs.writeFile(path.join(collectionOutputDir, 'meta.json'), JSON.stringify(meta, null, 2))

  return { documents, cached, compiled }
}

export async function buildAllCollections(
  collections: CollectionsMap,
  options: BuildOptions
): Promise<void> {
  const { outputDir } = options

  // Build each collection
  for (const collection of Object.values(collections)) {
    await buildCollection(collection, options)
  }

  // Generate types
  const types = generateTypes(collections)
  const generatedDir = path.join(outputDir, 'generated')
  await fs.mkdir(generatedDir, { recursive: true })
  await fs.writeFile(path.join(generatedDir, 'types.d.ts'), types)

  // Generate index.ts for re-exports
  const indexContent = generateIndexFile(collections)
  await fs.writeFile(path.join(generatedDir, 'index.ts'), indexContent)
}

function generateIndexFile(collections: CollectionsMap): string {
  const exports = Object.keys(collections)
    .map((name) => `export type { ${name}, ${name}Meta } from './types'`)
    .join('\n')

  return `// Auto-generated by content-pipeline
${exports}
export type { DocumentTypes } from './types'
`
}
