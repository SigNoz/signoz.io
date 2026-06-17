#!/usr/bin/env node
/**
 * After CMS sync, calls /api/revalidate with selective paths + tags, or full revalidation as fallback.
 * Mirrors path logic from scripts/sync-content-to-strapi.js (generatePathField + sync folders).
 */

const fs = require('fs')

const BULK_THRESHOLD = Number(process.env.REVALIDATE_BULK_THRESHOLD || '25')

function getAssetsListFromEnv(envName, pathEnvName) {
  if (process.env[pathEnvName] && fs.existsSync(process.env[pathEnvName])) {
    try {
      const content = fs.readFileSync(process.env[pathEnvName], 'utf8')
      if (!content || !content.trim()) return []
      return JSON.parse(content)
    } catch (e) {
      console.warn(`⚠️ Failed to read ${pathEnvName}: ${e.message}`)
      return []
    }
  }
  return JSON.parse(process.env[envName] || '[]')
}

const CHANGED_FILES = getAssetsListFromEnv('CHANGED_FILES', 'CHANGED_FILES_PATH')
const DELETED_FILES = getAssetsListFromEnv('DELETED_FILES', 'DELETED_FILES_PATH')
const CHANGED_ASSETS = getAssetsListFromEnv('CHANGED_ASSETS', 'CHANGED_ASSETS_PATH')

let SYNC_FOLDERS
try {
  SYNC_FOLDERS = JSON.parse(
    process.env.SYNC_FOLDERS ||
      '["faqs","case-study","opentelemetry","comparisons","guides","blog"]'
  )
} catch {
  SYNC_FOLDERS = ['faqs', 'case-study', 'opentelemetry', 'comparisons', 'guides', 'blog']
}

const FOLDER_TO_URL_PREFIX = {
  opentelemetry: 'opentelemetry',
  faqs: 'faqs',
  'case-study': 'case-study',
  comparisons: 'comparisons',
  guides: 'guides',
  blog: 'blog',
}

const LISTICLE_CONFIG_DIR = 'constants/listicles'

function getFolderName(filePath) {
  const parts = filePath.split('/')
  if (parts[0] === 'data' && parts.length > 1) {
    return parts[1]
  }
  return null
}

function generatePathField(filePath, folderName) {
  const parts = filePath.split('/')
  const folderIndex = parts.indexOf(folderName)
  if (folderIndex === -1) return null

  const pathParts = parts.slice(folderIndex + 1)
  const fileName = pathParts[pathParts.length - 1]
  const fileNameWithoutExt = fileName.replace(/\.(mdx?|md)$/, '')
  pathParts[pathParts.length - 1] = fileNameWithoutExt
  return '/' + pathParts.join('/')
}

function filePathToCmsUrl(filePath) {
  const folderName = getFolderName(filePath)
  if (!folderName || !SYNC_FOLDERS.includes(folderName)) {
    return null
  }
  const prefix = FOLDER_TO_URL_PREFIX[folderName]
  if (!prefix) return null
  const pathField = generatePathField(filePath, folderName)
  if (!pathField) return null
  return `/${prefix}${pathField}`
}

function filePathToListicleKey(filePath) {
  const match = filePath.match(/^constants\/listicles\/([^/]+)\.json$/)
  return match ? match[1] : null
}

function changedAssetFileToListicleAssetPath(filePath) {
  if (filePath.startsWith('data-assets/')) {
    return `/${filePath.replace(/^data-assets\//, '')}`
  }

  return null
}

function collectListicleItems(config) {
  const items = []

  if (config.items) items.push(...config.items)
  if (config.staticSections) {
    config.staticSections.forEach((section) => items.push(...(section.items || [])))
  }
  if (config.sections) {
    config.sections.forEach((section) => {
      if (section.items) items.push(...section.items)
      if (section.subsections) {
        section.subsections.forEach((subsection) => items.push(...(subsection.items || [])))
      }
    })
  }

  return items
}

function listicleReferencesAsset(config, assetPath) {
  return collectListicleItems(config).some((item) => item.icon === assetPath)
}

function findListiclesForAssets(assetPaths) {
  if (!fs.existsSync(LISTICLE_CONFIG_DIR) || assetPaths.length === 0) {
    return []
  }

  const assetSet = new Set(assetPaths)
  const keys = []

  for (const file of fs
    .readdirSync(LISTICLE_CONFIG_DIR)
    .filter((entry) => entry.endsWith('.json'))) {
    const filePath = `${LISTICLE_CONFIG_DIR}/${file}`
    try {
      const config = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      if ([...assetSet].some((assetPath) => listicleReferencesAsset(config, assetPath))) {
        keys.push(file.replace(/\.json$/, ''))
      }
    } catch (error) {
      console.warn(
        `⚠️ Could not inspect ${filePath} for listicle asset revalidation: ${error.message}`
      )
    }
  }

  return keys
}

const DOCS_DIR = 'data/docs'

/**
 * Converts a docs MDX file path to its URL route.
 * e.g. data/docs/instrumentation.mdx -> /docs/instrumentation/
 *      data/docs/cloud.mdx -> /docs/cloud/
 *      data/docs/install/kubernetes.mdx -> /docs/install/kubernetes/
 */
