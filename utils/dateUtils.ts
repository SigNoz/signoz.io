/**
 * Centralised date-field resolution utilities.
 *
 * Content has three date frontmatter fields:
 *   - `published_date` — when the article was first published
 *   - `updated_date`   — when the article was last meaningfully updated
 *   - `date`           — **@deprecated** legacy field; prefer `published_date` + `updated_date`
 *
 * The `date` field is kept for backwards compatibility. During the transition
 * period every consumer falls back to `date` when the new fields are absent.
 *
 * Fallback priority (most → least specific):
 *
 *   published_date takes priority (only these two places):
 *     "Published on:" UI label:  published_date → (date, only when updated_date exists) → null
 *       → getFormattedDates() in ArticleLayout, OpenTelemetryHubLayout
 *     Schema.org datePublished:  published_date → date → publishedAt → updatedAt → createdAt
 *       → resolvePublishedDate() in structuredData.ts, hub route metadata (publishedTime)
 *
 *   updated_date takes priority (everything else):
 *     "Last Updated:" UI label:  updated_date → (date, only when published_date is absent) → null
 *     Sort / RSS / sitemap:      updated_date → published_date → date → publishedAt → updatedAt → createdAt
 *     Schema.org dateModified:   updated_date → published_date → date → updatedAt → publishedAt → createdAt
 *     Related article cards:     updated_date → published_date → date → publishedAt → updatedAt → createdAt
 *     Resource-center cards:     updated_date → published_date → date → publishedAt → updatedAt → createdAt
 *       → resolveLatestDate() used in rssUtils, sitemap, content.ts, mdxUtils related articles
 */

// ---------------------------------------------------------------------------
// Core derivation — used by transform functions
// ---------------------------------------------------------------------------

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
 * | set            | set         | *    | published_date   | updated_date   | updated_date     |
 * | set            | —           | *    | published_date   | null           | published_date   |
 * | —              | set         | set  | date             | updated_date   | updated_date     |
 * | —              | set         | —    | null             | updated_date   | updated_date     |
 * | —              | —           | set  | null             | date           | date             |
 * | —              | —           | —    | null             | null           | null             |
 */
export function deriveDates(content: RawDateFields) {
  const publishedDate = content.published_date || (content.updated_date ? content.date : null)
  const updatedDate = content.updated_date || (content.published_date ? null : content.date)
  const sortDate = content.updated_date || content.published_date || content.date || ''
  return { publishedDate, updatedDate, sortDate }
}

// ---------------------------------------------------------------------------
// Display formatting — used by layouts
// ---------------------------------------------------------------------------

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

/**
 * Get formatted display dates from **already-transformed** content.
 *
 * Transforms (`deriveDates`) resolve `published_date` and `updated_date`;
 * the `content.date` fallback on `updatedDate` is a safety net for content
 * that somehow bypasses transforms (should not happen, but defensive).
 */
export function getFormattedDates(content: RawDateFields) {
  const publishedDate = formatDisplayDate(content.published_date)
  const updatedDate = formatDisplayDate(content.updated_date ?? content.date)
  return { publishedDate, updatedDate }
}

// ---------------------------------------------------------------------------
// Full fallback chains — used by RSS, sitemaps, resource-center cards
// ---------------------------------------------------------------------------

type CMSDateFields = RawDateFields & {
  publishedAt?: string | null
  updatedAt?: string | null
  createdAt?: string | null
}

/**
 * Resolve the most-recent date for sorting, RSS `<pubDate>`, and sitemap `lastModified`.
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

/**
 * Resolve the original publication date.
 *
 * Prefers `published_date` since that explicitly represents first-publish.
 * Does **not** include `updated_date` — callers that need the latest date
 * should use {@link resolveLatestDate} instead.
 *
 * Used by:
 *   - `structuredData.ts` → Schema.org `datePublished`
 *   - hub route metadata  → OpenGraph `publishedTime`
 */
export function resolvePublishedDate(content: CMSDateFields): string | undefined {
  return (
    content.published_date ??
    content.date ??
    content.publishedAt ??
    content.updatedAt ??
    content.createdAt ??
    undefined
  )
}
