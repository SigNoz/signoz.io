const fs = require('fs')
const { COLLECTION_SCHEMAS } = require('../schemas')
const { getFolderName } = require('../content-parser')
const { createRelationResolver } = require('../relation-resolver')
const { runPhase1 } = require('./phase1-assets')
const { runPhase2 } = require('./phase2-cms')
const { runPhase3 } = require('./phase3-sidenav')
const { runPhase4 } = require('./phase4-listicles')

function createSyncEngine({ config, cmsAdapter, assetAdapter }) {
  const relationResolver = createRelationResolver(cmsAdapter)

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

  async function run() {
    const changedFiles = config.changedFiles || []
    const restoreFiles = config.restoreFiles || []
    const deletedFiles = config.deletedFiles || []
    const changedAssets = config.changedAssets || []

    console.log(
      `🚀 Starting sync — Changed: ${changedFiles.length}, Restored: ${restoreFiles.length}, Deleted: ${deletedFiles.length}, Assets: ${changedAssets.length}\n`
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
      ...changedFiles.map((file) => ({ path: file, isDeleted: false })),
      ...restoreFiles.map((file) => ({
        path: file,
        isDeleted: false,
        restoreRef: config.restoreRef,
      })),
      ...deletedFiles.map((file) => ({ path: file, isDeleted: true })),
    ]

    // Phase 1: Asset sync + build pending ops
    const pendingOperations = await runPhase1(allFiles, results, { config, assetAdapter })

    // Check Phase 1 errors
    if (results.errors.length > 0) {
      console.error('\n' + '='.repeat(80))
      console.error('❌ PHASE 1 FAILED: Asset synchronization or validation failed.')
      console.error('⛔ Stopping workflow to prevent partial or invalid content sync.')
      console.error('='.repeat(80))

      results.errors.forEach(({ file, error }) => {
        console.error(`  • ${file}: ${error}`)
      })

      results.relationTypes = collectRelationTypes([...changedFiles, ...restoreFiles])
      results.deploymentStatus = config.deploymentStatus

      try {
        fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
      } catch (e) {
        console.error('Failed to save error results:', e.message)
      }

      return { results, exitCode: 1 }
    }

    // Phase 2: CMS sync
    await runPhase2(pendingOperations, results, { config, cmsAdapter, relationResolver })

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

      results.relationTypes = collectRelationTypes([...changedFiles, ...restoreFiles])
      results.deploymentStatus = config.deploymentStatus

      try {
        fs.writeFileSync('sync-results.json', JSON.stringify(results, null, 2))
      } catch (e) {
        console.error('Failed to save error results:', e.message)
      }

      return { results, exitCode: 1 }
    }

    // Extract relation types for results
    const allRelationNames = new Set()
    ;[...results.created, ...results.updated].forEach((item) => {
      const folderName = getFolderName(item.file)
      if (folderName && COLLECTION_SCHEMAS[folderName]) {
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
      await runPhase3({ config, cmsAdapter })
    }

    // Phase 4: Listicles
    if (config.listiclesChanged) {
      await runPhase4({ config, cmsAdapter, assetAdapter })
    }

    console.log('✅ Sync completed successfully!')
    return { results, exitCode: 0 }
  }

  return { run }
}

module.exports = { createSyncEngine }
