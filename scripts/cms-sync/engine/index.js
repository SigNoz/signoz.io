const fs = require('fs')
const { COLLECTION_SCHEMAS } = require('../schemas')
const { getFolderName } = require('../content-parser')
const { createRelationResolver } = require('../relation-resolver')
const {
  createEmptyManifest,
  normalizeManifest,
  hasStagingManifestState,
  buildManifestMap,
  contentManifestKey,
} = require('../manifest')
const { createGitReader } = require('../git-reader')
const { runPhase1 } = require('./phase1-assets')
const { runPhase2 } = require('./phase2-cms')
const { runPhase2_5 } = require('./phase2_5-reconcile')
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
    console.log(
      `🚀 Starting sync — Changed: ${config.changedFiles.length}, Deleted: ${config.deletedFiles.length}, Assets: ${config.changedAssets.length}\n`
    )

    const results = {
      created: [],
      updated: [],
      deleted: [],
      restored: [],
      skipped: [],
      errors: [],
      relationWarnings: [],
    }

    // Load previous manifest
    let previousManifest = null
    if (config.syncManifestPath) {
      try {
        const raw = fs.readFileSync(config.syncManifestPath, 'utf8')
        previousManifest = normalizeManifest(JSON.parse(raw))
      } catch {
        // No previous manifest — first run
      }
    }

    const currentManifest = createEmptyManifest()
    const needsReconciliation = config.reconcileStaging || config.isPrClosed

    // Create gitReader when needed for reconciliation
    let gitReader = null
    if (needsReconciliation) {
      gitReader = createGitReader({ baseRef: config.baseRef })
    }

    const previousContentMap = previousManifest
      ? buildManifestMap(previousManifest.content || [], contentManifestKey)
      : null

    // For PR close: empty allFiles, skip Phase 1 & 2 content processing
    let allFiles
    if (config.isPrClosed) {
      allFiles = []
      console.log('📌 PR closed — skipping content processing, running reconciliation only')
    } else {
      allFiles = [
        ...config.changedFiles.map((file) => ({ path: file, isDeleted: false })),
        ...config.deletedFiles.map((file) => ({ path: file, isDeleted: true })),
      ]
    }

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
    await runPhase2(pendingOperations, results, {
      config,
      cmsAdapter,
      relationResolver,
      previousContentMap,
      currentManifest,
      gitReader,
    })

    // Phase 2.5: Reconciliation
    if (needsReconciliation && previousManifest && hasStagingManifestState(previousManifest)) {
      await runPhase2_5(currentManifest.content, previousManifest, results, {
        config,
        cmsAdapter,
        assetAdapter,
        gitReader,
        relationResolver,
      })
    }

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('📊 SYNC SUMMARY')
    console.log('='.repeat(60))
    console.log(`✅ Created: ${results.created.length}`)
    console.log(`🔄 Updated: ${results.updated.length}`)
    console.log(`🗑️ Deleted: ${results.deleted.length}`)
    console.log(`🔄 Restored: ${results.restored.length}`)
    console.log(`⏭️ Skipped: ${results.skipped.length}`)
    console.log(`❌ Errors: ${results.errors.length}`)
    console.log(`⚠️ Relation Warnings: ${results.relationWarnings.length}`)
    console.log('='.repeat(60) + '\n')

    if (results.errors.length > 0) {
      console.error('\n❌ SYNC FAILED - The following errors occurred:\n')
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

    // Extract relation types for results (include restored items)
    const allRelationNames = new Set()
    ;[...results.created, ...results.updated, ...results.restored].forEach((item) => {
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

    const hasReconciledEntries =
      results.deleted.some((d) => d.reconciled) || results.restored.length > 0

    try {
      fs.writeFileSync(
        'sync-results.json',
        JSON.stringify({ ...results, hasReconciledEntries }, null, 2)
      )
      console.log('📝 Results saved to sync-results.json')
    } catch (writeError) {
      console.error('Failed to save results:', writeError.message)
    }

    // Phase 3: Sidenav
    const restoreFromBase = config.isPrClosed && previousManifest && previousManifest.sidenav
    if (config.sidenavChanged || restoreFromBase) {
      await runPhase3({ config, cmsAdapter, restoreFromBase, gitReader })

      // Track sidenav in manifest
      if (!config.isPrClosed) {
        currentManifest.sidenav = { touched: true }
      }
    }

    // Phase 4: Listicles
    if (config.listiclesChanged || config.isPrClosed) {
      await runPhase4({
        config,
        cmsAdapter,
        assetAdapter,
        previousManifest,
        currentManifest,
        reconcileStaging: needsReconciliation,
        gitReader,
      })
    }

    // Save manifest (skip on PR close — cleanup is done)
    if (config.reconcileStaging && !config.isPrClosed && config.syncManifestPath) {
      try {
        fs.writeFileSync(config.syncManifestPath, JSON.stringify(currentManifest, null, 2))
        console.log('📝 Manifest saved to', config.syncManifestPath)
      } catch (e) {
        console.error('Failed to save manifest:', e.message)
      }
    }

    console.log('✅ Sync completed successfully!')
    return { results, exitCode: 0 }
  }

  return { run }
}

module.exports = { createSyncEngine }
