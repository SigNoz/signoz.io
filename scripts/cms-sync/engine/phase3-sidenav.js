const fs = require('fs')
const path = require('path')

async function runPhase3({ config, cmsAdapter, restoreFromBase, gitReader }) {
  console.log('\n' + '='.repeat(80))
  console.log('🔄 PHASE 3: Sidenav Synchronization')
  console.log('='.repeat(80))

  let raw

  if (restoreFromBase && gitReader) {
    // Read sidenav from base branch instead of filesystem
    const repoRelativePath = path.relative(process.cwd(), config.sidenavJsonPath)
    raw = gitReader.readBaseFileContent(repoRelativePath)
    if (!raw) {
      console.warn('⚠️ Could not read sidenav from base branch, falling back to filesystem')
      raw = fs.readFileSync(config.sidenavJsonPath, 'utf8')
    } else {
      console.log('  📂 Reading sidenav from base branch')
    }
  } else {
    raw = fs.readFileSync(config.sidenavJsonPath, 'utf8')
  }

  const items = JSON.parse(raw)

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Parsed sidenav JSON is empty or not an array')
  }

  await cmsAdapter.putSidenav(items)
  console.log('✅ Sidenav synced to CMS successfully')
}

module.exports = { runPhase3 }
