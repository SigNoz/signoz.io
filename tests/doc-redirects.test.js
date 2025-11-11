#!/usr/bin/env node
const test = require('node:test')
const assert = require('assert/strict')
const path = require('path')
const cp = require('child_process')

const scriptModulePath = path.join(__dirname, '..', 'scripts', 'check-doc-redirects.js')
const originalExecSync = cp.execSync
const originalExit = process.exit
const RENAME_DIFF = 'R100\0data/docs/guide/index.mdx\0data/docs/guides/getting-started.mdx\0'
const DELETE_DIFF = 'D\0data/docs/old-deleted.mdx\0'

function loadScript() {
  delete require.cache[require.resolve(scriptModulePath)]
  return require(scriptModulePath)
}

function stubExecSync(resolver) {
  cp.execSync = (cmd, opts) => resolver(String(cmd), opts)
  return () => {
    cp.execSync = originalExecSync
  }
}

function stubProcessExit() {
  let called = false
  let code
  process.exit = (exitCode) => {
    called = true
    code = exitCode
    throw new Error(`process.exit ${exitCode}`)
  }
  return {
    wasCalled: () => called,
    code: () => code,
    restore: () => {
      process.exit = originalExit
    },
  }
}

function enterFixture(name) {
  const prev = process.cwd()
  const fixtureDir = path.join(__dirname, 'fixtures', name)
  process.chdir(fixtureDir)
  return () => process.chdir(prev)
}

function withEnv(key, value) {
  const previous = Object.prototype.hasOwnProperty.call(process.env, key)
    ? process.env[key]
    : undefined
  if (value === undefined) {
    delete process.env[key]
  } else {
    process.env[key] = value
  }
  return () => {
    if (previous === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = previous
    }
  }
}

function captureConsole(fn) {
  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  }
  const record = { log: [], warn: [], error: [] }
  const format = (args) => args.map((value) => String(value)).join(' ')
  console.log = (...args) => record.log.push(format(args))
  console.warn = (...args) => record.warn.push(format(args))
  console.error = (...args) => record.error.push(format(args))
  try {
    const result = fn()
    record.result = result
    return record
  } catch (err) {
    err.capturedLogs = record
    throw err
  } finally {
    console.log = original.log
    console.warn = original.warn
    console.error = original.error
  }
}

test('docPathToRoute maps docs paths to routes', () => {
  const { docPathToRoute } = loadScript()
  assert.equal(docPathToRoute('data/docs/abc/index.mdx'), '/docs/abc/')
  assert.equal(docPathToRoute('data/docs/abc/def.mdx'), '/docs/abc/def/')
})

test('rename with redirect passes without exiting', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return RENAME_DIFF
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreCwd = enterFixture('redirects-good')
  t.after(restoreCwd)

  const { main } = loadScript()
  const logs = captureConsole(() => main())
  assert.equal(exitStub.wasCalled(), false)
  assert.ok(logs.log.some((line) => line.includes('Doc redirect check passed')))
})

test('no doc changes still passes without warnings', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return ''
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreEnv = withEnv('GITHUB_BASE_REF', undefined)
  t.after(restoreEnv)

  const restoreCwd = enterFixture('redirects-good')
  t.after(restoreCwd)

  const { main } = loadScript()
  const logs = captureConsole(() => main())
  assert.equal(exitStub.wasCalled(), false)
  assert.equal(logs.warn.length, 0)
  assert.ok(logs.log.some((line) => line.includes('Doc redirect check passed')))
})

test('non-doc changes are ignored', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return 'M\0package.json\0'
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreEnv = withEnv('GITHUB_BASE_REF', undefined)
  t.after(restoreEnv)

  const restoreCwd = enterFixture('redirects-good')
  t.after(restoreCwd)

  const { main } = loadScript()
  const logs = captureConsole(() => main())
  assert.equal(exitStub.wasCalled(), false)
  assert.equal(logs.warn.length, 0)
  assert.ok(logs.log.some((line) => line.includes('Doc redirect check passed')))
})

test('rename without redirect exits with failure', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return RENAME_DIFF
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreCwd = enterFixture('redirects-missing-rename')
  t.after(restoreCwd)

  const { main } = loadScript()
  let thrown
  assert.throws(() => {
    try {
      captureConsole(() => main())
    } catch (err) {
      thrown = err
      throw err
    }
  }, /process.exit 1/)
  assert.ok(thrown)
  assert.equal(exitStub.wasCalled(), true)
  assert.equal(exitStub.code(), 1)
  assert.ok(
    thrown.capturedLogs.error.some((line) =>
      line.includes("Missing redirect for renamed doc '/docs/guide/'")
    )
  )
})

test('deletion without redirect exits with failure', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return DELETE_DIFF
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreCwd = enterFixture('redirects-missing-deleted')
  t.after(restoreCwd)

  const { main } = loadScript()
  let thrown
  assert.throws(() => {
    try {
      captureConsole(() => main())
    } catch (err) {
      thrown = err
      throw err
    }
  }, /process.exit 1/)
  assert.ok(thrown)
  assert.equal(exitStub.wasCalled(), true)
  assert.equal(exitStub.code(), 1)
  assert.ok(
    thrown.capturedLogs.error.some((line) =>
      line.includes("Missing redirect for deleted doc '/docs/old-deleted/'")
    )
  )
})

