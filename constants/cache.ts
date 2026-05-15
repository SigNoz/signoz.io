/**
 * CMS revalidation interval used for ISR + Cache-Control headers across CMS-driven
 * routes (faqs, case studies, comparisons, guides, opentelemetry hub, etc.).
 *
 * NOTE: Next 15's segment-config static analyzer only accepts primitive literals
 * for `export const revalidate = ...`. It does not follow imports or evaluate
 * identifiers. Pages that need this value must inline the literal `86400` and
 * leave a `// see CMS_REVALIDATE_INTERVAL` comment so future edits stay in sync.
 *
 * This constant is still imported by route handlers that interpolate it into
 * runtime values (e.g. `Cache-Control` header strings) — those uses are fine.
 *
 * To find inlined call sites: `grep -rn "revalidate = 86400" app/`
 */
export const CMS_REVALIDATE_INTERVAL = 86400 // 1 day

export const GITHUB_RELEASES_REVALIDATE_SECONDS = 86400 // 24h

export const GITHUB_RELEASES_STALE_WHILE_REVALIDATE_SECONDS = 3600 // 1h

export const GITHUB_RELEASES_EDGE_S_MAXAGE_SECONDS = 300 // 5 min

export const GITHUB_RELEASES_PARTIAL_S_MAXAGE_SECONDS = 120

export const GITHUB_RELEASES_PARTIAL_INSTANCE_MEMO_MS = 5 * 60 * 1000 // 5 min

export const GITHUB_STARS_EDGE_S_MAXAGE_SECONDS = 3600 // 1h

export const FOUNDRY_SCRIPT_REVALIDATE_SECONDS = 86400 // 24h

export const FOUNDRY_SCRIPT_STALE_WHILE_REVALIDATE_SECONDS = 3600 // 1h

export const FOUNDRY_SCRIPT_EDGE_S_MAXAGE_SECONDS = 300 // 5 min

export const FOUNDRY_SCRIPT_FALLBACK_S_MAXAGE_SECONDS = 120

export const FOUNDRY_SCRIPT_FALLBACK_INSTANCE_MEMO_MS = 5 * 60 * 1000 // 5 min
