const fs = require('fs')
const path = require('path')

function getAssetsListFromEnv(env, envName, pathEnvName) {
  if (env[pathEnvName] && fs.existsSync(env[pathEnvName])) {
    try {
      const content = fs.readFileSync(env[pathEnvName], 'utf8')
      if (!content || !content.trim()) return []
      return JSON.parse(content)
    } catch (e) {
      console.warn(`⚠️ Failed to read or parse file from ${pathEnvName}: ${e.message}`)
      return []
    }
  }
  return JSON.parse(env[envName] || '[]')
}

function buildConfig({ env = process.env } = {}) {
  const deploymentStatus = env.DEPLOYMENT_STATUS

  const cmsApiUrl = deploymentStatus === 'staging' ? env.CMS_STAGING_API_URL : env.CMS_API_URL
  const cmsApiToken = deploymentStatus === 'staging' ? env.CMS_STAGING_API_TOKEN : env.CMS_API_TOKEN

  const syncFolders = JSON.parse(env.SYNC_FOLDERS || '[]')

  const changedFiles = getAssetsListFromEnv(env, 'CHANGED_FILES', 'CHANGED_FILES_PATH')
  const deletedFiles = getAssetsListFromEnv(env, 'DELETED_FILES', 'DELETED_FILES_PATH')
  const changedAssets = getAssetsListFromEnv(env, 'CHANGED_ASSETS', 'CHANGED_ASSETS_PATH')

  const listiclesChanged = env.LISTICLES_CHANGED === 'true'
  const changedListicles = getAssetsListFromEnv(env, 'CHANGED_LISTICLES', 'CHANGED_LISTICLES_PATH')
  const deletedListicles = getAssetsListFromEnv(env, 'DELETED_LISTICLES', 'DELETED_LISTICLES_PATH')
  const listiclesDir = path.resolve(__dirname, '..', '..', 'constants', 'listicles')

  const sidenavChanged = env.SIDENAV_CHANGED === 'true'
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

module.exports = { buildConfig }
