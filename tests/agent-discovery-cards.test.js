const test = require('node:test')
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const { loadTsModule } = require('./helpers/loadTsModule')

const {
  AGENT_SKILLS_SCHEMA,
  AGENT_SKILL_PATH,
  AGENT_DISCOVERY_LINK_HEADER,
  isAgentDiscoveryLinkTarget,
  parseSkillFrontmatter,
} = loadTsModule('utils/agentDiscoveryCards.ts')
const { GET: getSkillMarkdown } = loadTsModule('app/(site)/skill.md/route.ts')
const { GET: getAgentSkillsIndex } = loadTsModule(
  'app/(site)/.well-known/agent-skills/index.json/route.ts'
)
const { GET: getAgentSkill } = loadTsModule(
  'app/(site)/.well-known/agent-skills/signoz/SKILL.md/route.ts'
)
const { GET: getLegacySkillsIndex } = loadTsModule(
  'app/(site)/.well-known/skills/index.json/route.ts'
)
const { GET: getLegacySkill } = loadTsModule(
  'app/(site)/.well-known/skills/signoz/SKILL.md/route.ts'
)
const { GET: getAgentCard } = loadTsModule('app/(site)/.well-known/agent-card.json/route.ts')

const readJson = async (handler) => {
  const response = await handler()
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^application\/json/)
  assert.equal(response.headers.get('access-control-allow-origin'), '*')
  return response.json()
}

const sha256 = (body) => `sha256:${createHash('sha256').update(body, 'utf8').digest('hex')}`

test('agent-skills index follows the v0.2.0 discovery schema', async () => {
  const index = await readJson(getAgentSkillsIndex)

  assert.equal(index.$schema, AGENT_SKILLS_SCHEMA)
  assert.equal(index.skills.length, 1)
  const [skill] = index.skills
  assert.equal(skill.name, 'signoz')
  assert.equal(skill.type, 'skill-md')
  assert.equal(skill.description.length > 0, true)
  assert.equal(skill.url, `https://signoz.io${AGENT_SKILL_PATH}`)
  assert.match(skill.digest, /^sha256:[0-9a-f]{64}$/)
})

test('agent-skills digest matches the bytes served at the skill url', async () => {
  const index = await readJson(getAgentSkillsIndex)
  const response = await getAgentSkill()

  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^text\/markdown/)
  assert.equal(index.skills[0].digest, sha256(await response.text()))
})

test('published skill files serve the /skill.md body unchanged', async () => {
  const canonical = await (await getSkillMarkdown()).text()

  assert.equal(await (await getAgentSkill()).text(), canonical)
  assert.equal(await (await getLegacySkill()).text(), canonical)
})

test('legacy skills index uses the v0.1.0 files layout', async () => {
  const index = await readJson(getLegacySkillsIndex)

  assert.equal(index.$schema, undefined)
  assert.deepEqual(index.skills[0].files, ['SKILL.md'])
  assert.equal(index.skills[0].name, 'signoz')
  assert.equal(index.skills[0].description.length > 0, true)
})

test('skill name and description come from the SKILL.md frontmatter', async () => {
  const body = await (await getSkillMarkdown()).text()
  const { name, description } = parseSkillFrontmatter(body)

  assert.match(name, /^[a-z0-9-]{1,64}$/)
  assert.equal(description.length > 0 && description.length <= 1024, true)
})

test('agent card describes SigNoz docs as an A2A card', async () => {
  const card = await readJson(getAgentCard)

  assert.equal(card.url, 'https://signoz.io/docs/')
  assert.equal(card.documentationUrl, 'https://signoz.io/docs/')
  assert.equal(card.protocolVersion, '0.3')
  assert.equal(card.provider.organization, 'SigNoz')
  assert.equal(Array.isArray(card.defaultInputModes), true)
  assert.equal(Array.isArray(card.defaultOutputModes), true)
  assert.equal(card.skills.length > 0, true)
  card.skills.forEach((skill) => {
    assert.equal(typeof skill.id, 'string')
    assert.equal(typeof skill.description, 'string')
  })
})

test('discovery Link header advertises every agent resource', () => {
  assert.match(AGENT_DISCOVERY_LINK_HEADER, /<\/llms\.txt>; rel="llms-txt"/)
  assert.match(AGENT_DISCOVERY_LINK_HEADER, /<\/llms-full\.txt>; rel="llms-full-txt"/)
  assert.match(
    AGENT_DISCOVERY_LINK_HEADER,
    /<\/\.well-known\/agent-skills\/index\.json>; rel="agent-skills"/
  )
  assert.match(AGENT_DISCOVERY_LINK_HEADER, /<\/\.well-known\/agent-card\.json>; rel="agent-card"/)
  assert.match(
    AGENT_DISCOVERY_LINK_HEADER,
    /<\/\.well-known\/mcp\/server-card\.json>; rel="mcp-server-card"/
  )
  assert.match(AGENT_DISCOVERY_LINK_HEADER, /<\/\.well-known\/mcp>; rel="mcp"/)
})

test('Link header targets pages only', () => {
  ;['/', '/docs/introduction/', '/blog/some-post', '/pricing'].forEach((path) =>
    assert.equal(isAgentDiscoveryLinkTarget(path), true, path)
  )
  ;[
    '/llms.txt',
    '/sitemap.xml',
    '/docs/introduction.md',
    '/img/logo.png',
    '/api/docs-markdown/x',
    '/_next/static/chunk',
    '/.well-known/mcp',
  ].forEach((path) => assert.equal(isAgentDiscoveryLinkTarget(path), false, path))
})
