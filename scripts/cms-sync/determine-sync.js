/**
 * Usage:
 *   node scripts/cms-sync/determine-sync.js \
 *     --event-name push|pull_request \
 *     --ref refs/heads/main \
 *     --has-staging-label           (flag, present if PR has staging label)
 *     --any-content-changed true \
 *     --any-content-deleted false \
 *     --any-assets-changed false \
 *     --sidenav-changed false \
 *     --any-listicles-changed false
 */

const fs = require('fs')

function parseArgs(argv) {
  const args = argv || process.argv.slice(2)
  function getArg(name) {
    const idx = args.indexOf(name)
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null
  }
  function hasFlag(name) {
    return args.includes(name)
  }
  return {
    eventName: getArg('--event-name'),
    ref: getArg('--ref'),
    hasLabel: hasFlag('--has-staging-label'),
    anyContentChanged: getArg('--any-content-changed') === 'true',
    anyContentDeleted: getArg('--any-content-deleted') === 'true',
    anyAssetsChanged: getArg('--any-assets-changed') === 'true',
    sidenavChanged: getArg('--sidenav-changed') === 'true',
    anyListiclesChanged: getArg('--any-listicles-changed') === 'true',
  }
}

function determineDeployment({ eventName, ref, hasLabel }) {
  if (eventName === 'pull_request') {
    if (hasLabel) {
      return { status: 'staging', shouldSync: true }
    }
    return { status: 'draft', shouldSync: false }
  }
  if (ref === 'refs/heads/main') {
    return { status: 'live', shouldSync: true }
  }
  return { status: 'draft', shouldSync: false }
}

function shouldSkip(deployment, changes) {
  if (!deployment.shouldSync) return true
  const {
    anyContentChanged,
    anyContentDeleted,
    anyAssetsChanged,
    sidenavChanged,
    anyListiclesChanged,
  } = changes
  return (
    !anyContentChanged &&
    !anyContentDeleted &&
    !anyAssetsChanged &&
    !sidenavChanged &&
    !anyListiclesChanged
  )
}

function main() {
  const args = parseArgs()
  const deployment = determineDeployment(args)
  const skip = shouldSkip(deployment, args)

  const flags = {
    deployment_status: deployment.status,
    should_sync: deployment.shouldSync,
    skip,
  }

  if (process.env.GITHUB_OUTPUT) {
    const lines = Object.entries(flags)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n')
    fs.appendFileSync(process.env.GITHUB_OUTPUT, lines + '\n')
  }

  for (const [k, v] of Object.entries(flags)) {
    console.log(`${k}=${v}`)
  }
}

if (require.main === module) {
  main()
}

module.exports = { determineDeployment, shouldSkip }
