import type { NextConfig } from 'next'
import * as path from 'path'
import { buildAllCollections } from './core'
import { collections } from './schema'

export interface ContentPipelineOptions {
  contentDir?: string
  outputDir?: string
}

let buildPromise: Promise<void> | null = null

export function withContentPipeline(
  nextConfig: NextConfig,
  options: ContentPipelineOptions = {}
): NextConfig {
  const outputDir = options.outputDir || '.content'

  return {
    ...nextConfig,

    webpack(config, context) {
      const { dev, isServer } = context

      // Only run on server to avoid double compilation
      if (isServer) {
        config.plugins = config.plugins || []
        config.plugins.push(
          new ContentPipelineWebpackPlugin({
            outputDir,
            watch: dev,
          })
        )
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context)
      }

      return config
    },
  }
}

class ContentPipelineWebpackPlugin {
  private options: { outputDir: string; watch: boolean }

  constructor(options: { outputDir: string; watch: boolean }) {
    this.options = options
  }

  apply(compiler: any) {
    const pluginName = 'ContentPipelineWebpackPlugin'

    // Run build before compilation
    compiler.hooks.beforeCompile.tapPromise(pluginName, async () => {
      // Dedupe builds
      if (!buildPromise) {
        buildPromise = this.runBuild()
      }
      await buildPromise
      buildPromise = null
    })

    // In dev mode, add data directory to watch list
    // Note: We only watch data/, not .content/ - the contentLoader uses fs.readFile
    // in dev mode which bypasses bundler caching, so watching .content/ is not needed
    // and would cause issues with .d.ts files being processed as modules
    if (this.options.watch) {
      compiler.hooks.afterCompile.tap(pluginName, (compilation: any) => {
        compilation.contextDependencies.add(path.resolve('data'))
      })
    }
  }

  private async runBuild(): Promise<void> {
    console.log('[content-pipeline] Building content...')
    const start = Date.now()

    await buildAllCollections(collections, {
      outputDir: path.resolve(this.options.outputDir),
    })

    const elapsed = ((Date.now() - start) / 1000).toFixed(2)
    console.log(`[content-pipeline] Built in ${elapsed}s`)
  }
}
