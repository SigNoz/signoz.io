import { promises as fs } from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import matter from 'gray-matter'

import { getCachedAuthors } from './cmsAuthors'
import { fetchMDXContentByPath, type MDXContent } from './strapi'

export type { AuthorDirectory } from './cmsAuthors'

type CanonicalCollection =
  | 'blogs'
  | 'guides'
  | 'comparisons'
  | 'faqs'
  | 'case-studies'
  | 'opentelemetries'

type CollectionConfig = {
  canonical: CanonicalCollection
  dataDir: string
  cmsCollection: string
  contentType: string
}

type LocalContentMaps = Record<CanonicalCollection, Map<string, MDXContent>>

type CollectionInput = CanonicalCollection | string

const COLLECTION_CONFIGS: Record<CanonicalCollection, CollectionConfig> = {
  blogs: {
    canonical: 'blogs',
    dataDir: 'blog',
    cmsCollection: 'blogs',
    contentType: 'blog',
  },
  guides: {
    canonical: 'guides',
    dataDir: 'guides',
    cmsCollection: 'guides',
    contentType: 'guide',
  },
  comparisons: {
    canonical: 'comparisons',
    dataDir: 'comparisons',
    cmsCollection: 'comparisons',
    contentType: 'comparison',
  },
  faqs: {
    canonical: 'faqs',
    dataDir: 'faqs',
    cmsCollection: 'faqs',
    contentType: 'faq',
  },
  'case-studies': {
    canonical: 'case-studies',
    dataDir: 'case-study',
    cmsCollection: 'case-studies',
    contentType: 'case_study',
  },
  opentelemetries: {
    canonical: 'opentelemetries',
    dataDir: 'opentelemetry',
    cmsCollection: 'opentelemetries',
    contentType: 'opentelemetry',
  },
}

const COLLECTION_ALIASES: Record<string, CanonicalCollection> = {
  blog: 'blogs',
  blogs: 'blogs',
  guide: 'guides',
  guides: 'guides',
  comparison: 'comparisons',
  comparisons: 'comparisons',
  faq: 'faqs',
  faqs: 'faqs',
  'case-study': 'case-studies',
  'case-studies': 'case-studies',
  case_study: 'case-studies',
  opentelemetry: 'opentelemetries',
  opentelemetries: 'opentelemetries',
}

const RELATED_PREFIX_TO_COLLECTION: Record<string, CanonicalCollection> = {
  blog: 'blogs',
  guides: 'guides',
  comparisons: 'comparisons',
  faqs: 'faqs',
  opentelemetry: 'opentelemetries',
  'case-study': 'case-studies',
}

const DEFAULT_LIST_FIELDS = [
  'title',
  'path',
  'date',
  'description',
  'updatedAt',
  'publishedAt',
  'content',
]

export function isLocalContentOverlayEnabled() {
  return process.env.NODE_ENV === 'development'
}

export function hasCMSContentConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL)
}

export function getDeploymentStatus() {
  return process.env.VERCEL_ENV === 'production' ? 'live' : 'staging'
}

export function getAuthorDirectory() {
  return getCachedAuthors()
}

function getCollectionConfig(collection: CollectionInput): CollectionConfig {
  const canonical = COLLECTION_ALIASES[String(collection)]
  const config = canonical ? COLLECTION_CONFIGS[canonical] : undefined

  if (!config) {
    throw new Error(`Unsupported content collection: ${collection}`)
  }

  return config
}

function normalizeContentPath(value: string | undefined) {
  const cleaned = (value || '').replace(/^\/+|\/+$/g, '')
  return cleaned ? `/${cleaned}` : '/'
}

function contentKey(collection: CanonicalCollection, contentPath: string | undefined) {
  return `${collection}:${normalizeContentPath(contentPath)}`
}

function dateToString(value: unknown): string | undefined {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString().split('T')[0]
  if (typeof value === 'string') return value
  return undefined
}

function normalizeFrontmatterValue(value: unknown): unknown {
  if (value instanceof Date) return dateToString(value)
  if (Array.isArray(value)) return value.map(normalizeFrontmatterValue)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        normalizeFrontmatterValue(nestedValue),
      ])
    )
  }

  return value
}

function normalizeFrontmatter(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, normalizeFrontmatterValue(value)])
  )
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object') {
        const candidate = item as Record<string, unknown>
        return candidate.key || candidate.value || candidate.name
      }
      return undefined
    })
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
}

function normalizeTaxonomy(value: unknown) {
  return normalizeStringArray(value).map((item) => ({
    key: item,
    value: item,
  }))
}

