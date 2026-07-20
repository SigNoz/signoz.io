const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { parseArgs: nodeParseArgs } = require('node:util')

const DEFAULT_SYNC_FOLDERS = [
  'faqs',
  'case-study',
  'opentelemetry',
  'comparisons',
  'guides',
  'blog',
  'docs',
]

function parseArgs(argv) {
  const { values } = nodeParseArgs({
    args: argv || process.argv.slice(2),
    options: {
      'event-action': { type: 'string', default: '' },
      'base-ref': { type: 'string', default: 'origin/main' },
      'head-ref': { type: 'string', default: 'HEAD' },
      'output-dir': { type: 'string', default: '.github/outputs' },
      'sync-folders': { type: 'string' },
    },
    strict: false,
  })

  return {
    eventAction: values['event-action'],
    baseRef: values['base-ref'],
    headRef: values['head-ref'],
    outputDir: values['output-dir'],
    syncFolders: parseSyncFolders(values['sync-folders']),
  }
}

function parseSyncFolders(raw) {
  if (!raw) return DEFAULT_SYNC_FOLDERS
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : DEFAULT_SYNC_FOLDERS
  } catch {
    return DEFAULT_SYNC_FOLDERS
  }
}

function runGit(args) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
}

function getOriginBranchName(ref) {
  if (ref.startsWith('origin/')) {
    return ref.slice('origin/'.length)
  }
  if (ref.startsWith('refs/remotes/origin/')) {
    return ref.slice('refs/remotes/origin/'.length)
  }
  return null
}

function refExists(ref, git = runGit) {
  try {
    git(['rev-parse', '--verify', '--quiet', `${ref}^{commit}`])
    return true
  } catch {
    return false
  }
}

function ensureGitRef(ref, git = runGit) {
  if (refExists(ref, git)) {
    return
  }

  const branchName = getOriginBranchName(ref)
  if (!branchName) {
    throw new Error(`Git ref "${ref}" is not available in the checkout`)
  }

  git([
    'fetch',
    '--no-tags',
    '--prune',
    'origin',
    `+refs/heads/${branchName}:refs/remotes/origin/${branchName}`,
  ])

  if (!refExists(ref, git)) {
    throw new Error(`Git ref "${ref}" is not available after fetching origin/${branchName}`)
  }
}

function isContentPath(filePath, syncFolders = DEFAULT_SYNC_FOLDERS) {
  const normalized = filePath.replace(/\\/g, '/')
  const parts = normalized.split('/')
  if (parts[0] !== 'data' || parts.length < 3) return false
  if (!syncFolders.includes(parts[1])) return false
  return /\.(mdx?|md)$/.test(normalized)
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort()
}

function parseNameStatus(output, syncFolders) {
  const touched = []
  const finalStatusByPath = new Map()

  for (const line of output.split('\n')) {
    if (!line.trim()) continue

    const columns = line.split('\t')
    const rawStatus = columns[0]
    const status = rawStatus[0]

    if ((status === 'R' || status === 'C') && columns.length >= 3) {
      const [, oldPath, newPath] = columns
      if (isContentPath(oldPath, syncFolders)) {
        touched.push(oldPath)
        finalStatusByPath.set(oldPath, 'D')
      }
      if (isContentPath(newPath, syncFolders)) {
        touched.push(newPath)
        finalStatusByPath.set(newPath, status === 'R' ? 'A' : 'M')
      }
      continue
    }

    const filePath = columns[1]
    if (!filePath || !isContentPath(filePath, syncFolders)) continue

    touched.push(filePath)
    finalStatusByPath.set(filePath, status)
  }

  return {
    touchedFiles: uniqueSorted(touched),
    finalStatusByPath,
  }
}

function getMergeBase(baseRef, headRef, git = runGit) {
  return git(['merge-base', baseRef, headRef]).trim()
}

function collectTouchedContentFiles({ baseRef, headRef, syncFolders, git = runGit }) {
  const mergeBase = getMergeBase(baseRef, headRef, git)
  const output = git([
    'log',
    '--name-status',
    '--format=',
    '--find-renames',
    `${mergeBase}..${headRef}`,
  ])
  return parseNameStatus(output, syncFolders).touchedFiles
}

