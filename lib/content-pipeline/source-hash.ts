import { execSync } from 'child_process'
import { createHash } from 'crypto'

/**
 * Directories containing source files that affect content generation.
 * Changes to files in these directories should invalidate the content cache.
 */
const SOURCE_DIRS = ['lib/content-pipeline', 'utils/docs']

function exec(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf-8' }).trim()
  } catch {
    return ''
  }
}

export interface SourceHashResult {
  hash: string
  dirty: boolean
}

/**
 * Computes a hash of source files using git tree hashes.
 * Returns dirty=true if there are uncommitted changes (skip cache).
 */
export async function computeSourceHash(): Promise<SourceHashResult> {
  const dirArgs = SOURCE_DIRS.join(' ')

  // Check for uncommitted or untracked changes - if any, skip cache
  const uncommitted = exec(`git diff HEAD -- ${dirArgs}`)
  const untracked = exec(`git ls-files --others --exclude-standard -- ${dirArgs}`)

  if (uncommitted || untracked) {
    return { hash: 'dirty', dirty: true }
  }

  // No local changes - compute hash from git tree hashes
  const hash = createHash('sha256')
  for (const dir of SOURCE_DIRS) {
    const treeHash = exec(`git rev-parse HEAD:${dir} 2>/dev/null`)
    if (treeHash) {
      hash.update(`${dir}:${treeHash}\n`)
    }
  }

  return { hash: hash.digest('hex').slice(0, 16), dirty: false }
}
