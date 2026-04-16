import * as fs from 'fs/promises'
import * as path from 'path'
import { createHash } from 'crypto'

interface CacheManifest {
  schemaHash: string
  entries: Record<string, { hash: string; cachedFile: string }>
}

export class ContentCache {
  private cacheDir: string
  private manifest: CacheManifest | null = null
  private manifestPath: string
  private dirty = false

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir
    this.manifestPath = path.join(cacheDir, 'manifest.json')
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
  }

  private ensureInitialized(): void {
    if (!this.manifest) {
      this.manifest = { schemaHash: '', entries: {} }
    }
  }

  async get<T>(filePath: string, hash: string): Promise<T | undefined> {
    this.ensureInitialized()

    const entry = this.manifest!.entries[filePath]
    if (!entry || entry.hash !== hash) return undefined

    try {
      const cachedPath = path.join(this.cacheDir, entry.cachedFile)
      const data = await fs.readFile(cachedPath, 'utf-8')
      return JSON.parse(data)
    } catch {
      return undefined
    }
  }

  async set<T>(filePath: string, hash: string, data: T): Promise<void> {
    this.ensureInitialized()

    const cachedFile = `${hash.slice(0, 16)}.json`
    const cachedPath = path.join(this.cacheDir, cachedFile)

    await fs.writeFile(cachedPath, JSON.stringify(data))

    this.manifest!.entries[filePath] = { hash, cachedFile }
    this.dirty = true
    // Don't save manifest on every set - use flush() at the end
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
      const files = await fs.readdir(this.cacheDir)
      await Promise.all(files.map((f) => fs.unlink(path.join(this.cacheDir, f)).catch(() => {})))
    } catch {}
    this.dirty = false
  }

  async flush(): Promise<void> {
    if (!this.dirty || !this.manifest) return
    await fs.writeFile(this.manifestPath, JSON.stringify(this.manifest))
    this.dirty = false
  }
}