function collectFinalStatuses({ baseRef, headRef, syncFolders, git = runGit }) {
  const output = git(['diff', '--name-status', '--find-renames', `${baseRef}...${headRef}`])
  return parseNameStatus(output, syncFolders).finalStatusByPath
}

function pathExistsAtRef(ref, filePath, git = runGit) {
  try {
    git(['cat-file', '-e', `${ref}:${filePath}`])
    return true
  } catch {
    return false
  }
}

function classifyContentFiles({
  eventAction,
  touchedFiles,
  finalStatusByPath = new Map(),
  pathExistsInHead,
  pathExistsInBase,
}) {
  const changedFiles = []
  const restoreFiles = []
  const deletedFiles = []
  const isClosed = eventAction === 'closed'

  for (const filePath of uniqueSorted(touchedFiles)) {
    const existsInHead = pathExistsInHead(filePath)
    const existsInBase = pathExistsInBase(filePath)

    if (isClosed) {
      if (existsInBase) {
        restoreFiles.push(filePath)
      } else {
        deletedFiles.push(filePath)
      }
      continue
    }

    if (existsInHead) {
      changedFiles.push(filePath)
    } else if (finalStatusByPath.get(filePath) === 'D') {
      deletedFiles.push(filePath)
    } else if (existsInBase) {
      restoreFiles.push(filePath)
    } else {
      deletedFiles.push(filePath)
    }
  }

  return {
    touchedFiles: uniqueSorted(touchedFiles),
    changedFiles: uniqueSorted(changedFiles),
    restoreFiles: uniqueSorted(restoreFiles),
    deletedFiles: uniqueSorted(deletedFiles),
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

function appendGithubOutput(flags) {
  if (!process.env.GITHUB_OUTPUT) return
  const lines = Object.entries(flags)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${lines}\n`)
}

function writeOutputs(outputDir, result) {
  fs.mkdirSync(outputDir, { recursive: true })
  writeJson(path.join(outputDir, 'content_changed_files.json'), result.changedFiles)
  writeJson(path.join(outputDir, 'content_restore_files.json'), result.restoreFiles)
  writeJson(path.join(outputDir, 'content_deleted_files.json'), result.deletedFiles)
  writeJson(path.join(outputDir, 'content_touched_files.json'), result.touchedFiles)

  const flags = {
    any_changed: result.changedFiles.length > 0,
    any_restored: result.restoreFiles.length > 0,
    any_deleted: result.deletedFiles.length > 0,
    any_touched: result.touchedFiles.length > 0,
  }

  appendGithubOutput(flags)
  for (const [key, value] of Object.entries(flags)) {
    console.log(`${key}=${value}`)
  }
}

function classifyFromGit({ eventAction, baseRef, headRef, syncFolders, git = runGit }) {
  ensureGitRef(baseRef, git)
  ensureGitRef(headRef, git)

  const touchedFiles = collectTouchedContentFiles({ baseRef, headRef, syncFolders, git })
  const finalStatusByPath = collectFinalStatuses({ baseRef, headRef, syncFolders, git })

  return classifyContentFiles({
    eventAction,
    touchedFiles,
    finalStatusByPath,
    pathExistsInHead: (filePath) => pathExistsAtRef(headRef, filePath, git),
    pathExistsInBase: (filePath) => pathExistsAtRef(baseRef, filePath, git),
  })
}

function main() {
  const args = parseArgs()
  const result = classifyFromGit(args)

  console.log(`Touched CMS content files: ${result.touchedFiles.length}`)
  console.log(`Changed from PR head: ${result.changedFiles.length}`)
  console.log(`Restored from base: ${result.restoreFiles.length}`)
  console.log(`Deleted from staging: ${result.deletedFiles.length}`)

  writeOutputs(args.outputDir, result)
}

if (require.main === module) {
  main()
}

module.exports = {
  classifyContentFiles,
  classifyFromGit,
  collectFinalStatuses,
  collectTouchedContentFiles,
  ensureGitRef,
  getOriginBranchName,
  isContentPath,
  parseArgs,
  parseNameStatus,
  parseSyncFolders,
  pathExistsAtRef,
  refExists,
}
