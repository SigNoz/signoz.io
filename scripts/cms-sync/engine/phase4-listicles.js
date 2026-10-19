const fs = require('fs')
const path = require('path')
const { transformListicleToStrapi, extractIconPaths } = require('../listicle-transformer')

async function runPhase4({ config, cmsAdapter, assetAdapter }) {
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

module.exports = { runPhase4 }
