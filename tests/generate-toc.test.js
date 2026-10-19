const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { generateTOC } = loadTsModule('utils/mdx/options.ts')

test('generateTOC extracts h1-h3 headings with slug urls', () => {
  const toc = generateTOC(`
# Title

## Overview

### Setup
`)

  assert.deepEqual(toc, [
    { value: 'Title', url: '#title', depth: 1 },
    { value: 'Overview', url: '#overview', depth: 2 },
    { value: 'Setup', url: '#setup', depth: 3 },
  ])
})

test('generateTOC includes headings nested under leading whitespace (JSX tabs)', () => {
  const toc = generateTOC(`
## Outer

    ### Nested in tab

## After
`)

  assert.deepEqual(
    toc.map((item) => item.value),
    ['Outer', 'Nested in tab', 'After']
  )
  assert.equal(toc[1].depth, 3)
  assert.equal(toc[1].url, '#nested-in-tab')
})

test('generateTOC ignores headings inside fenced code blocks', () => {
  const toc = generateTOC(`
## Real heading

\`\`\`md
## Fake heading in code
\`\`\`

### Also real
`)

  assert.deepEqual(
    toc.map((item) => item.value),
    ['Real heading', 'Also real']
  )
})

test('generateTOC slugger keeps duplicate titles unique', () => {
  const toc = generateTOC(`
## Prerequisites

## Prerequisites
`)

  assert.deepEqual(
    toc.map((item) => item.url),
    ['#prerequisites', '#prerequisites-1']
  )
})
