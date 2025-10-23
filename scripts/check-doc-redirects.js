#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function run(command) {
  try {
    return execSync(command, { encoding: 'utf8' }).trim()
  } catch (error) {
    console.error(`Failed to execute: ${command}`)
    console.error(error.message)
    process.exit(1)
  }
}

// Translate docs file path to the corresponding route slug
function docPathToRoute(docPath) {
  const withoutPrefix = docPath.replace(/^data\/docs\//, '').replace(/\.mdx$/, '')
  const segments = withoutPrefix.split('/').filter(Boolean)
  if (segments[segments.length - 1] === 'index') {
    segments.pop()
  }
  const route = `/docs${segments.length ? `/${segments.join('/')}` : ''}/`
  return route.replace(/\/+/g, '/')
}

function readRedirects() {
  const configPath = path.join(process.cwd(), 'next.config.js')
  const content = fs.readFileSync(configPath, 'utf8')
  const entries = []
  const regex = /source:\s*['"]([^'"]+)['"][\s\S]*?destination:\s*['"]([^'"]+)['"]/g
  for (const match of content.matchAll(regex)) {
    entries.push({ source: match[1], destination: match[2] })
  }
  return entries
}

function collectDocMoves(baseRef) {
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
  const renameMap = new Map()
  const deletedSet = new Set()

  function parseDiff(buffer) {
    if (!buffer) {
      return
    }
    const tokens = buffer.split('\0').filter(Boolean)
    for (let i = 0; i < tokens.length; ) {
      const status = tokens[i++]
      if (!status) {
        continue
      }
      const code = status[0]
      if (code === 'R') {
        const oldPath = tokens[i++]
        const newPath = tokens[i++]
        if (docPattern.test(oldPath)) {
          renameMap.set(oldPath, newPath)
          deletedSet.delete(oldPath)
        }
      } else if (code === 'D') {
        const filePath = tokens[i++]
        if (docPattern.test(filePath)) {
          if (!renameMap.has(filePath)) {
            deletedSet.add(filePath)
          }
        }
      } else {
        i++
      }
    }
  }

  try {
    const committedDiff = execSync(`git diff --name-status -z --find-renames ${mergeBase} HEAD`, {
      encoding: 'utf8',
    })
    parseDiff(committedDiff)
  } catch (error) {
    console.error('Unable to read git diff for docs changes.')
    console.error(error.message)
    process.exit(1)
  }

  try {
    const workingDiff = execSync('git diff --name-status -z --find-renames HEAD', {
      encoding: 'utf8',
    })
    parseDiff(workingDiff)
  } catch (error) {
    console.error('Unable to read local git diff for docs changes.')
    console.error(error.message)
    process.exit(1)
  }

  const renames = Array.from(renameMap.entries()).map(([oldPath, newPath]) => ({
    oldPath,
    newPath,
  }))
  const deletions = Array.from(deletedSet.values()).map((path) => ({ path }))

  return { renames, deletions }
}

function main() {
  const baseBranch = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : process.env.DEFAULT_BRANCH || 'origin/main'

  const redirects = readRedirects()
  const redirectMap = new Map(redirects.map((entry) => [entry.source, entry.destination]))
  const { renames, deletions } = collectDocMoves(baseBranch)

  const failures = []
  const warnings = []

  renames.forEach(({ oldPath, newPath }) => {
    const oldRoute = docPathToRoute(oldPath)
    const newRoute = /^data\/docs\/.*\.mdx$/.test(newPath) ? docPathToRoute(newPath) : null
    const destination = redirectMap.get(oldRoute)
    if (!destination) {
      failures.push(
        `Missing redirect for renamed doc '${oldRoute}' (new path '${newRoute || newPath}')`
      )
      return
    }
    if (destination === oldRoute) {
      failures.push(`Redirect for '${oldRoute}' points to itself. Update destination to new slug.`)
    } else if (newRoute && destination !== newRoute) {
      warnings.push(
        `Redirect for '${oldRoute}' points to '${destination}', expected '${newRoute}'. ` +
          'Confirm this is intentional.'
      )
    }
  })

  deletions.forEach(({ path: filePath }) => {
    const docRoute = docPathToRoute(filePath)
    const destination = redirectMap.get(docRoute)
    if (!destination) {
      failures.push(`Missing redirect for deleted doc '${docRoute}'`)
    } else if (destination === docRoute) {
      failures.push(`Redirect for deleted doc '${docRoute}' points to itself. Update destination.`)
    }
  })

  if (warnings.length) {
    console.warn('Doc redirect warnings:')
    warnings.forEach((message) => console.warn(`  • ${message}`))
  }

  if (failures.length) {
    console.error('Doc redirect check failed:')
    failures.forEach((message) => console.error(`  • ${message}`))
    process.exit(1)
  }

  console.log('Doc redirect check passed')
}

module.exports = {
  docPathToRoute,
  readRedirects,
  collectDocMoves,
  main,
}

if (require.main === module) {
  main()
}
