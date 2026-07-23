const fs = require('fs')
const path = require('path')
const axios = require('axios')
const mime = require('mime-types')

function createAssetAdapter({
  s3Client,
  PutObjectCommand,
  bucketName,
  cdnUrl,
  changedAssets = [],
}) {
  async function checkCDN(assetPath) {
    const url = `${cdnUrl}${assetPath.startsWith('/') ? '' : '/'}${assetPath}`
    try {
      await axios.head(url)
      return true
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false
      }
      console.warn(`    ⚠️ Error checking CDN for ${url}: ${error.message}`)
      return false
    }
  }

  async function uploadToS3(localPath, s3Key) {
    try {
      const fileContent = fs.readFileSync(localPath)
      const contentType = mime.lookup(localPath) || 'application/octet-stream'

      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
          Body: fileContent,
          ContentType: contentType,
        })
      )
    } catch (error) {
      throw new Error(`Failed to upload ${s3Key} to S3: ${error.message}`)
    }
  }

  async function syncAsset(assetPath) {
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
    const localPath = path.join('data-assets', cleanPath)
    const s3Key = `web/${cleanPath}`

    const localExists = fs.existsSync(localPath)
    const onCDN = await checkCDN(cleanPath)

    const isChangedInPR = changedAssets.includes(localPath)

    if (!localExists && !onCDN) {
      throw new Error(
        `❌ Asset Sync Failed: The asset "${assetPath}" was referenced but does not exist in 'data-assets' and was not found on the CDN. \n` +
          `   Please ensure the asset exists at "${localPath}" or remove the reference.`
      )
    }

    if (localExists) {
      if (!onCDN || isChangedInPR) {
        await uploadToS3(localPath, s3Key)
      }
    }
  }

  return { checkCDN, uploadToS3, syncAsset }
}

module.exports = { createAssetAdapter }
