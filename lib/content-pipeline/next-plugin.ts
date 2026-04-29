import type { NextConfig } from 'next'
import * as path from 'path'
import { buildAllCollections } from './core'
import { collections } from './schema'

export interface ContentPipelineOptions {
  contentDir?: string
  outputDir?: string
}

let buildPromise: Promise<void> | null = null
let buildGeneration = 0

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
    // Track generation to dedupe concurrent builds (server + client compilations)
    let lastBuiltGeneration = -1
    compiler.hooks.beforeCompile.tapPromise(pluginName, async () => {
      // If we've already built for the current generation, skip
      if (lastBuiltGeneration === buildGeneration) {
        return
      }
      // Dedupe concurrent builds - reuse existing promise if one is running
      if (!buildPromise) {
        buildPromise = this.runBuild().finally(() => {
          buildPromise = null
        })
      }
      await buildPromise
      lastBuiltGeneration = buildGeneration
    })

    // In dev mode, add data directory and refresh trigger to watch list
    // The refresh trigger file (.content/.refresh-trigger) is updated by watch-content.mts
    // after content rebuilds, causing webpack to recompile dependent modules
    if (this.options.watch) {
      compiler.hooks.afterCompile.tap(pluginName, (compilation: any) => {
        compilation.contextDependencies.add(path.resolve('data'))
        // Watch the refresh trigger file so webpack detects content changes
        compilation.fileDependencies.add(path.resolve('.content', '.refresh-trigger'))
        // Invalidate build generation when content changes to trigger rebuild
        buildGeneration++
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
