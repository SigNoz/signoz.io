import {
  docsMcpMethodNotAllowed,
  docsMcpPreflight,
  handleDocsMcpPost,
  type DocsMcpDeps,
} from '@/utils/docs/docsMcp'
import { getDocMarkdownBySlug } from '@/utils/docs/getDocMarkdownBySlug'
import { searchDocsWithAlgolia } from '@/utils/docs/searchDocsWithAlgolia'

// Public docs-only MCP server (stateless Streamable HTTP). No authentication by design.
const deps: DocsMcpDeps = {
  searchDocs: searchDocsWithAlgolia,
  fetchDocMarkdown: getDocMarkdownBySlug,
}

export async function POST(request: Request) {
  return handleDocsMcpPost(request, deps)
}

export function GET() {
  return docsMcpMethodNotAllowed()
}

export function DELETE() {
  return docsMcpMethodNotAllowed()
}

export function OPTIONS() {
  return docsMcpPreflight()
}
