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

function getChangedDocFiles(baseRef) {
  let mergeBase
  try {
    mergeBase = run(`git merge-base HEAD ${baseRef}`)
  } catch (error) {
    if (baseRef !== 'origin/main') {
      mergeBase = run('git merge-base HEAD origin/main')
    } else {
      throw error
    }
  }

  const docPattern = /^data\/docs\/.*\.mdx$/
  const changedFiles = new Set()

  // Get committed changes
  try {
    const committedDiff = execSync(`git diff --name-only --diff-filter=ACMR ${mergeBase} HEAD`, {
      encoding: 'utf8',
    })
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

function extractFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')
    let inFrontmatter = false
    let frontmatterLines = []
    let delimiterCount = 0

    for (const line of lines) {
      if (line.trim() === '---') {
        delimiterCount++
        if (delimiterCount === 1) {
          inFrontmatter = true
          continue
        }
        if (delimiterCount === 2) {
          break
        }
      }
      if (inFrontmatter && delimiterCount === 1) {
        frontmatterLines.push(line)
      }
    }

    return frontmatterLines.join('\n')
  } catch (error) {
    return null
  }
}

function validateMetadata(filePath) {
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

  const lines = frontmatter.split('\n')
  const fieldMap = new Map()

  // Parse frontmatter fields
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/)
    if (match) {
      fieldMap.set(match[1], match[2].trim())
    }
  }

  // Validate tags field (warning only)
  if (!fieldMap.has('tags')) {
    warnings.push('missing tags')
  } else {
    const tagsValue = fieldMap.get('tags')
    if (!tagsValue.includes('[')) {
      warnings.push('tags must be an array')
    } else if (/^\[\s*\]$/.test(tagsValue)) {
      warnings.push('tags array cannot be empty')
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
        // Allow dates up to 7 days in the future
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const maxFutureDate = new Date(today)
        maxFutureDate.setDate(maxFutureDate.getDate() + 7)

        if (date > maxFutureDate) {
          errors.push('date cannot be more than 7 days in the future')
        }
      }
    }
  }

  // Compare frontmatter date with git commit date
  if (fieldMap.has('date')) {
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

  // Get changed files
  const changedFiles = isPreCommit ? getStagedDocFiles() : getChangedDocFiles(baseBranch)

  if (changedFiles.length === 0) {
    console.log('No documentation files to check')
    return
  }

  console.log(`Checking ${changedFiles.length} documentation file(s) for required metadata...\n`)

  const invalidFiles = []
  const warningFiles = []
  let allValid = true

  for (const file of changedFiles) {
    const { errors, warnings } = validateMetadata(file)

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
