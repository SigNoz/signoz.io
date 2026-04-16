// Content loader utility - bypasses bundler cache in dev mode
// Uses fs.readFile directly to ensure fresh content after rebuilds
import * as fs from 'fs'
import * as path from 'path'

const CONTENT_DIR = path.resolve(process.cwd(), '.content')

/**
 * Read a JSON file from the .content directory.
 * Always reads directly from filesystem to avoid bundler caching issues
 * and to ensure fresh content in dev mode.
 */
export async function readContentJson<T>(relativePath: string): Promise<T> {
  const fullPath = path.join(CONTENT_DIR, relativePath)
  const content = await fs.promises.readFile(fullPath, 'utf-8')
  return JSON.parse(content) as T
}

/**
 * Sync version of readContentJson.
 * Always reads from filesystem directly.
 */
export function readContentJsonSync<T>(relativePath: string): T {
  const fullPath = path.join(CONTENT_DIR, relativePath)
  const content = fs.readFileSync(fullPath, 'utf-8')
  return JSON.parse(content) as T
}

// @refresh-trigger: 1776358029924
