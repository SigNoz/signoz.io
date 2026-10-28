import {
  buildDocsMarkdownAlternatePath,
  shouldRewriteDocsToMarkdown,
} from '@/utils/docs/markdownRouting'
import {
  API_REFERENCE_MARKDOWN_PATH,
  parseApiReferencePath,
} from '@/utils/apiReferenceMarkdownRouting'
import { buildMarkdownAlternatePath, servesMarkdownAlternate } from '@/utils/agentMarkdownRouting'

/**
 * Public `.md` URL advertised as the markdown alternate of an HTML page
 * (`Link: <...>; rel="alternate"; type="text/markdown"`), or null when the
 * path has no markdown twin. Composes the docs, api-reference, and
 * content/page pipelines so the proxy has a single discovery answer.
 */
export function resolveMarkdownAlternatePath(pathname: string): string | null {
  if (shouldRewriteDocsToMarkdown(pathname, true)) {
    return buildDocsMarkdownAlternatePath(pathname)
  }

  const apiReference = parseApiReferencePath(pathname)
  if (apiReference) {
    if (apiReference.kind === 'index') return API_REFERENCE_MARKDOWN_PATH
    return apiReference.explicitMarkdown ? null : `/api-reference/${apiReference.version}.md`
  }

  if (servesMarkdownAlternate(pathname)) {
    return buildMarkdownAlternatePath(pathname)
  }

  return null
}
