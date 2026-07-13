/**
 * Usage:
 *   node scripts/cms-sync/determine-sync.js \
 *     --event-name push|pull_request \
 *     --event-action opened|synchronize|closed \
 *     --ref refs/heads/main \
 *     --has-staging-label           (flag, present if PR has staging label)
 *     --same-repo                   (flag, present for push or same-repo PRs)
 *     --merged                      (flag, present when PR closed via merge)
 *     --any-content-changed true \
 *     --any-content-restored false \
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
      'event-action': { type: 'string', default: '' },
      ref: { type: 'string', default: '' },
      'has-staging-label': { type: 'boolean', default: false },
      'same-repo': { type: 'boolean', default: false },
      merged: { type: 'boolean', default: false },
      'any-content-changed': { type: 'string', default: 'false' },
      'any-content-restored': { type: 'string', default: 'false' },
      'any-content-deleted': { type: 'string', default: 'false' },
      'any-assets-changed': { type: 'string', default: 'false' },
      'sidenav-changed': { type: 'string', default: 'false' },
      'any-listicles-changed': { type: 'string', default: 'false' },
    },
    strict: false,
  })
  return {
    eventName: values['event-name'],
    eventAction: values['event-action'],
    ref: values.ref,
    hasLabel: values['has-staging-label'],
    sameRepo: values['same-repo'],
    merged: values.merged,
    anyContentChanged: values['any-content-changed'] === 'true',
    anyContentRestored: values['any-content-restored'] === 'true',
    anyContentDeleted: values['any-content-deleted'] === 'true',
    anyAssetsChanged: values['any-assets-changed'] === 'true',
    sidenavChanged: values['sidenav-changed'] === 'true',
    anyListiclesChanged: values['any-listicles-changed'] === 'true',
  }
}

function determineDeployment({ eventName, eventAction, ref, hasLabel, sameRepo, merged }) {
  if (eventName === 'pull_request') {
    if (!sameRepo) {
      return { status: 'draft', shouldSync: false, reason: 'fork-pr' }
    }
    if (eventAction === 'closed') {
      // Merged PRs are handled by the push-to-main live sync; only clean staging
      // when a PR is closed without merging.
      if (merged) {
        return { status: 'draft', shouldSync: false, reason: 'merged-pr-skip-cleanup' }
      }
      return { status: 'staging', shouldSync: true, reason: 'closed-pr-cleanup' }
    }
    if (hasLabel) {
      return { status: 'staging', shouldSync: true, reason: 'staging-label' }
    }
    return { status: 'draft', shouldSync: false, reason: 'missing-staging-label' }
  }
  if (ref === 'refs/heads/main') {
    return { status: 'live', shouldSync: true, reason: 'main-push' }
  }
  return { status: 'draft', shouldSync: false, reason: 'unsupported-ref' }
}

function shouldSkip(deployment, changes) {
  if (!deployment.shouldSync) return true
  const {
    anyContentChanged,
    anyContentRestored,
    anyContentDeleted,
    anyAssetsChanged,
    sidenavChanged,
    anyListiclesChanged,
  } = changes
  return (
    !anyContentChanged &&
    !anyContentRestored &&
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
    reason: deployment.reason,
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
