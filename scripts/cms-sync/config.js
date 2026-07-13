const fs = require('fs')
const path = require('path')
const { parseArgs: nodeParseArgs } = require('node:util')

function parseArgs(argv) {
  const { values } = nodeParseArgs({
    args: argv || process.argv.slice(2),
    options: {
      'changed-files': { type: 'string' },
      'deleted-files': { type: 'string' },
      'changed-assets': { type: 'string' },
      'sidenav-changed': { type: 'boolean', default: false },
      'listicles-changed': { type: 'boolean', default: false },
      'changed-listicles': { type: 'string' },
      'deleted-listicles': { type: 'string' },
      'sync-folders': { type: 'string' },
      'deployment-status': { type: 'string' },
    },
    strict: false,
  })
  return {
    changedFilesPath: values['changed-files'],
    deletedFilesPath: values['deleted-files'],
    changedAssetsPath: values['changed-assets'],
    sidenavChanged: values['sidenav-changed'],
    listiclesChanged: values['listicles-changed'],
    changedListiclesPath: values['changed-listicles'],
    deletedListiclesPath: values['deleted-listicles'],
    syncFolders: values['sync-folders'],
    deploymentStatus: values['deployment-status'],
  }
}

function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    if (!content || !content.trim()) return []
    return JSON.parse(content)
  } catch (e) {
    console.warn(`Warning: Failed to read ${filePath}: ${e.message}`)
    return []
  }
}

function loadFileList(cliPath, env, pathEnvName, envName) {
  if (cliPath) return readJsonFile(cliPath)
  if (env[pathEnvName] && fs.existsSync(env[pathEnvName])) {
    return readJsonFile(env[pathEnvName])
  }
  try {
    return JSON.parse(env[envName] || '[]')
  } catch {
    return []
  }
}

function buildConfig({ env = process.env, argv } = {}) {
  const cli = parseArgs(argv)

  const deploymentStatus = cli.deploymentStatus || env.DEPLOYMENT_STATUS

  const cmsApiUrl = deploymentStatus === 'staging' ? env.CMS_STAGING_API_URL : env.CMS_API_URL
  const cmsApiToken = deploymentStatus === 'staging' ? env.CMS_STAGING_API_TOKEN : env.CMS_API_TOKEN

  let syncFolders
  try {
    const raw = cli.syncFolders || env.SYNC_FOLDERS
    syncFolders = raw
      ? JSON.parse(raw)
      : ['faqs', 'case-study', 'opentelemetry', 'comparisons', 'guides', 'blog', 'docs']
  } catch {
    syncFolders = ['faqs', 'case-study', 'opentelemetry', 'comparisons', 'guides', 'blog', 'docs']
  }

  const changedFiles = loadFileList(
    cli.changedFilesPath,
    env,
    'CHANGED_FILES_PATH',
    'CHANGED_FILES'
  )
  const deletedFiles = loadFileList(
    cli.deletedFilesPath,
    env,
    'DELETED_FILES_PATH',
    'DELETED_FILES'
  )
  const changedAssets = loadFileList(
    cli.changedAssetsPath,
    env,
    'CHANGED_ASSETS_PATH',
    'CHANGED_ASSETS'
  )

  const listiclesChanged = cli.listiclesChanged || env.LISTICLES_CHANGED === 'true'
  const changedListicles = loadFileList(
    cli.changedListiclesPath,
    env,
    'CHANGED_LISTICLES_PATH',
    'CHANGED_LISTICLES'
  )
  const deletedListicles = loadFileList(
    cli.deletedListiclesPath,
    env,
    'DELETED_LISTICLES_PATH',
    'DELETED_LISTICLES'
  )
  const listiclesDir = path.resolve(__dirname, '..', '..', 'constants', 'listicles')

  const sidenavChanged = cli.sidenavChanged || env.SIDENAV_CHANGED === 'true'
  const sidenavJsonPath = path.resolve(__dirname, '..', '..', 'data', 'docs-side-nav', 'main.json')

  return {
    deploymentStatus,
    cmsApiUrl,
    cmsApiToken,
    syncFolders,
    changedFiles,
    deletedFiles,
    changedAssets,
    listiclesChanged,
    changedListicles,
    deletedListicles,
    listiclesDir,
    sidenavChanged,
    sidenavJsonPath,
    batch: {
      size: parseInt(env.CMS_BATCH_SIZE || '10', 10),
      delayMs: parseInt(env.CMS_BATCH_DELAY_MS || '1000', 10),
    },
    retry: {
      maxRetries: parseInt(env.CMS_MAX_RETRIES || '5', 10),
      initialDelayMs: parseInt(env.CMS_INITIAL_RETRY_DELAY_MS || '1000', 10),
    },
    s3: {
      bucketName: env.S3_BUCKET_NAME,
      region: env.S3_REGION,
      cdnUrl: env.CDN_URL,
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  }
}

module.exports = { buildConfig, parseArgs, readJsonFile, loadFileList }
