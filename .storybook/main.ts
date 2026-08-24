import path from 'path'
import type { StorybookConfig } from '@storybook/nextjs-vite'

const repoRoot = path.resolve(import.meta.dirname, '..')

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-themes', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
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
    // constants/allowedImageDomains.js must stay CJS (next.config.js requires
    // it), but Vite serves project sources as ESM. Wrap just that file.
    viteConfig.plugins.push({
      name: 'signoz-cjs-constants-shim',
      transform(code: string, id: string) {
        if (!id.endsWith('constants/allowedImageDomains.js')) return undefined
        return (
          'const module = { exports: {} };\n' +
          code +
          '\nexport { DEFAULT_ALLOWED_DOMAINS, getAllowedImageDomains, isSrcAllowedForNextImage };\n'
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
