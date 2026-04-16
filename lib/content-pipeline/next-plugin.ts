// lib/content-pipeline/next-plugin.ts
import type { NextConfig } from 'next'
import * as path from 'path'
import { buildAllCollections } from './core'
import { collections } from './schema'

// Import MDX options (same as contentlayer.config.ts)
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

const icon = fromHtmlIsomorphic(
  `<span class="content-header-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
      <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
      <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
    </svg>
  </span>`,
  { fragment: true }
)

const mdxOptions = {
  remarkPlugins: [
    remarkExtractFrontmatter,
    remarkGfm,
    remarkCodeTitles,
    remarkMath,
    remarkImgToJsx,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'prepend',
        headingProperties: { className: ['content-header'] },
        content: icon,
      },
    ],
    [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    rehypePresetMinify,
  ],
}

export interface ContentPipelineOptions {
  contentDir?: string
  outputDir?: string
  cacheDir?: string
}

let buildPromise: Promise<void> | null = null

export function withContentPipeline(
  nextConfig: NextConfig,
  options: ContentPipelineOptions = {}
): NextConfig {
  const outputDir = options.outputDir || '.content'
  const cacheDir = options.cacheDir || '.content-cache'

  return {
    ...nextConfig,

    webpack(config, context) {
      const { dev, isServer } = context

      // Only run on server to avoid double compilation
      if (isServer) {
        // Add alias for backward compatibility
        config.resolve = config.resolve || {}
        config.resolve.alias = config.resolve.alias || {}
        config.resolve.alias['contentlayer/generated'] = path.resolve(outputDir, 'generated')

        // Add plugin
        config.plugins = config.plugins || []
        config.plugins.push(
          new ContentPipelineWebpackPlugin({
            outputDir,
            cacheDir,
            watch: dev,
          })
        )
      }

      // Call original webpack config if exists
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context)
      }

      return config
    },
  }
}

class ContentPipelineWebpackPlugin {
  private options: { outputDir: string; cacheDir: string; watch: boolean }

  constructor(options: { outputDir: string; cacheDir: string; watch: boolean }) {
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
      cacheDir: path.resolve(this.options.cacheDir),
      mdxOptions,
    })

    const elapsed = ((Date.now() - start) / 1000).toFixed(2)
    console.log(`[content-pipeline] Built in ${elapsed}s`)
  }
}
