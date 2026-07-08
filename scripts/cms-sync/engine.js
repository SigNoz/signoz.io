const fs = require('fs')
const path = require('path')
const { COLLECTION_SCHEMAS } = require('./schemas')
const { chunk, sleep } = require('./utils')
const {
  getFolderName,
  generatePathField,
  parseMDXFile,
  detectOperationType,
} = require('./content-parser')
const { extractAssetPaths, replaceAssetPaths } = require('./asset-processor')
const { mapToStrapiPayload } = require('./schema-mapper')
const { createRelationResolver } = require('./relation-resolver')
const { transformListicleToStrapi, extractIconPaths } = require('./listicle-transformer')

function createSyncEngine({ config, cmsAdapter, assetAdapter }) {
  const relationResolver = createRelationResolver(cmsAdapter)

  async function runPhase1(allFiles, results) {
    console.log('\n' + '='.repeat(80))
    console.log('🔄 PHASE 1: Asset Synchronization and Validation')
    console.log('='.repeat(80))

    const pendingOperations = []

    for (const { path: filePath, isDeleted } of allFiles) {
      console.log(`\n📄 Processing: ${filePath}${isDeleted ? ' (deleted)' : ''}`)

      try {
        const folderName = getFolderName(filePath)

        if (!folderName || !config.syncFolders.includes(folderName)) {
          console.log(`⏭️ Skipped: Folder '${folderName}' not in sync list`)
          results.skipped.push(filePath)
          continue
        }

        const schema = COLLECTION_SCHEMAS[folderName]
        if (!schema) {
          console.log(`⏭️ Skipped: No schema configured for '${folderName}'`)
          results.skipped.push(filePath)
          continue
        }

        const pathField = generatePathField(filePath, folderName)

        if (!pathField) {
          throw new Error('Could not generate path field')
        }

        const operationType = detectOperationType(filePath, isDeleted)

        if (operationType === 'delete') {
          pendingOperations.push({
            type: 'delete',
            folderName,
            pathField,
            filePath,
          })
        } else {
          const { frontmatter, content } = parseMDXFile(filePath)

          const assetPaths = extractAssetPaths(content, frontmatter)

          for (const assetPath of assetPaths) {
            await assetAdapter.syncAsset(assetPath)
          }

          const { content: updatedContent, frontmatter: updatedFrontmatter } = replaceAssetPaths(
            content,
            frontmatter,
            assetPaths,
            config.s3.cdnUrl
          )

          pendingOperations.push({
            type: 'update',
            folderName,
            pathField,
            filePath,
            frontmatter: updatedFrontmatter,
            content: updatedContent,
          })
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}: ${error.message}`)
        results.errors.push({ file: filePath, error: error.message })
      }
    }

    return pendingOperations
  }

  function collectRelationTypes(filePaths) {
    const allRelationNames = new Set()
    filePaths.forEach((filePath) => {
      const folderName = getFolderName(filePath)
      if (folderName && COLLECTION_SCHEMAS[folderName]) {
        const schema = COLLECTION_SCHEMAS[folderName]
        if (schema.relations) {
          Object.keys(schema.relations).forEach((rn) => allRelationNames.add(rn))
        }
        if (schema.hasRelatedArticles) {
          allRelationNames.add('related_articles')
        }
      }
    })
    return Array.from(allRelationNames)
  }

  async function runPhase2(pendingOperations, results) {
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

          // Resolve relations
          const { relations, warnings: relWarnings } = await relationResolver.resolveRelations(
            folderName,
            frontmatter,
            entityCache
          )

          // Resolve related articles
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

  async function runPhase3() {
    console.log('\n' + '='.repeat(80))
    console.log('🔄 PHASE 3: Sidenav Synchronization')
    console.log('='.repeat(80))

    const raw = fs.readFileSync(config.sidenavJsonPath, 'utf8')
    const items = JSON.parse(raw)

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Parsed sidenav JSON is empty or not an array')
    }

    await cmsAdapter.putSidenav(items)
    console.log('✅ Sidenav synced to CMS successfully')
  }

  async function runPhase4() {
    console.log('\n' + '='.repeat(80))
    console.log('🔄 PHASE 4: Listicle Synchronization')
    console.log('='.repeat(80))

    const listicleResults = { created: [], updated: [], deleted: [], errors: [] }

    for (const listicleFile of config.changedListicles) {
      const key = path.basename(listicleFile, '.json')
      console.log(`\n📄 Processing listicle: ${key}`)

      try {
        const fullPath = path.resolve(config.listiclesDir, path.basename(listicleFile))
        const raw = fs.readFileSync(fullPath, 'utf8')
        const jsonData = JSON.parse(raw)

        const iconPaths = extractIconPaths(jsonData)
        console.log(`  🖼️ Found ${iconPaths.length} icon(s) to check`)

        for (const iconPath of iconPaths) {
          const cleanPath = iconPath.startsWith('/') ? iconPath.slice(1) : iconPath
          const localPath = path.join('data-assets', cleanPath)
          const localExists = fs.existsSync(localPath)
          const onCDN = await assetAdapter.checkCDN(cleanPath)

          if (!onCDN && localExists) {
            const s3Key = `web/${cleanPath}`
            await assetAdapter.uploadToS3(localPath, s3Key)
            console.log(`    ✅ Uploaded icon: ${cleanPath}`)
          } else if (!onCDN && !localExists) {
            console.warn(`    ⚠️ Icon not found locally or on CDN: ${iconPath}`)
          }
        }

        const strapiData = transformListicleToStrapi(jsonData, config.s3.cdnUrl)

        const existingEntries = await cmsAdapter.fetchListicle(key)

        if (existingEntries.length > 0) {
          const documentId = existingEntries[0].documentId
          await cmsAdapter.updateListicle(documentId, strapiData)
          console.log(`  ✅ Updated listicle: ${key}`)
          listicleResults.updated.push({ key })
        } else {
          await cmsAdapter.createListicle(strapiData)
          console.log(`  ✅ Created listicle: ${key}`)
          listicleResults.created.push({ key })
        }
      } catch (error) {
        const errorMsg = error.response?.data?.error?.message || error.message
        console.error(`  ❌ Error syncing listicle ${key}: ${errorMsg}`)
        if (error.response) {
          console.error(`  Response:`, JSON.stringify(error.response.data, null, 2))
        }
        listicleResults.errors.push({ key, error: errorMsg })
      }
    }

    for (const listicleFile of config.deletedListicles) {
      const key = path.basename(listicleFile, '.json')
      console.log(`\n🗑️ Deleting listicle: ${key}`)

      try {
        const existingEntries = await cmsAdapter.fetchListicle(key)

        if (existingEntries.length > 0) {
          const documentId = existingEntries[0].documentId
          await cmsAdapter.deleteListicle(documentId)
          console.log(`  ✅ Deleted listicle: ${key}`)
          listicleResults.deleted.push({ key })
        } else {
          console.log(`  ⚠️ Listicle not found in CMS, skipping deletion: ${key}`)
        }
      } catch (error) {
        const errorMsg = error.response?.data?.error?.message || error.message
        console.error(`  ❌ Error deleting listicle ${key}: ${errorMsg}`)
        listicleResults.errors.push({ key, error: errorMsg })
      }
    }

    // Summary
    console.log('\n' + '-'.repeat(40))
    console.log('📊 LISTICLE SYNC SUMMARY')
    console.log('-'.repeat(40))
    console.log(`  ✅ Created: ${listicleResults.created.length}`)
    console.log(`  🔄 Updated: ${listicleResults.updated.length}`)
    console.log(`  🗑️ Deleted: ${listicleResults.deleted.length}`)
    console.log(`  ❌ Errors: ${listicleResults.errors.length}`)
    console.log('-'.repeat(40))

    if (listicleResults.errors.length > 0) {
      console.error('\n❌ LISTICLE SYNC had errors:')
      listicleResults.errors.forEach(({ key, error }) => {
        console.error(`  • ${key}: ${error}`)
      })
    }

    try {
      fs.writeFileSync('listicle-sync-results.json', JSON.stringify(listicleResults, null, 2))
      console.log('📝 Listicle results saved to listicle-sync-results.json')
    } catch (writeError) {
      console.error('Failed to save listicle results:', writeError.message)
    }
  }

  async function run() {
    console.log(
      `🚀 Starting sync — Changed: ${config.changedFiles.length}, Deleted: ${config.deletedFiles.length}, Assets: ${config.changedAssets.length}\n`
    )

    const results = {
      created: [],
      updated: [],
      deleted: [],
      skipped: [],
      errors: [],
      relationWarnings: [],
    }

    const allFiles = [
      ...config.changedFiles.map((file) => ({ path: file, isDeleted: false })),
      ...config.deletedFiles.map((file) => ({ path: file, isDeleted: true })),
    ]

    // Phase 1: Asset sync + build pending ops
    const pendingOperations = await runPhase1(allFiles, results)

    // Check Phase 1 errors
    if (results.errors.length > 0) {
      console.error('\n' + '='.repeat(80))
      console.error('❌ PHASE 1 FAILED: Asset synchronization or validation failed.')
      console.error('⛔ Stopping workflow to prevent partial or invalid content sync.')
      console.error('='.repeat(80))

      results.errors.forEach(({ file, error }) => {
        console.error(`  • ${file}: ${error}`)
      })

      results.relationTypes = collectRelationTypes(config.changedFiles)
      results.deploymentStatus = config.deploymentStatus

      try {
        fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
      } catch (e) {
        console.error('Failed to save error results:', e.message)
      }

      return { results, exitCode: 1 }
    }

    // Phase 2: CMS sync
    await runPhase2(pendingOperations, results)

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('📊 SYNC SUMMARY')
    console.log('='.repeat(60))
    console.log(`✅ Created: ${results.created.length}`)
    console.log(`🔄 Updated: ${results.updated.length}`)
    console.log(`🗑️ Deleted: ${results.deleted.length}`)
    console.log(`⏭️ Skipped: ${results.skipped.length}`)
    console.log(`❌ Errors: ${results.errors.length}`)
    console.log(`⚠️ Relation Warnings: ${results.relationWarnings.length}`)
    console.log('='.repeat(60) + '\n')

    if (results.errors.length > 0) {
      console.error('\n❌ SYNC FAILED - The following errors occurred in Phase 2:\n')
      results.errors.forEach(({ file, error }) => {
        console.error(`  • ${file}: ${error}`)
      })

      results.relationTypes = collectRelationTypes(config.changedFiles)
      results.deploymentStatus = config.deploymentStatus

      try {
        fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
      } catch (e) {
        console.error('Failed to save error results:', e.message)
      }

      return { results, exitCode: 1 }
    }

    // Extract relation types for results
    const usedSchemas = new Set()
    const allRelationNames = new Set()
    ;[...results.created, ...results.updated].forEach((item) => {
      const folderName = getFolderName(item.file)
      if (folderName && COLLECTION_SCHEMAS[folderName]) {
        usedSchemas.add(folderName)
        const schema = COLLECTION_SCHEMAS[folderName]
        if (schema.relations) {
          Object.keys(schema.relations).forEach((rn) => allRelationNames.add(rn))
        }
      }
    })

    results.relationTypes = Array.from(allRelationNames)
    results.deploymentStatus = config.deploymentStatus

    try {
      fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
      console.log('📝 Results saved to sync-results.json')
    } catch (writeError) {
      console.error('Failed to save results:', writeError.message)
    }

    // Phase 3: Sidenav
    if (config.sidenavChanged) {
      await runPhase3()
    }

    // Phase 4: Listicles
    if (config.listiclesChanged) {
      await runPhase4()
    }

    console.log('✅ Sync completed successfully!')
    return { results, exitCode: 0 }
  }

  return { run }
}

module.exports = { createSyncEngine }
