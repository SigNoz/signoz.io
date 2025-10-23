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

function normalizeRoute(route) {
  if (typeof route !== 'string') return route
  const trimmed = route.trim()
  if (!trimmed.startsWith('/')) return trimmed
  const compacted = trimmed.replace(/\/+/g, '/')
  return compacted.endsWith('/') ? compacted : `${compacted}/`
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

function candidateDocPathsFromRoute(route) {
  // route is normalized and starts with /docs
  const base = route.split('#')[0].split('?')[0]
  const slug = base.replace(/^\/docs\/?/, '').replace(/\/$/, '')
  const file = path.join('data', 'docs', `${slug}.mdx`)
  const index = path.join('data', 'docs', slug, 'index.mdx')
  return [file, index]
}

function docRouteExists(route) {
  const candidates = candidateDocPathsFromRoute(route)
  return candidates.some((p) => fs.existsSync(p))
}

function collectAppRoutes() {
  const appDir = path.join(process.cwd(), 'app')
  const staticRoutes = new Set()
  const dynamicPatterns = []

  function toRouteFromPage(filePath) {
    const rel = path.relative(appDir, filePath)
    const parts = rel.split(path.sep)
    // remove filename
    parts.pop()
    // filter out grouping segments like (marketing)
    const segments = parts.filter((seg) => seg && !(seg.startsWith('(') && seg.endsWith(')')))
    const route = '/' + segments.join('/') + '/'
    return normalizeRoute(route)
  }

  function segmentToRegex(seg) {
    if (/^\[\[\.\.\.[^\]]+\]\]$/.test(seg)) {
      return '(?:/.*)?'
    }
    if (/^\[\.\.\.[^\]]+\]$/.test(seg)) {
      return '/.+'
    }
    if (/^\[[^\]]+\]$/.test(seg)) {
      return '/[^/]+'
    }
    return '/' + seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  function toRegexFromRoute(route) {
    const trimmed = route.replace(/(^\/|\/$)/g, '')
    if (!trimmed) return new RegExp('^/$')
    const segs = trimmed.split('/')
    const pattern = '^' + segs.map(segmentToRegex).join('') + '/$'
    return new RegExp(pattern)
  }

  function walk(dir) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
        continue
      }
      if (/page\.(tsx?|jsx?|mdx)$/.test(entry.name)) {
        const route = toRouteFromPage(full)
        if (/\[(?:\.\.\.)?[^\]]+\]/.test(route)) {
          dynamicPatterns.push(toRegexFromRoute(route))
        } else {
          staticRoutes.add(route)
        }
      }
    }
  }

  walk(appDir)
  return { staticRoutes, dynamicPatterns }
}

function appRouteExists(route, appRoutes) {
  const { staticRoutes, dynamicPatterns } = appRoutes
  if (staticRoutes.has(route)) return true
  return dynamicPatterns.some((re) => re.test(route))
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
  const internalRedirectMap = new Map(
    redirects
      .filter(
        (r) =>
          typeof r.source === 'string' &&
          r.source.startsWith('/') &&
          typeof r.destination === 'string' &&
          r.destination.startsWith('/')
      )
      .map((r) => [normalizeRoute(r.source), normalizeRoute(r.destination)])
  )
  const { renames, deletions } = collectDocMoves(baseBranch)

  const failures = []
  const warnings = []
  const CHECK_APP_ROUTES = process.env.CHECK_APP_ROUTES === 'true'
  const appRoutes = CHECK_APP_ROUTES ? collectAppRoutes() : null

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

  // Validate destination existence for internal redirects
  redirects.forEach(({ source, destination }) => {
    if (!destination || typeof destination !== 'string') return
    const dest = normalizeRoute(destination)
    if (!dest.startsWith('/')) return // external URL; skip
    if (dest.startsWith('/docs')) {
      if (docRouteExists(dest)) return
      // Follow redirect chains for internal routes (up to 10 hops)
      const visited = new Set()
      let current = dest
      let hop = 0
      let resolved = false
      while (hop < 10 && internalRedirectMap.has(current)) {
        const next = internalRedirectMap.get(current)
        if (visited.has(next)) {
          // cycle detected; treat as failure for existence check
          break
        }
        visited.add(next)
        if (next.startsWith('/docs') && docRouteExists(next)) {
          resolved = true
          break
        }
        current = next
        hop += 1
      }
      if (!resolved) {
        failures.push(
          `Redirect destination not found for '${source}' -> '${dest}' (missing docs file)`
        )
      }
      return
    }
    if (CHECK_APP_ROUTES) {
      if (!appRouteExists(dest, appRoutes)) {
        failures.push(
          `Redirect destination not found for '${source}' -> '${dest}' (no matching app route)`
        )
      }
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
