#!/usr/bin/env node

/**
 * Pre-commit check for date frontmatter fields in content MDX files.
 *
 * BLOCKING (exits 1) for invalid combinations:
 *   - `date` mixed with `published_date` or `updated_date`
 *   - `updated_date` without `published_date`
 *
 * NON-BLOCKING (warning only) for deprecated usage:
 *   - `date` used alone (legacy — prefer `published_date` + `updated_date`)
 *
 * Valid combinations:
 *   - `published_date` + `updated_date`
 *   - `published_date` only
 *   - `date` only (legacy, deprecated)
 *   - none (CMS timestamps used as fallback)
 *
 * See utils/dateUtils.ts for the full date-field semantics.
 */

const fs = require('fs')

const RED = '\x1b[31m'
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

  // Invalid: date mixed with new fields
  if (hasDate && (hasPublishedDate || hasUpdatedDate)) {
    return {
      file: filePath,
      error: 'date must not be combined with published_date or updated_date',
    }
  }

  // Invalid: updated_date without published_date
  if (hasUpdatedDate && !hasPublishedDate) {
    return {
      file: filePath,
      error: 'updated_date requires published_date',
    }
  }

  // Warning: legacy date field used alone
  if (hasDate && !hasPublishedDate && !hasUpdatedDate) {
    return { file: filePath, warning: true }
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

  const results = contentFiles.map(checkFile).filter(Boolean)
  if (results.length === 0) return

  const errors = results.filter((r) => r.error)
  const warnings = results.filter((r) => r.warning)

  if (errors.length > 0) {
    console.log('')
    console.log(`${RED}${BOLD}✗  Invalid date field combinations${RESET}`)
    for (const { file, error } of errors) {
      console.log(`${RED}  ✗ ${file}: ${error}${RESET}`)
    }
    console.log('')
    console.log(`${RED}Valid combinations:${RESET}`)
    console.log(`${RED}  - published_date + updated_date  (new-style)${RESET}`)
    console.log(`${RED}  - published_date only            (published, never updated)${RESET}`)
    console.log(`${RED}  - date only                      (legacy, deprecated)${RESET}`)
    console.log(`${RED}See utils/dateUtils.ts for details.${RESET}`)
    console.log('')
    process.exit(1)
  }

  if (warnings.length > 0) {
    console.log('')
    console.log(`${YELLOW}${BOLD}⚠  date field deprecation notice${RESET}`)
    console.log(
      `${YELLOW}The "date" frontmatter field is deprecated. Prefer "published_date" and "updated_date".${RESET}`
    )
    console.log(`${YELLOW}See utils/dateUtils.ts for details.${RESET}`)
    console.log('')
    for (const { file } of warnings) {
      console.log(`${YELLOW}  → ${file}${RESET}`)
    }
    console.log('')
  }
}

module.exports = { checkFile, getFiles, main }

if (require.main === module) {
  main()
}
