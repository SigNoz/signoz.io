#!/usr/bin/env node
/**
 * Pre-generates static markdown files for docs at build time.
 * These files are served directly from CDN without serverless functions.
 *
 * Output: public/api/docs-markdown/[slug].md
 * Run: node scripts/generate-docs-markdown.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT_DIR = join(ROOT, 'public', 'api', 'docs-markdown')
const CONTENTLAYER_DIR = join(ROOT, '.contentlayer', 'generated')

// We need to load the rendering utilities - use dynamic import for ESM compatibility
const require = createRequire(import.meta.url)

/**
 * Load docs from contentlayer generated index
 */
function loadDocs() {
  const indexPath = join(CONTENTLAYER_DIR, 'Doc', '_index.json')
  if (!existsSync(indexPath)) {
    throw new Error(`Doc _index.json not found at ${indexPath}. Run contentlayer2 build first.`)
  }
  return JSON.parse(readFileSync(indexPath, 'utf-8'))
}

/**
 * Build markdown document with frontmatter-style header
 */
function buildMarkdownDocument({ title, description, tags, bodyMarkdown }) {
  const lines = []

  // Title
  lines.push(`# ${title}`)
  lines.push('')

  // Description if present
  if (description) {
    lines.push(`> ${description}`)
    lines.push('')
  }

  // Tags if present
  if (tags && tags.length > 0) {
    lines.push(`**Tags:** ${tags.join(', ')}`)
    lines.push('')
  }

  lines.push('---')
  lines.push('')

  // Body
  lines.push(bodyMarkdown)

  // Footer
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push('For more documentation, visit https://signoz.io/docs/')

  return lines.join('\n')
}

/**
 * Simple fallback markdown generation from raw MDX
 * Strips MDX-specific syntax for basic readability
 */
function buildFallbackMarkdown(doc) {
  let body = doc.body?.raw || ''

  // Remove import statements
  body = body.replace(/^import\s+.*$/gm, '')

  // Remove export statements
  body = body.replace(/^export\s+.*$/gm, '')

  // Convert JSX components to placeholder text
  body = body.replace(/<(\w+)[^>]*\/>/g, '[$1]')
  body = body.replace(/<(\w+)[^>]*>[\s\S]*?<\/\1>/g, '[$1]')

  // Clean up excessive whitespace
  body = body.replace(/\n{3,}/g, '\n\n').trim()

  const tags = Array.isArray(doc.docTags)
    ? doc.docTags.filter(t => typeof t === 'string' && t.trim().length > 0)
    : []

  return buildMarkdownDocument({
    title: doc.title,
    description: doc.description,
    tags,
    bodyMarkdown: body,
  })
}

/**
 * Get output path for a doc slug
 * - 'introduction' → public/api/docs-markdown/index.md (root)
 * - 'installation/docker' → public/api/docs-markdown/installation/docker.md
 */
function getOutputPath(slug) {
  if (slug === 'introduction') {
    return join(OUTPUT_DIR, 'index.md')
  }
  return join(OUTPUT_DIR, `${slug}.md`)
}

/**
 * Normalize whitespace in markdown
 */
function normalizeWhitespace(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n'
}

async function main() {
  console.log('Generating static docs markdown files...\n')

  // Clean output directory
  if (existsSync(OUTPUT_DIR)) {
    rmSync(OUTPUT_DIR, { recursive: true })
  }
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const docs = loadDocs()
  console.log(`Found ${docs.length} docs to process\n`)

  let successCount = 0
  let errorCount = 0
  const errors = []

  for (const doc of docs) {
    const slug = doc.slug || doc._id
    if (!slug) {
      console.warn(`Skipping doc without slug: ${doc.title}`)
      continue
    }

    try {
      const outputPath = getOutputPath(slug)
      const outputDir = dirname(outputPath)

      // Ensure directory exists
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
      }

      // Generate markdown using fallback method
      // (Full rendering requires React runtime which is complex in build script)
      const markdown = normalizeWhitespace(buildFallbackMarkdown(doc))

      writeFileSync(outputPath, markdown, 'utf-8')
      successCount++

      if (successCount % 100 === 0) {
        console.log(`  Processed ${successCount}/${docs.length} docs...`)
      }
    } catch (error) {
      errorCount++
      errors.push({ slug, error: error.message })
      console.error(`  Error processing ${slug}: ${error.message}`)
    }
  }

  console.log(`\nGeneration complete:`)
  console.log(`  Success: ${successCount}`)
  console.log(`  Errors: ${errorCount}`)

  if (errors.length > 0 && errors.length <= 10) {
    console.log('\nErrors:')
    errors.forEach(e => console.log(`  - ${e.slug}: ${e.error}`))
  }

  // Calculate total size
  const { execSync } = await import('child_process')
  try {
    const size = execSync(`du -sh "${OUTPUT_DIR}"`, { encoding: 'utf-8' }).trim()
    console.log(`\nOutput size: ${size.split('\t')[0]}`)
  } catch {
    // du may not be available on all systems
  }

  console.log(`\nOutput directory: ${OUTPUT_DIR}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
