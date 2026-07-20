const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { buildConfig } = require('./cms-sync/config')
const { createRetryFn } = require('./cms-sync/utils')
const { createCmsAdapter } = require('./cms-sync/adapters/cms-adapter')
const { createAssetAdapter } = require('./cms-sync/adapters/asset-adapter')
const { createSyncEngine } = require('./cms-sync/engine')

const config = buildConfig()

// Validate environment variables
if (!config.cmsApiUrl || !config.cmsApiToken) {
  console.error('❌ ERROR: Missing required environment variables')
  console.error('   Required: CMS_API_URL, CMS_API_TOKEN')
  process.exit(1)
}

const retryFn = createRetryFn({
  maxRetries: config.retry.maxRetries,
  initialDelayMs: config.retry.initialDelayMs,
})

const s3Client = new S3Client({
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
})

const cmsAdapter = createCmsAdapter({
  apiUrl: config.cmsApiUrl,
  apiToken: config.cmsApiToken,
  retryFn,
  deploymentStatus: config.deploymentStatus,
})

const assetAdapter = createAssetAdapter({
  s3Client,
  PutObjectCommand,
  bucketName: config.s3.bucketName,
  cdnUrl: config.s3.cdnUrl,
  changedAssets: config.changedAssets,
})

const engine = createSyncEngine({ config, cmsAdapter, assetAdapter })

engine
  .run()
  .then(({ exitCode }) => {
    if (exitCode !== 0) {
      process.exit(exitCode)
    }
  })
  .catch((error) => {
    console.error('❌ SYNC FAILED:', error.message)
    process.exit(1)
  })
