const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { loadTsModule } = require('./helpers/loadTsModule')

const { extractMdxComponentNames, AGENT_MDX_COMPONENT_POLICIES } = loadTsModule(
  'utils/docs/agentMarkdownStubs.ts'
)

const repoRoot = path.resolve(__dirname, '..')
const docsRoot = path.join(repoRoot, 'data/docs')

const getDocFiles = (dir) => {
  const files = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getDocFiles(fullPath))
      continue
    }

    if (entry.name.endsWith('.mdx')) {
      files.push(fullPath)
    }
  }

  return files
}

test('all custom docs MDX components are explicitly reviewed for agent markdown rendering', async () => {
  const missingCoverage = []

  for (const filePath of getDocFiles(docsRoot)) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const unreviewedComponents = extractMdxComponentNames(raw).filter(
      (componentName) =>
        !Object.prototype.hasOwnProperty.call(AGENT_MDX_COMPONENT_POLICIES, componentName)
    )

    if (unreviewedComponents.length > 0) {
      missingCoverage.push(
        `${path.relative(repoRoot, filePath)}: ${unreviewedComponents.sort().join(', ')}`
      )
    }
  }

  assert.deepEqual(
    missingCoverage,
    [],
    [
      'Found docs MDX components without an explicit agent-markdown policy.',
      'Update utils/docs/agentMarkdownStubs.ts and decide whether each component needs a custom stub or a reviewed fallback.',
      ...missingCoverage,
    ].join('\n')
  )
})
