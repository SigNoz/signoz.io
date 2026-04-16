import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'
import Piscina from 'piscina'
import { glob } from 'fast-glob'
import readingTimeLib from 'reading-time'
import GithubSlugger from 'github-slugger'
import pLimit from 'p-limit'
import type { Collection, CollectionHelpers, CollectionsMap, TocItem, DocumentBase } from './define'
import { ContentCache } from './cache'
import { generateTypes } from './types-generator'
import type { CompileTask, CompileResult } from './mdx-worker'

const CPU_COUNT = os.cpus().length
const IO_CONCURRENCY = CPU_COUNT * 4

const workerPath = path.resolve(__dirname, 'mdx-worker.ts')

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

interface BuildOptions {
  outputDir: string
  cacheDir: string
  prettyPrint?: boolean
}

interface InternalBuildOptions extends BuildOptions {
  pool: Piscina
  ioLimit: ReturnType<typeof pLimit>
}

interface BuildResult<T> {
  documents: T[]
  cached: number
  compiled: number
}

async function buildCollectionInternal<T>(
  collection: Collection,
  options: InternalBuildOptions
): Promise<BuildResult<T>> {
  const { outputDir, cacheDir, prettyPrint = false, pool, ioLimit } = options
  const helpers = createHelpers()

  const collectionCacheDir = path.join(cacheDir, collection.name)
  const schemaHash = JSON.stringify(collection.schema.shape)
  const cache = new ContentCache(collectionCacheDir)
  await cache.init(schemaHash)

  const pattern = path.join(collection.directory, collection.include)
  const files = await glob(pattern, { absolute: true })

  console.log(`  ${collection.name}: ${files.length} files`)

  if (files.length === 0) {
    console.log(`    -> 0 cached, 0 compiled`)
    return { documents: [], cached: 0, compiled: 0 }
  }

  const fileHashes = await cache.hashFiles(files)

  const cachedDocs: Array<{ filePath: string; doc: T }> = []
  const toCompile: Array<{ filePath: string; hash: string }> = []

  for (const filePath of files) {
    const hash = fileHashes.get(filePath)!
    const cached = await cache.get<T>(filePath, hash)
    if (cached) {
      cachedDocs.push({ filePath, doc: cached })
    } else {
      toCompile.push({ filePath, hash })
    }
  }

  const compiledDocs: Array<{ filePath: string; doc: T }> = []

  if (toCompile.length > 0) {
    const tasks: CompileTask[] = toCompile.map(({ filePath }) => ({
      filePath,
      collectionDirectory: collection.directory,
    }))

    const results = await Promise.all(tasks.map((task) => pool.run(task) as Promise<CompileResult>))

    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      const { filePath, hash } = toCompile[i]

      const validated = collection.schema.parse(result.frontmatter)
      const baseDoc: DocumentBase = {
        _file: {
          path: result.relativePath,
          directory: path.dirname(result.relativePath),
          name: result.fileName,
        },
        body: {
          raw: result.content,
          code: result.code,
        },
      }

      const docWithFields = { ...validated, ...baseDoc }
      const computed = collection.computedFieldsFn(docWithFields as any, helpers)
      const doc = { ...docWithFields, ...computed } as T

      await cache.set(filePath, hash, doc)
      compiledDocs.push({ filePath, doc })
    }
  }

  await cache.flush()

  // Merge documents maintaining file order
  const fileToDoc = new Map<string, T>()
  for (const { filePath, doc } of cachedDocs) fileToDoc.set(filePath, doc)
  for (const { filePath, doc } of compiledDocs) fileToDoc.set(filePath, doc)
  const documents = files.map((f) => fileToDoc.get(f)!)

  const collectionOutputDir = path.join(outputDir, collection.name)
  await fs.mkdir(collectionOutputDir, { recursive: true })

  const jsonSpace = prettyPrint ? 2 : undefined

  const dirsNeeded = new Set<string>()
  const writeOps: Array<{ path: string; content: string }> = []

  for (const doc of documents) {
    const slug = (doc as any).slug || (doc as any)._file.name.replace(/\.mdx$/, '')
    const slugPath = slug.replace(/\/$/, '') || 'index'
    const outputPath = path.join(collectionOutputDir, `${slugPath}.json`)
    dirsNeeded.add(path.dirname(outputPath))
    writeOps.push({ path: outputPath, content: JSON.stringify(doc, null, jsonSpace) })
  }

  await Promise.all([...dirsNeeded].map((dir) => fs.mkdir(dir, { recursive: true })))
  await Promise.all(writeOps.map(({ path: p, content }) => ioLimit(() => fs.writeFile(p, content))))

  const meta = documents.map((doc: any) => {
    const { body, ...rest } = doc
    return rest
  })
  await fs.writeFile(
    path.join(collectionOutputDir, 'meta.json'),
    JSON.stringify(meta, null, jsonSpace)
  )

  console.log(`    -> ${cachedDocs.length} cached, ${compiledDocs.length} compiled`)

  return { documents, cached: cachedDocs.length, compiled: compiledDocs.length }
}

export async function buildAllCollections(
  collections: CollectionsMap,
  options: BuildOptions
): Promise<void> {
  const { outputDir } = options

  const pool = new Piscina({
    filename: workerPath,
    maxThreads: CPU_COUNT,
    execArgv: ['--import', 'tsx'],
  })

  const ioLimit = pLimit(IO_CONCURRENCY)

  console.log(`Using ${CPU_COUNT} worker threads`)

  const internalOptions: InternalBuildOptions = { ...options, pool, ioLimit }

  try {
    const collectionArray = Object.values(collections)
    await Promise.all(
      collectionArray.map((collection) => buildCollectionInternal(collection, internalOptions))
    )

    // Write generated types to a separate directory outside .content/
    // This prevents webpack from trying to bundle .d.ts files
    const types = generateTypes(collections)
    const generatedDir = path.resolve('types', 'content-generated')
    await fs.mkdir(generatedDir, { recursive: true })
    await fs.writeFile(path.join(generatedDir, 'types.d.ts'), types)

    const indexContent = generateIndexFile(collections)
    await fs.writeFile(path.join(generatedDir, 'index.ts'), indexContent)
  } finally {
    await pool.destroy()
  }
}

export async function buildCollection<T>(
  collection: Collection,
  options: BuildOptions
): Promise<BuildResult<T>> {
  const pool = new Piscina({
    filename: workerPath,
    maxThreads: CPU_COUNT,
    execArgv: ['--import', 'tsx'],
  })
  const ioLimit = pLimit(IO_CONCURRENCY)

  try {
    return await buildCollectionInternal<T>(collection, { ...options, pool, ioLimit })
  } finally {
    await pool.destroy()
  }
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
