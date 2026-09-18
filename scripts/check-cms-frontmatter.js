#!/usr/bin/env node

/**
 * Validates MDX frontmatter in CMS-synced folders against the collection
 * schemas in scripts/cms-sync/schemas/ so invalid fields fail at commit/CI
 * time instead of as Strapi 400s after merge.
 *
 * Modes:
 *   --staged      validate staged files (content read from the index)
 *   --all         validate every MDX file in the synced folders
 *   <files...>    validate the given working-tree files
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const matter = require('gray-matter')
const { COLLECTION_SCHEMAS, RELATED_ARTICLE_TYPE_MAP } = require('./cms-sync/schemas')
const { parseRelatedArticleUrl } = require('./cms-sync/relation-resolver')

const SYNC_FOLDERS = [
  'faqs',
  'case-study',
  'opentelemetry',
  'comparisons',
  'guides',
  'blog',
  'docs',
]

const SYNCED_PATTERN = new RegExp(`^data/(${SYNC_FOLDERS.join('|')})/.*\\.mdx?$`)

// Injected by the sync from the file path / CI flags; frontmatter values
// would override them via the spread in schema-mapper.js.
const RESERVED_KEYS = ['path', 'content', 'deployment_status']

const LEGACY_RELATED_KEYS = new Set([
  'related_guides',
  'related_comparisons',
  'related_blogs',
  'related_faqs',
])

const BOOLEAN_FIELDS = new Set([
  'hide_table_of_contents',
  'is_newsroom',
  'excludeFromSitemap',
  'featured',
  'show_company_name_with_logo',
])

const DATE_FIELDS = new Set(['date', 'published_date', 'updated_date'])

const KNOWN_DOC_TYPES = new Set(['howto', 'explanation', 'reference', 'tutorial'])

// URL prefixes whose content lives in a differently-named data folder
const PREFIX_TO_DATA_FOLDER = { customers: 'case-study' }

function getAllowedKeys(schema) {
  const keys = new Set(schema.fields.filter((f) => !RESERVED_KEYS.includes(f)))
  for (const relation of Object.values(schema.relations || {})) {
    keys.add(relation.frontmatterField)
  }
  if (schema.hasRelatedArticles) keys.add('related_articles')
  return keys
}

function isValidDate(value) {
  if (value instanceof Date) return !Number.isNaN(value.getTime())
  if (typeof value === 'string') {
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))
  }
  return false
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function validateRelatedArticles(value, rootDir, addError) {
  if (!Array.isArray(value)) {
    addError('related_articles', 'must be an array of article URL paths')
    return
  }

  for (const entry of value) {
    if (typeof entry !== 'string') {
      addError('related_articles', `entries must be strings, got ${JSON.stringify(entry)}`)
      continue
    }

    if (/^https?:\/\//.test(entry)) {
      addError(
        'related_articles',
        `"${entry}" is a full URL — use a site-relative path like /blog/<slug>`
      )
      continue
    }

    const parsed = parseRelatedArticleUrl(entry)
    if (!parsed) {
      addError('related_articles', `"${entry}" is not a valid /<content-type>/<slug> path`)
      continue
    }

    if (!RELATED_ARTICLE_TYPE_MAP[parsed.prefix]) {
      const known = Object.keys(RELATED_ARTICLE_TYPE_MAP).join(', ')
      addError(
        'related_articles',
        `"${entry}" has unknown content-type prefix "${parsed.prefix}" (known: ${known})`
      )
      continue
    }

    const folder = PREFIX_TO_DATA_FOLDER[parsed.prefix] || parsed.prefix
    const slug = parsed.path.replace(/^\//, '')
    const candidates = [
      path.join(rootDir, 'data', folder, `${slug}.mdx`),
      path.join(rootDir, 'data', folder, `${slug}.md`),
    ]
    if (!candidates.some((c) => fs.existsSync(c))) {
      addError(
        'related_articles',
        `"${entry}" does not match any file under data/${folder}/ — was the article renamed or removed?`
      )
    }
  }
}

function validateFrontmatter(folderName, frontmatter, rootDir = process.cwd()) {
  const schema = COLLECTION_SCHEMAS[folderName]
  if (!schema) {
    return {
      errors: [{ field: null, message: `no CMS schema for folder "${folderName}"` }],
      warnings: [],
    }
  }

  const errors = []
  const warnings = []
  const addError = (field, message) => errors.push({ field, message })

  const allowedKeys = getAllowedKeys(schema)
  const relationFields = new Set(
    Object.values(schema.relations || {}).map((r) => r.frontmatterField)
  )

  for (const key of Object.keys(frontmatter)) {
    if (RESERVED_KEYS.includes(key)) {
      addError(
        key,
        `reserved key — "${key}" is derived by the CMS sync and must not be set in frontmatter`
      )
    } else if (LEGACY_RELATED_KEYS.has(key)) {
      addError(key, `legacy key — use related_articles with /<content-type>/<slug> paths instead`)
    } else if (!allowedKeys.has(key)) {
      addError(
        key,
        `unknown frontmatter key for data/${folderName} (allowed: ${[...allowedKeys].sort().join(', ')})`
      )
    }
  }

  for (const field of schema.required || []) {
    if (!isNonEmptyString(frontmatter[field])) {
      addError(field, 'required field — must be a non-empty string')
    }
  }

  for (const [key, value] of Object.entries(frontmatter)) {
    if (!allowedKeys.has(key)) continue
    if (value === null || value === undefined) {
      addError(key, 'must not be empty/null')
      continue
    }

    if (relationFields.has(key)) {
      if (!Array.isArray(value) || !value.every(isNonEmptyString)) {
        addError(key, 'must be an array of non-empty strings (e.g. [ankit_anand])')
      }
      continue
    }

    if (key === 'related_articles') {
      validateRelatedArticles(value, rootDir, addError)
      continue
    }

    if (DATE_FIELDS.has(key)) {
      if (!isValidDate(value)) {
        addError(key, 'must be a date in YYYY-MM-DD format')
      }
      continue
    }

    if (BOOLEAN_FIELDS.has(key)) {
      if (typeof value !== 'boolean') {
        addError(key, `must be a boolean (unquoted true/false), got ${JSON.stringify(value)}`)
      }
      continue
    }

    // Everything else in the schema is a Strapi string/text field
    if ((schema.required || []).includes(key)) continue // already checked above
    if (typeof value !== 'string') {
      addError(key, `must be a string, got ${JSON.stringify(value)}`)
      continue
    }

    if (key === 'doc_type' && !KNOWN_DOC_TYPES.has(value)) {
      warnings.push({
        field: key,
        message: `"${value}" is not a known doc_type (${[...KNOWN_DOC_TYPES].join(', ')})`,
      })
    }
  }

  return { errors, warnings }
}

function validateFileContent(filePath, raw, rootDir = process.cwd()) {
  const folderName = filePath.split('/')[1]
  let parsed
  try {
    parsed = matter(raw)
  } catch (err) {
    return {
      errors: [
        { field: null, message: `frontmatter YAML failed to parse: ${err.message.split('\n')[0]}` },
      ],
      warnings: [],
    }
  }
  return validateFrontmatter(folderName, parsed.data, rootDir)
}

function getStagedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' })
  return output
    .trim()
    .split('\n')
    .filter((f) => f && SYNCED_PATTERN.test(f))
}

function readStagedFile(filePath) {
  return execSync(`git show ":${filePath}"`, { encoding: 'utf8' })
}

function getAllFiles(rootDir = process.cwd()) {
  const files = []
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (/\.mdx?$/.test(entry.name)) files.push(path.relative(rootDir, full))
    }
  }
  for (const folder of SYNC_FOLDERS) {
    const dir = path.join(rootDir, 'data', folder)
    if (fs.existsSync(dir)) walk(dir)
  }
  return files
}

function main() {
  const args = process.argv.slice(2)
  const staged = args.includes('--staged')
  const all = args.includes('--all')
  const fileArgs = args.filter((a) => !a.startsWith('--'))

  let files
  if (staged) {
    files = getStagedFiles()
  } else if (all) {
    files = getAllFiles()
  } else {
    files = fileArgs
      .map((f) => path.relative(process.cwd(), path.resolve(f)))
      .filter((f) => SYNCED_PATTERN.test(f))
  }

  if (files.length === 0) {
    console.log('No CMS-synced MDX files to validate.')
    return
  }

  let errorCount = 0
  let warningCount = 0

  for (const file of files) {
    let raw
    try {
      raw = staged ? readStagedFile(file) : fs.readFileSync(file, 'utf8')
    } catch (err) {
      console.error(`✖ ${file} — could not read file: ${err.message}`)
      errorCount++
      continue
    }

    const { errors, warnings } = validateFileContent(file, raw)
    for (const e of errors) {
      console.error(`✖ ${file} → ${e.field ? `${e.field}: ` : ''}${e.message}`)
      errorCount++
    }
    for (const w of warnings) {
      console.warn(`⚠ ${file} → ${w.field}: ${w.message}`)
      warningCount++
    }
  }

  if (errorCount > 0) {
    console.error(
      `\n${errorCount} frontmatter error(s) across ${files.length} file(s). ` +
        `Fields must match the CMS schemas in scripts/cms-sync/schemas/.`
    )
    process.exit(1)
  }

  console.log(
    `Frontmatter OK for ${files.length} CMS-synced file(s)` +
      (warningCount > 0 ? ` (${warningCount} warning(s))` : '') +
      '.'
  )
}

module.exports = {
  validateFrontmatter,
  validateFileContent,
  getAllowedKeys,
  isValidDate,
  getAllFiles,
  main,
}

if (require.main === module) main()
