const fs = require('fs')
const path = require('path')

module.exports = async ({ github, context, core }) => {
  const status = process.env.JOB_STATUS
  const deploymentStatus = process.env.DEPLOYMENT_STATUS

  let body = ''

  if (status === 'success') {
    // Read sync results from file
    let syncResults = null
    try {
      const resultsPath = path.join(process.cwd(), 'sync-results.json')
      const resultsContent = fs.readFileSync(resultsPath, 'utf8')
      syncResults = JSON.parse(resultsContent)
    } catch (error) {
      console.error('Failed to read sync results:', error.message)
    }

    let listicleResults = null
    try {
      const listiclePath = path.join(process.cwd(), 'listicle-sync-results.json')
      const listicleContent = fs.readFileSync(listiclePath, 'utf8')
      listicleResults = JSON.parse(listicleContent)
    } catch (error) {
      // No listicle results is fine — listicles may not have changed
    }

    if (syncResults) {
      // Skip comment when no creates, updates, deletes, or errors to avoid noise
      const restored = syncResults.restored || []
      const reconciledDeletes = syncResults.deleted.filter(
        (item) => item.reconciled || (item.file && item.file.startsWith('(reconciled)'))
      )
      const intentionalDeletes = syncResults.deleted.filter(
        (item) => !item.reconciled && (!item.file || !item.file.startsWith('(reconciled)'))
      )
      const totalActivity =
        syncResults.created.length +
        syncResults.updated.length +
        syncResults.deleted.length +
        restored.length +
        syncResults.errors.length
      const hasListicleActivity =
        listicleResults &&
        (listicleResults.created.length > 0 ||
          listicleResults.updated.length > 0 ||
          listicleResults.deleted.length > 0 ||
          (listicleResults.restored && listicleResults.restored.length > 0) ||
          listicleResults.errors.length > 0)
      if (totalActivity === 0 && !hasListicleActivity) {
        console.log('No sync activity to report. Skipping PR comment.')
        return
      }

      // Build comprehensive summary
      body = `✅ **CMS Sync Successful**\n\n`
      body += `Content has been synced to Strapi CMS with deployment status: \`${deploymentStatus}\`\n\n`

      // Summary counts
      body += `### 📊 Summary\n\n`
      body += `| Operation | Count |\n`
      body += `|-----------|-------|\n`
      body += `| ✅ Created | ${syncResults.created.length} |\n`
      body += `| 🔄 Updated | ${syncResults.updated.length} |\n`
      body += `| 🗑️ Deleted | ${intentionalDeletes.length} |\n`
      if (restored.length > 0) {
        body += `| ♻️ Restored | ${restored.length} |\n`
      }
      if (reconciledDeletes.length > 0) {
        body += `| 🧹 Cleaned up | ${reconciledDeletes.length} |\n`
      }
      body += `| ⏭️ Skipped | ${syncResults.skipped.length} |\n\n`

      // Get relation types from sync results (dynamically extracted from schemas)
      const relationTypes = syncResults.relationTypes || []

      if (relationTypes.length > 0) {
        body += `### 🔗 Relations\n\n`
        body += `The following relations were automatically resolved:\n`
        body += relationTypes.map((rel) => `- \`${rel}\``).join('\n')
        body += '\n\n'
      }

      // Documents details
      if (restored.length > 0 || reconciledDeletes.length > 0) {
        body += `> **Note:** ${restored.length + reconciledDeletes.length} stale staging entry(ies) were reconciled after PR cleanup/revert.\n\n`
      }

      const allProcessed = [
        ...syncResults.created.map((item) => ({ ...item, operation: 'Created' })),
        ...syncResults.updated.map((item) => ({ ...item, operation: 'Updated' })),
        ...intentionalDeletes.map((item) => ({ ...item, operation: 'Deleted' })),
        ...restored.map((item) => ({ ...item, operation: 'Restored' })),
        ...reconciledDeletes.map((item) => ({ ...item, operation: 'Cleaned up' })),
      ]

      if (allProcessed.length > 0) {
        body += `### 📄 Processed Documents\n\n`
        body += `<details>\n`
        body += `<summary>View ${allProcessed.length} document(s)</summary>\n\n`
        body += `| Operation | Route |\n`
        body += `|-----------|-------|\n`
        allProcessed.forEach((item) => {
          body += `| ${item.operation} | \`${item.path}\` |\n`
        })
        body += `\n</details>\n\n`
      }

      // Relation warnings
      if (syncResults.relationWarnings && syncResults.relationWarnings.length > 0) {
        body += `### ⚠️ Relation Warnings\n\n`
        body += `Some relations could not be resolved due to missing or unmatched fields:\n\n`
        body += `<details>\n`
        body += `<summary>View ${syncResults.relationWarnings.length} warning(s)</summary>\n\n`

        syncResults.relationWarnings.forEach((item) => {
          body += `**File:** \`${item.path}\`\n\n`
          item.warnings.forEach((warning) => {
            body += `- **${warning.relationName}**: ${warning.unmatchedValues.length} unmatched value(s)\n`
            body += `  - ${warning.unmatchedValues.map((v) => `\`${v}\``).join(', ')}\n`
          })
          body += `\n`
        })

        body += `</details>\n\n`
        body += `> **Note:** Documents were still synced successfully, but some relations were omitted. Please check the values in your frontmatter.\n`
      }

      if (listicleResults) {
        const restoredListicles = listicleResults.restored || []
        const reconciledListicleDeletes = listicleResults.deleted.filter((item) => item.reconciled)
        const intentionalListicleDeletes = listicleResults.deleted.filter(
          (item) => !item.reconciled
        )
        const totalListicles =
          listicleResults.created.length +
          listicleResults.updated.length +
          listicleResults.deleted.length +
          restoredListicles.length

        if (totalListicles > 0 || listicleResults.errors.length > 0) {
          body += `\n### 📋 Listicle Sync\n\n`
          body += `| Operation | Count |\n`
          body += `|-----------|-------|\n`
          body += `| ✅ Created | ${listicleResults.created.length} |\n`
          body += `| 🔄 Updated | ${listicleResults.updated.length} |\n`
          body += `| 🗑️ Deleted | ${intentionalListicleDeletes.length} |\n`
          if (restoredListicles.length > 0) {
            body += `| ♻️ Restored | ${restoredListicles.length} |\n`
          }
          if (reconciledListicleDeletes.length > 0) {
            body += `| 🧹 Cleaned up | ${reconciledListicleDeletes.length} |\n`
          }
          body += `\n`

          const allListicles = [
            ...listicleResults.created.map((item) => ({ ...item, operation: 'Created' })),
            ...listicleResults.updated.map((item) => ({ ...item, operation: 'Updated' })),
            ...intentionalListicleDeletes.map((item) => ({ ...item, operation: 'Deleted' })),
            ...restoredListicles.map((item) => ({ ...item, operation: 'Restored' })),
            ...reconciledListicleDeletes.map((item) => ({ ...item, operation: 'Cleaned up' })),
          ]

          if (allListicles.length > 0) {
            body += `<details>\n`
            body += `<summary>View ${allListicles.length} listicle(s)</summary>\n\n`
            body += `| Operation | Listicle |\n`
            body += `|-----------|----------|\n`
            allListicles.forEach((item) => {
              body += `| ${item.operation} | \`${item.key}\` |\n`
            })
            body += `\n</details>\n\n`
          }

          if (listicleResults.errors.length > 0) {
            body += `<details>\n`
            body += `<summary>⚠️ ${listicleResults.errors.length} listicle error(s)</summary>\n\n`
            listicleResults.errors.forEach((item) => {
              body += `- \`${item.key}\`: ${item.error}\n`
            })
            body += `\n</details>\n`
          }
        }
      }
    } else {
      // Fallback if results file not found
      body = `✅ **CMS Sync Successful**\n\n`
      body += `Content has been synced to Strapi CMS with deployment status: \`${deploymentStatus}\`\n\n`
      body += `Relations have been automatically resolved.`

      if (listicleResults) {
        const totalListicles =
          listicleResults.created.length +
          listicleResults.updated.length +
          listicleResults.deleted.length +
          ((listicleResults.restored && listicleResults.restored.length) || 0)

        if (totalListicles > 0) {
          body += `\n\n### 📋 Listicle Sync\n\n`
          body += `Created: ${listicleResults.created.length}, `
          body += `Updated: ${listicleResults.updated.length}, `
          body += `Deleted: ${listicleResults.deleted.length}`
        }
      }
    }
  } else {
    body = `❌ **CMS Sync Failed**\n\nPlease check the workflow logs for details.`
  }

  github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: body,
  })
}
