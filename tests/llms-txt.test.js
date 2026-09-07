const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { GET } = loadTsModule('app/(site)/llms.txt/route.ts')

const MARKDOWN_LINK_LINE = /^- \[[^\]]+\]\(https:\/\/signoz\.io\/[^()\s]*\)(?:: \S.*)?$/
const INTRO_LINE =
  '- [Get Started](https://signoz.io/docs/introduction/): Learn about SigNoz, an open-source observability platform that helps you monitor your applications with distributed tracing, metrics, and logs.'

let cachedBody

const getBody = async () => {
  if (!cachedBody) {
    const response = await GET(new Request('https://signoz.io/llms.txt'))
    assert.equal(response.status, 200)
    cachedBody = await response.text()
  }
  return cachedBody
}

const sectionsOf = (body) => {
  const sections = new Map()
  let current = null
  body.split('\n').forEach((line) => {
    if (line.startsWith('## ')) {
      current = line.slice(3)
      sections.set(current, [])
    } else if (current) {
      sections.get(current).push(line)
    }
  })
  return sections
}

test('llms.txt follows the llms.txt structure: H1 then summary blockquote', async () => {
  const lines = (await getBody()).split('\n')

  assert.equal(lines[0], '# SigNoz')
  assert.equal(
    lines.some((line) => line.startsWith('> ')),
    true
  )
})

test('llms.txt emits the exact introduction entry from issue #1173', async () => {
  const body = await getBody()

  assert.equal(body.includes('## Starter docs'), true)
  assert.equal(body.includes(INTRO_LINE), true)
})

test('every ## section contains at least one parseable markdown link', async () => {
  const sections = sectionsOf(await getBody())

  assert.deepEqual(
    [...sections.keys()],
    ['Starter docs', 'Agent tooling', 'API and access control', 'Optional']
  )
  sections.forEach((lines, name) => {
    const links = lines.filter((line) => MARKDOWN_LINK_LINE.test(line))
    assert.equal(links.length > 0, true, `section "${name}" has no parseable markdown link`)
  })
})

test('every bullet line is a markdown link with a description', async () => {
  const bullets = (await getBody()).split('\n').filter((line) => line.startsWith('- '))

  assert.equal(bullets.length > 0, true)
  bullets.forEach((line) => {
    assert.match(line, MARKDOWN_LINK_LINE)
    assert.match(line, /\): \S/, `bullet is missing a description: ${line}`)
  })
})

test('emitted links use trailing slashes except file-extension URLs', async () => {
  const body = await getBody()
  const urls = [...body.matchAll(/\]\((https:\/\/signoz\.io\/[^)]*)\)/g)].map((match) => match[1])

  assert.equal(urls.length > 0, true)
  urls.forEach((url) => {
    assert.equal(
      url.endsWith('/') || url.endsWith('.md') || url.endsWith('.txt'),
      true,
      `link would redirect (trailingSlash): ${url}`
    )
  })
})

test('API and access control section links the spec and the access-control docs', async () => {
  const sections = sectionsOf(await getBody())
  const lines = sections.get('API and access control').join('\n')

  // The OpenAPI document already existed at this path but was referenced from
  // nowhere agents look, so scanners reported "no OpenAPI specification found".
  assert.match(lines, /https:\/\/signoz\.io\/api\/api-reference-openapi\/latest\//)
  assert.match(lines, /https:\/\/signoz\.io\/api-reference\//)

  ;[
    'iam/roles/',
    'iam/service-accounts/',
    'iam/user-guides/self-service-api-keys-for-viewers/',
    'iam/user-guides/scope-telemetry-access-by-ingestion-key/',
  ].forEach((route) => {
    assert.equal(lines.includes(route), true, `missing access-control link: ${route}`)
  })
})

test('access-control docs are not duplicated into Starter docs', async () => {
  const sections = sectionsOf(await getBody())
  const starters = sections.get('Starter docs').join('\n')

  assert.equal(starters.includes('/iam/roles/'), false)
  assert.equal(starters.includes('/iam/service-accounts/'), false)
})
