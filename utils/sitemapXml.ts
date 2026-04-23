import { MetadataRoute } from 'next'

export type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?: string
  priority?: number
}

function lastModifiedTimestamp(entry: MetadataRoute.Sitemap[number]): number | null {
  const lm = entry.lastModified
  if (lm == null) return null
  const t = new Date(lm).getTime()
  return Number.isFinite(t) ? t : null
}

export function compareSitemapEntries(
  a: MetadataRoute.Sitemap[number],
  b: MetadataRoute.Sitemap[number]
): number {
  const ta = lastModifiedTimestamp(a)
  const tb = lastModifiedTimestamp(b)
  if (ta === null && tb === null) return 0
  if (ta === null) return -1
  if (tb === null) return 1
  return tb - ta
}

export function toSitemapDateOnly(value: string | Date): string | undefined {
  const d = value instanceof Date ? value : new Date(value)
  if (!Number.isFinite(d.getTime())) return undefined
  return d.toISOString().split('T')[0]
}

export function entriesToXml(entries: SitemapEntry[]): string {
  const urlTags = entries.map((entry) => {
    const parts = [`    <loc>${entry.url}</loc>`]
    if (entry.lastModified) {
      const date = toSitemapDateOnly(entry.lastModified)
      if (date) parts.push(`    <lastmod>${date}</lastmod>`)
    }
    if (entry.changeFrequency) {
      parts.push(`    <changefreq>${entry.changeFrequency}</changefreq>`)
    }
    if (entry.priority !== undefined) {
      parts.push(`    <priority>${entry.priority}</priority>`)
    }
    return `  <url>\n${parts.join('\n')}\n  </url>`
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlTags,
    '</urlset>',
  ].join('\n')
}