async function collectMdxFiles(rootDir: string): Promise<string[]> {
  let entries: Awaited<ReturnType<typeof fs.readdir>>

  try {
    entries = await fs.readdir(rootDir, { withFileTypes: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw error
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(rootDir, entry.name)
      if (entry.isDirectory()) return collectMdxFiles(entryPath)
      return /\.(mdx?|md)$/i.test(entry.name) ? [entryPath] : []
    })
  )

  return files.flat()
}

function relativePathToContentPath(rootDir: string, filePath: string) {
  const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/')
  return normalizeContentPath(relativePath.replace(/\.(mdx?|md)$/i, ''))
}

function deterministicLocalId(collection: CanonicalCollection, contentPath: string) {
  return createHash('sha1').update(`${collection}:${contentPath}`).digest('hex')
}

async function readLocalContentCollection(config: CollectionConfig): Promise<MDXContent[]> {
  const rootDir = path.join(process.cwd(), 'data', config.dataDir)
  const files = await collectMdxFiles(rootDir)

  return Promise.all(
    files.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, 'utf8')
      const stats = await fs.stat(filePath)
      const { data, content } = matter(fileContent)
      const frontmatter = normalizeFrontmatter(data)
      const contentPath = relativePathToContentPath(rootDir, filePath)
      const slug = contentPath.split('/').filter(Boolean).pop() || ''
      const id = deterministicLocalId(config.canonical, contentPath)
      const frontmatterDate = dateToString(frontmatter.date)
      const publishedAt = frontmatterDate || stats.mtime.toISOString()
      const title = typeof frontmatter.title === 'string' ? frontmatter.title : slug

      const entry: MDXContent = {
        ...frontmatter,
        id: (() => {
          const numericId = Number.parseInt(id.slice(0, 8), 16)
          if (!Number.isFinite(numericId)) {
            throw new Error(`Failed to generate numeric ID for ${config.canonical}:${contentPath}`)
          }
          return numericId
        })(),
        documentId: `local-${id}`,
        title,
        slug,
        path: contentPath,
        content,
        authors: normalizeStringArray(frontmatter.authors),
        related_articles: [],
        related_articles_raw: normalizeStringArray(frontmatter.related_articles),
        publishedAt,
        createdAt: publishedAt,
        updatedAt: dateToString(frontmatter.lastmod) || publishedAt,
        date: frontmatterDate,
        filePath: path.relative(path.join(process.cwd(), 'data'), filePath).replace(/\\/g, '/'),
        __source: 'local',
      }

      if (frontmatter.tags !== undefined) entry.tags = normalizeTaxonomy(frontmatter.tags)
      if (frontmatter.keywords !== undefined)
        entry.keywords = normalizeTaxonomy(frontmatter.keywords)

      return entry
    })
  )
}

async function readAllLocalContent(): Promise<Record<CanonicalCollection, MDXContent[]>> {
  const entries = await Promise.all(
    Object.values(COLLECTION_CONFIGS).map(async (config) => [
      config.canonical,
      await readLocalContentCollection(config),
    ])
  )

  return Object.fromEntries(entries) as Record<CanonicalCollection, MDXContent[]>
}

function buildContentMaps(entriesByCollection: Record<CanonicalCollection, MDXContent[]>) {
  return Object.fromEntries(
    Object.entries(entriesByCollection).map(([collection, entries]) => [
      collection,
      new Map(entries.map((entry) => [normalizeContentPath(entry.path), entry])),
    ])
  ) as LocalContentMaps
}

function parseRelatedArticleUrl(url: string) {
  let pathname = url

  try {
    pathname = new URL(url).pathname
  } catch {
    pathname = url
  }

  const cleaned = pathname.replace(/^\/+|\/+$/g, '')
  const slashIndex = cleaned.indexOf('/')
  if (slashIndex === -1) return null

  return {
    prefix: cleaned.substring(0, slashIndex),
    path: normalizeContentPath(cleaned.substring(slashIndex + 1)),
  }
}

async function fetchAllCMSContentForCollection(
  config: CollectionConfig,
  deploymentStatus: string,
  fields?: string[] | null
) {
  if (!hasCMSContentConfig()) {
    throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
  }

  const response = await fetchMDXContentByPath(
    config.cmsCollection,
    undefined,
    deploymentStatus,
    true,
    fields ?? undefined
  )

  return Array.isArray(response.data) ? response.data : [response.data]
}

