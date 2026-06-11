#!/usr/bin/env node

/**
 * Pre-commit warning: nudge authors toward `published_date` + `updated_date`
 * instead of the legacy `date` frontmatter field.
 *
 * This script is intentionally a WARNING (non-blocking).
 * It exits 0 so commits are never rejected.
 *
 * See utils/dateUtils.ts for the full date-field semantics.
 */

const fs = require('fs')

const YELLOW = '\x1b[33m'
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'

// Directories containing article MDX content
const CONTENT_DIRS = [
  'data/blog',
  'data/guides',
  'data/comparisons',
  'data/faqs',
  'data/opentelemetry',
  'data/case-study',
]

function getFiles() {
  // When run from pre-commit, check only staged files
  const args = process.argv.slice(2)
  if (args.length > 0) {
    return args.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
  }
  return []
}

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) return null

  const content = fs.readFileSync(filePath, 'utf-8')

  // Extract frontmatter between first --- pair
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return null

  const frontmatter = fmMatch[1]

  const hasDate = /^date\s*:/m.test(frontmatter)
  const hasPublishedDate = /^published_date\s*:/m.test(frontmatter)
  const hasUpdatedDate = /^updated_date\s*:/m.test(frontmatter)

  // Warn if file has `date` but neither of the new fields
  if (hasDate && !hasPublishedDate && !hasUpdatedDate) {
    return filePath
  }
  return null
}

function main() {
  const files = getFiles()
  if (files.length === 0) return

  // Only check files in content directories
  const contentFiles = files.filter((f) =>
    CONTENT_DIRS.some((dir) => f.startsWith(dir + '/') || f.startsWith('./' + dir + '/'))
  )
  if (contentFiles.length === 0) return

  const warnings = contentFiles.map(checkFile).filter(Boolean)
  if (warnings.length === 0) return

  console.log('')
  console.log(`${YELLOW}${BOLD}⚠  date field deprecation notice${RESET}`)
  console.log(
    `${YELLOW}The "date" frontmatter field is deprecated. Prefer "published_date" and "updated_date".${RESET}`
  )
  console.log(`${YELLOW}See utils/dateUtils.ts for details.${RESET}`)
  console.log('')
  for (const file of warnings) {
    console.log(`${YELLOW}  → ${file}${RESET}`)
  }
  console.log('')
}

main()
