const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { buildIntroductionAgentMarkdown, INTRO_MARKDOWN_TITLE } = loadTsModule(
  'utils/docs/buildIntroductionAgentMarkdown.ts'
)
const { INTRO_SECTIONS } = loadTsModule('app/(site)/docs/introduction/constants.tsx')
const { INTRO_DESCRIPTION } = loadTsModule('utils/docs/agentDiscovery.ts')
const { LLMS_TXT_DIRECTIVE } = loadTsModule('utils/docs/buildMarkdownDocument.ts')

const markdown = buildIntroductionAgentMarkdown()

test('introduction markdown starts with the page title and description', () => {
  assert.equal(markdown.startsWith(`# ${INTRO_MARKDOWN_TITLE}\n\n${INTRO_DESCRIPTION}`), true)
})

test('introduction markdown contains every section title and description', () => {
  for (const section of INTRO_SECTIONS) {
    if (section.title) {
      assert.equal(markdown.includes(`## ${section.title}`), true, `missing "${section.title}"`)
    }
    if (section.description) {
      assert.equal(markdown.includes(section.description), true, `missing "${section.description}"`)
    }
  }
})

test('introduction markdown contains every card as an absolute link with description', () => {
  for (const section of INTRO_SECTIONS) {
    for (const card of section.cards) {
      const url = card.href.startsWith('http') ? card.href : `https://signoz.io${card.href}`
      const line = `- [${card.title}](${url}): ${card.description}`
      assert.equal(markdown.includes(line), true, `missing "${line}"`)
    }
  }
})

test('introduction markdown emits the llms.txt directive exactly once', () => {
  const escaped = LLMS_TXT_DIRECTIVE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  assert.equal((markdown.match(new RegExp(escaped, 'g')) || []).length, 1)
})

test('introduction markdown fails when substantive content drops', () => {
  // Guards the six-section structure: title-less Send Data section still contributes cards.
  const cardCount = INTRO_SECTIONS.reduce((sum, section) => sum + section.cards.length, 0)
  assert.equal(INTRO_SECTIONS.length >= 6, true)
  assert.equal(cardCount >= 27, true)
  assert.equal((markdown.match(/^- \[/gm) || []).length >= cardCount, true)
})