async function resolveRelatedArticles(
  content: MDXContent,
  maps: LocalContentMaps,
  deploymentStatus: string
): Promise<MDXContent> {
  const rawUrls = normalizeStringArray(
    content.related_articles_raw ||
      (Array.isArray(content.related_articles) &&
      content.related_articles.some((entry: unknown) => typeof entry === 'string')
        ? content.related_articles
        : [])
  )

  if (rawUrls.length === 0) return content

  const cmsMapsByCollection = new Map<CanonicalCollection, Map<string, MDXContent>>()

  async function getRelatedDoc(collection: CanonicalCollection, articlePath: string) {
    const localDoc = maps[collection]?.get(articlePath)
    if (localDoc) return localDoc

    if (!hasCMSContentConfig()) return undefined

    let cmsMap = cmsMapsByCollection.get(collection)
    if (!cmsMap) {
      try {
        const entries = await fetchAllCMSContentForCollection(
          COLLECTION_CONFIGS[collection],
          deploymentStatus
        )
        cmsMap = new Map(entries.map((entry) => [normalizeContentPath(entry.path), entry]))
        cmsMapsByCollection.set(collection, cmsMap)
      } catch (error) {
        console.warn(`Failed to resolve related articles for ${collection}:`, error)
        cmsMap = new Map()
        cmsMapsByCollection.set(collection, cmsMap)
      }
    }

    return cmsMap.get(articlePath)
  }

  const relatedArticles = (
    await Promise.all(
      rawUrls.map(async (url) => {
        const parsed = parseRelatedArticleUrl(url)
        if (!parsed) return null

        const collection = RELATED_PREFIX_TO_COLLECTION[parsed.prefix]
        if (!collection) return null

        const relatedDoc = await getRelatedDoc(collection, parsed.path)
        if (!relatedDoc) return null

        const typeInfo = COLLECTION_CONFIGS[collection]
        return {
          content_type: typeInfo.contentType,
          [typeInfo.contentType]: relatedDoc,
        }
      })
    )
  ).filter(Boolean)

  return {
    ...content,
    related_articles: relatedArticles,
  } as MDXContent
}

async function getLocalContentBySlug(
  config: CollectionConfig,
  slug: string,
  deploymentStatus: string
) {
  const entriesByCollection = await readAllLocalContent()
  const maps = buildContentMaps(entriesByCollection)
  const content = maps[config.canonical]?.get(normalizeContentPath(slug))

  return content ? resolveRelatedArticles(content, maps, deploymentStatus) : undefined
}

async function fetchCMSContentBySlug(
  config: CollectionConfig,
  slug: string,
  deploymentStatus: string
) {
  if (!hasCMSContentConfig()) {
    throw new Error('NEXT_PUBLIC_SIGNOZ_CMS_API_URL is not configured')
  }

  const response = await fetchMDXContentByPath(config.cmsCollection, slug, deploymentStatus)
  return Array.isArray(response.data) ? response.data[0] : response.data
}

export async function getContentBySlug(
  collection: CollectionInput,
  slug: string,
  deploymentStatus = getDeploymentStatus()
): Promise<MDXContent | undefined> {
  const config = getCollectionConfig(collection)

  if (isLocalContentOverlayEnabled()) {
    const localContent = await getLocalContentBySlug(config, slug, deploymentStatus)
    if (localContent) return localContent
  }

  try {
    return await fetchCMSContentBySlug(config, slug, deploymentStatus)
  } catch (error) {
    console.error(
      `Failed to fetch ${config.cmsCollection} content for path "${normalizeContentPath(slug)}":`,
      error
    )
    return undefined
  }
}

export async function getAllContent(
  collection: CollectionInput,
  deploymentStatus = getDeploymentStatus(),
  fields: string[] | null = DEFAULT_LIST_FIELDS
): Promise<MDXContent[]> {
  const config = getCollectionConfig(collection)

  if (!isLocalContentOverlayEnabled()) {
    return fetchAllCMSContentForCollection(config, deploymentStatus, fields)
  }

  const localEntries = await readLocalContentCollection(config)
  let cmsEntries: MDXContent[] = []

  if (hasCMSContentConfig()) {
    try {
      cmsEntries = await fetchAllCMSContentForCollection(config, deploymentStatus, fields)
    } catch (error) {
      console.warn(`CMS fallback failed for ${config.cmsCollection}; using local MDX only:`, error)
    }
  }

  const mergedByPath = new Map<string, MDXContent>()
  for (const entry of cmsEntries) {
    mergedByPath.set(contentKey(config.canonical, entry.path), entry)
  }
  for (const entry of localEntries) {
    mergedByPath.set(contentKey(config.canonical, entry.path), entry)
  }

  return Array.from(mergedByPath.values())
}
