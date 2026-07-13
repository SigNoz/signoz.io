const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { determineDeployment, shouldSkip } = require('../../scripts/cms-sync/determine-sync')

describe('determineDeployment', () => {
  it('returns staging for PR with staging label', () => {
    const result = determineDeployment({ eventName: 'pull_request', ref: '', hasLabel: true })
    assert.equal(result.status, 'staging')
    assert.equal(result.shouldSync, true)
  })

  it('returns draft for PR without staging label', () => {
    const result = determineDeployment({ eventName: 'pull_request', ref: '', hasLabel: false })
    assert.equal(result.status, 'draft')
    assert.equal(result.shouldSync, false)
  })

  it('returns live for push to main', () => {
    const result = determineDeployment({
      eventName: 'push',
      ref: 'refs/heads/main',
      hasLabel: false,
    })
    assert.equal(result.status, 'live')
    assert.equal(result.shouldSync, true)
  })

  it('returns draft for push to non-main branch', () => {
    const result = determineDeployment({
      eventName: 'push',
      ref: 'refs/heads/feature-x',
      hasLabel: false,
    })
    assert.equal(result.status, 'draft')
    assert.equal(result.shouldSync, false)
  })
})

describe('shouldSkip', () => {
  const noChanges = {
    anyContentChanged: false,
    anyContentDeleted: false,
    anyAssetsChanged: false,
    sidenavChanged: false,
    anyListiclesChanged: false,
  }

  it('skips when deployment shouldSync is false', () => {
    const deployment = { status: 'draft', shouldSync: false }
    assert.equal(shouldSkip(deployment, { ...noChanges, anyContentChanged: true }), true)
  })

  it('skips when no files changed', () => {
    const deployment = { status: 'live', shouldSync: true }
    assert.equal(shouldSkip(deployment, noChanges), true)
  })

  it('does not skip when content changed and shouldSync', () => {
    const deployment = { status: 'live', shouldSync: true }
    assert.equal(shouldSkip(deployment, { ...noChanges, anyContentChanged: true }), false)
  })

  it('does not skip when content deleted and shouldSync', () => {
    const deployment = { status: 'staging', shouldSync: true }
    assert.equal(shouldSkip(deployment, { ...noChanges, anyContentDeleted: true }), false)
  })

  it('does not skip when assets changed and shouldSync', () => {
    const deployment = { status: 'live', shouldSync: true }
    assert.equal(shouldSkip(deployment, { ...noChanges, anyAssetsChanged: true }), false)
  })

  it('does not skip when sidenav changed and shouldSync', () => {
    const deployment = { status: 'live', shouldSync: true }
    assert.equal(shouldSkip(deployment, { ...noChanges, sidenavChanged: true }), false)
  })

  it('does not skip when listicles changed and shouldSync', () => {
    const deployment = { status: 'staging', shouldSync: true }
    assert.equal(shouldSkip(deployment, { ...noChanges, anyListiclesChanged: true }), false)
  })
})
