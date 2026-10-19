const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { GET } = loadTsModule('app/(site)/skill.md/route.ts')

let cachedBody

const getBody = async () => {
  if (!cachedBody) {
    const response = await GET(new Request('https://signoz.io/skill.md'))
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /^text\/markdown/)
    cachedBody = await response.text()
  }
  return cachedBody
}

test('skill.md starts with valid YAML frontmatter', async () => {
  const body = await getBody()

  const frontmatter = body.match(/^---\n([\s\S]*?)\n---\n/)
  assert.ok(frontmatter, 'frontmatter block missing')

  const fields = new Map(
    frontmatter[1]
      .split('\n')
      .map((line) => line.match(/^([\w-]+):\s*(.+)$/))
      .filter(Boolean)
      .map((match) => [match[1], match[2]])
  )
  assert.equal(fields.get('name'), 'signoz')
  assert.equal(fields.get('description').length > 0, true)
})

test('skill.md links to the canonical Agent Skills sources', async () => {
  const body = await getBody()

  assert.equal(body.includes('https://signoz.io/docs/ai/agent-skills/'), true)
  assert.equal(body.includes('https://github.com/SigNoz/agent-skills'), true)
  assert.equal(body.includes('npx skills add SigNoz/agent-skills'), true)
})

test('skill.md states when the MCP server is required', async () => {
  const body = await getBody()

  assert.equal(body.includes('https://signoz.io/docs/ai/signoz-mcp-server/'), true)
  assert.match(body, /MCP server/i)
  assert.match(body, /require/i)
})

test('skill.md markdown links are absolute and parseable', async () => {
  const body = await getBody()
  const links = [...body.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1])

  assert.equal(links.length > 0, true)
  links.forEach((url) => {
    assert.match(url, /^https:\/\//, `link is not absolute: ${url}`)
  })
})
