const { COLLECTION_SCHEMAS } = require('../schemas')
const { chunk, sleep } = require('../utils')
const { mapToStrapiPayload } = require('../schema-mapper')
const { buildCurrentContentManifestEntry, contentManifestKey } = require('../manifest')

async function runPhase2(
  pendingOperations,
  results,
  { config, cmsAdapter, relationResolver, previousContentMap, currentManifest, gitReader }
) {
  console.log('\n' + '='.repeat(80))
  console.log('🔄 PHASE 2: CMS Content Synchronization')
  console.log('='.repeat(80))

  let entityCache = {}
  let relatedArticleCache = {}
  let entriesCache = {}

  if (pendingOperations.length > 0) {
    const prefetchResult = await cmsAdapter.prefetchRelationEntities(
      pendingOperations,
      COLLECTION_SCHEMAS
    )
    entityCache = prefetchResult.entityCache
    relatedArticleCache = prefetchResult.relatedArticleCache
    entriesCache = await cmsAdapter.prefetchExistingEntries(pendingOperations, COLLECTION_SCHEMAS)
  }

  function findEntryByPathCached(folderName, pathField) {
    const cache = entriesCache[folderName]
    if (!cache) return null
    return cache.get(pathField) || null
  }

  async function processOperation(op) {
    const { type, folderName, pathField, filePath } = op

    try {
      if (type === 'delete') {
        console.log(`🗑️ Deleting from CMS: ${pathField}`)
        const existingEntry = findEntryByPathCached(folderName, pathField)

        // Build manifest entry before mutation
        if (currentManifest) {
          const previousEntry = previousContentMap
            ? previousContentMap.get(contentManifestKey({ folderName, pathField }))
            : null
          const baseFileExists = gitReader
            ? !!gitReader.readBaseFileForContentEntry({ folderName, pathField, filePath })
            : false
          const manifestEntry = buildCurrentContentManifestEntry(op, existingEntry, {
            previousEntry,
            baseFileExists,
          })
          if (manifestEntry) {
            currentManifest.content.push(manifestEntry)
          }
        }

        if (existingEntry) {
          const schema = COLLECTION_SCHEMAS[folderName]
          await cmsAdapter.deleteEntry(schema.endpoint, existingEntry.documentId)
          console.log(`✅ Deleted successfully: ${pathField}`)
          results.deleted.push({ file: filePath, path: pathField })
          const cache = entriesCache[folderName]
          if (cache) cache.delete(pathField)
        } else {
          console.log(`⚠️ Entry not found in CMS, skipping deletion: ${pathField}`)
          results.skipped.push(filePath)
        }
      } else {
        const { frontmatter, content } = op

        const { relations, warnings: relWarnings } = await relationResolver.resolveRelations(
          folderName,
          frontmatter,
          entityCache
        )

        const { components: relatedArticles, warnings: raWarnings } =
          await relationResolver.resolveRelatedArticles(frontmatter, relatedArticleCache)

        if (raWarnings.length > 0) {
          raWarnings.forEach((w) => {
            console.warn(`    ⚠️ related_articles: ${w.url} - ${w.reason}`)
          })
        }

        const allWarnings = [
          ...relWarnings,
          ...raWarnings.map((w) => ({
            relationName: 'related_articles',
            unmatchedValues: [w.url],
          })),
        ]

        const { data: strapiData, warnings: mapWarnings } = mapToStrapiPayload(
          folderName,
          frontmatter,
          content,
          pathField,
          config.deploymentStatus,
          { relations, relatedArticles }
        )

        if (mapWarnings.length > 0) {
          mapWarnings.forEach((w) => {
            if (w.type === 'missing_fields') {
              console.warn(`  ⚠️ Missing fields: ${w.fields.join(', ')}`)
            }
          })
        }

        if (allWarnings.length > 0) {
          results.relationWarnings.push({
            file: filePath,
            path: pathField,
            warnings: allWarnings,
          })
        }

        const existingEntry = findEntryByPathCached(folderName, pathField)
        const schema = COLLECTION_SCHEMAS[folderName]

        // Build manifest entry before mutation (captures pre-mutation state)
        if (currentManifest) {
          const previousEntry = previousContentMap
            ? previousContentMap.get(contentManifestKey({ folderName, pathField }))
            : null
          const baseFileExists = gitReader
            ? !!gitReader.readBaseFileForContentEntry({ folderName, pathField, filePath })
            : false
          const manifestEntry = buildCurrentContentManifestEntry(op, existingEntry, {
            previousEntry,
            baseFileExists,
          })
          if (manifestEntry) {
            currentManifest.content.push(manifestEntry)
          }
        }

        if (existingEntry) {
          if (!existingEntry.documentId) {
            throw new Error(`Entry found but has no documentId`)
          }
          await cmsAdapter.updateEntry(schema.endpoint, existingEntry.documentId, strapiData)
          console.log(`✅ Updated: ${pathField}`)
          results.updated.push({ file: filePath, path: pathField })
        } else {
          await cmsAdapter.createEntry(schema.endpoint, strapiData)
          console.log(`✅ Created: ${pathField}`)
          results.created.push({ file: filePath, path: pathField })
        }
      }
    } catch (error) {
      console.error(`❌ Error syncing ${filePath}: ${error.message}`)
      if (error.response) {
        console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
      }
      results.errors.push({ file: filePath, error: error.message })
    }
  }

  if (pendingOperations.length > 50) {
    const batches = chunk(pendingOperations, config.batch.size)
    const totalBatches = batches.length

    console.log(
      `\n📦 Processing ${pendingOperations.length} operations in ${totalBatches} batch(es) (batch size: ${config.batch.size}, delay: ${config.batch.delayMs}ms)`
    )

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const batch = batches[batchIndex]
      console.log(`\n── Batch ${batchIndex + 1}/${totalBatches} (${batch.length} items) ──`)

      await Promise.all(batch.map(processOperation))

      if (batchIndex < totalBatches - 1 && config.batch.delayMs > 0) {
        await sleep(config.batch.delayMs)
      }
    }
  } else {
    console.log(`\n📦 Processing ${pendingOperations.length} operations sequentially`)

    for (const op of pendingOperations) {
      await processOperation(op)
    }
  }
}

module.exports = { runPhase2 }
