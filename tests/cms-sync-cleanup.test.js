const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const {
  normalizeManifest,
  contentManifestKey,
  listicleManifestKey,
  hasStagingManifestState,
  getContentReconciliationAction,
  getListicleReconciliationAction,
} = require('../scripts/cms-sync-manifest')

const updatePrComment = require('../scripts/update-pr-comment')

test('normalizeManifest supports legacy content manifests', () => {
  const manifest = normalizeManifest([
    {
      folderName: 'docs',
      pathField: '/install',
      path: 'data/docs/install.mdx',
    },
    {
      folderName: 'blog',
    },
  ])

  assert.equal(manifest.version, 2)
  assert.deepEqual(manifest.content, [
    {
      kind: 'unknown',
      folderName: 'docs',
      pathField: '/install',
      filePath: 'data/docs/install.mdx',
      restoreData: null,
    },
  ])
  assert.deepEqual(manifest.listicles, [])
  assert.equal(manifest.sidenav, null)
})

test('normalizeManifest preserves versioned content, listicle, and sidenav state', () => {
  const restoreData = { title: 'Base title' }
  const manifest = normalizeManifest({
    version: 2,
    content: [
      {
        kind: 'updated',
        folderName: 'guides',
        pathField: '/base-guide',
        filePath: 'data/guides/base-guide.mdx',
        restoreData,
      },
    ],
    listicles: [
      {
        kind: 'created',
        key: 'guides',
        filePath: 'constants/listicles/guides.json',
      },
    ],
    sidenav: { touched: true },
  })

  assert.deepEqual(manifest.content[0].restoreData, restoreData)
  assert.equal(manifest.listicles[0].kind, 'created')
  assert.deepEqual(manifest.sidenav, { touched: true })
  assert.equal(hasStagingManifestState(manifest), true)
})

test('manifest keys match content and listicle identity', () => {
  assert.equal(contentManifestKey({ folderName: 'docs', pathField: '/foo' }), 'docs:/foo')
  assert.equal(listicleManifestKey({ key: 'docs' }), 'docs')
})

test('hasStagingManifestState ignores empty manifests', () => {
  assert.equal(hasStagingManifestState(null), false)
  assert.equal(hasStagingManifestState({ version: 2, content: [], listicles: [] }), false)
  assert.equal(hasStagingManifestState({ version: 2, sidenav: { touched: true } }), true)
})

test('content reconciliation deletes PR-created entries even when base data exists', () => {
  const action = getContentReconciliationAction(
    { kind: 'created', folderName: 'docs', pathField: '/new-doc' },
    { title: 'Base title' }
  )

  assert.deepEqual(action, { action: 'delete' })
})

test('content reconciliation restores pre-existing entries with baseline data', () => {
  const restoreData = { title: 'Base title' }

  assert.deepEqual(
    getContentReconciliationAction(
      { kind: 'updated', folderName: 'docs', pathField: '/existing-doc' },
      restoreData
    ),
    { action: 'restore', restoreData }
  )
  assert.deepEqual(
    getContentReconciliationAction(
      { kind: 'deleted', folderName: 'docs', pathField: '/existing-doc' },
      restoreData
    ),
    { action: 'restore', restoreData }
  )
})

test('content reconciliation fails closed for pre-existing entries without baseline data', () => {
  const action = getContentReconciliationAction({
    kind: 'updated',
    folderName: 'docs',
    pathField: '/existing-doc',
  })

  assert.equal(action.action, 'error')
  assert.match(action.error, /No baseline content/)
})

test('legacy unknown content entries restore when possible and otherwise delete', () => {
  const restoreData = { title: 'Base title' }

  assert.deepEqual(
    getContentReconciliationAction(
      { kind: 'unknown', folderName: 'docs', pathField: '/legacy-doc' },
      restoreData
    ),
    { action: 'restore', restoreData }
  )
  assert.deepEqual(
    getContentReconciliationAction({ kind: 'unknown', folderName: 'docs', pathField: '/old-doc' }),
    { action: 'delete' }
  )
})

test('listicle reconciliation mirrors content cleanup semantics', () => {
  const restoreData = { key: 'guides', items: [] }

  assert.deepEqual(
    getListicleReconciliationAction({ kind: 'created', key: 'guides' }, restoreData),
    { action: 'delete' }
  )
  assert.deepEqual(
    getListicleReconciliationAction({ kind: 'updated', key: 'guides' }, restoreData),
    { action: 'restore', restoreData }
  )

  const missingBaseline = getListicleReconciliationAction({ kind: 'deleted', key: 'guides' })
  assert.equal(missingBaseline.action, 'error')
})

test('workflow gates expensive PR detection and skips merged close cleanup', () => {
  const workflow = fs.readFileSync(
    path.join(__dirname, '..', '.github', 'workflows', 'sync-content-cms.yml'),
    'utf8'
  )

  assert.match(workflow, /cancel-in-progress:\s*false/)
  assert.match(workflow, /has_previous_manifest/)
  assert.match(workflow, /previous staging manifest/)
  assert.match(workflow, /merged PR close is handled by the push workflow/)
  assert.match(
    workflow,
    /name: Checkout Repository\n\s+if: steps\.check-sync\.outputs\.should_sync == 'true'/
  )
})

test('PR comment classifies cleanup deletes only by reconciled flag', async () => {
  const originalCwd = process.cwd()
  const originalStatus = process.env.JOB_STATUS
  const originalDeploymentStatus = process.env.DEPLOYMENT_STATUS
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cms-sync-comment-'))

  try {
    process.chdir(tmpDir)
    process.env.JOB_STATUS = 'success'
    process.env.DEPLOYMENT_STATUS = 'staging'

    fs.writeFileSync(
      path.join(tmpDir, 'sync-results.json'),
      JSON.stringify({
        created: [],
        updated: [],
        deleted: [{ file: '(reconciled) docs/foo', path: '/foo' }],
        restored: [],
        skipped: [],
        errors: [],
        relationWarnings: [],
      })
    )

    let commentBody = ''
    await updatePrComment({
      github: {
        rest: {
          issues: {
            createComment: ({ body }) => {
              commentBody = body
            },
          },
        },
      },
      context: {
        issue: { number: 123 },
        repo: { owner: 'SigNoz', repo: 'signoz.io' },
      },
      core: {},
    })

    assert.match(commentBody, /\| .* Deleted \| 1 \|/)
    assert.doesNotMatch(commentBody, /Cleaned up/)
  } finally {
    process.chdir(originalCwd)
    if (originalStatus === undefined) {
      delete process.env.JOB_STATUS
    } else {
      process.env.JOB_STATUS = originalStatus
    }
    if (originalDeploymentStatus === undefined) {
      delete process.env.DEPLOYMENT_STATUS
    } else {
      process.env.DEPLOYMENT_STATUS = originalDeploymentStatus
    }
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
})
