import path from 'path'
import remarkGfm from 'remark-gfm'
import type { StorybookConfig } from '@storybook/nextjs-vite'

const repoRoot = path.resolve(import.meta.dirname, '..')

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public', { from: '../data-assets', to: '/' }],
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = viteConfig.plugins ?? []
    // These files must stay CJS for Node scripts (next.config.js, the CMS sync);
    // Vite serves project sources as ESM.
    const cjsConstants: Record<string, string[]> = {
      'constants/allowedImageDomains.js': [
        'DEFAULT_ALLOWED_DOMAINS',
        'getAllowedImageDomains',
        'isSrcAllowedForNextImage',
      ],
      'constants/listicles/includes.js': ['resolveListicleIncludes', 'includedListicleNames'],
    }
    viteConfig.plugins.push({
      name: 'signoz-cjs-constants-shim',
      transform(code: string, id: string) {
        const file = Object.keys(cjsConstants).find((candidate) => id.endsWith(candidate))
        if (!file) return undefined
        return (
          'const module = { exports: {} };\n' +
          code +
          `\nexport { ${cjsConstants[file].join(', ')} };\n`
        )
      },
    })
    viteConfig.resolve = viteConfig.resolve ?? {}
    const aliases = [
      { find: '@', replacement: repoRoot },
      { find: 'app', replacement: path.resolve(repoRoot, 'app') },
      { find: 'pliny', replacement: path.resolve(repoRoot, 'node_modules/pliny') },
    ]
    const existing = viteConfig.resolve.alias
    viteConfig.resolve.alias = Array.isArray(existing)
      ? [...existing, ...aliases]
      : [
          ...Object.entries(existing ?? {}).map(([find, replacement]) => ({ find, replacement })),
          ...aliases,
        ]
    viteConfig.optimizeDeps = {
      ...viteConfig.optimizeDeps,
      include: [
        ...(viteConfig.optimizeDeps?.include ?? []),
        '@signozhq/ui',
        'react-multi-carousel',
        'framer-motion',
      ],
    }
    return viteConfig
  },
}

export default config
