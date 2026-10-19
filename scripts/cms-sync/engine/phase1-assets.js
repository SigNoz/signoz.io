const { COLLECTION_SCHEMAS } = require('../schemas')
const { execFileSync } = require('child_process')
const {
  getFolderName,
  generatePathField,
  parseMDXFile,
  detectOperationType,
} = require('../content-parser')
const { extractAssetPaths, replaceAssetPaths } = require('../asset-processor')

function readFileFromGitRef(ref, filePath, encoding) {
  return execFileSync('git', ['show', `${ref}:${filePath}`], {
    encoding: encoding || 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

async function runPhase1(allFiles, results, { config, assetAdapter }) {
  console.log('\n' + '='.repeat(80))
  console.log('🔄 PHASE 1: Asset Synchronization and Validation')
  console.log('='.repeat(80))

  const pendingOperations = []

  for (const { path: filePath, isDeleted, restoreRef } of allFiles) {
    const restoreLabel = restoreRef ? ` (restore from ${restoreRef})` : ''
    console.log(`\n📄 Processing: ${filePath}${isDeleted ? ' (deleted)' : restoreLabel}`)

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

      const operationType = restoreRef
        ? 'create_or_update'
        : detectOperationType(filePath, isDeleted)

      if (operationType === 'delete') {
        pendingOperations.push({
          type: 'delete',
          folderName,
          pathField,
          filePath,
        })
      } else {
        const parseOptions = restoreRef
          ? {
              readFile: (targetPath, encoding) =>
                config.restoreFileReader
                  ? config.restoreFileReader(restoreRef, targetPath, encoding)
                  : readFileFromGitRef(restoreRef, targetPath, encoding),
            }
          : undefined
        const { frontmatter, content } = parseMDXFile(filePath, parseOptions)

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

module.exports = { runPhase1 }
