#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')

function run(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim()
  } catch (error) {
    console.error(`Failed to execute: ${command}`)
    console.error(error.message)
    process.exit(1)
  }
}

function tryRun(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch (error) {
    return null
  }
}

function resolveComparisonRef(baseRef) {
  const mergeBase = tryRun(`git merge-base HEAD ${baseRef}`)
  if (mergeBase) {
    return mergeBase
  }

  if (baseRef !== 'origin/main') {
    const fallbackMergeBase = tryRun('git merge-base HEAD origin/main')
    if (fallbackMergeBase) {
      return fallbackMergeBase
    }
  }

  console.error(`Unable to determine a merge base for ${baseRef}`)
  process.exit(1)
}

function getChangedDocFiles(baseRef) {
  const comparisonRef = resolveComparisonRef(baseRef)

  const docPattern = /^data\/docs\/.*\.mdx$/
  const changedFiles = new Set()

  // Get committed changes
  try {
    const committedDiff = execSync(
      `git diff --name-only --diff-filter=ACMR ${comparisonRef} HEAD`,
      {
        encoding: 'utf8',
      }
    )
    committedDiff
      .split('\n')
      .filter((file) => docPattern.test(file))
      .forEach((file) => changedFiles.add(file))
  } catch (error) {
    console.error('Unable to read git diff for docs changes.')
    console.error(error.message)
    process.exit(1)
  }

  // Get working tree changes
  try {
    const workingDiff = execSync('git diff --name-only --diff-filter=ACMR HEAD', {
      encoding: 'utf8',
    })
    workingDiff
      .split('\n')
      .filter((file) => docPattern.test(file))
      .forEach((file) => changedFiles.add(file))
  } catch (error) {
    console.error('Unable to read local git diff for docs changes.')
    console.error(error.message)
    process.exit(1)
  }

  return Array.from(changedFiles).filter(Boolean)
}

// Put in a PR title or commit message to skip the date recency rule
const SKIP_DATE_MARKER = '[skip-date]'

function isTruthyFlag(value) {
  return ['1', 'true', 'yes'].includes(
    String(value ?? '')
      .trim()
      .toLowerCase()
  )
}

/**
 * Skips the recency error and the git commit date warning for every changed doc.
 * Required fields, date format, and field combinations stay enforced.
 *
 * @returns {string|null} The reason for the skip, or null when the rule stays active.
 */
function resolveDateSkipReason({ comparisonRef, isPreCommit } = {}) {
  if (isTruthyFlag(process.env.SKIP_DATE_CHECK)) {
    return 'SKIP_DATE_CHECK environment variable'
  }

  if ((process.env.PR_TITLE || '').toLowerCase().includes(SKIP_DATE_MARKER)) {
    return `${SKIP_DATE_MARKER} in the pull request title`
  }

  // Pre-commit has no commit message yet, so only the env var works there
  if (!isPreCommit && comparisonRef) {
    const messages = tryRun(`git log --format=%B ${comparisonRef}..HEAD`)
    if ((messages || '').toLowerCase().includes(SKIP_DATE_MARKER)) {
      return `${SKIP_DATE_MARKER} in a commit message`
    }
  }

  return null
}

