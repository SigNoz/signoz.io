import * as fs from 'fs/promises'
import * as path from 'path'
import { createHash } from 'crypto'

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
      const cachedPath = path.join(this.cacheDir, `${entry.slug}.json`)
      const data = await fs.readFile(cachedPath, 'utf-8')
      this.currentSlugs.add(entry.slug)
      return { data: JSON.parse(data), slug: entry.slug }
    } catch {
      return undefined
    }
  }

  async set<T>(filePath: string, hash: string, slug: string, data: T): Promise<void> {
    this.ensureInitialized()

    const cachedPath = path.join(this.cacheDir, `${slug}.json`)

    // Ensure parent directories exist for nested slugs (e.g., "docs/intro")
    await fs.mkdir(path.dirname(cachedPath), { recursive: true })
    await fs.writeFile(cachedPath, JSON.stringify(data))

    this.manifest!.entries[filePath] = { hash, slug }
    this.currentSlugs.add(slug)
    this.dirty = true
  }

  async hashFile(filePath: string): Promise<string> {
    const content = await fs.readFile(filePath)
    return createHash('sha256').update(new Uint8Array(content)).digest('hex')
  }

  async hashFiles(filePaths: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>()
    const hashes = await Promise.all(
      filePaths.map(async (filePath) => {
        const content = await fs.readFile(filePath)
        return {
          filePath,
          hash: createHash('sha256').update(new Uint8Array(content)).digest('hex'),
        }
      })
    )
    for (const { filePath, hash } of hashes) {
      results.set(filePath, hash)
    }
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
        } else if (entry.name.endsWith('.json') && entry.name !== '.manifest.json') {
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
          entry.name.endsWith('.json') &&
          entry.name !== '.manifest.json' &&
          entry.name !== 'meta.json'
        ) {
          // Get slug from path relative to cacheDir
          const relativePath = path.relative(this.cacheDir, fullPath)
          const slug = relativePath.replace(/\.json$/, '')
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
}
