const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const matter = require('gray-matter')
const axios = require('axios')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mime = require('mime-types')
const {
  createEmptyManifest,
  normalizeManifest,
  contentManifestKey,
  listicleManifestKey,
  buildManifestMap,
  getContentReconciliationAction,
  getListicleReconciliationAction,
} = require('./cms-sync-manifest')

const DEPLOYMENT_STATUS = process.env.DEPLOYMENT_STATUS
const SYNC_MANIFEST_PATH = process.env.SYNC_MANIFEST_PATH
const RECONCILE_STAGING = process.env.RECONCILE_STAGING === 'true'
const IS_PR_CLOSED = process.env.IS_PR_CLOSED === 'true'
const BASE_REF = process.env.BASE_REF || process.env.GITHUB_BASE_REF || 'main'

const CMS_BATCH_SIZE = parseInt(process.env.CMS_BATCH_SIZE || '10', 10)
const CMS_BATCH_DELAY_MS = parseInt(process.env.CMS_BATCH_DELAY_MS || '1000', 10)
const CMS_MAX_RETRIES = parseInt(process.env.CMS_MAX_RETRIES || '5', 10)
const CMS_INITIAL_RETRY_DELAY_MS = parseInt(process.env.CMS_INITIAL_RETRY_DELAY_MS || '1000', 10)
const REPO_ROOT = path.resolve(__dirname, '..')
const _baseFileContentCache = new Map()

const CMS_API_URL =
  DEPLOYMENT_STATUS === 'staging' ? process.env.CMS_STAGING_API_URL : process.env.CMS_API_URL
const CMS_API_TOKEN =
  DEPLOYMENT_STATUS === 'staging' ? process.env.CMS_STAGING_API_TOKEN : process.env.CMS_API_TOKEN

const SYNC_FOLDERS = JSON.parse(process.env.SYNC_FOLDERS || '[]')

function getAssetsListFromEnv(envName, pathEnvName) {
  if (process.env[pathEnvName] && fs.existsSync(process.env[pathEnvName])) {
    try {
      const content = fs.readFileSync(process.env[pathEnvName], 'utf8')
      // If the file content is empty or just whitespace, return empty array
      if (!content || !content.trim()) return []
      return JSON.parse(content)
    } catch (e) {
      console.warn(`⚠️ Failed to read or parse file from ${pathEnvName}: ${e.message}`)
      // Fallback to empty array if file reading fails
      return []
    }
  }
  return JSON.parse(process.env[envName] || '[]')
}

const CHANGED_FILES = getAssetsListFromEnv('CHANGED_FILES', 'CHANGED_FILES_PATH')
const DELETED_FILES = getAssetsListFromEnv('DELETED_FILES', 'DELETED_FILES_PATH')
const CHANGED_ASSETS = getAssetsListFromEnv('CHANGED_ASSETS', 'CHANGED_ASSETS_PATH')

const LISTICLES_CHANGED = process.env.LISTICLES_CHANGED === 'true'
const CHANGED_LISTICLES = getAssetsListFromEnv('CHANGED_LISTICLES', 'CHANGED_LISTICLES_PATH')
const DELETED_LISTICLES = getAssetsListFromEnv('DELETED_LISTICLES', 'DELETED_LISTICLES_PATH')
const LISTICLES_DIR = path.resolve(__dirname, '..', 'constants', 'listicles')

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
const S3_REGION = process.env.S3_REGION
const CDN_URL = process.env.CDN_URL
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function chunk(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

function readPreviousManifest() {
  if (!SYNC_MANIFEST_PATH || !fs.existsSync(SYNC_MANIFEST_PATH)) return createEmptyManifest()
  try {
    return normalizeManifest(JSON.parse(fs.readFileSync(SYNC_MANIFEST_PATH, 'utf8')))
  } catch {
    return createEmptyManifest()
  }
}

function writeManifest(manifest) {
  if (!SYNC_MANIFEST_PATH) return
  fs.mkdirSync(path.dirname(SYNC_MANIFEST_PATH), { recursive: true })
  fs.writeFileSync(SYNC_MANIFEST_PATH, JSON.stringify(normalizeManifest(manifest), null, 2))
}

function sanitizeEntityForRestore(entity) {
  if (!entity || typeof entity !== 'object') return null

  const systemFields = new Set([
    'id',
    'documentId',
    'createdAt',
    'updatedAt',
    'publishedAt',
    'createdBy',
    'updatedBy',
    'locale',
    'localizations',
  ])

  return Object.fromEntries(
    Object.entries(entity).filter(([key, value]) => !systemFields.has(key) && value !== undefined)
  )
}

function getBaseRefCandidates() {
  const candidates = []
  const addCandidate = (candidate) => {
    if (candidate && !candidates.includes(candidate)) candidates.push(candidate)
  }

  addCandidate(`origin/${BASE_REF}`)
  addCandidate(BASE_REF)
  addCandidate('origin/main')
  addCandidate('main')

  return candidates
}

function readFileFromGitRef(filePath, gitRef) {
  try {
    return execFileSync('git', ['show', `${gitRef}:${filePath}`], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
  } catch {
    return null
  }
}

function readBaseFileContent(filePath) {
  if (!filePath) return null
  if (_baseFileContentCache.has(filePath)) {
    return _baseFileContentCache.get(filePath)
  }

  let baseContent = null
  for (const gitRef of getBaseRefCandidates()) {
    const content = readFileFromGitRef(filePath, gitRef)
    if (content !== null) {
      baseContent = content
      break
    }
  }

  _baseFileContentCache.set(filePath, baseContent)
  return baseContent
}

function markSyncResultsReconciled(reason) {
  const resultsPath = path.join(process.cwd(), 'sync-results.json')
  let syncResults = null

  try {
    syncResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'))
  } catch {
    syncResults = {
      created: [],
      updated: [],
      deleted: [],
      restored: [],
      skipped: [],
      errors: [],
      relationWarnings: [],
      deploymentStatus: DEPLOYMENT_STATUS,
    }
  }

  syncResults.hasReconciledEntries = true
  syncResults.reconciledReasons = Array.from(
    new Set([...(syncResults.reconciledReasons || []), reason])
  )

  fs.writeFileSync(resultsPath, JSON.stringify(syncResults, null, 2))
}

async function withRetry(fn, label) {
  for (let attempt = 1; attempt <= CMS_MAX_RETRIES; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === CMS_MAX_RETRIES) {
        throw error
      }

      const status = error.response?.status
      const code = error.code

      let delayMs
      if (status === 429 && error.response?.headers?.['retry-after']) {
        delayMs = parseInt(error.response.headers['retry-after'], 10) * 1000
        if (isNaN(delayMs)) delayMs = CMS_INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1)
      } else {
        delayMs = CMS_INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1)
      }

      console.warn(
        `  ⚠️ [${label}] Attempt ${attempt}/${CMS_MAX_RETRIES} failed (${status || code || error.message}). Retrying in ${delayMs}ms...`
      )
      await sleep(delayMs)
    }
  }
}

// URL prefix to Strapi endpoint/content_type mapping for related_articles component
const RELATED_ARTICLE_TYPE_MAP = {
  docs: { endpoint: 'docs', content_type: 'doc' },
  guides: { endpoint: 'guides', content_type: 'guide' },
  comparisons: { endpoint: 'comparisons', content_type: 'comparison' },
  blog: { endpoint: 'blogs', content_type: 'blog' },
  faqs: { endpoint: 'faqs', content_type: 'faq' },
  opentelemetry: { endpoint: 'opentelemetries', content_type: 'opentelemetry' },
  'case-study': { endpoint: 'case-studies', content_type: 'case_study' },
}

