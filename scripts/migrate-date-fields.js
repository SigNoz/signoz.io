#!/usr/bin/env node

/**
 * Migration script: Rename `date` → `published_date` in all MDX/MD frontmatter.
 * Uses regex replacement to preserve original file formatting.
 *
 * Usage:
 *   node scripts/migrate-date-fields.js          # dry-run (default)
 *   node scripts/migrate-date-fields.js --write   # actually write files
 */

const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')

const CONTENT_DIRS = [
  'blog',
  'docs',
  'guides',
  'comparisons',
  'faqs',
  'opentelemetry',
  'case-study',
]

const dryRun = !process.argv.includes('--write')

function collectMdxFiles(dir) {
  let results = []
  if (!fs.existsSync(dir)) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results = results.concat(collectMdxFiles(fullPath))
    } else if (/\.(mdx?|md)$/i.test(entry.name)) {
      results.push(fullPath)
    }
  }
  return results
}

function migrateFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')

  // Match frontmatter block
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return false

  const frontmatter = frontmatterMatch[1]

  // Skip if already has published_date
  if (/^published_date\s*:/m.test(frontmatter)) return false

  // Skip if no date field
  if (!/^date\s*:/m.test(frontmatter)) return false

  // Replace `date:` with `published_date:` (only the frontmatter key, not values)
  const updatedFrontmatter = frontmatter.replace(/^date\s*:/m, 'published_date:')
  const updated = raw.replace(frontmatterMatch[1], updatedFrontmatter)

  if (!dryRun) {
    fs.writeFileSync(filePath, updated, 'utf8')
  }

  return true
}

let totalFiles = 0
let migratedFiles = 0

for (const dir of CONTENT_DIRS) {
  const fullDir = path.join(DATA_DIR, dir)
  const files = collectMdxFiles(fullDir)
  let dirMigrated = 0

  for (const file of files) {
    totalFiles++
    if (migrateFile(file)) {
      migratedFiles++
      dirMigrated++
    }
  }

  console.log(`  ${dir}: ${files.length} files found, ${dirMigrated} migrated`)
}

console.log(`\nTotal: ${totalFiles} files scanned, ${migratedFiles} migrated`)
if (dryRun) {
  console.log('\nDry run — no files were modified. Use --write to apply changes.')
}
