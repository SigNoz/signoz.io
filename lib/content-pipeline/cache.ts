import * as fs from 'fs/promises'
import { createReadStream, createWriteStream } from 'fs'
import * as path from 'path'
import { createHash } from 'crypto'
import pLimit from 'p-limit'

const FILE_READ_CONCURRENCY = 32

interface CacheManifest {
  schemaHash: string
  entries: Record<string, { hash: string; slug: string }>
}

export class ContentCache {
  private cacheDir: string
  private manifest: CacheManifest | null = null
  private manifestPath: string
  private dirty = false
  private currentSlugs: Set<string> = new Set()

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir
    this.manifestPath = path.join(cacheDir, '.manifest.json')
  }

  async init(schemaHash: string): Promise<void> {
    await fs.mkdir(this.cacheDir, { recursive: true })

    try {
      const data = await fs.readFile(this.manifestPath, 'utf-8')
      this.manifest = JSON.parse(data)

      // Invalidate entire cache if schema changed
      if (this.manifest!.schemaHash !== schemaHash) {
        await this.clear()
        this.manifest = { schemaHash, entries: {} }
      }
    } catch {
      this.manifest = { schemaHash, entries: {} }
    }
    this.dirty = false
    this.currentSlugs.clear()
  }

  private ensureInitialized(): void {
    if (!this.manifest) {
      this.manifest = { schemaHash: '', entries: {} }
    }
  }

  async get<T>(filePath: string, hash: string): Promise<{ data: T; slug: string } | undefined> {
    this.ensureInitialized()

    const entry = this.manifest!.entries[filePath]
    if (!entry || entry.hash !== hash) return undefined

    try {
      // Read meta and body separately, then merge
      const metaPath = path.join(this.cacheDir, `${entry.slug}.meta.json`)
      const bodyPath = path.join(this.cacheDir, `${entry.slug}.body.json`)

      const [metaData, bodyData] = await Promise.all([
        fs.readFile(metaPath, 'utf-8'),
        fs.readFile(bodyPath, 'utf-8'),
      ])

      this.currentSlugs.add(entry.slug)
      const meta = JSON.parse(metaData)
      const body = JSON.parse(bodyData)
      return { data: { ...meta, body } as T, slug: entry.slug }
    } catch {
      return undefined
    }
  }

  // Get only metadata - reads only meta file, body.code never touches memory
  async getMetaOnly(
    filePath: string,
    hash: string
  ): Promise<{ meta: Record<string, unknown>; slug: string } | undefined> {
    this.ensureInitialized()

    const entry = this.manifest!.entries[filePath]
    if (!entry || entry.hash !== hash) return undefined

    try {
      const metaPath = path.join(this.cacheDir, `${entry.slug}.meta.json`)
      const data = await fs.readFile(metaPath, 'utf-8')
      this.currentSlugs.add(entry.slug)
      return { meta: JSON.parse(data), slug: entry.slug }
    } catch {
      return undefined
    }
  }

  async set<T>(filePath: string, hash: string, slug: string, data: T): Promise<void> {
    this.ensureInitialized()

    const metaPath = path.join(this.cacheDir, `${slug}.meta.json`)
    const bodyPath = path.join(this.cacheDir, `${slug}.body.json`)

    // Split document into meta and body for separate storage
    const { body, ...meta } = data as any

    // Ensure parent directories exist for nested slugs (e.g., "docs/intro")
    await fs.mkdir(path.dirname(metaPath), { recursive: true })

    // Write meta and body in parallel
    await Promise.all([
      fs.writeFile(metaPath, JSON.stringify(meta)),
      fs.writeFile(bodyPath, JSON.stringify(body)),
    ])

    this.manifest!.entries[filePath] = { hash, slug }
    this.currentSlugs.add(slug)
    this.dirty = true
  }

  // Write only metadata - use when body.json is already written (e.g., by worker)
  async setMetaOnly(
    filePath: string,
    hash: string,
    slug: string,
    meta: Record<string, unknown>
  ): Promise<void> {
    this.ensureInitialized()

    const metaPath = path.join(this.cacheDir, `${slug}.meta.json`)
    await fs.mkdir(path.dirname(metaPath), { recursive: true })
    await fs.writeFile(metaPath, JSON.stringify(meta))

    this.manifest!.entries[filePath] = { hash, slug }
    this.currentSlugs.add(slug)
    this.dirty = true
  }

  // Track slug in manifest only - files already written by worker
  trackSlug(filePath: string, hash: string, slug: string): void {
    this.ensureInitialized()
    this.manifest!.entries[filePath] = { hash, slug }
    this.currentSlugs.add(slug)
    this.dirty = true
  }

  async hashFiles(filePaths: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>()
    const limit = pLimit(FILE_READ_CONCURRENCY)

    await Promise.all(
      filePaths.map((filePath) =>
        limit(async () => {
          // Stream-based hashing - avoids loading entire file into memory
          const hash = createHash('sha256')
          const stream = createReadStream(filePath)
          for await (const chunk of stream) {
            hash.update(chunk)
          }
          results.set(filePath, hash.digest('hex'))
        })
      )
    )

    return results
  }

  async clear(): Promise<void> {
    try {
      await this.deleteJsonFilesRecursive(this.cacheDir)
    } catch {}
    this.dirty = false
  }

  private async deleteJsonFilesRecursive(dir: string): Promise<void> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          await this.deleteJsonFilesRecursive(fullPath)
          // Try to remove empty directory
          try {
            await fs.rmdir(fullPath)
          } catch {}
        } else if (
          (entry.name.endsWith('.meta.json') || entry.name.endsWith('.body.json')) &&
          entry.name !== '.manifest.json'
        ) {
          await fs.unlink(fullPath).catch(() => {})
        }
      }
    } catch {}
  }

  async cleanupOrphans(): Promise<number> {
    let removed = 0
    try {
      removed = await this.cleanupOrphansRecursive(this.cacheDir)
    } catch {}
    return removed
  }

  private async cleanupOrphansRecursive(dir: string): Promise<number> {
    let removed = 0
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          removed += await this.cleanupOrphansRecursive(fullPath)
          // Try to remove empty directory
          try {
            await fs.rmdir(fullPath)
          } catch {}
        } else if (
          (entry.name.endsWith('.meta.json') || entry.name.endsWith('.body.json')) &&
          entry.name !== '.manifest.json' &&
          entry.name !== 'meta.json'
        ) {
          // Get slug from path relative to cacheDir (strip .meta.json or .body.json)
          const relativePath = path.relative(this.cacheDir, fullPath)
          const slug = relativePath.replace(/\.(meta|body)\.json$/, '')
          if (!this.currentSlugs.has(slug)) {
            await fs.unlink(fullPath).catch(() => {})
            removed++
          }
        }
      }
    } catch {}
    return removed
  }

  async flush(): Promise<void> {
    if (!this.dirty || !this.manifest) return
    await fs.writeFile(this.manifestPath, JSON.stringify(this.manifest))
    this.dirty = false
  }

  // Stream-write a JSON array to avoid building huge string in memory
  async writeJsonArrayStreaming(
    filePath: string,
    items: Iterable<unknown>,
    prettyPrint = false
  ): Promise<void> {
    const stream = createWriteStream(filePath)
    const indent = prettyPrint ? '  ' : ''
    const newline = prettyPrint ? '\n' : ''

    return new Promise((resolve, reject) => {
      stream.on('error', reject)
      stream.on('finish', resolve)

      stream.write('[' + newline)

      let first = true
      for (const item of items) {
        if (!first) {
          stream.write(',' + newline)
        }
        first = false

        const json = JSON.stringify(item, null, prettyPrint ? 2 : undefined)
        if (prettyPrint) {
          // Indent each line of the JSON
          stream.write(
            json
              .split('\n')
              .map((line) => indent + line)
              .join('\n')
          )
        } else {
          stream.write(json)
        }
      }

      stream.write(newline + ']' + newline)
      stream.end()
    })
  }
}
