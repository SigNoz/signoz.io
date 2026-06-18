import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import GithubSlugger from 'github-slugger'

const DEFAULT_DOC_TAGS = ['SigNoz Cloud', 'Self-Host']

function listMdxFiles(dir) {
  const entries = readdirSync(dir)
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      files.push(...listMdxFiles(fullPath))
    } else if (entry.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

function generateTOC(content) {
  const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
  const slugger = new GithubSlugger()
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '')

  return Array.from(contentWithoutCodeBlocks.matchAll(regXHeader))
    .map(({ groups }) => {
      const flag = groups?.flag
      const heading = groups?.content

      if (!flag || !heading) return null

      return {
        value: heading,
        url: `#${slugger.slug(heading)}`,
        depth: flag.length === 1 ? 1 : flag.length === 2 ? 2 : 3,
      }
    })
    .filter(Boolean)
}

function sanitizeDocTags(tags) {
  if (!Array.isArray(tags)) return DEFAULT_DOC_TAGS

  const sanitized = tags.map((tag) => (typeof tag === 'string' ? tag.trim() : '')).filter(Boolean)

  return sanitized.length > 0 ? sanitized : DEFAULT_DOC_TAGS
}

function resolveLatestDate(doc) {
  return doc.updated_date ?? doc.published_date ?? doc.date ?? doc.lastmod ?? undefined
}

function toDoc(filePath, docsDir) {
  const relativePath = path.relative(docsDir, filePath).replace(/\\/g, '/')
  const slug = relativePath.replace(/\.mdx$/, '')
  const sourceFilePath = `docs/${relativePath}`
  const flattenedPath = `docs/${slug}`
  const raw = readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const docTags = sanitizeDocTags(data.tags)
  const date = resolveLatestDate(data)

  return {
    ...data,
    _id: data.id || flattenedPath,
    _raw: {
      flattenedPath,
      sourceFilePath,
    },
    type: 'Doc',
    slug,
    path: flattenedPath,
    filePath: sourceFilePath,
    date,
    lastmod: data.lastmod || date,
    draft: data.draft ?? false,
    summary: data.summary || data.description,
    tags: docTags,
    docTags,
    body: {
      raw: content,
      code: '',
    },
    readingTime: readingTime(content),
    toc: generateTOC(content),
  }
}

export function loadLocalDocs(rootDir = process.cwd()) {
  const docsDir = path.join(rootDir, 'data', 'docs')
  return listMdxFiles(docsDir).map((filePath) => toDoc(filePath, docsDir))
}