function getGitAuthorDate(filePath) {
  try {
    const dateString = execSync(`git log -2 --pretty=format:%as -- ${filePath}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return dateString || null
  } catch (error) {
    return null
  }
}

function getStagedDocFiles() {
  try {
    const stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACMR', {
      encoding: 'utf8',
    })
    const docPattern = /^data\/docs\/.*\.mdx$/
    return stagedFiles
      .split('\n')
      .filter((file) => docPattern.test(file))
      .filter(Boolean)
  } catch (error) {
    console.error('Unable to read staged files.')
    console.error(error.message)
    process.exit(1)
  }
}

function splitFrontmatter(content) {
  const lines = content.split('\n')

  if (lines[0]?.trim() !== '---') {
    return { frontmatter: '', body: content }
  }

  const frontmatterLines = []

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      return {
        frontmatter: frontmatterLines.join('\n'),
        body: lines.slice(i + 1).join('\n'),
      }
    }

    frontmatterLines.push(lines[i])
  }

  return { frontmatter: '', body: content }
}

function parseFrontmatterFields(frontmatter) {
  const fieldMap = new Map()

  for (const line of frontmatter.split('\n')) {
    const match = line.match(/^(\w+):\s*(.*)$/)
    if (match) {
      fieldMap.set(match[1], match[2].trim())
    }
  }

  return fieldMap
}

function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return splitFrontmatter(content).frontmatter
  } catch (error) {
    return null
  }
}

function getFileContentAtRef(ref, filePath) {
  try {
    return execSync(`git show ${ref}:"${filePath}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch (error) {
    return null
  }
}

function hasOnlyTitleAndDescriptionChanges(filePath, options = {}) {
  const currentContent = fs.readFileSync(filePath, 'utf8')
  const previousContent =
    options.previousContent ??
    (options.comparisonRef ? getFileContentAtRef(options.comparisonRef, filePath) : null)

  if (!previousContent || currentContent === previousContent) {
    return false
  }

  const { frontmatter: currentFrontmatter, body: currentBody } = splitFrontmatter(currentContent)
  const { frontmatter: previousFrontmatter, body: previousBody } = splitFrontmatter(previousContent)

  if (currentBody.trimEnd() !== previousBody.trimEnd()) {
    return false
  }

  const currentFields = parseFrontmatterFields(currentFrontmatter)
  const previousFields = parseFrontmatterFields(previousFrontmatter)
  const changedKeys = new Set()

  for (const key of new Set([...currentFields.keys(), ...previousFields.keys()])) {
    if ((currentFields.get(key) ?? '') !== (previousFields.get(key) ?? '')) {
      changedKeys.add(key)
    }
  }

  if (changedKeys.size === 0) {
    return false
  }

  const allowedKeys = new Set(['title', 'description'])
  return Array.from(changedKeys).every((key) => allowedKeys.has(key))
}

function validateMetadata(filePath, options = {}) {
  const errors = []
  const warnings = []

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    errors.push('file not found')
    return { errors, warnings }
  }

  // Extract frontmatter
  const frontmatter = extractFrontmatter(filePath)
  if (frontmatter === null) {
    errors.push('cannot read file')
    return { errors, warnings }
  }

  const fieldMap = parseFrontmatterFields(frontmatter)
  const shouldEnforceRecentDate =
    !options.skipDateEnforcement && !hasOnlyTitleAndDescriptionChanges(filePath, options)

  // Validate tags field (warning only)
  if (fieldMap.has('tags')) {
    const tagsValue = fieldMap.get('tags')
    if (!tagsValue.includes('[')) {
      warnings.push('tags must be an array')
    }
  }

  // Validate date field combinations.
  // Valid: (published_date + updated_date), (published_date only), (date only), (none).
  // Invalid: date mixed with published_date or updated_date; updated_date without published_date.
  const hasPublishedDate = fieldMap.has('published_date')
  const hasUpdatedDate = fieldMap.has('updated_date')
  const hasDate = fieldMap.has('date')

  if (hasDate && (hasPublishedDate || hasUpdatedDate)) {
    errors.push(
      'date must not be combined with published_date or updated_date — use either date (legacy) or published_date + updated_date (new-style)'
    )
  }

  if (hasUpdatedDate && !hasPublishedDate) {
    errors.push('updated_date requires published_date — set both or use date instead')
  }

  // At least one date field required
  const dateFieldKey = hasPublishedDate ? 'published_date' : hasDate ? 'date' : null
  if (!dateFieldKey) {
    errors.push('missing date — set published_date or date')
  }

  // Validate format and recency for each date field present
  const dateFieldsToValidate = ['published_date', 'updated_date', 'date'].filter((f) =>
    fieldMap.has(f)
  )
  for (const key of dateFieldsToValidate) {
    const dateValue = fieldMap.get(key).replace(/['"]/g, '').trim()
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (!datePattern.test(dateValue)) {
      errors.push(`invalid ${key} format - use YYYY-MM-DD`)
    } else {
      const date = new Date(dateValue)
      if (isNaN(date.getTime())) {
        errors.push(`invalid ${key} value`)
      } else if (
        shouldEnforceRecentDate &&
        key === (hasUpdatedDate ? 'updated_date' : dateFieldKey)
      ) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const dateToCheck = new Date(date)
        dateToCheck.setHours(0, 0, 0, 0)

        const maxFutureDate = new Date(today)
        maxFutureDate.setDate(maxFutureDate.getDate() + 7)

        const minPastDate = new Date(today)
        minPastDate.setDate(minPastDate.getDate() - 7)

        if (dateToCheck > maxFutureDate) {
          errors.push(`${key} cannot be more than 7 days in the future`)
        } else if (dateToCheck < minPastDate) {
          errors.push(`${key} cannot be more than 7 days in the past`)
        }
      }
    }
  }

  // Compare the most-recent frontmatter date with git commit date
  const mostRecentDateKey = hasUpdatedDate ? 'updated_date' : dateFieldKey
  if (mostRecentDateKey && shouldEnforceRecentDate) {
    const frontmatterDate = fieldMap.get(mostRecentDateKey).replace(/['"]/g, '').trim()
    const gitDate = getGitAuthorDate(filePath)

    if (gitDate) {
      const frontDate = new Date(frontmatterDate)
      const commitDate = new Date(gitDate)

      if (frontDate < commitDate) {
        warnings.push(
          `frontmatter ${mostRecentDateKey} (${frontmatterDate}) is before git commit date (${gitDate})`
        )
      }
    }
  }

  // Validate title field (required)
  if (!fieldMap.has('title')) {
    errors.push('missing title')
  } else {
    const titleValue = fieldMap.get('title').trim()
    if (!titleValue || titleValue === '""' || titleValue === "''") {
      errors.push('title cannot be empty')
    }
  }

  // Validate description field (required)
  if (!fieldMap.has('description')) {
    errors.push('missing description')
  } else {
    const descriptionValue = fieldMap.get('description').trim()
    if (!descriptionValue || descriptionValue === '""' || descriptionValue === "''") {
      errors.push('description cannot be empty')
    }
  }

  return { errors, warnings }
}

// Writes the run result to DOCS_METADATA_REPORT for the PR comment step; no-op when unset
function writeReport(report) {
  const reportPath = process.env.DOCS_METADATA_REPORT
  if (!reportPath) return

  try {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  } catch (error) {
    console.error(`Unable to write the metadata report to ${reportPath}`)
    console.error(error.message)
  }
}

function main() {
  const isPreCommit = process.env.HUSKY_PRE_COMMIT === 'true'
  const baseBranch = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : process.env.DEFAULT_BRANCH || 'origin/main'
  const comparisonRef = isPreCommit ? 'HEAD' : resolveComparisonRef(baseBranch)

  // Get changed files
  const changedFiles = isPreCommit
    ? getStagedDocFiles()
    : getChangedDocFiles(baseBranch, comparisonRef)

  if (changedFiles.length === 0) {
    console.log('No documentation files to check')
    writeReport({ status: 'success', skipReason: null, invalidFiles: [], warningFiles: [] })
    return
  }

  const skipReason = resolveDateSkipReason({ comparisonRef, isPreCommit })
  if (skipReason) {
    console.log(`Date recency check skipped (${skipReason}). All other rules still apply.\n`)
  }

  console.log(`Checking ${changedFiles.length} documentation file(s) for required metadata...\n`)

  const invalidFiles = []
  const warningFiles = []
  let allValid = true

  for (const file of changedFiles) {
    const { errors, warnings } = validateMetadata(file, {
      comparisonRef,
      skipDateEnforcement: Boolean(skipReason),
    })

    if (errors.length > 0) {
      console.error(`❌ ${file}: ${errors.join('; ')}`)
      invalidFiles.push({ file, issues: errors })
      allValid = false
    }

    if (warnings.length > 0) {
      console.warn(`⚠️  ${file}: ${warnings.join('; ')}`)
      warningFiles.push({ file, issues: warnings })
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`✅ ${file}`)
    }
  }

  console.log('')

  // Display summary
  if (warningFiles.length > 0) {
    console.warn('Documentation metadata warnings:')
    warningFiles.forEach(({ file, issues }) => {
      console.warn(`  • ${file}: ${issues.join('; ')}`)
    })
    console.warn('\nConsider adding tags to improve documentation discoverability.\n')
  }

  writeReport({
    status: allValid ? 'success' : 'failure',
    skipReason,
    invalidFiles,
    warningFiles,
  })

  if (!allValid) {
    console.error('Documentation metadata validation failed:')
    invalidFiles.forEach(({ file, issues }) => {
      console.error(`  • ${file}: ${issues.join('; ')}`)
    })
    console.error('\nRequired fields:')
    console.error('  - published_date (or date): Date in YYYY-MM-DD format')
    console.error('  - title: Non-empty title field')
    console.error('  - description: Non-empty description field')
    console.error('  - tags: Array of tags (recommended)')
    console.error('\nDate field rules:')
    console.error('  - Use date (legacy) OR published_date — never both')
    console.error('  - updated_date requires published_date')
    console.error('  - Do not mix date with published_date or updated_date')
    console.error('\nExample (new-style):')
    console.error('---')
    console.error('title: My Documentation Page')
    console.error(`published_date: ${new Date().toISOString().split('T')[0]}`)
    console.error('description: A brief description of this page for SEO')
    console.error('tags: ["SigNoz Cloud", "Self-Host"]')
    console.error('---\n')
    console.error('To skip the date recency rule for a trivial change:')
    console.error("  - Add the label 'skip-date-check' to the pull request")
    console.error(`  - Or put ${SKIP_DATE_MARKER} in the pull request title or a commit message`)
    console.error(`  - Or run the commit with SKIP_DATE_CHECK=1\n`)
    process.exit(1)
  }

  console.log('✅ All documentation files have valid metadata\n')
}

module.exports = {
  getChangedDocFiles,
  getStagedDocFiles,
  extractFrontmatter,
  resolveDateSkipReason,
  validateMetadata,
  main,
  SKIP_DATE_MARKER,
}

if (require.main === module) {
  main()
}
