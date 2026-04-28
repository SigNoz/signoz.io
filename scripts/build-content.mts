#!/usr/bin/env node
// scripts/build-content.mts
import * as coreModule from '../lib/content-pipeline/core'
import * as schemaModule from '../lib/content-pipeline/schema'
import * as path from 'path'
import * as fs from 'fs'
import GithubSlugger from 'github-slugger'

// Handle ESM/CJS interop
const core = (coreModule as any).default || coreModule
const schema = (schemaModule as any).default || schemaModule
const { buildAllCollections } = core
const { collections } = schema

// MDX plugins are now in the worker (lib/content-pipeline/mdx-worker.ts)

interface BlogMeta {
  tags: string[]
  draft?: boolean
}

function generateTagData(outputDir: string): void {
  const slugger = new GithubSlugger()
  const tagCounts: Record<string, number> = {}

  // Read Blog meta.json
  const blogMetaPath = path.join(outputDir, 'Blog', 'meta.json')
  if (!fs.existsSync(blogMetaPath)) {
    console.warn('Blog meta.json not found, skipping tag-data generation')
    return
  }

  const blogs: BlogMeta[] = JSON.parse(fs.readFileSync(blogMetaPath, 'utf-8'))

  for (const blog of blogs) {
    if (blog.draft) continue
    if (!Array.isArray(blog.tags)) continue

    for (const tag of blog.tags) {
      if (typeof tag !== 'string' || !tag.trim()) continue
      slugger.reset()
      const normalizedTag = slugger.slug(tag)
      tagCounts[normalizedTag] = (tagCounts[normalizedTag] || 0) + 1
    }
  }

  // Sort by count descending for readability
  const sorted = Object.fromEntries(
    Object.entries(tagCounts).sort(([, a], [, b]) => b - a)
  )

  const tagDataPath = path.resolve('app/tag-data.json')
  fs.writeFileSync(tagDataPath, JSON.stringify(sorted, null, 2) + '\n')
  console.log(`Generated tag-data.json with ${Object.keys(sorted).length} tags`)
}

async function main() {
  const startTime = Date.now()
  const force = process.argv.includes('--force')

  console.log(`Building content${force ? ' (force rebuild)' : ''}...\n`)

  const outputDir = path.resolve('.content')

  await buildAllCollections(collections, {
    outputDir,
    force,
  })

  // Generate tag-data.json from blog metadata
  generateTagData(outputDir)

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2)
  console.log(`\nContent built in ${elapsed}s`)
}

main().catch((err) => {
  console.error('Build failed:', err)
  process.exit(1)
})
