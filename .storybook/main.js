/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  reactDocgen: false,

  typescript: {
    check: false,

    checkOptions: {
      eslint: false,
    },

    reactDocgen: 'react-docgen-typescript'
  },

  staticDirs: ['../public'],

  docs: {}
}
export default config
