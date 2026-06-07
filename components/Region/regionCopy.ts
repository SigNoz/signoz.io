// Matches region-specific SigNoz Cloud hosts *after* region substitution, e.g.
//   ingest.us.signoz.cloud, mcp.eu.signoz.cloud
// The `<region>` placeholder (pre-substitution) does NOT match here because
// `<` / `>` fall outside the character class — that case is handled separately below.
const REGION_HOST_REGEX = /(?:ingest|mcp)\.([a-z0-9-]+)\.signoz\.cloud/i

export const REGION_PLACEHOLDER = '<region>'

export const REGION_HELP_HREF = '/docs/ingestion/signoz-cloud/overview/#endpoint'

export type CopiedRegion = { kind: 'region'; token: string } | { kind: 'placeholder' } | null

/**
 * Inspect copied text and figure out whether it carries a SigNoz region.
 * Returns the concrete region token (e.g. `us`) when a region-specific URL is
 * present, a `placeholder` marker when the `<region>` token is still unfilled,
 * or `null` when the text is not region-specific.
 */
export function parseCopiedRegion(text: string | null | undefined): CopiedRegion {
  if (!text) return null
  const match = text.match(REGION_HOST_REGEX)
  if (match) {
    return { kind: 'region', token: match[1].toLowerCase() }
  }
  if (text.includes(REGION_PLACEHOLDER)) {
    return { kind: 'placeholder' }
  }
  return null
}
