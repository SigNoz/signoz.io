const fs = require('fs')
const path = require('path')
const { parseArgs: nodeParseArgs } = require('node:util')

const BULK_THRESHOLD = Number(process.env.REVALIDATE_BULK_THRESHOLD || '25')

function parseArgs(argv) {
  const { values } = nodeParseArgs({
    args: argv || process.argv.slice(2),
    options: {
      'changed-files': { type: 'string' },
      'added-files': { type: 'string' },
      'renamed-files': { type: 'string' },
      'restore-files': { type: 'string' },
      'deleted-files': { type: 'string' },
      'changed-assets': { type: 'string' },
      'sidenav-changed': { type: 'boolean', default: false },
      'listicles-changed': { type: 'boolean', default: false },
      'changed-listicles': { type: 'string' },
      'deleted-listicles': { type: 'string' },
      'sync-folders': { type: 'string' },
    },
    strict: false,
  })
  return {
    changedFilesPath: values['changed-files'],
    addedFilesPath: values['added-files'],
    renamedFilesPath: values['renamed-files'],
    restoreFilesPath: values['restore-files'],
    deletedFilesPath: values['deleted-files'],
    changedAssetsPath: values['changed-assets'],
    sidenavChanged: values['sidenav-changed'],
    listiclesChanged: values['listicles-changed'],
    changedListiclesPath: values['changed-listicles'],
    deletedListiclesPath: values['deleted-listicles'],
    syncFolders: values['sync-folders'],
  }
}

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    if (!content || !content.trim()) return []
    return JSON.parse(content)
  } catch (e) {
    console.warn(`Warning: Failed to read ${filePath}: ${e.message}`)
    return []
  }
}

function loadFileList(cliPath, envPathName, envName) {
  if (cliPath) return readJsonFile(cliPath)
  if (process.env[envPathName] && fs.existsSync(process.env[envPathName])) {
    return readJsonFile(process.env[envPathName])
  }
  try {
    return JSON.parse(process.env[envName] || '[]')
  } catch {
    return []
  }
}

function hasFileListSource(cliPath, envPathName, envName) {
  if (cliPath && fs.existsSync(cliPath)) return true
  if (process.env[envPathName] && fs.existsSync(process.env[envPathName])) return true
  return Boolean(process.env[envName])
}

const cliArgs = parseArgs()

const CHANGED_FILES = loadFileList(cliArgs.changedFilesPath, 'CHANGED_FILES_PATH', 'CHANGED_FILES')
// null = added files unknown (legacy caller) → fall back to purging list tags on any change
const ADDED_FILES = hasFileListSource(cliArgs.addedFilesPath, 'ADDED_FILES_PATH', 'ADDED_FILES')
  ? loadFileList(cliArgs.addedFilesPath, 'ADDED_FILES_PATH', 'ADDED_FILES')
  : null
const RENAMED_FILES = loadFileList(cliArgs.renamedFilesPath, 'RENAMED_FILES_PATH', 'RENAMED_FILES')
const RESTORE_FILES = loadFileList(cliArgs.restoreFilesPath, 'RESTORE_FILES_PATH', 'RESTORE_FILES')
const DELETED_FILES = loadFileList(cliArgs.deletedFilesPath, 'DELETED_FILES_PATH', 'DELETED_FILES')
const CHANGED_ASSETS = loadFileList(
  cliArgs.changedAssetsPath,
  'CHANGED_ASSETS_PATH',
  'CHANGED_ASSETS'
)

let SYNC_FOLDERS
try {
  const raw = cliArgs.syncFolders || process.env.SYNC_FOLDERS
  SYNC_FOLDERS = raw
    ? JSON.parse(raw)
    : ['faqs', 'case-study', 'opentelemetry', 'comparisons', 'guides', 'blog', 'docs']
} catch {
  SYNC_FOLDERS = ['faqs', 'case-study', 'opentelemetry', 'comparisons', 'guides', 'blog', 'docs']
}

const FOLDER_TO_URL_PREFIX = {
  opentelemetry: 'opentelemetry',
  faqs: 'faqs',
  'case-study': 'case-study',
  comparisons: 'comparisons',
  guides: 'guides',
  blog: 'blog',
  docs: 'docs',
}

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

function uniqueStrings(arr) {
  return [...new Set(arr.filter(Boolean))]
}

const SIDENAV_CHANGED = cliArgs.sidenavChanged || process.env.SIDENAV_CHANGED === 'true'

const LISTICLES_CHANGED = cliArgs.listiclesChanged || process.env.LISTICLES_CHANGED === 'true'
const CHANGED_LISTICLES_RAW = loadFileList(
  cliArgs.changedListiclesPath,
  'CHANGED_LISTICLES_PATH',
  'CHANGED_LISTICLES'
)
const DELETED_LISTICLES_RAW = loadFileList(
  cliArgs.deletedListiclesPath,
  'DELETED_LISTICLES_PATH',
  'DELETED_LISTICLES'
)

const DOCS_DIR = path.resolve(__dirname, '..', 'data', 'docs')

