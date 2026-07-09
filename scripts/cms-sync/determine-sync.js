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
const { parseArgs: nodeParseArgs } = require('node:util')

function parseArgs(argv) {
  const { values } = nodeParseArgs({
    args: argv || process.argv.slice(2),
    options: {
      'event-name': { type: 'string', default: '' },
      ref: { type: 'string', default: '' },
      'has-staging-label': { type: 'boolean', default: false },
      'any-content-changed': { type: 'string', default: 'false' },
      'any-content-deleted': { type: 'string', default: 'false' },
      'any-assets-changed': { type: 'string', default: 'false' },
      'sidenav-changed': { type: 'string', default: 'false' },
      'any-listicles-changed': { type: 'string', default: 'false' },
    },
    strict: false,
  })
  return {
    eventName: values['event-name'],
    ref: values.ref,
    hasLabel: values['has-staging-label'],
    anyContentChanged: values['any-content-changed'] === 'true',
    anyContentDeleted: values['any-content-deleted'] === 'true',
    anyAssetsChanged: values['any-assets-changed'] === 'true',
    sidenavChanged: values['sidenav-changed'] === 'true',
    anyListiclesChanged: values['any-listicles-changed'] === 'true',
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
