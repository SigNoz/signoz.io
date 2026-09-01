/**
 * Accept-header parsing for markdown content negotiation.
 *
 * The proxy previously decided with `accept.includes('text/markdown')`, a
 * substring test that ignores quality values entirely. That served markdown to
 * clients that ranked HTML higher, and even to clients that explicitly refused
 * markdown with `text/markdown;q=0`.
 *
 * Kept dependency-free so tests can load it via loadTsModule.
 */

const MARKDOWN_TYPE = 'text/markdown'
const HTML_TYPE = 'text/html'

type MediaRange = {
  type: string
  quality: number
}

/**
 * RFC 9110 §12.4.2: quality is `q=` between 0 and 1. Anything malformed falls
 * back to the default of 1 rather than dropping the range, so a client with a
 * sloppy header still gets a sensible representation.
 */
const parseQuality = (parameters: string[]): number => {
  const qParam = parameters.find((parameter) => parameter.trim().toLowerCase().startsWith('q='))
  if (!qParam) return 1

  const parsed = Number.parseFloat(qParam.trim().slice(2))
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) return 1

  return parsed
}

export const parseAcceptHeader = (accept: string): MediaRange[] =>
  accept
    .split(',')
    .map((entry) => {
      const [rawType, ...parameters] = entry.split(';')
      const type = rawType.trim().toLowerCase()
      if (!type) return null

      return { type, quality: parseQuality(parameters) }
    })
    .filter((range): range is MediaRange => range !== null)

/** Highest quality across the ranges that match `type`, or null if absent. */
const qualityFor = (ranges: MediaRange[], type: string): number | null => {
  const matches = ranges.filter((range) => range.type === type)
  if (matches.length === 0) return null

  return Math.max(...matches.map((range) => range.quality))
}

/**
 * True when the client asked for markdown and ranked it at least as high as
 * HTML.
 *
 * Deliberate choices:
 * - Only an explicit `text/markdown` opts in. Wildcards (`*​/*`, `text/*`) never
 *   do, so a default `curl` or a crawler sending `*​/*` keeps getting HTML.
 * - A tie resolves to markdown. Agents commonly send `text/markdown, text/html`
 *   with both at the default q=1, and that is the bulk of production markdown
 *   traffic — flipping ties to HTML would regress it.
 * - `text/markdown;q=0` means "not acceptable" and is honoured as a refusal.
 */
export const prefersMarkdownFromAccept = (accept: string | null | undefined): boolean => {
  if (!accept) return false

  const ranges = parseAcceptHeader(accept)
  const markdownQuality = qualityFor(ranges, MARKDOWN_TYPE)

  if (markdownQuality === null || markdownQuality === 0) return false

  const htmlQuality =
    qualityFor(ranges, HTML_TYPE) ?? qualityFor(ranges, 'text/*') ?? qualityFor(ranges, '*/*') ?? 0

  return markdownQuality >= htmlQuality
}
