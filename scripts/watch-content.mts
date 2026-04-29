// scripts/watch-content.mts
// Watch mode for content pipeline - rebuilds on MDX file changes

import { watch } from 'chokidar'
import { spawn } from 'child_process'
import * as fs from 'fs'
import path from 'path'

const DEBOUNCE_MS = 500
let rebuildTimer: NodeJS.Timeout | null = null
let isBuilding = false
let pendingRebuild = false

// Trigger file to touch after rebuild to trigger Next.js Fast Refresh
// Using a file in .content/ avoids polluting the working tree with dirty source files
const REFRESH_TRIGGER_FILE = path.resolve('.content', '.refresh-trigger')

const contentDirs = [
  'data',
]

function getCollectionFromPath(filePath: string): string | null {
  const relativePath = path.relative(process.cwd(), filePath)
  for (const dir of contentDirs) {
    if (relativePath.startsWith(dir)) {
      return relativePath.replace(`${dir}/`, '')
    }
  }
  return null
}

/**
 * Touch the refresh trigger file to signal content has changed.
 * This file is added to webpack's contextDependencies via the plugin,
 * so changing it triggers recompilation without polluting source files.
 */
function triggerRefresh() {
  try {
    // Ensure .content directory exists
    const dir = path.dirname(REFRESH_TRIGGER_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    // Write timestamp to trigger file change detection
    fs.writeFileSync(REFRESH_TRIGGER_FILE, String(Date.now()))
  } catch (err) {
    console.error('Failed to trigger refresh:', err)
  }
}

async function rebuild(changedFile?: string) {
  if (isBuilding) {
    pendingRebuild = true
    return
  }

  isBuilding = true
  const collection = changedFile ? getCollectionFromPath(changedFile) : null
  const displayPath = changedFile ? path.relative(process.cwd(), changedFile) : 'all'

  console.log(`\n\x1b[36m[content]\x1b[0m Rebuilding... (${displayPath})`)
  const start = Date.now()

  return new Promise<void>((resolve) => {
    const child = spawn('npx', ['tsx', 'scripts/build-content.mts'], {
      stdio: 'inherit',
    })

    child.on('close', (code) => {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1)
      if (code === 0) {
        console.log(`\x1b[32m[content]\x1b[0m Done in ${elapsed}s`)
        // Trigger Next.js refresh after successful build
        triggerRefresh()
        console.log(`\x1b[36m[content]\x1b[0m Triggered refresh`)
      } else {
        console.log(`\x1b[31m[content]\x1b[0m Build failed`)
      }

      isBuilding = false

      if (pendingRebuild) {
        pendingRebuild = false
        rebuild()
      }

      resolve()
    })
  })
}

function scheduleRebuild(filePath: string) {
  if (rebuildTimer) {
    clearTimeout(rebuildTimer)
  }
  rebuildTimer = setTimeout(() => {
    rebuild(filePath)
  }, DEBOUNCE_MS)
}

const skipInitial = process.argv.includes('--skip-initial')

console.log('\x1b[36m[content]\x1b[0m Starting watch mode...')
console.log('\x1b[36m[content]\x1b[0m Watching:', contentDirs.join(', '))

// Initial build (unless skipped)
if (!skipInitial) {
  await rebuild()
}

// Watch the data directory directly
const watchPath = path.join(process.cwd(), 'data')
console.log('\x1b[36m[content]\x1b[0m CWD:', process.cwd())
console.log('\x1b[36m[content]\x1b[0m Watch path:', watchPath)

const watcher = watch(watchPath, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  ignoreInitial: true,
  persistent: true,
  usePolling: true,
  interval: 300,
})

watcher
  .on('ready', () => {
    const watched = watcher.getWatched()
    const totalFiles = Object.values(watched).flat().length
    console.log('\x1b[36m[content]\x1b[0m Watcher ready, watching', totalFiles, 'files')
    console.log('\x1b[36m[content]\x1b[0m Watched dirs:', Object.keys(watched).slice(0, 5).join(', '), '...')
  })
  .on('error', (error) => {
    console.error('\x1b[31m[content]\x1b[0m Watcher error:', error)
  })
  .on('add', (filePath) => {
    if (!filePath.endsWith('.mdx')) return
    console.log(`\x1b[33m[content]\x1b[0m Added: ${path.relative(process.cwd(), filePath)}`)
    scheduleRebuild(filePath)
  })
  .on('change', (filePath) => {
    if (!filePath.endsWith('.mdx')) return
    console.log(`\x1b[33m[content]\x1b[0m Changed: ${path.relative(process.cwd(), filePath)}`)
    scheduleRebuild(filePath)
  })
  .on('unlink', (filePath) => {
    if (!filePath.endsWith('.mdx')) return
    console.log(`\x1b[33m[content]\x1b[0m Removed: ${path.relative(process.cwd(), filePath)}`)
    scheduleRebuild(filePath)
  })

console.log('\x1b[36m[content]\x1b[0m Watching for changes... (Ctrl+C to stop)')
