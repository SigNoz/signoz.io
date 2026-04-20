export type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?: string
  priority?: number
}

export function entriesToXml(entries: SitemapEntry[]): string {
  const urlTags = entries.map((entry) => {
    const parts = [`    <loc>${entry.url}</loc>`]
    if (entry.lastModified) {
      const date =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString().split('T')[0]
          : String(entry.lastModified).split('T')[0]
      parts.push(`    <lastmod>${date}</lastmod>`)
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