function listicleFileToKey(filePath) {
  const base = filePath.split('/').pop() || filePath
  return base.replace(/\.json$/, '')
}

function findDocsPathsForListicle(listicleKey) {
  const results = []
  const escaped = listicleKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`<Listicle\\s[^>]*name=["']${escaped}["']`)

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        const content = fs.readFileSync(full, 'utf8')
        if (pattern.test(content)) {
          const rel = path.relative(DOCS_DIR, full)
          const urlPath = '/docs/' + rel.replace(/\.(mdx?|md)$/, '')
          results.push(urlPath)
        }
      }
    }
  }

  walk(DOCS_DIR)
  return results
}

function buildPayload({
  changedFiles = CHANGED_FILES,
  addedFiles = ADDED_FILES,
  renamedFiles = RENAMED_FILES,
  restoreFiles = RESTORE_FILES,
  deletedFiles = DELETED_FILES,
  changedAssets = CHANGED_ASSETS,
  sidenavChanged = SIDENAV_CHANGED,
  listiclesChanged = LISTICLES_CHANGED,
  changedListicles = CHANGED_LISTICLES_RAW,
  deletedListicles = DELETED_LISTICLES_RAW,
} = {}) {
  const allContentFiles = [...changedFiles, ...restoreFiles, ...deletedFiles]

  const cmsUrls = uniqueStrings(allContentFiles.map(filePathToCmsUrl))

  const hasAssetChanges = changedAssets.length > 0
  const hasCmsPaths = cmsUrls.length > 0

  // Sidenav changes affect every docs page — use full revalidation
  if (sidenavChanged) {
    console.log('📣 Sidenav changed: using full revalidation (sidebar appears on every docs page).')
    return { mode: 'all', reason: 'sidenav-changed' }
  }

  // Collect listicle-related paths and tags
  const listiclePaths = []
  const listicleTags = []
  const allListicleChanges = [...changedListicles, ...deletedListicles]
  if (listiclesChanged && allListicleChanges.length > 0) {
    for (const file of allListicleChanges) {
      const key = listicleFileToKey(file)
      listicleTags.push(`listicle-${key}`)
      const docsPaths = findDocsPathsForListicle(key)
      listiclePaths.push(...docsPaths)
    }
    console.log(
      `📣 Listicle changes: ${allListicleChanges.length} listicle(s) changed/deleted, ${listiclePaths.length} doc path(s) to revalidate.`
    )
  }

  const allPaths = uniqueStrings([...cmsUrls, ...listiclePaths])

  if (allPaths.length > BULK_THRESHOLD) {
    console.log(
      `📣 Selective revalidation skipped: ${allPaths.length} paths exceed BULK_THRESHOLD (${BULK_THRESHOLD})`
    )
    return { mode: 'all', reason: 'bulk' }
  }

  if (!hasCmsPaths && hasAssetChanges && listiclePaths.length === 0) {
    console.log('📣 Asset-only change: using full revalidation (cannot map to page paths).')
    return { mode: 'all', reason: 'assets-only' }
  }

  if (!hasCmsPaths && listiclePaths.length === 0 && listicleTags.length === 0) {
    console.log('⏭️ No CMS-backed content paths in this sync; skipping revalidation.')
    return { mode: 'skip', reason: 'no-cms-paths' }
  }

  // List tags feed list-shaped consumers (sitemaps, RSS, listing pages, sidenav membership).
  // Purging them makes the next renders refetch the full corpus from the CMS, so scope the
  // purge to membership changes (create/delete/rename/restore). Edited pages are already made
  // fresh by their path + per-slug tag revalidation. When added files are unknown (legacy
  // callers without --added-files), fall back to purging on any change.
  const membershipUrls =
    addedFiles === null
      ? cmsUrls
      : uniqueStrings(
          [...addedFiles, ...renamedFiles, ...restoreFiles, ...deletedFiles].map(filePathToCmsUrl)
        )

  if (addedFiles !== null && hasCmsPaths && membershipUrls.length === 0) {
    console.log('📣 Edit-only sync: skipping list-tag purges (no create/delete/rename).')
  }

  // Prefix → list cache tag (matches `${cmsCollection}-list` tags set in utils/strapi.ts)
  const URL_PREFIX_TO_LIST_TAG = {
    '/comparisons/': 'comparisons-list',
    '/guides/': 'guides-list',
    '/blog/': 'blogs-list',
    '/docs/': 'docs-list',
    '/faqs/': 'faqs-list',
    '/case-study/': 'case-studies-list',
    '/opentelemetry/': 'opentelemetries-list',
  }

  const extraTags = [...listicleTags]
  for (const [prefix, listTag] of Object.entries(URL_PREFIX_TO_LIST_TAG)) {
    if (membershipUrls.some((u) => u.startsWith(prefix))) {
      extraTags.push(listTag)
    }
  }

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

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

module.exports = { buildPayload, filePathToCmsUrl, parseArgs, readJsonFile, loadFileList }
