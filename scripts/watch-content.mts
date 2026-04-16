// scripts/watch-content.mts
// Watch mode for content pipeline - rebuilds on MDX file changes

import { watch } from 'chokidar'
import { spawn } from 'child_process'
import path from 'path'

const DEBOUNCE_MS = 500
let rebuildTimer: NodeJS.Timeout | null = null
let isBuilding = false
let pendingRebuild = false

const contentDirs = [
  'data/blog',
  'data/docs',
  'data/guides',
  'data/comparisons',
  'data/opentelemetry',
  'data/newsroom',
]

function getCollectionFromPath(filePath: string): string | null {
  const relativePath = path.relative(process.cwd(), filePath)
  for (const dir of contentDirs) {
    if (relativePath.startsWith(dir)) {
      return dir.replace('data/', '')
    }
  }
  return null
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

// Watch for changes
const watcher = watch(contentDirs.map(d => `${d}/**/*.mdx`), {
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 100,
    pollInterval: 50,
  },
})

watcher
  .on('add', (filePath) => {
    console.log(`\x1b[33m[content]\x1b[0m Added: ${path.relative(process.cwd(), filePath)}`)
    scheduleRebuild(filePath)
  })
  .on('change', (filePath) => {
    console.log(`\x1b[33m[content]\x1b[0m Changed: ${path.relative(process.cwd(), filePath)}`)
    scheduleRebuild(filePath)
  })
  .on('unlink', (filePath) => {
    console.log(`\x1b[33m[content]\x1b[0m Removed: ${path.relative(process.cwd(), filePath)}`)
    scheduleRebuild(filePath)
  })

console.log('\x1b[36m[content]\x1b[0m Watching for changes... (Ctrl+C to stop)')
