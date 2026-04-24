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
  return tryRun(`git show ${ref}:"${filePath}"`)
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

  if (currentBody !== previousBody) {
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
  const shouldEnforceRecentDate = !hasOnlyTitleAndDescriptionChanges(filePath, options)

  // Validate tags field (warning only)
  if (fieldMap.has('tags')) {
    const tagsValue = fieldMap.get('tags')
    if (!tagsValue.includes('[')) {
      warnings.push('tags must be an array')
    }
  }

  // Validate date field (required)
  if (!fieldMap.has('date')) {
    errors.push('missing date')
  } else {
    const dateValue = fieldMap.get('date').replace(/['"]/g, '').trim()
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if (!datePattern.test(dateValue)) {
      errors.push('invalid date format - use YYYY-MM-DD')
    } else {
      // Check if date is valid
      const date = new Date(dateValue)
      if (isNaN(date.getTime())) {
        errors.push('invalid date value')
      } else {
        if (shouldEnforceRecentDate) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)

          const dateToCheck = new Date(date)
          dateToCheck.setHours(0, 0, 0, 0)

          // Allow dates up to 7 days in the future
          const maxFutureDate = new Date(today)
          maxFutureDate.setDate(maxFutureDate.getDate() + 7)

          // Allow dates up to 7 days in the past
          const minPastDate = new Date(today)
          minPastDate.setDate(minPastDate.getDate() - 7)

          if (dateToCheck > maxFutureDate) {
            errors.push('date cannot be more than 7 days in the future')
          } else if (dateToCheck < minPastDate) {
            errors.push('date cannot be more than 7 days in the past')
          }
        }
      }
    }
  }

  // Compare frontmatter date with git commit date
  if (fieldMap.has('date') && shouldEnforceRecentDate) {
    const frontmatterDate = fieldMap.get('date').replace(/['"]/g, '').trim()
    const gitDate = getGitAuthorDate(filePath)

    if (gitDate) {
      const frontDate = new Date(frontmatterDate)
      const commitDate = new Date(gitDate)

      if (frontDate < commitDate) {
        warnings.push(
          `frontmatter date (${frontmatterDate}) is before git commit date (${gitDate})`
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

function main() {
  const isPreCommit = process.env.HUSKY_PRE_COMMIT === 'true'
  const baseBranch = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : process.env.DEFAULT_BRANCH || 'origin/main'
  const comparisonRef = isPreCommit ? 'HEAD' : resolveComparisonRef(baseBranch)

  // Get changed files
  const changedFiles = isPreCommit ? getStagedDocFiles() : getChangedDocFiles(baseBranch, comparisonRef)

  if (changedFiles.length === 0) {
    console.log('No documentation files to check')
    return
  }

  console.log(`Checking ${changedFiles.length} documentation file(s) for required metadata...\n`)

  const invalidFiles = []
  const warningFiles = []
  let allValid = true

  for (const file of changedFiles) {
    const { errors, warnings } = validateMetadata(file, { comparisonRef })

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

  if (!allValid) {
    console.error('Documentation metadata validation failed:')
    invalidFiles.forEach(({ file, issues }) => {
      console.error(`  • ${file}: ${issues.join('; ')}`)
    })
    console.error('\nRequired fields:')
    console.error('  - date: Date in YYYY-MM-DD format')
    console.error('  - title: Non-empty title field')
    console.error('  - description: Non-empty description field')
    console.error('  - tags: Array of tags (recommended)')
    console.error('\nExample:')
    console.error('---')
    console.error('title: My Documentation Page')
    console.error(`date: ${new Date().toISOString().split('T')[0]}`)
    console.error('description: A brief description of this page for SEO')
    console.error('tags: ["SigNoz Cloud", "Self-Host"]')
    console.error('---\n')
    process.exit(1)
  }

  console.log('✅ All documentation files have valid metadata\n')
}

module.exports = {
  getChangedDocFiles,
  getStagedDocFiles,
  extractFrontmatter,
  validateMetadata,
  main,
}

if (require.main === module) {
  main()
}