function docsFileToRoute(filePath) {
  const rel = filePath.replace(/^data\/docs\//, '').replace(/\.(mdx?|md)$/, '')
  return `/docs/${rel}/`
}

/**
 * Scans data/docs/ MDX files for <Listicle name="KEY" /> usage and builds
 * a map of listicle key -> doc routes that embed it.
 */
function buildListicleKeyToDocPaths(keys) {
  const keySet = new Set(keys)
  if (keySet.size === 0) return new Map()

  const pattern = /<Listicle\s+name=["']([^"']+)["']/g
  const map = new Map()

  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = `${dir}/${entry.name}`
      if (entry.isDirectory()) {
        scanDir(full)
      } else if (/\.mdx?$/.test(entry.name)) {
        const content = fs.readFileSync(full, 'utf8')
        let match
        while ((match = pattern.exec(content)) !== null) {
          const key = match[1]
          if (keySet.has(key)) {
            if (!map.has(key)) map.set(key, [])
            map.get(key).push(docsFileToRoute(full))
          }
        }
        pattern.lastIndex = 0
      }
    }
  }

  if (fs.existsSync(DOCS_DIR)) scanDir(DOCS_DIR)
  return map
}

function getDocPathsForListicleKeys(keys) {
  const map = buildListicleKeyToDocPaths(keys)
  const paths = []
  for (const docPaths of map.values()) {
    paths.push(...docPaths)
  }
  return uniqueStrings(paths)
}

function uniqueStrings(arr) {
  return [...new Set(arr.filter(Boolean))]
}

function buildPayload() {
  const allContentFiles = [...CHANGED_FILES, ...DELETED_FILES]
  const cmsUrls = uniqueStrings(allContentFiles.map(filePathToCmsUrl))
  const listicleKeys = uniqueStrings(allContentFiles.map(filePathToListicleKey))
  const changedListicleAssetPaths = uniqueStrings(
    CHANGED_ASSETS.map(changedAssetFileToListicleAssetPath)
  )
  const listicleAssetKeys = findListiclesForAssets(changedListicleAssetPaths)
  const affectedListicleKeys = uniqueStrings([...listicleKeys, ...listicleAssetKeys])

  const hasAssetChanges = CHANGED_ASSETS.length > 0
  const hasCmsPaths = cmsUrls.length > 0
  const hasListicleChanges = affectedListicleKeys.length > 0

  if (cmsUrls.length > BULK_THRESHOLD) {
    console.log(
      `📣 Selective revalidation skipped: ${cmsUrls.length} paths exceed BULK_THRESHOLD (${BULK_THRESHOLD})`
    )
    return { mode: 'all', reason: 'bulk' }
  }

  if (!hasCmsPaths && !hasListicleChanges && hasAssetChanges) {
    console.log('📣 Asset-only change: using full revalidation (cannot map to page paths).')
    return { mode: 'all', reason: 'assets-only' }
  }

  if (!hasCmsPaths && !hasListicleChanges) {
    console.log('⏭️ No CMS-backed content paths in this sync; skipping revalidation.')
    return { mode: 'skip', reason: 'no-cms-paths' }
  }

  const extraTags = []
  if (cmsUrls.some((u) => u.startsWith('/comparisons/'))) {
    extraTags.push('comparisons-list')
  }
  if (cmsUrls.some((u) => u.startsWith('/guides/'))) {
    extraTags.push('guides-list')
  }
  if (cmsUrls.some((u) => u.startsWith('/blog/'))) {
    extraTags.push('blogs-list')
  }
  if (hasListicleChanges) {
    extraTags.push('listicles-list')
    affectedListicleKeys.forEach((key) => extraTags.push(`listicle-${key}`))
  }

  const listicleDocPaths = hasListicleChanges
    ? getDocPathsForListicleKeys(affectedListicleKeys)
    : []
  const allPaths = uniqueStrings([...cmsUrls, ...listicleDocPaths])

  return {
    mode: 'selective',
    paths: allPaths,
    tags: uniqueStrings(extraTags),
  }
}

async function main() {
  const baseUrl = process.env.BASE_URL
  const secret = process.env.REVALIDATE_SECRET

  if (!baseUrl || !secret) {
    console.error('❌ BASE_URL and REVALIDATE_SECRET are required')
    process.exit(1)
  }

  const decision = buildPayload()

  if (decision.mode === 'skip') {
    process.exit(0)
  }

  const body =
    decision.mode === 'all'
      ? {
          revalidateAll: true,
          clearCache: false,
          secret,
        }
      : {
          paths: decision.paths,
          tags: decision.tags.length > 0 ? decision.tags : undefined,
          clearCache: false,
          secret,
        }

  if (!baseUrl.startsWith('https://')) {
    console.warn('⚠️ BASE_URL is not HTTPS — secret may be transmitted insecurely')
  }

  const url = `${baseUrl.replace(/\/$/, '')}/api/revalidate`
  console.log(`🔄 POST ${url} (${decision.mode})`)

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = { raw: text }
  }

  if (!res.ok) {
    console.error('❌ Revalidation failed:', res.status, json)
    process.exit(1)
  }

  console.log('✅ Revalidation response:', JSON.stringify(json, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