test('redirect pointing to missing doc exits with failure', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return ''
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreEnv = withEnv('GITHUB_BASE_REF', undefined)
  t.after(restoreEnv)

  const restoreCwd = enterFixture('redirects-missing-destination')
  t.after(restoreCwd)

  const { main } = loadScript()
  let thrown
  assert.throws(() => {
    try {
      captureConsole(() => main())
    } catch (err) {
      thrown = err
      throw err
    }
  }, /process.exit 1/)
  assert.ok(thrown)
  assert.equal(exitStub.wasCalled(), true)
  assert.equal(exitStub.code(), 1)
  assert.ok(
    thrown.capturedLogs.error.some((line) =>
      line.includes(
        "Redirect destination not found for '/docs/broken/' -> '/docs/missing-target/' (missing docs file)"
      )
    )
  )
})

test('chained redirect ending with missing doc exits with failure', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return ''
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreEnv = withEnv('GITHUB_BASE_REF', undefined)
  t.after(restoreEnv)

  const restoreCwd = enterFixture('redirects-missing-destination-chain')
  t.after(restoreCwd)

  const { main } = loadScript()
  let thrown
  assert.throws(() => {
    try {
      captureConsole(() => main())
    } catch (err) {
      thrown = err
      throw err
    }
  }, /process.exit 1/)
  assert.ok(thrown)
  assert.equal(exitStub.wasCalled(), true)
  assert.equal(exitStub.code(), 1)
  assert.ok(
    thrown.capturedLogs.error.some((line) =>
      line.includes(
        "Redirect destination not found for '/docs/chain-source/' -> '/docs/intermediate/' (missing docs file)"
      )
    )
  )
})

test('chained redirect resolving to doc passes', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return ''
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreEnv = withEnv('GITHUB_BASE_REF', undefined)
  t.after(restoreEnv)

  const restoreCwd = enterFixture('redirects-chain-resolves')
  t.after(restoreCwd)

  const { main } = loadScript()
  const logs = captureConsole(() => main())
  assert.equal(exitStub.wasCalled(), false)
  assert.equal(logs.error.length, 0)
  assert.ok(logs.log.some((line) => line.includes('Doc redirect check passed')))
})

test('rename with redirect mismatch logs warning but passes', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return RENAME_DIFF
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreEnv = withEnv('GITHUB_BASE_REF', undefined)
  t.after(restoreEnv)

  const restoreCwd = enterFixture('redirects-warning')
  t.after(restoreCwd)

  const { main } = loadScript()
  const logs = captureConsole(() => main())
  assert.equal(exitStub.wasCalled(), false)
  assert.ok(logs.warn.some((line) => line.includes('Doc redirect warnings:')))
  assert.ok(
    logs.warn.some((line) =>
      line.includes("Redirect for '/docs/guide/' points to '/docs/legacy/getting-started/'")
    )
  )
  assert.ok(logs.warn.some((line) => line.includes("expected '/docs/guides/getting-started/'")))
  assert.ok(logs.log.some((line) => line.includes('Doc redirect check passed')))
})

test('rename with self redirect exits with failure', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return RENAME_DIFF
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreCwd = enterFixture('redirects-self-rename')
  t.after(restoreCwd)

  const { main } = loadScript()
  let thrown
  assert.throws(() => {
    try {
      captureConsole(() => main())
    } catch (err) {
      thrown = err
      throw err
    }
  }, /process.exit 1/)
  assert.ok(thrown)
  assert.equal(exitStub.wasCalled(), true)
  assert.equal(exitStub.code(), 1)
  assert.ok(
    thrown.capturedLogs.error.some((line) =>
      line.includes("Redirect for '/docs/guide/' points to itself.")
    )
  )
})

test('deletion with self redirect exits with failure', (t) => {
  const restoreExec = stubExecSync((cmd) => {
    if (cmd.startsWith('git merge-base ')) return 'abc123'
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return DELETE_DIFF
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreCwd = enterFixture('redirects-self-deleted')
  t.after(restoreCwd)

  const { main } = loadScript()
  let thrown
  assert.throws(() => {
    try {
      captureConsole(() => main())
    } catch (err) {
      thrown = err
      throw err
    }
  }, /process.exit 1/)
  assert.ok(thrown)
  assert.equal(exitStub.wasCalled(), true)
  assert.equal(exitStub.code(), 1)
  assert.ok(
    thrown.capturedLogs.error.some((line) =>
      line.includes("Redirect for deleted doc '/docs/old-deleted/' points to itself.")
    )
  )
})

test('uses GITHUB_BASE_REF when provided', (t) => {
  const restoreEnv = withEnv('GITHUB_BASE_REF', 'docs-pr')
  t.after(restoreEnv)

  const commands = []
  const restoreExec = stubExecSync((cmd) => {
    commands.push(cmd)
    if (cmd.startsWith('git merge-base ')) {
      assert.equal(cmd, 'git merge-base HEAD origin/docs-pr')
      return 'abc123'
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames abc123')) {
      return RENAME_DIFF
    }
    if (cmd.startsWith('git diff --name-status -z --find-renames HEAD')) {
      return ''
    }
    throw new Error(`Unexpected command: ${cmd}`)
  })
  t.after(restoreExec)

  const exitStub = stubProcessExit()
  t.after(exitStub.restore)

  const restoreCwd = enterFixture('redirects-good')
  t.after(restoreCwd)

  const { main } = loadScript()
  const logs = captureConsole(() => main())
  assert.equal(exitStub.wasCalled(), false)
  assert.ok(logs.log.some((line) => line.includes('Doc redirect check passed')))
  assert.ok(commands.includes('git merge-base HEAD origin/docs-pr'))
})

test.after(() => {
  cp.execSync = originalExecSync
  process.exit = originalExit
})
