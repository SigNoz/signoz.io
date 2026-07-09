const fs = require('fs')
const path = require('path')

function loadScenario(name) {
  const fixtureDir = path.join(__dirname, 'fixtures', name)
  const load = (file) => {
    const filePath = path.join(fixtureDir, file)
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    return null
  }

  return {
    dir: fixtureDir,
    changedFiles: load('changed-files.json') || [],
    deletedFiles: load('deleted-files.json') || [],
    cmsState: load('cms-state.json') || {},
    relationState: load('relation-state.json') || {},
    expectedOps: load('expected-ops.json') || {},
    expectedAssetOps: load('expected-asset-ops.json') || null,
    previousManifest: load('previous-manifest.json') || null,
  }
}

function createMockCmsAdapter(cmsState = {}, relationState = {}) {
  const ops = { creates: [], updates: [], deletes: [] }

  const existingEntries = cmsState.entries || {}
  const relationEntities = relationState.entities || {}
  const relatedArticleEntities = relationState.relatedArticles || {}

  return {
    ops,
    async fetchEntitiesByFilter(endpoint, filterField, values) {
      const entities = relationEntities[endpoint] || []
      return entities.filter((e) => values.includes(e[filterField]))
    },
    filterEntitiesByDeploymentStatus(entities) {
      return entities
    },
    async createEntry(endpoint, data) {
      ops.creates.push({ endpoint, data })
      return { data: { documentId: `new-${ops.creates.length}`, ...data } }
    },
    async updateEntry(endpoint, documentId, data) {
      ops.updates.push({ endpoint, documentId, data })
      return { data: { documentId, ...data } }
    },
    async deleteEntry(endpoint, documentId) {
      ops.deletes.push({ endpoint, documentId })
      return { data: { documentId } }
    },
    async createTagOrKeyword(endpoint, value, folderName) {
      const key = `${folderName}-${value}`
      const newEntry = { documentId: `auto-${key}`, key, value }
      ops.creates.push({ endpoint, data: { key, value } })
      return newEntry
    },
    async prefetchRelationEntities(pendingOperations, schemas) {
      return {
        entityCache: relationEntities,
        relatedArticleCache: relatedArticleEntities,
      }
    },
    async prefetchExistingEntries(pendingOperations, schemas) {
      const cache = {}
      for (const [folder, entries] of Object.entries(existingEntries)) {
        const map = new Map()
        for (const entry of entries) {
          if (entry.path) {
            map.set(entry.path, entry)
          }
        }
        cache[folder] = map
      }
      return cache
    },
    async putSidenav(items) {
      ops.updates.push({ endpoint: 'docs-side-nav', data: { items } })
    },
    async fetchListicle(key) {
      const entries = (cmsState.listicles || []).filter((l) => l.key === key)
      return entries
    },
    async createListicle(data) {
      ops.creates.push({ endpoint: 'listicles', data })
    },
    async updateListicle(documentId, data) {
      ops.updates.push({ endpoint: 'listicles', documentId, data })
    },
    async deleteListicle(documentId) {
      ops.deletes.push({ endpoint: 'listicles', documentId })
    },
  }
}

function createMockAssetAdapter(cdnState = {}) {
  const uploads = []

  return {
    uploads,
    async checkCDN(assetPath) {
      return cdnState[assetPath] === true
    },
    async uploadToS3(localPath, s3Key) {
      uploads.push({ localPath, s3Key })
    },
    async syncAsset(assetPath) {
      uploads.push({ assetPath, synced: true })
    },
  }
}

function assertOpsMatch(actual, expected) {
  const assert = require('node:assert/strict')

  if (expected.creates !== undefined) {
    assert.equal(
      actual.creates.length,
      expected.creates.length,
      `Expected ${expected.creates.length} creates, got ${actual.creates.length}`
    )
    for (let i = 0; i < expected.creates.length; i++) {
      if (expected.creates[i].endpoint) {
        assert.equal(actual.creates[i].endpoint, expected.creates[i].endpoint)
      }
    }
  }

  if (expected.updates !== undefined) {
    assert.equal(
      actual.updates.length,
      expected.updates.length,
      `Expected ${expected.updates.length} updates, got ${actual.updates.length}`
    )
    for (let i = 0; i < expected.updates.length; i++) {
      if (expected.updates[i].endpoint) {
        assert.equal(actual.updates[i].endpoint, expected.updates[i].endpoint)
      }
    }
  }

  if (expected.deletes !== undefined) {
    assert.equal(
      actual.deletes.length,
      expected.deletes.length,
      `Expected ${expected.deletes.length} deletes, got ${actual.deletes.length}`
    )
    for (let i = 0; i < expected.deletes.length; i++) {
      if (expected.deletes[i].endpoint) {
        assert.equal(actual.deletes[i].endpoint, expected.deletes[i].endpoint)
      }
      if (expected.deletes[i].documentId) {
        assert.equal(actual.deletes[i].documentId, expected.deletes[i].documentId)
      }
    }
  }
}

function createMockGitReader(baseFiles = {}) {
  return {
    readFileFromGitRef(filePath, gitRef) {
      return baseFiles[filePath] || null
    },
    readBaseFileContent(filePath) {
      return baseFiles[filePath] || null
    },
    readBaseFileForContentEntry(entry) {
      if (entry.filePath && baseFiles[entry.filePath]) {
        return baseFiles[entry.filePath]
      }
      if (entry.folderName && entry.pathField) {
        const constructed = `data/${entry.folderName}${entry.pathField}.mdx`
        return baseFiles[constructed] || null
      }
      return null
    },
    getBaseRefCandidates() {
      return ['origin/main', 'main']
    },
  }
}

module.exports = {
  loadScenario,
  createMockCmsAdapter,
  createMockAssetAdapter,
  createMockGitReader,
  assertOpsMatch,
}
