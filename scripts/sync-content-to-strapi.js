const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const axios = require('axios')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mime = require('mime-types')

const DEPLOYMENT_STATUS = process.env.DEPLOYMENT_STATUS

const CMS_API_URL =
  DEPLOYMENT_STATUS === 'staging' ? process.env.CMS_STAGING_API_URL : process.env.CMS_API_URL
const CMS_API_TOKEN =
  DEPLOYMENT_STATUS === 'staging' ? process.env.CMS_STAGING_API_TOKEN : process.env.CMS_API_TOKEN

const SYNC_FOLDERS = JSON.parse(process.env.SYNC_FOLDERS)

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

// URL prefix to Strapi endpoint/content_type mapping for related_articles component
const RELATED_ARTICLE_TYPE_MAP = {
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
    fields: ['title', 'description', 'date', 'path', 'content', 'deployment_status'],
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
    fields: ['title', 'description', 'image', 'path', 'content', 'deployment_status'],
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
    fields: ['title', 'description', 'image', 'path', 'content', 'deployment_status'],
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
    fields: ['title', 'description', 'image', 'path', 'content', 'deployment_status', 'date'],
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
    fields: ['title', 'description', 'image', 'path', 'content', 'deployment_status', 'date'],
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
async function fetchAllEntities(endpoint) {
  try {
    let allEntities = []
    let page = 1
    const pageSize = 100
    let pageCount = 1

    do {
      const response = await axios.get(`${CMS_API_URL}/api/${endpoint}`, {
        params: {
          pagination: {
            page,
            pageSize,
          },
        },
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      const data = response.data.data || []
      allEntities = allEntities.concat(data)

      // Update pagination info
      const meta = response.data.meta || {}
      const pagination = meta.pagination || {}
      pageCount = pagination.pageCount || 1

      page++
    } while (page <= pageCount)

    return allEntities
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}: ${error.message}`)
    return []
  }
}

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

    const response = await axios.post(
      `${CMS_API_URL}/api/${endpoint}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
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
      try {
        let entities = await fetchAllEntities(typeInfo.endpoint)
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
async function resolveRelations(folderName, frontmatter) {
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

    // Fetch all entities from the relation endpoint
    let entities = await fetchAllEntities(relationConfig.endpoint)
    entities = filterEntitiesByDeploymentStatus(entities)

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
async function mapToStrapiSchema(folderName, frontmatter, content, pathField) {
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
  const { relations, warnings } = await resolveRelations(folderName, frontmatter)

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

// Helper: Check if file exists in Strapi by path
async function findEntryByPath(folderName, pathField) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    const response = await axios.get(`${CMS_API_URL}/api/${schema.endpoint}`, {
      params: {
        filters: { path: { $eq: pathField }, deployment_status: { $eq: DEPLOYMENT_STATUS } },
        pagination: { limit: 1 },
      },
      headers: {
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0]
    }

    return null
  } catch (error) {
    console.error(`  ❌ Error in findEntryByPath:`, error.message)
    if (error.response) {
      console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
    }
    throw new Error(`Failed to find entry by path: ${error.message}`)
  }
}

// Helper: Create entry in Strapi
async function createEntry(folderName, data) {
  const schema = COLLECTION_SCHEMAS[folderName]
  try {
    const response = await axios.post(
      `${CMS_API_URL}/api/${schema.endpoint}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
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
    const response = await axios.put(
      `${CMS_API_URL}/api/${schema.endpoint}/${documentId}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CMS_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
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
    const response = await axios.delete(`${CMS_API_URL}/api/${schema.endpoint}/${documentId}`, {
      headers: {
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

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
    skipped: [],
    errors: [],
    relationWarnings: [], // Track unmatched relations
  }

  // Combine changed and deleted files with a flag to indicate deletion
  const allFiles = [
    ...CHANGED_FILES.map((file) => ({ path: file, isDeleted: false })),
    ...DELETED_FILES.map((file) => ({ path: file, isDeleted: true })),
  ]

  const pendingOperations = []

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

  for (const op of pendingOperations) {
    const { type, folderName, pathField, filePath } = op
    console.log(`\n📄 Syncing: ${filePath} (${type})`)

    try {
      if (type === 'delete') {
        console.log(`🗑️ Deleting from CMS: ${pathField}`)
        const existingEntry = await findEntryByPath(folderName, pathField)

        if (existingEntry) {
          await deleteEntry(folderName, existingEntry.documentId)
          console.log(`✅ Deleted successfully`)
          results.deleted.push({ file: filePath, path: pathField })
        } else {
          console.log(`⚠️ Entry not found in CMS, skipping deletion`)
          results.skipped.push(filePath)
        }
      } else {
        const { frontmatter, content } = op

        const { data: strapiData, warnings } = await mapToStrapiSchema(
          folderName,
          frontmatter,
          content,
          pathField
        )

        // Track relation warnings
        if (warnings && warnings.length > 0) {
          results.relationWarnings.push({
            file: filePath,
            path: pathField,
            warnings,
          })
        }

        const existingEntry = await findEntryByPath(folderName, pathField)

        if (existingEntry) {
          console.log(`🔄 Updating in CMS: ${pathField}`)
          if (!existingEntry.documentId) {
            throw new Error(`Entry found but has no documentId`)
          }
          await updateEntry(folderName, existingEntry.documentId, strapiData)
          console.log(`✅ Updated successfully`)
          results.updated.push({ file: filePath, path: pathField })
        } else {
          console.log(`➕ Creating in CMS: ${pathField}`)
          await createEntry(folderName, strapiData)
          console.log(`✅ Created successfully`)
          results.created.push({ file: filePath, path: pathField })
        }
      }
    } catch (error) {
      console.error(`❌ Error syncing ${filePath}: ${error.message}`)
      // Detailed error logging...
      if (error.response) {
        console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
      }
      results.errors.push({ file: filePath, error: error.message })
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 SYNC SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Created: ${results.created.length}`)
  console.log(`🔄 Updated: ${results.updated.length}`)
  console.log(`🗑️ Deleted: ${results.deleted.length}`)
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
  ;[...results.created, ...results.updated].forEach((item) => {
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

// Validate environment variables
if (!CMS_API_URL || !CMS_API_TOKEN) {
  console.error('❌ ERROR: Missing required environment variables')
  console.error('   Required: CMS_API_URL, CMS_API_TOKEN')
  process.exit(1)
}

// Run sync
syncToStrapi()
  .then(() => {
    console.log('✅ Sync completed successfully!')
  })
  .catch((error) => {
    console.error('❌ SYNC FAILED:', error.message)
    process.exit(1)
  })
