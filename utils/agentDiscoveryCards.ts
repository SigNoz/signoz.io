import { createHash } from 'node:crypto'
import siteMetadata from '@/data/siteMetadata'
import { agentResponse } from '@/utils/agentResponseHeaders'

/**
 * Well-known agent discovery documents:
 * - /.well-known/agent-skills/index.json: Agent Skills discovery index (v0.2.0,
 *   Cloudflare-led RFC, https://github.com/cloudflare/agent-skills-discovery-rfc).
 * - /.well-known/skills/index.json: the v0.1.0 index layout, kept for clients
 *   that predate the rename.
 *
 * The published skill is the /skill.md body, re-served under each index's
 * skill directory so the digest is always computed over the bytes we serve.
 */

export const SKILL_NAME = 'signoz'

export const AGENT_SKILLS_SCHEMA = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json'

export const AGENT_SKILLS_INDEX_PATH = '/.well-known/agent-skills/index.json'
export const AGENT_SKILL_PATH = `/.well-known/agent-skills/${SKILL_NAME}/SKILL.md`
export const LEGACY_SKILLS_INDEX_PATH = '/.well-known/skills/index.json'
export const MCP_DISCOVERY_PATH = '/.well-known/mcp'
export const MCP_SERVER_CARD_PATH = '/.well-known/mcp/server-card.json'

/**
 * Link header advertised on HTML page responses so agents that only read
 * response headers can find every agent-facing resource from any page.
 */
export const AGENT_DISCOVERY_LINK_HEADER = [
  '</llms.txt>; rel="llms-txt"; type="text/plain"',
  '</llms-full.txt>; rel="llms-full-txt"; type="text/plain"',
  `<${AGENT_SKILLS_INDEX_PATH}>; rel="agent-skills"; type="application/json"`,
  `<${MCP_SERVER_CARD_PATH}>; rel="mcp-server-card"; type="application/json"`,
  `<${MCP_DISCOVERY_PATH}>; rel="mcp"; type="application/json"`,
].join(', ')

const NON_PAGE_PREFIXES = ['/api', '/_next', '/.well-known']

/** True for page URLs (no file extension, not an API, asset, or well-known path). */
export const isAgentDiscoveryLinkTarget = (pathname: string): boolean => {
  if (NON_PAGE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)))
    return false
  const lastSegment = pathname.replace(/\/+$/, '').split('/').pop() || ''
  return !/\.[a-z0-9]+$/i.test(lastSegment)
}

export const sha256Digest = (body: string): string =>
  `sha256:${createHash('sha256').update(body, 'utf8').digest('hex')}`

type SkillFrontmatter = { name: string; description: string }

/** Read `name` and `description` from a SKILL.md YAML frontmatter block. */
export const parseSkillFrontmatter = (body: string): SkillFrontmatter => {
  const block = body.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? ''
  const field = (key: string) =>
    block
      .match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]
      ?.trim()
      .replace(/^['"]|['"]$/g, '') ?? ''
  return { name: field('name') || SKILL_NAME, description: field('description') }
}

export function buildAgentSkillsIndex(skillBody: string) {
  const { name, description } = parseSkillFrontmatter(skillBody)
  return {
    $schema: AGENT_SKILLS_SCHEMA,
    skills: [
      {
        name,
        type: 'skill-md',
        description,
        url: `${siteMetadata.siteUrl}${AGENT_SKILL_PATH}`,
        digest: sha256Digest(skillBody),
      },
    ],
  }
}

/** v0.1.0 layout: files resolve under /.well-known/skills/<name>/. */
export function buildLegacySkillsIndex(skillBody: string) {
  const { name, description } = parseSkillFrontmatter(skillBody)
  return { skills: [{ name, description, files: ['SKILL.md'] }] }
}

/** JSON discovery response: shared agent cache headers plus open CORS for browser agents. */
export function discoveryJsonResponse(document: unknown): Response {
  const response = agentResponse(JSON.stringify(document, null, 2), {
    contentType: 'application/json; charset=utf-8',
  })
  response.headers.set('Access-Control-Allow-Origin', '*')
  return response
}
