const path = require('path')

function withContentPipeline(nextConfig, options = {}) {
  const outputDir = options.outputDir || '.content'

  return {
    ...nextConfig,

    webpack(config, context) {
      // Types are in types/content-generated/ to avoid webpack processing .d.ts files
      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias['contentlayer/generated'] = path.resolve('types', 'content-generated')

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context)
      }

      return config
    },
  }
}

module.exports = { withContentPipeline }
