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
      '["faqs","case-study","opentelemetry","comparisons","guides","blog","docs"]'
  )
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

const SIDENAV_CHANGED = process.env.SIDENAV_CHANGED === 'true'
const LISTICLES_CHANGED = process.env.LISTICLES_CHANGED === 'true'
const CHANGED_LISTICLES_RAW = getAssetsListFromEnv('CHANGED_LISTICLES', 'CHANGED_LISTICLES_PATH')

const LISTICLE_TO_DOCS_PATHS = {
  'apm-instrumentation': ['/docs/instrumentation', '/docs/cloud'],
  'apm-dashboards': ['/docs/dashboards/dashboard-templates/apm-dashboards'],
  'aws-monitoring': ['/docs/aws-monitoring/overview'],
  'aws-one-click': ['/docs/integrations/aws/one-click-aws-integrations'],
  'azure-one-click': ['/docs/integrations/azure/one-click-azure-integrations'],
  'cicd-monitoring': ['/docs/cicd/overview'],
  'collection-agents': [
    '/docs/opentelemetry-collection-agents/get-started',
    '/docs/opentelemetry-collection-agents/k8s/get-started',
  ],
  'dashboard-templates': ['/docs/dashboards/dashboard-templates/overview', '/docs/cloud'],
  'host-metrics-dashboards': ['/docs/dashboards/dashboard-templates/hostmetrics-dashboards'],
  integrations: ['/docs/integrations/integrations-list'],
  'java-instrumentation': ['/docs/instrumentation/java/overview'],
  'javascript-instrumentation': ['/docs/instrumentation/javascript/overview'],
  'k8s-installation': ['/docs/install/kubernetes'],
  'kubernetes-dashboards': ['/docs/dashboards/dashboard-templates/kubernetes-dashboards'],
  'litellm-dashboards': ['/docs/dashboards/dashboard-templates/litellm-dashboards'],
  'llm-monitoring': ['/docs/llm-observability'],
  'logs-instrumentation': ['/docs/logs-management/send-logs-to-signoz', '/docs/cloud'],
  'logs-quick-start': [],
  'marketplace-installation': ['/docs/install/marketplaces'],
  'metrics-quick-start': ['/docs/metrics-management/send-metrics', '/docs/cloud'],
  'migrate-to-signoz': ['/docs/migration/migrate-to-signoz', '/docs/cloud'],
  'self-host-installation': ['/docs/install/self-host'],
  'web-vitals': ['/docs/frontend-monitoring/opentelemetry-web-vitals'],
  'apm-quick-start': [],
}

function listicleFileToKey(filePath) {
  const base = filePath.split('/').pop() || filePath
  return base.replace(/\.json$/, '')
}

function buildPayload() {
  const allContentFiles = [...CHANGED_FILES, ...DELETED_FILES]

  const cmsUrls = uniqueStrings(allContentFiles.map(filePathToCmsUrl))

  const hasAssetChanges = CHANGED_ASSETS.length > 0
  const hasCmsPaths = cmsUrls.length > 0

  // Sidenav changes affect every docs page — use full revalidation
  if (SIDENAV_CHANGED) {
    console.log('📣 Sidenav changed: using full revalidation (sidebar appears on every docs page).')
    return { mode: 'all', reason: 'sidenav-changed' }
  }

  // Collect listicle-related paths and tags
  const listiclePaths = []
  const listicleTags = []
  if (LISTICLES_CHANGED && CHANGED_LISTICLES_RAW.length > 0) {
    for (const file of CHANGED_LISTICLES_RAW) {
      const key = listicleFileToKey(file)
      listicleTags.push(`listicle-${key}`)
      const docsPaths = LISTICLE_TO_DOCS_PATHS[key]
      if (docsPaths) {
        listiclePaths.push(...docsPaths)
      }
    }
    console.log(
      `📣 Listicle changes: ${CHANGED_LISTICLES_RAW.length} listicle(s) changed, ${listiclePaths.length} doc path(s) to revalidate.`
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

  const extraTags = [...listicleTags]
  if (cmsUrls.some((u) => u.startsWith('/comparisons/'))) {
    extraTags.push('comparisons-list')
  }
  if (cmsUrls.some((u) => u.startsWith('/guides/'))) {
    extraTags.push('guides-list')
  }
  if (cmsUrls.some((u) => u.startsWith('/blog/'))) {
    extraTags.push('blogs-list')
  }
  if (cmsUrls.some((u) => u.startsWith('/docs/'))) {
    extraTags.push('docs-list')
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

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