// Strapi Collection Type Schemas
const COLLECTION_SCHEMAS = {
  faqs: {
    apiPath: 'api::faq.faq',
    endpoint: 'faqs',
    fields: [
      'title',
      'description',
      'date',
      'published_date',
      'updated_date',
      'path',
      'content',
      'deployment_status',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  'case-study': {
    apiPath: 'api::case-study.case-study',
    endpoint: 'case-studies',
    fields: [
      'title',
      'description',
      'image',
      'published_date',
      'updated_date',
      'path',
      'content',
      'deployment_status',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
    },
  },
  comparisons: {
    apiPath: 'api::comparison.comparison',
    endpoint: 'comparisons',
    fields: [
      'title',
      'description',
      'image',
      'published_date',
      'updated_date',
      'path',
      'content',
      'deployment_status',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  guides: {
    apiPath: 'api::guide.guide',
    endpoint: 'guides',
    fields: [
      'title',
      'description',
      'image',
      'path',
      'content',
      'deployment_status',
      'date',
      'published_date',
      'updated_date',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  opentelemetry: {
    apiPath: 'api::opentelemetry.opentelemetry',
    endpoint: 'opentelemetries',
    fields: [
      'title',
      'description',
      'image',
      'path',
      'content',
      'deployment_status',
      'date',
      'published_date',
      'updated_date',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  blog: {
    apiPath: 'api::blog.blog',
    endpoint: 'blogs',
    fields: [
      'title',
      'description',
      'image',
      'path',
      'content',
      'deployment_status',
      'date',
      'published_date',
      'updated_date',
      'is_newsroom',
      'hide_table_of_contents',
      'excludeFromSitemap',
    ],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  docs: {
    apiPath: 'api::doc.doc',
    endpoint: 'docs',
    fields: ['title', 'path', 'content', 'deployment_status'],
    hasRelatedArticles: true,
    relations: {
      authors: {
        endpoint: 'authors',
        matchField: 'key',
        frontmatterField: 'authors',
      },
      tags: {
        endpoint: 'tags',
        matchField: 'key',
        frontmatterField: 'tags',
        filterKey: true,
        matchValue: true,
      },
      keywords: {
        endpoint: 'keywords',
        matchField: 'key',
        frontmatterField: 'keywords',
        filterKey: true,
        matchValue: true,
      },
    },
  },
  authors: {
    apiPath: 'api::author.author',
    endpoint: 'authors',
    fields: ['key', 'name', 'title', 'url', 'image_url'],
  },
  tags: {
    apiPath: 'api::tag.tag',
    endpoint: 'tags',
    fields: ['value', 'key', 'description'],
  },
  keywords: {
    apiPath: 'api::keyword.keyword',
    endpoint: 'keywords',
    fields: ['value', 'key', 'description'],
  },
}

// Helper: Extract folder name from file path
function getFolderName(filePath) {
  const parts = filePath.split('/')
  if (parts[0] === 'data' && parts.length > 1) {
    return parts[1]
  }
  return null
}

// Helper: Generate path field from file path
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

// Helper: Parse MDX file
function parseMDXFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return parseMDXContent(filePath, fileContent)
  } catch (error) {
    throw new Error(`Failed to parse file ${filePath}: ${error.message}`)
  }
}

function parseMDXContent(filePath, fileContent) {
  try {
    const { data: frontmatter, content } = matter(fileContent)
    return { frontmatter, content }
  } catch (error) {
    throw new Error(`Failed to parse file ${filePath}: ${error.message}`)
  }
}

/**
 * Remove GFM fenced code blocks so illustrative JSX/HTML in docs is not scanned as assets.
 * Opening/closing fences must allow leading whitespace: list-nested blocks
 */
function stripFencedCodeBlocks(content) {
  let out = content.replace(/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```/gm, '\n')
  out = out.replace(/^[ \t]*~~~[^\n]*\n[\s\S]*?^[ \t]*~~~/gm, '\n')
  return out
}

// Helper: Extract asset paths from content and frontmatter
function extractAssetPaths(content, frontmatter) {
  const paths = new Set()

  const bodyForScan = stripFencedCodeBlocks(content)

  const mdImageRegex = /!\[.*?\]\((.*?)\)/g

  let match
  while ((match = mdImageRegex.exec(bodyForScan)) !== null) {
    if (match[1] && !match[1].startsWith('http') && !match[1].startsWith('https')) {
      paths.add(match[1])
    }
  }

  const componentTags = ['img', 'video', 'source', 'Image', 'Figure', 'Table', 'NextImage']

  componentTags.forEach((tagName) => {
    const tagRegex = new RegExp(
      `<${tagName}[^>]*?\\s+src\\s*=\\s*["']([^"']+)["'][^>]*?(?:/>|>[\\s\\S]*?</${tagName}>)`,
      'gi'
    )

    let match
    while ((match = tagRegex.exec(bodyForScan)) !== null) {
      const srcValue = match[1]
      if (srcValue && !srcValue.startsWith('http') && !srcValue.startsWith('https')) {
        paths.add(srcValue)
      }
    }

    // src appears without quotes
    const tagRegexNoQuotes = new RegExp(
      `<${tagName}[^>]*?\\s+src\\s*=\\s*([^\\s>"']+)[^>]*?(?:/>|>[\\s\\S]*?</${tagName}>)`,
      'gi'
    )

    while ((match = tagRegexNoQuotes.exec(bodyForScan)) !== null) {
      const srcValue = match[1]
      if (srcValue && !srcValue.startsWith('http') && !srcValue.startsWith('https')) {
        paths.add(srcValue)
      }
    }
  })

  // Recursively check frontmatter fields for potential asset paths
  function checkValue(value) {
    if (typeof value === 'string') {
      // Check if string looks like a local asset path
      // Criteria: Starts with /, does not start with http, has file extension
      // Ignores strings starting with http/https
      if (
        value.startsWith('/') &&
        !value.startsWith('http') &&
        !value.startsWith('https') &&
        /\.[a-zA-Z0-9]+$/.test(value)
      ) {
        paths.add(value)
      }
    } else if (Array.isArray(value)) {
      value.forEach(checkValue)
    } else if (typeof value === 'object' && value !== null) {
      Object.values(value).forEach(checkValue)
    }
  }

  checkValue(frontmatter)
  return Array.from(paths)
}

// Helper: Check if asset exists on CDN
async function checkCDN(assetPath) {
  const url = `${CDN_URL}${assetPath.startsWith('/') ? '' : '/'}${assetPath}`
  try {
    await axios.head(url)
    return true
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false
    }

    console.warn(`    ⚠️ Error checking CDN for ${url}: ${error.message}`)
    return false
  }
}

// Helper: Upload asset to S3
async function uploadToS3(localPath, s3Key) {
  try {
    const fileContent = fs.readFileSync(localPath)
    const contentType = mime.lookup(localPath) || 'application/octet-stream'

    await s3Client.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: s3Key,
        Body: fileContent,
        ContentType: contentType,
      })
    )
  } catch (error) {
    throw new Error(`Failed to upload ${s3Key} to S3: ${error.message}`)
  }
}

// Helper: Sync single asset
async function syncAsset(assetPath) {
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
  const localPath = path.join('data-assets', cleanPath)
  const s3Key = `web/${cleanPath}`

  const localExists = fs.existsSync(localPath)
  const onCDN = await checkCDN(cleanPath)

  const isChangedInPR = CHANGED_ASSETS.includes(localPath)

  if (!localExists && !onCDN) {
    throw new Error(
      `❌ Asset Sync Failed: The asset "${assetPath}" was referenced but does not exist in 'data-assets' and was not found on the CDN. \n` +
        `   Please ensure the asset exists at "${localPath}" or remove the reference.`
    )
  }

  if (localExists) {
    if (!onCDN || isChangedInPR) {
      await uploadToS3(localPath, s3Key)
    }
  }
}

// Helper: Replace asset paths with CDN URLs
function replaceAssetPaths(content, frontmatter, assets) {
  let newContent = content
  const newFrontmatter = { ...frontmatter }

  assets.forEach((assetPath) => {
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
    const cdnUrl = `${CDN_URL}/${cleanPath}`
    const escapedAssetPath = assetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const attrPattern = new RegExp(`(src\\s*=\\s*["'])${escapedAssetPath}(["'])`, 'g')
    newContent = newContent.replace(attrPattern, `$1${cdnUrl}$2`)

    const mdPattern = new RegExp(`(!\\[.*?\\]\\()${escapedAssetPath}(\\))`, 'g')
    newContent = newContent.replace(mdPattern, `$1${cdnUrl}$2`)

    const noQuotesPattern = new RegExp(`(src\\s*=\\s*)${escapedAssetPath}([\\s>])`, 'g')
    newContent = newContent.replace(noQuotesPattern, `$1${cdnUrl}$2`)

    // Replace in frontmatter
    Object.keys(newFrontmatter).forEach((key) => {
      if (newFrontmatter[key] === assetPath) {
        newFrontmatter[key] = cdnUrl
      }
    })
  })

  return { content: newContent, frontmatter: newFrontmatter }
}

// Helper: Fetch all entities from Strapi endpoint
// Helper: Filter entities by deployment_status when available
function filterEntitiesByDeploymentStatus(entities) {
  if (!Array.isArray(entities) || entities.length === 0) {
    return entities
  }

  const filteredEntities = entities.filter((entity) => {
    if (!Object.prototype.hasOwnProperty.call(entity, 'deployment_status')) {
      return true
    }

    if (entity.deployment_status === null || entity.deployment_status === undefined) {
      return true
    }

    return entity.deployment_status === DEPLOYMENT_STATUS
  })

  return filteredEntities
}

// Helper: Create a tag or keyword entry
async function createTagOrKeyword(endpoint, value, folderName) {
  try {
    // Generate key by appending folder name to the value (lowercase, hyphenated)
    const key = `${folderName}-${value}`

    const data = {
      key: key,
      value: value,
      // description is optional, so we don't include it
    }

    const response = await withRetry(
      () =>
        axios.post(
          `${CMS_API_URL}/api/${endpoint}`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${CMS_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        ),
      `createTagOrKeyword(${endpoint}, ${value})`
    )

    return response.data.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    console.error(`    ❌ Failed to create ${endpoint} entry: ${errorMsg}`)
    throw error
  }
}

// Helper: Parse a related article URL into prefix and path
// e.g. '/guides/what-is-prometheus/' -> { prefix: 'guides', path: '/what-is-prometheus' }
function parseRelatedArticleUrl(url) {
  const cleaned = url.replace(/^\/+|\/+$/g, '')
  const slashIdx = cleaned.indexOf('/')
  if (slashIdx === -1) return null

  const prefix = cleaned.substring(0, slashIdx)
  const slug = cleaned.substring(slashIdx + 1)
  const articlePath = `/${slug.replace(/\/+$/, '')}`

  return { prefix, path: articlePath }
}

// Cache for entity lookups during related articles resolution
const _relatedArticleEntityCache = {}
const _relationEntityCache = {}
const _existingEntriesCache = {}

async function fetchEntitiesByFilter(endpoint, filterField, values) {
  if (!values || values.length === 0) return []

  // Strapi $in filter: filters[field][$in][0]=val0&filters[field][$in][1]=val1...
  // Batch into groups of 100 to avoid URL length limits
  const batchSize = 100
  const allEntities = []

  for (let i = 0; i < values.length; i += batchSize) {
    const batch = values.slice(i, i + batchSize)
    const filterParams = {}
    batch.forEach((val, idx) => {
      filterParams[`filters[${filterField}][$in][${idx}]`] = val
    })

    let page = 1
    let pageCount = 1

    do {
      const currentPage = page
      const response = await withRetry(
        () =>
          axios.get(`${CMS_API_URL}/api/${endpoint}`, {
            params: {
              ...filterParams,
              'pagination[page]': currentPage,
              'pagination[pageSize]': 100,
            },
            headers: {
              Authorization: `Bearer ${CMS_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }),
        `fetchFiltered(${endpoint}, ${filterField}, page=${currentPage})`
      )

      const data = response.data.data || []
      allEntities.push(...data)

      const meta = response.data.meta || {}
      const pagination = meta.pagination || {}
      pageCount = pagination.pageCount || 1
      page++
    } while (page <= pageCount)
  }

  return allEntities
}

async function prefetchRelationEntities(pendingOperations) {
  // Collect the actual values needed per relation endpoint from frontmatter
  const endpointValues = {} // { endpoint: { matchField, values: Set } }

  for (const op of pendingOperations) {
    if (op.type === 'delete') continue
    const schema = COLLECTION_SCHEMAS[op.folderName]
    if (!schema?.relations) continue

    for (const [, relationConfig] of Object.entries(schema.relations)) {
      const { endpoint, matchField, frontmatterField, filterKey } = relationConfig
      const fmValues = op.frontmatter?.[frontmatterField]
      if (!fmValues || !Array.isArray(fmValues) || fmValues.length === 0) continue

      if (!endpointValues[endpoint]) {
        endpointValues[endpoint] = {
          matchField: filterKey ? 'value' : matchField,
          values: new Set(),
        }
      }
      for (const v of fmValues) endpointValues[endpoint].values.add(v)
    }
  }

  const endpointNames = Object.keys(endpointValues)
  console.log(
    `\n📦 Prefetching relation entities for ${endpointNames.length} endpoint(s): ${endpointNames.join(', ')}`
  )

  for (const [endpoint, { matchField, values }] of Object.entries(endpointValues)) {
    try {
      const entities = await fetchEntitiesByFilter(endpoint, matchField, [...values])
      _relationEntityCache[endpoint] = filterEntitiesByDeploymentStatus(entities)
      console.log(
        `  ✅ ${endpoint}: ${_relationEntityCache[endpoint].length} entities (filtered from ${values.size} values)`
      )
    } catch (err) {
      console.warn(`  ⚠️ Failed to prefetch ${endpoint}: ${err.message}`)
      _relationEntityCache[endpoint] = []
    }
  }

  // Prefetch related_articles — collect paths referenced in frontmatter
  const relatedPathsByPrefix = {} // { prefix: Set<path> }

  for (const op of pendingOperations) {
    if (op.type === 'delete') continue
    const urls = op.frontmatter?.related_articles
    if (!urls || !Array.isArray(urls)) continue

    for (const url of urls) {
      const parsed = parseRelatedArticleUrl(url)
      if (!parsed) continue
      const typeInfo = RELATED_ARTICLE_TYPE_MAP[parsed.prefix]
      if (!typeInfo) continue

      if (!relatedPathsByPrefix[parsed.prefix]) {
        relatedPathsByPrefix[parsed.prefix] = new Set()
      }
      relatedPathsByPrefix[parsed.prefix].add(parsed.path)
    }
  }

  for (const [prefix, paths] of Object.entries(relatedPathsByPrefix)) {
    const typeInfo = RELATED_ARTICLE_TYPE_MAP[prefix]
    const cachedEntities = _relatedArticleEntityCache[prefix] || []
    const cachedPaths = new Set(cachedEntities.map((entity) => entity.path).filter(Boolean))
    const pathsToFetch = [...paths].filter((relatedPath) => !cachedPaths.has(relatedPath))

    if (pathsToFetch.length === 0) continue

    try {
      let entities = await fetchEntitiesByFilter(typeInfo.endpoint, 'path', pathsToFetch)
      entities = filterEntitiesByDeploymentStatus(entities)
      const mergedByPath = new Map()
      for (const entity of [...cachedEntities, ...entities]) {
        if (entity.path) mergedByPath.set(entity.path, entity)
      }
      _relatedArticleEntityCache[prefix] = [...mergedByPath.values()]
      console.log(
        `  ✅ related_articles/${prefix}: ${entities.length} fetched, ${_relatedArticleEntityCache[prefix].length} cached`
      )
    } catch (err) {
      console.warn(`  ⚠️ Failed to prefetch related_articles/${prefix}: ${err.message}`)
      _relatedArticleEntityCache[prefix] = cachedEntities
    }
  }
}

async function prefetchExistingEntries(pendingOperations) {
  // Group paths by folder name so we only fetch the entries we need
  const pathsByFolder = {}

  for (const op of pendingOperations) {
    if (!pathsByFolder[op.folderName]) {
      pathsByFolder[op.folderName] = []
    }
    pathsByFolder[op.folderName].push(op.pathField)
  }

  const folderNames = Object.keys(pathsByFolder)
  console.log(
    `\n📦 Prefetching existing entries for ${folderNames.length} content type(s): ${folderNames.join(', ')}`
  )

  for (const folderName of folderNames) {
    const schema = COLLECTION_SCHEMAS[folderName]
    if (!schema) continue

    const paths = pathsByFolder[folderName]

    try {
      const entities = await fetchEntitiesByFilter(schema.endpoint, 'path', paths)
      const filtered = filterEntitiesByDeploymentStatus(entities)
      const entryMap = new Map()
      for (const entity of filtered) {
        if (entity.path) {
          entryMap.set(entity.path, entity)
        }
      }
      _existingEntriesCache[folderName] = entryMap
      console.log(
        `  ✅ ${schema.endpoint}: ${entryMap.size} entries cached (queried ${paths.length} paths)`
      )
    } catch (err) {
      console.warn(`  ⚠️ Failed to prefetch ${schema.endpoint}: ${err.message}`)
      _existingEntriesCache[folderName] = new Map()
    }
  }
}

function findEntryByPathCached(folderName, pathField) {
  const cache = _existingEntriesCache[folderName]
  if (!cache) return null
  return cache.get(pathField) || null
}

// Helper: Resolve related_articles frontmatter into component data with actual document relations.
// Each component entry sets content_type + the matching relation field to the document ID.
// Articles not found in Strapi are skipped (they'll be picked up on next sync after migration).
async function resolveRelatedArticlesComponent(frontmatter) {
  const urls = frontmatter.related_articles
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return { components: [], warnings: [] }
  }

  const components = []
  const warnings = []

  // Collect unique types to prefetch
  const typesToFetch = new Set()
  const parsedUrls = []

  for (const url of urls) {
    const parsed = parseRelatedArticleUrl(url)
    if (!parsed) {
      warnings.push({ url, reason: 'Could not parse URL' })
      parsedUrls.push(null)
      continue
    }

    const typeInfo = RELATED_ARTICLE_TYPE_MAP[parsed.prefix]
    if (!typeInfo) {
      warnings.push({ url, reason: `Unknown content type prefix: ${parsed.prefix}` })
      parsedUrls.push(null)
      continue
    }

    typesToFetch.add(parsed.prefix)
    parsedUrls.push({ ...parsed, typeInfo, originalUrl: url })
  }

  // Prefetch entities for each referenced type (cached across calls within a sync run)
  for (const prefix of typesToFetch) {
    if (!_relatedArticleEntityCache[prefix]) {
      const typeInfo = RELATED_ARTICLE_TYPE_MAP[prefix]
      // Collect only the paths we need for this prefix
      const pathsNeeded = parsedUrls.filter((p) => p && p.prefix === prefix).map((p) => p.path)
      try {
        let entities = await fetchEntitiesByFilter(typeInfo.endpoint, 'path', pathsNeeded)
        entities = filterEntitiesByDeploymentStatus(entities)
        _relatedArticleEntityCache[prefix] = entities
      } catch (err) {
        console.warn(`    Could not fetch ${prefix} from Strapi: ${err.message}`)
        _relatedArticleEntityCache[prefix] = []
      }
    }
  }

  for (const parsed of parsedUrls) {
    if (!parsed) continue

    const { prefix, path: articlePath, typeInfo, originalUrl } = parsed
    const entities = _relatedArticleEntityCache[prefix] || []

    // Look up by path in Strapi to get documentId for the relation
    const match = entities.find((e) => e.path === articlePath)

    if (!match || !match.documentId) {
      warnings.push({
        url: originalUrl,
        reason: `Document not found in Strapi (${typeInfo.endpoint}). Will be resolved after content is migrated.`,
      })
      continue
    }

    // Build component entry: set content_type + the matching relation field
    // Relation field name matches content_type (case-study -> case_study for field name)
    const relationFieldName = typeInfo.content_type.replace(/-/g, '_')
    const entry = {
      content_type: typeInfo.content_type,
      [relationFieldName]: match.documentId,
    }

    components.push(entry)
  }

  return { components, warnings }
}

// Helper: Resolve relation IDs
async function resolveRelations(folderName, frontmatter, entityCache) {
  const schema = COLLECTION_SCHEMAS[folderName]
  if (!schema.relations) return { relations: {}, warnings: [] }

  const relations = {}
  const warnings = []

  for (const [relationName, relationConfig] of Object.entries(schema.relations)) {
    const frontmatterValues = frontmatter[relationConfig.frontmatterField]

    // Skip if no values in frontmatter
    if (!frontmatterValues || !Array.isArray(frontmatterValues) || frontmatterValues.length === 0) {
      continue
    }

    // Check if this is tags or keywords relation
    const isTagsOrKeywords = relationName === 'tags' || relationName === 'keywords'

    let entities
    if (entityCache && entityCache[relationConfig.endpoint]) {
      entities = entityCache[relationConfig.endpoint]
    } else {
      // Fallback: fetch only the values we need instead of all entities
      const valuesToFind = frontmatterValues
      const filterField = relationConfig.filterKey ? 'value' : relationConfig.matchField
      entities = await fetchEntitiesByFilter(relationConfig.endpoint, filterField, valuesToFind)
      entities = filterEntitiesByDeploymentStatus(entities)
    }

    if (entities.length === 0 && !isTagsOrKeywords) {
      console.warn(`  ⚠️ No entities found in ${relationConfig.endpoint}`)
      continue
    }

    // Match entities based on configuration
    const matchedIds = []
    const unmatchedValues = []

    for (const value of frontmatterValues) {
      let matched = null

      if (relationConfig.filterKey && relationConfig.matchValue) {
        // Special case for tags: check key contains folder name AND value matches (case-sensitive)
        matched = entities.find((entity) => {
          const keyMatch = entity?.key && entity?.key.includes(folderName)

          const valueMatch = entity?.value && entity?.value === value

          return keyMatch && valueMatch
        })
      } else if (relationConfig.matchValue) {
        // Match against value field (case-sensitive)
        matched = entities.find((entity) => entity?.value && entity?.value === value)
      } else {
        // Match against specified field (exact match)
        matched = entities.find((entity) => entity?.[relationConfig.matchField] === value)
      }

      // Check if matched and has documentId
      if (matched && matched?.documentId) {
        matchedIds.push(matched.documentId)
      } else if (matched && !matched?.documentId) {
        // Matched entity but no documentId
        unmatchedValues.push(value)
        console.warn(
          `    ⚠️ Entity found for "${value}" but no documentId in ${relationConfig.endpoint}`
        )
      } else {
        // No match found
        console.warn(`    ⚠️ No match found for "${value}" in ${relationConfig.endpoint}`)

        // Auto-create tags or keywords if not found
        if (isTagsOrKeywords) {
          try {
            const newEntry = await createTagOrKeyword(relationConfig.endpoint, value, folderName)

            if (newEntry && newEntry.documentId) {
              matchedIds.push(newEntry.documentId)
              // Add to entities array so it's available for subsequent matches
              entities.push(newEntry)
            } else {
              unmatchedValues.push(value)
              console.error(`    ❌ Created entry but no documentId returned for "${value}"`)
            }
          } catch (createError) {
            unmatchedValues.push(value)
            console.error(
              `    ❌ Failed to auto-create ${relationName} for "${value}": ${createError.message}`
            )
          }
        } else {
          unmatchedValues.push(value)
        }
      }
    }

    // Log unmatched values for this field
    if (unmatchedValues.length > 0) {
      console.warn(
        `  ⚠️ ${relationName}: ${unmatchedValues.length} unmatched value(s): ${unmatchedValues.join(', ')}`
      )
      warnings.push({
        relationName,
        unmatchedValues,
      })
    }

    // Only add relation if at least one valid documentId was found
    if (matchedIds.length > 0) {
      relations[relationName] = matchedIds
    } else {
      console.warn(`  ⚠️ ${relationName}: No valid relations found, key will be omitted`)
    }
  }

  return { relations, warnings }
}

// Helper: Map MDX data to Strapi schema
async function mapToStrapiSchema(folderName, frontmatter, content, pathField, entityCache) {
  const schema = COLLECTION_SCHEMAS[folderName]
  if (!schema) {
    throw new Error(`No schema defined for folder: ${folderName}`)
  }

  // Base data
  const data = {
    path: pathField,
    content: content,
    deployment_status: DEPLOYMENT_STATUS,
    ...frontmatter,
  }

  // Resolve relations
  const { relations, warnings } = await resolveRelations(folderName, frontmatter, entityCache)

  // Remove raw frontmatter relation fields
  if (schema.relations) {
    for (const [relationName, relationConfig] of Object.entries(schema.relations)) {
      const fieldName = relationConfig.frontmatterField
      if (data[fieldName]) {
        delete data[fieldName]
      }
    }
  }

  // Clean up legacy related_* frontmatter fields that are no longer schema relations
  const legacyRelatedFields = [
    'related_guides',
    'related_comparisons',
    'related_blogs',
    'related_faqs',
  ]
  for (const field of legacyRelatedFields) {
    if (data[field]) {
      delete data[field]
    }
  }

  if (Object.keys(relations).length > 0) {
    Object.assign(data, relations)
  }

  // Resolve related_articles component (interleaved, ordered)
  if (schema.hasRelatedArticles) {
    const { components: relatedArticleComponents, warnings: raWarnings } =
      await resolveRelatedArticlesComponent(frontmatter)

    if (relatedArticleComponents.length > 0) {
      data.related_articles = relatedArticleComponents
    } else {
      // Send empty array to clear any existing component entries
      data.related_articles = []
    }

    // Remove raw frontmatter field so it's not sent as a plain value
    delete data.related_articles_raw
    if (raWarnings.length > 0) {
      raWarnings.forEach((w) => {
        console.warn(`    ⚠️ related_articles: ${w.url} - ${w.reason}`)
      })
      warnings.push(
        ...raWarnings.map((w) => ({
          relationName: 'related_articles',
          unmatchedValues: [w.url],
        }))
      )
    }
  }

  // Check for missing required fields
  const missingFields = schema.fields.filter(
    (field) => field !== 'deployment_status' && !(field in data)
  )

  if (missingFields.length > 0) {
    console.warn(`  ⚠️ Missing fields: ${missingFields.join(', ')}`)
  }

  return { data, warnings }
}

async function buildStrapiDataFromFileContent(filePath, fileContent) {
  const folderName = getFolderName(filePath)
  if (!folderName || !SYNC_FOLDERS.includes(folderName)) {
    throw new Error(`Folder '${folderName}' not in sync list`)
  }

  const pathField = generatePathField(filePath, folderName)
  if (!pathField) {
    throw new Error(`Could not generate path field for ${filePath}`)
  }

  const { frontmatter, content } = parseMDXContent(filePath, fileContent)
  const assetPaths = extractAssetPaths(content, frontmatter)

  for (const assetPath of assetPaths) {
    await syncAsset(assetPath)
  }

  const { content: updatedContent, frontmatter: updatedFrontmatter } = replaceAssetPaths(
    content,
    frontmatter,
    assetPaths
  )

  return mapToStrapiSchema(
    folderName,
    updatedFrontmatter,
    updatedContent,
    pathField,
    _relationEntityCache
  )
}

function getContentEntryBaseFileCandidates(entry) {
  const candidates = []
  if (entry.filePath) candidates.push(entry.filePath)
  if (entry.folderName && entry.pathField) {
    const normalizedPath = entry.pathField.replace(/^\/+/, '')
    candidates.push(`data/${entry.folderName}/${normalizedPath}.mdx`)
    candidates.push(`data/${entry.folderName}/${normalizedPath}.md`)
  }

  return [...new Set(candidates)]
}

function readBaseFileForContentEntry(entry) {
  for (const filePath of getContentEntryBaseFileCandidates(entry)) {
    const content = readBaseFileContent(filePath)
    if (content !== null) {
      return { filePath, content }
    }
  }

  return null
}

function buildRestorePrefetchOperation(entry) {
  if (entry.kind === 'created') return null

  const baseFile = readBaseFileForContentEntry(entry)
  if (!baseFile) return null

  const folderName = getFolderName(baseFile.filePath)
  if (!folderName || !SYNC_FOLDERS.includes(folderName)) return null

  const pathField = generatePathField(baseFile.filePath, folderName)
  if (!pathField) return null

  const { frontmatter } = parseMDXContent(baseFile.filePath, baseFile.content)

  return {
    type: 'update',
    folderName,
    pathField,
    filePath: baseFile.filePath,
    frontmatter,
  }
}

async function prefetchRelationEntitiesForContentRestore(staleEntries) {
  const restoreOperations = staleEntries.map(buildRestorePrefetchOperation).filter(Boolean)
  if (restoreOperations.length === 0) return

  await prefetchRelationEntities(restoreOperations)
}

async function buildRestoreDataForContentEntry(entry) {
  const baseFile = readBaseFileForContentEntry(entry)
  if (baseFile) {
    const { data } = await buildStrapiDataFromFileContent(baseFile.filePath, baseFile.content)
    return data
  }

  return entry.restoreData || null
}

async function buildRestoreDataForListicleEntry(entry) {
  if (!entry.filePath) return entry.restoreData || null

  const baseContent = readBaseFileContent(entry.filePath)
  if (baseContent !== null) {
    const jsonData = parseListicleJson(entry.filePath, baseContent)
    return buildListicleDataFromJson(jsonData)
  }

  return entry.restoreData || null
}

// Helper: Create entry in Strapi
async function createEntry(folderName, data) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    const response = await withRetry(
      () =>
        axios.post(
          `${CMS_API_URL}/api/${schema.endpoint}`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${CMS_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        ),
      `createEntry(${schema.endpoint})`
    )

    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    const errorDetails = error.response?.data?.error?.details || {}
    console.error(`  ❌ Create failed: ${errorMsg}`)
    if (Object.keys(errorDetails).length > 0) {
      console.error(`  Error details:`, JSON.stringify(errorDetails, null, 2))
    }
    if (error.response) {
      console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
    }
    throw error
  }
}

// Helper: Update entry in Strapi
async function updateEntry(folderName, documentId, data) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    const response = await withRetry(
      () =>
        axios.put(
          `${CMS_API_URL}/api/${schema.endpoint}/${documentId}`,
          { data },
          {
            headers: {
              Authorization: `Bearer ${CMS_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        ),
      `updateEntry(${schema.endpoint}, ${documentId})`
    )

    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    const errorDetails = error.response?.data?.error?.details || {}
    console.error(`  ❌ Update failed: ${errorMsg}`)
    if (Object.keys(errorDetails).length > 0) {
      console.error(`  Error details:`, JSON.stringify(errorDetails, null, 2))
    }
    if (error.response) {
      console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
    }
    throw error
  }
}

// Helper: Delete entry in Strapi
async function deleteEntry(folderName, documentId) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    const response = await withRetry(
      () =>
        axios.delete(`${CMS_API_URL}/api/${schema.endpoint}/${documentId}`, {
          headers: {
            Authorization: `Bearer ${CMS_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }),
      `deleteEntry(${schema.endpoint}, ${documentId})`
    )

    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error?.message || error.message
    console.error(`  ❌ Delete failed: ${errorMsg}`)
    if (error.response) {
      console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
    }
    throw new Error(`Failed to delete entry: ${errorMsg}`)
  }
}

// Helper: Detect operation type
function detectOperationType(filePath, isDeletedFile = false) {
  if (isDeletedFile) {
    return 'delete'
  }

  if (!fs.existsSync(filePath)) {
    return 'delete'
  }

  return 'create_or_update'
}

// Main sync logic
async function syncToStrapi() {
  console.log(
    `🚀 Starting sync — Changed: ${CHANGED_FILES.length}, Deleted: ${DELETED_FILES.length}, Assets: ${CHANGED_ASSETS.length}\n`
  )

  const results = {
    created: [],
    updated: [],
    deleted: [],
    restored: [],
    skipped: [],
    errors: [],
    relationWarnings: [], // Track unmatched relations
  }

  const previousManifest = readPreviousManifest()
  const previousContentMap = buildManifestMap(previousManifest.content, contentManifestKey)
  const currentContentManifest = []

  // Combine changed and deleted files with a flag to indicate deletion
  const allFiles = IS_PR_CLOSED
    ? []
    : [
        ...CHANGED_FILES.map((file) => ({ path: file, isDeleted: false })),
        ...DELETED_FILES.map((file) => ({ path: file, isDeleted: true })),
      ]

  if (IS_PR_CLOSED) {
    console.log('🔒 PR closed — skipping Phase 1 & 2, running cleanup only')
  }

  const pendingOperations = []

  if (!IS_PR_CLOSED) {
    console.log('\n' + '='.repeat(80))
    console.log('🔄 PHASE 1: Asset Synchronization and Validation')
    console.log('='.repeat(80))

    for (const { path: filePath, isDeleted } of allFiles) {
      console.log(`\n📄 Processing: ${filePath}${isDeleted ? ' (deleted)' : ''}`)

      try {
        const folderName = getFolderName(filePath)

        if (!folderName || !SYNC_FOLDERS.includes(folderName)) {
          console.log(`⏭️ Skipped: Folder '${folderName}' not in sync list`)
          results.skipped.push(filePath)
          continue
        }

        const schema = COLLECTION_SCHEMAS[folderName]
        if (!schema) {
          console.log(`⏭️ Skipped: No schema configured for '${folderName}'`)
          results.skipped.push(filePath)
          continue
        }

        const pathField = generatePathField(filePath, folderName)

        if (!pathField) {
          throw new Error('Could not generate path field')
        }

        const operationType = detectOperationType(filePath, isDeleted)

        if (operationType === 'delete') {
          // For delete, we just need to store the intent
          pendingOperations.push({
            type: 'delete',
            folderName,
            pathField,
            filePath,
          })
        } else {
          const { frontmatter, content } = parseMDXFile(filePath)

          // --- ASSET HANDLING START ---
          const assetPaths = extractAssetPaths(content, frontmatter)

          for (const assetPath of assetPaths) {
            await syncAsset(assetPath)
          }

          const { content: updatedContent, frontmatter: updatedFrontmatter } = replaceAssetPaths(
            content,
            frontmatter,
            assetPaths
          )

          // Store data for Phase 2
          pendingOperations.push({
            type: 'update',
            folderName,
            pathField,
            filePath,
            frontmatter: updatedFrontmatter,
            content: updatedContent,
          })
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}: ${error.message}`)
        results.errors.push({ file: filePath, error: error.message })
      }
    }

    // Check if any errors occurred in Phase 1
    if (results.errors.length > 0) {
      console.error('\n' + '='.repeat(80))
      console.error('❌ PHASE 1 FAILED: Asset synchronization or validation failed.')
      console.error('⛔ Stopping workflow to prevent partial or invalid content sync.')
      console.error('='.repeat(80))

      results.errors.forEach(({ file, error }) => {
        console.error(`  • ${file}: ${error}`)
      })

      // Save results for PR comment (failed state)
      try {
        // Extract relation types even on error for PR comment
        const usedSchemas = new Set()
        const allRelationNames = new Set()

        // Look at all files processed so far (including those that failed if possible,
        // but strictly we look at created/updated/pending.
        // For Phase 1 failure, we might not have created/updated yet.
        // We can scan ALL files in CHANGED_FILES to guess potential relations to show context.
        const filesToScan = [...CHANGED_FILES]

        filesToScan.forEach((filePath) => {
          const folderName = getFolderName(filePath)
          if (folderName && COLLECTION_SCHEMAS[folderName]) {
            usedSchemas.add(folderName)
            const schema = COLLECTION_SCHEMAS[folderName]
            if (schema.relations) {
              Object.keys(schema.relations).forEach((relationName) => {
                allRelationNames.add(relationName)
              })
            }
            if (schema.hasRelatedArticles) {
              allRelationNames.add('related_articles')
            }
          }
        })

        results.relationTypes = Array.from(allRelationNames)
        results.deploymentStatus = DEPLOYMENT_STATUS

        fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
      } catch (e) {
        console.error('Failed to save error results:', e.message)
      }

      process.exit(1)
    }

    // PHASE 2: CMS Synchronization
    console.log('\n' + '='.repeat(80))
    console.log('🔄 PHASE 2: CMS Content Synchronization')
    console.log('='.repeat(80))

    if (pendingOperations.length > 0) {
      await prefetchRelationEntities(pendingOperations)
      await prefetchExistingEntries(pendingOperations)
    }

    function buildCurrentContentManifestEntry(op, existingEntry) {
      const previousEntry = previousContentMap.get(contentManifestKey(op))
      const baseFileExists = op.filePath ? readBaseFileContent(op.filePath) !== null : false
      const restoreData = sanitizeEntityForRestore(existingEntry)

      if (previousEntry) {
        if (
          previousEntry.kind === 'created' ||
          (previousEntry.kind === 'unknown' && !baseFileExists)
        ) {
          if (op.type === 'delete') return null
          return {
            ...previousEntry,
            kind: 'created',
            filePath: previousEntry.filePath || op.filePath,
          }
        }

        return {
          ...previousEntry,
          kind: op.type === 'delete' ? 'deleted' : 'updated',
          filePath: previousEntry.filePath || op.filePath,
          restoreData: previousEntry.restoreData || restoreData,
        }
      }

      if (op.type === 'delete') {
        if (!existingEntry) return null

        return {
          kind: 'deleted',
          folderName: op.folderName,
          pathField: op.pathField,
          filePath: op.filePath,
          restoreData,
        }
      }

      if (existingEntry) {
        return {
          kind: 'updated',
          folderName: op.folderName,
          pathField: op.pathField,
          filePath: op.filePath,
          restoreData,
        }
      }

      return {
        kind: 'created',
        folderName: op.folderName,
        pathField: op.pathField,
        filePath: op.filePath,
      }
    }

    function recordCurrentContentManifestEntry(op, existingEntry) {
      const entry = buildCurrentContentManifestEntry(op, existingEntry)
      if (entry) currentContentManifest.push(entry)
    }

    async function processOperation(op) {
      const { type, folderName, pathField, filePath } = op

      try {
        if (type === 'delete') {
          console.log(`🗑️ Deleting from CMS: ${pathField}`)
          const existingEntry = findEntryByPathCached(folderName, pathField)

          if (existingEntry) {
            await deleteEntry(folderName, existingEntry.documentId)
            console.log(`✅ Deleted successfully: ${pathField}`)
            results.deleted.push({ file: filePath, path: pathField })
            recordCurrentContentManifestEntry(op, existingEntry)
            const cache = _existingEntriesCache[folderName]
            if (cache) cache.delete(pathField)
          } else {
            console.log(`⚠️ Entry not found in CMS, skipping deletion: ${pathField}`)
            results.skipped.push(filePath)
            recordCurrentContentManifestEntry(op, null)
          }
        } else {
          const { frontmatter, content } = op

          const { data: strapiData, warnings } = await mapToStrapiSchema(
            folderName,
            frontmatter,
            content,
            pathField,
            _relationEntityCache
          )

          // Track relation warnings
          if (warnings && warnings.length > 0) {
            results.relationWarnings.push({
              file: filePath,
              path: pathField,
              warnings,
            })
          }

          const existingEntry = findEntryByPathCached(folderName, pathField)

          if (existingEntry) {
            if (!existingEntry.documentId) {
              throw new Error(`Entry found but has no documentId`)
            }
            await updateEntry(folderName, existingEntry.documentId, strapiData)
            console.log(`✅ Updated: ${pathField}`)
            results.updated.push({ file: filePath, path: pathField })
            recordCurrentContentManifestEntry(op, existingEntry)
          } else {
            await createEntry(folderName, strapiData)
            console.log(`✅ Created: ${pathField}`)
            results.created.push({ file: filePath, path: pathField })
            recordCurrentContentManifestEntry(op, null)
          }
        }
      } catch (error) {
        console.error(`❌ Error syncing ${filePath}: ${error.message}`)
        if (error.response) {
          console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
        }
        results.errors.push({ file: filePath, error: error.message })
      }
    }

    // Batch when more than 50 operations, otherwise process sequentially
    if (pendingOperations.length > 50) {
      const batches = chunk(pendingOperations, CMS_BATCH_SIZE)
      const totalBatches = batches.length

      console.log(
        `\n📦 Processing ${pendingOperations.length} operations in ${totalBatches} batch(es) (batch size: ${CMS_BATCH_SIZE}, delay: ${CMS_BATCH_DELAY_MS}ms)`
      )

      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const batch = batches[batchIndex]
        console.log(`\n── Batch ${batchIndex + 1}/${totalBatches} (${batch.length} items) ──`)

        await Promise.all(batch.map(processOperation))

        if (batchIndex < totalBatches - 1 && CMS_BATCH_DELAY_MS > 0) {
          await sleep(CMS_BATCH_DELAY_MS)
        }
      }
    } else {
      console.log(`\n📦 Processing ${pendingOperations.length} operations sequentially`)

      for (const op of pendingOperations) {
        await processOperation(op)
      }
    }
  }

  // Phase 2.5: Reconcile staging CMS (PR syncs only)
  if (RECONCILE_STAGING && DEPLOYMENT_STATUS === 'staging') {
    console.log('\n' + '='.repeat(80))
    console.log('🔄 PHASE 2.5: Staging CMS Reconciliation')
    console.log('='.repeat(80))

    const currentContentMap = buildManifestMap(currentContentManifest, contentManifestKey)
    const currentPathSet = new Set(currentContentMap.keys())

    console.log(`Previous manifest: ${previousManifest.content.length} content entries`)
    console.log(`Current desired: ${currentContentManifest.length} content entries`)

    // Stale = in previous manifest but NOT in current desired set
    const staleEntries = previousManifest.content.filter(
      (m) => !currentPathSet.has(contentManifestKey(m))
    )

    console.log(`Stale entries to clean up: ${staleEntries.length}`)

    let reconciledCount = 0

    if (staleEntries.length > 0) {
      const staleByFolder = {}
      const existingByKey = new Map()

      for (const { folderName, pathField } of staleEntries) {
        if (!staleByFolder[folderName]) staleByFolder[folderName] = []
        staleByFolder[folderName].push(pathField)
      }

      for (const [folderName, paths] of Object.entries(staleByFolder)) {
        const schema = COLLECTION_SCHEMAS[folderName]
        if (!schema) continue

        const entities = await fetchEntitiesByFilter(schema.endpoint, 'path', paths)
        const stagingEntities = filterEntitiesByDeploymentStatus(entities)

        for (const entity of stagingEntities) {
          existingByKey.set(`${folderName}:${entity.path}`, entity)
        }
      }

      await prefetchRelationEntitiesForContentRestore(staleEntries)

      for (const staleEntry of staleEntries) {
        const key = contentManifestKey(staleEntry)
        const existingEntity = existingByKey.get(key)

        try {
          const restoreData = await buildRestoreDataForContentEntry(staleEntry)
          const reconciliationAction = getContentReconciliationAction(staleEntry, restoreData)

          if (reconciliationAction.action === 'restore') {
            if (existingEntity?.documentId) {
              await updateEntry(
                staleEntry.folderName,
                existingEntity.documentId,
                reconciliationAction.restoreData
              )
            } else {
              await createEntry(staleEntry.folderName, reconciliationAction.restoreData)
            }

            console.log(`  Reconciled (restored): ${staleEntry.pathField}`)
            results.restored.push({
              file: `(reconciled) ${staleEntry.folderName}${staleEntry.pathField}`,
              path: staleEntry.pathField,
            })
            reconciledCount++
          } else if (reconciliationAction.action === 'delete') {
            if (existingEntity?.documentId) {
              await deleteEntry(staleEntry.folderName, existingEntity.documentId)
              console.log(`  Reconciled (deleted): ${staleEntry.pathField}`)
              results.deleted.push({
                file: `(reconciled) ${staleEntry.folderName}${staleEntry.pathField}`,
                path: staleEntry.pathField,
                reconciled: true,
              })
              reconciledCount++
            } else {
              console.log(`  Reconciled (already absent): ${staleEntry.pathField}`)
              results.skipped.push(`(reconciled) ${staleEntry.folderName}${staleEntry.pathField}`)
            }
          } else {
            throw new Error(reconciliationAction.error)
          }
        } catch (error) {
          console.error(`  Failed to reconcile ${staleEntry.pathField}: ${error.message}`)
          results.errors.push({
            file: `(reconciled) ${staleEntry.folderName}${staleEntry.pathField}`,
            error: error.message,
          })
        }
      }
    }

    results.hasReconciledEntries = reconciledCount > 0

    // Save the new manifest for next run (skip on PR close — no future runs)
    if (!IS_PR_CLOSED) {
      writeManifest({
        ...previousManifest,
        content: currentContentManifest,
      })
      console.log(`Saved manifest with ${currentContentManifest.length} content entries`)
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 SYNC SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Created: ${results.created.length}`)
  console.log(`🔄 Updated: ${results.updated.length}`)
  console.log(`🗑️ Deleted: ${results.deleted.length}`)
  console.log(`♻️ Restored: ${results.restored.length}`)
  console.log(`⏭️ Skipped: ${results.skipped.length}`)
  console.log(`❌ Errors: ${results.errors.length}`)
  console.log(`⚠️ Relation Warnings: ${results.relationWarnings.length}`)
  console.log('='.repeat(60) + '\n')

  if (results.errors.length > 0) {
    console.error('\n❌ SYNC FAILED - The following errors occurred in Phase 2:\n')
    results.errors.forEach(({ file, error }) => {
      console.error(`  • ${file}: ${error}`)
    })

    // Save results and exit
    try {
      // Extract relation types
      const allRelationNames = new Set()
      const filesToScan = [...CHANGED_FILES]

      filesToScan.forEach((filePath) => {
        const folderName = getFolderName(filePath)
        if (folderName && COLLECTION_SCHEMAS[folderName]) {
          const schema = COLLECTION_SCHEMAS[folderName]
          if (schema.relations) {
            Object.keys(schema.relations).forEach((relationName) => {
              allRelationNames.add(relationName)
            })
          }
          if (schema.hasRelatedArticles) {
            allRelationNames.add('related_articles')
          }
        }
      })

      results.relationTypes = Array.from(allRelationNames)
      results.deploymentStatus = DEPLOYMENT_STATUS

      fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
    } catch (e) {
      console.error('Failed to save error results:', e.message)
    }
    process.exit(1)
  }

  // Extract all unique relation names from schemas used
  const usedSchemas = new Set()
  const allRelationNames = new Set()

  // Get schemas from processed files
  ;[...results.created, ...results.updated, ...results.restored].forEach((item) => {
    const folderName = getFolderName(item.file)
    if (folderName && COLLECTION_SCHEMAS[folderName]) {
      usedSchemas.add(folderName)
      const schema = COLLECTION_SCHEMAS[folderName]
      if (schema.relations) {
        Object.keys(schema.relations).forEach((relationName) => {
          allRelationNames.add(relationName)
        })
      }
    }
  })

  // Add relation info to results
  results.relationTypes = Array.from(allRelationNames)
  results.deploymentStatus = DEPLOYMENT_STATUS

  // Save results to file for PR comment script
  try {
    fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
    console.log('📝 Results saved to sync-results.json')
  } catch (writeError) {
    console.error('Failed to save results:', writeError.message)
  }

  return results
}

// Helper: Transform a listicle item to Strapi schema
function transformListicleItem(item, cdnUrl) {
  const transformed = {
    name: item.name,
    href: item.href,
  }

  if (item.clickName) transformed.click_name = item.clickName

  if (item.icon) {
    if (typeof item.icon === 'string') {
      const cleanPath = item.icon.startsWith('/') ? item.icon.slice(1) : item.icon
      transformed.icon_path = `${cdnUrl}/${cleanPath}`
    } else if (typeof item.icon === 'object') {
      if (item.icon.badge) transformed.icon_badge = item.icon.badge
      if (item.icon.color) transformed.icon_color = item.icon.color
    }
  }

  return transformed
}

// Helper: Transform a listicle subsection to Strapi schema
function transformListicleSubsection(subsection, cdnUrl) {
  const transformed = {
    section_id: subsection.id,
    title: subsection.title,
    section_name: subsection.sectionName,
  }

  if (subsection.gridCols) transformed.grid_cols = subsection.gridCols

  if (subsection.items && subsection.items.length > 0) {
    transformed.items = subsection.items.map((item) => transformListicleItem(item, cdnUrl))
  }

  return transformed
}

// Helper: Transform a listicle section to Strapi schema
function transformListicleSection(section, cdnUrl) {
  const transformed = {
    section_id: section.id,
    label: section.label,
    title: section.title,
    section_name: section.sectionName,
  }

  if (section.gridCols) transformed.grid_cols = section.gridCols

  if (section.items && section.items.length > 0) {
    transformed.items = section.items.map((item) => transformListicleItem(item, cdnUrl))
  }

  if (section.subsections && section.subsections.length > 0) {
    transformed.subsections = section.subsections.map((sub) =>
      transformListicleSubsection(sub, cdnUrl)
    )
  }

  return transformed
}

// Helper: Transform local listicle JSON to Strapi schema
function transformListicleToStrapi(jsonData, cdnUrl) {
  const transformed = {
    key: jsonData.id,
    pattern: jsonData.pattern,
    markdown_title: jsonData.markdownTitle,
    section_name: jsonData.sectionName,
  }

  if (jsonData.gridCols) transformed.grid_cols = jsonData.gridCols
  if (jsonData.title) transformed.title = jsonData.title
  if (jsonData.description) transformed.description = jsonData.description
  if (jsonData.viewAllHref) transformed.view_all_href = jsonData.viewAllHref
  if (jsonData.viewAllText) transformed.view_all_text = jsonData.viewAllText
  if (jsonData.searchPlaceholder) transformed.search_placeholder = jsonData.searchPlaceholder
  if (jsonData.wrapperTitle) transformed.wrapper_title = jsonData.wrapperTitle

  if (jsonData.items && jsonData.items.length > 0) {
    transformed.items = jsonData.items.map((item) => transformListicleItem(item, cdnUrl))
  }

  if (jsonData.sections && jsonData.sections.length > 0) {
    transformed.sections = jsonData.sections.map((section) =>
      transformListicleSection(section, cdnUrl)
    )
  }

  if (jsonData.staticSections && jsonData.staticSections.length > 0) {
    transformed.static_sections = jsonData.staticSections.map((section) => {
      const s = {
        title: section.title,
        section_name: section.sectionName,
      }
      if (section.gridCols) s.grid_cols = section.gridCols
      if (section.items && section.items.length > 0) {
        s.items = section.items.map((item) => transformListicleItem(item, cdnUrl))
      }
      return s
    })
  }

  return transformed
}

// Helper: Extract all icon paths from a listicle JSON
function extractIconPaths(jsonData) {
  const paths = []

  function collectFromItems(items) {
    if (!items) return
    for (const item of items) {
      if (item.icon && typeof item.icon === 'string') {
        paths.push(item.icon)
      }
    }
  }

  collectFromItems(jsonData.items)

  if (jsonData.sections) {
    for (const section of jsonData.sections) {
      collectFromItems(section.items)
      if (section.subsections) {
        for (const sub of section.subsections) {
          collectFromItems(sub.items)
        }
      }
    }
  }

  if (jsonData.staticSections) {
    for (const section of jsonData.staticSections) {
      collectFromItems(section.items)
    }
  }

  return paths
}

function getListicleKey(listicleFile) {
  return path.basename(listicleFile, '.json')
}

async function syncListicleIconAssets(jsonData) {
  const iconPaths = extractIconPaths(jsonData)
  console.log(`  🖼️ Found ${iconPaths.length} icon(s) to check`)

  for (const iconPath of iconPaths) {
    const cleanPath = iconPath.startsWith('/') ? iconPath.slice(1) : iconPath
    const localPath = path.join('data-assets', cleanPath)
    const localExists = fs.existsSync(localPath)
    const onCDN = await checkCDN(cleanPath)

    if (!onCDN && localExists) {
      const s3Key = `web/${cleanPath}`
      await uploadToS3(localPath, s3Key)
      console.log(`    ✅ Uploaded icon: ${cleanPath}`)
    } else if (!onCDN && !localExists) {
      console.warn(`    ⚠️ Icon not found locally or on CDN: ${iconPath}`)
    }
  }
}

function parseListicleJson(filePath, raw) {
  try {
    return JSON.parse(raw)
  } catch (error) {
    throw new Error(`Failed to parse listicle ${filePath}: ${error.message}`)
  }
}

async function buildListicleDataFromJson(jsonData) {
  await syncListicleIconAssets(jsonData)
  return transformListicleToStrapi(jsonData, CDN_URL)
}

async function fetchListicleEntry(key) {
  const existingResponse = await withRetry(
    () =>
      axios.get(`${CMS_API_URL}/api/listicles`, {
        params: {
          'filters[key][$eq]': key,
        },
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    `fetchListicle(${key})`
  )

  const existingEntries = existingResponse.data.data || []
  return existingEntries[0] || null
}

async function upsertListicleEntry(key, strapiData) {
  const existingEntry = await fetchListicleEntry(key)

  if (existingEntry) {
    await withRetry(
      () =>
        axios.put(
          `${CMS_API_URL}/api/listicles/${existingEntry.documentId}`,
          { data: strapiData },
          {
            headers: {
              Authorization: `Bearer ${CMS_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        ),
      `updateListicle(${key})`
    )
    return 'updated'
  }

  await withRetry(
    () =>
      axios.post(
        `${CMS_API_URL}/api/listicles`,
        { data: strapiData },
        {
          headers: {
            Authorization: `Bearer ${CMS_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      ),
    `createListicle(${key})`
  )
  return 'created'
}

async function deleteListicleEntry(key) {
  const existingEntry = await fetchListicleEntry(key)

  if (!existingEntry) {
    return false
  }

  await withRetry(
    () =>
      axios.delete(`${CMS_API_URL}/api/listicles/${existingEntry.documentId}`, {
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
    `deleteListicle(${key})`
  )

  return true
}

function buildCurrentListicleManifestEntry(listicleFile, previousEntry, existingEntry, isDeleted) {
  const key = getListicleKey(listicleFile)
  const baseFileExists = readBaseFileContent(listicleFile) !== null
  const restoreData = sanitizeEntityForRestore(existingEntry)

  if (previousEntry) {
    if (previousEntry.kind === 'created' || (previousEntry.kind === 'unknown' && !baseFileExists)) {
      if (isDeleted) return null
      return {
        ...previousEntry,
        kind: 'created',
        filePath: previousEntry.filePath || listicleFile,
      }
    }

    return {
      ...previousEntry,
      kind: isDeleted ? 'deleted' : 'updated',
      filePath: previousEntry.filePath || listicleFile,
      restoreData: previousEntry.restoreData || restoreData,
    }
  }

  if (isDeleted) {
    if (!existingEntry && !baseFileExists) return null
    return {
      kind: 'deleted',
      key,
      filePath: listicleFile,
      restoreData,
    }
  }

  if (existingEntry || baseFileExists) {
    return {
      kind: 'updated',
      key,
      filePath: listicleFile,
      restoreData,
    }
  }

  return {
    kind: 'created',
    key,
    filePath: listicleFile,
  }
}

// Phase 4: Listicle Synchronization
async function syncListiclesToStrapi({ reconcileStaging = false } = {}) {
  console.log('\n' + '='.repeat(80))
  console.log('🔄 PHASE 4: Listicle Synchronization')
  console.log('='.repeat(80))

  const results = { created: [], updated: [], deleted: [], restored: [], errors: [] }
  const previousManifest = readPreviousManifest()
  const previousListicleMap = buildManifestMap(previousManifest.listicles, listicleManifestKey)
  const currentListicleManifest = []

  // Process changed listicles
  for (const listicleFile of IS_PR_CLOSED ? [] : CHANGED_LISTICLES) {
    const key = getListicleKey(listicleFile)
    console.log(`\n📄 Processing listicle: ${key}`)

    try {
      const fullPath = path.resolve(LISTICLES_DIR, path.basename(listicleFile))
      const raw = fs.readFileSync(fullPath, 'utf8')
      const jsonData = parseListicleJson(listicleFile, raw)
      const existingEntry = await fetchListicleEntry(key)
      const strapiData = await buildListicleDataFromJson(jsonData)
      const operation = await upsertListicleEntry(key, strapiData)

      if (operation === 'updated') {
        console.log(`  ✅ Updated listicle: ${key}`)
        results.updated.push({ key })
      } else {
        console.log(`  ✅ Created listicle: ${key}`)
        results.created.push({ key })
      }

      const manifestEntry = buildCurrentListicleManifestEntry(
        listicleFile,
        previousListicleMap.get(key),
        existingEntry,
        false
      )
      if (manifestEntry) currentListicleManifest.push(manifestEntry)
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message
      console.error(`  ❌ Error syncing listicle ${key}: ${errorMsg}`)
      if (error.response) {
        console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
      }
      results.errors.push({ key, error: errorMsg })
    }
  }

  // Process deleted listicles
  for (const listicleFile of IS_PR_CLOSED ? [] : DELETED_LISTICLES) {
    const key = getListicleKey(listicleFile)
    console.log(`\n🗑️ Deleting listicle: ${key}`)

    try {
      const existingEntry = await fetchListicleEntry(key)
      const wasDeleted = await deleteListicleEntry(key)

      if (wasDeleted) {
        console.log(`  ✅ Deleted listicle: ${key}`)
        results.deleted.push({ key })
      } else {
        console.log(`  ⚠️ Listicle not found in CMS, skipping deletion: ${key}`)
      }

      const manifestEntry = buildCurrentListicleManifestEntry(
        listicleFile,
        previousListicleMap.get(key),
        existingEntry,
        true
      )
      if (manifestEntry) currentListicleManifest.push(manifestEntry)
    } catch (error) {
      const errorMsg = error.response?.data?.error?.message || error.message
      console.error(`  ❌ Error deleting listicle ${key}: ${errorMsg}`)
      results.errors.push({ key, error: errorMsg })
    }
  }

  if (reconcileStaging) {
    const currentListicleMap = buildManifestMap(currentListicleManifest, listicleManifestKey)
    const staleEntries = previousManifest.listicles.filter(
      (entry) => !currentListicleMap.has(listicleManifestKey(entry))
    )

    if (IS_PR_CLOSED) {
      const fallbackFiles = [...CHANGED_LISTICLES, ...DELETED_LISTICLES]
      const staleKeys = new Set(staleEntries.map((entry) => entry.key))

      for (const listicleFile of fallbackFiles) {
        const key = getListicleKey(listicleFile)
        if (!staleKeys.has(key)) {
          staleEntries.push({ kind: 'unknown', key, filePath: listicleFile })
          staleKeys.add(key)
        }
      }
    }

    console.log(`\n🧹 Stale listicles to reconcile: ${staleEntries.length}`)

    for (const staleEntry of staleEntries) {
      try {
        const restoreData = await buildRestoreDataForListicleEntry(staleEntry)
        const reconciliationAction = getListicleReconciliationAction(staleEntry, restoreData)

        if (reconciliationAction.action === 'restore') {
          await upsertListicleEntry(staleEntry.key, reconciliationAction.restoreData)
          console.log(`  ✅ Restored listicle: ${staleEntry.key}`)
          results.restored.push({ key: staleEntry.key })
        } else if (reconciliationAction.action === 'delete') {
          const wasDeleted = await deleteListicleEntry(staleEntry.key)
          if (wasDeleted) {
            console.log(`  ✅ Cleaned up listicle: ${staleEntry.key}`)
            results.deleted.push({ key: staleEntry.key, reconciled: true })
          } else {
            console.log(`  ⚠️ Listicle already absent: ${staleEntry.key}`)
          }
        } else {
          throw new Error(reconciliationAction.error)
        }
      } catch (error) {
        const errorMsg = error.response?.data?.error?.message || error.message
        console.error(`  ❌ Error reconciling listicle ${staleEntry.key}: ${errorMsg}`)
        results.errors.push({ key: staleEntry.key, error: errorMsg })
      }
    }

    if (staleEntries.length > 0) {
      results.hasReconciledEntries =
        results.restored.length > 0 || results.deleted.some((item) => item.reconciled)
    }
  }

  if (!IS_PR_CLOSED && reconcileStaging) {
    writeManifest({
      ...readPreviousManifest(),
      listicles: currentListicleManifest,
    })
  }

  // Print summary
  console.log('\n' + '-'.repeat(40))
  console.log('📊 LISTICLE SYNC SUMMARY')
  console.log('-'.repeat(40))
  console.log(`  ✅ Created: ${results.created.length}`)
  console.log(`  🔄 Updated: ${results.updated.length}`)
  console.log(`  🗑️ Deleted: ${results.deleted.length}`)
  console.log(`  ♻️ Restored: ${results.restored.length}`)
  console.log(`  ❌ Errors: ${results.errors.length}`)
  console.log('-'.repeat(40))

  if (results.errors.length > 0) {
    console.error('\n❌ LISTICLE SYNC had errors:')
    results.errors.forEach(({ key, error }) => {
      console.error(`  • ${key}: ${error}`)
    })
  }

  // Save listicle results to file for PR comment script
  try {
    fs.writeFileSync('listicle-sync-results.json', JSON.stringify(results, null, 2))
    console.log('📝 Listicle results saved to listicle-sync-results.json')
  } catch (writeError) {
    console.error('Failed to save listicle results:', writeError.message)
  }
}

const SIDENAV_JSON_PATH = path.resolve(__dirname, '..', 'data', 'docs-side-nav', 'main.json')
const SIDENAV_CHANGED = process.env.SIDENAV_CHANGED === 'true'

async function syncSidenavToStrapi({ restoreFromBase = false } = {}) {
  console.log('\n' + '='.repeat(80))
  console.log('🔄 PHASE 3: Sidenav Synchronization')
  console.log('='.repeat(80))

  const raw = restoreFromBase
    ? readBaseFileContent('data/docs-side-nav/main.json')
    : fs.readFileSync(SIDENAV_JSON_PATH, 'utf8')

  if (!raw) {
    throw new Error('Unable to read docs sidenav JSON for synchronization')
  }

  const items = JSON.parse(raw)

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Parsed sidenav JSON is empty or not an array')
  }

  const url = `${CMS_API_URL}/api/docs-side-nav`
  const body = { data: { items } }

  await withRetry(async () => {
    const response = await axios.put(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CMS_API_TOKEN}`,
      },
    })
    return response.data
  }, 'sync-sidenav')

  console.log('✅ Sidenav synced to CMS successfully')

  if (RECONCILE_STAGING && DEPLOYMENT_STATUS === 'staging') {
    if (restoreFromBase) {
      markSyncResultsReconciled('sidenav')
    }

    if (!IS_PR_CLOSED) {
      writeManifest({
        ...readPreviousManifest(),
        sidenav: restoreFromBase ? null : { touched: true },
      })
    }
  }
}

async function main() {
  if (!CMS_API_URL || !CMS_API_TOKEN) {
    console.error('❌ ERROR: Missing required environment variables')
    console.error('   Required: CMS_API_URL, CMS_API_TOKEN')
    process.exit(1)
  }

  await syncToStrapi()

  const shouldReconcileStaging = RECONCILE_STAGING && DEPLOYMENT_STATUS === 'staging'
  const manifestAfterContent = readPreviousManifest()
  const shouldRestoreSidenav =
    shouldReconcileStaging &&
    (IS_PR_CLOSED
      ? manifestAfterContent.sidenav?.touched || SIDENAV_CHANGED
      : manifestAfterContent.sidenav?.touched && !SIDENAV_CHANGED)

  if (!IS_PR_CLOSED && SIDENAV_CHANGED) {
    await syncSidenavToStrapi()
  } else if (shouldRestoreSidenav) {
    await syncSidenavToStrapi({ restoreFromBase: true })
  }

  const manifestAfterSidenav = readPreviousManifest()
  const hasClosedListicleChanges =
    IS_PR_CLOSED && (CHANGED_LISTICLES.length > 0 || DELETED_LISTICLES.length > 0)
  const shouldRunListicleSync =
    (!IS_PR_CLOSED && LISTICLES_CHANGED) ||
    (shouldReconcileStaging &&
      (manifestAfterSidenav.listicles.length > 0 || hasClosedListicleChanges))

  if (shouldRunListicleSync) {
    await syncListiclesToStrapi({ reconcileStaging: shouldReconcileStaging })
  }

  console.log('✅ Sync completed successfully!')
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ SYNC FAILED:', error.message)
    process.exit(1)
  })
}

module.exports = {
  getFolderName,
  generatePathField,
  normalizeManifest,
  contentManifestKey,
  listicleManifestKey,
  getContentReconciliationAction,
  getListicleReconciliationAction,
}
