// Content loader utility - bypasses bundler cache in dev mode
// Uses fs.readFile directly to ensure fresh content after rebuilds
import * as fs from 'fs'
import * as path from 'path'

const CONTENT_DIR = path.resolve(process.cwd(), '.content')

export function getContentPath(relativePath: string): string {
  const fullPath = path.resolve(CONTENT_DIR, relativePath)

  // Prevent path traversal attacks
  // Must be strictly inside CONTENT_DIR (not equal to it, since callers may append suffixes)
  if (!fullPath.startsWith(CONTENT_DIR + path.sep)) {
    throw new Error('Invalid path: path traversal detected')
  }

  return fullPath
}

/**
 * Read a JSON file from the .content directory.
 * Always reads directly from filesystem to avoid bundler caching issues
 * and to ensure fresh content in dev mode.
 */
export async function readContentJson<T>(relativePath: string): Promise<T> {
  const fullPath = getContentPath(relativePath)
  const content = await fs.promises.readFile(fullPath, 'utf-8')
  return JSON.parse(content) as T
}

/**
 * Sync version of readContentJson.
 * Always reads from filesystem directly.
 */
export function readContentJsonSync<T>(relativePath: string): T {
  const fullPath = getContentPath(relativePath)
  const content = fs.readFileSync(fullPath, 'utf-8')
  return JSON.parse(content) as T
}

/**
 * Read a document from split meta/body files.
 * Documents are stored as {slug}.meta.json and {slug}.body.json for memory efficiency.
 * @param basePath - Path without .json extension, e.g. "Doc/my-slug"
 */
export async function readContentDocument<T>(basePath: string): Promise<T> {
  const metaPath = getContentPath(`${basePath}.meta.json`)
  const bodyPath = getContentPath(`${basePath}.body.json`)

  const [metaContent, bodyContent] = await Promise.all([
    fs.promises.readFile(metaPath, 'utf-8'),
    fs.promises.readFile(bodyPath, 'utf-8'),
  ])

  const meta = JSON.parse(metaContent)
  const body = JSON.parse(bodyContent)
  return { ...meta, body } as T
}

/**
 * Sync version of readContentDocument.
 */
export function readContentDocumentSync<T>(basePath: string): T {
  const metaPath = getContentPath(`${basePath}.meta.json`)
  const bodyPath = getContentPath(`${basePath}.body.json`)

  const metaContent = fs.readFileSync(metaPath, 'utf-8')
  const bodyContent = fs.readFileSync(bodyPath, 'utf-8')

  const meta = JSON.parse(metaContent)
  const body = JSON.parse(bodyContent)
  return { ...meta, body } as T
}
