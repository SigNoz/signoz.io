import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const LEGAL_DIR = path.join(process.cwd(), 'data', 'legal')

export type LegalDoc = {
  slug: string
  title: string
  description: string
  order: number
  lastUpdated?: string
  content: string
}

function toIsoDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && value) return value
  return undefined
}

function resolveLegalFile(fileName: string): string {
  const filePath = fs.realpathSync(path.resolve(LEGAL_DIR, fileName))
  if (path.dirname(filePath) !== fs.realpathSync(LEGAL_DIR)) {
    throw new Error(`data/legal/${fileName}: resolves outside data/legal`)
  }
  return filePath
}

function readLegalDoc(fileName: string): LegalDoc {
  const slug = fileName.replace(/\.md$/, '')
  const { data, content } = matter(fs.readFileSync(resolveLegalFile(fileName), 'utf8'))

  if (typeof data.title !== 'string' || typeof data.description !== 'string') {
    throw new Error(`data/legal/${fileName}: frontmatter requires "title" and "description"`)
  }
  if (typeof data.order !== 'number') {
    throw new Error(`data/legal/${fileName}: frontmatter requires a numeric "order"`)
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    order: data.order,
    lastUpdated: toIsoDate(data.lastUpdated),
    content,
  }
}

export function getLegalDocs(): LegalDoc[] {
  return fs
    .readdirSync(LEGAL_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => readLegalDoc(entry.name))
    .sort((a, b) => a.order - b.order)
}

export function getLegalRoutes(): string[] {
  return getLegalDocs().map((doc) => `legal/${doc.slug}`)
}

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return getLegalDocs().find((doc) => doc.slug === slug)
}

export function formatLegalDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
