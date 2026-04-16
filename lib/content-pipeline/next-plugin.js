// lib/content-pipeline/next-plugin.js
// CommonJS wrapper for the content pipeline Next.js plugin
// Note: Content is pre-built by scripts/build-content.mts

const path = require('path')

/**
 * @param {import('next').NextConfig} nextConfig
 * @param {Object} options
 * @returns {import('next').NextConfig}
 */
function withContentPipeline(nextConfig, options = {}) {
  const outputDir = options.outputDir || '.content'

  return {
    ...nextConfig,

    webpack(config, context) {
      // Add alias for backward compatibility with contentlayer imports
      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias['contentlayer/generated'] = path.resolve(outputDir, 'generated')

      // Call original webpack config if exists
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context)
      }

      return config
    },
  }
}

module.exports = { withContentPipeline }
