const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildLlmsFullMarkdown, cleanDocSourceForLlms } = loadTsModule(
  'utils/docs/buildLlmsFullMarkdown.ts'
)

test('cleanDocSourceForLlms strips import and export statements', () => {
  const source = [
    "import GetHelp from '@/components/shared/get-help.md'",
    "import {\n  A,\n  B,\n} from 'somewhere'",
    'export const toc = []',
    '',
    'Real content.',
  ].join('\n')

  const cleaned = cleanDocSourceForLlms(source)
  assert.equal(cleaned.includes('import'), false)
  assert.equal(cleaned.includes('export const'), false)
  assert.equal(cleaned.includes('Real content.'), true)
})

test('cleanDocSourceForLlms unwraps Tabs keeping TabItem labels', () => {
  const source = [
    '<Tabs>',
    '<TabItem value="cloud" label="SigNoz Cloud">',
    'Cloud steps.',
    '</TabItem>',
    '<TabItem value="self-host" label="Self-Host">',
    'Self-host steps.',
    '</TabItem>',
    '</Tabs>',
  ].join('\n')

  const cleaned = cleanDocSourceForLlms(source)
  assert.equal(cleaned.includes('<Tabs>'), false)
  assert.equal(cleaned.includes('<TabItem'), false)
  assert.equal(cleaned.includes('</TabItem>'), false)
  assert.equal(cleaned.includes('**SigNoz Cloud**'), true)
  assert.equal(cleaned.includes('**Self-Host**'), true)
  assert.equal(cleaned.includes('Cloud steps.'), true)
  assert.equal(cleaned.includes('Self-host steps.'), true)
})

test('cleanDocSourceForLlms handles > inside quoted attribute values', () => {
  const source = [
    '<Tabs>',
    '<TabItem label="Version >= 0.76.0" value=">=0.76.0" default>',
    'New steps.',
    '</TabItem>',
    '</Tabs>',
  ].join('\n')

  const cleaned = cleanDocSourceForLlms(source)
  assert.equal(cleaned.includes('**Version >= 0.76.0**'), true)
  assert.equal(cleaned.includes('New steps.'), true)
  assert.equal(cleaned.includes('<TabItem'), false)
  assert.equal(cleaned.includes('value='), false)
})

test('cleanDocSourceForLlms converts Figure to a markdown image', () => {
  const source = '<Figure src="/img/docs/example.webp" alt="Example flow" caption="The flow" />'
  const cleaned = cleanDocSourceForLlms(source)
  assert.equal(cleaned.includes('![Example flow](/img/docs/example.webp)'), true)
  assert.equal(cleaned.includes('*The flow*'), true)
  assert.equal(cleaned.includes('<Figure'), false)
})

test('cleanDocSourceForLlms keeps Admonition labels and drops unknown components', () => {
  const source = [
    '<Admonition type="info" title="Heads up">',
    'Important note.',
    '</Admonition>',
    '<YouTube id="abc123" mute={false} />',
  ].join('\n')

  const cleaned = cleanDocSourceForLlms(source)
  assert.equal(cleaned.includes('**Info: Heads up**'), true)
  assert.equal(cleaned.includes('Important note.'), true)
  assert.equal(cleaned.includes('<Admonition'), false)
  assert.equal(cleaned.includes('YouTube'), false)
})

test('cleanDocSourceForLlms leaves fenced code blocks untouched', () => {
  const source = [
    "import Widget from './widget'",
    '',
    '```jsx',
    "import Widget from './widget'",
    '<Figure src="/keep.png" />',
    '```',
  ].join('\n')

  const cleaned = cleanDocSourceForLlms(source)
  assert.equal(cleaned.includes("```jsx\nimport Widget from './widget'"), true)
  assert.equal(cleaned.includes('<Figure src="/keep.png" />'), true)
  assert.equal(cleaned.startsWith('```'), true)
})

test('buildLlmsFullMarkdown builds a deterministic corpus with per-doc URLs', async () => {
  const [first, second] = await Promise.all([buildLlmsFullMarkdown(), buildLlmsFullMarkdown()])
  assert.equal(first, second)

  assert.equal(first.startsWith('# SigNoz Documentation'), true)
  assert.equal(first.includes('https://signoz.io/llms.txt'), true)

  const urls = first.match(/^URL: https:\/\/signoz\.io\/docs\/.+\/$/gm) || []
  assert.equal(urls.length > 100, true, `expected many docs, got ${urls.length}`)
  assert.equal(new Set(urls).size, urls.length, 'URL lines must be unique per doc')

  // Introduction leads the corpus and every doc section is separated by ---.
  assert.equal(first.includes('## Welcome to SigNoz Docs'), true)
  // One separator per section at minimum (doc bodies may add their own hrules).
  const boundaries = first.match(/^---$/gm) || []
  assert.equal(boundaries.length >= urls.length, true)

  // Introduction section carries the shared intro cards.
  assert.equal(first.includes('URL: https://signoz.io/docs/introduction/'), true)
})
