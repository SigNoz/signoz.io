import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'
import Piscina from 'piscina'
import { glob } from 'fast-glob'
import type { Collection, CollectionsMap } from './define'
import { ContentCache } from './cache'
import { generateTypes } from './types-generator'
import type { CompileTask, CompileResult } from './mdx-worker'

// Limit workers to balance speed vs memory (~300MB per worker)
const MAX_WORKERS = Math.min(os.cpus().length, 8)

// Note: __dirname resolves correctly when running via tsx (which preserves it).
// If this pipeline is ever bundled differently, consider using import.meta.url instead.
const workerPath = path.resolve(__dirname, 'mdx-worker.ts')

interface BuildOptions {
  outputDir: string
  prettyPrint?: boolean
  force?: boolean
}

interface InternalBuildOptions extends BuildOptions {
  pool: Piscina
}

interface BuildResult<T> {
  documents: T[]
  cached: number
  compiled: number
}

// Metadata-only reference (no body.code in memory)
interface DocMeta {
  filePath: string
  slug: string
  meta: Record<string, unknown>
}

async function buildCollectionInternal<T>(
  collection: Collection,
  options: InternalBuildOptions
): Promise<BuildResult<T>> {
  const { outputDir, prettyPrint = false, pool } = options

  // Use outputDir as both cache and output (unified directory)
  const collectionDir = path.join(outputDir, collection.name)
  const schemaHash = JSON.stringify(collection.fields)
  const cache = new ContentCache(collectionDir)
  await cache.init(schemaHash)

  const pattern = path.join(collection.directory, collection.include)
  const files = await glob(pattern, { absolute: true })

  console.log(`  ${collection.name}: ${files.length} files`)

  if (files.length === 0) {
    console.log(`    -> 0 cached, 0 compiled`)
    return { documents: [], cached: 0, compiled: 0 }
  }

  const fileHashes = await cache.hashFiles(files)

  // Track only metadata references, not full documents
  const fileToMeta = new Map<string, DocMeta>()
  const toCompile: Array<{ filePath: string; hash: string }> = []
  let cachedCount = 0

  // Phase 1: Check cache - only extract metadata, don't parse body.code
  for (const filePath of files) {
    const hash = fileHashes.get(filePath)!
    if (options.force) {
      toCompile.push({ filePath, hash })
    } else {
      // Use getMetaOnly to avoid parsing large body.code strings
      const cached = await cache.getMetaOnly(filePath, hash)
      if (cached) {
        fileToMeta.set(filePath, { filePath, slug: cached.slug, meta: cached.meta })
        cachedCount++
      } else {
        toCompile.push({ filePath, hash })
      }
    }
  }

  // Phase 2: Compile in parallel - worker does ALL heavy lifting
  // Worker: compiles MDX, applies computed fields, writes meta.json + body.json
  // Returns only: slugPath + meta (for tracking)
  if (toCompile.length > 0) {
    const tasks: CompileTask[] = toCompile.map(({ filePath }) => ({
      filePath,
      collectionName: collection.name, // Worker looks up collection by name
      outputDir: collectionDir,
    }))

    // Let Piscina handle concurrency
    const results = await Promise.all(tasks.map((task) => pool.run(task) as Promise<CompileResult>))

    // Just update manifest and tracking - files already written by worker
    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      const { filePath, hash } = toCompile[i]

      // Update cache manifest (files already on disk from worker)
      cache.trackSlug(filePath, hash, result.slugPath)
      fileToMeta.set(filePath, { filePath, slug: result.slugPath, meta: result.meta })
    }
  }
  const compiledCount = toCompile.length

  // Cleanup orphaned files (e.g., from renamed slugs)
  const orphansRemoved = await cache.cleanupOrphans()
  if (orphansRemoved > 0) {
    console.log(`    -> removed ${orphansRemoved} orphaned files`)
  }

  await cache.flush()

  // Stream-write meta.json to avoid building huge JSON string in memory
  const metaPath = path.join(collectionDir, 'meta.json')
  const metaIterator = (function* () {
    for (const f of files) {
      yield fileToMeta.get(f)!.meta
    }
  })()
  await cache.writeJsonArrayStreaming(metaPath, metaIterator, prettyPrint)

  console.log(`    -> ${cachedCount} cached, ${compiledCount} compiled`)

  // Return empty documents array - callers should read from cache files
  // This avoids loading all documents into memory at once
  return { documents: [] as T[], cached: cachedCount, compiled: compiledCount }
}

export async function buildAllCollections(
  collections: CollectionsMap,
  options: BuildOptions
): Promise<void> {
  const pool = new Piscina({
    filename: workerPath,
    maxThreads: MAX_WORKERS,
    execArgv: ['--import', 'tsx'],
    // Limit memory per worker to prevent OOM
    resourceLimits: {
      maxOldGenerationSizeMb: 128,
      maxYoungGenerationSizeMb: 48,
    },
  })

  console.log(`Using ${MAX_WORKERS} worker threads`)

  const internalOptions: InternalBuildOptions = { ...options, pool }

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
    maxThreads: MAX_WORKERS,
    execArgv: ['--import', 'tsx'],
    resourceLimits: {
      maxOldGenerationSizeMb: 128,
      maxYoungGenerationSizeMb: 48,
    },
  })

  try {
    return await buildCollectionInternal<T>(collection, { ...options, pool })
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
