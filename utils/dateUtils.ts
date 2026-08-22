/**
 * Centralised date-field resolution utilities.
 *
 * Content has three date frontmatter fields:
 *   - `published_date` — when the article was first published
 *   - `updated_date`   — when the article was last meaningfully updated
 *   - `date`           — **@deprecated** legacy field; prefer `published_date` + `updated_date`
 *
 * Valid field combinations (enforced by check-docs-metadata.js):
 *   1. `published_date` + `updated_date`  — new-style explicit dates
 *   2. `published_date` only              — published, never updated
 *   3. `date` only                        — legacy articles
 *   4. none                               — falls back to CMS timestamps
 *
 * Mixing `date` with `published_date` or `updated_date` is forbidden.
 * Setting `updated_date` without `published_date` is forbidden.
 *
 * Display:
 *   "Last Updated:" → latest date (updated_date → published_date → date)
 *
 * SEO / sorting — the site consumes all fields as ONE effective date:
 *   datePublished = dateModified = sort/RSS:
 *     updated_date → published_date → date → publishedAt → updatedAt → createdAt
 *
 * WARNING — do NOT reintroduce a separate first-publish date in SEO metadata.
 * Context: https://github.com/SigNoz/growth-pod/issues/1244
 */

type RawDateFields = {
  published_date?: string | null
  updated_date?: string | null
  /** @deprecated Use `published_date` and `updated_date` instead. */
  date?: string | null
}

/**
 * Derive display and sort dates from raw content fields.
 *
 * Used by `transformBlog`, `transformGuide`, `transformComparison` to resolve
 * the three raw fields into a consistent set of display + sort values.
 *
 * | published_date | updated_date | date | → publishedDate  | → updatedDate  | → sortDate       |
 * |----------------|-------------|------|------------------|----------------|------------------|
 * | set            | set         | —    | published_date   | updated_date   | updated_date     |
 * | set            | —           | —    | published_date   | null           | published_date   |
 * | —              | —           | set  | null             | date           | date             |
 * | —              | —           | —    | null             | null           | null             |
 */
export function deriveDates(content: RawDateFields) {
  const publishedDate = content.published_date || null
  const updatedDate = content.updated_date || (content.published_date ? null : content.date) || null
  const sortDate = content.updated_date || content.published_date || content.date || ''
  return { publishedDate, updatedDate, sortDate }
}

/**
 * Format a date string for UI display.
 * @returns `"Month DD, YYYY"` (e.g. `"June 11, 2026"`) or `null`.
 */
export function formatDisplayDate(dateStr: string | undefined | null): string | null {
  return dateStr
    ? new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })
    : null
}

type CMSDateFields = RawDateFields & {
  publishedAt?: string | null
  updatedAt?: string | null
  createdAt?: string | null
}

/**
 * Resolve the single effective date used everywhere: SEO metadata
 * (`datePublished` and `dateModified`), visible "Last Updated" bylines,
 * sorting, RSS `<pubDate>`, and sitemap `lastModified`.
 *
 * Prefers `updated_date` so that recently-updated content sorts first.
 * Falls through CMS timestamps (`publishedAt`, `updatedAt`, `createdAt`)
 * for content that has not yet migrated to the new fields.
 */
export function resolveLatestDate(content: CMSDateFields): string | undefined {
  return (
    content.updated_date ??
    content.published_date ??
    content.date ??
    content.publishedAt ??
    content.updatedAt ??
    content.createdAt ??
    undefined
  )
}
