#!/usr/bin/env node
// scripts/build-content.mts
import * as coreModule from '../lib/content-pipeline/core'
import * as schemaModule from '../lib/content-pipeline/schema'
import * as path from 'path'

// Handle ESM/CJS interop
const core = (coreModule as any).default || coreModule
const schema = (schemaModule as any).default || schemaModule
const { buildAllCollections } = core
const { collections } = schema

// MDX plugins are now in the worker (lib/content-pipeline/mdx-worker.ts)

async function main() {
  const startTime = Date.now()
  console.log('Building content...\n')

  await buildAllCollections(collections, {
    outputDir: path.resolve('.content'),
    cacheDir: path.resolve('.content-cache'),
  })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log(`\nContent built in ${elapsed}s`)
}

main().catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})
