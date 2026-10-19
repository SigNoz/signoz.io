const fs = require('fs')

async function runPhase3({ config, cmsAdapter }) {
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

module.exports = { runPhase3 }
