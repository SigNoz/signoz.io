const fs = require('fs')
const path = require('path')
const { transformListicleToStrapi, extractIconPaths } = require('../listicle-transformer')
const {
  buildCurrentListicleManifestEntry,
  listicleManifestKey,
  buildManifestMap,
  getListicleReconciliationAction,
  sanitizeEntityForRestore,
} = require('../manifest')

async function runPhase4({
  config,
  cmsAdapter,
  assetAdapter,
  previousManifest,
  currentManifest,
  reconcileStaging,
  gitReader,
}) {
  console.log('\n' + '='.repeat(80))
  console.log('🔄 PHASE 4: Listicle Synchronization')
  console.log('='.repeat(80))

  const listicleResults = { created: [], updated: [], deleted: [], restored: [], errors: [] }

  const previousListicleMap = previousManifest
    ? buildManifestMap(previousManifest.listicles || [], listicleManifestKey)
    : new Map()

  // Process changed listicles (skip when PR is closed)
  if (!config.isPrClosed) {
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
        const existingEntry = existingEntries.length > 0 ? existingEntries[0] : null

        // Build manifest entry
        if (currentManifest) {
          const previousEntry = previousListicleMap.get(key) || null
          const baseFileExists = gitReader
            ? !!gitReader.readBaseFileContent(`constants/listicles/${key}.json`)
            : false
          const manifestEntry = buildCurrentListicleManifestEntry(
            key,
            previousEntry,
            existingEntry,
            false,
            baseFileExists
          )
          if (manifestEntry) {
            currentManifest.listicles.push(manifestEntry)
          }
        }

        if (existingEntry) {
          const documentId = existingEntry.documentId
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
        const existingEntry = existingEntries.length > 0 ? existingEntries[0] : null

        // Build manifest entry
        if (currentManifest) {
          const previousEntry = previousListicleMap.get(key) || null
          const baseFileExists = gitReader
            ? !!gitReader.readBaseFileContent(`constants/listicles/${key}.json`)
            : false
          const manifestEntry = buildCurrentListicleManifestEntry(
            key,
            previousEntry,
            existingEntry,
            true,
            baseFileExists
          )
          if (manifestEntry) {
            currentManifest.listicles.push(manifestEntry)
          }
        }

        if (existingEntry) {
          const documentId = existingEntry.documentId
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
  }

  // Reconcile stale listicle entries
  if (reconcileStaging && previousManifest && (previousManifest.listicles || []).length > 0) {
    const currentListicleMap = currentManifest
      ? buildManifestMap(currentManifest.listicles || [], listicleManifestKey)
      : new Map()

    const staleEntries = []
    for (const [key, entry] of previousListicleMap) {
      if (!currentListicleMap.has(key)) {
        staleEntries.push(entry)
      }
    }

    if (staleEntries.length > 0) {
      console.log(`\n  🔄 Reconciling ${staleEntries.length} stale listicle entry/entries`)

      for (const entry of staleEntries) {
        const { action, reason } = getListicleReconciliationAction(entry)

        try {
          if (action === 'delete') {
            const existingEntries = await cmsAdapter.fetchListicle(entry.key)
            if (existingEntries.length > 0) {
              await cmsAdapter.deleteListicle(existingEntries[0].documentId)
              listicleResults.deleted.push({ key: entry.key, reconciled: true })
              console.log(`  ✅ Reconcile-deleted listicle: ${entry.key}`)
            }
          } else if (action === 'restore') {
            if (entry.restoreData) {
              const existingEntries = await cmsAdapter.fetchListicle(entry.key)
              if (existingEntries.length > 0) {
                await cmsAdapter.updateListicle(existingEntries[0].documentId, entry.restoreData)
              } else {
                await cmsAdapter.createListicle(entry.restoreData)
              }
              listicleResults.restored.push({ key: entry.key, reconciled: true })
              console.log(`  ✅ Reconcile-restored listicle: ${entry.key}`)
            } else {
              console.warn(`  ⚠️ No restore data for listicle: ${entry.key}`)
            }
          } else if (action === 'error') {
            console.error(`  ❌ Reconciliation error for listicle ${entry.key}: ${reason}`)
            listicleResults.errors.push({
              key: entry.key,
              error: `Reconciliation error: ${reason}`,
            })
          }
        } catch (error) {
          const errorMsg = error.response?.data?.error?.message || error.message
          console.error(`  ❌ Error reconciling listicle ${entry.key}: ${errorMsg}`)
          listicleResults.errors.push({ key: entry.key, error: errorMsg })
        }
      }
    }
  }

  console.log('\n' + '-'.repeat(40))
  console.log('📊 LISTICLE SYNC SUMMARY')
  console.log('-'.repeat(40))
  console.log(`  ✅ Created: ${listicleResults.created.length}`)
  console.log(`  🔄 Updated: ${listicleResults.updated.length}`)
  console.log(`  🗑️ Deleted: ${listicleResults.deleted.length}`)
  console.log(`  🔄 Restored: ${listicleResults.restored.length}`)
  console.log(`  ❌ Errors: ${listicleResults.errors.length}`)
  console.log('-'.repeat(40))

  if (listicleResults.errors.length > 0) {
    console.error('\n❌ LISTICLE SYNC had errors:')
    listicleResults.errors.forEach(({ key, error }) => {
      console.error(`  • ${key}: ${error}`)
    })
  }

  const hasReconciledEntries =
    listicleResults.deleted.some((d) => d.reconciled) ||
    listicleResults.restored.some((r) => r.reconciled)

  try {
    fs.writeFileSync(
      'listicle-sync-results.json',
      JSON.stringify({ ...listicleResults, hasReconciledEntries }, null, 2)
    )
    console.log('📝 Listicle results saved to listicle-sync-results.json')
  } catch (writeError) {
    console.error('Failed to save listicle results:', writeError.message)
  }
}

module.exports = { runPhase4 }
