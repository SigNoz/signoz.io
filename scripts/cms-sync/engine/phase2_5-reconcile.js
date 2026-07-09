const { COLLECTION_SCHEMAS } = require('../schemas')
const { parseMDXContent } = require('../content-parser')
const { extractAssetPaths, replaceAssetPaths } = require('../asset-processor')
const { mapToStrapiPayload } = require('../schema-mapper')
const {
  contentManifestKey,
  buildManifestMap,
  getContentReconciliationAction,
} = require('../manifest')

async function buildRestorePayloadFromBase(
  entry,
  fileContent,
  { config, assetAdapter, relationResolver }
) {
  const { frontmatter, content } = parseMDXContent(entry.filePath, fileContent)

  const assetPaths = extractAssetPaths(content, frontmatter)

  // Replace asset paths with CDN URLs (assets should already exist on CDN for base branch content)
  const { content: updatedContent, frontmatter: updatedFrontmatter } = replaceAssetPaths(
    content,
    frontmatter,
    assetPaths,
    config.s3.cdnUrl
  )

  const schema = COLLECTION_SCHEMAS[entry.folderName]
  if (!schema) {
    throw new Error(`No schema for folder: ${entry.folderName}`)
  }

  let relations = {}
  let relatedArticles = []

  if (relationResolver) {
    try {
      const relResult = await relationResolver.resolveRelations(
        entry.folderName,
        updatedFrontmatter,
        {}
      )
      relations = relResult.relations
    } catch {
      // Fallback: skip relations for restore
    }

    try {
      const raResult = await relationResolver.resolveRelatedArticles(updatedFrontmatter, {})
      relatedArticles = raResult.components
    } catch {
      // Fallback: skip related articles for restore
    }
  }

  const { data } = mapToStrapiPayload(
    entry.folderName,
    updatedFrontmatter,
    updatedContent,
    entry.pathField,
    config.deploymentStatus,
    { relations, relatedArticles }
  )

  return data
}

async function runPhase2_5(
  currentContentManifest,
  previousManifest,
  results,
  { config, cmsAdapter, assetAdapter, gitReader, relationResolver }
) {
  console.log('\n' + '='.repeat(80))
  console.log('🔄 PHASE 2.5: Content Reconciliation')
  console.log('='.repeat(80))

  const currentMap = buildManifestMap(currentContentManifest, contentManifestKey)
  const previousMap = buildManifestMap(previousManifest.content || [], contentManifestKey)

  // Find stale entries: in previous manifest but not in current
  const staleEntries = []
  for (const [key, entry] of previousMap) {
    if (!currentMap.has(key)) {
      staleEntries.push(entry)
    }
  }

  if (staleEntries.length === 0) {
    console.log('  No stale entries to reconcile.')
    return
  }

  console.log(`  Found ${staleEntries.length} stale entry/entries to reconcile`)

  for (const entry of staleEntries) {
    const key = contentManifestKey(entry)
    const { action, reason } = getContentReconciliationAction(entry)

    try {
      if (action === 'delete') {
        console.log(`  🗑️ Reconcile-delete: ${key} (was created by this PR)`)
        const schema = COLLECTION_SCHEMAS[entry.folderName]
        if (!schema) {
          console.warn(`  ⚠️ No schema for ${entry.folderName}, skipping`)
          continue
        }

        // Find the entry in CMS to get its documentId
        const existingEntries = await cmsAdapter.prefetchExistingEntries(
          [{ folderName: entry.folderName, pathField: entry.pathField }],
          COLLECTION_SCHEMAS
        )
        const cache = existingEntries[entry.folderName]
        const existing = cache ? cache.get(entry.pathField) : null

        if (existing && existing.documentId) {
          await cmsAdapter.deleteEntry(schema.endpoint, existing.documentId)
          results.deleted.push({ file: entry.filePath, path: entry.pathField, reconciled: true })
          console.log(`  ✅ Reconcile-deleted: ${key}`)
        } else {
          console.log(`  ⚠️ Entry not found in CMS for reconcile-delete: ${key}`)
        }
      } else if (action === 'restore') {
        console.log(`  🔄 Reconcile-restore: ${key}`)

        let restorePayload = null

        // Try to build payload from base file first
        if (gitReader) {
          const baseContent = gitReader.readBaseFileForContentEntry(entry)
          if (baseContent) {
            try {
              restorePayload = await buildRestorePayloadFromBase(entry, baseContent, {
                config,
                assetAdapter,
                relationResolver,
              })
            } catch (err) {
              console.warn(`  ⚠️ Failed to build restore payload from base: ${err.message}`)
            }
          }
        }

        // Fallback to restoreData (without relations)
        if (!restorePayload && entry.restoreData) {
          restorePayload = entry.restoreData
        }

        if (restorePayload) {
          const schema = COLLECTION_SCHEMAS[entry.folderName]
          const existingEntries = await cmsAdapter.prefetchExistingEntries(
            [{ folderName: entry.folderName, pathField: entry.pathField }],
            COLLECTION_SCHEMAS
          )
          const cache = existingEntries[entry.folderName]
          const existing = cache ? cache.get(entry.pathField) : null

          if (existing && existing.documentId) {
            await cmsAdapter.updateEntry(schema.endpoint, existing.documentId, restorePayload)
          } else {
            await cmsAdapter.createEntry(schema.endpoint, restorePayload)
          }
          results.restored.push({ file: entry.filePath, path: entry.pathField, reconciled: true })
          console.log(`  ✅ Reconcile-restored: ${key}`)
        } else {
          console.warn(`  ⚠️ No restore data available for: ${key}`)
          results.errors.push({
            file: entry.filePath,
            error: `No restore data for reconciliation: ${key}`,
          })
        }
      } else if (action === 'error') {
        console.error(`  ❌ Reconciliation error for ${key}: ${reason}`)
        results.errors.push({ file: entry.filePath, error: `Reconciliation error: ${reason}` })
      }
    } catch (error) {
      console.error(`  ❌ Error reconciling ${key}: ${error.message}`)
      results.errors.push({ file: entry.filePath, error: error.message })
    }
  }
}

module.exports = { runPhase2_5, buildRestorePayloadFromBase }
