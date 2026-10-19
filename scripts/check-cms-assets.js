#!/usr/bin/env node

/**
 * Pre-commit hook: ensures assets referenced in CMS-synced MDX files
 * exist in data-assets/. If found only in public/, moves or copies them.
 *
 * Asset detection mirrors scripts/sync-content-to-strapi.js extractAssetPaths().
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const matter = require('gray-matter')
const { extractAssetPaths } = require('./cms-sync/asset-processor')

const SYNC_FOLDERS = [
  'faqs',
  'case-study',
  'opentelemetry',
  'comparisons',
  'guides',
  'blog',
  'docs',
]

const MIGRATED_PATTERN = new RegExp(`^data/(${SYNC_FOLDERS.join('|')})/.*\\.mdx?$`)

function getStagedMigratedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' })
  return output
    .trim()
    .split('\n')
    .filter((f) => f && MIGRATED_PATTERN.test(f))
}

function readStagedFile(filePath) {
  return execSync(`git show ":${filePath}"`, { encoding: 'utf8' })
}

function isUsedOutsideMigratedContent(assetPath) {
  const searchPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`

  try {
    const result = execSync(
      `git grep -l "${searchPath}" -- ':!data-assets/' ':!node_modules/' ':!.next/' ':!.git/'`,
      { encoding: 'utf8' }
    ).trim()

    const files = result.split('\n').filter(Boolean)
    return files.some((f) => !MIGRATED_PATTERN.test(f))
  } catch {
    return false
  }
}

function main() {
  const stagedFiles = getStagedMigratedFiles()
  if (stagedFiles.length === 0) return

  console.log(`\nChecking assets for ${stagedFiles.length} CMS-synced file(s)...\n`)

  const allAssets = new Map()

  for (const file of stagedFiles) {
    try {
      const raw = readStagedFile(file)
      const { data: frontmatter, content: body } = matter(raw)
      const assets = extractAssetPaths(body, frontmatter)

      for (const asset of assets) {
        if (!allAssets.has(asset)) allAssets.set(asset, new Set())
        allAssets.get(asset).add(file)
      }
    } catch (err) {
      console.warn(`  Warning: could not parse ${file}: ${err.message}`)
    }
  }

  if (allAssets.size === 0) {
    console.log('  No local assets referenced.\n')
    return
  }

  const errors = []
  const moved = []
  const copied = []

  for (const [assetPath, sourceFiles] of allAssets) {
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
    const dataAssetsPath = path.join('data-assets', cleanPath)
    const publicPath = path.join('public', cleanPath)

    // 1. Already in data-assets — pass
    if (fs.existsSync(dataAssetsPath)) continue

    // 2. Exists in public/
    if (fs.existsSync(publicPath)) {
      const usedElsewhere = isUsedOutsideMigratedContent(assetPath)

      fs.mkdirSync(path.dirname(dataAssetsPath), { recursive: true })
      fs.copyFileSync(publicPath, dataAssetsPath)
      execSync(`git add "${dataAssetsPath}"`)

      if (usedElsewhere) {
        // Keep the public/ copy; just add to data-assets
        copied.push({ asset: assetPath, from: publicPath, to: dataAssetsPath })
      } else {
        // Remove from public/ and stage the deletion
        fs.unlinkSync(publicPath)
        execSync(`git add "${publicPath}"`)
        moved.push({ asset: assetPath, from: publicPath, to: dataAssetsPath })
      }

      continue
    }

    // 3. Not found anywhere — fail
    const sources = Array.from(sourceFiles).join(', ')
    errors.push(
      `  Missing asset: ${assetPath}\n` +
        `     Referenced in: ${sources}\n` +
        `     Expected at: ${dataAssetsPath}`
    )
  }

  if (moved.length > 0) {
    console.log(`  Moved ${moved.length} asset(s) from public/ to data-assets/:`)
    for (const m of moved) console.log(`     ${m.from} -> ${m.to}`)
  }

  if (copied.length > 0) {
    console.log(
      `  Copied ${copied.length} asset(s) to data-assets/ (also used outside migrated content):`
    )
    for (const c of copied) console.log(`     ${c.from} -> ${c.to}`)
  }

  if (errors.length > 0) {
    console.error(`\n${errors.join('\n\n')}\n`)
    console.error(
      `Please add the missing asset(s) to data-assets/ and stage them before committing.\n`
    )
    process.exit(1)
  }

  if (moved.length > 0 || copied.length > 0) {
    console.log('\n  Assets resolved and staged.\n')
  } else {
    console.log('  All assets present in data-assets/.\n')
  }
}

main()
