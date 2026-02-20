#!/usr/bin/env node

import { execSync } from 'node:child_process'
import https from 'node:https'

const SKIP_IF_ONLY_CHANGES_IN = [
  'data/comparisons',
  'data/opentelemetry',
  'data/case-study',
  'data/faqs',
  'data-assets',
  '.github',
  '.husky',
  '.vscode',
  'tests',
  'reports',
  'faq',
  'scripts/vercel-ignore-build.mjs',
  'scripts/sync-content-to-strapi.js',
  'scripts/update-pr-comment.js',
  'scripts/check-doc-redirects.js',
  'scripts/check-docs-metadata.js',
  'CONTRIBUTING.md',
  'README.md',
  'LICENSE.md',
  'AGENTS.md',
  '.gitignore',
]

const {
  VERCEL_ENV,
  VERCEL_GIT_PULL_REQUEST_ID: PR_ID,
  VERCEL_GIT_REPO_OWNER: REPO_OWNER,
  VERCEL_GIT_REPO_SLUG: REPO_SLUG,
  GITHUB_TOKEN,
} = process.env

const isLocal = process.argv.includes('--local')

function isInRestrictedPath(file) {
  return SKIP_IF_ONLY_CHANGES_IN.some(
    (prefix) => file === prefix || file.startsWith(prefix + '/')
  )
}

function gitDiff(args) {
  try {
    return execSync(`git diff --name-only ${args}`, { encoding: 'utf-8' })
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const headers = { 'User-Agent': 'vercel-ignore-build' }
    if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`

    https
      .get(url, { headers }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`))
          res.resume()
          return
        }

        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            const linkHeader = res.headers['link'] || ''
            const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/)
            const nextUrl = nextMatch ? nextMatch[1] : null
            resolve({ body: JSON.parse(data), nextUrl })
          } catch (e) {
            reject(e)
          }
        })
      })
      .on('error', reject)
  })
}

async function getChangedFilesFromAPI() {
  const files = []
  let url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_SLUG}/pulls/${PR_ID}/files?per_page=100`

  while (url) {
    const { body, nextUrl } = await fetchJSON(url)
    for (const f of body) {
      if (f.filename) files.push(f.filename)
    }
    url = nextUrl
  }

  return files
}

async function getChangedFiles() {
  if (isLocal || !VERCEL_ENV) {
    return gitDiff('HEAD~1 HEAD')
  }

  // Always assume squash merge, if the merge strategy is changed, this will need to be updated
  if (VERCEL_ENV === 'production') {
    return gitDiff('HEAD~1 HEAD')
  }

  if (PR_ID && REPO_OWNER && REPO_SLUG) {
    try {
      const files = await getChangedFilesFromAPI()
      if (files.length > 0) return files
    } catch (err) {
      console.log(`Warning: GitHub API failed (${err.message}), falling back to git diff`)
    }
    return gitDiff('HEAD~1 HEAD')
  }

  return gitDiff('HEAD~1 HEAD')
}

async function main() {
  const changed = await getChangedFiles()

  if (changed.length === 0) {
    if (VERCEL_ENV === 'preview' && PR_ID) {
      console.log('Warning: Could not determine changed files (empty diff). Proceeding with build to be safe.')
      process.exit(1)
    }
    console.log('Skip: No changed files detected. Skipping build.')
    process.exit(0)
  }

  const outsideRestricted = changed.filter((f) => !isInRestrictedPath(f))

  if (outsideRestricted.length > 0) {
    console.log('Proceed: Build will proceed. Changes detected outside restricted paths:')
    outsideRestricted.forEach((f) => console.log(`   ${f}`))
    process.exit(1)
  }

  console.log('Skip: All changed files are in restricted paths. Skipping build.')
  console.log(`   Changed: ${changed.join(' ')}`)
  process.exit(0)
}

main()
