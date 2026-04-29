const path = require('path')

const CONTENT_OUTPUT_DIR = path.resolve(process.cwd(), '.vercel/cache/content')

function withContentPipeline(nextConfig, options = {}) {
  const outputDir = options.outputDir || CONTENT_OUTPUT_DIR

  return {
    ...nextConfig,

    webpack(config, context) {
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context)
      }

      return config
    },
  }
}

module.exports = { withContentPipeline }
