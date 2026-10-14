export const INTRODUCTION_SLUG = 'introduction'

type ListableDoc = { slug?: string; draft?: boolean }

/**
 * Docs that get their own entry in /docs/sitemap.xml and /llms-full.txt. The
 * introduction page is excluded because both surfaces emit it separately
 * (it renders from shared page constants, not CMS content).
 */
export const isListedDoc = (doc: ListableDoc): boolean =>
  !doc.draft && doc.slug !== INTRODUCTION_SLUG
